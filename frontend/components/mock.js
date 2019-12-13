import set from 'lodash/set';
import cloneDeep from 'lodash/cloneDeep';
import { generateHash } from '../helpers';

const availability = {
  text: 'Lorem Ipsum',
  state: 'ok',
};

const stock = {
  ignoreQuantity: false,
  quantity: 4,
  info: 'Info',
  orderable: true,
  minOrderQuantity: 1,
  maxOrderQuantity: 1000,
};

const price = {
  currency: 'EUR',
  unitPrice: 5.0,
  unitPriceMin: 0,
  unitPriceStriked: 0,
  msrp: 0,
  discount: 0,
  info: '',
};

const product = {
  id: '1337',
  name: 'A shiny product',
  featuredImageUrl: 'https://cdn.acme.com/kitten.jpg',
  flags: {
    hasChildren: true,
    hasVariants: false,
  },
  availability,
  price,
  stock,
};

// eslint-disable-next-line import/no-mutable-exports
let discountedMsrp = cloneDeep({
  ...product,
  id: '4711',
  name: 'A discounted product with msrp',
});

discountedMsrp = set(discountedMsrp, ['price', 'msrp'], 10.0);
discountedMsrp = set(discountedMsrp, ['price', 'discount'], 50);

// eslint-disable-next-line import/no-mutable-exports
let discountedStrike = cloneDeep({
  ...product,
  id: '1985',
  name: 'A discounted product with stike price and info',
});

discountedStrike = set(discountedStrike, ['price', 'unitPriceStriked'], 10.0);
discountedStrike = set(discountedStrike, ['price', 'discount'], 50);
discountedStrike = set(discountedStrike, ['price', 'info'], '5 EUR / kg');

// eslint-disable-next-line import/no-mutable-exports
let notOrderable = cloneDeep({
  ...product,
  id: 'foo',
  name: 'A not orderable product',
});

notOrderable = set(notOrderable, ['stock', 'orderable'], false);
notOrderable = set(notOrderable, ['stock', 'quantity'], 0);

// eslint-disable-next-line import/no-mutable-exports
let ignoredQuantity = cloneDeep({
  ...product,
  id: '1234',
  name: 'A product with ignored quantity',
});

ignoredQuantity = set(ignoredQuantity, ['stock', 'ignoreQuantity'], true);
ignoredQuantity = set(ignoredQuantity, ['stock', 'quantity'], 30);

const mockedState = {
  product: {
    currentProduct: {
      productId: '1337',
    },
    resultsByHash: {
      [generateHash('1337')]: {
        isFetching: false,
        products: [
          product.id,
          discountedMsrp.id,
          discountedStrike.id,
          notOrderable.id,
          ignoredQuantity.id,
        ],
      },
    },
    productsById: {
      [product.id]: {
        productData: product,
      },
      [discountedMsrp.id]: {
        productData: discountedMsrp,
      },
      [discountedStrike.id]: {
        productData: discountedStrike,
      },
      [notOrderable.id]: {
        productData: notOrderable,
      },
      [ignoredQuantity.id]: {
        productData: ignoredQuantity,
      },
    },
  },
  favorites: {
    products: {
      isFetching: false,
      ids: ['1337'],
    },
  },
};

const mockedProps = {
  handleAddToCart: () => { },
  isFavorite: false,
  addToCartButtonProps: {},
  isAddToCartButtonVisible: false,
  product: {},
  onClose: () => { }
};

const mockedStateWithRegularProduct = set(
  cloneDeep(mockedState),
  ['product', 'productsById', product.id, 'productData', 'flags'],
  {
    hasChildren: false,
    hasVariants: false,
  }
);

const mockedPropsWithRegularProduct = {
  handleAddToCart: () => { },
  isFavorite: true,
  addToCartButtonProps: {},
  isAddToCartButtonVisible: true,
  product: {},
};

const mockedStateWithoutCurrentProductData = set(
  cloneDeep(mockedState),
  ['product', 'productsById', product.id],
  undefined
);

const mockedPropsWithoutCurrentProduct = {
  handleAddToCart: () => { },
  isFavorite: true,
  addToCartButtonProps: {},
  isAddToCartButtonVisible: true,
  product: {},
};

export {
  mockedProps,
  mockedPropsWithRegularProduct,
  mockedPropsWithoutCurrentProduct,
  mockedState,
  mockedStateWithRegularProduct,
  mockedStateWithoutCurrentProductData,
  product as mockedProduct,
  discountedMsrp as mockedMsrpProduct,
  discountedStrike as mockedStrikePriceProduct,
  notOrderable as mockedNotOrderableProduct,
  ignoredQuantity as mockedIgnoredQuantityProduct,
};
