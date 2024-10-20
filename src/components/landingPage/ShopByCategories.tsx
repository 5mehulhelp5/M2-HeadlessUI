"use client";
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Mousewheel } from 'swiper/modules';
import Image from 'next/image';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/20/solid';
import { useEffect, useState } from 'react';
import categorySlider from "@/components/landingPage/category.json"
import { ProgressBarLink } from '@/components/context/progress-bar';

const CategorySkeleton = () => {
    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col relative w-full h-full animate-pulse">
            {/* Image skeleton */}
            <div className="w-full h-[400px] bg-gray-300 "></div>

            {/* Title skeleton */}
            <div className="absolute bottom-0 w-full p-2">
                <div className="w-3/4 h-6 bg-gray-300 rounded-lg mx-auto"></div>
            </div>
        </div>
    );
};
interface categoryJson {
    title: string;
    url: string;
    image: string;
    color: string;

}

const ShopByCategories = () => {
    const [loading, setLoading] = useState<Boolean>(true);
    const [categoryData, setCategoryData] = useState<categoryJson[]>([]);
    const [isHydrate, setIsHydrate] = useState<Boolean>(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsHydrate(true);
        })
        const fetch = () => {
            try {
                setCategoryData(categorySlider);

            } catch (e) {
                console.error(e);
                // setLoading(false);
            } finally {
                setLoading(false);
            }
        }
        if (isHydrate) {
            fetch();
        }
        return () => clearTimeout(timer)

    }, [isHydrate])

    return (
        <div className="py-8 bg-gray-200">
            <div className="container mx-auto px-2 xl:px-0">
                <div className="flex md:justify-between md:items-center mb-8 md:flex-row flex-col gap-y-2">
                    <p className="text-4xl text-start">Shop by Categories</p>
                    <div className="flex items-center justify-end space-x-4">
                        <div className="text-black rounded-full ">
                            {/* Prev Button with the correct class */}
                            <button className="bg-[#f5d9d9] p-4 rounded-lg d-prev disabled:bg-white border-[#f5d9d9] border-2 transition-all duration-300 ease-in-out">
                                <ArrowLeftIcon className='w-5 h-5' />
                            </button>
                        </div>
                        <div className="text-black rounded-full ">
                            {/* Next Button with the correct class */}
                            <button className="bg-[#f5d9d9] p-4 rounded-lg d-next disabled:bg-white border-[#f5d9d9] border-2 transition-all duration-300 ease-in-out">
                                <ArrowRightIcon className='w-5 h-5' />
                            </button>
                        </div>
                    </div>
                </div>
                <Swiper
                    navigation={{
                        nextEl: '.d-next',
                        prevEl: '.d-prev',
                    }}
                    modules={[Navigation, Mousewheel]}
                    autoplay={true}
                    allowTouchMove={true}
                    // loop={true}
                    // mousewheel={true}
                    breakpoints={{
                        360: {
                            slidesPerView: 1.5,
                            width: 415,
                            spaceBetween: 20

                        },
                        640: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 25,
                            width: 735,
                        },
                        1024: {
                            slidesPerView: 3, // Ensure 4 slides per view for larger screens
                            spaceBetween: 20, // Adjust spacing between slides
                            width: 990
                        },
                        1280: {
                            slidesPerView: 4, // Ensure 4 slides per view for larger screens
                            spaceBetween: 30, // Adjust spacing between slides
                            width: 1505,
                        },
                    }}
                    className="mySwiper h-[450px] w-full"
                >
                    {!loading ? (
                        categoryData.map((category, index) => (
                            <SwiperSlide key={index}>
                                <ProgressBarLink href={category.url ?? '/'}>
                                    <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col group relative w-full h-full">
                                        <Image
                                            src={category.image}
                                            alt={category.title}
                                            className="object-cover w-full h-full"
                                            width={400}
                                            height={400}
                                        />
                                        {/* Overlay */}
                                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 ease-in-out"></div>

                                        {/* Title Content */}
                                        <div className="absolute bottom-0 w-full p-2 transition-all duration-300 ease-in-out">
                                            <p
                                                className="text-lg font-semibold p-4 rounded-lg bg-white group-hover:bg-gray-100 text-center transform translate-y-20 group-hover:translate-y-0 transition-all duration-300 ease-in-out"
                                            >
                                                {category.title}
                                            </p>
                                        </div>

                                        {/* Large Text on Hover */}
                                        <div className="absolute inset-0 transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-20">
                                            <div
                                                className="flex items-center mt-5 text-center justify-end text-7xl font-extrabold overflow-hidden"
                                                style={{ fontFamily: 'cursive', color: category.color }}
                                            >
                                                {category.title.split(' ')[0].toUpperCase()}
                                            </div>
                                        </div>
                                    </div>
                                </ProgressBarLink>
                            </SwiperSlide>

                        ))) : Array(6)
                            .fill(0)
                            .map((_, index) => (
                                <SwiperSlide key={index}>
                                    <CategorySkeleton />
                                </SwiperSlide>))}
                </Swiper>
            </div>
        </div>
    );
};

export default ShopByCategories;
