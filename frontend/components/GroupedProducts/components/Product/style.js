import { css } from 'glamor';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';

const { colors, variables } = themeConfig;

const imageContainer = css({
  width: 80,
  minHeight: 80,
  boxSizing: 'content-box',
  paddingRight: variables.gap.small,
}).toString();

const metaContainer = css({
}).toString();

const buttonContainer = css({
  textAlign: 'right',
  paddingLeft: variables.gap.small,
}).toString();

const headline = css({
  fontWeight: 500,
}).toString();

const availability = css({
  fontSize: '0.875rem',
}).toString();

const price = css({
  justifyContent: 'flex-end',
}).toString();

const msrpLabel = css({
  color: colors.shade3,
  fontSize: '0.875rem',
  marginRight: variables.gap.small / 2,
}).toString();

const priceStrikedContainer = css({
  display: 'inline-flex',
}).toString();

const priceStriked = css({
  fontSize: '0.875rem',
}).toString();

const priceInfo = css({
  fontSize: '0.75rem',
}).toString();

export default {
  imageContainer,
  metaContainer,
  buttonContainer,
  headline,
  availability,
  price,
  priceStrikedContainer,
  msrpLabel,
  priceStriked,
  priceInfo,
};
