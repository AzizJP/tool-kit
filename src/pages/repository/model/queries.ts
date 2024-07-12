import { gql } from '@apollo/client';

export const GET_REPOSITORIY = gql`
  query ($id: ID!) {
    node(id: $id) {
      ... on Repository {
        name
        stargazerCount
        defaultBranchRef {
          target {
            ... on Commit {
              committedDate
            }
          }
        }
        owner {
          avatarUrl
          login
          url
        }
        languages(first: 10) {
          edges {
            node {
              name
            }
          }
        }
        description
        isEmpty
      }
    }
  }
`;
