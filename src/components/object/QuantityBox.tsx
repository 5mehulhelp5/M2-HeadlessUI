import { useState } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome

const QuantityInput = () => {
    const [quantity, setQuantity] = useState(1);

    const handleIncrement = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    return (
        <div className="relative flex items-center max-w-[8rem]">
            <button
                type="button"
                id="decrement-button"
                className="bg-primary rounded-s-[3px] focus:outline-none"
                onClick={handleDecrement}
            >
                <i className="fas fa-minus text-white p-3 text-[12px]"></i>
            </button>
            <input
                className="bg-[#f5d9d9] border-x-0 h-9 text-center border-[#f5d9d9] text-gray-900 text-sm block w-full py-2.5 focus:outline-none focus:ring-0"
                type="text"
                value={quantity}
                name="quantity"
                readOnly
            />
            <button
                type="button"
                id="increment-button"
                className="bg-primary rounded-e-[3px] focus:outline-none"
                onClick={handleIncrement}
            >
                <i className="fas fa-plus text-white p-3 text-[12px]"></i>
            </button>
        </div>
    );
};

export default QuantityInput;
