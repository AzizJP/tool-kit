import { gql } from '@apollo/client';

export const SEARCH_REPOSITORIES = gql`
  query ($searchTerm: String!, $after: String, $first: Int) {
    search(query: $searchTerm, type: REPOSITORY, first: $first, after: $after) {
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
  query GetUserRepositories($after: String, $first: Int) {
    viewer {
      repositories(first: $first, after: $after, privacy: PUBLIC) {
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
