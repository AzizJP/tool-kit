import { useLazyQuery } from '@apollo/client';

import { useCallback } from 'react';

import { GET_USER_REPOSITORIES, UserRepositoriesType } from '../model';

export const useUserRepositories = () => {
  const [searchRepositories, { loading, error, data }] = useLazyQuery<UserRepositoriesType>(GET_USER_REPOSITORIES);

  const searchUserRepositories = useCallback(() => {
    searchRepositories();
  }, [searchRepositories]);

  const result = data ? data.viewer.repositories.edges.map(edge => edge.node) : [];
  const userRepositoryCount = data ? data.viewer.repositories.totalCount : 0;

  return { searchUserRepositories, result, loading, error, userRepositoryCount };
};
