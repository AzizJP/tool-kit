import { useLazyQuery } from '@apollo/client';
import { useCallback } from 'react';

import { setMaxRepositories } from '../lib';
import { SEARCH_REPOSITORIES, AllRepositoriesType } from '../model';

import { MAX_REPOSITORIES, NAME_KEY, NUMBER_OF_REPOSITORIES, PAGE_KEY, SEARCH_REPOSITORIES_COUNT } from '@/shared/config';
import { useSearchQuery } from '@/shared/features';

export const useAllRepositories = () => {
  const { addQueryParam, getQueryParam } = useSearchQuery();
  const [searchRepositories, { loading, error, data }] = useLazyQuery<AllRepositoriesType>(SEARCH_REPOSITORIES, {
    variables: { first: SEARCH_REPOSITORIES_COUNT },
  });

  const searchAllRepositories = useCallback(
    (value: string) => {
      addQueryParam(NAME_KEY, value);
      searchRepositories({ variables: { searchTerm: value } });
    },
    [searchRepositories, addQueryParam],
  );

  let result = data ? data.search.edges.map(edge => edge.node) : [];
  const totalCount = data ? data.search.repositoryCount : 0;
  const allRepositoryCount = setMaxRepositories(MAX_REPOSITORIES, totalCount);

  const pageNumber = Number(getQueryParam(PAGE_KEY)) || 1;
  result = result.slice((pageNumber - 1) * NUMBER_OF_REPOSITORIES, pageNumber * NUMBER_OF_REPOSITORIES);

  return { searchAllRepositories, result, loading, error, allRepositoryCount };
};
