import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadset, faCreditCard, faShieldAlt, faTruck, faUndoAlt } from '@fortawesome/free-solid-svg-icons';

const FeaturesSection: FC = () => {
    return (
        <div className="w-full bg-gray-200">
          <div className="container mx-auto grid grid-cols-1 px-2 xl:px-0 sm:grid-cols-2 lg:grid-cols-5 gap-4 py-4">
            <div className="flex items-center space-x-3 border-2 border-primary rounded-lg py-5 justify-center">
              <div className="text-primary">
                <FontAwesomeIcon icon={faHeadset} size="lg" className="w-10 h-10" />
              </div>
              <div>
                <p className="font-semibold">24/7 Assistance</p>
                <p className="text-sm text-gray-600">Always here for you</p>
              </div>
            </div>
      
            <div className="flex items-center space-x-3 border-2 border-primary rounded-lg py-5 justify-center">
              <div className="text-primary">
                <FontAwesomeIcon icon={faCreditCard} size="lg" className="w-10 h-10" />
              </div>
              <div>
                <p className="font-semibold">Secure Payments</p>
                <p className="text-sm text-gray-600">Visa, PayPal, Mastercard</p>
              </div>
            </div>
      
            <div className="flex items-center space-x-3 border-2 border-primary rounded-lg py-5 justify-center">
              <div className="text-primary">
                <FontAwesomeIcon icon={faShieldAlt} size="lg" className="w-10 h-10" />
              </div>
              <div>
                <p className="font-semibold">100% Security</p>
                <p className="text-sm text-gray-600">Guaranteed protection</p>
              </div>
            </div>
      
            <div className="flex items-center space-x-3 border-2 border-primary rounded-lg py-5 justify-center">
              <div className="text-primary">
                <FontAwesomeIcon icon={faTruck} size="lg" className="w-10 h-10" />
              </div>
              <div>
                <p className="font-semibold">Free Shipping</p>
                <p className="text-sm text-gray-600">Orders over $100</p>
              </div>
            </div>
      
            <div className="flex items-center space-x-3 border-2 border-primary rounded-lg py-5 justify-center">
              <div className="text-primary">
                <FontAwesomeIcon icon={faUndoAlt} size="lg" className="w-10 h-10" />
              </div>
              <div>
                <p className="font-semibold">30-Day Returns</p>
                <p className="text-sm text-gray-600">Easy returns</p>
              </div>
            </div>
          </div>
        </div>
      );
      
};

export default FeaturesSection;
