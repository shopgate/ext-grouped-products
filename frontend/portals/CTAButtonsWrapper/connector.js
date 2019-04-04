import { connect } from 'react-redux';
import {
  getCurrentProduct,
  isProductOrderable,
} from '@shopgate/pwa-common-commerce/product/selectors/product';
import { isCurrentProductOnFavoriteList } from '@shopgate/pwa-common-commerce/favorites/selectors';
import { isProductPageLoading } from '@shopgate/pwa-common-commerce/product/selectors/page';
import { addProductToCart } from './actions';
import { isMainAddToCartButtonVisible } from '../../selectors/index';

/**
 * Maps the contents of the state to the component props.
 * @param {Object} state The current application state.
 * @param {Object} props The current props.
 * @return {Object} The extended component props.
 */
const mapStateToProps = (state, props) => ({
  addToCartButtonProps: {
    isLoading: isProductPageLoading(state, props),
    isDisabled: !isProductOrderable(state, props),
  },
  isAddToCartButtonVisible: isMainAddToCartButtonVisible(state, props),
  isFavorite: isCurrentProductOnFavoriteList(state, props),
  product: getCurrentProduct(state, props) || {},
});

/**
 * Connects the dispatch function to a callable function in the props.
 * @param {Function} dispatch The redux dispatch function.
 * @param {Object} props props
 * @return {Object} The extended component props.
 */
const mapDispatchToProps = (dispatch, props) => ({
  handleAddToCart: quantity => dispatch(addProductToCart({
    productId: props.productId,
    options: props.options,
    quantity,
  })),
});
export default connect(mapStateToProps, mapDispatchToProps);
