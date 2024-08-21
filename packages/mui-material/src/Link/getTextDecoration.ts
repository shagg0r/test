import { getPath } from '@mui/system/style';
import { alpha, hexToRgb } from '@mui/system/color/manipulator';
import type { Theme } from '../styles';

const getTextDecoration = <T extends Theme>({
  theme,
  ownerState,
}: {
  theme: T;
  ownerState: { color: string };
}) => {
  const transformedColor = ownerState.color;
  const color = (getPath(theme, `palette.${transformedColor}`, false) ||
    ownerState.color) as string;
  const channelColor = getPath(theme, `palette.${transformedColor}Channel`) as string | null;
  if ('vars' in theme && channelColor) {
    return `rgba(${channelColor} / 0.4)`;
  }
  return hexToRgb(alpha(color, 0.4));
};

export default getTextDecoration;
