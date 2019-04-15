import { withPageProductId } from '@shopgate-ps/pwa-extension-kit/connectors';
import { connect } from 'react-redux';
import { hasGroupedProducts } from "../../selectors";

const ProductHeader = ({ children, hasGroupedProducts }) => {
    if (hasGroupedProducts) {
        return null;
    }

    return children;
}

const mapStateToProps = (state, props) => ({
    hasGroupedProducts: hasGroupedProducts(state, props)
});

const ConnectedProductHeader = connect(mapStateToProps)(ProductHeader);

export default withPageProductId(ConnectedProductHeader);
