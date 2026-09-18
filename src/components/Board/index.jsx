import style from './index.module.scss';

function Board({
  grid,
  flooded,
  palette,
  isComplete,
  onCellClick,
}) {
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
              style={{ backgroundColor: palette[colorIndex] }}
              onClick={() => onCellClick(colorIndex)}>
              {flooded[rowIndex][colIndex] && <div className={style.scrim} />}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
