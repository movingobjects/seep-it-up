import clsx from 'clsx';
import type { CSSProperties } from 'react';
import {
  LOSE_BLINK_INTERVAL,
  LOST_FLOODED_COLOR,
  LOST_UNFLOODED_COLOR,
  ORIGIN,
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
  readonly isLost: boolean;
  readonly isActive?: boolean;
  readonly isBlinking?: boolean;
  // While building in, each cell's place in the build order and how many
  // cells have been built so far
  readonly buildOrder?: number[][] | null;
  readonly builtCount?: number;
  readonly onCellClick?: (color: ColorIndex) => void;
}

function Board({
  grid,
  flooded,
  palette,
  isLost,
  isActive = false,
  isBlinking = false,
  buildOrder = null,
  builtCount = 0,
  onCellClick,
}: Props) {
  const patterns = palette.map(({ shade }) => (
    getCellPattern(shade)
  ));
  const lostPattern = getCellPattern(LOST_FLOODED_COLOR.shade);
  const floodColor = palette[grid[ORIGIN[0]][ORIGIN[1]]].color;

  const getCellStyle = (colorIndex: ColorIndex, isFlooded: boolean): CSSProperties => {
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
    <div
      className={clsx({
        [style.wrap]: true,
        [style.inactive]: !isActive,
      })}
      style={{
        '--blink-color': floodColor,
        '--blink-interval': `${LOSE_BLINK_INTERVAL}ms`,
      }}>
      {grid.map((row, rowIndex) => (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={rowIndex}
          className={style.row}>
          {row.map((colorIndex, colIndex) => {
            const isFlooded = flooded[rowIndex][colIndex];

            return (
              <div
                // eslint-disable-next-line react/no-array-index-key
                key={colIndex}
                className={clsx({
                  [style.cell]: true,
                  [style.blink]: isBlinking && !isFlooded,
                  [style.unbuilt]: !!buildOrder && buildOrder[rowIndex][colIndex] >= builtCount,
                })}
                style={getCellStyle(colorIndex, isFlooded)}
                onClick={isActive ? () => onCellClick?.(colorIndex) : undefined} />
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default Board;
