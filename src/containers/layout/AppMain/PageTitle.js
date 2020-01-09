import React, { Component } from "react";
import { connect } from "react-redux";
import cx from "classnames";

import { Breadcrumb, BreadcrumbItem, Row, Col } from "reactstrap";

import { faHome } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

class PageTitle extends Component {
  randomize(myArray) {
    return myArray[Math.floor(Math.random() * myArray.length)];
  }

  render() {
    let {
      enablePageTitleSubheading,
      subheading,
      heading,
      brdcrumptwo,
      brdcrumpthree,
      brdcrumpfour,
      linkToHome,
      brdcrumptwolink

    } = this.props;

    return (
      <div className="container-fluid">
        <div className="msedge-title mb-0">
          <div>
            <Row className="msedge-title-wrapper">
              <Col sm="12" md="6" lg="6" xl="6">
                <div>
                  <h1 className="msedge-overview-text" tabIndex="-1">
                    {heading}
                  </h1>
                  <div
                    className={cx("msedge-page-subhead", {
                      "d-none": !enablePageTitleSubheading
                    })}
                  >
                  </div>
                </div>
              </Col>
              <Col sm="12" md="6" lg="6" xl="6">
                <div className="pull-right">
                  <div className="row">
                    <div className="msedge-breadcrumb-section">
                      <Breadcrumb>
                        <BreadcrumbItem active>
                          <Link to={linkToHome} aria-label="home">
                            <FontAwesomeIcon icon={faHome} />
                          </Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active><Link to={brdcrumptwolink}>{brdcrumptwo}</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{brdcrumpthree}</BreadcrumbItem>
                        <BreadcrumbItem active>{brdcrumpfour}</BreadcrumbItem>
                      </Breadcrumb>
                    </div>
                  </div>
                </div>
              </Col>

              <Col sm="12" md="12" lg="12" xl="12" className="pt-2">
                <p className="overview-subtext">{subheading}</p>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  enablePageTitleIcon: state.options.enablePageTitleIcon,
  enablePageTitleSubheading: state.options.enablePageTitleSubheading
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageTitle);
