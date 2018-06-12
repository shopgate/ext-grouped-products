import { generateResultHash } from '@shopgate/pwa-common/helpers/redux';
import { SHOPGATE_CATALOG_GET_PRODUCT_CHILDREN } from '../constants';

/**
 * Generates a hash to read and write with the productsByHash store.
 * @param {string} productId A product id.
 * @return {string}
 */
export const generateHash = productId => generateResultHash({
  pipeline: SHOPGATE_CATALOG_GET_PRODUCT_CHILDREN,
  productId,
});
