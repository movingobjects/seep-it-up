import type {
  ColorIndex,
  Grid,
  Mask,
  Palette,
} from '@/types';
import { getCellPattern } from '@/utils/pattern';
import style from './index.module.scss';

interface BoardProps {
  readonly grid: Grid;
  readonly flooded: Mask;
  readonly palette: Palette;
  readonly isComplete: boolean;
  readonly onCellClick: (color: ColorIndex) => void;
}

function Board({
  grid,
  flooded,
  palette,
  isComplete,
  onCellClick,
}: BoardProps) {
  const patterns = palette.map(({ shade }) => (
    getCellPattern(shade)
  ));

  return (
    <div className={`${style.grid} ${isComplete ? style.complete : ''}`}>
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
              style={{
                backgroundColor: palette[colorIndex].color,
                backgroundImage: flooded[rowIndex][colIndex] ? patterns[colorIndex] : undefined,
              }}
              onClick={() => onCellClick(colorIndex)} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
