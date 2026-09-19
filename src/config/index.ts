import type {
  Coord,
  PaletteColor,
} from '@/types';

export const COL_COUNT = 35;
export const ROW_COUNT = 25;
export const COLOR_COUNT = 4;

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

// Win sequence colors, from the first move (coldest) to the last (hottest)
export const HEAT_COLORS = [
  '#4e00c3',
  '#5705db',
  '#3d00ff',
  '#0077ff',
  '#00f0ff',
  '#00ff85',
  '#d4ff00',
  '#ffb000',
  '#ff3d00',
  '#ff0080',
  '#ff53d7',
];

// Win sequence timing, in milliseconds
export const WIN_START_DELAY = 300;
export const WIN_STEP_DURATION = 65;
export const RADIATE_DURATION = 5000;
export const RADIATE_KEYFRAMES = 20;
