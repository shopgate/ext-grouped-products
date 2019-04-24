import { withPageProductId } from '@shopgate-ps/pwa-extension-kit/connectors';
import connect from './connector';

// eslint-disable-next-line require-jsdoc
const ProductHeader = ({ children, hasGroupedProducts }) => {
  if (hasGroupedProducts) {
    return null;
  }

  return children;
};

const ConnectedProductHeader = connect(ProductHeader);

export default withPageProductId(ConnectedProductHeader);
