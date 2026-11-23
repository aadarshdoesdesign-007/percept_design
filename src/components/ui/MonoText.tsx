import React from 'react';

export interface MonoTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: 'xs' | 'sm' | 'base';
  dimmed?: boolean;
}

export const MonoText: React.FC<MonoTextProps> = ({
  children,
  size = 'xs',
  dimmed = false,
  className = '',
  ...props
}) => {
  const sizeStyles = {
    xs: 'text-[11px] tracking-widest',
    sm: 'text-xs tracking-wider',
    base: 'text-sm tracking-normal',
  };

  return (
    <span
      className={`font-mono uppercase ${sizeStyles[size]} ${
        dimmed ? 'text-neutral-500' : 'text-neutral-400'
      } ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};
