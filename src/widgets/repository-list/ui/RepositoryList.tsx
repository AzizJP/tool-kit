import { useUnit } from 'effector-react';
import { FC } from 'react';

import styles from './RepositoryList.module.scss';

import { $repositories } from '@/entities/repository';

const RepositoryList: FC = () => {
  const repositories = useUnit($repositories);

  return (
    <div className={styles.root}>
      {repositories.map(({ id, name, stargazerCount, pushedAt, url }) => (
        <div key={id}>
          {`name: ${name}
      stargazerCount: ${stargazerCount}
      pushedAt: ${pushedAt} 
      url: ${url}`}
        </div>
      ))}
    </div>
  );
};

export default RepositoryList;
