import type {
  ColorCountOdds,
  Coord,
  GridSize,
  Level,
  PaletteColor,
} from '@/types';

// Winning moves you up a level, losing drops you back to the first. Beating
// the last level moves on to endless play. Keep every grid size, here and in
// endless play, the same aspect ratio so the board holds its size throughout
export const LEVELS: Level[] = [
  {
    label: 'SM',
    colCount: 15,
    rowCount: 10,
    colorCount: 4,
  },
  {
    label: 'MD',
    colCount: 18,
    rowCount: 12,
    colorCount: 4,
  },
  {
    label: 'LG',
    colCount: 30,
    rowCount: 20,
    colorCount: 4,
  },
];

// Endless play picks a random grid size and color count for every board,
// and its wins count towards the streak. The header shows each as a die, so
// keep to six sizes, listed smallest first, and color counts from 1 to 6
export const ENDLESS_LABEL = 'Endless';

export const ENDLESS_GRID_SIZES: GridSize[] = [
  {
    colCount: 15,
    rowCount: 10,
  },
  {
    colCount: 18,
    rowCount: 12,
  },
  {
    colCount: 21,
    rowCount: 14,
  },
  {
    colCount: 27,
    rowCount: 18,
  },
  {
    colCount: 30,
    rowCount: 20,
  },
  {
    colCount: 36,
    rowCount: 24,
  },
];

// Weights are relative, so needn't add to 100
export const ENDLESS_COLOR_COUNT_ODDS: ColorCountOdds[] = [
  {
    colorCount: 3,
    weight: 3,
  },
  {
    colorCount: 4,
    weight: 4,
  },
  {
    colorCount: 5,
    weight: 2,
  },
  {
    colorCount: 6,
    weight: 1,
  },
];

export const ORIGIN: Coord = [0, 0];

export const COLORS: PaletteColor[] = [
  {
    color: '#1c4966',
    shade: '#0d224c',
  },
  {
    color: '#7bcfde',
    shade: '#06978e',
  },
  {
    color: '#005fb2',
    shade: '#014d68',
  },
  {
    color: '#629cdb',
    shade: '#3f67eb',
  },
  {
    color: '#3d996d',
    shade: '#0a6e79',
  },
  {
    color: '#b7d65b',
    shade: '#41b324',
  },
  {
    color: '#ff683e',
    shade: '#b52700',
  },
  {
    color: '#ea476a',
    shade: '#a8175b',
  },
  {
    color: '#ff64e5',
    shade: '#ae0fe8',
  },
  {
    color: '#ffca51',
    shade: '#ce900c',
  },
  {
    color: '#fffbbc',
    shade: '#f19f60',
  },
];

// Cell colors once the game is lost
export const LOST_FLOODED_COLOR: PaletteColor = {
  color: '#111',
  shade: '#333',
};
export const LOST_UNFLOODED_COLOR = '#333';

// Timing of the sequence between games, in milliseconds
export const WIN_PAUSE_DURATION = 500;
export const LOSE_BLINK_DURATION = 2000;
export const LOSE_BLINK_INTERVAL = 300;
export const BUILD_DURATION = 2000;

// While a board builds in, each die tumbles through a few random faces, each
// held a random while (in milliseconds), so the dice land out of step
export const DICE_ROLL_MIN_FACES = 5;
export const DICE_ROLL_MAX_FACES = 10;
export const DICE_FACE_MIN_DURATION = 90;
export const DICE_FACE_MAX_DURATION = 180;

// Colors dimmer than this relative luminance (0 to 1) vanish against the
// background, so the color die skips them while it rolls
export const MIN_DIE_LUMINANCE = 0.15;
