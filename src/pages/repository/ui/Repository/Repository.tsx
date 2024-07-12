import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useGetRepository } from '../../api';
import { RepositoryInfo } from '../RepositoryInfo';
import { User } from '../User';

import styles from './Repository.module.scss';

const Repository: FC = () => {
  const { repository } = useParams();
  const { getRepository, data } = useGetRepository();
  const repositoryInfo = data ? data.node : undefined;

  useEffect(() => {
    if (repository) getRepository(repository);
  }, [repository]);

  if (!repositoryInfo) return;

  const { name, stargazerCount, defaultBranchRef, owner, languages, description } = repositoryInfo;

  return (
    <div className={styles.root}>
      <RepositoryInfo
        name={name}
        stars={stargazerCount}
        committedDate={defaultBranchRef.target.committedDate}
        languages={languages}
        description={description}
      />
      <User login={owner.login} avatarUrl={owner.avatarUrl} url={owner.url} />
    </div>
  );
};

export default Repository;
