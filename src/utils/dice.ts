import {
  int,
  item,
  num,
} from '@movingobjects/utils/random';
import {
  COLORS,
  DICE_FACE_MAX_DURATION,
  DICE_FACE_MIN_DURATION,
  DICE_ROLL_MAX_FACES,
  DICE_ROLL_MIN_FACES,
} from '@/config';
import type { DiceRoll } from '@/types';
import { isBrightEnough } from '@/utils/color';

const ROLL_COLORS = COLORS.filter(isBrightEnough);

// Any face but the one showing, so every change reads as a tumble
function pickNextFace(current?: number): number {
  if (current === undefined) return int(1, 6);

  const face = int(1, 5);
  return (face >= current) ? face + 1 : face;
}

export function createDiceRoll(): DiceRoll {
  const roll: DiceRoll = [];
  let endsAt = 0;

  for (let i = int(DICE_ROLL_MIN_FACES, DICE_ROLL_MAX_FACES); i > 0; i--) {
    endsAt += num(DICE_FACE_MIN_DURATION, DICE_FACE_MAX_DURATION);
    roll.push({
      face: pickNextFace(roll.at(-1)?.face),
      color: item(ROLL_COLORS).color,
      endsAt,
    });
  }

  return roll;
}
