import React from 'react';
import { shallow } from 'enzyme';
import ProductHeader from './index';

describe('<ProductHeaderBefore />', () => {
  it('should render', () => {
    const wrapper = shallow(<ProductHeader />);
    expect(wrapper).toMatchSnapshot();
  });
});
