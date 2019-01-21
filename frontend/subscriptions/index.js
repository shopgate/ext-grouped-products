import { receivedVisibleProduct$ } from '@shopgate/pwa-common-commerce/product/streams';
import { getProductIdFromRoute } from '@shopgate/pwa-common-commerce/product/selectors/product';
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
  subscribe(receivedVisibleProduct$, ({ dispatch, getState }) => {
    const productId = getProductIdFromRoute();
    if (productId === null) {
      return;
    }
    if (hasGroupedProducts(getState())) {
      dispatch(hideAddToCartBar());
      dispatch(getProductChildren(productId));
    } else {
      dispatch(showAddToCartBar());
    }
  });
};

export default groupedProductsSubscriptions;
