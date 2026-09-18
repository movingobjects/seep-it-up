import Board from '@/components/Board/index';
import Footer from '@/components/Footer/index';
import RetryButton from '@/components/RetryButton/index';
import {
  COL_COUNT,
  ROW_COUNT,
} from '@/config';
import useGame from '@/hooks/useGame';
import usePalette from '@/hooks/usePalette';
import { getWinDuration } from '@/utils/winSequence';
import style from './index.module.scss';
import Header from '../Header';

function App() {
  const {
    grid,
    flooded,
    floodOrder,
    moveCount,
    par,
    isComplete,
    isLost,
    floodWith,
    newGame,
  } = useGame();

  const {
    palette,
    shufflePalette,
  } = usePalette();

  const restart = () => {
    newGame();
    shufflePalette();
  };

  return (
    <div
      className={style.wrap}
      style={{
        '--col-count': COL_COUNT,
        '--row-count': ROW_COUNT,
      }}>

      <div className={style.game}>
        <Header />
        <div className={style.board}>
          <Board
            flooded={flooded}
            floodOrder={floodOrder}
            grid={grid}
            isComplete={isComplete}
            isLost={isLost}
            moveCount={moveCount}
            palette={palette}
            onCellClick={floodWith} />
          {isLost && <RetryButton onClick={restart} />}
          {isComplete && (
            <RetryButton
              delay={getWinDuration(moveCount)}
              onClick={restart} />
          )}
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
