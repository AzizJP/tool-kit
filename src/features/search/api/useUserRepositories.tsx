import { useLazyQuery } from '@apollo/client';

import { useCallback } from 'react';

import { setMaxRepositories } from '../lib';
import { GET_USER_REPOSITORIES, UserRepositoriesType } from '../model';

import { MAX_REPOSITORIES } from '@/shared/config';

export const useUserRepositories = () => {
  const [searchRepositories, { loading, error, data }] = useLazyQuery<UserRepositoriesType>(GET_USER_REPOSITORIES);

  const searchUserRepositories = useCallback(() => {
    searchRepositories();
  }, [searchRepositories]);

  const result = data ? data.viewer.repositories.edges.map(edge => edge.node) : [];
  const totalCount = data ? data.viewer.repositories.totalCount : 0;
  const userRepositoryCount = setMaxRepositories(MAX_REPOSITORIES, totalCount);

  return { searchUserRepositories, result, loading, error, userRepositoryCount };
};
