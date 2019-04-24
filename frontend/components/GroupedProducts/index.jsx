import React from 'react';
import PropTypes from 'prop-types';
import List from '@shopgate/pwa-common/components/List';
import { hasFavorites, renderFlatButtons } from '../../helpers';
import Product from './components/Product/index';
import styles from './style';

/**
 * The GroupedProducts component.
 * @param {props} param The component props.
 * @return {JSX}
 */
const GroupedProducts = ({ products, conditioner }) => {
  if (!products.length) {
    return null;
  }

  return (
    <List className={styles.productList}>
      {products.map(product => (
        <List.Item className={styles.productListItem} key={product.id}>
          <Product
            conditioner={conditioner}
            product={product}
            hasFavorites={hasFavorites()}
            renderFlatButtons={renderFlatButtons()}
          />
        </List.Item>
      ))}
    </List>
  );
};

GroupedProducts.propTypes = {
  conditioner: PropTypes.shape().isRequired,
  products: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default GroupedProducts;
