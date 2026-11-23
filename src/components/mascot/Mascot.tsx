import React, { useState } from 'react';
import { MascotProps } from '../../types';

// Size map for dimensions
const sizeMap = {
  avatar: 'w-9 h-9',
  xs: 'w-8 h-8',
  sm: 'w-12 h-12',
  md: 'w-24 h-24',
  lg: 'w-44 h-44',
  xl: 'w-56 h-56',
};

/**
 * Reusable Mascot Component
 * Displays the PERCEPT mascot companion with precise flexbox centering and aspect ratio containment.
 */
export const Mascot: React.FC<MascotProps> = ({
  variant = 'front',
  size = 'md',
  className = '',
  animate = false,
  alt = 'PERCEPT Mascot Companion',
  showBorder = false,
  onClick,
}) => {
  const sizeClasses = sizeMap[size] || sizeMap.md;
  const [loadFailed, setLoadFailed] = useState(false);

  // Primary source paths pointing to the local assets folder
  const primarySrc = 
    variant === 'head' 
      ? '/assets/mascot/mascot_head.png'
      : variant === 'side'
      ? '/assets/mascot/mascot_side.png'
      : '/assets/mascot/mascot_front.png';

  const fallbackOriginalJpg = '/assets/mascot/MASCOTTT.jpg';

  // Crop styling for fallback in case direct PNG fails to load
  const getFallbackStyle = (): React.CSSProperties => {
    if (variant === 'head') {
      return {
        objectFit: 'cover',
        objectPosition: '22% 20%',
        transform: 'scale(1.8)',
      };
    }
    if (variant === 'side') {
      return {
        objectFit: 'cover',
        objectPosition: '78% 50%',
        transform: 'scale(1.1)',
      };
    }
    return {
      objectFit: 'cover',
      objectPosition: '22% 50%',
      transform: 'scale(1.15)',
    };
  };

  const isCircular = variant === 'head' || size === 'avatar';

  const borderClass = showBorder
    ? 'border border-[#292929] bg-[#141414]'
    : '';

  const animClass = animate ? 'animate-float' : '';
  const isInteractive = Boolean(onClick);

  return (
    <div
      onClick={onClick}
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onKeyDown={(e) => {
        if (isInteractive && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick?.();
        }
      }}
      className={`relative flex items-center justify-center shrink-0 overflow-hidden ${
        isCircular ? 'rounded-full p-1' : 'rounded-none'
      } ${sizeClasses} ${borderClass} ${animClass} ${
        isInteractive ? 'cursor-pointer hover:scale-105 active:scale-95 transition-transform' : ''
      } ${className}`}
      aria-label={alt}
    >
      <img
        src={primarySrc}
        alt={alt}
        onError={(e) => {
          if (!loadFailed) {
            setLoadFailed(true);
            const target = e.currentTarget;
            target.src = fallbackOriginalJpg;
            Object.assign(target.style, getFallbackStyle());
          }
        }}
        className="w-full h-full object-contain select-none pointer-events-none"
        loading="lazy"
      />
    </div>
  );
};
