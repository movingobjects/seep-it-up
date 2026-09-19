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

// Everything needed to draw a board as it stood
export interface BoardState {
  grid: Grid;
  flooded: Mask;
  palette: Palette;
  isLost: boolean;
}

export interface GridSize {
  colCount: number;
  rowCount: number;
}

export interface Level extends GridSize {
  label: string;
  colorCount: number;
}

// A die's tumble, as the faces it shows and when each gives way to the next
export type DiceRoll = {
  face: number;
  color: string;
  endsAt: number;
}[];

export interface ColorCountOdds {
  colorCount: number;
  weight: number;
}
