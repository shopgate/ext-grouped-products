import React from 'react';
import { mount } from 'enzyme';
import ProductHeader from './index';

jest.mock('@shopgate-ps/pwa-extension-kit/connectors', () => ({
  withPageProductId: Component => props => <Component {...props} />,
}));

let mockedHasGroupedProducts = false;
jest.mock('react-redux', () => ({
  connect: () => Component => props =>
    <Component hasGroupedProducts={mockedHasGroupedProducts} {...props} />,
}));

describe('ProductHeader', () => {
  const Children = () => <div>Hello world</div>;
  it('should return null when product has grouped products', () => {
    mockedHasGroupedProducts = true;
    const component = mount(<ProductHeader><Children /></ProductHeader>);
    expect(component.html()).toBe(null);
  });

  it('should return original header when product has no grouped products', () => {
    mockedHasGroupedProducts = false;
    const component = mount(<ProductHeader><Children /></ProductHeader>);
    expect(component.find('div').exists()).toBe(true);
    expect(component).toMatchSnapshot();
  });
});
