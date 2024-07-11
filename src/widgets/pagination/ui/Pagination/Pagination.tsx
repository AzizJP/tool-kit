import { useUnit } from 'effector-react';
import { FC } from 'react';

import { Link } from 'react-router-dom';

import { getPagination, getPaginationLink } from '../../lib';

import styles from './Pagination.module.scss';

import { $paginationCount } from '@/entities/pagination';

const Pagination: FC = () => {
  const paginationCount = useUnit($paginationCount);
  const pagination = getPagination(paginationCount);

  return (
    <div className={styles.root}>
      {pagination.map(number => (
        <Link key={number} to={getPaginationLink(number)}>
          {number}
        </Link>
      ))}
    </div>
  );
};

export default Pagination;
