import set from 'lodash/set';
import cloneDeep from 'lodash/cloneDeep';

const availability = {
  text: 'Lorem Ipsum',
  state: 'ok',
};

const stock = {
  ignoreQuantity: false,
  quantity: 30,
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
  id: '4711',
  name: 'A discounted product with stike price and info',
});

discountedStrike = set(discountedStrike, ['price', 'unitPriceStriked'], 10.0);
discountedStrike = set(discountedStrike, ['price', 'discount'], 50);
discountedStrike = set(discountedStrike, ['price', 'info'], '5 EUR / kg');

// eslint-disable-next-line import/no-mutable-exports
let notOrderable = cloneDeep({
  ...product,
  id: '1234',
  name: 'A not orderable product',
});

notOrderable = set(notOrderable, ['stock', 'orderable'], false);
notOrderable = set(notOrderable, ['stock', 'quantity'], 0);

const mockedState = {
  product: {
    currentProduct: {
      productId: '1337',
    },
    productsById: {
      1337: {
        productData: product,
      },
    },
  },
};

export {
  mockedState,
  product as mockedProduct,
  discountedMsrp as mockedMsrpProduct,
  discountedStrike as mockedStrikePriceProduct,
  notOrderable as mockedNotOrderableProduct,
};
