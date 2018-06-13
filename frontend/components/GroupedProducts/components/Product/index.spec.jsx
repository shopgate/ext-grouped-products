import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import mockRenderOptions from '@shopgate/pwa-common/helpers/mocks/mockRenderOptions';
import addProductsToCart from '@shopgate/pwa-common-commerce/cart/actions/addProductsToCart';
import {
  mockedState,
  mockedProduct,
  mockedDiscountedProduct,
  mockedNotOrderableProduct,
} from '../../mock';
import Product from './index';

const mockedStore = configureStore();
const dispatcher = jest.fn();

jest.mock('@shopgate/pwa-common-commerce/cart/actions/addProductsToCart', () => jest.fn().mockReturnValue('mocked_add_products_to_cart_action'));

const defaultProps = {
  baseProduct: mockedProduct,
  product: mockedProduct,
};

/**
 * Creates component with provided store state.
 * @param {Object} props Additional props.
 * @return {ReactWrapper}
 */
const createComponent = (props = defaultProps) => {
  const store = mockedStore(mockedState);
  store.dispatch = dispatcher;

  return mount(
    <Provider store={store}>
      <Product
        {...props}
      />
    </Provider>,
    mockRenderOptions
  );
};

describe('<Product />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render a regular product as expected', () => {
    const component = createComponent();
    expect(component).toMatchSnapshot();
  });

  it('should render a discounted product as expected', () => {
    const component = createComponent({ product: mockedDiscountedProduct });
    expect(component).toMatchSnapshot();
  });

  it('should render a not orderable product as expected', () => {
    const component = createComponent({ product: mockedNotOrderableProduct });
    expect(component).toMatchSnapshot();
  });
});
