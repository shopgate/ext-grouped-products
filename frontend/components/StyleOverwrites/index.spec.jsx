import React from 'react';
import { shallow } from 'enzyme';
import StyleOverwrites from './index';

describe('<StyleOverwrites />', () => {
  it('should render as expected', () => {
    const component = shallow(<StyleOverwrites />);
    expect(component).toMatchSnapshot();
  });
});
