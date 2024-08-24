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
     query GetProductDetailForATCDialog($url_key: String!) {
  products(filter: { url_key: { eq: $url_key } }) {
    items {
      id
      name
      sku
      type_id
      url_key
      meta_title
      meta_keyword
      meta_description
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
      swatch_image
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
      upsell_products {
        id
        name
        sku
        url_key
        rating_summary
        review_count
        image {
          url
          label
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
      related_products {
        id
        name
        sku
        url_key
        review_count
        rating_summary
        image {
          url
          label
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
      price_tiers {
        quantity
        final_price {
          value
          currency
        }
      }
      ... on ConfigurableProduct {
        configurable_options {
          id
          attribute_id
          attribute_uid
          label
          position
          use_default
          attribute_code
          values {
            value_index
            label
            swatch_data {
              value
              __typename
            }
            __typename
          }
          product_id
          __typename
        }
        variants {
          product {
            id
            name
            sku
            media_gallery {
              label
              url
            }
            attribute_set_id
            ... on PhysicalProductInterface {
              weight
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
          attributes {
            label
            code
            value_index
          }
        }
      }
      ... on DownloadableProduct {
        links_title
        links_purchased_separately
        downloadable_product_links {
          sample_url
          sort_order
          title
          price
        }
        downloadable_product_samples {
          title
          sort_order
          sample_url
        }
      }
      ... on CustomizableProductInterface {
        options {
          title
          required
          sort_order
          option_id
          ... on CustomizableDropDownOption {
            value {
              option_type_id
              price
              price_type
              sku
              sort_order
              title
            }
          }
        }
      }
    }
  }
}
  `;
  }
  