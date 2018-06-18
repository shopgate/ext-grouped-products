import setProductQuantity from '@shopgate/pwa-common-commerce/product/action-creators/setProductQuantity';
import {
  createWrappedComponent,
  getStoreFromWrappedComponent,
} from '../mockStore';
import {
  mockedState,
  mockedStateWithRegularProduct,
  mockedStateWithoutCurrentProductData,
} from '../mock';
import CTAButtons from './index';

const mockedAddCurrentProductAction = {
  type: 'MOCKED_ADD_CURRENT_PRODUCT_TO_CART',
};

jest.mock('@shopgate/pwa-common-commerce/cart/actions/addCurrentProductToCart', () => () => mockedAddCurrentProductAction);

/**
 * Creates a component with a provided store state.
 * @param {Object} state A mocked state.
 * @return {ReactWrapper}
 */
const createComponent = state => createWrappedComponent(CTAButtons, state);

describe('<CTAButtons />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.process.env.THEME = 'gmd';
  });

  it('should not render the AddToCartPicker for grouped products', () => {
    const component = createComponent(mockedState);

    expect(component).toMatchSnapshot();
    expect(component.find('FavoritesButton').exists()).toBe(true);
    expect(component.find('AddToCartPicker').exists()).toBe(false);
  });

  it('should render both buttons', () => {
    const component = createComponent(mockedStateWithRegularProduct);
    const store = getStoreFromWrappedComponent(component);

    expect(component).toMatchSnapshot();
    expect(component.find('FavoritesButton').exists()).toBe(true);

    const addToCartPicker = component.find('AddToCartPicker');
    expect(addToCartPicker.exists()).toBe(true);
    const addToCartHander = addToCartPicker.prop('handleAddToCart');
    expect(typeof addToCartHander).toBe('function');

    const quantity = 5;
    addToCartHander(quantity);

    const [quantityAction, addToCartAction] = store.getActions();
    expect(quantityAction).toEqual(setProductQuantity(quantity));
    expect(addToCartAction).toEqual(mockedAddCurrentProductAction);
  });

  it('should render both buttons when no "currentProduct" is available yet', () => {
    const component = createComponent(mockedStateWithoutCurrentProductData);

    expect(component).toMatchSnapshot();
    expect(component.find('FavoritesButton').exists()).toBe(true);
    expect(component.find('AddToCartPicker').exists()).toBe(true);
  });
});
