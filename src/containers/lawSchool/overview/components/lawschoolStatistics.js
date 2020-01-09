import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import {language} from '../../../../utils/locale/locale';

class LawschoolStatistics extends Component {
  render() {

    return (
      <div className="msedge-statics-wrapper">
        <Row>
          <Col xs="12" sm="12" md="12" lg="12" xl="12">
            <Col xs="12" sm="12" md="12" lg="12" xl="12">

              <Row>
                <Col
                  xs="12"
                  sm="12"
                  md="4"
                  lg="4"
                  xl="4"
                  className="msedge-block msedge-card-layout"
                >
                  <Row>
                    <Col xs="10" sm="10" md="10" lg="10" xl="10">
                      <h2 className="pb-3 pt-0"></h2>
                    </Col>
                    <Col
                      xs="2"
                      sm="2"
                      md="2"
                      lg="2"
                      xl="2"
                      className="text-right"
                    >

                    </Col>
                  </Row>
                  <Container>
                    <Row>
                      <Col
                        sm="12"
                        md="12"
                        lg="12"
                        xl="12"
                        className="bg-white msedge-block-wrapper msedge-p25 mt-4 pb-2"
                        tabIndex="0"
                      >
                        <Row>
                          <Col
                            xs="10"
                            sm="10"
                            md="10"
                            lg="10"
                            xl="10"
                            className="msedge-first-section pr-0 m-0"
                          >
                            <h3 className="my-2">
                             {language.active_period}
                              </h3>
                          </Col>
                          <Col
                            xs="2"
                            sm="2"
                            md="2"
                            lg="2"
                            xl="2"
                            className="msedge-second-section pt-0"
                          >
                            <span>{isNaN(this.props.data[0].average) ? 0 : this.props.data[0].average} </span>
                          </Col>
                        </Row>
                        <div className="msedge-card-border"></div>
                        <Row>
                          <Col
                            xs="7"
                            sm="6"
                            md="9"
                            lg="9"
                            xl="9"
                            className="msedge-first-section  pt-3"
                          >
                            <h3 className="my-2 ">
                          {language.enrolled_students}
                              </h3>
                          </Col>
                          <Col
                            xs="5"
                            sm="6"
                            md="3"
                            lg="3"
                            xl="3"
                            className="msedge-second-section pt-2 msedge-scroll-sec"
                          >
                            <span className="msedge-ques-ans align-middle">
                              {isNaN(this.props.data[0].questionsAnswered) ? 0 : this.props.data[0].questionsAnswered}
                            </span>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Container>
                </Col>
                <Col
                  sm="12"
                  md="4"
                  lg="4"
                  xl="4"
                  className="msedge-block msedge-card-layout msedge-school-statistics"
                >
                  <Link
                    to={{
                      pathname:
                        "/law-school/students"
                    }}
                    aria-label="lawschool students"
                  >
                    <Row>
                      <Col xs="10" sm="10" md="10" lg="10" xl="10">
                        <h2 className=" pt-0 pb-3">{language.your_student_statistics}</h2>
                      </Col>
                      <Col
                        xs="2"
                        sm="2"
                        md="2"
                        lg="2"
                        xl="2"
                        className="text-right"
                      >
                        <span className="msedge-right-arrow align-middle">

                          <FontAwesomeIcon
                            icon={faArrowRight}
                          />
                        </span>
                      </Col>
                    </Row>
                    <Container>
                      <Row>
                        <Col
                          md="12"
                          lg="12"
                          xl="12"
                          className=" bg-white pb-2 lawschool-statistics-card-one"
                          tabIndex="0"
                        >
                          <Row>
                            <Col
                              xs="7"
                              sm="6"
                              md="7"
                              lg="8"
                              xl="8"
                              className="msedge-first-section"
                              pr="0"
                            >
                              <h3 className="my-2">
                             {language.percent_correct}
                            </h3>
                            </Col>
                            <Col
                              xs="5"
                              sm="6"
                              md="5"
                              lg="4"
                              xl="4"
                              className="msedge-second-section pt-0"
                            >
                              <span>{this.props.data[0].overallAverage === "Infinity" || null || "" || NaN ? 0 : this.props.data[0].overallAverage > 100 ? 100 : this.props.data[0].overallAverage}% </span>
                            </Col>
                          </Row>
                          <div className="msedge-card-border msedge-card-body-line"></div>
                          <Row>
                            <Col
                              xs="7"
                              sm="6"
                              md="9"
                              lg="9"
                              xl="9"
                              className="msedge-first-section pt-3"
                            >
                              <h3 className="my-2">
                                {language.question_answered}
                            </h3>
                            </Col>
                            <Col
                              xs="5"
                              sm="6"
                              md="3"
                              lg="3"
                              xl="3"
                              className="msedge-second-section pt-2 msedge-scroll-sec"
                            >
                              <span className="msedge-ques-ans align-middle">
                                {this.props.data[0].overaAllquestionsAnswered === "Infinity" || null || "" || NaN ? 0 : this.props.data[0].overaAllquestionsAnswered}
                              </span>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Container>
                  </Link>
                </Col>
                {this.props.isAllStudentsDataEnabled ?
                  <Col
                    sm="12"
                    md="4"
                    lg="4"
                    xl="4"
                    className="msedge-block msedge-card-layout msedge-school-statistics"
                  >
                    <Row>
                      <Col xs="10" sm="10" md="10" lg="10" xl="10">
                        <h2 className="pb-3 pt-0">{language.all_student_statistics}</h2>
                      </Col>
                      <Col
                        xs="2"
                        sm="2"
                        md="2"
                        lg="2"
                        xl="2"
                        className="text-right"
                      >
                      </Col>
                    </Row>
                    <Container>

                      <Row>
                        <Col
                          md="12"
                          lg="12"
                          xl="12"
                          className="bg-white msedge-block-wrapper msedge-p25 pb-2"
                          tabIndex="0"
                        >
                          <Row>
                            <Col
                              xs="7"
                              sm="6"
                              md="7"
                              lg="8"
                              xl="8"
                              className="msedge-first-section"
                            >
                              <h3 className="my-2">
                                {language.percent_correct}
                            </h3>
                            </Col>
                            <Col
                              xs="5"
                              sm="6"
                              md="5"
                              lg="4"
                              xl="4"
                              className="msedge-second-section pt-0"
                            >
                              <span>
                                {this.props.data[0].allstudentOverallAverage === "Infinity" || null || "" || NaN ? 0 : this.props.data[0].allstudentOverallAverage > 100 ? 100 : this.props.data[0].allstudentOverallAverage}%
                            </span>
                            </Col>
                          </Row>
                          <div className="msedge-card-border msedge-card-body-line"></div>
                          <Row>
                            <Col
                              xs="7"
                              sm="6"
                              md="9"
                              lg="9"
                              xl="9"
                              className="msedge-first-section pt-3"
                            >
                              <h3 className="my-2">
                                {language.avg_question}
                            </h3>
                            </Col>
                            <Col
                              xs="5"
                              sm="6"
                              md="3"
                              lg="3"
                              xl="3"
                              className="msedge-second-section pt-2 msedge-scroll-sec"
                            >
                              <span className="msedge-ques-ans align-middle">
                                {this.props.data[0].allstudentQuestionsAnswered === "Infinity" || null || "" || NaN ? 0 : this.props.data[0].allstudentQuestionsAnswered}
                              </span>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Container>
                  </Col> : null}
              </Row>
            </Col>

          </Col>
        </Row>
      </div>
    );
  }
}

export default LawschoolStatistics;