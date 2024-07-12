import { useSearchParams } from 'react-router-dom';

export const useSearchQuery = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const addQueryParam = (key: string, value: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set(key, value);
    setSearchParams(newSearchParams);
  };

  const removeQueryParam = (key: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.delete(key);
    setSearchParams(newSearchParams);
  };

  const hasQueryParam = (key: string) => {
    return searchParams.has(key);
  };

  const getQueryParam = (key: string) => {
    return searchParams.get(key);
  };
  return { searchParams, setSearchParams, addQueryParam, removeQueryParam, hasQueryParam, getQueryParam };
};
