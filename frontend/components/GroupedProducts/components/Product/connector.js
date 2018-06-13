import { connect } from 'react-redux';
import { getCurrentBaseProduct } from '@shopgate/pwa-common-commerce/product/selectors/product';

/**
 * Maps state to props.
 * @param {Object} state State.
 * @returns {Object}
 */
const mapStateToProps = state => ({
  baseProduct: getCurrentBaseProduct(state),
});

export default connect(mapStateToProps);
