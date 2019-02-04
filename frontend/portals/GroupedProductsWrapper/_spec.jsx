import React from 'react';
import { shallow } from 'enzyme';
import GroupedProducts from './index';

describe('<GroupedProductsWrapper />', () => {
  it('should render', () => {
    const wrapper = shallow(<GroupedProducts />);
    expect(wrapper).toMatchSnapshot();
  });
});
