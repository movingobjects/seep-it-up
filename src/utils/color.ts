import { hexToRgb } from '@movingobjects/utils/colors';

// Pick black or white for whatever reads best on a given swatch
export const getContrastingColor = (hexColor: string): string => {
  const {
    r,
    g,
    b,
  } = hexToRgb(hexColor);

  const luminance = ((0.299 * r) + (0.587 * g) + (0.114 * b)) / 255;

  return luminance > 0.5 ? '#000000' : '#FFFFFF';
};
