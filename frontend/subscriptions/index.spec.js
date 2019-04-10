import { receivedVisibleProduct$ } from '@shopgate/pwa-common-commerce/product/streams';
import subscription from './index';
import { stateWithGroupedProducts, stateWithoutFlag } from '../selectors/mock';
import { productChildrenReceived$ } from '../streams';
import { showAddToCartBar, hideAddToCartBar } from '../action-creators';
import { getProductChildren } from '../actions';

jest.mock('../actions', () => ({
  getProductChildren: jest.fn(),
}));

jest.mock('../action-creators', () => ({
  showAddToCartBar: jest.fn(),
  hideAddToCartBar: jest.fn(),
}));

describe('groupedProductsSubscriptions', () => {
  const subscribe = jest.fn();
  let receivedVisibleProduct$Subscription;
  let productChildrenReceived$Subscription;
  it('should subscribe', () => {
    subscription(subscribe);
    [
      receivedVisibleProduct$Subscription,
      productChildrenReceived$Subscription,
    ] = subscribe.mock.calls;
  });

  describe('receivedVisibleProduct$', () => {
    it('should return if there is no productId', () => {
      const [stream, callback] = receivedVisibleProduct$Subscription;
      expect(stream === receivedVisibleProduct$).toBe(true);

      const dispatch = jest.fn();
      const action = {
        productData:
          {
            id: null,
          },
      };
        // eslint-disable-next-line require-jsdoc
      const getState = () => (stateWithGroupedProducts);
      callback({
        dispatch,
        getState,
        action,
      });
      expect(getProductChildren).toHaveBeenCalledTimes(0);
    });

    it('should dispatch showAddToCartBar() if this is not a grouped product', () => {
      const [stream, callback] = receivedVisibleProduct$Subscription;
      expect(stream === receivedVisibleProduct$).toBe(true);

      const dispatch = jest.fn();
      const action = {
        productData:
          {
            id: '1337',
          },
      };
      // eslint-disable-next-line require-jsdoc
      const getState = () => (stateWithoutFlag);
      callback({
        dispatch,
        getState,
        action,
      });
      expect(showAddToCartBar).toHaveBeenCalledTimes(1);
    });
    it('should dispatch getProductChildren() if there is a grouped product', () => {
      const [stream, callback] = receivedVisibleProduct$Subscription;
      expect(stream === receivedVisibleProduct$).toBe(true);

      const dispatch = jest.fn();
      const action = {
        productData:
          {
            id: '1337',
          },
      };
      // eslint-disable-next-line require-jsdoc
      const getState = () => (stateWithGroupedProducts);
      callback({
        dispatch,
        getState,
        action,
      });
      expect(getProductChildren).toHaveBeenCalledTimes(1);
    });
  });

  describe('productChildrenReceived', () => {
    it('should dispatch hideAddToCartBar() if productChildrenReceived ', () => {
      const [stream, callback] = productChildrenReceived$Subscription;
      expect(stream === productChildrenReceived$).toBe(true);
      const dispatch = jest.fn();
      callback({ dispatch });
      expect(hideAddToCartBar).toHaveBeenCalledTimes(1);
    });
  });
});
