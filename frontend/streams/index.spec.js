import configureStore from '@shopgate/pwa-common/store';
import requestProduct from '@shopgate/pwa-common-commerce/product/action-creators/requestProduct';
import receiveProduct from '@shopgate/pwa-common-commerce/product/action-creators/receiveProduct';
import setProductId from '@shopgate/pwa-common-commerce/product/action-creators/setProductId';
import setProductVariantId from '@shopgate/pwa-common-commerce/product/action-creators/setProductVariantId';
import productReducers from '@shopgate/pwa-common-commerce/product/reducers';
import { productIsReady$ } from './index';

jest.mock('redux-logger', () => ({
  createLogger: () => () => next => action => next(action),
}));

/**
 * Creates a redux store instance for the tests.
 * @return {Onject}
 */
export const createStore = () => configureStore({
  product: productReducers,
});

describe('Grouped products streams', () => {
  describe('productIsReady$', () => {
    let productIsReadySubscriber;

    beforeEach(() => {
      productIsReadySubscriber = jest.fn();
      productIsReady$.subscribe(productIsReadySubscriber);
    });

    it('should emit when a product is ready to be tracked', () => {
      const { dispatch } = createStore();
      const productId = 'abc123';

      // Put a mocked product into the store.
      dispatch(receiveProduct(productId, {}));
      dispatch(setProductId(productId));

      expect(productIsReadySubscriber).toHaveBeenCalledTimes(1);
    });

    it('should emit after a product was received when a product is currently loading', () => {
      const { dispatch } = createStore();
      const productId = 'abc123';

      // Simulate an ongoing request.
      dispatch(requestProduct(productId));
      dispatch(setProductId(productId));
      expect(productIsReadySubscriber).not.toHaveBeenCalled();
      // Data came in.
      dispatch(receiveProduct());
      expect(productIsReadySubscriber).toHaveBeenCalledTimes(1);
    });

    it('should not emit if a variant is selected', () => {
      const { dispatch } = createStore();
      const productId = 'abc123';
      const variantId = '123abc';
      dispatch(setProductId(productId));
      dispatch(setProductVariantId(variantId));
      dispatch(receiveProduct(productId, {}));
      dispatch(receiveProduct(variantId, {}));
      expect(productIsReadySubscriber).not.toHaveBeenCalled();
    });
  });
});
