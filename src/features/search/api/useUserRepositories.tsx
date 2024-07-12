import { useLazyQuery } from '@apollo/client';

import { useCallback } from 'react';

import { setMaxRepositories } from '../lib';
import { GET_USER_REPOSITORIES, UserRepositoriesType } from '../model';

import { MAX_REPOSITORIES, NUMBER_OF_REPOSITORIES, PAGE_KEY, SEARCH_REPOSITORIES_COUNT } from '@/shared/config';
import { useSearchQuery } from '@/shared/features';

export const useUserRepositories = () => {
  const { getQueryParam } = useSearchQuery();
  const [searchRepositories, { loading, error, data }] = useLazyQuery<UserRepositoriesType>(GET_USER_REPOSITORIES, {
    variables: { first: SEARCH_REPOSITORIES_COUNT },
  });

  const searchUserRepositories = useCallback(() => {
    searchRepositories();
  }, [searchRepositories]);

  let result = data ? data.viewer.repositories.edges.map(edge => edge.node) : [];
  const totalCount = data ? data.viewer.repositories.totalCount : 0;
  const userRepositoryCount = setMaxRepositories(MAX_REPOSITORIES, totalCount);

  const pageNumber = Number(getQueryParam(PAGE_KEY)) || 1;
  result = result.slice((pageNumber - 1) * NUMBER_OF_REPOSITORIES, pageNumber * NUMBER_OF_REPOSITORIES);

  return { searchUserRepositories, result, loading, error, userRepositoryCount };
};
