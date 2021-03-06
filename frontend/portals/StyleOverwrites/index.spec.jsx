import React from 'react';
import { shallow } from 'enzyme';
import { THEME_GMD, THEME_IOS } from '../../constants/index';
import StyleOverwrites from './index';

jest.mock('@shopgate/pwa-ui-shared/Sheet/style', () => ({
  container: 'container',
  content: 'content',
}));

describe('<StyleOverwrites />', () => {
  it('should render as expected when the gmd theme is not active', () => {
    global.process.env.THEME = THEME_IOS;
    const component = shallow(<StyleOverwrites />);
    expect(component).toMatchSnapshot();
    expect(component.find('style').exists()).toBe(true);
  });

  it('should not render when the gmd theme is active', () => {
    global.process.env.THEME = THEME_GMD;
    const component = shallow(<StyleOverwrites />);
    expect(component).toMatchSnapshot();
    expect(component.find('style').exists()).toBe(false);
  });
});
