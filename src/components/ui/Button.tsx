import React from 'react';
import { ButtonProps } from '../../types';

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  isLoading = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-150 select-none cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-white active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none min-h-[44px] min-w-[44px] touch-manipulation';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-2 gap-1.5 font-mono tracking-wider uppercase',
    md: 'text-xs sm:text-sm px-5 py-2.5 gap-2 font-sans tracking-tight',
    lg: 'text-sm sm:text-base px-7 py-3 gap-2.5 font-sans tracking-tight',
  };

  const variantStyles = {
    primary: 'bg-white text-black hover:bg-neutral-200 border border-white',
    secondary: 'bg-[#141414] text-[#EDEDED] border border-[#292929] hover:border-neutral-500 hover:bg-[#1a1a1a]',
    outline: 'bg-transparent text-[#EDEDED] border border-[#292929] hover:border-neutral-400 hover:bg-white/5',
    ghost: 'bg-transparent text-[#888888] hover:text-[#EDEDED] hover:bg-white/5',
    danger: 'bg-[#221010] text-red-400 border border-red-900/80 hover:bg-red-900/30',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin mr-1" />
      ) : (
        icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>
      )}
      <span>{children}</span>
      {!isLoading && icon && iconPosition === 'right' && (
        <span className="shrink-0">{icon}</span>
      )}
    </button>
  );
};
