// A grid is an array of rows, each cell holding an index into the palette

export function createGrid(rowCount, colCount, colorCount) {
  return Array.from({ length: rowCount }, () => (
    Array.from({ length: colCount }, () => (
      Math.floor(Math.random() * colorCount)
    ))
  ));
}

// The in-bounds cells directly above, below, left and right of a cell
export function getNeighbors(grid, row, col) {
  const rowCount = grid.length;
  const colCount = grid[0].length;

  return [
    [row - 1, col],
    [row + 1, col],
    [row, col - 1],
    [row, col + 1],
  ].filter(([r, c]) => r >= 0 && r < rowCount && c >= 0 && c < colCount);
}

// Mark every cell joined to the origin through cells of its color
export function getFloodedMask(grid, origin) {
  const color = grid[origin.row][origin.col];
  const mask = grid.map((row) => row.map(() => false));

  // Iterative so large boards can't overflow the stack
  const stack = [[origin.row, origin.col]];
  mask[origin.row][origin.col] = true;

  while (stack.length) {
    const [row, col] = stack.pop();

    getNeighbors(grid, row, col).forEach(([r, c]) => {
      if (mask[r][c] || grid[r][c] !== color) return;

      mask[r][c] = true;
      stack.push([r, c]);
    });
  }

  return mask;
}

// Repaint the flooded cells, returning a new grid
export function flood(grid, mask, color) {
  return grid.map((row, r) => row.map((cell, c) => (mask[r][c] ? color : cell)));
}

export function isGridComplete(grid) {
  const color = grid[0][0];
  return grid.every((row) => row.every((cell) => cell === color));
}
