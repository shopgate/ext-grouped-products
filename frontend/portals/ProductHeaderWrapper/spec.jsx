import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import mockRenderOptions from '@shopgate/pwa-common/helpers/mocks/mockRenderOptions';
import { basicProductState } from '@shopgate/pwa-common-commerce/product/mock';
import { RouteContext } from '@shopgate/pwa-common/context';
import ProductHeaderWrapper from './index';

const mockedStore = configureStore();
jest.mock('../../components/ProductHeader', () => () => (<div>ProductHeader</div>));

/**
 * Creates component
 * @return {ReactWrapper}
 */
const createComponent = () => mount(
  <RouteContext.Provider value={{ params: { product: 'product_one' } }}>
    <Provider store={mockedStore({ product: basicProductState })}>
      <ProductHeaderWrapper />
    </Provider>
  </RouteContext.Provider>,
  mockRenderOptions
);

describe('ManualsSection', () => {
  it('should render with correct config passed', () => {
    const component = createComponent();
    expect(component.find('div').exists()).toBe(true);
    expect(component).toMatchSnapshot();
  });
});

