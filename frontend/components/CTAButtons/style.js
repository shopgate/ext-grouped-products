import { css } from 'glamor';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';

const { variables } = themeConfig;

const cartButtonSize = 56;
const iconSize = 24;

const buttons = css({
  position: 'absolute',
  right: variables.gap.big,
  top: -30,
  height: 60,
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  '> :last-child': {
    marginLeft: variables.gap.big,
  },
}).toString();

const favButton = css({
  zIndex: 1, // Prevents the icons to be visible outside of the circle
  fontSize: iconSize,
}).toString();

const ripple = css({
  padding: 8,
}).toString();

export default {
  buttons,
  cartButtonSize,
  favButton,
  iconSize,
  ripple,
};
