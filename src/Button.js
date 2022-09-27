import React from "react";

class Button extends React.Component {
  render() {
    if (this.props.className) {
      return (
        <button
          className={`button ${this.props.className}`}
          onClick={() => this.props.buttonHandler(this.props.label)}
        >
          {this.props.label}
        </button>
      );
    } else {
      return (
        <button
          className="button"
          onClick={() => this.props.buttonHandler(this.props.label)}
        >
          {this.props.label}
        </button>
      );
    }
  }
}

export default Button;
