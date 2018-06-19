import { css } from 'glamor';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';

const { variables, colors } = themeConfig;

const content = css({
  ' > div': {
    // Apply styling to the RatingStars component to render the ProductHeader nicely.
    padding: variables.gap.big,
    marginBottom: 0,
    backgroundColor: colors.light,
    borderTop: 'rgba(0, 0, 0, 0.05) 2px solid',
  },
  ' + div': {
    // Hide the original ProductHeader.
    display: 'none',
  },
});

export default {
  content,
};
