import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import Supportgethelp from "../../../components/commonComponents/support";
import { dataList } from "../../../components/admin/dataList";

 class Support extends Component {
  render() {
    return (
      <div className="msedge-support-sec">
        <div className="mb-2 container-fluid">
          <Row>
            <Col xs="12" sm="12" md="7" lg="7" xl="7">
              <div className="msedge-title">
                <div className="msedge-title-wrapper">
                  <h5 className="msedge-overview-text">{dataList.get_help}</h5>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <Supportgethelp />
      </div>
    );
  }
}

export default Support;
