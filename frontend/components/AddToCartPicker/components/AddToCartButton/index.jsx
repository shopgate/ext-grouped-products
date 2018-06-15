import Event from '@shopgate/pwa-core/classes/Event';
import { logger } from '@shopgate/pwa-core/helpers';
import AddToCartButton from '@shopgate/pwa-ui-shared/AddToCartButton';
import { EVENT_ADD_TO_CART_MISSING_VARIANT } from '@shopgate/pwa-common-commerce/cart/constants';
import { ADD_TO_CART_BUTTON_TYPE_DEFAULT } from '../../../../constants';

/**
 * The PickerAddToCartButton component.
 */
class PickerAddToCartButton extends AddToCartButton {
  /**
   * Click handler for the button.
   * @return {boolean}
   */
  handleClick = () => {
    const { showCheckmark } = this.state;
    const {
      isDisabled,
      isLoading,
      isOrderable,
      openList,
      type,
    } = this.props;

    if (showCheckmark || isLoading || isDisabled) {
      return false;
    }

    if (!isOrderable) {
      if (type === ADD_TO_CART_BUTTON_TYPE_DEFAULT) {
        // Fire an event, so that the UI can react on the failed "add to cart" attempt.
        Event.call(EVENT_ADD_TO_CART_MISSING_VARIANT);
      }

      return false;
    }

    if (typeof openList === 'function') {
      this.props.openList();
    } else {
      logger.error('No openList() prop provided');
    }

    return true;
  }

  /**
   * Called when the added quantity was increased. It triggers the button animation.
   */
  onQuantityIncreased() {
    this.setState({
      showCheckmark: true,
    });

    setTimeout(() => {
      this.setState({
        showCheckmark: false,
      });
    }, 900);
  }
  /**
   * Component did update lifecycle hook.
   * @param {Object} prevProps The previous props.
   */
  componentDidUpdate(prevProps) {
    if (this.props.addedQuantity > prevProps.addedQuantity) {
      // Trigger the button animation when the quantity was increased.
      setTimeout(() => {
        this.onQuantityIncreased();
      }, 250);
    }
  }

  /**
   * Renders the extended component.
   * @return {JSX}
   */
  render() {
    return super.render();
  }
}

export default PickerAddToCartButton;
