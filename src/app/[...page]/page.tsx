import { Metadata } from 'next';
import magentoGraphQl from '@/lib/magento/graphQl/magentoGraphQl';
import { categoryQuery } from '@/lib/magento/queries/category';
import CategoryProduct from '@/components/layout/CategoryProduct';
import { getProductId } from '@/lib/magento/queries/product';
import ProductPage from '@/components/layout/ProductPage';
import StaticPage from '@/components/staticpage/StaticPage'; // Corrected import name
import ProductPageSkeleton from '@/components/skelton/ProductPageSkeleton';
import SkeletonLoader from '@/components/skelton/SkeletonLoader';
import { Suspense } from 'react';
import { CmsPage, GetCmsPagesResponse, MagentoGraphQlResponse } from '@/lib/types';
import { decode } from 'html-entities';


const endpoint = `${process.env.M2_STORE_URl}/graphql`;
const linkQuery = `query GetCmsPages($is_active: Boolean!) {
  getCmsPages(is_active: $is_active) {
    identifier
    title
  }
}`;
const categoryPagePath =  `
query GetCategoryTree($id: Int!) {
      category(id: $id) {
        id
        name
        url_path
        children {
          id
          name
          url_path
          children {
            id
            name
            url_path
            children {
              id
              name
              url_path
            }
          }
        }
      }
    }
`;


async function fetchData(url_key: string) {
  let data = null;
  let loadingCategory = true;
  let loadingProduct = false;
  let error = false;
  let staticPage = false;

  try {
    const categoryResponse = await magentoGraphQl(endpoint, 'getCategory', categoryQuery(), { url_key });

    if (!categoryResponse.data?.categoryList?.length) {
      loadingCategory = false;
      loadingProduct = true;

      const productResponse = await magentoGraphQl(endpoint, 'getProduct', getProductId(), { url_key });
      if (productResponse.data?.products?.items.length > 0) {
        data = { type: 'product', data: productResponse.data };
      } else {
        staticPage = true; // Set staticPage to true if no category or product is found
      }
      loadingProduct = false;
    } else {
      data = { type: 'category', data: categoryResponse.data };
      loadingCategory = false;
    }
  } catch (err) {
    console.error('Failed to fetch data:', err);
    error = true;
    loadingCategory = false;
    loadingProduct = false;
  }

  return { data, loadingCategory, loadingProduct, error, staticPage };
}

// Main Page component
export default async function Page({ params }: { params: { page: string[] } }) {
  const url_key = decodeURIComponent(params.page[params.page.length - 1]);
  const { data, loadingCategory, loadingProduct, error, staticPage } = await fetchData(url_key);

  if (error) {
    return <div className="text-red-600">Error occurred. Please try again.</div>;
  }

  return (
    <>
      <Suspense fallback={loadingCategory ? <SkeletonLoader /> : <ProductPageSkeleton />}>
        {data?.type === 'category' ? (
          <CategoryProduct category_id={data.data.categoryList[0].id} />
        ) : data?.type === 'product' ? (
          <ProductPage product_url={url_key} />
        ) : staticPage ? (
          <StaticPage url_key={url_key} />
        ) : null}
      </Suspense>
    </>
  );
}

// Generate dynamic metadata
export async function generateMetadata({ params }: { params: { page: string[] } }): Promise<Metadata> {
  const url_key = params.page[params.page.length - 1];

  try {
    const categoryResponse = await magentoGraphQl(endpoint, 'getCategory', categoryQuery(), { url_key });

    if (categoryResponse.data?.categoryList?.length > 0) {
      const category = categoryResponse.data.categoryList[0];
      return {
        title: category.name,
        description: category.meta_description??`Browse our collection of ${category.name} products.`,
        keywords: category.meta_keywords,
        applicationName: process.env.M2_SITE_NAME,
      };
    }

    // If category not found, fetch product data
    const productResponse = await magentoGraphQl(endpoint, 'getProduct', getProductId(), { url_key });

    if (productResponse.data?.products?.items.length > 0) {
      const product = productResponse.data.products.items[0];
      return {
        title: product.name,
        description: product.meta_description??`Buy ${product.name} at the best price.`,
        keywords: product.meta_keyword,
        applicationName: process.env.M2_SITE_NAME,
      };
    }

    // Static page metadata as a fallback
    return {
      title: `${url_key} | ${process.env.M2_SITE_NAME}`,
      description: `Learn more about ${url_key} on our website.`,
    };
  } catch (err) {
    console.error('Failed to generate metadata:', err);
  }

  return {
    title: `${process.env.M2_SITE_NAME}`,
    description: 'Browse our products and categories.',
  };
}

// Helper function to recursively extract category paths
function extractCategoryPaths(categories: any[]): { page: string[] }[] {
  let paths: { page: string[] }[] = [];

  categories.forEach((category) => {
    if (category.url_path) {
      // Add the current category's URL path
      paths.push({
        page: [decodeURIComponent(category.url_path)],
      });
    }

    // Recursively process child categories
    if (category.children && category.children.length > 0) {
      const childPaths = extractCategoryPaths(category.children);
      paths = paths.concat(childPaths);
    }
  });

  return paths;
}

// Generate Static Paths
export async function generateStaticParams(): Promise<{ page: string[] }[]> {
  const paths: { page: string[] }[] = [];

  try {
    // Fetch CMS page links
    const response1: MagentoGraphQlResponse<GetCmsPagesResponse> = await magentoGraphQl(endpoint, 'GetCmsLink', linkQuery, { is_active: true });

    const cmsPaths = response1.data.getCmsPages.map((page: CmsPage) => ({
      page: [page.identifier],
    }));
    
    // Add CMS paths to the result
    paths.push(...cmsPaths);

    // Fetch category paths
    const response2: MagentoGraphQlResponse<{ category: { children: any[] } }> = await magentoGraphQl(endpoint, 'GetCategoryPaths', categoryPagePath, { id: 2 });

    // Extract all category paths using the helper function
    const categoryPaths = extractCategoryPaths(response2.data.category.children);

    // Add category paths to the result
    paths.push(...categoryPaths);
    console.log('paths',JSON.stringify(paths))

  } catch (error) {
    console.error('Error fetching paths:', error);
  }

  return paths;
}



