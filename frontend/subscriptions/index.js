import { receivedVisibleProduct$, productReceived$ } from '@shopgate/pwa-common-commerce/product/streams';
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
   * Gets triggered every time product is received, but only when A product was requested.
   * Would not trigger when app receives product from multiple product request (like getProducts).
   * Makes sure there's always children for grouped products.
   * Even if a child product is directly requested
   * and there's no base product yet.
   */
  subscribe(productReceived$, ({
    dispatch, getState, action,
  }) => {
    const productId = action.productData.id;
    if (productId === null) {
      return;
    }

    if (!hasGroupedProducts(getState(), { productId })) {
      return;
    }

    dispatch(getProductChildren(productId));
  });
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
      dispatch(hideAddToCartBar());
      dispatch(getProductChildren(productId));

      return;
    }

    dispatch(showAddToCartBar());
  });
  subscribe(productChildrenReceived$, ({ dispatch }) => {
    dispatch(hideAddToCartBar());
  });
};

export default groupedProductsSubscriptions;
