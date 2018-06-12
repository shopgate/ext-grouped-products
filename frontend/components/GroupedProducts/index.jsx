import React from 'react';
import PropTypes from 'prop-types';
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
    <ul className={styles.container}>
      {products.map(({ name, id }) => (
        <li key={id}>{name}</li>
      ))}
    </ul>
  );
};

GroupedProducts.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default connect(GroupedProducts);
