import React, { Component } from "react";

import { Col, Row } from "reactstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Loading from '../../../components/admin/loading';
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { instance } from '../../../actions/constants'
import ItemBankChart from "../itemBank/itemBank/list/itembankChart";

import { customPageTitle } from '../../../components/commonComponents/customPageTitle'
import {language} from '../../../utils/locale/locale'


class Home extends Component {
  constructor(props) {

    super(props);

    this.state = {
      dataList: [],
      loading: true,
      isEmpty: false,
    };
  }

  componentDidMount() {

    customPageTitle('Overview')
    instance.get("admin/overview", {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,        
      }
    })
      .then(res => {

        if (res.data.data === null) {
          this.setState({
            isEmpty: true,
            loading: false
          })
        } else {
          this.setState({ dataList: res.data.data, loading: false, isEmpty: false })
        }
      })
      .catch(error => {
        this.setState({
          dataList: [],
          isEmpty: true,
          loading: false
        })
      })

  }

  render() {
    return (

      <div>

        {this.state.loading ?
          <Loading />
          :
          <div>
            <ReactCSSTransitionGroup
              component="div"
              transitionName="TabsAnimation"
              transitionAppear={true}
              transitionAppearTimeout={0}
              transitionEnter={false}
              transitionLeave={false}
            >
              <div className="container-fluid">
                <Row>
                  <Col xs="12" sm="12" md="7" lg="7" xl="7">
                    <h1 className="msedge-overview-text mb-4">
                      {language.overview}
              </h1>
                  </Col>
                </Row>
              </div>
              <Row>
                
                <div className="container-fluid msedge-admin-dashboard msedge-overall-padding-dashboard">
                  <div className="container-fluid">
                    <Row>
                      <Col sm="12" md="12" lg="12" xl="12">
                        <div className="msedge-item-details">
                          <Row className="msedge-exam-details  Msedge-dashboard-section pb-0">
                            <Col sm="12" md="12" lg="12" xl="12" className="text-left">
                                  <h2 className="pb-3 pt-1">{language.law_schools}</h2>
                            </Col>
                            <Col sm="4" md="4" lg="4" xl="4" className="msedge-block mb-4">
                              <Link to={{ pathname: "/admin/list_lawschool", status: "y" }}>
                                <div className="msedge-wrapper col-md-12 bg-white">
                                  <p className="msedge-heading text-uppercase">{language.total_active}</p>
                                  <span className="msedge-right-arrow">
                                    <FontAwesomeIcon icon={faArrowRight} />
                                  </span>
                                  <div className="col-md-12 msedge-text text-center admin-text">

                                    <span className="msedge-num">{this.state.isEmpty ? '0' : this.state.dataList.schoolActiveProfileCount}</span>
                                    <br />
                                  </div>
                                </div>
                              </Link>
                            </Col>
                            <Col sm="4" md="4" lg="4" xl="4" className="msedge-block mb-4">
                              <Link to={{ pathname: "/admin/list_lawschool" }}>
                                <div className="msedge-wrapper col-md-12 bg-white">
                                   <p className="msedge-heading text-uppercase">{language.this_quater}</p>
                                  <span className="msedge-right-arrow">
                                    <FontAwesomeIcon icon={faArrowRight} />
                                  </span>
                                  <div className="col-md-12 msedge-text text-center admin-text ">
                                    <span className="msedge-num">{this.state.isEmpty ? '0' : this.state.dataList.schoolLastThreeMonthCount}</span>
                                    <br />
                                  </div>
                                </div>
                              </Link>
                            </Col>
                            <Col sm="4" md="4" lg="4" xl="4" className="msedge-block">
                              <Link to={{ pathname: "/admin/list_lawschool_enquiry" }}>
                                <div className="msedge-wrapper col-md-12 bg-white">
                                    <p className="msedge-heading text-uppercase">{language.new_request}</p>
                                  <span className="msedge-right-arrow">
                                    <FontAwesomeIcon icon={faArrowRight} />
                                  </span>
                                  <div className="col-md-12 msedge-text text-center admin-text">
                                    <span className="msedge-num">{this.state.isEmpty ? '0' : this.state.dataList.newRequestCount}</span>
                                    <br />
                                  </div>
                                </div>
                              </Link>
                            </Col>
                          </Row>
                          <Row className="msedge-exam-details pt-0 pb-0">
                            <Col sm="12" md="12" lg="12" xl="12" className="text-left">
                            <h2 className="pb-3 pt-0">{language.students}</h2>
                            </Col>
                            <Col sm="4" md="4" lg="4" xl="4" className="msedge-block">
                              <Link to={{ pathname: "/admin/list_student", status: "y" }} >
                                <div className="msedge-wrapper col-md-12 bg-white">
                                 <p className="msedge-heading text-uppercase">{language.total_active}</p>
                                  <span className="msedge-right-arrow">
                                    <FontAwesomeIcon icon={faArrowRight} />
                                  </span>
                                  <div className="col-md-12 msedge-text text-center admin-text" >
                                    <span className="msedge-num">{this.state.isEmpty === true ? '0' : this.state.dataList.studentActiveProfileCount}</span>
                                    <br />
                                  </div>
                                </div>
                              </Link>
                            </Col>
                            <Col sm="4" md="4" lg="4" xl="4" className="msedge-block mb-4">
                              <Link to={{ pathname: "/admin/list_student" }} >
                                <div className="msedge-wrapper col-md-12 bg-white" >
                                        <p className="msedge-heading text-uppercase">{language.last_three_months}</p>
                                  <span className="msedge-right-arrow">
                                    <FontAwesomeIcon icon={faArrowRight} />
                                  </span>
                                  <div className="col-md-12 msedge-text text-center admin-text" >
                                    <span className="msedge-num">{this.state.isEmpty ? '0' : this.state.dataList.studentLastThreeMonthCount}</span>
                                    <br />
                                  </div>
                                </div>
                              </Link>
                            </Col>
                            <Col sm="4" md="4" lg="4" xl="4" className="msedge-block">
                              <Link to={{ pathname: "/admin/list_student" }}>
                                <div className="msedge-wrapper col-md-12 bg-white" >
                                <p className="msedge-heading text-uppercase">{language.last_twelve_months}</p>
                                  <span className="msedge-right-arrow">
                                    <FontAwesomeIcon icon={faArrowRight} />
                                  </span>
                                  <div className="col-md-12 msedge-text text-center admin-text" >
                                    <span className="msedge-num">{this.state.isEmpty ? '0' : this.state.dataList.studentLastSixMonthCount}</span>
                                    <br />
                                  </div>
                                </div>
                              </Link>
                            </Col>
                          </Row>
                          <Row className="msedge-exam-details pt-0 pb-0">
                            <Col sm="12" md="12" lg="12" xl="12" className="text-left">
                                <h2 className="pb-3 pt-0">{language.items}</h2>
                            </Col>
                            <Col sm="4" md="4" lg="4" xl="4" className="msedge-block">
                              <Link to={{ pathname: "/admin/list_itembank", status: "2" }} >
                                <div className="msedge-wrapper col-md-12 bg-white">
                                     <p className="msedge-heading text-uppercase">{language.pending_review}</p>
                                  <span className="msedge-right-arrow">
                                    <FontAwesomeIcon icon={faArrowRight} />
                                  </span>
                                  <div className="col-md-12 msedge-text text-center admin-text">
                                    <span className="msedge-num">{this.state.isEmpty ? '0' : this.state.dataList.pendingReviewCount}</span>
                                    <br />
                                  </div>
                                </div>
                              </Link>
                            </Col>
                            <Col sm="4" md="4" lg="4" xl="4" className="msedge-block mb-4">
                              <Link to={{ pathname: "/admin/list_itembank", status: "1" }} >
                                <div className="msedge-wrapper col-md-12 bg-white" >
                                  <p className="msedge-heading text-uppercase">{language.published}</p>
                                  <span className="msedge-right-arrow">
                                    <FontAwesomeIcon icon={faArrowRight} />
                                  </span>
                                  <div className="col-md-12 msedge-text text-center admin-text" >
                                    <span className="msedge-num">{this.state.isEmpty ? '0' : this.state.dataList.publishedCount}</span>
                                    <br />
                                  </div>
                                </div>
                              </Link>
                            </Col>
                            <Col sm="4" md="4" lg="4" xl="4" className="msedge-block">
                              <Link to={{ pathname: "/admin/itemerror" }} >
                                <div className="msedge-wrapper col-md-12 bg-white" >
                                      <p className="msedge-heading text-uppercase">{language.reported_errors}</p>
                                  <span className="msedge-right-arrow">
                                    <FontAwesomeIcon icon={faArrowRight} />
                                  </span>
                                  <div className="col-md-12 msedge-text text-center admin-text">
                                    <span className="msedge-num">{this.state.isEmpty ? '0' : this.state.dataList.reportedErrorsCount}</span>
                                    <br />
                                  </div>
                                </div>
                              </Link>
                            </Col>
                          </Row>
                          <Row className="pt-0 pb-0">
                            <Col sm="12" md="12" lg="12" xl="12" className="text-left">
                                <h2 className="pb-3 pt-0">{language.item_bank}</h2>
                            </Col>
                            <Col sm="12" md="12" lg="12" xl="12" className="text-left admin-overview-chart">
                              <ItemBankChart />
                            </Col>
                          </Row>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Row>
            </ReactCSSTransitionGroup>
          </div>
        }

      </div>
    );
  }
}

export default Home;
