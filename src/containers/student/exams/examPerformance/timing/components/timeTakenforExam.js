import React, { Component } from 'react'
import { Row, Col, CardBody, CardHeader, Button, Collapse } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import Loading from '../../../../../../components/admin/loading';
import {instance} from '../../../../../../actions/constants'
import {getSession} from '../../../../../routes/routePaths';
import { language } from '../../../../../../utils/locale/locale'


class TimeTakenForExam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accordion: [false, false, false, false, false, false, false],
      accordion1: [false, false, false, false, false, false, false],
      examDetails: [],
      UserId: "",
      loading: true,
      studentSession: getSession("StudentSession")
    }
  }

  componentDidMount() {
     this.fetchData()
  }
  fetchData = () => {
    let studentSession = this.state.studentSession
    instance.get(`students/${studentSession.userStudentID}/performance/timing`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,        
      }
    })
      .then(res => {
        const data = res.data.data
        this.setState({
          examDetails: data === null || data === "" ? [] : data,
          loading: false 
        })
      })
      .catch(e => {
          this.setState({ loading: false })
      })
  }
  toggleAccordion = (tab) => {
    const prevState = this.state.accordion;
    const state = prevState.map((x, index) => (tab === index ? !x : false));
    this.setState({
      accordion: state
    });
  }
  toggleAccordion1 = (tab) => {
    const prevState = this.state.accordion1;
    const state = prevState.map((x, index) => (tab === index ? !x : false));
    this.setState({
      accordion1: state
    });
  }

  render() {
    return (
      <div>
        {this.state.loading ? (
          <Loading />
        ) : (
            <div className="msedge-timetakenforexam">
              <Row>
                <Col md="12">
                  <div
                    id="accordion"
                  >
                    {this.state.examDetails.length === 0 ?
                      <div className="text-center py-5">
                        <div className="py-5">
                          {language.no_data_found}
                  </div>
                      </div>
                      :
                      <div>
                        {this.state.examDetails.map((timing, index) => (
                          <div className="my-3 msedge-timing-performance-card">
                            <CardHeader className="msedge-timing-performance-accordian-back msedge-timing-res">
                              <Button
                                block
                                color="links"
                                className="text-left m-0 p-0"
                                onClick={() =>
                                  this.toggleAccordion(
                                    index
                                  )
                                }
                                aria-expanded={
                                  this.state.accordion[
                                  index
                                  ]
                                }
                                aria-controls="collapseOne"
                              >
                                <Row>
                                  <Col md="4" xs="6" sm="6" className="timing-score">
                                    {this.state.accordion[
                                      index
                                    ] === true ? (
                                        <h6 className="m-0 accordianOn msedge-timing-performance-timing-difference">
                                          {timing.timeTaken}
                                        </h6>
                                      ) : (
                                        <h6 className="m-0 accordianOff msedge-timing-performance-timing-difference">
                                          {timing.timeTaken}
                                        </h6>
                                      )}
                                  </Col>

                                  <Col md="5" xs="6" sm="6" className="timing-score">
                                    <div
                                      style={{
                                        width: "100%",
                                        display: "flex",
                                        marginTop: "8px"
                                      }}
                                    >
                                      <div
                                        className="progress-bar-sm progress"
                                        style={{
                                          width: "100%",
                                          backgroundColor: "#dadada"
                                        }}
                                      >
                                        <div
                                          className="progress-bar"
                                          style={{
                                            width: `${timing.answeredCount / timing.totalQuestionsCount * 100}%`,
                                            borderRadius: "2px",
                                            transition: "all .2s ease-out"
                                          }}
                                        />
                                      </div>
                                      <span
                                        style={{
                                          right: "3px",
                                          fontSize: "14px",
                                          marginTop: "-8px"
                                        }}
                                      >
                                      </span>
                                    </div>

                                  </Col>

                                  <Col md="3" xs="12" sm="12">
                                    <Row>
                                      <Col md="10" xs="6" sm="6" className="msedge-center p-0">
                                        <p className="m-0 msedge-timing-performance-totalandaverage timing-answer-outof"> ( {timing.answeredCount} out of {timing.totalQuestionsCount} )</p>
                                      </Col>

                                      <Col md="2" xs="6" sm="6" className="msedge-right-align">
                                        {this.state.accordion[
                                          index
                                        ] === false ? <FontAwesomeIcon icon={faChevronDown} size="3px" className="text-muted mt-2 text-center" />
                                          : <FontAwesomeIcon icon={faChevronUp} size="3px" className="text-muted mt-2 text-center" />
                                        }
                                      </Col>
                                    </Row>
                                  </Col>

                                </Row>
                              </Button>
                            </CardHeader>
                            <Collapse
                              isOpen={
                                this.state.accordion[
                                index
                                ]
                              }
                              data-parent="#accordion"
                              id="collapseOne"
                              aria-labelledby="headingOne"
                              className="msedge-timing-performance-accordian-background"
                            >
                              <CardBody className="msedge-subject-topics">

                                {timing.topics === null ? "" :

                                  <div>
                                    {timing.topics === null ? [] : timing.topics.map((timingsubjectDetails, i) => (
                                      <div className="mb-3 msedge-timing-performance-card">
                                        <CardHeader className="msedge-timing-performance-accordian-background msedge-timing-res">
                                          <Button
                                            block
                                            color="links"
                                            className="text-left m-0 p-0"
                                            onClick={() =>
                                              this.toggleAccordion1(i)
                                            }
                                            aria-expanded={
                                              this.state.accordion1[i]
                                            }
                                            aria-controls="collapseOne"
                                          >
                                            <Row className="msedge-subjects-list mt-3 mb-3">

                                              <Col xs="6" sm="6" md="4"
                                              >
                                                <p className="m-0 msedge-timing-performance-totalandaverage">
                                                  {timingsubjectDetails.subjectName}
                                                </p>

                                              </Col>

                                              <Col xs="6" sm="6" md="5" className="subject-score pr-0 m-0">
                                                <div
                                                  style={{
                                                    width: "100%",
                                                    display: "flex",
                                                    marginTop: "10px"
                                                  }}
                                                >
                                                  <div
                                                    className="progress-bar-sm progress"
                                                    style={{
                                                      width: "100%",
                                                      backgroundColor: "#dadada"
                                                    }}
                                                  >
                                                    <div
                                                      className="progress-bar"
                                                      style={{
                                                        width: `${timingsubjectDetails.answeredCount / timingsubjectDetails.totalQuestionsCount * 100}%`,
                                                        backgroundColor: "#0e6aae",
                                                        borderRadius: "2px",
                                                        transition: "all .2s ease-out"
                                                      }}
                                                    />
                                                  </div>
                                                  <span
                                                    style={{
                                                      right: "3px",
                                                      fontSize: "14px",
                                                      marginTop: "-8px"
                                                    }}
                                                  >
                                                  </span>
                                                </div>
                                              </Col>

                                              <Col md="3">
                                                <Row>
                                                  <Col md="10" xs="6" sm="6" className="msedge-center">
                                                    <p className="m-0 msedge-timing-performance-totalandaverage answer-outof"> ( {timingsubjectDetails.answeredCount} out of {timingsubjectDetails.totalQuestionsCount} )</p>
                                                  </Col>
                                                  <Col md="2" xs="6" sm="6" className="msedge-right-align">
                                                    {this.state.accordion1[i] === false ? <FontAwesomeIcon icon={faChevronDown} size="3px" className="text-muted mt-2 text-center" />
                                                      : <FontAwesomeIcon icon={faChevronUp} size="3px" className="text-muted mt-2 text-center" />
                                                    }
                                                  </Col>
                                                </Row>
                                              </Col>

                                            </Row>
                                          </Button>
                                        </CardHeader>
                                        <Collapse
                                          isOpen={
                                            this.state.accordion1[
                                            i
                                            ]
                                          }
                                          data-parent="#accordion"
                                          id="collapseOne"
                                          aria-labelledby="headingOne"
                                          className="msedge-timing-performance-accordian-background"
                                        >

                                          <CardBody className="msedge-subject-topics">
                                            <div className="timingsubjectDetails">
                                              {timingsubjectDetails.topics === null ? [] : timingsubjectDetails.topics.map(
                                                (topic, i) => (
                                                  <Row className="msedge-subjects-list mb-3">

                                                    <Col xs="12" sm="12" md="4"
                                                    >
                                                      <p className="m-0 msedge-timing-performance-totalandaverage msedge-exam-topics">
                                                        {topic.topicName}
                                                      </p>

                                                    </Col>
                                                    <Col xs="12" sm="12" md="5" className="pr-0 m-0" style={{ paddingLeft: "7px" }}>
                                                      <div
                                                        style={{
                                                          width: "100%",
                                                          display: "flex",
                                                          marginTop: "10px"
                                                        }}
                                                      >
                                                        <div
                                                          className="progress-bar-sm progress"
                                                          style={{
                                                            width: "100%",
                                                            backgroundColor: "#dadada"
                                                          }}
                                                        >
                                                          <div
                                                            className="progress-bar"
                                                            style={{
                                                              width: `${topic.answeredCount / topic.totalQuestionsCount * 100}%`,
                                                              backgroundColor: "#0e6aae",
                                                              borderRadius: "2px",
                                                              transition: "all .2s ease-out"
                                                            }}
                                                          />
                                                        </div>
                                                        <span
                                                          style={{
                                                            right: "3px",
                                                            fontSize: "14px",
                                                            marginTop: "-8px"
                                                          }}
                                                        >
                                                        </span>
                                                      </div>
                                                    </Col>
                                                    <Col md="3">
                                                      <Row>
                                                        <Col md="10" xs="12" sm="12" className="msedge-center msedge-mobile-leftside">
                                                          <p className="m-0 msedge-timing-performance-totalandaverage msedge-exam-topics pleft-4"> ({topic.answeredCount} out of {topic.totalQuestionsCount})</p>
                                                        </Col>
                                                      </Row>
                                                    </Col>
                                                  </Row>
                                                ))}
                                            </div>
                                          </CardBody>
                                        </Collapse>
                                      </div>

                                    )
                                    )}
                                  </div>
                                }
                              </CardBody>
                            </Collapse>
                          </div>
                        ))}
                      </div>}
                  </div>
                </Col>
              </Row>
            </div>
          )}
      </div>
    )
  }
}

export default TimeTakenForExam