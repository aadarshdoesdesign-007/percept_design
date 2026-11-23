export interface ImageMetadata {
  id: string;
  src: string;
  alt: string;
  title?: string;
  attribution?: string;
  license?: string;
  aspectRatio?: '1/1' | '4/3' | '16/9' | '3/4' | '21/9' | 'auto';
  category?: 'specimen' | 'monograph' | 'mission' | 'mascot' | 'diagram';
}

export interface ImageLoadState {
  isLoading: boolean;
  isError: boolean;
  isLoaded: boolean;
}
