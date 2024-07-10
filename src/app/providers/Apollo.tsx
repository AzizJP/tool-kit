import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { FC, ReactNode } from 'react';

import { GITHUB_ACCESS_TOKEN, GITHUB_GRAPHQL_API } from '@/shared/features/get-env';

const httpLink = createHttpLink({
  uri: GITHUB_GRAPHQL_API,
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${GITHUB_ACCESS_TOKEN}`,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

interface ApolloProps {
  readonly children: ReactNode;
}

export const Apollo: FC<ApolloProps> = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
