import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@shopgate/pwa-common/components/Grid';
import Image from '@shopgate/pwa-common/components/Image';
import Ellipsis from '@shopgate/pwa-common/components/Ellipsis';
import FavoritesButton from '@shopgate/pwa-ui-shared/FavoritesButton';
import Availability from '@shopgate/pwa-ui-shared/Availability';
import { ADD_TO_CART_BUTTON_TYPE_GROUPED } from '../../../../constants';
import AddToCartPicker from '../../../../components/AddToCartPicker/index';
import ProductPrice from './components/ProductPrice/index';
import styles from './style';
import connect from './connector';

/**
 * The Product component to render a single grouped product.
 * @param {Object} props The component props.
 * @return {JSX}
 */
const Product = ({
  product, handleAddToCart, addToCartButtonProps, hasFavorites, isFavorite, renderFlatButtons,
}) => (
  <Grid>
    <Grid.Item shrink={0} className={styles.imageContainer}>
      <Image itemProp="image" src={product.featuredImageUrl} alt={product.name} />
    </Grid.Item>
    <Grid.Item grow={4} className={styles.metaContainer}>
      <Ellipsis className={styles.headline}>{product.name}</Ellipsis>
      { /* When the favorite list is active the space in the AddToCartButton column is limited,
          since it hosts the FavoritesButton. In this situation the prices are rendered here. */ }
      { hasFavorites && (
        <ProductPrice price={product.price} renderLine />
      )}
      <Availability
        className={styles.availability}
        showWhenAvailable
        text={product.availability.text}
        state={product.availability.state}
      />
    </Grid.Item>
    <Grid.Item
      grow={0}
      className={hasFavorites ? styles.buttonContainerFav : styles.buttonContainer}
    >
      <AddToCartPicker
        buttonProps={{
          ...addToCartButtonProps,
          noShadow: renderFlatButtons,
          type: ADD_TO_CART_BUTTON_TYPE_GROUPED,
        }}
        handleAddToCart={handleAddToCart}
        productId={product.id}
        stock={product.stock}
      />
      { hasFavorites ? (
        <FavoritesButton
          active={isFavorite}
          productId={product.id}
          className={styles.favButton}
          rippleClassName={styles.ripple}
          noShadow={renderFlatButtons}
        />
      ) : (
        <ProductPrice price={product.price} />
      )}
    </Grid.Item>
  </Grid>
);

Product.propTypes = {
  handleAddToCart: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  product: PropTypes.shape().isRequired,
  addToCartButtonProps: PropTypes.shape(),
  hasFavorites: PropTypes.bool,
  renderFlatButtons: PropTypes.bool,
};

Product.defaultProps = {
  addToCartButtonProps: {},
  hasFavorites: false,
  renderFlatButtons: false,
};

export default connect(Product);
