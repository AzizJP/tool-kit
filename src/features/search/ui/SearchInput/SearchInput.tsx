import { debounce } from 'lodash';
import { ChangeEvent, FC, MouseEvent, useCallback, useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';

import { useAllRepositories, useUserRepositories } from '../../api';

import styles from './SearchInput.module.scss';

import { setPaginationCount } from '@/entities/pagination';
import { setRepositories } from '@/entities/repository';
import { NUMBER_OF_REPOSITORIES, roundUp, SEARCH_DELAY } from '@/shared/config';
import { Button } from '@/shared/ui/Button';

const SearchInput: FC = () => {
  const { search } = useLocation();
  const [inputValue, setInputValue] = useState('');
  const { searchAllRepositories, result: allRepositories, loading, allRepositoryCount } = useAllRepositories();
  const { searchUserRepositories, result: userRepositories, userRepositoryCount } = useUserRepositories();

  const postponeSearch = useCallback(debounce(searchAllRepositories, SEARCH_DELAY), [searchAllRepositories]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    postponeSearch(value);
  };

  const clearInput = (event: MouseEvent) => {
    event.preventDefault();
    setInputValue('');
  };

  useEffect(() => {
    if (!inputValue) {
      searchUserRepositories();
    }
  }, [inputValue, searchUserRepositories]);

  useEffect(() => {
    if (inputValue && allRepositories.length) {
      setPaginationCount(roundUp(allRepositoryCount / NUMBER_OF_REPOSITORIES));
      setRepositories(allRepositories);
    }
  }, [inputValue, allRepositories, allRepositoryCount]);

  useEffect(() => {
    if (!inputValue && userRepositories.length) {
      setPaginationCount(roundUp(userRepositoryCount / NUMBER_OF_REPOSITORIES));
      setRepositories(userRepositories);
    }
  }, [inputValue, userRepositories, userRepositoryCount]);

  useEffect(() => {
    const currentPage = search ? Number(search.slice(6)) : 1;
  }, [search]);

  return (
    <>
      <input className={styles.input} type="text" value={inputValue} onChange={handleChange} placeholder="Поиск по названию..." />
      <Button handleClick={clearInput} disabled={loading}>
        Очистить
      </Button>
    </>
  );
};

export default SearchInput;
