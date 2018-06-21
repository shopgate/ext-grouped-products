import React from 'react';
import { mount } from 'enzyme';
import AddToCartButton from './index';

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

jest.mock('@shopgate/pwa-ui-shared/AddToCartButton', () => require('./AddToCartButton.mock.js'));

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
});
