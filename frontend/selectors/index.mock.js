import set from 'lodash/set';
import get from 'lodash/get';
import cloneDeep from 'lodash/cloneDeep';
import merge from 'lodash/merge';
import { generateHash } from '../helpers';

/**
 * MOCKED STATES FOR THE CURRENT PRODUCT
 */
export const stateWithoutCurrentProduct = {
  product: {
    currentProduct: {
      productId: null,
    },
    productsById: {},
  },
};

export const stateWithGroupedProducts = {
  product: {
    currentProduct: {
      productId: '1337',
    },
    productsById: {
      1337: {
        productData: {
          id: '1337',
          flags: {
            hasChildren: true,
          },
        },
      },
      4711: {
        productData: {
          id: '4711',
          stock: {
            orderable: true,
          },
        },
      },
      1234: {
        productData: {
          id: '1234',
          stock: {
            orderable: false,
          },
        },
      },
      1985: {
        productData: {
          id: '1985',
        },
      },
    },
  },
  favorites: {
    products: {
      ids: ['1337'],
    },
  },
};

export const stateWithoutGroupedProducts = set(
  cloneDeep(stateWithGroupedProducts),
  'product.productsById.1337.productData.flags.hasChildren',
  false
);

export const stateWithoutFlag = set(
  cloneDeep(stateWithGroupedProducts),
  'product.productsById.1337.productData.flags',
  {}
);

/**
 * MOCKED STATES FOR RESULTS BY HASH
 */

export const stateWithEmptyResultsByHash = merge(
  cloneDeep(stateWithGroupedProducts),
  {
    product: {
      resultsByHash: {},
    },
  }
);

const resultsByHashPath = ['product', 'resultsByHash', generateHash('1337')];

export const stateWithFetchingResultsByHash = set(
  cloneDeep(stateWithEmptyResultsByHash),
  resultsByHashPath,
  { isFetching: true }
);

export const stateWithResultsByHash = set(
  cloneDeep(stateWithEmptyResultsByHash),
  resultsByHashPath,
  {
    isFetching: false,
    products: ['4711', '1234', '1985'],
  }
);

export const expectedResultsByHashEntry = get(
  stateWithResultsByHash,
  resultsByHashPath
);

export const expectedProductDataFromResultsByHash = [{
  id: '4711',
  stock: { orderable: true },
}, {
  id: '1234',
  stock: { orderable: false },
}, {
  id: '1985',
}];
