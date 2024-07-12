import dayjs from 'dayjs';
import { FC } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { RepositoryCardProps } from '../../model';

import styles from './RepositoryCard.module.scss';

const RepositoryCard: FC<RepositoryCardProps> = ({ card }) => {
  const navigate = useNavigate();
  const { id, name, stargazerCount, defaultBranchRef, url } = card;
  const committedDate = defaultBranchRef?.target?.committedDate;

  const handleClick = () => navigate(`/${id}`);

  return (
    <article onClick={handleClick} className={styles.root}>
      <h3>{name}</h3>
      <p>{`Последний коммит: ${dayjs(committedDate).format('DD/MM/YYYY HH:mm')}`}</p>
      <span>{`⭐ ${stargazerCount}`}</span>
      <Link
        onClick={event => event.stopPropagation()}
        to={url}
        target="_blank"
        title={`GitHub репозиторий ${name}`}
      >{`ссылка на GitHub`}</Link>
    </article>
  );
};

export default RepositoryCard;
