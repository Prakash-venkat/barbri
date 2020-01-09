import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";
import { dataList } from "../admin/dataList";

class AppButtonBottom extends Component {
  render() {
    return (
      <Row className="w-100">
        <Col className="col-md-12 mt-3 text-right">
          <div className="form-group">
            {!this.props.isLoading ? (
              <span className="msedge-questions-start msedge-right-br">
                <button
                  type="submit"
                  className="btn btn-outline-primary mr-2"
                  disabled={this.props.disabled}
                  style={this.props.style}
                >
                  <li>
                    <i className="pe-7s-download" aria-hidden="true"></i>
                  </li>
                  <li className="text-uppercase">{this.props.redirectToList === "/admin/list_precreatedexam" ? this.props.buttonName : dataList.save}</li>
                </button>
              </span>
            ) : (
                <span className="msedge-questions-start msedge-right-br">
                  <button className="btn btn-primary mr-2" type="button" disabled>
                    <li>
                      <span
                        className="spinner-border spinner-border-sm mr-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    </li>
                    <li className="text-uppercase">Loading...</li>
                  </button>
                </span>
              )}
            <span className="msedge-questions-start msedge-right-br">
              <Link to={this.props.redirectToList}>
                <button type="button" className="btn btn-outline-primary">
                  <li>
                    <i className="pe-7s-back" aria-hidden="true"></i>
                  </li>
                  <li className="text-uppercase">{dataList.back}</li>
                </button>
              </Link>
            </span>
          </div>
        </Col>
      </Row>
    );
  }
}

export default AppButtonBottom;
