import { Suspense } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <Suspense>
            <div>
                <div className="container mx-auto px-4 max-h-full xl:px-0 my-4">
                    {children}
                </div>
            </div>
        </Suspense>
    );
}