import { generateResultHash } from '@shopgate/pwa-common/helpers/redux';
import appConfig from '@shopgate/pwa-common/helpers/config';
import { SHOPGATE_CATALOG_GET_PRODUCT_CHILDREN, THEME_GMD } from '../constants';
import { maxQuantityPickerEntries as maxEntries } from '../config';

/**
 * Generates a hash to read and write with the productsByHash store.
 * @param {string} productId A product id.
 * @return {string}
 */
export const generateHash = productId => generateResultHash({
  pipeline: SHOPGATE_CATALOG_GET_PRODUCT_CHILDREN,
  productId,
});

/**
 * Creates an item list for the AddToCartPicker.
 * @param {Object} stock The stock property of a product.
 * @return {Array}
 */
export const createPickerItems = (stock) => {
  if (!stock) {
    return [];
  }

  const {
    ignoreQuantity,
    quantity,
  } = stock;

  const items = [];

  const max = ignoreQuantity ? maxEntries : Math.min(maxEntries, quantity);

  for (let i = 0; i < max; i += 1) {
    const value = i + 1;
    items.push({
      label: `${value}`,
      value,
    });
  }

  return items;
};

/**
 * Checks if the current theme is the GMD theme.
 * @return {boolean}
 */
export const isGmdTheme = () => process.env.THEME.includes(THEME_GMD);

/**
 * Tells if the extension shall render flat buttons.
 * @return {boolean}
 */
export const renderFlatButtons = () => !isGmdTheme();

/**
 * Check if the favorite list feature is activated.
 * @return {boolean}
 */
export const hasFavorites = () => appConfig.hasFavorites;
