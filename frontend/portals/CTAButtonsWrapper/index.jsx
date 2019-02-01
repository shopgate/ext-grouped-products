import React from 'react';
import { RouteContext } from '@shopgate/pwa-common/context';
import { hex2bin } from '@shopgate/pwa-common/helpers/data';
import connect from './connector';

import CTAButtons from '../../components/CTAButtons';

export const CTAButtonsContainer = connect(({
  addToCartButtonProps,
  isAddToCartButtonVisible,
  isFavorite,
  product,
  handleAddToCart,
}) => (
  <CTAButtons
    addToCartButtonProps={addToCartButtonProps}
    isAddToCartButtonVisible={isAddToCartButtonVisible}
    isFavorite={isFavorite}
    product={product}
    handleAddToCart={handleAddToCart}
  />
));

/**
 * Renders CTAButtons component in product.ctas portal
 * @param {Object} params RouteContext params
 * @returns {JSX}
 */
const CTAButtonsWrapper = () => (
  <RouteContext.Consumer>
    {({ params }) => (
      <div>
        <CTAButtonsContainer productId={hex2bin(params.productId)} />
      </div>
    )}
  </RouteContext.Consumer>
);

export default CTAButtonsWrapper;
