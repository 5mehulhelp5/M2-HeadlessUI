export interface Category {
    id: number;
    uid: string;
    name: string;
  }
  
export interface Product {
    id: string;
    name: string;
    sku: string;
    price: {
      regularPrice: {
        amount: {
          value: number;
          currency: string;
        };
      };
    };
    small_image: {
      url: string;
      label: string;
    };
  }
  
export interface CategoryResponse {
    data: {
      categoryList: Category[];
    };
  }
  
export interface ProductResponse {
    data: {
      products: {
        items: Product[];
      };
    };
  }

export interface ProductData {
  id: string;
  name: string;
  sku: string;
  type_id: string;
  url_key: string;
  review_count: number;
  rating_summary: number;
  reviews: {
    items: {
      average_rating: number;
      summary: string;
      text: string;
      created_at: string;
      nickname: string;
    }[];
  };
  image: {
    url: string;
    label: string;
  };
  small_image: {
    url: string;
    label: string;
  };
  thumbnail: {
    url: string;
    label: string;
  };
  media_gallery: {
    url: string;
    label: string;
  }[];
  short_description: {
    html: string;
  };
  description: {
    html: string;
  };
  price_range: PriceRange;
  __typename: string;
}
export interface ProductImage {
  url: string;
  label: string;
  __typename: string;
}

export interface ComplexTextValue {
  html: string;
  __typename: string;
}

export interface Money {
  value: number;
  currency: string;
  __typename: string;
}

export interface ProductPrice {
  regular_price: Money;
  final_price: Money;
  __typename: string;
}

export interface PriceRange {
  minimum_price: ProductPrice;
  maximum_price: ProductPrice;
  __typename: string;
}

export interface ProductReviews {
  items: any[]; // If you have a structure for reviews, replace 'any' with the appropriate interface
  __typename: string;
}

export interface ProductOfCategory {
  configurable_options:Array<any>;
  id: number;
  name: string;
  sku: string;
  type_id: string;
  url_key: string;
  review_count: number;
  rating_summary: number;
  reviews: ProductReviews;
  image: ProductImage;
  small_image: ProductImage;
  thumbnail: ProductImage;
  swatch_image: ProductImage | null;
  media_gallery: ProductImage[];
  short_description: ComplexTextValue;
  description: ComplexTextValue;
  price_range: PriceRange;
  price_tiers: any[]; // If you have a structure for price tiers, replace 'any' with the appropriate interface
  __typename: string;
}

export type ColorSwatchData = {
  __typename: 'ColorSwatchData';
  value: string;
};

export type TextSwatchData = {
  __typename: 'TextSwatchData';
  value: string;
};

export type ConfigurableProductOptionsValues = {
  value_index: number;
  label: string;
  swatch_data: ColorSwatchData | TextSwatchData;
};

export type ConfigurableProductOption = {
  id: number;
  attribute_id: string;
  attribute_uid: string;
  label: string;
  position: number;
  use_default: boolean;
  attribute_code: string;
  values: ConfigurableProductOptionsValues[];
  product_id: number;
};

export type ConfigurableOptionsProps = {
  options: ConfigurableProductOption[];
};
export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterCategories {
  label: string;
  count: number;
  attribute_code: string;
  options: FilterOption[];
}

export interface SidebarFilterProps {
  filters: FilterCategories[];
}
  