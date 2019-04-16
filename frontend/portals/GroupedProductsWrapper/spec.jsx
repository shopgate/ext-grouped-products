import React from 'react';
import { shallow } from 'enzyme';
import GroupedProducts from './index';

jest.mock('../../components/GroupedProducts', () => props => <div {...props}>Hello world</div>);

describe('<GroupedProductsWrapper />', () => {
  it('should render', () => {
    const wrapper = shallow(<GroupedProducts />);
    expect(wrapper).toMatchSnapshot();
  });
});
