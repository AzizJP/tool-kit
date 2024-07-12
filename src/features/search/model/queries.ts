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
            defaultBranchRef {
              target {
                ... on Commit {
                  committedDate
                }
              }
            }
            url
            isEmpty
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
      repositories(last: 10, after: $after, privacy: PUBLIC) {
        edges {
          node {
            id
            name
            stargazerCount
            defaultBranchRef {
              target {
                ... on Commit {
                  committedDate
                }
              }
            }
            url
            isEmpty
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
