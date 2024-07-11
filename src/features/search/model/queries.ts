import { gql } from '@apollo/client';

export const SEARCH_REPOSITORIES = gql`
  query ($searchTerm: String!, $after: String) {
    search(query: $searchTerm, type: REPOSITORY, first: 10, after: $after) {
      edges {
        node {
          ... on Repository {
            id
            name
            stargazerCount
            pushedAt
            url
          }
        }
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
        hasPreviousPage
      }
      repositoryCount
    }
  }
`;

export const GET_USER_REPOSITORIES = gql`
  query GetUserRepositories($after: String) {
    viewer {
      repositories(first: 10, after: $after) {
        edges {
          node {
            id
            name
            stargazerCount
            pushedAt
            url
          }
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
          hasPreviousPage
        }
        totalCount
      }
    }
  }
`;
