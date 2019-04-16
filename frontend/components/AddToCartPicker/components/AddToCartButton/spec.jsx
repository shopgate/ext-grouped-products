import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import PickerAddToCartButton from './index';

describe('<PickerAddToCartButton />', () => {
  const mockStore = configureStore();
  it('Should render in loadingState and should not be clickable', () => {
    const spy = jest.fn(() => new Promise(resolve => resolve()));
    const store = mockStore({});
    const wrapper = mount(<PickerAddToCartButton
      store={store}
      onClick={spy}
      openList={spy}
      isLoading
      isOrderable
      isDisabled={false}
      conditioner={{
        check: () => new Promise(resolve => resolve(true))
      }}
    />);
    expect(wrapper).toMatchSnapshot();
    expect(spy).toHaveBeenCalledTimes(0);
  });

  it('should render with checkmark icon and should be clickable', () => {
    const spy = jest.fn(() => new Promise(resolve => resolve()));
    const store = mockStore({});
    const wrapper = mount(<PickerAddToCartButton
      store={store}
      onClick={spy}
      openList={spy}
      isLoading={false}
      isOrderable
      isDisabled={false}
      conditioner={{
        check: () => new Promise(resolve => resolve(true))
      }}
    />);
    wrapper.find('button').prop('onClick')();
    wrapper.update();

    expect(wrapper).toMatchSnapshot();
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
