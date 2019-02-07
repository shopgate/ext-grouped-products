import React from 'react';
import { RouteContext } from '@shopgate/pwa-common/context';
import { hex2bin } from '@shopgate/pwa-common/helpers/data';
import connect from './connector';

import GroupedProducts from '../../components/GroupedProducts';

const GroupedProductsContainer = connect(({
  products,
}) => (
  <GroupedProducts products={products} />
));

/**
 * Renders GroupedProducts component in product.variant-select.before portal
 * @returns {JSX}
 */
const GroupedProductsWrapper = () => (
  <RouteContext.Consumer>
    {({ params }) => (
      <div>
        <GroupedProductsContainer productId={hex2bin(params.productId)} />
      </div>
      )
    }
  </RouteContext.Consumer>
);

export default GroupedProductsWrapper;
