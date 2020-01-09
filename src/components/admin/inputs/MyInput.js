import { withFormsy } from "formsy-react";
import React from "react";
import { UncontrolledTooltip, Col, Row } from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

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
    const { fieldName } = this.props;
    var requiredClass = this.props.isPristine()
      ? ""
      : this.props.showRequired()
        ? "requiredClass"
        : "";
    const errorMessage = this.props.showRequired()
      ? `${this.props.fieldName} is required`
      : this.props.getErrorMessage();
    return (
      <div>
        <Row className="msedge-student-field pt-2">
          <Col md="4">
            <label className="fieldname-font-size" htmlFor={this.props.id}>
              {fieldName}{" "}
              {this.props.isMandatory === true ? (
                <span className="text-danger">*</span>
              ) : (
                  ""
                )}
            </label>
          </Col>
          <Col md="7">
            <div className="form-group">
              <input
                id={this.props.id}
                onChange={this.changeValue}
                className={"form-control" + " " + requiredClass}
                type={this.state.type}
                value={this.props.getValue() || ""}
                autoComplete="off"
                aria-label={fieldName}
                disabled={this.props.isDisable}
              />

              <span className="msedge-info-icon" id={this.props.name}>
                <FontAwesomeIcon icon={faQuestionCircle} />
              </span>
              <UncontrolledTooltip placement="right" target={this.props.name}>
                {this.props.tooltip}
              </UncontrolledTooltip>

              {this.props.type === "password" ? (
                <span
                  className="btn pe-7s-look msedge-password-eye"
                  onClick={this.showHide}
                ></span>
              ) : (
                  " "
                )}

              <span className="error-color">
                {this.props.isPristine() ? "" : errorMessage}
              </span>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withFormsy(MyInput);
