import dayjs from 'dayjs';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { RepositoryInfoProps } from '../../model';

import styles from './RepositoryInfo.module.scss';

import { Button } from '@/shared/ui/Button';

const RepositoryInfo: FC<RepositoryInfoProps> = ({ name, stars, committedDate, languages, description, isEmpty }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.root}>
      <div>
        <h1>{name}</h1>
        <p>{description || isEmpty ? 'Пустой репозиторий' : 'Нет описания'}</p>
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

      <Button theme="transparent" handleClick={() => navigate(-1)}>
        К списку репозиториев
      </Button>
    </div>
  );
};

export default RepositoryInfo;
