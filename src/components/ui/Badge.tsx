import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'neutral' | 'success' | 'warning' | 'danger' | 'accent' | 'editorial';
  size?: 'xs' | 'sm';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'sm',
  className = '',
  ...props
}) => {
  const sizeStyles = {
    xs: 'text-[9px] px-2 py-0.5 tracking-wider',
    sm: 'text-[10px] px-2.5 py-1 tracking-widest',
  };

  const variantStyles = {
    neutral: 'bg-[#141414] border border-[#292929] text-neutral-400',
    accent: 'bg-white text-black font-bold border border-white',
    editorial: 'bg-transparent border border-neutral-700 text-neutral-300 font-mono',
    success: 'bg-[#0f1f17] border border-emerald-900/80 text-emerald-400',
    warning: 'bg-[#1f190e] border border-amber-900/80 text-amber-300',
    danger: 'bg-[#221010] border border-red-900/80 text-red-400',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono uppercase select-none rounded-none ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};
