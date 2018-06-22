import { connect } from 'react-redux';
import {
  getCurrentProduct,
  isProductOrderable,
} from '@shopgate/pwa-common-commerce/product/selectors/product';
import { isCurrentProductOnFavoriteList } from '@shopgate/pwa-common-commerce/favorites/selectors';
import addCurrentProductToCart from '@shopgate/pwa-common-commerce/cart/actions/addCurrentProductToCart';
import setProductQuantity from '@shopgate/pwa-common-commerce/product/action-creators/setProductQuantity';
import {
  isProductPageLoading,
  isProductPageOrderable,
} from '@shopgate/pwa-common-commerce/product/selectors/page';
import { isMainAddToCartButtonVisible } from '../../selectors/index';

/**
 * Maps the contents of the state to the component props.
 * @param {Object} state The current application state.
 * @return {Object} The extended component props.
 */
const mapStateToProps = state => ({
  addToCartButtonProps: {
    isLoading: isProductPageLoading(state),
    isOrderable: isProductPageOrderable(state),
    isDisabled: !isProductOrderable(state),
  },
  isAddToCartButtonVisible: isMainAddToCartButtonVisible(state),
  isFavorite: isCurrentProductOnFavoriteList(state),
  product: getCurrentProduct(state) || {},
});

/**
 * Connects the dispatch function to a callable function in the props.
 * @param {Function} dispatch The redux dispatch function.
 * @return {Object} The extended component props.
 */
const mapDispatchToProps = dispatch => ({
  handleAddToCart: (quantity) => {
    dispatch(setProductQuantity(quantity));
    dispatch(addCurrentProductToCart());
  },
});

export default connect(mapStateToProps, mapDispatchToProps);
