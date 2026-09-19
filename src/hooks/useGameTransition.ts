import {
  useEffect,
  useEffectEvent,
  useState,
} from 'react';
import {
  BUILD_DURATION,
  COL_COUNT,
  LOSE_BLINK_DURATION,
  ROW_COUNT,
  WIN_PAUSE_DURATION,
} from '@/config';
import type { BoardState } from '@/types';
import { createBuildOrder } from '@/utils/grid';

interface Game extends BoardState {
  isComplete: boolean;
  nextGame: () => void;
}

interface Build {
  // The finished board, left showing beneath while the next one builds in
  outgoing: BoardState;
  order: number[][];
}

const CELL_COUNT = ROW_COUNT * COL_COUNT;

// Plays out the end of each game, then builds the next board in over it
export default function useGameTransition({
  grid,
  flooded,
  palette,
  isComplete,
  isLost,
  nextGame,
}: Game) {
  const [build, setBuild] = useState<Build | null>(null);
  const [builtCount, setBuiltCount] = useState(0);

  const startBuild = useEffectEvent(() => {
    setBuild({
      outgoing: {
        grid,
        flooded,
        palette,
        isLost,
      },
      order: createBuildOrder(ROW_COUNT, COL_COUNT),
    });
    setBuiltCount(0);
    nextGame();
  });

  useEffect(() => {
    if (!isComplete && !isLost) return undefined;

    const timeout = setTimeout(
      startBuild,
      isLost ? LOSE_BLINK_DURATION : WIN_PAUSE_DURATION,
    );

    return () => clearTimeout(timeout);
  }, [isComplete, isLost]);

  // Switch cells over to the new board one at a time. Frames come slower
  // than cells are due, so each frame catches up on however many are owed
  useEffect(() => {
    if (!build) return undefined;

    const startTime = performance.now();
    let frame: number;

    const tick = (now: number) => {
      const count = Math.floor(((now - startTime) / BUILD_DURATION) * CELL_COUNT);

      if (count >= CELL_COUNT) {
        setBuild(null);
        return;
      }

      setBuiltCount(count);
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [build]);

  return {
    isBuilding: !!build,
    outgoing: build?.outgoing ?? null,
    buildOrder: build?.order ?? null,
    builtCount,
  };
}
