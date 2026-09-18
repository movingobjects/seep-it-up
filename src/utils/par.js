// Estimates a "par" score for a board by greedily solving it.
//
// The board is reduced to a region graph: each connected same-color blob is a
// node, edges join blobs that touch. Play is then simulated with two greedy
// rules and the better (lower) result wins, since neither rule dominates the
// other across boards.

import { getNeighbors } from '@/utils/grid';

// Collapse the grid into connected same-color regions and their adjacencies
function getRegionGraph(grid, origin) {
  const rowCount = grid.length;
  const colCount = grid[0].length;

  const regionIds = Array(rowCount).fill(null)
    .map(() => Array(colCount).fill(-1));
  const regions = [];

  for (let row = 0; row < rowCount; row++) {
    for (let col = 0; col < colCount; col++) {
      if (regionIds[row][col] !== -1) continue;

      const color = grid[row][col];
      const id = regions.length;
      const region = {
        color,
        cellCount: 0,
        neighbors: new Set(),
      };
      regions.push(region);

      // Flood the blob iteratively; recursion would risk a stack overflow
      const queue = [[row, col]];
      regionIds[row][col] = id;

      while (queue.length) {
        const [r, c] = queue.pop();
        region.cellCount++;

        getNeighbors(grid, r, c).forEach(([nr, nc]) => {
          if (grid[nr][nc] !== color) return;
          if (regionIds[nr][nc] !== -1) return;

          regionIds[nr][nc] = id;
          queue.push([nr, nc]);
        });
      }
    }
  }

  // Link regions that touch; every cell is visited, so each link is
  // recorded from both sides
  for (let row = 0; row < rowCount; row++) {
    for (let col = 0; col < colCount; col++) {
      const id = regionIds[row][col];

      getNeighbors(grid, row, col).forEach(([nr, nc]) => {
        const neighborId = regionIds[nr][nc];
        if (neighborId !== id) regions[id].neighbors.add(neighborId);
      });
    }
  }

  return {
    regions,
    startId: regionIds[origin.row][origin.col],
  };
}

// Absorb every frontier region of a color, cascading through same-color
// neighbors that merge into the blob along with them
function capture(regions, color, captured, frontier) {
  const queue = [...frontier].filter((id) => regions[id].color === color);
  let cellsGained = 0;
  let regionsGained = 0;

  while (queue.length) {
    const id = queue.pop();
    if (captured.has(id)) continue;

    captured.add(id);
    frontier.delete(id);
    cellsGained += regions[id].cellCount;
    regionsGained++;

    regions[id].neighbors.forEach((neighborId) => {
      if (captured.has(neighborId)) return;

      if (regions[neighborId].color === color) {
        queue.push(neighborId);
      } else {
        frontier.add(neighborId);
      }
    });
  }

  return {
    cellsGained,
    regionsGained,
  };
}

// Play the board out, picking the color that scores highest each turn
function solve(regions, startId, getScore) {
  const captured = new Set([startId]);
  const frontier = new Set(regions[startId].neighbors);
  let moves = 0;

  while (frontier.size) {
    const candidateColors = new Set(
      [...frontier].map((id) => regions[id].color),
    );

    let bestColor = null;
    let bestScore = -1;

    candidateColors.forEach((color) => {
      // Score against throwaway copies so the real state stays untouched
      const gain = capture(
        regions,
        color,
        new Set(captured),
        new Set(frontier),
      );
      const score = getScore(gain);

      if (score > bestScore) {
        bestScore = score;
        bestColor = color;
      }
    });

    capture(regions, bestColor, captured, frontier);
    moves++;
  }

  return moves;
}

export default function calcPar(grid, origin) {
  const {
    regions, startId,
  } = getRegionGraph(grid, origin);

  const byCells = solve(regions, startId, ({ cellsGained }) => cellsGained);
  const byRegions = solve(regions, startId, ({ regionsGained }) => regionsGained);

  return Math.min(byCells, byRegions);
}
