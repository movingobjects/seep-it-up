import {
  RefreshCw,
  Shuffle,
} from 'lucide-react';
import IconButton from '@/components/IconButton/index';
import type { Palette } from '@/types';
import { getContrastingColor } from '@/utils/color';
import style from './index.module.scss';

interface PalettePickerProps {
  readonly palette: Palette;
  readonly onSwatchClick: (index: number) => void;
  readonly onShuffle: () => void;
}

function PalettePicker({
  palette,
  onSwatchClick,
  onShuffle,
}: PalettePickerProps) {
  return (
    <div className={style.swatches}>
      {palette.map(({ color }, index) => (
        <button
          // Keyed by slot, not color, so a swatch keeps its hover state
          // while it cycles
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          aria-label="Change color"
          className={style.swatch}
          style={{
            backgroundColor: color,
            color: getContrastingColor(color),
          }}
          title="Change color"
          type="button"
          onClick={() => onSwatchClick(index)}>
          <RefreshCw className={style.swatchIcon} size={12} />
        </button>
      ))}
      <IconButton
        className={style.shuffle}
        icon={Shuffle}
        iconSize={16}
        label="Shuffle colors"
        variant="plain"
        onClick={onShuffle} />
    </div>
  );
}

export default PalettePicker;
