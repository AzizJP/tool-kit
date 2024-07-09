import { FC } from 'react';

import { Link } from 'react-router-dom';

import styles from './NotFound.module.scss';

const NotFound: FC = () => {
  return (
    <section className={styles.root}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.message}>Упс, страница не найдена!</p>
      <Link to="/">На главную</Link>
    </section>
  );
};

export default NotFound;
