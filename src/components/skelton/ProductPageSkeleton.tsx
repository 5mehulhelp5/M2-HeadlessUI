import React from 'react';

const ProductPageSkeleton: React.FC = () => {
  return (
    <div className="container mx-auto px-4 xl:px-0">
    <div className="flex mt-8">
        <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-8 gap-5 sm:gap-9 lg:gap-10 xl:gap-7 md:px-0">
                <div className="col-span-full sm:col-span-1 md:col-span-4 md:mt-0 mt-5">
                    <div className="w-full inline-table animate-pulse">
                        <div className="rounded react-loading-skeleton h-96"></div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-full inline-table animate-pulse">
                            <div className="rounded react-loading-skeleton h-24"></div>
                        </div>
                        <div className="w-full inline-table animate-pulse">
                            <div className="rounded react-loading-skeleton h-24"></div>
                        </div>
                        <div className="w-full inline-table animate-pulse">
                            <div className="rounded react-loading-skeleton h-24"></div>
                        </div>
                        <div className="w-full inline-table animate-pulse">
                            <div className="rounded react-loading-skeleton h-24"></div>
                        </div>
                    </div>
                </div>
                <div className="col-span-full sm:col-span-1 md:col-span-4">
                    <div className="w-full inline-table animate-pulse">
                        <h3 className="rounded react-loading-skeleton h-8"></h3>
                        <div className="flex items-center gap-3 mt-3">
                            <div className="inline-table animate-pulse">
                                <div className="rounded react-loading-skeleton px-8 py-4"></div>
                            </div>
                            <div className="w-full inline-table animate-pulse">
                                <div className="flex gap-5 items-center">
                                    <div className="inline-table animate-pulse">
                                        <p className="rounded react-loading-skeleton px-6 py-4"></p>
                                    </div>
                                    <div className="inline-table animate-pulse">
                                        <p className="rounded react-loading-skeleton px-16 py-3"></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="inline-table animate-pulse mt-3">
                            <p className="rounded react-loading-skeleton px-16 py-3"></p>
                        </div>
                        <div className="border-dashed border border-gray-300 my-4"></div>
                        <div>
                            <div className="flex gap-2 items-center">
                                <div className="inline-table animate-pulse">
                                    <p className="rounded react-loading-skeleton p-5"></p>
                                </div>
                                <div className="inline-table animate-pulse">
                                    <p className="rounded react-loading-skeleton p-5"></p>
                                </div>
                                <div className="inline-table animate-pulse">
                                    <p className="rounded react-loading-skeleton p-5"></p>
                                </div>
                                <div className="inline-table animate-pulse">
                                    <p className="rounded react-loading-skeleton p-5"></p>
                                </div>
                            </div>
                            <div className="flex gap-3 items-center mt-2">
                                <div className="w-full inline-table animate-pulse">
                                    <p className="rounded h-10 react-loading-skeleton"></p>
                                </div>
                                <div className="w-full inline-table animate-pulse">
                                    <p className="rounded h-10 react-loading-skeleton"></p>
                                </div>
                            </div>
                        </div>
                        <div className="border-dashed border border-gray-300 my-4"></div>
                        <h4 className="rounded h-5 react-loading-skeleton"></h4>
                        <div className="my-3 rounded-[3px]">
                            <div className="rounded h-3 react-loading-skeleton"></div>
                            <div className="rounded h-3 react-loading-skeleton"></div>
                            <div className="rounded h-3 react-loading-skeleton"></div>
                            <div className="rounded h-3 react-loading-skeleton"></div>
                            <div className="rounded h-3 react-loading-skeleton"></div>
                        </div>
                        <div className="rounded h-3 react-loading-skeleton"></div>
                        <div className="rounded h-3 react-loading-skeleton"></div>
                        <div className="rounded h-3 react-loading-skeleton"></div>
                        <div className="rounded h-3 react-loading-skeleton"></div>
                        <div className="border-dashed border border-gray-300 my-4"></div>
                        <div className="pb-5 flex gap-4 text-gray-500">
                            <div className="flex gap-2 items-center">
                                <div className="inline-table animate-pulse">
                                    <p className="rounded-2xl react-loading-skeleton px-14 py-3"></p>
                                </div>
                                <div className="inline-table animate-pulse">
                                    <p className="rounded-2xl react-loading-skeleton p-3"></p>
                                </div>
                                <div className="inline-table animate-pulse">
                                    <p className="rounded-2xl react-loading-skeleton p-3"></p>
                                </div>
                                <div className="inline-table animate-pulse">
                                    <p className="rounded-2xl react-loading-skeleton p-3"></p>
                                </div>
                                <div className="inline-table animate-pulse">
                                    <p className="rounded-2xl react-loading-skeleton p-3"></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="product-description">
                <div className="flex gap-2 items-center">
                    <div className="inline-table animate-pulse">
                        <p className="rounded-2xl react-loading-skeleton px-14 py-5"></p>
                    </div>
                    <div className="inline-table animate-pulse">
                        <p className="rounded-2xl react-loading-skeleton px-14 py-5"></p>
                    </div>
                    <div className="inline-table animate-pulse">
                        <p className="rounded-2xl react-loading-skeleton px-14 py-5"></p>
                    </div>
                </div>
                <div className="rounded h-3 react-loading-skeleton"></div>
                <div className="rounded h-3 react-loading-skeleton"></div>
                <div className="rounded h-3 react-loading-skeleton"></div>
                <div className="rounded h-3 react-loading-skeleton"></div>
                <div className="rounded h-3 react-loading-skeleton"></div>
                <div className="rounded h-3 react-loading-skeleton"></div>
                <div className="rounded h-3 react-loading-skeleton"></div>
                <div className="rounded h-3 react-loading-skeleton"></div>
                <div className="rounded h-3 react-loading-skeleton"></div>
                <div className="rounded h-3 react-loading-skeleton"></div>
                <div className="rounded h-3 react-loading-skeleton"></div>
            </div>
        </div>
        <div
            className="top-0 hidden z-50 lg:z-10 h-screen lg:pl-8 lg:sticky lg:h-full lg:block lg:w-[300px] lg:top-5 xl:w-[380px] 2xl:w-[440px]">
            <div className="border p-4 rounded-md text-gray-500 bg-white">
                <div className="flex gap-3 items-center py-2">
                    <div className="inline-table animate-pulse">
                        <div className=" rounded h-10 react-loading-skeleton p-5"></div>
                    </div>
                    <div className="w-full inline-table animate-pulse">
                        <div className=" rounded h-6 react-loading-skeleton"></div>
                        <div className=" rounded h-3 react-loading-skeleton"></div>
                    </div>
                </div>
                <div className="flex gap-3 items-center py-2">
                    <div className="inline-table animate-pulse">
                        <div className=" rounded h-10 react-loading-skeleton p-5"></div>
                    </div>
                    <div className="w-full inline-table animate-pulse">
                        <div className=" rounded h-6 react-loading-skeleton"></div>
                        <div className=" rounded h-3 react-loading-skeleton"></div>
                    </div>
                </div>
                <div className="flex gap-3 items-center py-2">
                    <div className="inline-table animate-pulse">
                        <div className=" rounded h-10 react-loading-skeleton p-5"></div>
                    </div>
                    <div className="w-full inline-table animate-pulse">
                        <div className=" rounded h-6 react-loading-skeleton"></div>
                        <div className=" rounded h-3 react-loading-skeleton"></div>
                    </div>
                </div>
                <div className="flex gap-3 items-center py-2">
                    <div className="inline-table animate-pulse">
                        <div className=" rounded h-10 react-loading-skeleton p-5"></div>
                    </div>
                    <div className="w-full inline-table animate-pulse">
                        <div className=" rounded h-6 react-loading-skeleton"></div>
                        <div className=" rounded h-3 react-loading-skeleton"></div>
                    </div>
                </div>
                <div className="flex gap-3 items-center py-2">
                    <div className="inline-table animate-pulse">
                        <div className=" rounded h-10 react-loading-skeleton p-5"></div>
                    </div>
                    <div className="w-full inline-table animate-pulse">
                        <div className=" rounded h-6 react-loading-skeleton"></div>
                        <div className=" rounded h-3 react-loading-skeleton"></div>
                    </div>
                </div>
            </div>
            <div className="border p-4 rounded-md mt-6 bg-white">
                <div className="w-full inline-table animate-pulsess mb-4">
                    <h3 className="rounded h-8 react-loading-skeleton"></h3>
                </div>
                <div>
                    <div className="flex items-center gap-4">
                        <div className="inline-table animate-pulse">
                            <div className="rounded react-loading-skeleton p-10"></div>
                        </div>
                        <div className="w-full inline-table animate-pulse">
                            <h4 className="rounded h-6 react-loading-skeleton"></h4>
                            <div className="flex gap-3 items-center mt-2">
                                <div className="w-full inline-table animate-pulse">
                                    <p className="rounded h-6 react-loading-skeleton"></p>
                                </div>
                                <div className="w-full inline-table animate-pulse">
                                    <p className="rounded h-6 react-loading-skeleton"></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="border-dashed border border-gray-300 m-4"></div>
                    <div className="flex items-center gap-4">
                        <div className="inline-table animate-pulse">
                            <div className="rounded react-loading-skeleton p-10"></div>
                        </div>
                        <div className="w-full inline-table animate-pulse">
                            <h4 className="rounded h-6 react-loading-skeleton"></h4>
                            <div className="flex gap-3 items-center mt-2">
                                <div className="w-full inline-table animate-pulse">
                                    <p className="rounded h-6 react-loading-skeleton"></p>
                                </div>
                                <div className="w-full inline-table animate-pulse">
                                    <p className="rounded h-6 react-loading-skeleton"></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="border-dashed border border-gray-300 m-4"></div>
                    <div className="flex items-center gap-4">
                        <div className="inline-table animate-pulse">
                            <div className="rounded react-loading-skeleton p-10"></div>
                        </div>
                        <div className="w-full inline-table animate-pulse">
                            <h4 className="rounded h-6 react-loading-skeleton"></h4>
                            <div className="flex gap-3 items-center mt-2">
                                <div className="w-full inline-table animate-pulse">
                                    <p className="rounded h-6 react-loading-skeleton"></p>
                                </div>
                                <div className="w-full inline-table animate-pulse">
                                    <p className="rounded h-6 react-loading-skeleton"></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div className="py-5">
        <div className="w-full col-span-full">
            <div
                className="grid sm:px-0 grid-cols-2 gap-x-2 gap-y-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 lg:gap-x-3 xl:grid-cols-6 xl:gap-x-3">
                <div
                    className="group rounded-md p-4 w-full relative group overflow-hidden border border-gray-200 hover:shadow-[0_3px_15px_-1px_rgba(0,0,0,0.1)]">
                    <div className="w-full inline-table animate-pulse">
                        <div className="bg-gray-200 rounded react-loading-skeleton h-40 md:h-52"></div>
                        <div className="bg-gray-300 rounded react-loading-skeleton h-4 mt-3"></div>
                        <div className="bg-gray-300 rounded react-loading-skeleton h-3 mt-3"></div>
                        <div className="bg-gray-300 rounded react-loading-skeleton h-2 mt-3"></div>
                    </div>
                </div>
                <div
                    className="group rounded-md p-4 w-full relative group overflow-hidden border border-gray-200 hover:shadow-[0_3px_15px_-1px_rgba(0,0,0,0.1)]">
                    <div className="w-full inline-table animate-pulse">
                        <div className="bg-gray-200 rounded react-loading-skeleton h-40 md:h-52"></div>
                        <div className="bg-gray-300 rounded react-loading-skeleton h-4 mt-3"></div>
                        <div className="bg-gray-300 rounded react-loading-skeleton h-3 mt-3"></div>
                        <div className="bg-gray-300 rounded react-loading-skeleton h-2 mt-3"></div>
                    </div>
                </div>
                <div
                    className="group rounded-md p-4 w-full relative group overflow-hidden border border-gray-200 hover:shadow-[0_3px_15px_-1px_rgba(0,0,0,0.1)] hidden sm:block">
                    <div className="w-full inline-table animate-pulse">
                        <div className="bg-gray-200 rounded react-loading-skeleton h-40 md:h-52"></div>
                        <div className="bg-gray-300 rounded react-loading-skeleton h-4 mt-3"></div>
                        <div className="bg-gray-300 rounded react-loading-skeleton h-3 mt-3"></div>
                        <div className="bg-gray-300 rounded react-loading-skeleton h-2 mt-3"></div>
                    </div>
                </div>
                <div
                    className="group rounded-md p-4 w-full relative group overflow-hidden border border-gray-200 hover:shadow-[0_3px_15px_-1px_rgba(0,0,0,0.1)] hidden md:block">
                    <div className="w-full inline-table animate-pulse">
                        <div className="bg-gray-200 rounded react-loading-skeleton h-40 md:h-52"></div>
                        <div className="bg-gray-300 rounded react-loading-skeleton h-4 mt-3"></div>
                        <div className="bg-gray-300 rounded react-loading-skeleton h-3 mt-3"></div>
                        <div className="bg-gray-300 rounded react-loading-skeleton h-2 mt-3"></div>
                    </div>
                </div>
                <div
                    className="group rounded-md p-4 w-full relative group overflow-hidden border border-gray-200 hover:shadow-[0_3px_15px_-1px_rgba(0,0,0,0.1)] hidden xl:block">
                    <div className="w-full inline-table animate-pulse">
                        <div className="bg-gray-200 rounded react-loading-skeleton h-40 md:h-52"></div>
                        <div className="bg-gray-300 rounded react-loading-skeleton h-4 mt-3"></div>
                        <div className="bg-gray-300 rounded react-loading-skeleton h-3 mt-3"></div>
                        <div className="bg-gray-300 rounded react-loading-skeleton h-2 mt-3"></div>
                    </div>
                </div>
                <div
                    className="group rounded-md p-4 w-full relative group overflow-hidden border border-gray-200 hover:shadow-[0_3px_15px_-1px_rgba(0,0,0,0.1)] hidden xl:block">
                    <div className="w-full inline-table animate-pulse">
                        <div className="bg-gray-200 rounded react-loading-skeleton h-40 md:h-52"></div>
                        <div className="bg-gray-300 rounded react-loading-skeleton h-4 mt-3"></div>
                        <div className="bg-gray-300 rounded react-loading-skeleton h-3 mt-3"></div>
                        <div className="bg-gray-300 rounded react-loading-skeleton h-2 mt-3"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
  );
};

export default ProductPageSkeleton;
