import { productIsReady$ } from '../streams';
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
  subscribe(productIsReady$, ({ dispatch, getState }) => {
    if (hasGroupedProducts(getState())) {
      dispatch(hideAddToCartBar());
      dispatch(getProductChildren());
    } else {
      dispatch(showAddToCartBar());
    }
  });
};

export default groupedProductsSubscriptions;
