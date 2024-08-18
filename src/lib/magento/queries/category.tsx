export default function category({ ids, pageSize, currentPage }: { ids: Array<any>, pageSize: number, currentPage: number }) {
  return `
        {
  categories(filters: { parent_id: { in: ${ids} } }, pageSize: ${pageSize}, currentPage: ${currentPage}) {
    total_count
    items {
      id
      uid
      level
      image
      include_in_menu
      name
      path
      url_path
      url_key
      position
      children_count
      children {
        id
        uid
        level
        image
        include_in_menu
        name
        path
        url_path
        url_key
        position
        children_count
        children {
          id
          uid
          level
          image
          include_in_menu
          name
          path
          url_path
          url_key
          position
        }
      }
    }
    page_info {
      current_page
      page_size
      total_pages
    }
  }
}
    `;
}
export function categoryQuery() {
  return `
query getCategory($url_key: String!) {
  categoryList(filters: { url_key: { eq: $url_key } }) {
    uid
    id
    name
  }
}
`};
export function getCategoryProduct() {
  return `
    query getCategoryProducts($categoryId: Int!) {
      products(filter: { category_id: { eq: $categoryId } }) {
        items {
          id
          name
          sku
          price {
            regularPrice {
              amount {
                value
                currency
              }
            }
          }
          small_image {
            url
            label
          }
        }
      }
    }
  `
}
export const ProductSearch = `query ProductSearch(
  $currentPage: Int = 1, 
  $inputText: String!, 
  $pageSize: Int = 6, 
  $filters: ProductAttributeFilterInput!, 
  $sort: ProductAttributeSortInput
) {
  products(
    currentPage: $currentPage
    pageSize: $pageSize
    search: $inputText
    filter: $filters
    sort: $sort
  ) {
    items {
      id
      uid
      name
      price_range {
        maximum_price {
          regular_price {
            currency
            value
            __typename
          }
          __typename
        }
        __typename
      }
      sku
      small_image {
        url
        __typename
      }
      stock_status
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
    page_info {
      total_pages
      __typename
    }
    total_count
    __typename
  }
}
`;
