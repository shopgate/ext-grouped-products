import React from 'react';
import PropTypes from 'prop-types';
import FavoritesButton from '@shopgate/pwa-ui-shared/FavoritesButton';
import AddToCartPicker from '../AddToCartPicker';
import { ADD_TO_CART_BUTTON_TYPE_DEFAULT } from '../../constants';
import styles from './style';
import connect from './connector';

/**
 * Renders CTA buttons for product page (add to cart + toggle favorites).
 *
 * @param {Object} props Props.
 * @returns {JSX}
 * @constructor
 */
const CTAButtons = (props) => {
  const addToCartButtonProps = {
    ...props.addToCartButtonProps,
    buttonSize: styles.cartButtonSize,
    iconSize: styles.iconSize,
    type: ADD_TO_CART_BUTTON_TYPE_DEFAULT,
  };

  const { id, stock } = props.product;

  return (
    <div className={styles.buttons}>
      <FavoritesButton
        active={props.isFavorite}
        productId={id}
        className={styles.favButton}
        rippleClassName={styles.ripple}
      />

      { props.isAddToCartButtonVisible && (
        <AddToCartPicker
          buttonProps={addToCartButtonProps}
          handleAddToCart={props.handleAddToCart}
          productId={id}
          stock={stock}
        />
      )}
    </div>
  );
};

CTAButtons.propTypes = {
  handleAddToCart: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  addToCartButtonProps: PropTypes.shape(),
  isAddToCartButtonVisible: PropTypes.bool,
  product: PropTypes.shape(),
};

CTAButtons.defaultProps = {
  addToCartButtonProps: {},
  isAddToCartButtonVisible: true,
  product: {},
};

export default connect(CTAButtons);
