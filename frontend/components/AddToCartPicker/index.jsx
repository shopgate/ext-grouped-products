import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import BasePicker from '@shopgate/pwa-common/components/Picker';
import Sheet from '@shopgate/pwa-ui-shared/Sheet';
import List from './components/List';
import AddToCartButton from './components/AddToCartButton';
import { ADD_TO_CART_BUTTON_TYPE_DEFAULT } from '../../constants';
import { createPickerItems } from '../../helpers';
import styles from './style';

/**
 * The AddToCartPicker component.
 */
class AddToCartPicker extends Component {
  static propTypes = {
    handleAddToCart: PropTypes.func.isRequired,
    buttonProps: PropTypes.shape(),
    clickDelay: PropTypes.number,
    productId: PropTypes.string,
    stock: PropTypes.shape({
      ignoreQuantity: PropTypes.bool,
      quantity: PropTypes.number,
      orderable: PropTypes.bool,
    }),
  };

  static defaultProps = {
    /**
     * Time in ms that delays picker interaction in order
     * to let animations complete first.
     */
    buttonProps: {
      handleAddToCart: /* istanbul ignore next */ () => {},
      isDisabled: false,
      isLoading: false,
      isOrderable: true,
      hasLoading: true,
      noShadow: true,
      type: ADD_TO_CART_BUTTON_TYPE_DEFAULT,
    },
    clickDelay: 150,
    productId: '',
    stock: null,
  };

  static contextTypes = {
    i18n: PropTypes.func,
  };

  /**
   * Constructor
   * @param {Object} props The component props.
   * @param {Object} context The component context.
   */
  constructor(props, context) {
    super(props, context);

    // Initialize the added quantity. The state is used to trigger the AddToCartButton animation.
    this.state = {
      addedQuantity: 0,
    };

    const { __ } = context.i18n();

    // Prepare a modal component for the BasePicker.
    this.modalComponent = modalProps =>
      (<Sheet {...modalProps} title={__('grouped_products.add_to_cart_picker.headline')} />);

    // Prepare a list component for the BasePicker
    this.listComponent = ({
      items, onSelect,
    }) => (
      <List>
        {items.map(item => (
          <List.Item
            key={item.value}
            title={item.label}
            onClick={() => {
                setTimeout(() => {
                  onSelect(item.value);
                }, this.props.clickDelay);
              }}
          />
          ))}
      </List>
    );
  }

  /**
   * Returns the props for the picker button.
   * @return {Object}
   */
  get buttonProps() {
    return {
      ...this.constructor.defaultProps.buttonProps,
      ...this.props.buttonProps,
    };
  }

  /**
   * Puts a product into the cart.
   * @param {number} quantity The desired quantity.
   */
  handleAddToCart = (quantity) => {
    this.props.handleAddToCart(quantity);

    this.setState({
      addedQuantity: this.state.addedQuantity + quantity,
    });
  }

  /**
   * Renders the component.
   * @returns {JSX}
   */
  render() {
    const pickerItems = createPickerItems(this.props.stock);
    const { isDisabled } = this.buttonProps;

    const buttonProps = {
      ...this.buttonProps,
      addedQuantity: this.state.addedQuantity,
      className: (isDisabled ? styles.buttonDisabled : styles.button),
    };

    return (
      <Fragment>
        <BasePicker
          items={pickerItems}
          modalComponent={this.modalComponent}
          buttonProps={buttonProps}
          buttonComponent={AddToCartButton}
          listComponent={this.listComponent}
          onChange={this.handleAddToCart}
          className={styles.buttonContainera}
        />
      </Fragment>
    );
  }
}

export default AddToCartPicker;
