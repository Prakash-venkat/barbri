import { withFormsy } from "formsy-react";
import React from "react";

class MyInput extends React.Component {
  constructor(props) {
    super(props);
    this.changeValue = this.changeValue.bind(this);
    this.showHide = this.showHide.bind(this);
    this.state = {
      type: this.props.type
    };
  }

  changeValue(event) {
    this.props.setValue(event.currentTarget.value.trimStart());
  }
  showHide(e) {
    e.preventDefault();
    e.stopPropagation();
    if (this.state.type === "input") {
      this.setState({
        type: "password"
      });
    } else if (this.state.type === "password") {
      this.setState({
        type: "input"
      });
    }
  }
  render() {
    var requiredClass = this.props.isPristine()
      ? ""
      : this.props.showRequired()
        ? "requiredClass"
        : "";
    const errorMessage = this.props.showRequired()
      ? `${this.props.fieldName} is required`
      : this.props.getErrorMessage();
    return (
      <div className="form-group mb-2">
        <input
          onChange={this.changeValue}
          className={"form-control" + " " + requiredClass}
          type={this.state.type}
          value={this.props.getValue() || ""}
          autoComplete="off"
          disabled={this.props.isDisable}
        />

        {this.props.type === "password" ? (
          <span
            className="btn pe-7s-look password-eye-proofreader"
            onClick={this.showHide}
          ></span>
        ) : (
            " "
          )}

        <span className="error-color">
          {this.props.isPristine() ? "" : errorMessage}
        </span>
      </div>
    );
  }
}

export default withFormsy(MyInput);
