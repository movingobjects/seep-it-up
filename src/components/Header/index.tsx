import { hexToHsv } from '@movingobjects/utils/colors';
import { LOGO_MIN_VALUE } from '@/config';
import type {
  ColorIndex,
  Palette,
} from '@/types';
import style from './index.module.scss';

interface Props {
  readonly palette: Palette;
  // The logo is painted in this palette color, if it's bright enough
  readonly colorIndex: ColorIndex;
}

// Step through the palette from the given color to the first one bright
// enough to read, falling back to the given color if none are
function getLogoColor(palette: Palette, colorIndex: ColorIndex): string {
  for (let step = 0; step < palette.length; step++) {
    const { color } = palette[(colorIndex + step) % palette.length];
    if (hexToHsv(color).v >= LOGO_MIN_VALUE) return color;
  }

  return palette[colorIndex].color;
}

function Header({
  palette,
  colorIndex,
}: Props) {
  return (
    <div className={style.wrap}>
      <h1 style={{ color: getLogoColor(palette, colorIndex) }}>
        Seep It Up!
      </h1>
    </div>
  );
}

export default Header;
