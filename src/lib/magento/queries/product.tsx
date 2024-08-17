export function getProductId() {
    return `
    query getProduct($url_key: String!) {
  products(filter: { url_key: { eq: $url_key } }) {
    items {
     id
  }
}
}
    `;
}
// graphQl/product.ts
export function getProductData() {
    return `
     query getProductByUrlKey($urlKey: String!) {
  products(filter: { url_key: { eq: $urlKey } }) {
    items {
      id
      name
      sku
      type_id
      url_key
      review_count
      rating_summary
      reviews {
        items {
          average_rating
          summary
          text
          created_at
          nickname
        }
      }
      image {
        url
        label
      }
      small_image {
        url
        label
      }
      thumbnail {
        url
        label
      }
      media_gallery {
        url
        label
      }
      short_description {
        html
      }
      description {
        html
      }
      price_range {
        minimum_price {
          regular_price {
            value
            currency
          }
          final_price {
            value
            currency
          }
        }
        maximum_price {
          regular_price {
            value
            currency
          }
          final_price {
            value
            currency
          }
        }
      }
    }
  }
}
  `;
  }
  