import { useReducer } from 'react';
import {
  COL_COUNT,
  COLOR_COUNT,
  ORIGIN,
  ROW_COUNT,
} from '@/config';
import type {
  ColorIndex,
  FloodOrder,
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
  floodOrder: FloodOrder;
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

// Stamp newly flooded cells with the move that flooded them
function updateFloodOrder(
  floodOrder: FloodOrder,
  flooded: Mask,
  move: number,
): FloodOrder {
  return floodOrder.map((row, r) => row.map((step, c) => (
    (step === -1 && flooded[r][c]) ? move : step
  )));
}

function createGame(): GameState {
  const grid = createGrid(ROW_COUNT, COL_COUNT, COLOR_COUNT);
  const flooded = getFloodedMask(grid, ORIGIN);

  return {
    grid,
    flooded,
    floodOrder: flooded.map((row) => row.map((isFlooded) => (isFlooded ? 0 : -1))),
    moveCount: 0,
    par: calcPar(grid, ORIGIN),
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
        grid, flooded, floodOrder, moveCount,
      } = state;
      const isSameColor = grid[ORIGIN[0]][ORIGIN[1]] === action.color;

      if (isSameColor || isGridComplete(grid) || isGameLost(state)) return state;

      const nextGrid = flood(grid, flooded, action.color);
      const nextFlooded = getFloodedMask(nextGrid, ORIGIN);
      const nextMoveCount = moveCount + 1;

      return {
        ...state,
        grid: nextGrid,
        flooded: nextFlooded,
        floodOrder: updateFloodOrder(floodOrder, nextFlooded, nextMoveCount),
        moveCount: nextMoveCount,
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
    isLost: isGameLost(state),
    floodWith: (color: ColorIndex) => dispatch({
      type: 'flood',
      color,
    }),
    newGame: () => dispatch({ type: 'newGame' }),
  };
}
