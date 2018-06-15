import { css } from 'glamor';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';

const { variables, colors } = themeConfig;

const buttonContainer = css({
  marginBottom: variables.gap.small,
}).toString();

const buttonDisabled = css({

}).toString();

const button = css({
  boxShadow: `inset 0 0 0 2px ${colors.primary}`,
}).toString();

export default {
  buttonContainer,
  buttonDisabled,
  button,
};
