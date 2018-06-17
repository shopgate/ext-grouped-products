import React from 'react';
import { mount } from 'enzyme';
import { logger } from '@shopgate/pwa-core/helpers';
import event from '@shopgate/pwa-core/classes/Event';
import { EVENT_ADD_TO_CART_MISSING_VARIANT } from '@shopgate/pwa-common-commerce/cart/constants';
import { ADD_TO_CART_BUTTON_TYPE_DEFAULT } from '../../../../constants';
import AddToCartButton from './index';

jest.mock('@shopgate/pwa-core/helpers', () => ({
  logger: {
    error: jest.fn(),
  },
}));

jest.mock('@shopgate/pwa-core/classes/Event', () => ({
  call: jest.fn(),
}));

const openListSpy = jest.fn();

const buttonProps = {
  handleAddToCart: () => {},
  openList: openListSpy,
  isDisabled: false,
  isLoading: false,
  isOrderable: true,
  addedQuantity: 0,
  noShadow: true,
};

jest.useFakeTimers();

describe('<AddToCartButton />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render as expected', () => {
    const component = mount(<AddToCartButton {...buttonProps} />);
    expect(component).toMatchSnapshot();
  });

  it('should execute the click handler as expected', () => {
    const component = mount(<AddToCartButton {...buttonProps} />);
    /* eslint-disable extra-rules/no-single-line-objects */
    component.simulate('click');
    expect(openListSpy).toHaveBeenCalledTimes(1);

    component.setProps({ ...buttonProps, isDisabled: true });
    component.simulate('click');
    expect(openListSpy).toHaveBeenCalledTimes(1);

    component.setProps({ ...buttonProps, isOrderable: false });
    component.simulate('click');
    expect(openListSpy).toHaveBeenCalledTimes(1);

    component.setProps({ ...buttonProps, isLoading: true });
    component.simulate('click');
    expect(openListSpy).toHaveBeenCalledTimes(1);

    // Trigger the showCheckmark state change.
    component.setProps({ ...buttonProps, addedQuantity: 4 });
    component.update();
    jest.runOnlyPendingTimers();
    component.simulate('click');
    expect(openListSpy).toHaveBeenCalledTimes(1);
    jest.runOnlyPendingTimers();

    // Enable the click again for verification.
    component.setProps({ ...buttonProps });
    component.simulate('click');
    expect(openListSpy).toHaveBeenCalledTimes(2);
    /* eslint-enable extra-rules/no-single-line-objects */
  });

  it('should log an error if no openList handler was injected', () => {
    const component = mount(<AddToCartButton {...buttonProps} openList={null} />);
    component.simulate('click');

    expect(openListSpy).not.toHaveBeenCalled();
    expect(logger.error).toHaveBeenCalledTimes(1);
  });

  it('should trigger an event when a default button is not orderable', () => {
    const component = mount(<AddToCartButton
      {...buttonProps}
      isOrderable={false}
      type={ADD_TO_CART_BUTTON_TYPE_DEFAULT}
    />);

    component.simulate('click');
    expect(openListSpy).toHaveBeenCalledTimes(0);
    expect(event.call).toHaveBeenCalledTimes(1);
    expect(event.call).toHaveBeenCalledWith(EVENT_ADD_TO_CART_MISSING_VARIANT);
  });
});
