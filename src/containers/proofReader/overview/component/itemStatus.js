import React, { Component } from "react";
import { Col, Row } from "reactstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
class ItemStatus extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="msedge-item-details">
          <Row className="msedge-exam-details pb-0">
            <Col sm="12" md="12" lg="12" xl="12" className="text-left">
              <h2 className="pb-3 pt-1">Items for review</h2>
            </Col>
            <Col sm="4" md="4" lg="4" xl="4" className="msedge-block mb-4">
              <Link to={{ pathname: "/proof-reader/item-review" }} tabIndex="0">
                <div className="msedge-wrapper col-md-12 bg-white">
                  <p className="msedge-heading text-uppercase">
                    Pending for review
                  </p>
                  <span className="msedge-right-arrow">
                    <FontAwesomeIcon icon={faArrowRight} />
                  </span>
                  <div className="col-md-12 msedge-text admin-text">
                    <span className="msedge-num">4</span>
                    <br />
                  </div>
                </div>
              </Link>
            </Col>
            <Col sm="4" md="4" lg="4" xl="4" className="msedge-block mb-4">
              <div className="msedge-wrapper col-md-12 bg-white" tabIndex="0">
                <p className="msedge-heading text-uppercase">
                  Review in progress
                </p>
                <span className="msedge-right-arrow">
                  <FontAwesomeIcon icon={faArrowRight} />
                </span>
                <div className="col-md-12 msedge-text admin-text">
                  <span className="msedge-num">3</span>
                  <br />
                </div>
              </div>
            </Col>
            <Col sm="4" md="4" lg="4" xl="4" className="msedge-block">
              <div className="msedge-wrapper col-md-12 bg-white" tabIndex="0">
                <p className="msedge-heading text-uppercase">Reviewed so far</p>
                <span className="msedge-right-arrow">
                  <FontAwesomeIcon icon={faArrowRight} />
                </span>
                <div className="col-md-12 msedge-text admin-text">
                  <span className="msedge-num">8</span>
                  <br />
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default ItemStatus;
