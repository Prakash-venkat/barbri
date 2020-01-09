import React, { Component } from "react";
import { ItemStatus } from "./component/itemStatus";

import { Col, Row } from "reactstrap";

export class Home extends Component {
  constructor() {
    super();
    this.state = {

    };
  }
  render() {
    return (
      <div>
        <div>
          <div className="container-fluid">
            <Row>
              <Col xs="12" sm="12" md="7" lg="7" xl="7">
                <h1 className="msedge-overview-text mb-4" tabIndex="-1">
                  OVERVIEW
                </h1>
              </Col>
            </Row>
          </div>
          <Row>
            <div className="container-fluid msedge-admin-dashboard pb-3">
              <div className="container-fluid">
                <Row>
                  <Col sm="12" md="12" lg="12" xl="12">
                    <ItemStatus />
                  </Col>
                </Row>
              </div>
            </div>
          </Row>
        </div>
      </div>
    );
  }
}

export default Home;
