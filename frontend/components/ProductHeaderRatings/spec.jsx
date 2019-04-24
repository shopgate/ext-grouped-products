import React from 'react';
import { shallow } from 'enzyme';
import ProductHeader from './index';

describe('<ProductHeaderRatings />', () => {
  it('should render', () => {
    const wrapper = shallow(<ProductHeader />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('div').exists()).toBe(true);
  });
});
