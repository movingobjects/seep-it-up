// An index into the active palette
export type ColorIndex = number;

// Rows of cells, each holding the color index it's painted
export type Grid = ColorIndex[][];

// Same shape as a grid, marking which cells are part of the flood
export type Mask = boolean[][];

// Same shape as a grid, marking the move each cell joined the flood on.
// Cells flooded from the start are 0, cells not yet flooded are -1
export type FloodOrder = number[][];

export type Coord = [
  row: number,
  col: number,
];

export interface PaletteColor {
  color: string;
  shade: string;
}

export type Palette = PaletteColor[];
