import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import mockRenderOptions from '@shopgate/pwa-common/helpers/mocks/mockRenderOptions';
import addProductsToCart from '@shopgate/pwa-common-commerce/cart/actions/addProductsToCart';
import {
  mockedProduct,
  mockedLowQuantityProduct,
} from '../GroupedProducts/mock';

import AddToCartPicker from './index';

jest.mock('@shopgate/pwa-common-commerce/cart/actions/addProductsToCart', () =>
  jest.fn().mockReturnValue('mocked_add_products_to_cart_action'));

jest.mock('../../config', () => ({
  maxQuantityPickerEntries: 5,
}));

jest.mock('react-portal', () => (
  ({ isOpened, children }) => (
    isOpened ? children : null
  )
));
try {
  jest.doMock('@shopgate/pwa-common/node_modules/react-portal', () => (
    ({ isOpened, children }) => (
      isOpened ? children : null
    )
  ));
} catch (e) {
  // Do nothing.
}

jest.mock('@shopgate/pwa-ui-shared/Sheet', () => ({ children }) => children);

const mockedStore = configureStore();
const mockDispatch = jest.fn();

/**
 * Creates component with provided store state.
 * @param {Object} product A product to set the component props for.
 * @return {ReactWrapper}
 */
const createComponent = (product) => {
  const store = mockedStore({});
  store.dispatch = mockDispatch;

  const { id, stock } = product;
  return mount(
    <Provider store={store}>
      <AddToCartPicker productId={id} stock={stock} />
    </Provider>,
    mockRenderOptions
  );
};

jest.useFakeTimers();

describe('<AddToCartPicker />', () => {
  it('should render the component as expected', () => {
    const { id, stock } = mockedProduct;
    const component = createComponent(mockedProduct);
    component.simulate('click');
    expect(component).toMatchSnapshot();

    expect(component.find(AddToCartPicker).first().prop('productId')).toEqual(id);
    expect(component.find(AddToCartPicker).first().prop('stock')).toEqual(stock);

    const pickerEntry = component.find('ListItem Item').first();

    pickerEntry.simulate('click');
    jest.runAllTimers();

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(addProductsToCart());
  });

  it('should create picker items like expected when quantity is not ignored', () => {
    const component = createComponent(mockedProduct);
    const picker = component.find('Picker').first();
    const pickerItems = picker.prop('items');
    expect(pickerItems).toHaveLength(4);
    expect(pickerItems[0]).toEqual({
      label: '1',
      value: 1,
    });
    expect(pickerItems[pickerItems.length - 1]).toEqual({
      label: '4',
      value: 4,
    });
  });

  it('should create picker items like expected when quantity is ignored', () => {
    const component = createComponent(mockedLowQuantityProduct);
    const picker = component.find('Picker').first();
    const pickerItems = picker.prop('items');
    expect(pickerItems).toHaveLength(5);
    expect(pickerItems[0]).toEqual({
      label: '1',
      value: 1,
    });
    expect(pickerItems[pickerItems.length - 1]).toEqual({
      label: '5',
      value: 5,
    });
  });
});
