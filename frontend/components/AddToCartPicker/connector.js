import { connect } from 'react-redux';
import addProductsToCart from '@shopgate/pwa-common-commerce/cart/actions/addProductsToCart';

/**
 * Connects the dispatch function to a callable function in the props.
 * @param {Function} dispatch The redux dispatch function.
 * @param {Object} props The component props.
 * @return {Object} The extended component props.
 */
const mapDispatchToProps = (dispatch, { productId }) => ({
  addProductToCart: (quantity) => {
    dispatch(addProductsToCart([{
      productId,
      quantity,
    }]));
  },
});

export default connect(null, mapDispatchToProps);
