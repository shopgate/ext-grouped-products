import { css } from 'glamor';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';

const { variables, colors } = themeConfig;

const content = css({
  position: 'relative',
  backgroundColor: colors.light,
  padding: variables.gap.big,
  borderTop: 'rgba(0, 0, 0, 0.05) 2px solid',
  ' + div': {
    display: 'none',
  },
});

export default {
  content,
};
