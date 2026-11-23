import React, { useEffect } from 'react';
import { IconClose } from './icons';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'lg',
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthStyles = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-3xl',
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
    >
      {/* Dark backdrop: Solid high-contrast scrim */}
      <div
        className="fixed inset-0 bg-black/85 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Surface */}
      <div
        className={`relative w-full ${maxWidthStyles[maxWidth]} bg-[#141414] border border-[#292929] p-6 sm:p-8 z-10 animate-fadeIn max-h-[90vh] overflow-y-auto`}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 mb-6 border-b border-[#292929]">
          <div>
            {subtitle && (
              <span className="font-mono text-[10px] tracking-widest text-[#D99535] uppercase block mb-1">
                {subtitle}
              </span>
            )}
            {title && (
              <h3 className="font-display font-bold tracking-tight text-xl sm:text-2xl text-[#EDEDED]">
                {title}
              </h3>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 min-w-[40px] min-h-[40px] flex items-center justify-center bg-[#111111] border border-[#292929] text-neutral-400 hover:text-white hover:border-neutral-500 transition-colors cursor-pointer shrink-0 touch-manipulation"
            aria-label="Close modal"
          >
            <IconClose className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div>{children}</div>
      </div>
    </div>
  );
};
