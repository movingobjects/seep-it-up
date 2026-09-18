import style from './index.module.scss';

interface StatProps {
  readonly label: string;
  readonly value: number;
}

interface StatsProps {
  readonly moveCount: number;
  readonly par: number;
  readonly isComplete: boolean;
}

function getResultText(moveCount: number, par: number) {
  const diff = moveCount - par;

  if (diff < 0) return `${-diff} under par`;
  if (diff > 0) return `${diff} over par`;
  return 'On par';
}

function Stat({
  label, value,
}: StatProps) {
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
}: StatsProps) {
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
