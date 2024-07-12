import { useLazyQuery } from '@apollo/client';
import { useCallback } from 'react';

import { setMaxRepositories } from '../lib';
import { SEARCH_REPOSITORIES, AllRepositoriesType } from '../model';

import { setRepositories } from '@/entities/repository';
import { MAX_REPOSITORIES, NAME_KEY, NUMBER_OF_REPOSITORIES, PAGE_KEY, SEARCH_REPOSITORIES_COUNT } from '@/shared/config';
import { useSearchQuery } from '@/shared/features';

export const useAllRepositories = () => {
  const { addQueryParam, getQueryParam } = useSearchQuery();
  const [searchRepositories, { loading, error, data, fetchMore }] = useLazyQuery<AllRepositoriesType>(SEARCH_REPOSITORIES);

  const searchAllRepositories = useCallback(
    (value: string, endCursor: string = '') => {
      addQueryParam(NAME_KEY, value);
      searchRepositories({ variables: { searchTerm: value, after: endCursor, first: SEARCH_REPOSITORIES_COUNT } });
    },
    [searchRepositories, addQueryParam],
  );

  const handleLoadMore = useCallback(() => {
    if (!data || !data.search.pageInfo.hasNextPage) return;

    fetchMore({
      variables: { after: data.search.pageInfo.endCursor },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        fetchMoreResult.search.edges = [...prevResult.search.edges, ...fetchMoreResult.search.edges];
        setRepositories(fetchMoreResult.search.edges.map(edge => edge.node));
        return fetchMoreResult;
      },
    });
  }, [data, fetchMore]);

  let result = data ? data.search.edges.map(edge => edge.node) : [];

  const totalCount = data ? data.search.repositoryCount : 0;
  const allRepositoryCount = setMaxRepositories(MAX_REPOSITORIES, totalCount);
  const hasNextPage = data ? data.search.pageInfo.hasNextPage : false;

  const pageNumber = Number(getQueryParam(PAGE_KEY)) || 1;
  result = result.slice((pageNumber - 1) * NUMBER_OF_REPOSITORIES, pageNumber * NUMBER_OF_REPOSITORIES);

  return { searchAllRepositories, result, loading, error, allRepositoryCount, hasNextPage, handleLoadMore };
};
