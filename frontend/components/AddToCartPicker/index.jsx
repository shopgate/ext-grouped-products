import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import BasePicker from '@shopgate/pwa-common/components/Picker';
import Sheet from '@shopgate/pwa-ui-shared/Sheet';
import List from './components/List';
import AddToCartButton from './components/AddToCartButton';
import styles from './style';
import connect from './connector';

/**
 * The AddToCartPicker component.
 */
class AddToCartPicker extends Component {
  static propTypes = {
    addProductToCart: PropTypes.func.isRequired,
    maxEntries: PropTypes.number.isRequired,
    productId: PropTypes.string.isRequired,
    stock: PropTypes.shape({
      ignoreQuantity: PropTypes.bool,
      quantity: PropTypes.number,
      info: PropTypes.string,
      orderable: PropTypes.bool,
      minOrderQuantity: PropTypes.number,
      maxOrderQuantity: PropTypes.number,
    }).isRequired,
    clickDelay: PropTypes.number,
  };

  static defaultProps = {
    /**
     * Time in ms that delays picker interaction in order
     * to let animations complete first.
     */
    clickDelay: 150,
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
      items, onSelect, onClose,
    }) => (
      <List>
        {items.map(item => (
          <List.Item
            key={item.value}
            title={item.label}
            onClick={() => {
                setTimeout(() => {
                  onSelect(item.value);
                  onClose();
                }, this.props.clickDelay);
              }}
          />
          ))}
      </List>
    );
  }

  /**
   * Creates items for the picker.
   * @return {Array}
   */
  createPickerItems = () => {
    const {
      ignoreQuantity,
      quantity,
    } = this.props.stock;

    const { maxEntries } = this.props;

    const items = [];

    // Prepare the picker entries - for now min- and maxOrderQuantity is not considered.
    for (let value = 1; value <= maxEntries; value += 1) {
      if (ignoreQuantity) {
        if (items.length === maxEntries) {
          break;
        }
      } else if (items.length === maxEntries || value >= quantity) {
        break;
      }

      items.push({
        label: `${value}`,
        value,
      });
    }

    return items;
  }

  /**
   * Puts a product into the cart.
   * @param {number} quantity The desired quantity.
   */
  handleAddToCart = (quantity) => {
    this.props.addProductToCart(quantity);

    this.setState({
      addedQuantity: this.state.addedQuantity + quantity,
    });
  }

  /**
   * Renders the component.
   * @returns {JSX}
   */
  render() {
    const { orderable } = this.props.stock;

    const pickerItems = this.createPickerItems();
    const isOrderable = orderable || pickerItems.length > 0;

    // Setup required and dynamic button props.s
    const buttonProps = {
      handleAddToCart: () => {},
      isDisabled: !isOrderable,
      isLoading: false,
      addedQuantity: this.state.addedQuantity,
      noShadow: true,
      className: styles.button,
      isOrderable,
    };

    return (
      <Fragment>
        <BasePicker
          items={pickerItems}
          className={styles.buttonContainer}
          modalComponent={this.modalComponent}
          buttonProps={buttonProps}
          buttonComponent={AddToCartButton}
          listComponent={this.listComponent}
          onChange={this.handleAddToCart}
        />
      </Fragment>
    );
  }
}

export default connect(AddToCartPicker);
