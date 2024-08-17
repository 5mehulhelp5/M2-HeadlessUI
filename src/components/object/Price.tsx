import React from 'react';
import { PriceRange } from '@/lib/types';

const Price: React.FC<PriceRange> = ({ minimum_price, maximum_price, __typename }) => {
  // Destructure the necessary values from minimum_price and maximum_price
  const { currency, value: minPrice } = minimum_price.final_price;
  const { value: maxPrice } = maximum_price.final_price;

  const formattedMinPrice = minPrice.toFixed(2); // Format min price to two decimal places
  const formattedMaxPrice = maxPrice.toFixed(2); // Format max price to two decimal places

  const currencySymbol = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).formatToParts(minPrice).find(part => part.type === 'currency')?.value;

  return (
    <div itemProp="offers" itemScope itemType="https://schema.org/Offer">
      <span itemProp="priceCurrency" content={currency}>{currencySymbol}</span>
      <span itemProp="price" content={formattedMinPrice}>
        {formattedMinPrice}
      </span>
      {minPrice !== maxPrice && (
        <>
          <span> - </span>
          <span itemProp="price" content={formattedMaxPrice}>
            {formattedMaxPrice}
          </span>
        </>
      )}
    </div>
  );
};

export default Price;
