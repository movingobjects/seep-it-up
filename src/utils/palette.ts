import { shuffle } from '@movingobjects/utils/random';
import { COLORS } from '@/config';
import type {
  Palette,
  PaletteColor,
} from '@/types';

export function createPalette(colorCount: number): Palette {
  return shuffle(COLORS).slice(0, colorCount);
}

// Lead with the given color and fill the rest with colors not in the
// current palette, falling back to reused ones if they run short
export function promoteColor(
  palette: Palette,
  color: PaletteColor,
  colorCount: number,
): Palette {
  const others = COLORS.filter((c) => c !== color);
  const fresh = shuffle(others.filter((c) => !palette.includes(c)));
  const reused = shuffle(others.filter((c) => palette.includes(c)));

  return [
    color,
    ...fresh,
    ...reused,
  ].slice(0, colorCount);
}
