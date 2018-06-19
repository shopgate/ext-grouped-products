import React from 'react';
import PropTypes from 'prop-types';
import Rating from './components/Rating';
import connect from './connector';
import styles from './style';

/**
 * The ProductHeader component. It's supposed to hide the default header
 * when the current active product has grouped products and render necessary elements.
 * @param {Object} props The component props.
 * @param {boolean} props.isRendered Should the component be rendered.
 * @return {JSX}
 */
const ProductHeader = ({ isRendered }) => {
  if (!isRendered) {
    return null;
  }

  return (
    <div className={styles.content}>
      <Rating />
    </div>
  );
};

ProductHeader.propTypes = {
  isRendered: PropTypes.bool.isRequired,
};

export default connect(ProductHeader);
