import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AddToCartButton from '@shopgate/pwa-ui-shared/AddToCartButton';
import styles from './style';

/**
 * The AddToCartButton for grouped products.
 */
class GPAddToCartButton extends Component {
  static propTypes = {
    stock: PropTypes.shape().isRequired,
  };

  handleAddToCart = () => {

  };

  /**
   * The render method.
   * @return {JSX}
   */
  render() {
    const { orderable } = this.props.stock;
    const isDisabled = false;
    const isLoading = false;

    return (
      <AddToCartButton
        className={styles.button}
        isOrderable={orderable}
        isDisabled={isDisabled}
        isLoading={isLoading}
        handleAddToCart={this.handleAddToCart}
      />
    );
  }
}

export default GPAddToCartButton;
