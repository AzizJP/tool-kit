import { useLazyQuery } from '@apollo/client';
import { useCallback } from 'react';

import { setMaxRepositories } from '../lib';
import { SEARCH_REPOSITORIES, AllRepositoriesType } from '../model';

import { MAX_REPOSITORIES, NAME_KEY } from '@/shared/config';
import { useSearchQuery } from '@/shared/features';

export const useAllRepositories = () => {
  const { addQueryParam } = useSearchQuery();
  const [searchRepositories, { loading, error, data }] = useLazyQuery<AllRepositoriesType>(SEARCH_REPOSITORIES);

  const searchAllRepositories = useCallback(
    (value: string) => {
      addQueryParam(NAME_KEY, value);
      searchRepositories({ variables: { searchTerm: value } });
    },
    [searchRepositories, addQueryParam],
  );

  const result = data ? data.search.edges.map(edge => edge.node).filter(({ isEmpty }) => !isEmpty) : [];
  const totalCount = data ? data.search.repositoryCount : 0;
  const allRepositoryCount = setMaxRepositories(MAX_REPOSITORIES, totalCount);

  return { searchAllRepositories, result, loading, error, allRepositoryCount };
};
