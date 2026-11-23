import React from 'react';
import { CardProps } from '../../types';

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'primary',
  interactive = false,
  className = '',
  ...props
}) => {
  const baseStyles = 'border border-[#292929] transition-all duration-150';

  const variantStyles = {
    primary: 'bg-[#141414] text-[#EDEDED]',
    secondary: 'bg-[#111111] text-[#EDEDED]',
    ghost: 'bg-transparent text-[#EDEDED]',
  };

  const interactiveStyles = interactive
    ? 'hover:border-neutral-500 hover:bg-[#181818] cursor-pointer'
    : '';

  return (
    <div
      className={`${baseStyles} ${variantStyles[variant]} ${interactiveStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
