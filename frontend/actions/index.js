import PipelineRequest from '@shopgate/pwa-core/classes/PipelineRequest';
import { logger } from '@shopgate/pwa-core/helpers';
import { shouldFetchData } from '@shopgate/pwa-common/helpers/redux';
import requestProducts from '@shopgate/pwa-common-commerce/product/action-creators/requestProducts';
import receiveProducts from '@shopgate/pwa-common-commerce/product/action-creators/receiveProducts';
import errorProducts from '@shopgate/pwa-common-commerce/product/action-creators/errorProducts';
import { generateHash } from '../helpers';
import { getResultsByHashEntry } from '../selectors';
import { SHOPGATE_CATALOG_GET_PRODUCT_CHILDREN } from '../constants';

/**
 * Requests product children.
 * @param {string} productId The id of the product for which children are supposed to be fetched.
 * @return {Function} A redux thunk.
 */
export const getProductChildren = productId => (dispatch, getState) => {
  const state = getState();
  const hashEntry = getResultsByHashEntry(state, productId);

  if (!shouldFetchData(hashEntry)) {
    // When the entry within the resultsByHash state is still valid no request is necessary.
    return;
  }

  const hash = generateHash(productId);

  dispatch(requestProducts({ hash }));

  new PipelineRequest(SHOPGATE_CATALOG_GET_PRODUCT_CHILDREN)
    .setInput({ productId })
    .dispatch()
    .then((response) => {
      const { products } = response;

      dispatch(receiveProducts({
        hash,
        products,
        cached: true,
      }));
    })
    .catch((error) => {
      logger.error(error);
      dispatch(errorProducts({ hash }));
    });
};
