import { receivedVisibleProduct$ } from '@shopgate/pwa-common-commerce/product/streams';
import { productChildrenReceived$ } from '../streams';
import { getProductChildren } from '../actions';
import { hasGroupedProducts } from '../selectors';
import { showAddToCartBar, hideAddToCartBar } from '../action-creators';

/**
 * Grouped products subscriptions.
 * @param {Function} subscribe The subscribe function.
 */
const groupedProductsSubscriptions = (subscribe) => {
  /**
   * Gets triggered on entering the product details route.
   */
  subscribe(receivedVisibleProduct$, ({
    dispatch, getState, action,
  }) => {
    const productId = action.productData.id;
    if (productId === null) {
      return;
    }
    if (hasGroupedProducts(getState(), { productId })) {
      dispatch(getProductChildren(productId));
    } else {
      dispatch(showAddToCartBar());
    }
  });
  subscribe(productChildrenReceived$, ({ dispatch }) => {
    dispatch(hideAddToCartBar());
  });
};

export default groupedProductsSubscriptions;
