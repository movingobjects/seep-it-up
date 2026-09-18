import clsx from 'clsx';
import type { CSSProperties } from 'react';
import {
  LOST_FLOODED_COLOR,
  LOST_UNFLOODED_COLOR,
} from '@/config';
import type {
  ColorIndex,
  FloodOrder,
  Grid,
  Mask,
  Palette,
} from '@/types';
import { getCellPattern } from '@/utils/pattern';
import {
  getHeatColors,
  getRevealDelay,
} from '@/utils/winSequence';
import style from './index.module.scss';

interface BoardProps {
  readonly grid: Grid;
  readonly flooded: Mask;
  readonly floodOrder: FloodOrder;
  readonly moveCount: number;
  readonly palette: Palette;
  readonly isComplete: boolean;
  readonly isLost: boolean;
  readonly onCellClick: (color: ColorIndex) => void;
}

function Board({
  grid,
  flooded,
  floodOrder,
  moveCount,
  palette,
  isComplete,
  isLost,
  onCellClick,
}: BoardProps) {
  const patterns = palette.map(({ shade }) => (
    getCellPattern(shade)
  ));
  const lostPattern = getCellPattern(LOST_FLOODED_COLOR.shade);
  const heatColors = isComplete ? getHeatColors(moveCount) : [];
  const heatPatterns = heatColors.map(({ shade }) => getCellPattern(shade));

  // Colors the cell is revealed in as the moves play back
  const getWinStyle = (step: number): CSSProperties => ({
    '--heat-color': heatColors[step].color,
    '--heat-pattern': heatPatterns[step],
    '--reveal-delay': `${getRevealDelay(step, moveCount)}ms`,
  });

  const getCellStyle = (
    colorIndex: ColorIndex,
    isFlooded: boolean,
    step: number,
  ): CSSProperties => {
    if (isLost) {
      return isFlooded
        ? {
          backgroundColor: LOST_FLOODED_COLOR.color,
          backgroundImage: lostPattern,
        }
        : { backgroundColor: LOST_UNFLOODED_COLOR };
    }

    return {
      backgroundColor: palette[colorIndex].color,
      backgroundImage: isFlooded ? patterns[colorIndex] : undefined,
      ...(isComplete && getWinStyle(step)),
    };
  };

  return (
    <div className={clsx({
      [style.wrap]: true,
      [style.inactive]: (isComplete || isLost),
      [style.won]: isComplete,
    })}>
      {grid.map((row, rowIndex) => (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={rowIndex}
          className={style.row}>
          {row.map((colorIndex, colIndex) => (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={colIndex}
              className={style.cell}
              style={getCellStyle(
                colorIndex,
                flooded[rowIndex][colIndex],
                floodOrder[rowIndex][colIndex],
              )}
              onClick={() => onCellClick(colorIndex)} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
