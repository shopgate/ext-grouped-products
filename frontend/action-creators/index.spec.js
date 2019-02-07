import {
  showAddToCartBar,
  hideAddToCartBar,
  requestProductChildren,
  receivedProductChildren,
  errorNoProductChildren,
} from './index';

import {
  SHOW_ADD_TO_CART_BAR,
  HIDE_ADD_TO_CART_BAR,
  REQUEST_PRODUCT_CHILDREN,
  RECEIVED_PRODUCT_CHILDREN,
  ERROR_NO_PRODUCT_CHILDREN,
} from '../constants';

describe('Grouped products AddToCartBar actions', () => {
  describe('showAddToCartBar()', () => {
    it('should work as expected', () => {
      expect(showAddToCartBar()).toEqual({ type: SHOW_ADD_TO_CART_BAR });
    });
  });

  describe('hideAddToCartBar()', () => {
    it('should work as expected', () => {
      expect(hideAddToCartBar()).toEqual({ type: HIDE_ADD_TO_CART_BAR });
    });
  });

  describe('requestProductChildren()', () => {
    it('should work as expected', () => {
      expect(requestProductChildren()).toEqual({ type: REQUEST_PRODUCT_CHILDREN });
    });
  });

  describe('receivedProductChildren()', () => {
    it('should work as expected', () => {
      expect(receivedProductChildren()).toEqual({ type: RECEIVED_PRODUCT_CHILDREN });
    });
  });

  describe('errorNoProductChildren()', () => {
    it('should work as expected', () => {
      expect(errorNoProductChildren()).toEqual({
        type: ERROR_NO_PRODUCT_CHILDREN,
      });
    });
  });
});
