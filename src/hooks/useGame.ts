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
  streak: number;
}

interface FloodAction {
  type: 'flood';
  color: ColorIndex;
}

interface NewGameAction {
  type: 'newGame';
  originColor?: ColorIndex;
}

type GameAction = FloodAction | NewGameAction;

function createGame(streak = 0, originColor?: ColorIndex): GameState {
  const grid = createGrid(ROW_COUNT, COL_COUNT, COLOR_COUNT);

  if (originColor !== undefined) grid[ORIGIN[0]][ORIGIN[1]] = originColor;

  return {
    grid,
    flooded: getFloodedMask(grid, ORIGIN),
    moveCount: 0,
    par: calcPar(grid, ORIGIN),
    streak,
  };
}

// Out of moves with cells still left to flood
function isGameLost({
  grid, moveCount, par,
}: GameState): boolean {
  return moveCount >= par && !isGridComplete(grid);
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

      if (isSameColor || isGridComplete(grid) || isGameLost(state)) return state;

      const nextGrid = flood(grid, flooded, action.color);
      const nextState = {
        ...state,
        grid: nextGrid,
        flooded: getFloodedMask(nextGrid, ORIGIN),
        moveCount: state.moveCount + 1,
      };

      if (isGridComplete(nextGrid)) return {
        ...nextState,
        streak: state.streak + 1,
      };
      if (isGameLost(nextState)) return {
        ...nextState,
        streak: 0,
      };

      return nextState;
    }

    case 'newGame':
      return createGame(state.streak, action.originColor);

    default: {
      const unhandled: never = action;
      throw new Error(`Unknown action: ${JSON.stringify(unhandled)}`);
    }
  }
}

export default function useGame() {
  const [state, dispatch] = useReducer(reducer, 0, createGame);

  return {
    ...state,
    isComplete: isGridComplete(state.grid),
    isLost: isGameLost(state),
    floodWith: (color: ColorIndex) => dispatch({
      type: 'flood',
      color,
    }),
    newGame: (originColor?: ColorIndex) => dispatch({
      type: 'newGame',
      originColor,
    }),
  };
}
