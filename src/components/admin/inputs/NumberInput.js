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
        <Row className="msedge-student-field pt-2">
          <Col md="4">
            <label className="fieldname-font-size" htmlFor="tagCode">
              {fieldName}
            </label>
          </Col>
          <Col md="7">
            <div className="form-group">
              <InputMask
              aria-label="Phone number"
                onChange={this.changeValue}
                className="form-control"
                type="text"
                mask="999-999-9999"
                placeholder="000-000-0000"
                value={this.props.getValue() || ""}
              />

              <span className="msedge-info-icon" id={this.props.name}>
                <FontAwesomeIcon icon={faQuestionCircle} />
              </span>
              <UncontrolledTooltip placement="right" target={this.props.name}>
                {this.props.tooltip}
              </UncontrolledTooltip>

              <span className="text-danger">{errorMessage}</span>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withFormsy(MyInput);
