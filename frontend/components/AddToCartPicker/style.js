import { css } from 'glamor';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';

const { variables, colors } = themeConfig;

const buttonContainer = css({
  marginBottom: variables.gap.xsmall,
}).toString();

const buttonFlat = css({
  boxShadow: `inset 0 0 0 2px ${colors.primary}`,
}).toString();

const buttonFlatDisabled = css({
  // Empty class to overwrite the default styling of the button.
}).toString();

export default {
  buttonContainer,
  buttonFlat,
  buttonFlatDisabled,
};
