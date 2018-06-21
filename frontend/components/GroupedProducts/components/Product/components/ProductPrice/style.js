import { css } from 'glamor';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';

const { colors, variables } = themeConfig;

const containerLine = css({
  display: 'flex',
  flexDirection: 'row-reverse',
  justifyContent: 'flex-end',
  alignItems: 'center',
  ' > div': {
    paddingRight: variables.gap.small,
  },
}).toString();

const containerColumn = css({

}).toString();

const price = css({
  display: 'block',
}).toString();

const msrpLabel = css({
  color: colors.shade3,
  fontSize: '0.875rem',
  marginRight: variables.gap.small / 2,
}).toString();

const priceStrikedContainer = css({
  display: 'inline-flex',
  alignItems: 'center',
}).toString();

const priceStriked = css({
  fontSize: '0.875rem',
}).toString();

const priceInfo = css({
  fontSize: '0.75rem',
}).toString();

export default {
  containerLine,
  containerColumn,
  price,
  priceStrikedContainer,
  msrpLabel,
  priceStriked,
  priceInfo,
};
