import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useSearchQuery = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const addQueryParam = useCallback(
    (key: string, value: string) => {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.set(key, value);
      setSearchParams(newSearchParams);
    },
    [searchParams, setSearchParams],
  );

  const removeQueryParam = useCallback(
    (key: string) => {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.delete(key);
      setSearchParams(newSearchParams);
    },
    [searchParams, setSearchParams],
  );

  const hasQueryParam = useCallback(
    (key: string) => {
      return searchParams.has(key);
    },
    [searchParams],
  );

  const getQueryParam = useCallback(
    (key: string) => {
      return searchParams.get(key);
    },
    [searchParams],
  );
  return { searchParams, setSearchParams, addQueryParam, removeQueryParam, hasQueryParam, getQueryParam };
};
