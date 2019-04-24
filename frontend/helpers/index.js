import { generateResultHash } from '@shopgate/pwa-common/helpers/redux';
import { isIOSTheme } from '@shopgate-ps/pwa-extension-kit/env/helpers';
import appConfig from '@shopgate/pwa-common/helpers/config';
import { SHOPGATE_CATALOG_GET_PRODUCT_CHILDREN } from '../constants';
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
 * Tells if the extension shall render flat buttons.
 * @return {boolean}
 */
export const renderFlatButtons = () => isIOSTheme();

/**
 * Check if the favorite list feature is activated.
 * @return {boolean}
 */
export const hasFavorites = () => appConfig.hasFavorites;
