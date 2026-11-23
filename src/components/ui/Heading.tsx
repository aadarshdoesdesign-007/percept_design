import React from 'react';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'div' | 'span';
}

export const Heading: React.FC<HeadingProps> = ({
  children,
  level = 1,
  as,
  className = '',
  ...props
}) => {
  const Component = as || (`h${level}` as React.ElementType);

  const levelStyles = {
    1: 'text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1]',
    2: 'text-2xl sm:text-3xl font-bold tracking-tight leading-snug',
    3: 'text-xl sm:text-2xl font-bold tracking-tight',
    4: 'text-lg font-semibold tracking-tight',
  };

  return (
    <Component
      className={`font-display text-[#EDEDED] ${levelStyles[level]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};
