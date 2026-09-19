import clsx from 'clsx';
import { BUILD_DURATION } from '@/config';
import type {
  DiceRoll,
  Level,
  PaletteColor,
} from '@/types';
import { getEndlessSizeIndex } from '@/utils/levels';
import Die from './Die/index';
import style from './index.module.scss';

interface Props {
  readonly level: Level;
  readonly color: PaletteColor;
  // While the board builds in, how far through it is, from 0 to 1
  readonly buildProgress: number | null;
  // How each die, size then colors, tumbles while the board builds in
  readonly rolls: DiceRoll[];
}

// One die for the board's size and one for its number of colors, which
// tumble through random faces while the board builds in, then land
function Dice({
  level,
  color,
  buildProgress,
  rolls,
}: Props) {
  const elapsed = (buildProgress ?? 1) * BUILD_DURATION;
  const [sizeTumble, colorTumble] = rolls.map((roll) => (
    (buildProgress === null) ? undefined : roll.find(({ endsAt }) => elapsed < endsAt)
  ));
  const size = getEndlessSizeIndex(level) + 1;

  return (
    <span className={style.dice}>
      <Die
        className={clsx({
          [style.die]: true,
          [style.rolling]: !!sizeTumble,
        })}
        label={`Board size ${size}`}
        value={sizeTumble?.face ?? size} />
      <Die
        className={style.die}
        color={colorTumble?.color ?? color.color}
        label={`${level.colorCount} colors`}
        value={colorTumble?.face ?? level.colorCount} />
    </span>
  );
}

export default Dice;
