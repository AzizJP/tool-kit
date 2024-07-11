import { FC, MouseEventHandler } from 'react';

import styles from './Button.module.scss';

interface ButtonProps {
  children: string;
  handleClick: MouseEventHandler;
  disabled?: boolean;
  theme?: 'transparent';
  className?: string;
}

const Button: FC<ButtonProps> = ({ children, handleClick, disabled = false, theme = 'transparent', className }) => {
  return (
    <button className={`${styles.root} ${styles[theme]} ${className ? styles[className] : ''}`} onClick={handleClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
