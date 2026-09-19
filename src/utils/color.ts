import { MIN_DIE_LUMINANCE } from '@/config';
import type {
  Palette,
  PaletteColor,
} from '@/types';

// A #rrggbb channel's light output, from 0 to 1
function getChannel(hex: string, start: number): number {
  const channel = parseInt(hex.slice(start, start + 2), 16) / 255;

  return (channel <= 0.03928)
    ? channel / 12.92
    : ((channel + 0.055) / 1.055) ** 2.4;
}

// Relative luminance of a #rrggbb color, from 0 (black) to 1 (white)
function getLuminance(hex: string): number {
  return (0.2126 * getChannel(hex, 1)) +
    (0.7152 * getChannel(hex, 3)) +
    (0.0722 * getChannel(hex, 5));
}

export function isBrightEnough({ color }: PaletteColor): boolean {
  return getLuminance(color) >= MIN_DIE_LUMINANCE;
}

// Leave out the palette's lightest and darkest colors, keeping the preferred
// color if it's among those in between, otherwise the most middling one
export function pickMidtoneColor(preferred: PaletteColor, palette: Palette): PaletteColor {
  const byLuminance = [...palette].sort((a, b) => getLuminance(a.color) - getLuminance(b.color));
  const midtones = (byLuminance.length > 2) ? byLuminance.slice(1, -1) : byLuminance;

  if (midtones.includes(preferred)) return preferred;

  return midtones[Math.floor(midtones.length / 2)];
}
