/** @noflow */
import { gql } from '@apollo/client';

export const GET_PRODUCT_DETAILS = gql`
    query productDetail($urlKey: String, $onServer: Boolean!) {
        productDetail: products(filter: { url_key: { eq: $urlKey } }) {
            items {
                # Once graphql-ce/1027 is resolved, use a ProductDetails fragment
                # here instead. Until then, changes to this query (within "items")
                # must be mirrored in productDetails.graphql.
                __typename
                categories {
                    id
                    breadcrumbs {
                        category_id
                    }
                }
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
                meta_title @include(if: $onServer)
                meta_keyword @include(if: $onServer)
                meta_description
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
        }
    }
`;
