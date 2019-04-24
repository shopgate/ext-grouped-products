import React from 'react';
import Rating from './components/Rating/index';
import styles from './style';

/**
 * The ProductHeaderRatings component. It's supposed to hide the default header
 * when the current active product has grouped products and render necessary elements.
 * @param {Object} props The component props.
 * @param {boolean} props.isRendered Should the component be rendered.
 * @return {JSX}
 */
const ProductHeaderRatings = () => (
  <div className={styles.content}>
    <Rating />
  </div>
);

export default ProductHeaderRatings;
