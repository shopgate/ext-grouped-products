import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import cloneDeep from 'lodash/cloneDeep';
import set from 'lodash/set';
import { mount } from 'enzyme';
import mockRenderOptions from '@shopgate/pwa-common/helpers/mocks/mockRenderOptions';
import { mockedState } from './mock';
import GroupedProducts from './index';

const mockedStore = configureStore();

/**
 * Creates component with provided store state.
 * @param {Object} state A mocked state.
 * @return {ReactWrapper}
 */
const createComponent = (state) => {
  const store = mockedStore(state);

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
    const state = set(cloneDeep(mockedState), ['product', 'resultsByHash'], {});
    const component = createComponent(state);
    expect(component).toMatchSnapshot();
    expect(component.find('GroupedProducts').html()).toBe(null);
  });

  it('should render when grouped products are available', () => {
    const component = createComponent(mockedState);
    expect(component).toMatchSnapshot();
    expect(component.find('ListItem')).toHaveLength(5);
  });
});
