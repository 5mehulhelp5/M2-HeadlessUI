'use client';
import './style.css';
import Slider from 'react-slick';
import { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { ProgressBarLink } from '@/components/context/progress-bar';
import Image from 'next/image';
import slidesData from '@/components/landingPage/slidesData.json';
import ShopByCategories from '@/components/landingPage/ShopByCategories'

interface Slide {
    imageUrl: string;
    title: string;
    description: string;
    buttonText: string;
    htmlContent: string | null;
    url: string | null;
}

const SkeletonLoader = () => (
    <div className="relative w-full h-[600px] bg-gray-200 animate-pulse">
        <div className="absolute inset-0 flex h-[600px] items-center justify-center">
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
                setSlides(slidesData);
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
                style={{ ...style, display: "block", color: "black", background: "bisque" }}
                onClick={onClick}
            >
                <ChevronRightIcon className="w-15 h-15" />
            </div>
        );
    }

    function PrevArrow(props: any) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block", color: "black", background: "bisque" }}
                onClick={onClick}
            >
                <ChevronLeftIcon className="w-15 h-15" />
            </div>
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
    if (slidesData.length === 0) return <div>No slides available</div>;

    return (
        <>
            <div className="w-full my-auto bg-gray-100">
                <Slider {...settings} >
                    {slidesData.map((slide, index) => (
                        <div key={index} className="w-full lg:h-[600px] sm:h-[350px] md:h-[400px] h-[300px] relative">
                            {/* Use a skeleton loader while the image is loading */}
                            <Image
                                src={slide.imageUrl}
                                alt={`Slide ${index}`}
                                className="object-cover w-full h-full opacity-0 transition-opacity duration-500 ease-in-out"
                                onLoad={(e) => {
                                    e.currentTarget.classList.remove('opacity-0');
                                }}
                                width={1920}
                                height={400}
                                onError={(e) => {
                                    e.currentTarget.classList.add('hidden');
                                }}
                            />
                            <div className="absolute inset-0 flex items-center justify-start text-left bg-black bg-opacity-40">
                                <div className="text-white lg:mx-auto md:mx-10 container px-4 md:px-8">
                                    {slide.htmlContent ? (
                                        <div className="hidden md:block" dangerouslySetInnerHTML={{ __html: slide.htmlContent }} />
                                    ) : (
                                        <>
                                            <h1 className="text-3xl md:text-5xl font-bold mb-2 md:mb-4">{slide.title}</h1>
                                            <p className="text-lg md:text-xl mb-4 md:mb-6">{slide.description}</p>
                                        </>
                                    )}
                                    {/* Fallback for smaller screens */}
                                    <div className="md:hidden flex justify-center items-center flex-col">
                                        <p className="text-2xl font-bold mb-2">{slide.title}</p>
                                        <p className="text-lg mb-4 text-center">{slide.description}</p>
                                        <button className="px-6 py-3 btn-primary rounded-xl">
                                            <ProgressBarLink href={slide.url ?? "/"}>{slide.buttonText}</ProgressBarLink>
                                        </button>
                                    </div>
                                    <button className="px-6 py-3 btn-primary rounded-xl hidden md:block">
                                        <ProgressBarLink href={slide.url ?? "/"}>{slide.buttonText}</ProgressBarLink>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
            <ShopByCategories />
        </>
    );
};

export default HeroSlider;
