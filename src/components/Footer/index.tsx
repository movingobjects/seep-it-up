import { LuFlame } from 'react-icons/lu';
import { TbSkull } from 'react-icons/tb';
import type {
  ColorIndex,
  Palette,
} from '@/types';
import style from './index.module.scss';

interface Props {
  readonly moveCount: number;
  readonly par: number;
  readonly isLost: boolean;
  readonly streak: number;
  readonly palette: Palette;
  readonly isActive: boolean;
  readonly onColorClick: (color: ColorIndex) => void;
}

function Footer({
  moveCount,
  par,
  isLost,
  streak,
  palette,
  isActive,
  onColorClick,
}: Props) {
  return (
    <div className={style.footer}>
      {/* Only shown on small screens, where cells are too small to tap */}
      <div className={style.swatches}>
        {palette.map(({ color }, colorIndex) => (
          <button
            // eslint-disable-next-line react/no-array-index-key
            key={colorIndex}
            aria-label={`Flood with color ${colorIndex + 1}`}
            className={style.swatch}
            disabled={!isActive}
            style={{ backgroundColor: color }}
            type="button"
            onClick={() => onColorClick(colorIndex)} />
        ))}
      </div>
      <div className={style.stats}>
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
    </div>
  );
}

export default Footer;
