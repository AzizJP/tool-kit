import { useUnit } from 'effector-react';
import { FC } from 'react';

import styles from './RepositoryList.module.scss';

import { $repositories } from '@/entities/repository';
import { RepositoryCard } from '@/entities/repository';

const RepositoryList: FC = () => {
  const repositories = useUnit($repositories);

  return (
    <div className={styles.root}>
      {repositories.map(card => (
        <RepositoryCard key={card.id} card={card} />
      ))}
    </div>
  );
};

export default RepositoryList;
