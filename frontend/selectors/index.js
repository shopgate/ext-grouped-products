import { createSelector } from 'reselect';
import {
  getCurrentBaseProduct,
  getCurrentBaseProductId,
  getProductById,
} from '@shopgate/pwa-common-commerce/product/selectors/product';
import { getFavoritesProductsIds } from '@shopgate/pwa-common-commerce/favorites/selectors';
import { generateHash, isGmdTheme } from '../helpers';

/**
 * Retrieves the resultsByHash collection from the state.
 * @param {Object} state The current application state.
 * @return {Object}
 */
const getResultsByHash = state => state.product.resultsByHash;

/**
 * Retrieves the grouped products resultsByHash entry for the current base product.
 * @param {Object} state The current application state.
 * @return {Object|null} The entry or NULL if no entry could be determined.
 */
export const getResultsByHashEntry = createSelector(
  getResultsByHash,
  getCurrentBaseProductId,
  (resultsByHash, baseProductId) => {
    if (!baseProductId) {
      return null;
    }

    // Generate tha hash to access the state.
    const hash = generateHash(baseProductId);
    return resultsByHash[hash] || null;
  }
);

/**
 * Retrieves grouped products for the current base product.
 * @param {Object} state The current application state.
 * @return {Array} An array of products.
 */
export const getGroupedProducts = createSelector(
  state => state,
  getResultsByHashEntry,
  (state, result) => {
    if (result === null) {
      return [];
    }

    const { products: productIds = [], isFetching } = result;

    if (isFetching === true) {
      return [];
    }

    // Return a list of the actual products.
    return productIds.map(id => getProductById(state, id).productData);
  }
);

/**
 * Checks if a grouped product is orderable.
 * @param {Object} state The current application state.
 * @param {Object} props A component props object.
 * @param {string} props.productId The id of the inspected product.
 * @return {boolean}
 */
export const isGroupedProductOrderable = createSelector(
  getGroupedProducts,
  (state, props = {}) => props.productId,
  (products, productId) => {
    if (!productId) {
      return false;
    }

    const product = products.find(({ id }) => id === productId) || {};
    const { stock: { orderable = false } = {} } = product;
    return orderable;
  }
);

/**
 * Determines if the current base product has grouped products.
 * @param {Object} state The current application state.
 * @return {boolean}
 */
export const hasGroupedProducts = createSelector(
  getCurrentBaseProduct,
  (baseProduct) => {
    if (!baseProduct) {
      return false;
    }

    const { flags: { hasChildren = false } } = baseProduct;
    return hasChildren;
  }
);

/**
 * Checks if a product is an the favorite list.
 * @param {Object} state The current application state.
 * @param {Object} props A component props object.
 * @param {string} props.productId The id of the inspected product.
 * @return {boolean}
 */
export const isProductOnFavoriteList = createSelector(
  getFavoritesProductsIds,
  (state, props = {}) => props.productId,
  (productIds, productId) => !!productIds.find(id => id === productId)
);

/**
 * Determines if the main AddToCartButton should be visible.
 * @return {boolean}
 */
export const isMainAddToCartButtonVisible = createSelector(
  hasGroupedProducts,
  hasPoducts => isGmdTheme() && !hasPoducts
);
