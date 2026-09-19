import {
  useEffect,
  useEffectEvent,
  useState,
} from 'react';
import Board from '@/components/Board/index';
import Footer from '@/components/Footer/index';
import {
  BUILD_DURATION,
  COL_COUNT,
  LOSE_BLINK_DURATION,
  ORIGIN,
  ROW_COUNT,
  WIN_PAUSE_DURATION,
} from '@/config';
import useGame from '@/hooks/useGame';
import usePalette from '@/hooks/usePalette';
import type {
  Grid,
  Mask,
  Palette,
} from '@/types';
import { createBuildOrder } from '@/utils/grid';
import style from './index.module.scss';
import Header from '../Header';

// The finished board left showing beneath while the next one builds in
interface Build {
  grid: Grid;
  flooded: Mask;
  palette: Palette;
  isLost: boolean;
  order: number[][];
}

const CELL_COUNT = ROW_COUNT * COL_COUNT;

function App() {
  const {
    grid,
    flooded,
    moveCount,
    par,
    streak,
    isComplete,
    isLost,
    floodWith,
    newGame,
  } = useGame();

  const {
    palette,
    shufflePalette,
    promoteColor,
  } = usePalette();

  const [build, setBuild] = useState<Build | null>(null);
  const [builtCount, setBuiltCount] = useState(0);

  const startNextGame = useEffectEvent(() => {
    setBuild({
      grid,
      flooded,
      palette,
      isLost,
      order: createBuildOrder(ROW_COUNT, COL_COUNT),
    });
    setBuiltCount(0);

    // A win carries its final color over to lead the next palette, and
    // seeds the next board's flood with it
    if (isComplete) {
      promoteColor(palette[grid[ORIGIN[0]][ORIGIN[1]]]);
      newGame(0);
    } else {
      shufflePalette();
      newGame();
    }
  });

  // Once a game ends, play out its ending then move on
  useEffect(() => {
    if (!isComplete && !isLost) return undefined;

    const timeout = setTimeout(
      startNextGame,
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

  return (
    <div
      className={style.wrap}
      style={{
        '--col-count': COL_COUNT,
        '--row-count': ROW_COUNT,
      }}>

      <div className={style.game}>
        <Header streak={streak} />
        <div className={style.board}>
          {build && (
            <div className={style.outgoing}>
              <Board
                flooded={build.flooded}
                grid={build.grid}
                isLost={build.isLost}
                palette={build.palette} />
            </div>
          )}
          <Board
            buildOrder={build?.order}
            builtCount={builtCount}
            flooded={flooded}
            grid={grid}
            isActive={!build && !isComplete && !isLost}
            isBlinking={isLost}
            isLost={isLost}
            palette={palette}
            onCellClick={floodWith} />
        </div>
        <Footer
          isLost={isLost}
          moveCount={moveCount}
          par={par} />
      </div>

    </div>
  );
}

export default App;
