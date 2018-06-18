import React from 'react';
import { mount } from 'enzyme';
import {
  mockedProduct,
  mockedMsrpProduct,
  mockedStrikePriceProduct,
} from '../../../../../mock';
import styles from './style';
import ProductPrice from './index';

describe('<ProductPrice />', () => {
  it('should render a regualar price as expected', () => {
    const { price } = mockedProduct;
    const { currency, unitPrice, unitPriceMin } = price;
    const component = mount(<ProductPrice price={price} />);

    expect(component).toMatchSnapshot();

    expect(component.find('Price').exists()).toBe(true);
    expect(component.find('Price').at(0).prop('currency')).toBe(currency);
    expect(component.find('Price').at(0).prop('discounted')).toBe(false);
    expect(component.find('Price').at(0).prop('unitPrice')).toBe(unitPrice);
    expect(component.find('Price').at(0).prop('unitPriceMin')).toBe(unitPriceMin);

    expect(component.find('PriceStriked').exists()).toBe(false);
  });

  it('should render an msrp discounted price as expected', () => {
    const { price } = mockedMsrpProduct;
    const {
      currency, unitPrice, unitPriceMin, msrp,
    } = price;

    const component = mount(<ProductPrice price={price} />);
    expect(component).toMatchSnapshot();

    expect(component.find('PriceStriked').exists()).toBe(true);
    expect(component.find('PriceStriked').at(0).prop('currency')).toBe(currency);
    expect(component.find('PriceStriked').at(0).prop('value')).toBe(msrp);

    expect(component.find('Price').exists()).toBe(true);
    expect(component.find('Price').at(0).prop('currency')).toBe(currency);
    expect(component.find('Price').at(0).prop('discounted')).toBe(true);
    expect(component.find('Price').at(0).prop('unitPrice')).toBe(unitPrice);
    expect(component.find('Price').at(0).prop('unitPriceMin')).toBe(unitPriceMin);
  });

  it('should render a strike price discounted price as expected', () => {
    const { price } = mockedStrikePriceProduct;
    const {
      currency, unitPrice, unitPriceMin, unitPriceStriked, info,
    } = price;
    const component = mount(<ProductPrice price={price} />);

    expect(component).toMatchSnapshot();

    expect(component.find('PriceStriked').exists()).toBe(true);
    expect(component.find('PriceStriked').at(0).prop('currency')).toBe(currency);
    expect(component.find('PriceStriked').at(0).prop('value')).toBe(unitPriceStriked);

    expect(component.find('Price').exists()).toBe(true);
    expect(component.find('Price').at(0).prop('currency')).toBe(currency);
    expect(component.find('Price').at(0).prop('discounted')).toBe(true);
    expect(component.find('Price').at(0).prop('unitPrice')).toBe(unitPrice);
    expect(component.find('Price').at(0).prop('unitPriceMin')).toBe(unitPriceMin);

    expect(component.find('PriceInfo').exists()).toBe(true);
    expect(component.find('PriceInfo').at(0).prop('text')).toBe(info);
  });

  it('should pick the correct class when rendered as a line', () => {
    const { price } = mockedProduct;
    const component = mount(<ProductPrice renderLine price={price} />);
    expect(component).toMatchSnapshot();
    expect(component.find('div').first().prop('className')).toBe(styles.containerLine);
  });

  it('should pick the correct class when rendered as a column', () => {
    const { price } = mockedProduct;
    const component = mount(<ProductPrice price={price} />);
    expect(component).toMatchSnapshot();
    expect(component.find('div').first().prop('className')).toBe(styles.containerColumn);
  });
});
