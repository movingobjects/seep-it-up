import style from './index.module.scss';

function getResultText(moveCount, par) {
  const diff = moveCount - par;

  if (diff < 0) return `${-diff} under par`;
  if (diff > 0) return `${diff} over par`;
  return 'On par';
}

function Stat({
  label, value,
}) {
  return (
    <div className={style.stat}>
      <p className={style.statLabel}>{label}</p>
      <p className={style.statValue}>{value}</p>
    </div>
  );
}

function Stats({
  moveCount,
  par,
  isComplete,
}) {
  return (
    <div className={style.stats}>
      {isComplete && (
        <p className={style.result}>
          Solved ·
          {' '}
          {getResultText(moveCount, par)}
        </p>
      )}
      <Stat label="Moves" value={moveCount} />
      <Stat label="Par" value={par} />
    </div>
  );
}

export default Stats;
