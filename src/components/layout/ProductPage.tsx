"use client";
import React, { useEffect, useState, useRef } from 'react';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import Example from '../object/Tab';
import Image from 'next/image';
import Head from 'next/head'; // Import Head component
import magentoGraphQl from '../../lib/magento/graphQl/magentoGraphQl';
import { getProductData } from '../../lib/magento/queries/product';
import { ShoppingCartIcon } from '@heroicons/react/20/solid';
import { ProductData } from '../../lib/types';
import Price from '../object/Price';
import { ProductRating } from '../object/Review'
import ConfigurableOptions from '../object/ConfigurableOption';
import ProductPageSkeleton from '../skelton/ProductPageSkeleton';
import { decode } from 'html-entities';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import QuantityInput from '../object/QuantityBox';
import { Swiper as SwiperClass } from 'swiper/types';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

interface ProductPageProps {
    product_url: string;
}

const ProductPage: React.FC<ProductPageProps> = ({ product_url }) => {
    const [product, setProduct] = useState<ProductData | null>(null);
    const [selectedImage, setSelectedImage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);


    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await magentoGraphQl('', 'GetProductDetailForATCDialog', getProductData(), { url_key: product_url });
                const fetchedProduct = response.data?.products?.items[0];
                if (fetchedProduct) {
                    setProduct(fetchedProduct);
                    setSelectedImage(fetchedProduct.small_image.url);
                } else {
                    setError('Product not found');
                }
            } catch (error) {
                console.error('Error fetching product data:', error);
                setError('Failed to load product data');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [product_url]);

    if (loading) return <ProductPageSkeleton />;
    if (error) return <div>{error}</div>;
    if (!product) return <div>Product not found</div>;

    // Ensuring average_rating is between 0 and 5
    const averageRating = Math.max(0, Math.min(5, product.rating_summary / 20));

    // Generate structured data
    const schema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": decode(product.name),
        "image": product.small_image.url,
        "description": product.short_description.html,
        "sku": product.sku,
        "offers": {
            "@type": "Offer",
            "priceCurrency": product.price_range.minimum_price.final_price.currency,
            "price": product.price_range.minimum_price.final_price.value,
            "itemCondition": "https://schema.org/NewCondition",
            "availability": "https://schema.org/InStock",
            "seller": {
                "@type": "Organization",
                "name": "My Store"
            }
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": averageRating,
            "reviewCount": product.reviews.items.length
        }
    };
    console.log(product)
    return (
        <>
            <Head>
                <title>{decode(product.name)} - My Store</title>
                <meta name="description" content={product.short_description.html || 'Product description not available'} />
                <meta property="og:title" content={decode(product.name)} />
                <meta property="og:description" content={product.short_description.html || 'Product description not available'} />
                <meta property="og:image" content={product.small_image.url} />
                <meta property="og:url" content={`https://www.mystore.com/product/${product_url}`} />
                <meta property="og:type" content="product" />
                <script type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            </Head>
            <div className="container mx-auto px-4 xl:px-0">
                <div className="flex mt-8">
                    <div className="w-full">
                        <div className="grid grid-cols-1 md:grid-cols-8 gap-5 sm:gap-9 lg:gap-10 xl:gap-7 md:px-0">
                            <div className="col-span-full sm:col-span-1 md:col-span-4 md:mt-0 mt-6">
                                <div className="w-full">
                                    <Swiper
                                        style={{
                                            '--swiper-navigation-color': '#222222',
                                            '--swiper-pagination-color': '#222222',
                                            '--font-size': '10px',
                                            '--swiper-navigation-size': '24px'
                                        } as React.CSSProperties} 
                                        loop={true}
                                        spaceBetween={10}
                                        navigation={true}
                                        thumbs={{ swiper: thumbsSwiper }}
                                        modules={[FreeMode, Navigation, Thumbs]}
                                        className='w-[478px] product-gallery'
                                    >
                                        {product.media_gallery.map((media) => (
                                            <SwiperSlide key={media.label}>
                                                <Image
                                                    src={media.url}
                                                    alt={media.label}
                                                    className="w-full"
                                                    width={400}
                                                    height={400}
                                                />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                    <Swiper
                                        onSwiper={setThumbsSwiper}
                                        loop={true}
                                        spaceBetween={1}
                                        slidesPerView={product.media_gallery.length}
                                        freeMode={true}
                                        watchSlidesProgress={true}
                                        modules={[FreeMode, Navigation, Thumbs]}
                                        className="mySwiper my-4 "
                                    >
                                        {product.media_gallery.map((media) => (
                                            <SwiperSlide className="!w-max" key={media.label}>
                                                <Image
                                                    src={media.url}
                                                    alt={media.label}
                                                    className="rounded-lg shadow-md"
                                                    width={100}
                                                    height={100}
                                                />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                            </div>
                            <div className="col-span-full sm:col-span-1 md:col-span-4">
                                <form action="[product-url]">
                                    <div>
                                        <h3 className="sm:text-2xl text-xl  font-semibold mb-2">{decode(product.name)}</h3>
                                        {product.short_description.html && (
                                            <div className="text-gray-500 mb-2" dangerouslySetInnerHTML={{ __html: product.short_description.html }} />
                                        )}
                                        {
                                            product.short_description.html == '' && (
                                                <div className="text-gray-500 mb-2" dangerouslySetInnerHTML={{ __html: product.description.html?.match(/<p>(.*?)<\/p>/)?.[0] || '' }} />
                                            )
                                        }
                                        <div className="flex gap-3 items-center">
                                            <div className="flex flex-row gap-2 items-center">
                                                <p className="sm:text-xl flex gap-2 text-lg font-medium text-primary after:content-['|'] after:text-gray-500">
                                                    <Price minimum_price={product.price_range.minimum_price} maximum_price={product.price_range.maximum_price} __typename={product.price_range.__typename} />
                                                </p>
                                            </div>

                                            <div className="flex gap-2 items-center">
                                                <ProductRating ratingSummary={product.rating_summary}
                                                    reviewCount={product.review_count} />
                                            </div>
                                        </div>
                                        <div className="mt-2 sm:text-lg text-sm">SKU: <span className='font-semibold'>{product.sku}</span></div>
                                        {product.type_id === 'configurable' && product.configurable_options && (
                                            <ConfigurableOptions options={product.configurable_options} isProductPage={true} />

                                        )}
                                        <div className="border-dashed border border-primary"></div>
                                        <div className="my-4">
                                            <div className="flex gap-3">
                                                <QuantityInput />
                                            </div>
                                            <div>
                                            </div>
                                            <div className="flex gap-2 justify-between mt-3">
                                                <button type="submit" className="text-sm sm:text-[18px] bg-primary hover:bg-secondary p-2 rounded-[3px] text-white w-full flex items-center justify-center gap-2"
                                                    onClick={(event) => event.preventDefault()}>
                                                    <span>
                                                        <ShoppingCartIcon className="w-5 h-5" />
                                                    </span>
                                                    <span>ADD TO CART</span>
                                                </button>
                                                <button type="submit" className="text-sm sm:text-[18px] hover:bg-primary hover:text-white border-primary duration-500 transition border-2 p-2 rounded-[3px] text-primary w-full flex justify-center"
                                                    onClick={(event) => event.preventDefault()}>
                                                    <span>BUY NOW</span>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="border-dashed border border-primary mb-4"></div>
                                        <div className="pb-5 flex gap-4 text-gray-500">
                                            <p>Share it :</p>
                                            <ul className="flex gap-4 items-center">
                                                <li><a href="#" className="hover:text-primary"><i className="fa-brands fa-instagram"></i></a></li>
                                                <li><a href="#" className="hover:text-primary"><i className="fa-brands fa-facebook"></i></a></li>
                                                <li><a href="#" className="hover:text-primary"><i className="fa-brands fa-twitter"></i></a></li>
                                                <li><a href="#" className="hover:text-primary"><i className="fa-brands fa-linkedin-in"></i></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="mt-8">
                            {/* <Example/> */}
                            <TabGroup>
                                <TabList className=" flex gap-2 border-b border-gray-300 ">
                                    <Tab className="p-2 rounded-t-md data-[selected]:bg-[#f5d9d9] data-[hover]:bg-[#f5d9d9] data-[focus]:outline-none data-[focus]:ring-0 font-semibold">Product Description</Tab>
                                    <Tab className="p-2 rounded-t-md data-[selected]:bg-[#f5d9d9] data-[hover]:bg-[#f5d9d9] data-[focus]:outline-none data-[focus]:ring-0 font-semibold">Reviews</Tab>
                                </TabList>
                                <TabPanels>
                                    <TabPanel>
                                        <div className="mt-5" dangerouslySetInnerHTML={{ __html: product.description.html }} />
                                    </TabPanel>
                                    <TabPanel>
                                        <div className="mt-5">
                                            {product.reviews.items.length > 0 ? (
                                                product.reviews.items.map((review, index) => (
                                                    <div key={index} className="mb-4 p-4 border border-[#f5d9d9] rounded-lg">
                                                        <h3 className="text-lg font-semibold">{review.nickname}</h3>
                                                        <div className="flex items-center mb-2">
                                                            <span className="text-yellow-500">
                                                                {'★'.repeat(averageRating)}
                                                                {'☆'.repeat(5 - averageRating)}
                                                            </span>
                                                            <span className="ml-2 text-gray-600">({averageRating})</span>
                                                        </div>
                                                        <p className="text-gray-700">{review.summary}</p>
                                                        <p className="text-gray-500">{review.text}</p>
                                                        <p className="text-gray-400 text-sm">{new Date(review.created_at).toLocaleDateString()}</p>
                                                    </div>
                                                ))
                                            ) : (
                                                <p>No reviews yet.</p>
                                            )}
                                        </div>
                                    </TabPanel>
                                </TabPanels>
                            </TabGroup>
                        </div>
                    </div>
                    <div className="top-0 hidden
				  z-50 lg:z-10 h-screen lg:pl-8 lg:sticky lg:h-full lg:block lg:w-[300px] lg:top-5 xl:w-[380px] 2xl:w-[440px]"></div>
                </div>
                <div className="w-ful mt-5">

                </div>
            </div>
        </>
    );
};

export default ProductPage;
