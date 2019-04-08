import React from 'react';
import { ThemeContext } from '@shopgate/pwa-common/context';
import connect from './connector';

import GroupedProducts from '../../components/GroupedProducts';

const GroupedProductsContainer = connect(({
  products,
  conditioner,
}) => (
  <GroupedProducts products={products} conditioner={conditioner} />
));

/**
 * Renders GroupedProducts component in product.variant-select.before portal
 * @returns {JSX}
 */
const GroupedProductsWrapper = () => (
  <ThemeContext.Consumer>
    {({ contexts: { ProductContext } }) => (
      <ProductContext.Consumer>
        {({ productId, variantId, conditioner }) => (
          <div>
            <GroupedProductsContainer
              productId={variantId || productId}
              conditioner={conditioner}
            />
          </div>
          )
        }
      </ProductContext.Consumer>
    )}
  </ThemeContext.Consumer>
);

export default GroupedProductsWrapper;
