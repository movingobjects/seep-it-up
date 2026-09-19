import clsx from 'clsx';
import Dice from '@/components/Dice/index';
import { LEVELS } from '@/config';
import type {
  DiceRoll,
  Level,
  PaletteColor,
} from '@/types';
import { isEndless } from '@/utils/levels';
import style from './index.module.scss';

interface Props {
  readonly levelIndex: number;
  readonly level: Level;
  readonly dieColor: PaletteColor;
  readonly buildProgress: number | null;
  readonly diceRolls: DiceRoll[];
}

function Header({
  levelIndex,
  level,
  dieColor,
  buildProgress,
  diceRolls,
}: Props) {
  return (
    <div className={style.wrap}>
      <h1>
        Seep It Up!
      </h1>
      {isEndless(levelIndex) ? (
        <Dice
          buildProgress={buildProgress}
          color={dieColor}
          level={level}
          rolls={diceRolls} />
      ) : (
        // One circle per level, filled up to the current one
        <span
          aria-label={level.label}
          className={style.levels}
          role="img">
          {LEVELS.map(({ label }, index) => (
            <span
              key={label}
              className={clsx({
                [style.level]: true,
                [style.reached]: index <= levelIndex,
              })} />
          ))}
        </span>
      )}
    </div>
  );
}

export default Header;
