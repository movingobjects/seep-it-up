import { Dices } from 'lucide-react';
import IconButton from '@/components/IconButton/index.jsx';
import PalettePicker from '@/components/PalettePicker/index.jsx';
import Stats from '@/components/Stats/index.jsx';
import style from './index.module.scss';

function Controls({
  palette,
  moveCount,
  par,
  isComplete,
  onNewGame,
  onSwatchClick,
  onShuffle,
}) {
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
