import PropTypes from 'prop-types';
import AddToCartButton from '@shopgate/pwa-ui-shared/AddToCartButton';

/**
 * The PickerAddToCartButton component.
 */
class PickerAddToCartButton extends AddToCartButton {
  /**
   * Extend the prop types of the parent component.
   * @return {Object}
   */
  static get propTypes() {
    return {
      ...super.propTypes,
      openList: PropTypes.func.isRequired,
    };
  }

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
    } = this.props;

    if (showCheckmark || isLoading || isDisabled) {
      return false;
    }

    if (!isOrderable) {
      return false;
    }

    openList();

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
