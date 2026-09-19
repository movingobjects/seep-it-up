import { shuffle } from '@movingobjects/utils/random';
import { useState } from 'react';
import {
  COLOR_COUNT,
  COLORS,
} from '@/config';
import type {
  Palette,
  PaletteColor,
} from '@/types';

export default function usePalette() {
  const [palette, setPalette] = useState<Palette>(
    shuffle(COLORS).slice(0, COLOR_COUNT),
  );

  const getNextSwatchColor = (
    currentColor: PaletteColor,
    currentPalette: Palette,
  ) => {
    const startIndex = COLORS.indexOf(currentColor);

    for (let step = 1; step <= COLORS.length; step++) {
      const color = COLORS[(startIndex + step) % COLORS.length];
      if (!currentPalette.includes(color)) return color;
    }

    return currentColor;
  };

  const shufflePalette = () => {
    setPalette(
      shuffle(COLORS).slice(0, COLOR_COUNT),
    );
  };

  // Lead with the given color and fill the rest with colors not in the
  // current palette, falling back to reused ones if they run short
  const promoteColor = (color: PaletteColor) => {
    setPalette((current) => {
      const others = COLORS.filter((c) => c !== color);
      const fresh = shuffle(others.filter((c) => !current.includes(c)));
      const reused = shuffle(others.filter((c) => current.includes(c)));

      return [
        color,
        ...fresh,
        ...reused,
      ].slice(0, COLOR_COUNT);
    });
  };

  const cycleSwatch = (index: number) => (
    setPalette((current) => current.map((color, i) => (
      (i === index)
        ? getNextSwatchColor(color, current)
        : color
    )))
  );

  return {
    palette,
    shufflePalette,
    promoteColor,
    cycleSwatch,
  };
}
