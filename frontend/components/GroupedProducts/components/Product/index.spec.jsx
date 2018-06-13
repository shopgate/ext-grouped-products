import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import mockRenderOptions from '@shopgate/pwa-common/helpers/mocks/mockRenderOptions';
import {
  mockedProduct,
  mockedMsrpProduct,
  mockedStrikePriceProduct,
  mockedNotOrderableProduct,
} from '../../mock';
import Product from './index';

const mockedStore = configureStore();

/**
 * Creates component with provided store state.
 * @param {Object} props Additional props.
 * @return {ReactWrapper}
 */
const createComponent = (props) => {
  const store = mockedStore({});

  return mount(
    <Provider store={store}>
      <Product
        {...props}
      />
    </Provider>,
    mockRenderOptions
  );
};

describe('<Product />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render a regular product as expected', () => {
    const {
      id, name, featuredImageUrl, stock, availability, price,
    } = mockedProduct;

    const component = createComponent({ product: mockedProduct });
    expect(component).toMatchSnapshot();
    const columns = component.find('GridItem');
    const imageColumn = columns.at(0);
    const metaColumn = columns.at(1);
    const buttonColumn = columns.at(2);

    expect(columns).toHaveLength(3);

    expect(imageColumn.find('Image').exists()).toBe(true);
    expect(imageColumn.find('Image').at(0).prop('src')).toEqual(featuredImageUrl);

    const { text, state } = availability;
    expect(metaColumn.find('Ellipsis').exists()).toBe(true);
    expect(metaColumn.find('Ellipsis').text()).toEqual(name);
    expect(metaColumn.find('Availability').exists()).toBe(true);
    expect(metaColumn.find('Availability').at(0).prop('text')).toEqual(text);
    expect(metaColumn.find('Availability').at(0).prop('state')).toEqual(state);

    expect(buttonColumn.find('AddToCartPicker').exists()).toBe(true);
    expect(buttonColumn.find('AddToCartPicker').at(0).prop('stock')).toEqual(stock);
    expect(buttonColumn.find('AddToCartPicker').at(0).prop('productId')).toBe(id);

    const { currency, unitPrice, unitPriceMin } = price;
    expect(buttonColumn.find('Price').exists()).toBe(true);
    expect(buttonColumn.find('Price').at(0).prop('currency')).toBe(currency);
    expect(buttonColumn.find('Price').at(0).prop('discounted')).toBe(false);
    expect(buttonColumn.find('Price').at(0).prop('unitPrice')).toBe(unitPrice);
    expect(buttonColumn.find('Price').at(0).prop('unitPriceMin')).toBe(unitPriceMin);
    expect(buttonColumn.find('PriceStriked').exists()).toBe(false);
  });

  it('should render a msrp discounted product as expected', () => {
    const { price } = mockedMsrpProduct;

    const component = createComponent({ product: mockedMsrpProduct });
    expect(component).toMatchSnapshot();
    const columns = component.find('GridItem');
    const imageColumn = columns.at(0);
    const metaColumn = columns.at(1);
    const buttonColumn = columns.at(2);
    expect(columns).toHaveLength(3);

    expect(imageColumn.find('Image').exists()).toBe(true);
    expect(metaColumn.find('Ellipsis').exists()).toBe(true);
    expect(metaColumn.find('Availability').exists()).toBe(true);
    expect(buttonColumn.find('AddToCartPicker').exists()).toBe(true);

    const {
      currency, unitPrice, unitPriceMin, msrp,
    } = price;
    expect(buttonColumn.find('PriceStriked').exists()).toBe(true);
    expect(buttonColumn.find('PriceStriked').at(0).prop('currency')).toBe(currency);
    expect(buttonColumn.find('PriceStriked').at(0).prop('value')).toBe(msrp);

    expect(buttonColumn.find('Price').exists()).toBe(true);
    expect(buttonColumn.find('Price').at(0).prop('currency')).toBe(currency);
    expect(buttonColumn.find('Price').at(0).prop('discounted')).toBe(true);
    expect(buttonColumn.find('Price').at(0).prop('unitPrice')).toBe(unitPrice);
    expect(buttonColumn.find('Price').at(0).prop('unitPriceMin')).toBe(unitPriceMin);
  });

  it('should render a strike price discounted product as expected', () => {
    const { price } = mockedStrikePriceProduct;

    const component = createComponent({ product: mockedStrikePriceProduct });
    expect(component).toMatchSnapshot();

    const columns = component.find('GridItem');
    const buttonColumn = columns.at(2);

    const {
      currency, unitPrice, unitPriceMin, unitPriceStriked, info,
    } = price;

    expect(buttonColumn.find('PriceStriked').exists()).toBe(true);
    expect(buttonColumn.find('PriceStriked').at(0).prop('currency')).toBe(currency);
    expect(buttonColumn.find('PriceStriked').at(0).prop('value')).toBe(unitPriceStriked);

    expect(buttonColumn.find('Price').exists()).toBe(true);
    expect(buttonColumn.find('Price').at(0).prop('currency')).toBe(currency);
    expect(buttonColumn.find('Price').at(0).prop('discounted')).toBe(true);
    expect(buttonColumn.find('Price').at(0).prop('unitPrice')).toBe(unitPrice);
    expect(buttonColumn.find('Price').at(0).prop('unitPriceMin')).toBe(unitPriceMin);

    expect(buttonColumn.find('PriceInfo').exists()).toBe(true);
    expect(buttonColumn.find('PriceInfo').at(0).prop('text')).toBe(info);
  });

  it('should render a not orderable product as expected', () => {
    const component = createComponent({ product: mockedNotOrderableProduct });
    expect(component).toMatchSnapshot();
  });
});
