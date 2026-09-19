import { shuffle } from '@movingobjects/utils/random';
import type {
  ColorIndex,
  Coord,
  Grid,
  Mask,
} from '@/types';

export function createGrid(rowCount: number, colCount: number, colorCount: number): Grid {
  return Array.from({ length: rowCount }, () => (
    Array.from({ length: colCount }, () => (
      Math.floor(Math.random() * colorCount)
    ))
  ));
}

// The in-bounds cells directly above, below, left and right of a cell
export function getNeighbors(grid: Grid, row: number, col: number): Coord[] {
  const rowCount = grid.length;
  const colCount = grid[0].length;
  const adjacent: Coord[] = [
    [row - 1, col],
    [row + 1, col],
    [row, col - 1],
    [row, col + 1],
  ];

  return adjacent.filter(([r, c]) => r >= 0 && r < rowCount && c >= 0 && c < colCount);
}

// Mark every cell joined to the origin through cells of its color
export function getFloodedMask(grid: Grid, origin: Coord): Mask {
  const [oRow, oCol] = origin;
  const color = grid[oRow][oCol];
  const mask = grid.map((row) => row.map(() => false));

  // Iterative so large boards can't overflow the stack
  const stack: Coord[] = [origin];
  mask[oRow][oCol] = true;

  while (stack.length) {
    const [row, col] = stack.pop() as Coord;

    getNeighbors(grid, row, col).forEach(([r, c]) => {
      if (mask[r][c] || grid[r][c] !== color) return;

      mask[r][c] = true;
      stack.push([r, c]);
    });
  }

  return mask;
}

// Repaint the flooded cells, returning a new grid
export function flood(grid: Grid, mask: Mask, color: ColorIndex): Grid {
  return grid.map((row, r) => row.map((cell, c) => (mask[r][c] ? color : cell)));
}

export function isGridComplete(grid: Grid): boolean {
  const color = grid[0][0];
  return grid.every((row) => row.every((cell) => cell === color));
}

// Give each cell a random place in the order the board builds in
export function createBuildOrder(rowCount: number, colCount: number): number[][] {
  const order = shuffle(Array.from({ length: rowCount * colCount }, (_, i) => i));

  return Array.from({ length: rowCount }, (_, row) => (
    order.slice(row * colCount, (row + 1) * colCount)
  ));
}
