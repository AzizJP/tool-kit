import { useLazyQuery } from '@apollo/client';
import { useCallback } from 'react';

import { SEARCH_REPOSITORIES, AllRepositoriesType } from '../model';

export const useAllRepositories = () => {
  const [searchRepositories, { loading, error, data }] = useLazyQuery<AllRepositoriesType>(SEARCH_REPOSITORIES);

  const searchAllRepositories = useCallback(
    (value: string) => {
      searchRepositories({ variables: { searchTerm: value } });
    },
    [searchRepositories],
  );

  const result = data ? data.search.edges.map(edge => edge.node) : [];
  const allRepositoryCount = data ? data.search.repositoryCount : 0;

  return { searchAllRepositories, result, loading, error, allRepositoryCount };
};
