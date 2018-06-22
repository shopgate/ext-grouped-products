import { createWrappedComponent } from '../../components/mockStore';
import {
  mockedState,
  mockedStateWithRegularProduct,
} from '../../components/mock';
import ProductHeader from './index';

/**
 * Creates a component with a provided store state.
 * @param {Object} state A mocked state.
 * @return {ReactWrapper}
 */
const createComponent = state => createWrappedComponent(ProductHeader, state);

describe('<ProductHeader />', () => {
  it('should not render when the current product does not have children', () => {
    const component = createComponent(mockedStateWithRegularProduct);

    expect(component).toMatchSnapshot();
    expect(component.find(ProductHeader).html()).toBe(null);
  });

  it('should not render when the current product has children', () => {
    const component = createComponent(mockedState);

    expect(component).toMatchSnapshot();
    expect(component.find('Rating').exists()).toBe(true);
  });
});
