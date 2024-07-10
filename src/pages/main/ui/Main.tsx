import { FC } from 'react';

import styles from './Main.module.scss';

import { RepositoryList } from '@/widgets/repository-list';
import { SearchForm } from '@/widgets/search-form';

const Main: FC = () => {
  return (
    <section className={styles.root}>
      <SearchForm />
      <RepositoryList />
    </section>
  );
};

export default Main;
