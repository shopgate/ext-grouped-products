import { connect } from 'react-redux';
import { getGroupedProducts } from '../../selectors';

/**
 * Maps state to props.
 * @param {Object} state State.
 * @param {Object} props Props.
 * @returns {Object}
 */
const mapStateToProps = (state, props) => ({
  products: getGroupedProducts(state, props),
});

export default connect(mapStateToProps);
