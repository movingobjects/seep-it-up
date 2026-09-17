/* eslint-disable react/no-array-index-key */
import {
  Dices,
  RefreshCw,
  Shuffle,
} from 'lucide-react';
import {
  useEffect,
  useState,
} from 'react';
import calcPar from '@/utils/par.js';
import style from './index.module.scss';

// Game constants
const COL_COUNT = 35;
const ROW_COUNT = 25;
const COLOR_COUNT = 4;

// The cell the flood spreads out from; any cell on the board works
const ORIGIN = {
  row: 0,
  col: 0,
};
const PADDING = '40px';
const CONTROLS_HEIGHT = '56px';
const CONTROLS_GAP = '10px';

// Only colors darker than this get a light icon; keeping it low favors
// the dark icon, which reads better across most of the palette
const LIGHT_ICON_THRESHOLD = 0.45;

// Color palette
const COLORS = [
  '#1C4966',
  '#7BCFDE',
  '#005FB2',
  '#629CDB',
  '#3D996D',
  '#C1DD6D',
  '#FF683E',
  '#EA476A',
  '#FF64A2',
  '#FFCA51',
  '#FFFBBC',
];

// Select random colors from the palette
function getRandomPalette() {
  const shuffled = [...COLORS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, COLOR_COUNT);
}

// Step a swatch to the next color in the palette list, skipping any
// color already in play so the game always has distinct colors
function getNextColor(currentColor, palette) {
  const startIndex = COLORS.indexOf(currentColor);

  for (let step = 1; step <= COLORS.length; step++) {
    const color = COLORS[(startIndex + step) % COLORS.length];
    if (!palette.includes(color)) return color;
  }

  return currentColor;
}

// Pick black or white for whatever reads best on a given swatch
function getContrastColor(hexColor) {
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  const luminance = ((0.299 * r) + (0.587 * g) + (0.114 * b)) / 255;

  return luminance > LIGHT_ICON_THRESHOLD ? '#000000' : '#FFFFFF';
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

  dfs(ORIGIN.row, ORIGIN.col);
  return flooded;
}

function getIsGridComplete(grid) {
  const color = grid[ORIGIN.row][ORIGIN.col];
  return grid.every((row) => row.every((cell) => cell === color));
}

function App() {
  const [grid, setGrid] = useState(createGrid);
  const [par, setPar] = useState(() => calcPar(grid, ORIGIN));
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

    const currentColor = grid[ORIGIN.row][ORIGIN.col];

    if (currentColor === clickedColorIndex) return;

    const floodedCells = getFloodedRegion(grid, currentColor);

    const newGrid = grid.map((row) => [...row]);
    floodedCells.forEach(([row, col]) => {
      newGrid[row][col] = clickedColorIndex;
    });

    setGrid(newGrid);
    setMoveCount(moveCount + 1);
  };

  const onShuffleColorsClick = () => {
    setGamePalette(getRandomPalette());
  };

  const onSwatchClick = (swatchIndex) => {
    setGamePalette(gamePalette.map((color, index) => (
      index === swatchIndex ? getNextColor(color, gamePalette) : color
    )));
  };

  const onNewGameClick = () => {
    const newGrid = createGrid();

    setGrid(newGrid);
    setPar(calcPar(newGrid, ORIGIN));
    setIsComplete(false);
    setMoveCount(0);
  };

  return (
    <div
      className={style.wrap}
      style={{
        '--padding': PADDING,
        '--controls-height': CONTROLS_HEIGHT,
        '--controls-gap': CONTROLS_GAP,
        '--grid-aspect': COL_COUNT / ROW_COUNT,
      }}>

      <div className={style.game}>

        <div className={style.grid}>
          {grid.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className={style.row}
              style={{ height: `${100 / ROW_COUNT}%` }}>
              {row.map((colorIndex, colIndex) => {
                const isOrigin = rowIndex === ORIGIN.row && colIndex === ORIGIN.col;

                return (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className={isOrigin ? `${style.cell} ${style.originCell}` : style.cell}
                    style={{
                      backgroundColor: gamePalette[colorIndex],
                      width: `${100 / COL_COUNT}%`,
                    }}
                    onClick={() => onCellClick(colorIndex)}>
                    {isOrigin && <div className={style.originDot} />}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div className={style.controls}>

          <div className={style.controlsLeft}>
            <button
              aria-label="New game"
              className={style.iconButton}
              title="New game"
              type="button"
              onClick={onNewGameClick}>
              <Dices size={20} />
            </button>
            <div className={style.swatches}>
              {gamePalette.map((color, index) => (
                <button
                  key={index}
                  aria-label="Change color"
                  className={style.swatch}
                  style={{
                    backgroundColor: color,
                    color: getContrastColor(color),
                  }}
                  title="Change color"
                  type="button"
                  onClick={() => onSwatchClick(index)}>
                  <RefreshCw className={style.swatchIcon} size={12} />
                </button>
              ))}
              <button
                aria-label="Shuffle colors"
                className={style.plainButton}
                title="Shuffle colors"
                type="button"
                onClick={onShuffleColorsClick}>
                <Shuffle size={16} />
              </button>
            </div>
          </div>

          <div className={style.stats}>
            <div className={style.stat}>
              <p className={style.statLabel}>Moves</p>
              <p className={style.statValue}>{moveCount}</p>
            </div>
            <div className={style.stat}>
              <p className={style.statLabel}>Par</p>
              <p className={style.statValue}>{par}</p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default App;
