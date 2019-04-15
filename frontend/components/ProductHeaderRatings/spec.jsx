import React from 'react';
import { shallow } from 'enzyme';
import ProductHeader from './index';

describe('<ProductHeaderRatings />', () => {
  it('should render when isRendered is true', () => {
    const wrapper = shallow(<ProductHeader
      isRendered
    />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('div').exists()).toBeTruthy();
  });
  it('should not render when isRendered is false', () => {
    const wrapper = shallow(<ProductHeader
      isRendered={false}
    />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('div').exists()).toBeFalsy();
  });
});
