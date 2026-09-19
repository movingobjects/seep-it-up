import { LuFlame } from 'react-icons/lu';
import { TbSkull } from 'react-icons/tb';
import style from './index.module.scss';

interface Props {
  readonly moveCount: number;
  readonly par: number;
  readonly isLost: boolean;
  readonly streak: number;
}

function Footer({
  moveCount,
  par,
  isLost,
  streak,
}: Props) {
  return (
    <div className={style.footer}>
      <div className={style.moves}>
        {isLost ? (
          <TbSkull
            aria-label="Out of moves"
            className={style.lost}
            role="img" />
        ) : (
          <span className={style.moveCount}>
            {moveCount}
          </span>
        )}
        <span className={style.par}>
          /
          {par}
        </span>
      </div>
      {streak > 0 && (
        // A lone flame for the first win, then the count beside it
        <span
          aria-label={`Streak of ${streak}`}
          className={style.streak}
          role="img">
          <LuFlame className={style.flame} />
          {streak > 1 && streak}
        </span>
      )}
    </div>
  );
}

export default Footer;
