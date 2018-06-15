import React from 'react';
import PropTypes from 'prop-types';
import I18n from '@shopgate/pwa-common/components/I18n';
import Grid from '@shopgate/pwa-common/components/Grid';
import Image from '@shopgate/pwa-common/components/Image';
import Ellipsis from '@shopgate/pwa-common/components/Ellipsis';
import Availability from '@shopgate/pwa-ui-shared/Availability';
import Price from '@shopgate/pwa-ui-shared/Price';
import PriceStriked from '@shopgate/pwa-ui-shared/PriceStriked';
import PriceInfo from '@shopgate/pwa-ui-shared/PriceInfo';
import AddToCartPicker from '../../../AddToCartPicker';
import { ADD_TO_CART_BUTTON_TYPE_GROUPED } from '../../../../constants';
import styles from './style';
import connect from './connector';

/**
 * The Product component to render a single grouped product.
 * @param {Object} props The component props.
 * @return {JSX}
 */
const Product = ({ product, handleAddToCart, addToCartButtonProps }) => (
  <Grid>
    <Grid.Item shrink={0} className={styles.imageContainer}>
      <Image itemProp="image" src={product.featuredImageUrl} alt={product.name} />
    </Grid.Item>
    <Grid.Item grow={4} className={styles.metaContainer}>
      <Ellipsis className={styles.headline}>{product.name}</Ellipsis>
      <Availability
        className={styles.availability}
        showWhenAvailable
        text={product.availability.text}
        state={product.availability.state}
      />
    </Grid.Item>
    <Grid.Item grow={1} className={styles.buttonContainer}>
      <AddToCartPicker
        buttonProps={{
          ...addToCartButtonProps,
          type: ADD_TO_CART_BUTTON_TYPE_GROUPED,
        }}
        className={styles.button}
        handleAddToCart={handleAddToCart}
        productId={product.id}
        stock={product.stock}
      />
      {(product.price.msrp > 0 && product.price.unitPrice !== product.price.msrp) && (
        <div className={styles.priceStrikedContainer}>
          <I18n.Text
            className={styles.msrpLabel}
            string="price.msrp"
          />
          <PriceStriked
            value={product.price.msrp}
            currency={product.price.currency}
            className={styles.priceStriked}
          />
        </div>
      )}
      {(!product.price.msrp && product.price.unitPriceStriked > 0) && (
        <PriceStriked
          value={product.price.unitPriceStriked}
          currency={product.price.currency}
          className={styles.priceStriked}
        />
      )}
      <Price
        className={styles.price}
        currency={product.price.currency}
        discounted={!!product.price.discount}
        unitPrice={product.price.unitPrice}
        unitPriceMin={product.price.unitPriceMin}
      />
      {product.price.info && (
        <PriceInfo text={product.price.info} className={styles.priceInfo} />
      )}
    </Grid.Item>
  </Grid>
);

Product.propTypes = {
  handleAddToCart: PropTypes.func.isRequired,
  product: PropTypes.shape().isRequired,
  addToCartButtonProps: PropTypes.shape(),
};

Product.defaultProps = {
  addToCartButtonProps: {},
};

export default connect(Product);
