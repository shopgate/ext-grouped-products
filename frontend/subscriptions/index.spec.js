import {
  stateWithoutGroupedProducts,
  stateWithGroupedProducts,
} from '../selectors/index.mock';
import { productIsReady$ } from '../streams';
import { getProductChildren } from '../actions';
import { showAddToCartBar, hideAddToCartBar } from '../action-creators';
import subscriptions from './index';

jest.mock('../actions', () => ({
  getProductChildren: jest.fn().mockReturnValue('get_product_children'),
}));

describe('Grouped products subscriptions', () => {
  const subscribe = jest.fn();
  const dispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    subscriptions(subscribe);
  });

  it('should subscribe as expected', () => {
    expect(subscribe).toHaveBeenCalledTimes(1);
  });

  describe('productIsReady$', () => {
    let stream;
    let callback;

    beforeEach(() => {
      [[stream, callback]] = subscribe.mock.calls;
    });

    it('should setup as expected', () => {
      expect(stream).toEqual(productIsReady$);
      expect(callback).toBeInstanceOf(Function);
    });

    it('should not fetch children when the product does not have children', () => {
      callback({
        dispatch,
        getState: () => stateWithoutGroupedProducts,
      });

      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith(showAddToCartBar());
    });

    it('should fetch children when the product has children', () => {
      callback({
        dispatch,
        getState: () => stateWithGroupedProducts,
      });

      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenCalledWith(hideAddToCartBar());
      expect(dispatch).toHaveBeenCalledWith(getProductChildren());
    });
  });
});
