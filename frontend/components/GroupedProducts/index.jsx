import React from 'react';
import PropTypes from 'prop-types';
import List from '@shopgate/pwa-common/components/List';
import Product from './components/Product';
import connect from './connector';
import styles from './style';

/**
 * The GroupedProducts component.
 * @param {props} param The component props.
 * @return {JSX}
 */
const GroupedProducts = ({ products }) => {
  if (!products.length) {
    return null;
  }

  return (
    <List className={styles.productList}>
      {products.map(product => (
        <List.Item className={styles.productListItem} key={product.id}>
          <Product product={product} />
        </List.Item>
      ))}
    </List>
  );
};

GroupedProducts.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default connect(GroupedProducts);
