import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import mockRenderOptions from '@shopgate/pwa-common/helpers/mocks/mockRenderOptions';
import { basicProductState } from '@shopgate/pwa-common-commerce/product/mock';
import { ThemeContext } from '@shopgate/pwa-common/context';
import GroupedProductsWrapper from './index';

const mockedStore = configureStore();
jest.mock('../../components/GroupedProducts', () => () => (<div>GroupedProducts</div>));
const ProductContext = React.createContext({
  options: {},
  productId: 'mock',
  variantId: null,
  conditioner: {},
});
const mockThemeContext = {
  contexts: {
    ProductContext,
  },
};
/**
 * Creates Component
 * @return {ReactWrapper}
 */
const createComponent = () => mount(
  <ThemeContext.Provider value={mockThemeContext}>
    <Provider store={mockedStore({ product: basicProductState })}>
      <GroupedProductsWrapper />
    </Provider>
  </ThemeContext.Provider>,
  mockRenderOptions
);

describe('GroupedProducts', () => {
  it('should render', () => {
    const component = createComponent();
    expect(component.find('div').exists()).toBe(true);
    expect(component).toMatchSnapshot();
  });
});
