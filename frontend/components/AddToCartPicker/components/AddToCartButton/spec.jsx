import React, { Component } from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';

// eslint-disable-next-line require-jsdoc
class MockedAdToCartButton extends Component {
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
jest.mock('@shopgate/pwa-ui-shared/AddToCartButton', () => MockedAdToCartButton);

describe('<AddToCartButton />', () => {
  // eslint-disable-next-line global-require
  const AddToCartButton = require('./index.jsx').default;

  const mockStore = configureStore();
  it('Should render in loadingState and should not be clickable', () => {
    const spy = jest.fn(() => new Promise(resolve => resolve()));
    const store = mockStore({});
    const wrapper = mount(<AddToCartButton
      store={store}
      onClick={spy}
      openList={spy}
      isLoading
      isOrderable
      isDisabled={false}
      conditioner={{
        check: () => new Promise(resolve => resolve(true)),
      }}
    />);
    expect(wrapper).toMatchSnapshot();
    expect(spy).toHaveBeenCalledTimes(0);
  });

  it('should render with checkmark icon and should be clickable', () => {
    const spy = jest.fn(() => new Promise(resolve => resolve()));
    const store = mockStore({});
    const wrapper = mount(<AddToCartButton
      store={store}
      onClick={spy}
      openList={spy}
      isLoading={false}
      isOrderable
      isDisabled={false}
      conditioner={{
        check: () => new Promise(resolve => resolve(true)),
      }}
    />);
    wrapper.find('button').prop('onClick')();
    wrapper.update();

    expect(wrapper).toMatchSnapshot();
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
