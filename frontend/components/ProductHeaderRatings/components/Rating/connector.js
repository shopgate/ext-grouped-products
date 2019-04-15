import { connect } from 'react-redux';
import { getProductRating } from '@shopgate/pwa-common-commerce/product/selectors/product';

/**
 * Maps the contents of the state to the component props.
 * @param {Object} state The current application state.
 * @param {Object} props props.
 * @return {Object} The extended component props.
 */
const mapStateToProps = (state, props) => ({
  rating: getProductRating(state, props),
});

export default connect(mapStateToProps);
