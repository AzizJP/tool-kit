import { debounce } from 'lodash';
import { ChangeEvent, FC, MouseEvent, useCallback, useState } from 'react';

import styles from './SearchInput.module.scss';

import { useSearch } from '@/features/search';
import { Button } from '@/shared/ui/Button';

const SearchInput: FC = () => {
  const [inputValue, setInputValue] = useState('');
  const { search, results, loading } = useSearch();

  const postponeSearch = useCallback(debounce(search, 1000), [search]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    postponeSearch(value);
  };

  const clearInput = (event: MouseEvent) => {
    event.preventDefault();
    setInputValue('');
  };

  return (
    <>
      <input
        className={styles.input}
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Поиск по названию..."
      />
      <Button handleClick={clearInput} disabled={loading}>
        Очистить
      </Button>

      {results.map(({ name, stargazerCount, pushedAt, url }) => (
        <div>
          {`name: ${name}
          stargazerCount: ${stargazerCount}
          pushedAt: ${pushedAt} 
          url: ${url}`}
        </div>
      ))}
    </>
  );
};

export default SearchInput;
