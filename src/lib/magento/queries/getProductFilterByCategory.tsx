export default function getProductFilterByCategory() {
  return `
      query getProductFiltersByCategory(
  $categoryIdFilter: FilterEqualTypeInput!
  $pageSize: Int!
  $currentPage: Int!
  $sort: ProductAttributeSortInput
) {
  products(
    filter: { category_id: $categoryIdFilter }
    pageSize: $pageSize
    currentPage: $currentPage
    sort: $sort
  ) {
    total_count
    aggregations {
      label
      count
      attribute_code
      options {
        label
        value
        __typename
      }
      __typename
    }
    page_info {
      current_page
      page_size
      total_pages
      __typename
    }
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
          __typename
        }
        __typename
      }
      image {
        url
        label
        __typename
      }
      small_image {
        url
        label
        __typename
      }
      thumbnail {
        url
        label
        __typename
      }
      swatch_image
      media_gallery {
        url
        label
        __typename
      }
      short_description {
        html
        __typename
      }
      description {
        html
        __typename
      }
      price_range {
        minimum_price {
          regular_price {
            value
            currency
            __typename
          }
          final_price {
            value
            currency
            __typename
          }
          __typename
        }
        maximum_price {
          regular_price {
            value
            currency
            __typename
          }
          final_price {
            value
            currency
            __typename
          }
          __typename
        }
        __typename
      }
      price_tiers {
        quantity
        final_price {
          value
          currency
          __typename
        }
        __typename
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
              __typename
            }
            attribute_set_id
            ... on PhysicalProductInterface {
              weight
              __typename
            }
            price_range {
              minimum_price {
                regular_price {
                  value
                  currency
                  __typename
                }
                final_price {
                  value
                  currency
                  __typename
                }
                __typename
              }
              maximum_price {
                regular_price {
                  value
                  currency
                  __typename
                }
                final_price {
                  value
                  currency
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          attributes {
            label
            code
            value_index
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
  __type(name: "ProductAttributeFilterInput") {
    inputFields {
      name
      type {
        name
        __typename
      }
      __typename
    }
    __typename
  }
}`;
}
