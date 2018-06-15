import { css } from 'glamor';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';

const { colors } = themeConfig;

const buttonContainer = css({
  display: 'inherit',
}).toString();

const buttonDisabled = css({
  boxShadow: 'none',
}).toString();

const button = css({
  boxShadow: `inset 0 0 0 2px ${colors.primary}`,
}).toString();

export default {
  buttonContainer,
  buttonDisabled,
  button,
};
