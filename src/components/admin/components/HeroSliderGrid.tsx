'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface SkeletonGridProps {
    count: number;
}

export function SkeletonGrid({ count }: SkeletonGridProps) {
    const boxes = Array.from({ length: count }, (_, index) => (
        <div key={index} className="bg-white shadow-md rounded-lg p-6 w-full max-w-md cursor-pointer hover:scale-105 transition-all ease-in duration-150">
            <div className="w-full h-40 bg-gray-300 animate-pulse rounded-lg"></div>
            <div className="flex justify-between mt-4">
                <div className="px-4 py-2 rounded bg-gray-300 text-gray-700">View Slide</div>
                <div className="px-4 py-2 bg-gray-300 text-white rounded">Delete</div>
            </div>
        </div>
    ));

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 transition-all ease-in duration-150">
            {boxes}
        </div>
    );
}

export default function HeroSliderGrid() {
    const [images, setImages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const router = useRouter();

    // Fetch slides data
    async function fetchSlide() {
        const response = await fetch(`/api/admin/hero-section/?slide=all`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const getData = await response.json();
        return getData;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const getData = await fetchSlide();
                setImages(getData.data);
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            } finally {
                setLoading(false); // End loading state
            }
        };
        fetchData();
    }, []);

    // Handle slide navigation
    const handleNavigate = (id: number) => {
        router.push(`/admin/hero-slider/${id}`);
    };

    // Handle slide deletion with API call
    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`/api/admin/hero-section/?slide=${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete the slide');
            }
            // Remove slide locally after successful deletion
            const updatedImages = images.filter((slide: any) => slide.id !== id);
            setImages(updatedImages);
        } catch (error) {
            console.error('There was a problem with the delete operation:', error);
        }
    };

    // Handle adding a new slide
    const handleAddNew = () => {
        router.push('/admin/hero-slider/new');
    };

    // Show skeleton loader while data is loading
    if (loading) return <SkeletonGrid count={8} />;

    // Handle case when no images are found
    if (!images || images.length === 0) return <p>No slides available</p>;

    return (
        <div className="w-full">
            <div className="flex justify-end mb-4">
                <button className="bg-primary text-white px-4 py-2 rounded" onClick={handleAddNew}>
                    Add New
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 transition-all ease-in duration-150">
                {images.map((slide: any) => (
                    <div
                        key={slide.id}
                        className="bg-white shadow-md rounded-lg p-6 w-full max-w-md cursor-pointer hover:scale-105 transition-all ease-in duration-150"
                        onClick={() => handleNavigate(slide.id)}
                    >
                        <img className="w-full h-40 object-cover rounded-lg" src={slide.imageUrl} alt={`Slide ${slide.id}`} />
                        <div className="flex justify-between mt-4">
                            <button className="px-4 py-2 rounded bg-gray-300 text-gray-700">View Slide</button>
                            <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(slide.id);
                            }}>
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
