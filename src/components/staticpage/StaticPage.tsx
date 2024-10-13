"use client";
import { useEffect, useState } from "react";
import Head from 'next/head';
import magentoGraphQl from "@/lib/magento/graphQl/magentoGraphQl";
import { decode } from "html-entities";

export const QueryOfPage = `query GetCmsPage($identifier: String!) {
    getCmsPage(identifier: $identifier) {
        identifier
        title
        content
        is_active
        meta_description
        meta_keywords
        content_heading
    }
}`;

export default function StaticPage({ url_key }: { url_key: string }) {
    const [page, setPage] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [currentUrlKey, setCurrentUrlKey] = useState<string>(url_key);

    const fetchPage = async (identifier: string) => {
        try {
            const result = await magentoGraphQl('', 'GetCmsPage', QueryOfPage, { identifier });
            if (result.data.getCmsPage) {
                setError(false);
                setPage(result.data.getCmsPage);
            } else {
                setError(true);
                setCurrentUrlKey('no-route');
            }
        } catch (error) {
            console.error('Error fetching CMS page:', error);
            setError(true);
            setCurrentUrlKey('no-route');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPage(currentUrlKey);
    }, [currentUrlKey]);

    if (loading) {
        // Skeleton loading state
        return (
            <div className="p-4">
                <div className="animate-pulse space-y-4">
                    <div className="h-8 bg-gray-300 rounded w-3/4"></div> {/* Title skeleton */}
                    <div className="h-6 bg-gray-300 rounded w-1/2"></div> {/* Subtitle skeleton */}
                    <div className="space-y-2">
                        <div className="h-4 bg-gray-300 rounded"></div> {/* Content skeleton line 1 */}
                        <div className="h-4 bg-gray-300 rounded"></div> {/* Content skeleton line 2 */}
                        <div className="h-4 bg-gray-300 rounded w-5/6"></div> {/* Content skeleton line 3 */}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Head>
                <title>{page?.content_heading || 'Page Not Found'}</title>
                <meta name="description" content={page?.meta_description || "Default meta description"} />
            </Head>
            <div className="p-4">
                <h1 className="text-2xl font-bold">{page?.title || 'No Route'}</h1>
                <div dangerouslySetInnerHTML={{ __html: decode(page?.content || '') }} />
            </div>
        </div>
    );
}
