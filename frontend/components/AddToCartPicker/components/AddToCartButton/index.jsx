import AddToCartButton from '@shopgate/pwa-ui-shared/AddToCartButton';

/**
 * The PickerAddToCartButton component.
 */
class PickerAddToCartButton extends AddToCartButton {
  handleClick = () => {
    if (this.state.showCheckmark || this.props.isLoading || this.props.isDisabled) {
      return;
    }

    this.props.openList();
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
