import { connect } from 'react-redux';
import { getGroupedProducts } from '../../selectors';

/**
 * Maps state to props.
 * @param {Object} state State.
 * @returns {Object}
 */
const mapStateToProps = state => ({
  products: getGroupedProducts(state),
});

export default connect(mapStateToProps);
