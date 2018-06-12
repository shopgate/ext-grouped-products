import { css } from 'glamor';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';

const { colors, variables } = themeConfig;

const productList = css({
  background: colors.background,
}).toString();

const productListItem = css({
  marginTop: 2,
  marginBottom: 2,
  padding: variables.gap.big,
  position: 'relative',
  background: colors.light,
}).toString();

export default {
  productList,
  productListItem,
};
