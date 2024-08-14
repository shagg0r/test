import {
  Color,
  OFFSET_R,
  OFFSET_G,
  OFFSET_B,
  OFFSET_A,
} from './parse';
import { get, set } from './bitwise';

export function alpha(color: Color, value: number) {
  return set(color, OFFSET_A, Math.round(value * 255))
}

/**
 * The relative brightness of any point in a color space, normalized to 0 for
 * darkest black and 1 for lightest white.
 * Formula: https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests
 * @returns The relative brightness of the color in the range 0 - 1
 */
export function getLuminance(color: Color) {
  const r = get(color, OFFSET_R) / 255;
  const g = get(color, OFFSET_G) / 255;
  const b = get(color, OFFSET_B) / 255;

  const apply = (v: number) => v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;

  const r1 = apply(r)
  const g1 = apply(g)
  const b1 = apply(b)

  // Truncate at 3 digits
  return Number((0.2126 * r1 + 0.7152 * g1 + 0.0722 * b1).toFixed(3));
}
