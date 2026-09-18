import Board from '@/components/Board/index.jsx';
import Controls from '@/components/Controls/index.jsx';
import {
  COL_COUNT,
  ROW_COUNT,
} from '@/config.js';
import useGame from '@/hooks/useGame.js';
import usePalette from '@/hooks/usePalette.js';
import style from './index.module.scss';

function App() {
  const {
    grid,
    flooded,
    moveCount,
    par,
    isComplete,
    floodWith,
    newGame,
  } = useGame();

  const {
    palette,
    shufflePalette,
    cycleSwatch,
  } = usePalette();

  return (
    <div
      className={style.wrap}
      style={{
        '--col-count': COL_COUNT,
        '--row-count': ROW_COUNT,
      }}>

      <div className={style.game}>
        <Board
          flooded={flooded}
          grid={grid}
          isComplete={isComplete}
          palette={palette}
          onCellClick={floodWith} />
        <Controls
          isComplete={isComplete}
          moveCount={moveCount}
          palette={palette}
          par={par}
          onNewGame={newGame}
          onShuffle={shufflePalette}
          onSwatchClick={cycleSwatch} />
      </div>

    </div>
  );
}

export default App;
