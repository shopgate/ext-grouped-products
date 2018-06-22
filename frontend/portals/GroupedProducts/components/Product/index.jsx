import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Grid from '@shopgate/pwa-common/components/Grid';
import Image from '@shopgate/pwa-common/components/Image';
import Ellipsis from '@shopgate/pwa-common/components/Ellipsis';
import FavoritesButton from '@shopgate/pwa-ui-shared/FavoritesButton';
import Availability from '@shopgate/pwa-ui-shared/Availability';
import Portal from '@shopgate/pwa-common/components/Portal';
import AddToCartPicker from '../../../../components/AddToCartPicker/index';
import ProductPrice from './components/ProductPrice/index';
import styles from './style';
import connect from './connector';
import { ADD_TO_CART_BUTTON_TYPE_GROUPED } from '../../../../constants';
import * as portals from '../../../../constants/portals';

/**
 * The Product component to render a single grouped product.
 * @param {Object} props The component props.
 * @return {Fragment}
 */
const Product = ({
  product, handleAddToCart, addToCartButtonProps, hasFavorites, isFavorite, renderFlatButtons,
}) => {
  const props = {
    productId: product.id,
  };
  return (
    <Fragment>
      <Portal name={portals.GROUPED_PRODUCT_BEFORE} props={props} />
      <Portal name={portals.GROUPED_PRODUCT} props={props}>
        <Grid>
          <Grid.Item shrink={0} className={styles.imageContainer}>
            <Portal name={portals.GROUPED_PRODUCT_IMAGE_BEFORE} props={props} />
            <Portal name={portals.GROUPED_PRODUCT_IMAGE} props={props}>
              <Image itemProp="image" src={product.featuredImageUrl} alt={product.name} />
            </Portal>
            <Portal name={portals.GROUPED_PRODUCT_IMAGE_AFTER} props={props} />
          </Grid.Item>
          <Grid.Item grow={4} className={styles.metaContainer}>
            <Portal name={portals.GROUPED_PRODUCT_META_BEFORE} props={props} />
            <Portal name={portals.GROUPED_PRODUCT_META} props={props}>
              <Portal name={portals.GROUPED_PRODUCT_NAME_BEFORE} props={props} />
              <Portal name={portals.GROUPED_PRODUCT_NAME} props={props}>
                <Ellipsis className={styles.headline}>{product.name}</Ellipsis>
              </Portal>
              <Portal name={portals.GROUPED_PRODUCT_NAME_AFTER} props={props} />
              {
                /* When the favorite list is active the space in the AddToCartButton
                 * column is limited,
                 * since it hosts the FavoritesButton. In this situation the prices
                 * are rendered here. */
              }
              { hasFavorites && (
                <ProductPrice price={product.price} renderLine />
              )}
              <Portal name={portals.GROUPED_PRODUCT_AVAILABILITY_BEFORE} props={props} />
              <Portal name={portals.GROUPED_PRODUCT_AVAILABILITY} props={props}>
                <Availability
                  className={styles.availability}
                  showWhenAvailable
                  text={product.availability.text}
                  state={product.availability.state}
                />
              </Portal>
              <Portal name={portals.GROUPED_PRODUCT_AVAILABILITY_AFTER} props={props} />
            </Portal>
            <Portal name={portals.GROUPED_PRODUCT_META_AFTER} props={props} />
          </Grid.Item>
          <Grid.Item
            grow={0}
            className={hasFavorites ? styles.buttonContainerFav : styles.buttonContainer}
          >
            <Portal name={portals.GROUPED_PRODUCT_CTA_BEFORE} props={props} />
            <Portal name={portals.GROUPED_PRODUCT_CTA} props={props}>
              <Portal name={portals.GROUPED_PRODUCT_ADD_TO_CART_BEFORE} props={props} />
              <Portal name={portals.GROUPED_PRODUCT_ADD_TO_CART} props={props}>
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
              </Portal>
              <Portal name={portals.GROUPED_PRODUCT_ADD_TO_CART_AFTER} props={props} />
              { hasFavorites ? (
                <Fragment>
                  <Portal name={portals.GROUPED_PRODUCT_FAVORITES_BEFORE} props={props} />
                  <Portal name={portals.GROUPED_PRODUCT_FAVORITES} props={props}>
                    <FavoritesButton
                      active={isFavorite}
                      productId={product.id}
                      className={styles.favButton}
                      rippleClassName={styles.ripple}
                      noShadow={renderFlatButtons}
                    />
                  </Portal>
                  <Portal name={portals.GROUPED_PRODUCT_FAVORITES_AFTER} props={props} />
                </Fragment>
              ) : (
                <ProductPrice price={product.price} />
              )}
            </Portal>
            <Portal name={portals.GROUPED_PRODUCT_CTA_AFTER} props={props} />
          </Grid.Item>
        </Grid>
      </Portal>
      <Portal name={portals.GROUPED_PRODUCT_AFTER} props={props} />
    </Fragment>
  );
};

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
