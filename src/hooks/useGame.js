import { useReducer } from 'react';
import {
  COL_COUNT,
  COLOR_COUNT,
  ORIGIN,
  ROW_COUNT,
} from '@/config.js';
import {
  createGrid,
  flood,
  getFloodedMask,
  isGridComplete,
} from '@/utils/grid.js';
import calcPar from '@/utils/par.js';

function createGame() {
  const grid = createGrid(ROW_COUNT, COL_COUNT, COLOR_COUNT);

  return {
    grid,
    flooded: getFloodedMask(grid, ORIGIN),
    moveCount: 0,
    par: calcPar(grid, ORIGIN),
  };
}

function reducer(state, action) {
  switch (action.type) {
    case 'flood': {
      const {
        grid, flooded,
      } = state;
      const isSameColor = grid[ORIGIN.row][ORIGIN.col] === action.color;

      if (isSameColor || isGridComplete(grid)) return state;

      const nextGrid = flood(grid, flooded, action.color);

      return {
        ...state,
        grid: nextGrid,
        flooded: getFloodedMask(nextGrid, ORIGIN),
        moveCount: state.moveCount + 1,
      };
    }

    case 'newGame':
      return createGame();

    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

export default function useGame() {
  const [state, dispatch] = useReducer(reducer, null, createGame);

  return {
    ...state,
    isComplete: isGridComplete(state.grid),
    floodWith: (color) => dispatch({
      type: 'flood',
      color,
    }),
    newGame: () => dispatch({ type: 'newGame' }),
  };
}
