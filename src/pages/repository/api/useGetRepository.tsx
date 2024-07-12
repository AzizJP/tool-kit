import { useLazyQuery } from '@apollo/client';
import { useCallback } from 'react';

import { GET_REPOSITORIY, RepositoryPageType } from '../model';

export const useGetRepository = () => {
  const [searchRepository, { loading, error, data }] = useLazyQuery<RepositoryPageType>(GET_REPOSITORIY);

  const getRepository = useCallback(
    (value: string) => {
      searchRepository({ variables: { id: value } });
    },
    [searchRepository],
  );

  return { getRepository, data, loading, error };
};
