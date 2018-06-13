import { css } from 'glamor';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';

const { variables, colors } = themeConfig;

const buttonContainer = css({
  marginBottom: variables.gap.small,
}).toString();

const button = css({
  boxShadow: `0 0 0 2px ${colors.primary}`,
}).toString();

export default {
  buttonContainer,
  button,
};
