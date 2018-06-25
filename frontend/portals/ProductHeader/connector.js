import { connect } from 'react-redux';
import { hasGroupedProducts } from '../../selectors';

/**
 * Maps the contents of the state to the component props.
 * @param {Object} state The current application state.
 * @return {Object} The extended component props.
 */
const mapStateToProps = state => ({
  isRendered: hasGroupedProducts(state),
});

export default connect(mapStateToProps);