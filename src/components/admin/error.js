import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { Col, Row } from "reactstrap";
class ErrorMessage extends Component {
  render() {
    return (
      
      <div className="msedge-error-header">
        <Row className="mt-4 justify-content-center">
          <Col md="2" lg="2" xl="3"></Col>
          <Col md="8" lg="8" xl="6">
            <div className="msedge-validation-error">
              <div className="border msedge-border-primary ada-font-size">
                <span className="pl-3 msedge-info-icon msedge-error-info-icon">
                  <FontAwesomeIcon icon={faInfoCircle} />
                </span>
               
                All mandatory fields must be filled to save.{" "}
              </div>
            </div>
          </Col>
          <Col md="2" lg="2" xl="3"></Col>
        </Row>
      </div>
    );
  }
}

export default ErrorMessage;
