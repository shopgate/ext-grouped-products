import React from 'react';
import { shallow } from 'enzyme';
import ProductHeader from './index';

jest.mock('../../config', () => ({}), { virtual: true })

describe('<ProductHeaderBefore />', () => {
  it('should render', () => {
    const wrapper = shallow(<ProductHeader />);
    expect(wrapper).toMatchSnapshot();
  });
});
