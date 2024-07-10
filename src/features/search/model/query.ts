import { gql } from '@apollo/client';

export const SEARCH_REPOSITORIES = gql`
  query ($searchTerm: String!) {
    search(query: $searchTerm, type: REPOSITORY, first: 10) {
      edges {
        node {
          ... on Repository {
            name
            stargazerCount
            pushedAt
            url
          }
        }
      }
    }
  }
`;
