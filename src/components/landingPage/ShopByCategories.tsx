"use client";
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Mousewheel } from 'swiper/modules';
import Image from 'next/image';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/20/solid';
import { color } from 'framer-motion';
import categorySlider from "@/components/landingPage/category.json"
import { ProgressBarLink } from '@/components/context/progress-bar';

const ShopByCategories = () => {


    return (
        <div className="py-12 bg-gray-200">
            <div className="container mx-auto">
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
                    loop={true}
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
                            spaceBetween: 20, // Adjust spacing between slides
                            width: 1500,
                        },
                    }}
                    className="mySwiper h-[450px] w-full"
                >
                    {categorySlider.map((category, index) => (
                        <SwiperSlide key={index}>
                            <ProgressBarLink href={category.url ?? '/'}>
                                <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col group relative w-full h-full">
                                    <Image
                                        src={category.image}
                                        alt={category.title}
                                        className="object-cover w-full h-full" // Adjust the image height as necessary
                                        width={400}
                                        height={400}
                                    />
                                    <div className="absolute bottom-0 w-full p-2 transition-all duration-300 ease-in-out">
                                        <p
                                            className="text-lg font-semibold p-4 rounded-lg bg-white group-hover:bg-gray-100 text-center transform translate-y-20 group-hover:translate-y-0 transition-all duration-300 ease-in-out"
                                        >
                                            {category.title}
                                        </p>
                                    </div>
                                    <div className="absolute inset-0 transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-10">
                                        <div className="flex items-center mt-5 text-center justify-end text-7xl font-extrabold overflow-hidden" style={{ fontFamily: 'cursive', color: category.color }}>
                                            {category.title.split(' ')[0].toUpperCase()}
                                        </div>
                                    </div>
                                </div>
                            </ProgressBarLink>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default ShopByCategories;
