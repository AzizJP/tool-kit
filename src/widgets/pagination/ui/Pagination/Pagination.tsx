import { useUnit } from 'effector-react';
import { FC, useEffect } from 'react';

import { getPagination } from '../../lib';

import styles from './Pagination.module.scss';

import { $currentPage, $paginationCount, setCurrentPage } from '@/entities/pagination';
import { PAGE_KEY } from '@/shared/config';
import { useSearchQuery } from '@/shared/features';
import { Button } from '@/shared/ui/Button';

const Pagination: FC = () => {
  const { addQueryParam, removeQueryParam, getQueryParam } = useSearchQuery();
  const paginationCount = useUnit($paginationCount);
  const currentPage = useUnit($currentPage);
  const pagination = getPagination(paginationCount);

  const handleClick = (number: number) => {
    if (number === 1) return removeQueryParam(PAGE_KEY);
    addQueryParam(PAGE_KEY, String(number));
  };

  useEffect(() => {
    setCurrentPage(getQueryParam(PAGE_KEY) || '1');
  }, [getQueryParam]);

  return (
    <div className={styles.root}>
      {pagination.map(number => (
        <Button
          theme="none"
          isAtcive={Number(currentPage) === number}
          className="pagination"
          key={number}
          handleClick={() => handleClick(number)}
        >
          {String(number)}
        </Button>
      ))}
    </div>
  );
};

export default Pagination;
