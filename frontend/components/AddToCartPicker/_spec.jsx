import { createWrappedComponent } from '../mockStore';
import {
  mockedState,
  mockedProduct,
  mockedIgnoredQuantityProduct,
  mockedNotOrderableProduct,
} from '../mock';

import AddToCartPicker from './index';

jest.mock('@shopgate/pwa-common-commerce/cart/actions/addProductsToCart', () =>
  jest.fn().mockReturnValue('mocked_add_products_to_cart_action'));

jest.mock(
  '@shopgate/pwa-ui-shared/AddToCartButton',
  () => require.requireActual('./components/AddToCartButton/AddToCartButton.mock')
);

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

const mockHandleAddToCart = jest.fn();

/**
 * Creates a component with a provided store state.
 * @param {Object} product A product to set the component props for.
 * @param {Object} [buttonProps={}] Mocked button props.
 * @return {ReactWrapper}
 */
const createComponent = (product, buttonProps = {}) => {
  const { id, stock } = product;

  const mockedProps = {
    buttonProps,
    productId: id,
    handleAddToCart: mockHandleAddToCart,
    stock,
  };

  return createWrappedComponent(AddToCartPicker, mockedState, mockedProps);
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
    const quantity = parseInt(pickerEntry.text(), 10);

    pickerEntry.simulate('click');
    jest.runAllTimers();

    expect(mockHandleAddToCart).toHaveBeenCalledTimes(1);
    expect(mockHandleAddToCart).toHaveBeenCalledWith(quantity);
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
    const component = createComponent(mockedIgnoredQuantityProduct);
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

  it('should update the component when expected', () => {
    const component = createComponent(mockedProduct);
    const picker = component.find('AddToCartPicker').first();

    const props = picker.props();
    const state = { ...picker.instance().state };

    const scu = picker.instance().shouldComponentUpdate.bind(picker.instance());

    // Nothing changed
    expect(scu({ ...props }, { ...state })).toBe(false);

    // Some ignored prop changed
    expect(scu({
      ...props,
      clickDelay: 200,
    }, { ...state })).toBe(false);

    // Button props changed
    expect(scu({
      ...props,
      buttonProps: {
        ...props.buttonProps,
        isLoading: true,
      },
    }, { ...state })).toBe(true);

    // State changed
    expect(scu({
      ...props,
    }, {
      ...state,
      addedQuantity: 3,
    })).toBe(true);
  });

  it('should render a button with a shadow', () => {
    const component = createComponent(mockedProduct, { noShadow: false });
    expect(component.find('PickerAddToCartButton').first().prop('noShadow')).toBe(false);
  });

  it('should render a flat button', () => {
    const component = createComponent(mockedProduct, { noShadow: true });
    expect(component.find('PickerAddToCartButton').first().prop('noShadow')).toBe(true);
  });

  it('should render a flat disabled button', () => {
    const component = createComponent(mockedNotOrderableProduct, {
      noShadow: true,
      isDisabled: true,
    });
    expect(component.find('PickerAddToCartButton').first().prop('noShadow')).toBe(true);
    expect(component.find('PickerAddToCartButton').first().prop('isDisabled')).toBe(true);
  });
});