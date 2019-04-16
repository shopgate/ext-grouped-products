import React from 'react';
import { shallow } from 'enzyme';
import { renderFlatButtons } from '../../helpers/index';
import CTAButtons from './index';

jest.mock('../../components/AddToCartPicker/index', () => props => <div {...props}>Hello world</div>);
jest.mock('../../helpers/index', () => ({
  renderFlatButtons: jest.fn(),
}));
const handleAddToCart = jest.fn();
describe('<CTAButtons />', () => {
  it('should Render both buttons when isAddToCartButtonVisible is true', () => {
    const wrapper = shallow(<CTAButtons
      handleAddToCart={handleAddToCart}
      isFavorite
      isAddToCartButtonVisible
      renderFlatButtons={renderFlatButtons}
    />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should only render FavoritesButton when isAddToCartButtonVisible is not true', () => {
    const wrapper = shallow(<CTAButtons
      handleAddToCart={handleAddToCart}
      isFavorite
      isAddToCartButtonVisible={false}
      renderFlatButtons={renderFlatButtons}
    />);
    expect(wrapper).toMatchSnapshot();
  });
});
