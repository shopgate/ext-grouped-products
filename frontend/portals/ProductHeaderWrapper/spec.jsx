import React from 'react';
import { shallow } from 'enzyme';
import ProductHeader from './index';

describe('<ProductHeaderWrapper />', () => {
  it('should render', () => {
    const wrapper = shallow(<ProductHeader />);
    expect(wrapper).toMatchSnapshot();
  });
});
