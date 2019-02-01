import React from 'react';
import { shallow } from 'enzyme';
import CTAButtons from './index';

describe('<CTAButtonsWrapper />', () => {
  it('should render', () => {
    const wrapper = shallow(<CTAButtons />);
    expect(wrapper).toMatchSnapshot();
  });
});
