import addProductsToCart from '@shopgate/pwa-common-commerce/cart/actions/addProductsToCart';
import { createWrappedComponent } from '../../../../components/mockStore';
import {
  mockedState,
  mockedProduct,
  mockedNotOrderableProduct,
} from '../../../../components/mock';
import Product from './index';

jest.mock('@shopgate/pwa-common-commerce/cart/actions/addProductsToCart', () => jest.fn());

jest.mock(
  '@shopgate/pwa-ui-shared/AddToCartButton',
  () =>
    require.requireActual('../../../../components/AddToCartPicker/components/AddToCartButton/AddToCartButton.mock')
);

jest.useFakeTimers();

const mockedDispatch = jest.fn();

/**
 * Creates a component with a provided store state.
 * @param {Object} props Component props.
 * @return {ReactWrapper}
 */
const createComponent = props =>
  createWrappedComponent(Product, mockedState, props, mockedDispatch);

describe('<Product />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render as expected when the favorite list is not active', () => {
    const {
      id, name, featuredImageUrl, stock, availability,
    } = mockedProduct;

    const component = createComponent({
      product: mockedProduct,
      hasFavorites: false,
      conditioner: {},
    });

    expect(component).toMatchSnapshot();
    expect(component.find('FavoritesButton').exists()).toBe(false);

    const columns = component.find('GridItem');
    const imageColumn = columns.at(0);
    const metaColumn = columns.at(1);
    const buttonColumn = columns.at(2);

    expect(columns).toHaveLength(3);

    expect(imageColumn.find('Image').exists()).toBe(true);
    expect(imageColumn.find('Image').at(0).prop('src')).toEqual(featuredImageUrl);

    const { text, state } = availability;
    expect(metaColumn.find('Ellipsis').exists()).toBe(true);
    expect(metaColumn.find('Ellipsis').text()).toEqual(name);
    expect(metaColumn.find('Availability').exists()).toBe(true);
    expect(metaColumn.find('Availability').at(0).prop('text')).toEqual(text);
    expect(metaColumn.find('Availability').at(0).prop('state')).toEqual(state);

    expect(buttonColumn.find('AddToCartPicker').exists()).toBe(true);
    expect(buttonColumn.find('AddToCartPicker').at(0).prop('stock')).toEqual(stock);
    expect(buttonColumn.find('AddToCartPicker').at(0).prop('productId')).toBe(id);

    expect(buttonColumn.find('ProductPrice').exists()).toBe(true);

    // Connector
    const { isOrderable, isDisabled } = component.find('AddToCartPicker').prop('buttonProps');
    expect(isOrderable).toBe(true);
    expect(isDisabled).toBe(false);
  });

  it('should render as expected when the favorite list is not active', () => {
    const component = createComponent({
      product: mockedNotOrderableProduct,
      hasFavorites: true,
      conditioner: {},
    });

    expect(component).toMatchSnapshot();

    const columns = component.find('GridItem');
    const metaColumn = columns.at(1);
    const buttonColumn = columns.at(2);

    expect(columns).toHaveLength(3);

    expect(metaColumn.find('ProductPrice').exists()).toBe(true);
    expect(buttonColumn.find('FavoritesButton').exists()).toBe(true);

    // Connector
    const { isOrderable, isDisabled } = component.find('AddToCartPicker').prop('buttonProps');
    expect(isOrderable).toBe(false);
    expect(isDisabled).toBe(true);
  });

  it('should render as expected with regular buttons', () => {
    const component = createComponent({
      product: mockedProduct,
      hasFavorites: true,
      renderFlatButtons: false,
      conditioner: {},
    });

    expect(component).toMatchSnapshot();
    expect(component.find('AddToCartPicker').prop('buttonProps').noShadow).toBe(false);
    expect(component.find('FavoritesButton').prop('noShadow')).toBe(false);
  });

  it('should render as expected with flat buttons', () => {
    const component = createComponent({
      product: mockedProduct,
      hasFavorites: true,
      renderFlatButtons: true,
      conditioner: {},
    });

    expect(component).toMatchSnapshot();
    expect(component.find('AddToCartPicker').prop('buttonProps').noShadow).toBe(true);
    expect(component.find('FavoritesButton').prop('noShadow')).toBe(true);
  });

  it('should dispatch the addProductsToCart action like expected', () => {
    const component = createComponent({
      product: mockedProduct,
      conditioner: {},
    });
    const handleAddToCart = component.find('Product').prop('handleAddToCart');

    const quantity = 5;
    const productId = mockedProduct.id;

    handleAddToCart(quantity);

    expect(mockedDispatch).toHaveBeenCalledTimes(1);
    expect(mockedDispatch).toHaveBeenLastCalledWith(addProductsToCart([
      productId,
      quantity,
    ]));
  });
});
