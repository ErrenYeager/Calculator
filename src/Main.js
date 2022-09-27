import React from "react";
import Button from "./Button";

class Main extends React.Component {
  state = { userInput: "", result: 0, opp: "" };
  firstOpp = true;
  isLastClickOpp = false;

  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  componentDidMount = () => {
    this.inputRef.current.focus();

    this.inputRef.current.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        this.equalOpp();
      } else if (
        event.key === "+" ||
        event.key === "-" ||
        event.key === "/" ||
        event.key === "*"
      ) {
        event.preventDefault();
        this.opperatorHandler(event.key);
      }
    });
  };

  onChange = (event) => {
    this.setState({ userInput: event.target.value });
  };

  dotHandler = () => {
    if (this.state.userInput.indexOf(".") === -1) {
      this.setState({ userInput: this.state.userInput + "." });
    }
  };

  opperatorHandler = (opperation) => {
    this.setState({ opp: opperation });
    this.inputRef.current.select();
    this.isLastClickOpp = true;
    if (this.firstOpp) {
      this.setState({ result: this.state.userInput });
      this.firstOpp = false;
    }
  };

  numberClickHandler = (value) => {
    if (this.isLastClickOpp) {
      this.setState({ userInput: value.toString() });
    } else {
      this.setState({ userInput: this.state.userInput + value.toString() });
    }
    this.inputRef.current.focus();
    this.isLastClickOpp = false;
  };

  equalOpp = () => {
    const input = this.state.userInput;
    this.inputRef.current.select();
    if (input === "") {
      return;
    }
    const lastIndex = input.length - 1;
    if (input.toString().substring(lastIndex) === ".") {
      this.setState({ userInput: input.substring(0, lastIndex) });
    }

    let res = this.state.result;
    switch (this.state.opp) {
      case "+":
        res = parseFloat(this.state.result) + parseFloat(input);
        break;
      case "-":
        res = parseFloat(this.state.result) - parseFloat(input);
        break;
      case "*":
        res = parseFloat(this.state.result) * parseFloat(input);
        break;
      default:
        res = parseFloat(this.state.result) / parseFloat(input);
    }
    this.setState({ result: res });
    this.setState({ userInput: res });

    this.isLastClickOpp = false;
    this.firstOpp = true;
  };

  renderButtons = () => {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    return numbers.map((number) => {
      return (
        <Button
          key={`number${number}`}
          label={number}
          buttonHandler={this.numberClickHandler}
        />
      );
    });
  };

  renderOppButtons = () => {
    const opps = ["*", "/", "+", "-"];
    const oppsJsx = opps.map((opp) => {
      return (
        <Button
          className="opperation"
          key={`${opp}`}
          label={opp}
          buttonHandler={this.opperatorHandler}
        />
      );
    });
    oppsJsx.push(
      <Button
        key="."
        className="opperation"
        label="."
        buttonHandler={this.dotHandler}
      />
    );
    oppsJsx.push(
      <Button
        key="="
        className="different"
        label="="
        buttonHandler={this.equalOpp}
      />
    );
    return oppsJsx;
  };

  render() {
    return (
      <div className="center-box">
        <div className="calculator">
          <input
            className="cal-input"
            ref={this.inputRef}
            type="number"
            value={this.state.userInput}
            onChange={this.onChange}
          />
          {this.renderButtons()}
          {this.renderOppButtons()}
          <p className="log">
            {this.state.userInput !== "" && this.state.opp
              ? `${this.state.result} ${this.state.opp}`
              : null}
          </p>
        </div>
      </div>
    );
  }
}

export default Main;
