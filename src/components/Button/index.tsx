import React from 'react';
import type { BaseProps } from '../../types';
import './styles.css';

interface ButtonProps extends BaseProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  style,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  onClick,
}) => {
  const buttonClass = `btn btn-${variant} btn-${size} ${className}`;

  return (
    <button
      className={buttonClass}
      style={style}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
