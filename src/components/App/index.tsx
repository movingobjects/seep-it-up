import Board from '@/components/Board/index';
import Footer from '@/components/Footer/index';
import Header from '@/components/Header/index';
import useGame from '@/hooks/useGame';
import useGameTransition from '@/hooks/useGameTransition';
import { pickMidtoneColor } from '@/utils/color';
import {
  MAX_COL_COUNT,
  MAX_ROW_COUNT,
} from '@/utils/levels';
import style from './index.module.scss';

function App() {
  const game = useGame();
  const {
    levelIndex,
    level,
    grid,
    flooded,
    buildOrder,
    palette,
    startColor,
    moveCount,
    par,
    streak,
    isComplete,
    isLost,
    floodWith,
  } = game;

  const {
    outgoing,
    buildProgress,
    diceRolls,
  } = useGameTransition(game);

  return (
    <div
      className={style.wrap}
      style={{
        '--col-count': MAX_COL_COUNT,
        '--row-count': MAX_ROW_COUNT,
      }}>

      <div className={style.game}>
        <Header
          buildProgress={buildProgress}
          diceRolls={diceRolls}
          dieColor={pickMidtoneColor(palette[startColor], palette)}
          level={level}
          levelIndex={levelIndex} />
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
            buildProgress={buildProgress}
            flooded={flooded}
            grid={grid}
            isActive={!outgoing && !isComplete && !isLost}
            isBlinking={isLost}
            isLost={isLost}
            palette={palette}
            onCellClick={floodWith} />
        </div>
        <Footer
          isLost={isLost}
          moveCount={moveCount}
          par={par}
          streak={streak} />
      </div>

    </div>
  );
}

export default App;
