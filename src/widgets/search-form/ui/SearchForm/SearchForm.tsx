import { FC } from 'react';

import styles from './SearchForm.module.scss';

import { SearchInput } from '@/features/search';

const SearchForm: FC = () => {
  return (
    <form className={styles.root}>
      <SearchInput />
    </form>
  );
};

export default SearchForm;
