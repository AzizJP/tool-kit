import { useUnit } from 'effector-react';
import { FC, useCallback, useState } from 'react';

import { getPagination } from '../../lib';

import styles from './Pagination.module.scss';

import { $paginationCount } from '@/entities/pagination';
import { PAGE_KEY } from '@/shared/config';
import { useSearchQuery } from '@/shared/features';
import { Button } from '@/shared/ui/Button';

const Pagination: FC = () => {
  const { addQueryParam, removeQueryParam, getQueryParam } = useSearchQuery();
  const [currentPage, setCurrentPage] = useState(Number(getQueryParam(PAGE_KEY)) || 1);
  const paginationCount = useUnit($paginationCount);
  const pagination = getPagination(paginationCount);

  const handleClick = useCallback(
    (number: number) => {
      setCurrentPage(number);
      if (number === 1) return removeQueryParam(PAGE_KEY);
      addQueryParam(PAGE_KEY, String(number));
    },
    [addQueryParam, removeQueryParam],
  );

  return (
    <div className={styles.root}>
      {pagination.map(number => (
        <Button theme="none" isAtcive={currentPage === number} className="pagination" key={number} handleClick={() => handleClick(number)}>
          {String(number)}
        </Button>
      ))}
    </div>
  );
};

export default Pagination;
