// Estimates a "par" score for a board by greedily solving it.
//
// The board is reduced to a region graph: each connected same-color blob is a
// node, edges join blobs that touch. Play is then simulated with two greedy
// rules and the better (lower) result wins, since neither rule dominates the
// other across boards.

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

        const adjacent = [
          [r - 1, c],
          [r + 1, c],
          [r, c - 1],
          [r, c + 1],
        ];
        adjacent.forEach(([nr, nc]) => {
          if (nr < 0 || nr >= rowCount || nc < 0 || nc >= colCount) return;
          if (grid[nr][nc] !== color) return;
          if (regionIds[nr][nc] !== -1) return;

          regionIds[nr][nc] = id;
          queue.push([nr, nc]);
        });
      }
    }
  }

  // Link regions that touch
  for (let row = 0; row < rowCount; row++) {
    for (let col = 0; col < colCount; col++) {
      const id = regionIds[row][col];

      [[row + 1, col], [row, col + 1]].forEach(([nr, nc]) => {
        if (nr >= rowCount || nc >= colCount) return;

        const neighborId = regionIds[nr][nc];
        if (neighborId === id) return;

        regions[id].neighbors.add(neighborId);
        regions[neighborId].neighbors.add(id);
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
