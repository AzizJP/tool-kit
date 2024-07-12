import { debounce } from 'lodash';
import { ChangeEvent, FC, MouseEvent, useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAllRepositories, useUserRepositories } from '../../api';

import styles from './SearchInput.module.scss';

import { setHasNextPage, setPaginationCount } from '@/entities/pagination';
import { setRepositories } from '@/entities/repository';
import { NAME_KEY, NUMBER_OF_PAGINATION, PAGE_KEY, roundUp, SEARCH_DELAY } from '@/shared/config';
import { useSearchQuery } from '@/shared/features';
import { Button } from '@/shared/ui/Button';

const SearchInput: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { removeQueryParam, hasQueryParam, getQueryParam } = useSearchQuery();

  const [inputValue, setInputValue] = useState(getQueryParam(NAME_KEY) || '');

  const { searchAllRepositories, result: allRepositories, loading, allRepositoryCount, hasNextPage: allHasNextPage } = useAllRepositories();
  const { searchUserRepositories, result: userRepositories, userRepositoryCount, hasNextPage: userHasNextPage } = useUserRepositories();

  const postponeSearch = useCallback(debounce(searchAllRepositories, SEARCH_DELAY), [searchAllRepositories]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    removeQueryParam(PAGE_KEY);
    setInputValue(value);
    postponeSearch(value);
  };

  const clearInput = (event: MouseEvent) => {
    event.preventDefault();
    const newPath = location.pathname;
    setInputValue('');
    navigate(newPath, { replace: true });
  };

  useEffect(() => {
    if (!inputValue) return searchUserRepositories();
    postponeSearch(inputValue);
  }, [inputValue, searchUserRepositories]);

  useEffect(() => {
    if (inputValue && allRepositories.length) {
      setPaginationCount(roundUp(allRepositoryCount / NUMBER_OF_PAGINATION));
      setRepositories(allRepositories);
      setHasNextPage(allHasNextPage);
    }
  }, [inputValue, allRepositories, allRepositoryCount, allHasNextPage]);

  useEffect(() => {
    if (!inputValue && userRepositories.length) {
      setPaginationCount(roundUp(userRepositoryCount / NUMBER_OF_PAGINATION));
      setRepositories(userRepositories);
      setHasNextPage(userHasNextPage);
      if (hasQueryParam(NAME_KEY)) removeQueryParam(NAME_KEY);
    }
  }, [hasQueryParam, inputValue, removeQueryParam, userHasNextPage, userRepositories, userRepositoryCount]);

  return (
    <>
      <input className={styles.input} type="text" value={inputValue} onChange={handleChange} placeholder="Поиск по названию..." />
      <Button theme="transparent" handleClick={clearInput} disabled={loading}>
        Очистить
      </Button>
    </>
  );
};

export default SearchInput;
