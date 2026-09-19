import clsx from 'clsx';
import {
  LOST_FLOODED_COLOR,
  LOST_UNFLOODED_COLOR,
} from '@/config';
import type {
  ColorIndex,
  Grid,
  Mask,
  Palette,
} from '@/types';
import { getCellPattern } from '@/utils/pattern';
import style from './index.module.scss';

interface Props {
  readonly grid: Grid;
  readonly flooded: Mask;
  readonly palette: Palette;
  readonly isComplete: boolean;
  readonly isLost: boolean;
  readonly onCellClick: (color: ColorIndex) => void;
}

function Board({
  grid,
  flooded,
  palette,
  isComplete,
  isLost,
  onCellClick,
}: Props) {
  const patterns = palette.map(({ shade }) => (
    getCellPattern(shade)
  ));
  const lostPattern = getCellPattern(LOST_FLOODED_COLOR.shade);

  const getCellStyle = (colorIndex: ColorIndex, isFlooded: boolean) => {
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
    };
  };

  return (
    <div className={clsx({
      [style.wrap]: true,
      [style.inactive]: (isComplete || isLost),
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
              style={getCellStyle(colorIndex, flooded[rowIndex][colIndex])}
              onClick={() => onCellClick(colorIndex)} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
