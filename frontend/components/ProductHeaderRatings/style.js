import { css } from 'glamor';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';

const { variables, colors } = themeConfig;

const content = css({
  ' > div': {
    // Apply styling to the RatingStars component to render the ProductHeaderRatings nicely.
    padding: variables.gap.big,
    marginBottom: 0,
    backgroundColor: colors.light,
    borderTop: 'rgba(0, 0, 0, 0.05) 2px solid',
  }
});

export default {
  content,
};
