import React from 'react';
import { ThemeContext } from '@shopgate/pwa-common/context';
import connect from './connector';

import CTAButtons from '../../components/CTAButtons';

export const CTAButtonsContainer = connect(({
  addToCartButtonProps,
  isAddToCartButtonVisible,
  isFavorite,
  product,
  handleAddToCart,
  conditioner,
}) => (
  <CTAButtons
    addToCartButtonProps={addToCartButtonProps}
    isAddToCartButtonVisible={isAddToCartButtonVisible}
    isFavorite={isFavorite}
    product={product}
    handleAddToCart={handleAddToCart}
    conditioner={conditioner}
  />
));

/**
 * Renders CTAButtons component in product.ctas portal
 * @returns {JSX}
 */
const CTAButtonsWrapper = () => (
  <ThemeContext.Consumer>
    {({ contexts: { ProductContext } }) => (
      <ProductContext.Consumer>
        {({
          options, productId, variantId, conditioner,
        }) => (
          <CTAButtonsContainer
            conditioner={conditioner}
            productId={variantId || productId}
            options={options}
          />
        )}
      </ProductContext.Consumer>
    )}
  </ThemeContext.Consumer>
);

export default CTAButtonsWrapper;
