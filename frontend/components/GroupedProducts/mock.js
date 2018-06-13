import set from 'lodash/set';
import get from 'lodash/get';
import cloneDeep from 'lodash/cloneDeep';
import merge from 'lodash/merge';

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
};

const product = {
  id: '1337',
  name: 'A shiny product',
  featuredImageUrl: 'https://cdn.acme.com/kitten.jpg',
  availability,
  price,
  stock,
};

let discounted = cloneDeep({
  ...product,
  id: '4711',
  name: 'A discounted product',
});

discounted = set(discounted, ['price', 'msrp'], 10.0);
discounted = set(discounted, ['price', 'discount'], 50);

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
  discounted as mockedDiscountedProduct,
  notOrderable as mockedNotOrderableProduct,
};
