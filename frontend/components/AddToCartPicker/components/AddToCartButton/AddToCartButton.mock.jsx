import React, { Component } from 'react';

/**
 * Mocked AddToCartButton Component.
 */
export default class AddToCartButton extends Component {
  /**
   * PropTypes getter.
   */
  static get propTypes() {
    return {};
  }

  /**
   * Component constructor.
   * @param {Object} props The component props.
   */
  constructor(props) {
    super(props);

    this.state = {
      // eslint-disable-next-line react/no-unused-state
      showCheckmark: null,
    };
  }

  /**
   * The render method.
   * @return {JSX}
   */
  render() {
    return (
      <button
        data-test-id="addToCartButton"
        onClick={this.handleClick}
      />
    );
  }
}
