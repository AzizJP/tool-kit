import { FC } from 'react';
import { Link } from 'react-router-dom';

import { UserProps } from '../../model';

import styles from './User.module.scss';

const User: FC<UserProps> = ({ login, avatarUrl, url }) => {
  return (
    <div className={styles.root}>
      <div className={styles.info}>
        <p className={styles.login}>{login}</p>
        <Link className={styles.link} to={url} target="_blank" title={`GitHub ${login}`}>{`Ссылка на GitHub`}</Link>
      </div>
      <div className={styles.imageWrapper}>
        <img className={styles.image} src={avatarUrl} alt={`Аватар ${login}`} title={`Аватар ${login}`} width={100} height={100} />
      </div>
    </div>
  );
};

export default User;
