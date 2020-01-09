import { withFormsy } from "formsy-react";
import React from "react";


class TextArea extends React.Component {
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
    var requiredClass = this.props.isPristine() ? '' : this.props.showRequired() ? 'requiredClass' : '';
    const errorMessage = this.props.showRequired() ? `${this.props.fieldName} is required` : this.props.getErrorMessage();

    return (
      <div>

        <div className="form-group">
          <textarea
            rows={this.props.rows}
            onChange={this.changeValue}
            className={"form-control" + " " + requiredClass}
            type={this.state.type}
            value={this.props.getValue() || ""}
          />

          {this.props.type === "password" ? (
            <span
              className="btn pe-7s-look password-eye"
              onClick={this.showHide}
            ></span>
          ) : (
              " "
            )}

          <span className="error-color">{this.props.isPristine() ? '' : errorMessage}</span>
        </div>
      </div>
    );
  }
}

export default withFormsy(TextArea);
