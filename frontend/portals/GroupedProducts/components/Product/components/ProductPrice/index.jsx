import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import I18n from '@shopgate/pwa-common/components/I18n';
import Price from '@shopgate/pwa-ui-shared/Price';
import PriceStriked from '@shopgate/pwa-ui-shared/PriceStriked';
import PriceInfo from '@shopgate/pwa-ui-shared/PriceInfo';
import styles from './style';

/**
 * The Price component.
 * @param {Object} props The component props.
 * @return {JSX}
 */
const ProductPrice = ({ price, renderLine }) => (
  <Fragment>
    <div className={renderLine ? styles.containerLine : styles.containerColumn}>
      {(price.msrp > 0 && price.unitPrice !== price.msrp) && (
        <div className={styles.priceStrikedContainer}>
          <I18n.Text
            className={styles.msrpLabel}
            string="price.msrp"
          />
          <PriceStriked
            value={price.msrp}
            currency={price.currency}
            className={styles.priceStriked}
          />
        </div>
      )}
      {(!price.msrp && price.unitPriceStriked > 0) && (
        <PriceStriked
          value={price.unitPriceStriked}
          currency={price.currency}
          className={styles.priceStriked}
        />
      )}
      <Price
        className={styles.price}
        currency={price.currency}
        discounted={!!price.discount}
        unitPrice={price.unitPrice}
        unitPriceMin={price.unitPriceMin}
      />
    </div>
    {price.info && (
      <PriceInfo text={price.info} className={styles.priceInfo} />
    )}
  </Fragment>
);

ProductPrice.propTypes = {
  price: PropTypes.shape().isRequired,
  renderLine: PropTypes.bool,
};

ProductPrice.defaultProps = {
  renderLine: false,
};

export default ProductPrice;
