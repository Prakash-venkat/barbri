import { withFormsy } from "formsy-react";
import React from "react";
import { Col, Row } from "reactstrap";

class ExamInput extends React.Component {
  constructor(props) {
    super(props);
    this.changeValue = this.changeValue.bind(this);
    this.showHide = this.showHide.bind(this);
    this.state = {
      type: this.props.type
    };
  }

  changeValue(event) {
    this.props.setValue(event.currentTarget.value);
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
    const { fieldName, tooltip } = this.props;
    var requiredClass = this.props.isPristine() ? '' : this.props.showRequired() ? 'requiredClass' : '';
    const errorMessage = this.props.showRequired() ? `${this.props.fieldName} is required` : this.props.getErrorMessage();
    return (
      <div>
        <Row className="m-0 p-0">
          <Col md="12">
            <div className="form-group m-0">
              <input
                id={this.props.id}
                onChange={this.changeValue}
                className={"form-control" + ' ' + requiredClass}
                type={this.state.type}
                value={this.props.getValue() || ""}
                autoComplete="off"
                aria-label={fieldName}
                disabled={this.props.isDisable}
                placeholder="No of questions"
              />

              {this.props.type === "password" ? (
                <span
                  className="btn pe-7s-look msedge-password-eye"
                  onClick={this.showHide}
                ></span>
              ) : (
                  " "
                )}

              <span className="error-color">{this.props.isPristine() ? '' : errorMessage}</span>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withFormsy(ExamInput);
