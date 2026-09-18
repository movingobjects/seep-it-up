import { Dices } from 'lucide-react';
import IconButton from '@/components/IconButton/index';
import PalettePicker from '@/components/PalettePicker/index';
import Stats from '@/components/Stats/index';
import type { Palette } from '@/types';
import style from './index.module.scss';

interface ControlsProps {
  readonly palette: Palette;
  readonly moveCount: number;
  readonly par: number;
  readonly isComplete: boolean;
  readonly onNewGame: () => void;
  readonly onSwatchClick: (index: number) => void;
  readonly onShuffle: () => void;
}

function Controls({
  palette,
  moveCount,
  par,
  isComplete,
  onNewGame,
  onSwatchClick,
  onShuffle,
}: ControlsProps) {
  return (
    <div className={style.controls}>

      <div className={style.controlsLeft}>
        <IconButton
          icon={Dices}
          label="New game"
          onClick={onNewGame} />
        <PalettePicker
          palette={palette}
          onShuffle={onShuffle}
          onSwatchClick={onSwatchClick} />
      </div>

      <Stats
        isComplete={isComplete}
        moveCount={moveCount}
        par={par} />

    </div>
  );
}

export default Controls;
