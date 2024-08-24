interface ProductRatingProps {
    ratingSummary: number;
    reviewCount: number;
}
export const ProductRating: React.FC<ProductRatingProps> = ({ ratingSummary, reviewCount }) => {
    // Calculate the width percentage based on the rating summary
    const ratingWidth = (ratingSummary / 100) * 100; // Assuming ratingSummary is a percentage (0-100)

    return (
        <>
            <div className="relative p-0 m-0 w-auto inline-block sm:text-2xl text-xl bidi-override">
                <div
                    className="p-0 absolute flex top-0 left-0 overflow-hidden text-orange-600"
                    style={{ width: `${ratingWidth}%` }} // Dynamically set the width
                >
                    <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
                <div className="p-0 flex z-0 text-gray-600">
                    <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
            </div>
            <div className="rating-count text-gray-500 mt-1 text-lg">
                {reviewCount} Review{reviewCount > 1 ? 's' : ''}
            </div>
        </>
    );
};