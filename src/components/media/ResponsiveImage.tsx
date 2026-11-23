import React, { useState } from 'react';
import { isValidImageSource } from '../../services/imageValidation';

export interface ResponsiveImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  aspectRatio?: '1/1' | '4/3' | '16/9' | '3/4' | '21/9' | 'auto';
  showAttribution?: boolean;
  attribution?: string;
  license?: string;
  containerClassName?: string;
  priority?: boolean;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none';
}

const aspectRatioClasses = {
  '1/1': 'aspect-square',
  '4/3': 'aspect-[4/3]',
  '16/9': 'aspect-video',
  '3/4': 'aspect-[3/4]',
  '21/9': 'aspect-[21/9]',
  'auto': '',
};

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  fallbackSrc,
  aspectRatio = 'auto',
  showAttribution = false,
  attribution,
  license,
  containerClassName = '',
  className = '',
  priority = false,
  objectFit = 'contain',
  onError,
  onLoad,
  ...props
}) => {
  const [hasError, setHasError] = useState(!isValidImageSource(src));
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    setHasError(!isValidImageSource(src));
    setIsLoading(true);
  }, [src]);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (fallbackSrc && src !== fallbackSrc) {
      e.currentTarget.src = fallbackSrc;
      return;
    }
    setHasError(true);
    setIsLoading(false);
    onError?.(e);
  };

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsLoading(false);
    setHasError(false);
    onLoad?.(e);
  };

  const fitClass = objectFit === 'cover' ? 'object-cover' : 'object-contain';
  const ratioClass = aspectRatioClasses[aspectRatio] || '';

  return (
    <div className={`relative overflow-hidden bg-[#0A0A0A] border border-[#292929] ${ratioClass} ${containerClassName}`}>
      {/* Loading Skeleton */}
      {isLoading && !hasError && (
        <div
          className="absolute inset-0 bg-[#141414] animate-pulse flex items-center justify-center font-mono text-[9px] text-neutral-600 uppercase tracking-widest"
          aria-hidden="true"
        >
          CALIBRATING SPECIMEN...
        </div>
      )}

      {/* Actual Image */}
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onError={handleImageError}
          onLoad={handleImageLoad}
          className={`w-full h-full ${fitClass} select-none transition-opacity duration-200 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          } ${className}`}
          {...props}
        />
      ) : (
        /* Restrained Swiss Editorial Unavailable State (Never a generic broken image icon) */
        <div className="absolute inset-0 p-6 flex flex-col items-center justify-center text-center bg-[#111111] space-y-2 border border-red-950/40">
          <div className="w-8 h-8 border border-neutral-700 bg-black flex items-center justify-center font-mono text-xs text-[#D99535]">
            Ø
          </div>
          <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest font-bold">
            SPECIMEN UNAVAILABLE
          </span>
          <p className="font-sans text-xs text-neutral-500 max-w-xs leading-relaxed">
            The archival visual plate could not be resolved from local registry.
          </p>
        </div>
      )}

      {/* Attribution Overlay Pill if requested */}
      {showAttribution && attribution && !hasError && !isLoading && (
        <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/85 border border-[#292929] font-mono text-[8px] text-neutral-400 max-w-[80%] truncate">
          {attribution} {license ? `· ${license}` : ''}
        </div>
      )}
    </div>
  );
};
