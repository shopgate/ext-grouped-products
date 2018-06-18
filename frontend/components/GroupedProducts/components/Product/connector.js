import { connect } from 'react-redux';
import addProductsToCart from '@shopgate/pwa-common-commerce/cart/actions/addProductsToCart';
import { isGroupedProductOrderable, isProductOnFavoriteList } from '../../../../selectors';

/**
 * Maps the contents of the state to the component props.
 * @param {Object} state The current application state.
 * @param {Object} props The component props.
 * @return {Object} The extended component props.
 */
const mapStateToProps = (state, { product }) => ({
  addToCartButtonProps: {
    isOrderable: isGroupedProductOrderable(state, { productId: product.id }),
    isDisabled: !isGroupedProductOrderable(state, { productId: product.id }),
  },
  isFavorite: isProductOnFavoriteList(state, { productId: product.id }),
});

/**
 * Connects the dispatch function to a callable function in the props.
 * @param {Function} dispatch The redux dispatch function.
 * @param {Object} props The component props.
 * @return {Object} The extended component props.
 */
const mapDispatchToProps = (dispatch, { product }) => ({
  handleAddToCart: (quantity) => {
    dispatch(addProductsToCart([{
      productId: product.id,
      quantity,
    }]));
  },
});

export default connect(mapStateToProps, mapDispatchToProps);
