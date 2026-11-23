import React from 'react';

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: 'primary' | 'muted' | 'dimmed';
  size?: 'sm' | 'base' | 'lg';
  as?: 'p' | 'span' | 'div';
}

export const Text: React.FC<TextProps> = ({
  children,
  variant = 'muted',
  size = 'sm',
  as: Component = 'p',
  className = '',
  ...props
}) => {
  const variantStyles = {
    primary: 'text-[#EDEDED]',
    muted: 'text-[#888888]',
    dimmed: 'text-neutral-500',
  };

  const sizeStyles = {
    sm: 'text-sm leading-relaxed',
    base: 'text-base leading-relaxed',
    lg: 'text-lg leading-relaxed',
  };

  return (
    <Component
      className={`font-sans ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};
