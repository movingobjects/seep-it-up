import Board from '@/components/Board/index';
import Footer from '@/components/Footer/index';
import Header from '@/components/Header/index';
import {
  COL_COUNT,
  ROW_COUNT,
} from '@/config';
import useGame from '@/hooks/useGame';
import useGameTransition from '@/hooks/useGameTransition';
import style from './index.module.scss';

function App() {
  const game = useGame();
  const {
    grid,
    flooded,
    palette,
    moveCount,
    par,
    streak,
    isComplete,
    isLost,
    floodWith,
  } = game;

  const {
    isBuilding,
    outgoing,
    buildOrder,
    builtCount,
  } = useGameTransition(game);

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
          {outgoing && (
            <div className={style.outgoing}>
              <Board
                flooded={outgoing.flooded}
                grid={outgoing.grid}
                isLost={outgoing.isLost}
                palette={outgoing.palette} />
            </div>
          )}
          <Board
            buildOrder={buildOrder}
            builtCount={builtCount}
            flooded={flooded}
            grid={grid}
            isActive={!isBuilding && !isComplete && !isLost}
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
