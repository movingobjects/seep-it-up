// An index into the active palette
export type ColorIndex = number;

// Rows of cells, each holding the color index it's painted
export type Grid = ColorIndex[][];

// Same shape as a grid, marking which cells are part of the flood
export type Mask = boolean[][];

export type Coord = [
  row: number,
  col: number,
];

export interface PaletteColor {
  color: string;
  shade: string;
}

export type Palette = PaletteColor[];
