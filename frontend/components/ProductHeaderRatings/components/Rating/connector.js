import { connect } from 'react-redux';
import { getBaseProductRating } from "../../../../selectors";

/**
 * Maps the contents of the state to the component props.
 * @param {Object} state The current application state.
 * @param {Object} props props.
 * @return {Object} The extended component props.
 */
const mapStateToProps = (state, props) => ({
  rating: getBaseProductRating(state, props),
});

export default connect(mapStateToProps);
