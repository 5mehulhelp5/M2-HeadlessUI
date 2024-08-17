"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Head from 'next/head'; // Import Head component
import magentoGraphQl from '../../lib/magento/graphQl/magentoGraphQl';
import { getProductData } from '../../lib/magento/queries/product';
import { ProductData } from '../../lib/types';
import ProductPageSkeleton from '../skelton/ProductPageSkeleton';

interface ProductPageProps {
    product_url: string;
}

const ProductPage: React.FC<ProductPageProps> = ({ product_url }) => {
    const [product, setProduct] = useState<ProductData | null>(null);
    const [selectedImage, setSelectedImage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await magentoGraphQl('', 'getProductData', getProductData(), { urlKey: product_url });
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
        "name": product.name,
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

    return (
        <>
            <Head>
                <title>{product.name} - My Store</title>
                <meta name="description" content={product.short_description.html || 'Product description not available'} />
                <meta property="og:title" content={product.name} />
                <meta property="og:description" content={product.short_description.html || 'Product description not available'} />
                <meta property="og:image" content={product.small_image.url} />
                <meta property="og:url" content={`https://www.mystore.com/product/${product_url}`} />
                <meta property="og:type" content="product" />
                <script type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            </Head>
            <div className="w-full container mx-auto p-4 text-black">
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-1 flex flex-col items-center">
                        <div className="relative w-full contents">
                            <Image
                                src={selectedImage}
                                alt={product.small_image.label}
                                className="object-contain rounded-lg shadow-lg"
                                width={450}
                                height={450}
                            />
                        </div>
                        <div className="mt-4 flex gap-4 overflow-x-auto">
                            {product.media_gallery.map((media) => (
                                <button key={media.url} onClick={() => setSelectedImage(media.url)} className="flex-shrink-0">
                                    <img
                                        src={media.url}
                                        alt={media.label}
                                        className="w-24 h-24 object-cover rounded-lg shadow-md"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                        <p className="text-lg text-gray-700 mb-4">{product.sku}</p>
                        <div className="flex items-center mb-4">
                            <span className="text-xl font-semibold mr-2">
                                {product.price_range.minimum_price.final_price.value} {product.price_range.minimum_price.final_price.currency}
                            </span>
                            <span className="text-sm text-gray-500 line-through">
                                {product.price_range.maximum_price.regular_price.value} {product.price_range.maximum_price.regular_price.currency}
                            </span>
                        </div>
                        <div className="mb-4">
                            <h2 className="text-xl font-semibold mb-2">Description</h2>
                            <div dangerouslySetInnerHTML={{ __html: product.description.html }} />
                        </div>
                        <div className="mb-4">
                            <h2 className="text-xl font-semibold mb-2">Short Description</h2>
                            <div dangerouslySetInnerHTML={{ __html: product.short_description.html }} />
                        </div>
                        <div className="mb-4">
                            <h2 className="text-xl font-semibold mb-2">Reviews</h2>
                            {product.reviews.items.length > 0 ? (
                                product.reviews.items.map((review, index) => (
                                    <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg">
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
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductPage;
