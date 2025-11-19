import type { Position } from '@/types/dropdown';

export const getPositionStyles = (position: Position): React.CSSProperties => {
  const baseStyles: React.CSSProperties = {
    position: 'absolute',
    width: '260px',
    zIndex: 1000,
  };

  switch (position) {
    case 'bottom-right':
      return {
        ...baseStyles,
        top: '100%',
        left: '0',
        marginTop: '4px',
      };
    case 'bottom-left':
      return {
        ...baseStyles,
        top: '100%',
        right: '0',
        marginTop: '4px',
      };
    case 'top-right':
      return {
        ...baseStyles,
        bottom: '100%',
        left: '0',
        marginBottom: '4px',
      };
    case 'top-left':
      return {
        ...baseStyles,
        bottom: '100%',
        right: '0',
        marginBottom: '4px',
      };
    default:
      return baseStyles;
  }
};