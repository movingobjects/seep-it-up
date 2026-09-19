import { shuffle } from '@movingobjects/utils/random';
import {
  COLOR_COUNT,
  COLORS,
} from '@/config';
import type {
  Palette,
  PaletteColor,
} from '@/types';

export function createPalette(): Palette {
  return shuffle(COLORS).slice(0, COLOR_COUNT);
}

// Lead with the given color and fill the rest with colors not in the
// current palette, falling back to reused ones if they run short
export function promoteColor(palette: Palette, color: PaletteColor): Palette {
  const others = COLORS.filter((c) => c !== color);
  const fresh = shuffle(others.filter((c) => !palette.includes(c)));
  const reused = shuffle(others.filter((c) => palette.includes(c)));

  return [
    color,
    ...fresh,
    ...reused,
  ].slice(0, COLOR_COUNT);
}
