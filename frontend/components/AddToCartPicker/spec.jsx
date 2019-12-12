import React, { Component } from 'react';
import { createWrappedComponent } from '../mockStore';
import {
  mockedState,
  mockedProduct,
  mockedIgnoredQuantityProduct,
  mockedNotOrderableProduct,
} from '../mock';

// eslint-disable-next-line require-jsdoc
class mockedAdToCartButton extends Component {
  // eslint-disable-next-line require-jsdoc
  static get propTypes() {
    return {};
  }

  // eslint-disable-next-line require-jsdoc
  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      showCheckMark: false,
    };
  }

  // eslint-disable-next-line require-jsdoc
  render() {
    return <div><button onClick={this.handleClick}>Add to cart</button></div>;
  }
}
// Missing css-spring mock on pwa-ui-shared
jest.mock('@shopgate/pwa-ui-shared/AddToCartButton', () => mockedAdToCartButton);

jest.mock('@shopgate/pwa-ui-shared/AddToCartButton/style', () => (
  {
    buttonSize: 10,
    iconSize: 10,
    buttonWrapper: () => { },
    buttonWrapperNoShadow: () => { },
  }
));

jest.mock('../config', () => { }, { virtual: true });

jest.mock('@shopgate/pwa-common-commerce/cart/actions/addProductsToCart', () =>
  jest.fn().mockReturnValue('mocked_add_products_to_cart_action'));

jest.mock('../../config', () => ({
  maxQuantityPickerEntries: 5,
}), { virtual: true });

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

jest.useFakeTimers();

describe('<AddToCartPicker />', () => {
  // eslint-disable-next-line global-require
  const AddToCartPicker = require('./index.jsx').default;

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
      onClose: () => { },
    };

    return createWrappedComponent(AddToCartPicker, mockedState, mockedProps);
  };

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
});
