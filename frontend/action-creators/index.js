import { SHOW_ADD_TO_CART_BAR, HIDE_ADD_TO_CART_BAR } from '../constants';
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
