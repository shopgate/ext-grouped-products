import React from 'react';
import { shallow } from 'enzyme';
import { hasFavorites, renderFlatButtons } from '../../helpers/index';
import GroupedProducts from './index';

jest.mock('../../helpers/index', () => ({
  renderFlatButtons: jest.fn(),
  hasFavorites: jest.fn(),
}));

const withProducts = [
  { id: '1234' },
  { id: '1337' },
];
const withoutProducts = [];

describe('<GroupedProducts />', () => {
  it('should not render if there is no products', () => {
    const wrapper = shallow(<GroupedProducts
      products={withoutProducts}
      renderFlatButtons={renderFlatButtons}
      hasFavorites={hasFavorites}
    />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('div').exists()).toBeFalsy();
  });

  it('should render if there are products', () => {
    const wrapper = shallow(<GroupedProducts
      products={withProducts}
      renderFlatButtons={renderFlatButtons}
      hasFavorites={hasFavorites}
    />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('List').exists()).toBeTruthy();
  });
});
