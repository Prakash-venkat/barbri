import { withFormsy } from "formsy-react";
import React from "react";
import { UncontrolledTooltip, Col, Row } from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import InputMask from "react-input-mask";

class MyInput extends React.Component {
  constructor(props) {
    super(props);
    this.changeValue = this.changeValue.bind(this);
  }

  changeValue(event) {
    this.props.setValue(event.currentTarget.value);
  }

  render() {
    const errorMessage = this.props.getErrorMessage();
    const { fieldName } = this.props;

    return (
      <div>
        <InputMask
          aria-label="Phone number"
          onChange={this.changeValue}
          className="form-control"
          type="text"
          mask="999-999-9999"
          placeholder="000-000-0000"
          value={this.props.getValue() || ""}
        />
        <span className="text-danger">{errorMessage}</span>
      </div>

    );
  }
}

export default withFormsy(MyInput);
