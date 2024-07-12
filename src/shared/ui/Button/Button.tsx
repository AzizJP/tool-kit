import { FC, MouseEventHandler } from 'react';

import styles from './Button.module.scss';

interface ButtonProps {
  children: string;
  handleClick: MouseEventHandler;
  disabled?: boolean;
  theme?: 'transparent' | 'none';
  className?: string;
  isAtcive?: boolean;
}

const Button: FC<ButtonProps> = ({ children, handleClick, disabled = false, theme = 'none', className, isAtcive = false }) => {
  return (
    <button
      className={`${styles.root} ${styles[theme]} ${className ? styles[className] : ''} ${isAtcive ? styles[`${className}_active`] : ''}`}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
