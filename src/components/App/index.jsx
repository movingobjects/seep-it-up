import {
  useEffect,
  useState,
} from 'react';
import style from './index.module.scss';

// Game constants
const COL_COUNT = 40;
const ROW_COUNT = 30;
const COLOR_COUNT = 4;

// Color palette
const COLORS = [
  "#1C4966",
  "#7BCFDE",
  "#005FB2",
  "#629CDB",
  "#3D996D",
  "#C1DD6D",
  "#FF683E",
  "#EA476A",
  "#FF64A2",
  "#FFCA51",
  "#FFFBBC",
];

// Select random colors from the palette
function getRandomPalette() {
  const shuffled = [...COLORS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, COLOR_COUNT);
}

// Initialize a random grid
function createGrid() {
  return Array(ROW_COUNT).fill(null)
    .map(() => Array(COL_COUNT).fill(null)
      .map(() => Math.floor(Math.random() * COLOR_COUNT)));
}

function getFloodedRegion(grid, startColor) {
  const visited = Array(ROW_COUNT).fill(null)
    .map(() => Array(COL_COUNT).fill(false));
  const flooded = [];

  function dfs(row, col) {
    if (row < 0 || row >= ROW_COUNT || col < 0 || col >= COL_COUNT) return;
    if (visited[row][col]) return;
    if (grid[row][col] !== startColor) return;

    visited[row][col] = true;
    flooded.push([row, col]);

    dfs(row - 1, col); // Up
    dfs(row + 1, col); // Down
    dfs(row, col - 1); // Left
    dfs(row, col + 1); // Right
  }

  dfs(0, 0);
  return flooded;
}

function getIsGridComplete(grid) {
  const color = grid[0][0];
  return grid.every((row) => row.every((cell) => cell === color));
}

function App() {
  const [grid, setGrid] = useState(createGrid);
  const [isComplete, setIsComplete] = useState(false);
  const [gamePalette, setGamePalette] = useState(getRandomPalette());
  const [moveCount, setMoveCount] = useState(0);

  useEffect(() => {
    if (getIsGridComplete(grid)) {
      setIsComplete(true);
    }
  }, [grid]);

  const onCellClick = (clickedColorIndex) => {
    if (isComplete) return;

    const currentColor = grid[0][0];

    if (currentColor === clickedColorIndex) return;

    const floodedCells = getFloodedRegion(grid, currentColor);

    const newGrid = grid.map((row) => [...row]);
    floodedCells.forEach(([row, col]) => {
      newGrid[row][col] = clickedColorIndex;
    });

    setGrid(newGrid);
    setMoveCount(moveCount + 1);
  };

  const onResetClick = () => {
    setGamePalette(getRandomPalette());
    setGrid(createGrid());
    setIsComplete(false);
    setMoveCount(0);
  };

  return (
    <div className={style.wrap}>

      <div className={style.controls}>
        <button
          className={style.reset}
          type="button"
          onClick={onResetClick}>
          Reset
        </button>
        <p className={style.moveCount}>{moveCount}</p>
      </div>

      <div className={style.grid}>
        {grid.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={style.row}
            style={{
              height: `${100 / ROW_COUNT}%`,
            }}>
            {row.map((colorIndex, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={style.cell}
                style={{
                  backgroundColor: gamePalette[colorIndex],
                  width: `${100 / COL_COUNT}%`
                }}
                onClick={() => onCellClick(colorIndex)} />
            ))}
          </div>
        ))}
      </div>

    </div>
  );
}

export default App;