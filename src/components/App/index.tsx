import Board from '@/components/Board/index';
import Footer from '@/components/Footer/index';
import {
  COL_COUNT,
  ROW_COUNT,
} from '@/config';
import useGame from '@/hooks/useGame';
import usePalette from '@/hooks/usePalette';
import style from './index.module.scss';

function App() {
  const {
    grid,
    flooded,
    moveCount,
    par,
    isComplete,
    floodWith,
  } = useGame();

  const { palette } = usePalette();

  return (
    <div
      className={style.wrap}
      style={{
        '--col-count': COL_COUNT,
        '--row-count': ROW_COUNT,
      }}>

      <div className={style.game}>
        <h1 className={style.title}>Seep It Up!</h1>
        <Board
          flooded={flooded}
          grid={grid}
          isComplete={isComplete}
          palette={palette}
          onCellClick={floodWith} />
        <Footer
          moveCount={moveCount}
          par={par} />
      </div>

    </div>
  );
}

export default App;
