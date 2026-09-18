import {
  fromHex,
  getMix,
  toHex,
} from '@movingobjects/utils/colors';
import {
  HEAT_COLORS,
  WIN_START_DELAY,
  WIN_STEP_DURATION,
} from '@/config';
import type { PaletteColor } from '@/types';

// A color along the heat map, from 0 (coldest) to 1 (hottest)
export function getHeatColor(heat: number): PaletteColor {
  const position = heat * (HEAT_COLORS.length - 1);
  const index = Math.min(Math.floor(position), HEAT_COLORS.length - 2);
  const color = getMix(
    fromHex(HEAT_COLORS[index]),
    fromHex(HEAT_COLORS[index + 1]),
    position - index,
  );

  return {
    color: toHex(color),
    shade: toHex(color),
  };
}

// Heat colors for every step of the game, indexed by the move it was made on
export function getHeatColors(moveCount: number): PaletteColor[] {
  return Array.from({ length: moveCount + 1 }, (_, step) => (
    getHeatColor(step / Math.max(moveCount, 1))
  ));
}

// Moves play back in reverse, so the last move is revealed first
export function getRevealDelay(step: number, moveCount: number): number {
  return WIN_START_DELAY + (moveCount - step) * WIN_STEP_DURATION;
}

// Time until every step has been revealed
export function getWinDuration(moveCount: number): number {
  return getRevealDelay(-1, moveCount);
}
