import { shuffle } from '@movingobjects/utils/random';
import { useState } from 'react';
import {
  COLOR_COUNT,
  COLORS,
} from '@/config.js';

export default function usePalette() {
  const [palette, setPalette] = useState(
    shuffle(COLORS).slice(0, COLOR_COUNT),
  );

  const getNextSwatchColor = (currentColor) => {
    const startIndex = COLORS.indexOf(currentColor);

    for (let step = 1; step <= COLORS.length; step++) {
      const color = COLORS[(startIndex + step) % COLORS.length];
      if (!palette.includes(color)) return color;
    }

    return currentColor;
  };

  const shufflePalette = () => {
    setPalette(
      shuffle(COLORS).slice(0, COLOR_COUNT),
    );
  };

  const cycleSwatch = (index) => (
    setPalette((current) => current.map((color, i) => (
      (i === index)
        ? getNextSwatchColor(color, current)
        : color
    )))
  );

  return {
    palette,
    shufflePalette,
    cycleSwatch,
  };
}
