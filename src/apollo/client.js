/**
 * @flow
 * Created by Dima Portenko on 13.05.2020
 */

import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { magentoConfig } from '../../magento.config';
import { typePolicies } from './apolloCache';



export const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies
  }),
  link: new HttpLink({
    uri: `${magentoConfig.baseUrl}graphql/`,
  }),
});
