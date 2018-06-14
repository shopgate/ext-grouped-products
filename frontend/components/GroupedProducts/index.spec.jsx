import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import mockRenderOptions from '@shopgate/pwa-common/helpers/mocks/mockRenderOptions';
import {
  mockedProduct,
  mockedMsrpProduct,
} from './mock';

import { getGroupedProducts } from '../../selectors';
import GroupedProducts from './index';

jest.mock('../../selectors', () => ({
  getGroupedProducts: jest.fn(),
}));

const mockedStore = configureStore();

/**
 * Creates component with provided store state.
 * @return {ReactWrapper}
 */
const createComponent = () => {
  const store = mockedStore({});

  return mount(
    <Provider store={store}>
      <GroupedProducts />
    </Provider>,
    mockRenderOptions
  );
};

describe('<GroupedProducts />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should not render when no grouped products are available', () => {
    getGroupedProducts.mockReturnValue([]);
    const component = createComponent();
    expect(component).toMatchSnapshot();
    expect(component.find('GroupedProducts').html()).toBe(null);
  });

  it('should render when grouped products are available', () => {
    getGroupedProducts.mockReturnValue([mockedProduct, mockedMsrpProduct]);
    const component = createComponent();
    expect(component).toMatchSnapshot();
    expect(component.find('ListItem')).toHaveLength(2);
  });
});
