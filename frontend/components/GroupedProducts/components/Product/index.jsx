import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@shopgate/pwa-common/components/Grid';
import Image from '@shopgate/pwa-common/components/Image';
import Ellipsis from '@shopgate/pwa-common/components/Ellipsis';
import Availability from '@shopgate/pwa-ui-shared/Availability';
import Price from '@shopgate/pwa-ui-shared/Price';
import PriceStriked from '@shopgate/pwa-ui-shared/PriceStriked';
import PriceInfo from '@shopgate/pwa-ui-shared/PriceInfo';
import AddToCartButton from '../AddToCartButton';
import styles from './style';

/**
 * The Product component to render a single grouped product.
 * @param {Object} props The component props.
 * @return {JSX}
 */
const Product = ({ product }) => (
  <Grid>
    <Grid.Item shrink={0} className={styles.imageContainer}>
      <Image itemProp="image" forcePlaceholder src={product.featuredImageUrl} alt={product.name} />
    </Grid.Item>
    <Grid.Item grow={4} className={styles.metaContainer}>
      <Ellipsis className={styles.headline}>{product.name}</Ellipsis>
      <Availability
        className={styles.availability}
        showWhenAvailable
        text="Available"
        state="ok"
      />
    </Grid.Item>
    <Grid.Item grow={1} className={styles.buttonContainer}>
      <AddToCartButton className={styles.button} stock={product.stock} />
      <Price
        className={styles.price}
        currency={product.price.currency}
        discounted={!!product.price.discount}
        unitPrice={product.price.unitPrice}
        unitPriceMin={product.price.unitPriceMin}
      />
      {(product.price.msrp > 0 && product.price.unitPrice !== product.price.msrp) && (
        <PriceStriked
          value={product.price.msrp}
          currency={product.price.currency}
          className={styles.priceStriked}
        />
      )}
      {(!product.price.msrp && product.price.unitPriceStriked > 0) && (
        <PriceStriked
          value={product.price.unitPriceStriked}
          currency={product.price.currency}
          className={styles.priceStriked}
        />
      )}
      {product.price.info && (
        <PriceInfo text={product.price.info} className={styles.priceInfo} />
      )}
    </Grid.Item>
  </Grid>
);

Product.propTypes = {
  product: PropTypes.shape().isRequired,
};

export default Product;
