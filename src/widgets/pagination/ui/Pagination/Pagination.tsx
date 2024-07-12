import { useUnit } from 'effector-react';
import { FC, useCallback, useEffect, useState } from 'react';

import { getPagination } from '../../lib';

import styles from './Pagination.module.scss';

import { $hasNextPage, $paginationCount } from '@/entities/pagination';
import { PAGE_KEY } from '@/shared/config';
import { useSearchQuery } from '@/shared/features';
import { Button } from '@/shared/ui/Button';

const Pagination: FC = () => {
  const { addQueryParam, removeQueryParam, getQueryParam, hasQueryParam } = useSearchQuery();

  const [currentPage, setCurrentPage] = useState(Number(getQueryParam(PAGE_KEY)) || 1);
  const paginationCount = useUnit($paginationCount);
  const hasNextPage = useUnit($hasNextPage);

  const pagination = getPagination(paginationCount);

  const handleClick = useCallback(
    (number: number) => {
      setCurrentPage(number);
      if (number === 1) return removeQueryParam(PAGE_KEY);
      addQueryParam(PAGE_KEY, String(number));
    },
    [addQueryParam, removeQueryParam],
  );

  useEffect(() => {
    if (!hasQueryParam(PAGE_KEY)) setCurrentPage(1);
  }, [hasQueryParam]);

  return (
    <div className={styles.root}>
      {currentPage > 5 ? (
        <>
          <Button theme="none" className="pagination" handleClick={() => removeQueryParam(PAGE_KEY)}>
            {`<<`}
          </Button>
          <Button theme="none" className="pagination" handleClick={() => handleClick(pagination[0] - 1)}>
            {`<`}
          </Button>
        </>
      ) : (
        <></>
      )}
      {pagination.map(number => (
        <Button theme="none" isAtcive={currentPage === number} className="pagination" key={number} handleClick={() => handleClick(number)}>
          {String(number)}
        </Button>
      ))}
      {hasNextPage ? (
        <Button
          theme="none"
          className="pagination"
          handleClick={() => {
            handleClick(pagination.at(-1)! + 1);
          }}
        >
          {`>`}
        </Button>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Pagination;
