import { useLazyQuery } from '@apollo/client';
import { useCallback } from 'react';

import { SEARCH_REPOSITORIES } from '../query';
import { Repositories } from '../types';

export const useSearch = () => {
  const [searchRepositories, { loading, error, data }] = useLazyQuery<Repositories>(SEARCH_REPOSITORIES);

  const search = useCallback(
    (value: string) => {
      searchRepositories({ variables: { searchTerm: value } });
    },
    [searchRepositories],
  );

  const results = data ? data.search.edges.map(edge => edge.node) : [];

  return { search, results, loading, error };
};
