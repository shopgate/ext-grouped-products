import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
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
    conditioner: PropTypes.shape().isRequired,
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
      onClick: () => {},
      isDisabled: false,
      isLoading: false,
      hasLoading: true,
      noShadow: false,
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
   * Only update when the `addedQuantity` state changes. To avoid that the
   * picker closes when the Redux state changes.
   * @param {Object} nextProps The next component props.
   * @param {Object} nextState The next component state.
   * @return {boolean}
   */
  shouldComponentUpdate(nextProps, nextState) {
    return (nextState.addedQuantity !== this.state.addedQuantity) ||
      !isEqual(nextProps.buttonProps, this.props.buttonProps);
  }

  /**
   * Returns the props for the picker button.
   * @return {Object}
   */
  get buttonProps() {
    let props = {
      ...this.constructor.defaultProps.buttonProps,
      ...this.props.buttonProps,
      conditioner: this.props.conditioner,
      addedQuantity: this.state.addedQuantity,
      className: null,
    };

    if (props.noShadow) {
      // Inject additional classes when the button is rendered without a shadow.
      props = {
        ...props,
        className: props.isDisabled ? styles.buttonFlatDisabled : styles.buttonFlat,
      };
    }

    return props;
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
    return (
      <BasePicker
        onClick={this.handleAddToCart}
        items={pickerItems}
        className={styles.buttonContainer}
        modalComponent={this.modalComponent}
        buttonProps={this.buttonProps}
        buttonComponent={AddToCartButton}
        listComponent={this.listComponent}
        onSelect={this.handleAddToCart}
      />
    );
  }
}

export default AddToCartPicker;
