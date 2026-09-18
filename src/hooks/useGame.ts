import { useReducer } from 'react';
import {
  COL_COUNT,
  COLOR_COUNT,
  ORIGIN,
  ROW_COUNT,
} from '@/config';
import type {
  ColorIndex,
  Grid,
  Mask,
} from '@/types';
import {
  createGrid,
  flood,
  getFloodedMask,
  isGridComplete,
} from '@/utils/grid';
import calcPar from '@/utils/par';

interface GameState {
  grid: Grid;
  flooded: Mask;
  moveCount: number;
  par: number;
}

interface FloodAction {
  type: 'flood';
  color: ColorIndex;
}

interface NewGameAction {
  type: 'newGame';
}

type GameAction = FloodAction | NewGameAction;

function createGame(): GameState {
  const grid = createGrid(ROW_COUNT, COL_COUNT, COLOR_COUNT);

  return {
    grid,
    flooded: getFloodedMask(grid, ORIGIN),
    moveCount: 0,
    par: calcPar(grid, ORIGIN),
  };
}

function reducer(
  state: GameState,
  action: GameAction,
): GameState {
  switch (action.type) {
    case 'flood': {
      const {
        grid, flooded,
      } = state;
      const isSameColor = grid[ORIGIN[0]][ORIGIN[1]] === action.color;

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

    default: {
      const unhandled: never = action;
      throw new Error(`Unknown action: ${JSON.stringify(unhandled)}`);
    }
  }
}

export default function useGame() {
  const [state, dispatch] = useReducer(reducer, null, createGame);

  return {
    ...state,
    isComplete: isGridComplete(state.grid),
    floodWith: (color: ColorIndex) => dispatch({
      type: 'flood',
      color,
    }),
    newGame: () => dispatch({ type: 'newGame' }),
  };
}
