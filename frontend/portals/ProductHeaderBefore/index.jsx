import React from 'react';
import { withPageProductId } from '@shopgate-ps/pwa-extension-kit/connectors';
import connect from './connector';

import ProductHeaderRatings from '../../components/ProductHeaderRatings';

const ProductHeaderContainer = connect(({
  hasGroupedProducts,
}) => {
  if (!hasGroupedProducts) {
    return null;
  }

  return <ProductHeaderRatings />;
});

export default withPageProductId(ProductHeaderContainer);
