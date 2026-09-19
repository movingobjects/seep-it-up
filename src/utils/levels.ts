import { item } from '@movingobjects/utils/random';
import {
  ENDLESS_COLOR_COUNT_ODDS,
  ENDLESS_GRID_SIZES,
  ENDLESS_LABEL,
  LEVELS,
} from '@/config';
import type {
  GridSize,
  Level,
} from '@/types';

// Every level index from here on is endless play
export const ENDLESS_LEVEL_INDEX = LEVELS.length;

// The board is sized to fit the largest grid it could show
const gridSizes = [...LEVELS, ...ENDLESS_GRID_SIZES];
export const MAX_COL_COUNT = Math.max(...gridSizes.map(({ colCount }) => colCount));
export const MAX_ROW_COUNT = Math.max(...gridSizes.map(({ rowCount }) => rowCount));

export function isEndless(levelIndex: number): boolean {
  return levelIndex >= ENDLESS_LEVEL_INDEX;
}

// Where an endless level's grid sits among the possible sizes, smallest first
export function getEndlessSizeIndex({
  colCount, rowCount,
}: GridSize): number {
  return ENDLESS_GRID_SIZES.findIndex((size) => (
    size.colCount === colCount && size.rowCount === rowCount
  ));
}

function pickEndlessColorCount(): number {
  const totalWeight = ENDLESS_COLOR_COUNT_ODDS.reduce((sum, { weight }) => sum + weight, 0);
  let roll = Math.random() * totalWeight;

  const odds = ENDLESS_COLOR_COUNT_ODDS.find(({ weight }) => {
    roll -= weight;
    return roll < 0;
  });

  return (odds ?? ENDLESS_COLOR_COUNT_ODDS[ENDLESS_COLOR_COUNT_ODDS.length - 1]).colorCount;
}

// The set level at an index, or once past them, a fresh random endless one
export function getLevel(levelIndex: number): Level {
  if (!isEndless(levelIndex)) return LEVELS[levelIndex];

  return {
    label: ENDLESS_LABEL,
    ...item(ENDLESS_GRID_SIZES),
    colorCount: pickEndlessColorCount(),
  };
}
