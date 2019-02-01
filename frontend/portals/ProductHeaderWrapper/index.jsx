import React from 'react';
import { RouteContext } from '@shopgate/pwa-common/context';
import { hex2bin } from '@shopgate/pwa-common/helpers/data';
import connect from './connector';

import ProductHeader from '../../components/ProductHeader';

const ProductHeaderContainer = connect(({
  isRendered,
}) => (
  <ProductHeader isRendered={isRendered} />
));

/**
 * Renders ProductHeader component in product.header.before portal
 * @param {Object} params RouteContext params
 * @returns {JSX}
 */
const ProductHeaderWrapper = () => (
  <RouteContext.Consumer>
    {({ params }) => (
      <div>
        <ProductHeaderContainer productId={hex2bin(params.productId)} />
      </div>
    )}
  </RouteContext.Consumer>
);

export default ProductHeaderWrapper;
