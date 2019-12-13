import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Event from '@shopgate/pwa-core/classes/Event';
import { EVENT_ADD_TO_CART_MISSING_VARIANT } from '@shopgate/pwa-common-commerce/cart/constants';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';
import CartPlusIcon from '@shopgate/pwa-ui-shared/icons/CartPlusIcon';
import TickIcon from '@shopgate/pwa-ui-shared/icons/TickIcon';
import IndicatorCircle from '@shopgate/pwa-ui-shared/IndicatorCircle';
import styles from '@shopgate/pwa-ui-shared/AddToCartButton/style';
import { ADD_TO_CART_BUTTON_TYPE_DEFAULT } from '../../../../constants';

/**
 * AddToCartButton component.
 */
class AddToCartButton extends Component {
  static propTypes = {
    conditioner: PropTypes.shape().isRequired,
    isDisabled: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    openList: PropTypes.func.isRequired,
    addedQuantity: PropTypes.number,
    'aria-hidden': PropTypes.bool,
    'aria-label': PropTypes.string,
    buttonSize: PropTypes.number,
    className: PropTypes.string,
    forwardedRef: PropTypes.shape(),
    iconSize: PropTypes.number,
    noShadow: PropTypes.bool,
    onReset: PropTypes.func,
    type: PropTypes.string,
  };

  static defaultProps = {
    'aria-hidden': false,
    'aria-label': null,
    addedQuantity: 0,
    buttonSize: styles.buttonSize,
    className: null,
    forwardedRef: null,
    iconSize: styles.iconSize,
    noShadow: false,
    type: null,
    onReset: () => { },
  };

  /**
   * Constructor for the AddToCartButton component.
   * @param {Object} props Props for the component.
   */
  constructor(props) {
    super(props);

    this.state = {
      showCheckmark: null,
    };
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
   * Handles the cart animation end event.
   * Resets the showCheckmark state to null in order to
   * prevent the icon from animating after changing visibility
   * of the view.
   * This is caused by CSS animations that get re-applied when
   * setting an element from hidden (display: none) to visible.
   */
  handleCartAnimationEnd = () => {
    if (this.state.showCheckmark === false) {
      this.setState({
        showCheckmark: null,
      });
    }

    this.props.onReset();
  };

  /**
   * Click handler for the button.
   * @return {boolean}
   */
  handleClick = () => {
    const { showCheckmark } = this.state;
    const {
      isDisabled,
      isLoading,
      conditioner,
      openList,
      type,
    } = this.props;

    if (showCheckmark || isLoading || isDisabled) {
      return false;
    }

    conditioner.check().then((fulfilled) => {
      if (!fulfilled) {
        if (type === ADD_TO_CART_BUTTON_TYPE_DEFAULT) {
          // Fire an event, so that the UI can react on the failed "add to cart" attempt.
          Event.call(EVENT_ADD_TO_CART_MISSING_VARIANT);
        }

        return false;
      }

      return undefined;
    });

    openList();

    return true;
  };

  /**
   * Renders the component
   * @returns {JSX}
   */
  render() {
    // Set initial base styles
    let buttonStyle = styles.buttonReady;
    let tickIconStyle = styles.icon;
    let cartPlusIconStyle = styles.icon;

    // Depending on the isLoading prop we only show the spinner or the other way around.
    const iconOpacity = this.props.isLoading ? { opacity: 0 } : { opacity: 1 };
    const spinnerInlineStyle = this.props.isLoading ? { opacity: 1 } : { opacity: 0 };

    /**
     * The initial positions for the icons:
     * Tick icon stays hidden on top, Cart icon stays visibly at the center
     */
    let tickInlineStyle = this.state.showCheckmark === null ? {
      transform: 'translate3d(0, 300%, 0)',
      ...iconOpacity,
    } : null;

    let cartInlineStyle = this.state.showCheckmark === null ? {
      transform: 'translate3d(0, -50%, 0)',
      ...iconOpacity,
    } : null;

    if (this.props.isDisabled && !this.props.isLoading) {
      buttonStyle = styles.buttonDisabled;
    } else if (this.state.showCheckmark) {
      /**
       * When checkmark should be shown, we start the spring transition
       * Tick icon springs in, and cart icon springs out.
       */
      tickIconStyle += ` ${styles.springFromBottom}`;
      cartPlusIconStyle += ` ${styles.springToTop}`;
      buttonStyle = styles.buttonSuccess;
      /**
       * After the keyframe animation is done the transform values are reset
       * We add the inline style to make sure the icons stay where they are even after the animation
       */
      tickInlineStyle = {
        transform: 'translate3d(0, -50%, 0)',
        ...iconOpacity,
      };
      cartInlineStyle = {
        transform: 'translate3d(0, -300%, 0)',
        ...iconOpacity,
      };
    } else if (this.state.showCheckmark !== null) {
      /**
       * When checkmark should no longer be shown we start the spring out transition.
       * Tick icon springs out, cart icon spring in.
       * We don't want a animation when we initially go to the page therefore this only happens
       * after the user pressed the button.
       */
      tickIconStyle += ` ${styles.springToBottom}`;
      cartPlusIconStyle += ` ${styles.springFromTop}`;
      /**
       * After the keyframe animation is done the transform values are reset
       * We add the inline style to make sure the icons stay where they are even after the animation
       */
      cartInlineStyle = {
        transform: 'translate3d(0, -50%, 0)',
        ...iconOpacity,
      };
      tickInlineStyle = {
        transform: 'translate3d(0, -300%, 0)',
        ...iconOpacity,
      };
    }

    let className = styles.buttonWrapper(this.props.buttonSize, this.props.iconSize);

    if (this.props.noShadow) {
      className = styles.buttonWrapperNoShadow(this.props.buttonSize, this.props.iconSize);
    }

    return (
      <button
        data-test-id="addToCartButton"
        className={`${this.props.className} ${className} ${buttonStyle}`}
        onClick={this.handleClick}
        aria-hidden={this.props['aria-hidden']}
        aria-label={this.props['aria-label']}
        ref={this.props.forwardedRef}
        type="button"
      >
        {
          /**
           * This svg must not be rendered when never visible
           * When rendered, even hidden or with paused animation, the GPU goes crazy on
           * favorites when there are many of them.
           */
        }
        {this.props.isLoading &&
          <div className={`${styles.icon} ${styles.spinnerIcon}`} style={spinnerInlineStyle}>
            <IndicatorCircle
              color={themeConfig.colors.primaryContrast}
              strokeWidth={5}
              paused={!this.props.isLoading}
            />
          </div>
        }
        <div className={tickIconStyle} style={tickInlineStyle}>
          <TickIcon />
        </div>
        <div
          className={cartPlusIconStyle}
          style={cartInlineStyle}
          onAnimationEnd={this.handleCartAnimationEnd}
        >
          <CartPlusIcon />
        </div>
      </button>
    );
  }
}

export default AddToCartButton;

