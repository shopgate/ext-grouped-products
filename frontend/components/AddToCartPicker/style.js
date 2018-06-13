import { css } from 'glamor';
import sheetStyles from '@shopgate/pwa-ui-shared/Sheet/style';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';

const { variables, colors } = themeConfig;

const buttonContainer = css({
  marginBottom: 20,
}).toString();

const button = css({
  boxShadow: `0 0 0 2px ${colors.primary}`,
}).toString();

const sheetOverwrites = `
.${sheetStyles.container} { border-radius: 10px 10px 0 0; }
.${sheetStyles.content} { max-height: calc(100vh - ${variables.navigator.height + 15}px - var(--safe-area-inset-top)); }
`;

export default {
  buttonContainer,
  button,
  sheetOverwrites,
};
