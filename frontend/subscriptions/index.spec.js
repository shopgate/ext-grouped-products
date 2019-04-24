import { receivedVisibleProduct$, productReceived$ } from '@shopgate/pwa-common-commerce/product/streams';
import subscription from './index';
import { stateWithGroupedProducts, stateWithoutFlag } from '../selectors/index.mock';
import { productChildrenReceived$ } from '../streams';
import { showAddToCartBar, hideAddToCartBar } from '../action-creators';
import { getProductChildren } from '../actions';

jest.mock('../actions', () => ({
  getProductChildren: jest.fn(),
}));

describe('groupedProductsSubscriptions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const subscribe = jest.fn();
  let receivedProduct$Subscription;
  let receivedVisibleProduct$Subscription;
  let productChildrenReceived$Subscription;
  it('should subscribe', () => {
    subscription(subscribe);
    [
      receivedProduct$Subscription,
      receivedVisibleProduct$Subscription,
      productChildrenReceived$Subscription,
    ] = subscribe.mock.calls;
  });

  describe('receivedProduct$Subscription', () => {
    it('should do nothing', () => {
      const [stream, callback] = receivedProduct$Subscription;
      expect(stream === productReceived$).toBe(true);

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
      expect(dispatch).not.toHaveBeenCalled();
    });

    it('should call getProductChildren', () => {
      const [stream, callback] = receivedProduct$Subscription;
      expect(stream === productReceived$).toBe(true);

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
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(getProductChildren).toHaveBeenCalledTimes(1);
    });
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
      expect(dispatch).toHaveBeenCalledWith(showAddToCartBar());
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
      expect(dispatch).toHaveBeenCalledWith(hideAddToCartBar());
    });
  });
});
