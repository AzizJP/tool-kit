import dayjs from 'dayjs';
import { FC } from 'react';

import { RepositoryInfoProps } from '../../model';

import styles from './RepositoryInfo.module.scss';

const RepositoryInfo: FC<RepositoryInfoProps> = ({ name, stars, committedDate, languages, description }) => {
  return (
    <div className={styles.root}>
      <div>
        <h1>{name}</h1>
        <p>{description || 'Нет описания'}</p>
      </div>
      <div className={styles.starsWrapper}>
        <span>{`${stars}⭐`}</span>
        <div className={styles.languages}>
          {languages.edges.map(({ node }, idx) => (
            <div className={styles.language} key={idx}>
              {node.name}
            </div>
          ))}
        </div>
      </div>
      <p>{`Последний коммит: ${dayjs(committedDate).format('DD/MM/YYYY HH:mm')}`}</p>
    </div>
  );
};

export default RepositoryInfo;
