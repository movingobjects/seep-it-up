import {
  useEffect,
  useEffectEvent,
  useState,
} from 'react';
import {
  BUILD_DURATION,
  LOSE_BLINK_DURATION,
  WIN_PAUSE_DURATION,
} from '@/config';
import type {
  BoardState,
  DiceRoll,
} from '@/types';
import { createDiceRoll } from '@/utils/dice';

interface Game extends BoardState {
  isComplete: boolean;
  nextGame: () => void;
}

// Plays out the end of each game, then builds the next board in over it
export default function useGameTransition({
  grid,
  flooded,
  palette,
  isComplete,
  isLost,
  nextGame,
}: Game) {
  // The finished board, left showing beneath while the next one builds in
  const [outgoing, setOutgoing] = useState<BoardState | null>(null);
  // How far through building in the next board is, from 0 to 1
  const [buildProgress, setBuildProgress] = useState(0);
  // How each die tumbles while the board builds in
  const [diceRolls, setDiceRolls] = useState<DiceRoll[]>([]);

  const startBuild = useEffectEvent(() => {
    setOutgoing({
      grid,
      flooded,
      palette,
      isLost,
    });
    setBuildProgress(0);
    setDiceRolls([
      createDiceRoll(),
      createDiceRoll(),
    ]);
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

  useEffect(() => {
    if (!outgoing) return undefined;

    const startTime = performance.now();
    let frame: number;

    const tick = (now: number) => {
      const progress = (now - startTime) / BUILD_DURATION;

      if (progress >= 1) {
        setOutgoing(null);
        return;
      }

      setBuildProgress(progress);
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [outgoing]);

  return {
    outgoing,
    buildProgress: outgoing ? buildProgress : null,
    diceRolls,
  };
}
