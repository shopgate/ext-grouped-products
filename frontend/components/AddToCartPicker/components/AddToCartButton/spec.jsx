import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import PickerAddToCartButton from './index';

jest.mock('@shopgate/pwa-ui-shared/AddToCartButton', () =>
  require.requireActual('./AddToCartButton.mock'));

const openListSpy = jest.fn();
const mockConditioner = { check: jest.fn(() => new Promise(resolve => resolve(true))) };

const buttonProps = {
  openList: openListSpy,
  isDisabled: false,
  isLoading: false,
  addedQuantity: 0,
  noShadow: true,
  conditioner: mockConditioner,
};

describe('<PickerAddToCartButton />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should render as expected', () => {
    const component = mount(<PickerAddToCartButton {...buttonProps} />);
    expect(component).toMatchSnapshot();
  });
  // it('should execute the clickhandler as expected', () => {
  //   const component = mount(<PickerAddToCartButton {...buttonProps} />);
  //   component.find('button').simulate('click');
  //   expect(openListSpy).toHaveBeenCalledTimes(1);
  // });
});
