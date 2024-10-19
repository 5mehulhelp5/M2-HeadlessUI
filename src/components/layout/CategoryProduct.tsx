"use client";
import Image from 'next/image';
import { ProgressBarLink } from '@/components/context/progress-bar';
import magentoGraphQl from '@/lib/magento/graphQl/magentoGraphQl';
import getProductFilterByCategory from '@/lib/magento/queries/getProductFilterByCategory';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { ProductOfCategory, Variant, Attribute } from '@/lib/types';
import SkeletonLoader from '@/components/skelton/SkeletonLoader';
import { useLoader } from '@/components/context/PageLoaderContext';
import Price from '../object/Price';
import ConfigurableOptions from '../object/ConfigurableOption';
import SidebarFilter from '../object/SidebarFilter';
import { decode } from 'html-entities';
import { ProductSearch } from '@/lib/magento/queries/category';
import { transformDataIntoFilter } from '@/lib/magento/function/MakeSIdebarFilter';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import {
    ChevronDownIcon
} from '@heroicons/react/16/solid';
import { useAuth } from '@/components/customer/authenticate/AuthProvider';
interface CategoryProductProps {
    category_id: number;
    page?: number;
}

export default function CategoryProduct({ category_id }: CategoryProductProps) {
    const [productCache, setProductCache] = useState<{ [page: string]: ProductOfCategory[] }>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [pageLoader, setPageLoader] = useState<boolean>(false);
    const { showLoader, hideLoader } = useLoader();
    const [error, setError] = useState<string | null>(null);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [page, setPage] = useState<number>(1);
    const [sortData, setSortData] = useState<string>('position');
    const [categoryFilter, setCategoryFilter] = useState(null);
    const [mobileSidebar, setMobileSidebar] = useState<boolean>(false);
    const [sidebarFilter, setSidebarFilter] = useState<Record<string, string[]> | null>(null);
    const [filterCounter, setFilterCounter] = useState<number>(0);
    const [currentCategoryId, setCurrentCategoryId] = useState<number>(category_id);
    const perPageProduct = 12;
    const totalPages = Math.ceil(totalCount / perPageProduct);
    const { isLogin, cartId, user, guestCartId, createEmptyCart } = useAuth();
    const [isFirst, setIsFirst] = useState<boolean>(false);
    const [isHydrated, setIsHydrated] = useState<boolean>(false);
    const cacheKey = useMemo(() => `${page}-${sortData}-${filterCounter}`, [page, sortData, filterCounter]);
    // var cacheKey: string = `${page}-${sortData}-${filterCounter.toString()}`;
    async function fetchProducts(fetchFunction: () => Promise<void>, loader: (state: boolean) => void) {
        loader(true); // Start loading
        showLoader();
        await fetchFunction();
        loader(false); // End loading
        hideLoader();
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
            if (isFirst == false) setIsFirst(true);
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
        const timer = setTimeout(() => {
            setIsHydrated(true);
        })
        if (isHydrated) {
            if (shouldFetch) {
                fetchProducts(CategoryDataget, setLoading);
            }
        }
        return () => clearTimeout(timer);
    }, [isHydrated]);

    useEffect(() => {
        const shouldFetch = !productCache[cacheKey];

        if (shouldFetch && isFirst) {
            fetchProducts(CategoryDataget, setPageLoader);
        }
    }, [page, sortData]);

    useEffect(() => {
        if (sidebarFilter != null) {
            fetchProducts(fetchProductsWithFilter, setPageLoader);
        }
    }, [sidebarFilter]);

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        setTimeout(() => {
            const categoryDiv = document.getElementById('category-page');
            if (categoryDiv) {
                window.scroll({
                    top: categoryDiv.offsetTop,
                    behavior: 'smooth'
                });
            }
        },);
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
                <div className={`${mobileSidebar ? 'left-0' : '-left-96'} top-0 fixed z-50 lg:z-0 bg-white h-screen pr-3 lg:sticky lg:shrink-0 lg:h-full lg:pr-4 lg:block w-[300px] lg:top-5`}>
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

                    <div className="mt-2" id="category-page">
                        <div className="flex justify-between items-center py-2">
                            <div>
                                <p>{`Items ${((page - 1) * perPageProduct) + 1}-${Math.min(page * perPageProduct, totalCount)} of ${totalCount}`}</p>
                            </div>
                            <div className="flex gap-2 items-center">
                                <div className="border px-2 py-1.5 block lg:hidden">
                                    <button onClick={() => setMobileSidebar(!mobileSidebar)}>
                                        <svg className="stroke-gray-600 font-extralight" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"></path></svg>
                                    </button>
                                </div>
                                <div className="hidden sm:flex">
                                    <Menu>
                                        <MenuButton className="inline-flex items-center gap-2 rounded-md bg-gray-200  py-1.5 px-3 text-md font-semibold text-black shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-250 data-[open]:bg-gray-250 data-[focus]:outline-1 data-[focus]:outline-white">
                                            {sortData === 'position' && <span>Position</span>}
                                            {sortData === 'name' && <span>Product Name</span>}
                                            {sortData === 'price' && <span>Price</span>}
                                            <ChevronDownIcon className="size-5" />
                                        </MenuButton>
                                        <MenuItems
                                            transition
                                            anchor="bottom end"
                                            className="w-52 origin-top-right rounded-xl border border-white/5 p-1 text-md text-black bg-[#f5d9d9] transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] data-[closed]:scale-95 data-[closed]:opacity-0"
                                        >
                                            <MenuItem>
                                                <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 hover:bg-white data-[focus]:bg-white" onClick={e => setSortData('position')}>Position</button>
                                            </MenuItem>
                                            <MenuItem>
                                                <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white hover:bg-white" onClick={e => setSortData('name')}>Product Name</button>
                                            </MenuItem>
                                            <MenuItem>
                                                <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white hover:bg-white" onClick={e => setSortData('price')}>Price</button>
                                            </MenuItem>
                                        </MenuItems>
                                    </Menu>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-x-2 gap-y-2 sm:gap-x-4 sm:gap-y-4 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-4">
                            {products?.length === 0 ? (
                                <div className="col-span-full text-center text-gray-500">No products available</div>
                            ) : (
                                products?.map((product) => (
                                    <div key={product.id}>
                                        <div className="group rounded-md sm:p-4 p-3 w-full h-full relative group overflow-hidden border border-gray-200 hover:shadow-[0_3px_15px_-1px_rgba(0,0,0,0.1)] false">
                                            <form action="" onSubmit={(e) => handleAddToCart(e, product.id)}>
                                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden xl:aspect-h-8 xl:aspect-w-7">
                                                    <ProgressBarLink href={`/${product.url_key}`} className="flex justify-center">
                                                        <Image
                                                            src={product.small_image.url}
                                                            alt={product.small_image.label}
                                                            className="scale-90 group-hover:scale-100 transition duration-500 group-hover:rotate-1 object-cover"
                                                            width={209}
                                                            height={260}
                                                        />
                                                    </ProgressBarLink>
                                                </div>
                                                <div className="product-card-details relative">
                                                    <ProgressBarLink href={`/${product.url_key}`}>
                                                        <h3 className="mt-2 mb-0 text-md font-medium text-gray-700">{decode(product.name, { level: 'html5' })}</h3>
                                                    </ProgressBarLink>
                                                    <div className="flex gap-2 items-end">
                                                        <p className="mt-1 text-md font-medium text-primary">
                                                            <Price minimum_price={product.price_range.minimum_price} maximum_price={product.price_range.maximum_price} __typename={product.price_range.__typename} />
                                                        </p>
                                                    </div>
                                                    {/* configuration option  */}
                                                    {product.type_id === 'configurable' && product.configurable_options && (
                                                        <div className="pb-12">
                                                            <ConfigurableOptions options={product.configurable_options} isProductPage={false} />
                                                        </div>
                                                    )}
                                                    {/* Add to cart button */}
                                                    <div className="sm:flex hidden justify-between gap-1 absolute w-full h-10 left-0 -bottom-[120px] group-hover:bottom-[2px] transition-all duration-300 ease-in-out bg-white">
                                                        {product.type_id == "downloadable" && (
                                                            <ProgressBarLink href={`/${product.url_key}`} className="w-full">
                                                                <button className="btn-primary w-full">
                                                                    Product Details
                                                                </button>
                                                            </ProgressBarLink>
                                                        )}
                                                        {product.type_id !== "downloadable" && (
                                                            <button
                                                                className="btn-primary w-full"
                                                                type="submit"
                                                            >
                                                                Add to Cart
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

    interface AddToCartPayload {
        parentSku: string;
        sku: string | null;
        quantity: number;
        cartId: string | null;
    }

    async function handleAddToCart(event: React.FormEvent<HTMLFormElement>, productId: number) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const formValues: Record<string, FormDataEntryValue> = {};

        let missingRadioSelection = false;

        const radioInputs = Array.from(event.currentTarget.querySelectorAll<HTMLInputElement>('input[type="radio"]'));

        // Check for missing radio selections
        const radioNames = new Set(radioInputs.map(input => input.name));
        radioNames.forEach(name => {
            if (!event.currentTarget.querySelector(`input[name="${name}"]:checked`)) {
                missingRadioSelection = true;
            }
        });

        if (missingRadioSelection) {
            alert('Please select all required options before adding the product to the cart.');
            return;
        }

        // Collect form data
        formData.forEach((value, key) => {
            formValues[key] = value;
        });

        const product = products?.find(product => product.id === productId);
        if (!product) {
            console.error('Product not found');
            return;
        }
        const matchingVariant = product.variants?.find((variant: Variant) =>
            Object.entries(formValues).every(([key, value]) =>
                variant.attributes.some((attr: Attribute) => attr.code === key && attr.value_index == value)
            )
        );
        if (cartId != null && isLogin) {
            const addToCartPayload: AddToCartPayload = {
                parentSku: product.sku,
                sku: matchingVariant?.product.sku || 'No matching product found',
                quantity: 1,
                cartId: cartId
            };
            console.log(addToCartPayload);

        } else {
            const guestCart = guestCartId || await createEmptyCart();
            const addToCartPayload: AddToCartPayload = {
                parentSku: product.sku,
                sku: matchingVariant?.product.sku || null,
                quantity: 1,
                cartId: guestCart
            };
            console.log(addToCartPayload);
        }

    }
}