import { connect } from 'react-redux';
import { hasGroupedProducts } from '../../selectors';

/**
 * Maps the contents of the state to the component props.
 * @param {Object} state The current application state.
 * @param {Object} props Props.
 * @return {Object} The extended component props.
 */
const mapStateToProps = (state, props) => ({
  isRendered: hasGroupedProducts(state, props),
});

export default connect(mapStateToProps);
