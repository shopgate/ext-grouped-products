import {
  SHOW_ADD_TO_CART_BAR,
  HIDE_ADD_TO_CART_BAR,
  REQUEST_PRODUCT_CHILDREN,
  RECEIVED_PRODUCT_CHILDREN,
  ERROR_NO_PRODUCT_CHILDREN,
} from '../constants';
/**
 * Dispatches the SHOW_ADD_TO_CART_BAR action.
 * @return {Object}
 */
export const showAddToCartBar = () => ({
  type: SHOW_ADD_TO_CART_BAR,
});

/**
 * Dispatches the HIDE_ADD_TO_CART_BUTTON action.
 * @return {Object}
 */
export const hideAddToCartBar = () => ({
  type: HIDE_ADD_TO_CART_BAR,
});

/**
 * Dispatches the REQUEST_PRODUCTS_BY_HASH action.
 * @return {Object}
 */
export const requestProductChildren = () => ({
  type: REQUEST_PRODUCT_CHILDREN,
});

/**
 * Dispatches the RECEIVE_PRODUCTS_BY_HASH action.
 * @return {Object}
 */
export const receivedProductChildren = () => ({
  type: RECEIVED_PRODUCT_CHILDREN,
});

/**
 * Dispatches the ERROR_PRODUCTS_BY_HASH action.
 * @param {string} msg The error message.
 * @return {Object}
 */
export const errorNoProductChildren = msg => ({
  type: ERROR_NO_PRODUCT_CHILDREN,
  msg,
});

