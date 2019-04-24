import { combineReducers } from 'redux';
import { createMockStore } from '@shopgate/pwa-common/store';
import router from '@shopgate/pwa-common/reducers/router';
import product from '@shopgate/pwa-common-commerce/product/reducers';
import { productChildrenReceived$ } from './index';
import { RECEIVED_PRODUCT_CHILDREN } from '../constants';

describe('productChildrenReceived Stream', () => {
  let dispatch = null;
  const store = createMockStore(combineReducers({
    product,
    router,
  }));
  ({ dispatch } = store);
  let productChildrenReceivedSubscriber;
  beforeEach(() => {
    productChildrenReceivedSubscriber = jest.fn();
    productChildrenReceived$.subscribe(productChildrenReceivedSubscriber);
  });

  it('should not emit for other actions', () => {
    dispatch({ type: 'someaction' });
    expect(productChildrenReceivedSubscriber).not.toHaveBeenCalled();
  });
  it('should emit when product children are received', () => {
    dispatch({ type: RECEIVED_PRODUCT_CHILDREN });
    expect(productChildrenReceivedSubscriber).toHaveBeenCalledTimes(1);
  });
});
