import { connect } from 'react-redux';
import { hasGroupedProducts } from '../../selectors';

// eslint-disable-next-line require-jsdoc
const mapStateToProps = (state, props) => ({
  hasGroupedProducts: hasGroupedProducts(state, props),
});

export default connect(mapStateToProps);
