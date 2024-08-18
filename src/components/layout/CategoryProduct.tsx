"use client";
import Image from 'next/image';
import Link from 'next/link';
import magentoGraphQl from '@/lib/magento/graphQl/magentoGraphQl';
import getProductFilterByCategory from '@/lib/magento/queries/getProductFilterByCategory';
import { useState, useEffect, use } from 'react';
import { ProductOfCategory } from '@/lib/types';
import SkeletonLoader from '@/components/skelton/SkeletonLoader';
import PageLoader from '@/components/skelton/PageLoader';
import Price from '../object/Price';
import ConfigurableOptions from '../object/ConfigurableOption';
import SidebarFilter from '../object/SidebarFilter';
import { decode } from 'html-entities';
import { ProductSearch } from '@/lib/magento/queries/category';
import { transformDataIntoFilter } from '@/lib/magento/function/MakeSIdebarFilter'

interface CategoryProductProps {
    category_id: number;
}

export default function CategoryProduct({ category_id }: CategoryProductProps) {
    const [productCache, setProductCache] = useState<{ [page: string]: ProductOfCategory[] }>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [pageLoader, setPageLoader] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [page, setPage] = useState<number>(1);
    const [sortData, setSortData] = useState<string>('position');
    const [categoryFilter, setCategoryFilter] = useState(null);
    const [mobileSidebar, setMobileSidebar] = useState<boolean>(false);
    const [sidebarFilter, setSidebarFilter] = useState<Record<string, string[]> | null>(null);
    const [filterCounter, setFilterCounter] = useState<number>(0);
    const [currentCategoryId, setCurrentCategoryId] = useState<number>(category_id);
    const perPageProduct = 8;
    const totalPages = Math.ceil(totalCount / perPageProduct);
    var cacheKey: string = `${page}-${sortData}-${filterCounter.toString()}`;
    async function fetchProducts(fetchFunction: () => Promise<void>, loader: (state: boolean) => void) {
        loader(true); // Start loading
        await fetchFunction();
        loader(false); // End loading
    }
    
    async function CategoryDataget() {
        try {
            const response = await magentoGraphQl(
                '',
                'getProductFilterByCategory',
                getProductFilterByCategory(),
                { categoryIdFilter: { eq: category_id }, pageSize: perPageProduct, currentPage: page, sort: { [sortData]: 'ASC' } }
            );
            const fetchedProducts = response.data?.products?.items || [];
    
            // Update the cache with the new products
            setProductCache(prevCache => ({
                ...prevCache,
                [cacheKey]: fetchedProducts,
            }));
            setTotalCount(response.data?.products?.total_count || 0);
            if (!categoryFilter) {
                setCategoryFilter(response.data?.products?.aggregations);
            }
        } catch (err) {
            setError('Failed to fetch products');
        }
    }
    
    async function fetchProductsWithFilter() {
        if (!sidebarFilter) return;
        
        const filterFromFunction = transformDataIntoFilter(sidebarFilter);
        if (!filterFromFunction) {
            await CategoryDataget();
            return;
        }
        
        filterFromFunction['category_id'] = { eq: currentCategoryId };
        
        try {
            const response = await magentoGraphQl(
                '',
                'ProductSearch',
                ProductSearch,
                {
                    currentPage: 1,
                    filters: filterFromFunction,
                    inputText: "",
                    pageSize: perPageProduct,
                    sort: { [sortData]: 'ASC' }
                }
            );
            const fetchedProducts = response.data?.products?.items || [];
            setProductCache(prevCache => ({
                ...prevCache,
                [cacheKey]: fetchedProducts,
            }));
            setTotalCount(response.data?.products?.total_count || 0);
        } catch (err) {
            setError('Failed to fetch products');
        }
    }
    
    useEffect(() => {
        const shouldFetch = !productCache[cacheKey];
    
        if (shouldFetch) {
            fetchProducts(CategoryDataget, setLoading);
        }
    }, [category_id]);
    
    useEffect(() => {
        const shouldFetch = !productCache[cacheKey];
    
        if (shouldFetch) {
            fetchProducts(CategoryDataget, setPageLoader);
        }
    }, [page, sortData]);
    
    useEffect(() => {
        fetchProducts(fetchProductsWithFilter, setPageLoader);
    }, [sidebarFilter]);
    
    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    if (loading) return <SkeletonLoader />;
    if (error) return <div className="col-span-full text-center text-red-500">{error}</div>;

    const products = productCache[cacheKey] ?? Object.values(productCache).pop();


    return (
        <>
            {mobileSidebar && (
                <div className="false w-full h-screen bg-black bg-opacity-40 z-40 left-0 top-0 fixed" onClick={() => setMobileSidebar(!mobileSidebar)}></div>
            )}
            <div className="flex">
                <div className={`${mobileSidebar == true ? 'left-0' : '-left-96'} top-0 fixed z-50 lg:z-0 bg-white h-screen pr-3 lg:sticky lg:shrink-0 lg:h-full lg:pr-4 lg:block w-[300px] lg:top-5`}>
                    <div className="lg:mt-2">
                        <div className="layered pt-4 px-3 lg:px-4 lg:py-3">
                            {/* Your sidebar content here */}
                            {categoryFilter && (
                                <SidebarFilter filters={categoryFilter} setSidebarFilter={setSidebarFilter} />
                            )}
                        </div>
                    </div>
                </div>
                <div className="w-full">
                    {pageLoader && (<PageLoader />)}
                    <div className="mt-2">
                        <div className="flex justify-between items-center py-2">
                            <div>
                                <p>{`Items ${((page - 1) * perPageProduct) + 1}-${Math.min(page * perPageProduct, totalCount)} of ${totalCount}`}</p>
                            </div>
                            <div className="flex gap-2 items-center">
                                <div className="border px-2 py-1.5 block lg:hidden">
                                    <button onClick={() => setMobileSidebar(!mobileSidebar)}>
                                        <svg className="stroke-gray-600 font-extralight" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"></path></svg>
                                    </button>
                                </div>
                                <div className="hidden sm:flex">
                                    <select className=" py-1 border appearance-none border-base-100 focus:outline-none text-base-300 svg_icon cursor-pointer capitalize" onChange={e => setSortData(e.target.value)} value={sortData}>
                                        <option value="position">Position</option>
                                        <option value="name">Product Name</option>
                                        <option value="price">Price</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-x-2 gap-y-2 sm:gap-x-4 sm:gap-y-4 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-4">
                            {products.length === 0 ? (
                                <div className="col-span-full text-center text-gray-500">No products available</div>
                            ) : (
                                products.map((product) => (
                                    <div key={product.id}>
                                        <div className="group rounded-md sm:p-4 p-3 w-full h-full relative group overflow-hidden border border-gray-200 hover:shadow-[0_3px_15px_-1px_rgba(0,0,0,0.1)] false">
                                            <form action="" onSubmit={(e) => handleAddToCart(e, product.id)}>
                                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden xl:aspect-h-8 xl:aspect-w-7">
                                                    <Link href={`/${product.url_key}`} className="flex justify-center">
                                                        <Image
                                                            src={product.small_image.url}
                                                            alt={product.small_image.label}
                                                            className="scale-90 group-hover:scale-100 transition duration-500 group-hover:rotate-1 object-cover"
                                                            width={209}
                                                            height={260}
                                                        />
                                                    </Link>
                                                </div>
                                                <div className="product-card-details relative">
                                                    <Link href={`/${product.url_key}`}>
                                                        <h3 className="mt-2 mb-0 text-md font-medium text-gray-700">{decode(product.name, { level: 'html5' })}</h3>
                                                    </Link>
                                                    <div className="flex gap-2 items-end">
                                                        <p className="mt-1 text-md font-medium text-primary">
                                                            <Price minimum_price={product.price_range.minimum_price} maximum_price={product.price_range.maximum_price} __typename={product.price_range.__typename} />
                                                        </p>
                                                    </div>
                                                    {/* configuration option  */}
                                                    {product.type_id === 'configurable' && product.configurable_options && (
                                                        <div className="pb-12">
                                                            <ConfigurableOptions options={product.configurable_options} />
                                                        </div>
                                                    )}

                                                    {/* Add to cart button */}
                                                    <div className="sm:flex hidden justify-between gap-1 absolute w-full h-10 left-0 -bottom-[120px] group-hover:bottom-[2px] transition-all duration-300 ease-in-out bg-white">
                                                        {product.type_id == "downloadable" && (
                                                            <Link href={`/${product.url_key}`} className="w-full">
                                                                <button className="bg-primary hover:bg-secondary p-2 rounded-[3px] text-white w-full flex justify-center">
                                                                    <span>Product Details</span>
                                                                </button>
                                                            </Link>
                                                        )}
                                                        {product.type_id !== "downloadable" && (
                                                            <button
                                                                className="bg-primary hover:bg-secondary p-2 rounded-[3px] text-white w-full flex justify-center"
                                                                type="submit"
                                                            >
                                                                <span>Add to Cart</span>
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                        {/* Pagination */}
                        <div className="flex items-center justify-center gap-3 mt-5">
                            {Array.from({ length: totalPages }, (_, index) => (
                                <button
                                    key={index}
                                    className={`relative h-10 max-h-[40px] w-10 max-w-[40px] rounded text-center align-middle font-sans text-xs font-medium uppercase transition-all ${page === index + 1 ? 'bg-primary text-white cursor-not-allowed' : 'text-teal-900 hover:bg-primary/10'}`}
                                    onClick={() => handlePageChange(index + 1)}
                                    disabled={page === index + 1}
                                >
                                    <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                        {index + 1}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

    function handleAddToCart(event: React.FormEvent<HTMLFormElement>, productId: number) {
        event.preventDefault();

        // Create a new FormData object to collect input data from the form
        const formData = new FormData(event.currentTarget);

        // Convert FormData entries to a key-value object, filtering for checked inputs
        const formValues: Record<string, FormDataEntryValue> = {};

        // Track if any required radio input is missing a selection
        let missingRadioSelection = false;

        // Get all radio inputs in the form
        const radioInputs = event.currentTarget.querySelectorAll('input[type="radio"]');

        // Check if there are any radio inputs
        if (radioInputs.length > 0) {
            const radioNames = new Set<string>();
            radioInputs.forEach((input: any) => {
                radioNames.add(input?.name);
            });

            radioNames.forEach((name) => {
                const selectedRadio = event.currentTarget.querySelector(`input[name="${name}"]:checked`);
                if (!selectedRadio) {
                    missingRadioSelection = true;
                }
            });
        }

        // If any radio button group has no selected option, show an alert and stop the process
        if (missingRadioSelection) {
            alert('Please select all required options before adding the product to the cart.');
            return;
        }

        // Continue to collect form data
        formData.forEach((value, key) => {
            formValues[key] = value;
        });

        // Log the collected form values
        console.log('Form data:', formValues);

        // Implement your add-to-cart logic here, using the productId and formValues
        console.log('Adding product to cart:', productId, formValues);
    }

}
