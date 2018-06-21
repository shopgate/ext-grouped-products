import React, { Component } from 'react';

export default class AddToCartButton extends Component {
  static get propTypes() {
    return {}
  }

  constructor(props) {
    super(props);

    this.state = {
      showCheckmark: null,
    };
  }

  render() {
    return (
      <button
        data-test-id="addToCartButton"
        onClick={this.handleClick}
      >
    </button>
    );
  }
};
