import { useReducer } from 'react';
import { ORIGIN } from '@/config';
import type {
  ColorIndex,
  Grid,
  Level,
  Mask,
  Palette,
} from '@/types';
import {
  createBuildOrder,
  createGrid,
  flood,
  getFloodedMask,
  getOriginColor,
  isGridComplete,
} from '@/utils/grid';
import {
  ENDLESS_LEVEL_INDEX,
  getLevel,
  isEndless,
} from '@/utils/levels';
import {
  createPalette,
  promoteColor,
} from '@/utils/palette';
import calcPar from '@/utils/par';

interface GameState {
  levelIndex: number;
  level: Level;
  grid: Grid;
  flooded: Mask;
  // Each cell's place in the order the board builds in
  buildOrder: number[][];
  // The origin's color when the board was dealt, before any flooding
  startColor: ColorIndex;
  palette: Palette;
  moveCount: number;
  par: number;
  streak: number;
}

interface FloodAction {
  type: 'flood';
  color: ColorIndex;
}

interface NextGameAction {
  type: 'nextGame';
}

type GameAction = FloodAction | NextGameAction;

interface GameOptions {
  levelIndex: number;
  level: Level;
  palette: Palette;
  streak: number;
  originColor?: ColorIndex;
}

function createGame({
  levelIndex,
  level,
  palette,
  streak,
  originColor,
}: GameOptions): GameState {
  const {
    rowCount, colCount,
  } = level;
  const grid = createGrid(rowCount, colCount, palette.length);

  if (originColor !== undefined) grid[ORIGIN[0]][ORIGIN[1]] = originColor;

  return {
    levelIndex,
    level,
    grid,
    flooded: getFloodedMask(grid, ORIGIN),
    startColor: getOriginColor(grid),
    buildOrder: createBuildOrder(rowCount, colCount),
    palette,
    moveCount: 0,
    par: calcPar(grid, ORIGIN),
    streak,
  };
}

// Back to the first level with a fresh palette
function createFirstGame(): GameState {
  const level = getLevel(0);

  return createGame({
    levelIndex: 0,
    level,
    palette: createPalette(level.colorCount),
    streak: 0,
  });
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
      const isSameColor = getOriginColor(grid) === action.color;

      if (isSameColor || isGridComplete(grid) || isGameLost(state)) return state;

      const nextGrid = flood(grid, flooded, action.color);
      const nextState = {
        ...state,
        grid: nextGrid,
        flooded: getFloodedMask(nextGrid, ORIGIN),
        moveCount: state.moveCount + 1,
      };

      // The streak only counts wins in endless play
      if (isGridComplete(nextGrid)) return {
        ...nextState,
        streak: isEndless(state.levelIndex) ? state.streak + 1 : state.streak,
      };
      if (isGameLost(nextState)) return {
        ...nextState,
        streak: 0,
      };

      return nextState;
    }

    // A win moves up a level (or on to another endless one), carrying its final color over to lead the next
    // palette and seed the next board's flood. Anything else starts over
    case 'nextGame': {
      if (!isGridComplete(state.grid)) return createFirstGame();

      const levelIndex = Math.min(state.levelIndex + 1, ENDLESS_LEVEL_INDEX);
      const level = getLevel(levelIndex);
      const winColor = state.palette[getOriginColor(state.grid)];
      const palette = promoteColor(state.palette, winColor, level.colorCount);
      // Reaching endless play is itself the first step of the streak
      const isEnteringEndless = !isEndless(state.levelIndex) && isEndless(levelIndex);

      return createGame({
        levelIndex,
        level,
        palette,
        streak: isEnteringEndless ? 1 : state.streak,
        originColor: palette.indexOf(winColor),
      });
    }

    default: {
      const unhandled: never = action;
      throw new Error(`Unknown action: ${JSON.stringify(unhandled)}`);
    }
  }
}

export default function useGame() {
  const [state, dispatch] = useReducer(reducer, null, createFirstGame);

  return {
    ...state,
    isComplete: isGridComplete(state.grid),
    isLost: isGameLost(state),
    floodWith: (color: ColorIndex) => dispatch({
      type: 'flood',
      color,
    }),
    nextGame: () => dispatch({ type: 'nextGame' }),
  };
}
