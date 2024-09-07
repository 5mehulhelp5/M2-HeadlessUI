'use client';
import { useState, useEffect } from 'react';
import { XCircleIcon } from '@heroicons/react/20/solid';
import { useRouter } from 'next/navigation';

export default function HeroSectionEditor({ slide }: { slide: any }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [buttonText, setButtonText] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [slideId, setSlideId] = useState<number | null>(null); // Store slide ID if existing
    const router = useRouter();
    // Fetch data if the slide is not new
    useEffect(() => {
        if (slide !== 'new') {
            const fetchSlideData = async () => {
                try {
                    const response = await fetch(`/api/admin/hero-section?getslide=${slide}`);
                    if (!response.ok) throw new Error('Failed to fetch slide data');

                    const slideData = await response.json();
                    const { title, description, buttonText, imageUrl, id } = slideData.data[0];

                    setTitle(title);
                    setDescription(description);
                    setButtonText(buttonText);
                    setImageUrl(imageUrl);
                    setPreviewImage(`http://localhost:3000/${imageUrl}`);
                    setSlideId(id);
                } catch (error) {
                    console.error('Error fetching slide data:', error);
                }
            };

            fetchSlideData();
        }
    }, [slide]);

    // Handle image upload and preview
    const handleImageUpload = (file: File) => {
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onload = () => setPreviewImage(reader.result as string);
            reader.readAsDataURL(file);
            setImageUrl(file.name); // Store file name or path if needed
        }
    };

    // Handle image drop (drag and drop)
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        handleImageUpload(file);
    };

    // Click handler for image upload div
    const handleClick = () => {
        const fileInput = document.getElementById('imageInput') as HTMLInputElement;
        fileInput?.click();
    };

    // Delete current image
    const handleImageDelete = () => {
        setPreviewImage(null);
        setImageFile(null);
        setImageUrl(''); // Clear image URL
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('buttonText', buttonText);
        if (imageFile) {
            formData.append('image', imageFile); // Add image file if new image is uploaded
        }

        const method = slideId ? 'PUT' : 'POST'; // Use PUT for updating, POST for new
        if (slideId) formData.append('id', slideId.toString()); // Add slide ID for update

        try {
            const response = await fetch(`/api/admin/hero-section/`, {
                method,
                body: formData,
            });

            if (!response.ok) throw new Error('Network response was not ok');
            const result = await response.json();

            if (result.success) {
                alert('Data saved successfully!');
                if (result.id) {
                    router.push(`/admin/hero-slider/${result.id}`);
                }
                // resetForm();
            } else {
                alert('Failed to save data!');
            }
        } catch (error) {
            alert('An error occurred while saving data.');
            console.error('Error:', error);
        }
    };

    // Reset form fields
    const resetForm = () => {
        setTitle('');
        setDescription('');
        setButtonText('');
        setImageFile(null);
        setPreviewImage(null);
        setImageUrl('');
    };

    return (
        <div className="p-8 mt-4 w-full sm:shadow-xl rounded-xl bg-white shadow-lg">
            <form onSubmit={handleSubmit}>
                {/* Image Upload Section */}
                <div
                    className="border-dashed border-4 border-gray-300 p-4 mb-4 flex flex-col items-center justify-center cursor-pointer relative"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    onClick={handleClick}
                >
                    {previewImage ? (
                        <>
                            <img src={previewImage} alt="Preview" className="w-full h-max object-cover mb-4" />
                            <button
                                type="button"
                                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full"
                                onClick={handleImageDelete}
                            >
                                <XCircleIcon className="w-7 h-7" />

                            </button>
                        </>
                    ) : (
                        <span className="text-gray-500">Drag and drop your image here, or click to upload</span>
                    )}
                    <input
                        id="imageInput"
                        type="file"
                        onChange={(e) => e.target.files && handleImageUpload(e.target.files[0])}
                        className="hidden"
                        accept="image/*"
                    />
                </div>

                {/* Title */}
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title</label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                    />
                </div>

                {/* Description */}
                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                    ></textarea>
                </div>

                {/* Button Text */}
                <div className="mb-4">
                    <label htmlFor="buttonText" className="block text-gray-700 text-sm font-bold mb-2">Button Text</label>
                    <input
                        id="buttonText"
                        type="text"
                        value={buttonText}
                        onChange={(e) => setButtonText(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                    />
                </div>

                {/* Submit Button */}
                <div className="flex justify-between items-center mt-4">
                    {/* Back Button */}
                    <button
                        type="button"
                        onClick={() => router.push('/admin/hero-slider')}
                        className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700"
                    >
                        Back
                    </button>

                    {/* Submit Button */}
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
                        {slideId ? 'Update Slide' : 'Create Slide'}
                    </button>
                </div>
            </form>
        </div>
    );
}
