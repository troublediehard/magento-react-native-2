/** @noflow */
import { gql } from '@apollo/client';

export const PRODUCT_FRAGMENT = gql`  
  fragment ProductDetails on ProductInterface {
      description {
          html
      }
      id
      media_gallery_entries {
          id
          label
          position
          disabled
          file
      }
      name
      price {
          regularPrice {
              amount {
                  currency
                  value
              }
          }
      }
      sku
      small_image {
          url
      }
      url_key
      ... on ConfigurableProduct {
          configurable_options {
              attribute_code
              attribute_id
              id
              label
              values {
                  default_label
                  label
                  store_label
                  use_default_value
                  value_index
                  swatch_data {
                      ... on ImageSwatchData {
                          thumbnail
                      }
                      value
                  }
              }
          }
          variants {
              attributes {
                  code
                  value_index
              }
              product {
                  id
                  media_gallery_entries {
                      id
                      disabled
                      file
                      label
                      position
                  }
                  sku
                  stock_status
                  price {
                      regularPrice {
                          amount {
                              currency
                              value
                          }
                      }
                  }
              }
          }
      }
  }
`;
