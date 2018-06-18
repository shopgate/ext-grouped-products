import React from 'react';
import PropTypes from 'prop-types';
import Rating from './components/Rating';
import CTAButtons from '../CTAButtons';
import connect from './connector';
import styles from './style';

/**
 * The ProductHeader component. It's supposed to hide the default header
 * when the current active product has grouped products and render necessary elements.
 * @param {Object} props The component props.
 * @param {boolean} props.isVisible Should the component be visible.
 * @return {JSX}
 */
const ProductHeader = ({ isVisible }) => {
  if (!isVisible) {
    return null;
  }

  return (
    <div className={styles.content}>
      <CTAButtons />
      <Rating />
    </div>
  );
};

ProductHeader.propTypes = {
  isVisible: PropTypes.bool.isRequired,
};

export default connect(ProductHeader);
