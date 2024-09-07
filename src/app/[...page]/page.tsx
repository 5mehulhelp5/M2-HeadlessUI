import { Metadata } from 'next';
import magentoGraphQl from '@/lib/magento/graphQl/magentoGraphQl';
import { categoryQuery } from '@/lib/magento/queries/category';
import CategoryProduct from '@/components/layout/CategoryProduct';
import { getProductId } from '@/lib/magento/queries/product';
import ProductPage from '@/components/layout/ProductPage';
import ProductPageSkeleton from '@/components/skelton/ProductPageSkeleton';
import SkeletonLoader from '@/components/skelton/SkeletonLoader';
import { Suspense } from 'react';

const endpoint = `${process.env.M2_STORE_URl}/graphql`;

// Main Page component
export default async function Page({ params }: { params: { page: string[] } }) {
  const url_key = params.page[params.page.length - 1];
  let data = null;
  let loadingCategory = true;
  let loadingProduct = false;
  let error = false;

  try {
    const categoryResponse = await magentoGraphQl(endpoint, 'getCategory', categoryQuery(), { url_key });

    if (!categoryResponse.data?.categoryList?.length) {
      loadingCategory = false;
      loadingProduct = true;

      const productResponse = await magentoGraphQl(endpoint, 'getProduct', getProductId(), { url_key });
      if (productResponse.data?.products?.items.length > 0) {
        data = { type: 'product', data: productResponse.data };
      } else {
        error = true;
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
  if (error) {
    return <div className="text-red-600">Error occurred. Please try again.</div>;
  }
  return (
    <>
      <Suspense fallback={loadingCategory ? <SkeletonLoader /> : <ProductPageSkeleton />}>
        {data?.type === 'category' ? (
          <CategoryProduct category_id={data.data.categoryList[0].id} />
        ) : (
          <ProductPage product_url={url_key} />
        )}
      </Suspense>
    </>
  );
}

// Generate dynamic metadata
export async function generateMetadata({ params }: { params: { page: string[] } }): Promise<Metadata> {
  const url_key = params.page[params.page.length - 1];

  try {
    // Fetch category data for metadata
    const categoryResponse = await magentoGraphQl(endpoint, 'getCategory', categoryQuery(), { url_key });

    if (categoryResponse.data?.categoryList?.length > 0) {
      const category = categoryResponse.data.categoryList[0];
      return {
        title: `${category.name} | ${process.env.M2_SITE_NAME}`,
        description: `Browse our collection of ${category.name} products.`,
      };
    }

    // If category not found, fetch product data
    const productResponse = await magentoGraphQl(endpoint, 'getProduct', getProductId(), { url_key });

    if (productResponse.data?.products?.items.length > 0) {
      const product = productResponse.data.products.items[0];
      return {
        title: `${product.name} | ${process.env.M2_SITE_NAME}`,
        description: `Buy ${product.name} at the best price.`,
      };
    }
  } catch (err) {
    console.error('Failed to generate metadata:', err);
  }

  return {
    title: `${process.env.M2_SITE_NAME}`,
    description: 'Browse our products and categories.',
  };
}
