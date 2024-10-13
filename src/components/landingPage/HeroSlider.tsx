'use client';
import './style.css';
import Slider from 'react-slick';
import { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';
interface Slide {
    imageUrl: string;
    title: string;
    description: string;
    buttonText: string;
}

const SkeletonLoader = () => (
    <div className="relative w-full h-full bg-gray-200 animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2/3 h-1/3 bg-gray-300 rounded-md"></div>
        </div>
    </div>
);

const HeroSlider = () => {
    const [slides, setSlides] = useState<Slide[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const response = await fetch('/api/admin/hero-section/');
                // if (!response.ok) {
                //     throw new Error('Network response was not ok');
                // }
                // const data = await response.json();
                setSlides([{
                    imageUrl: "/images/H_Heroside1_2_6_24.webp",
                    title: "string",
                    description: "string",
                    buttonText: "string",
                },
                {
                    imageUrl: "/images/H_Heroside2_2_6_24.webp",
                    title: "string",
                    description: "string",
                    buttonText: "string",
                }]);
            } catch (error) {
                setError('There was a problem with the fetch operation.');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    function NextArrow(props: any) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block",color: "black",background: "bisque" }}
                onClick={onClick}
            >
                <ChevronRightIcon className="w-15 h-15" /></div>
        );
    }
    function PrevArrow(props: any) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block",color: "black",background: "bisque"}}
                onClick={onClick}
            ><ChevronLeftIcon className="w-15 h-15" /></div>
        );
    }
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: true,
        pauseOnHover: true,
        fade: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    if (loading) return <div className="w-full h-screen"><SkeletonLoader /></div>;
    if (error) return <div>{error}</div>;
    if (slides.length === 0) return <div>No slides available</div>;

    return (
        <div className="w-full my-auto">
            <Slider {...settings}>
                {slides.map((slide, index) => (
                    <div key={index} className=" w-full h-full">
                        {/* Use a skeleton loader while the image is loading */}
                        <Image
                            src={slide.imageUrl}
                            alt={`Slide ${index}`}
                            className="object-cover w-full h-full"
                            onLoad={(e) => {
                                e.currentTarget.classList.remove('opacity-0');
                            }}
                            width={1920}
                            height={1080}
                            onError={(e) => {
                                e.currentTarget.classList.add('hidden');
                            }}
                            style={{ transition: 'opacity 0.5s ease-in-out' }}
                        />
                        <div className="absolute inset-0 flex items-center justify-start text-left bg-black bg-opacity-20">
                            <div className="text-white mx-auto container">
                                <h1 className="text-5xl font-bold mb-4">{slide.title}</h1>
                                <p className="text-xl mb-6">{slide.description}</p>
                                <button className="px-6 py-3 bg-primary text-white rounded-lg">
                                    {slide.buttonText}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default HeroSlider;


