// // //Authorization: Prakash
// // //Designed : Prakash
// // //Title : Questions page
// // //Description: Added questions page

// //Authorization: Prakash
// //Designed : Prakash
// //Title : Questions page
// //Description: Added questions page

import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import { Button, Card, Col, Collapse, Row, CustomInput } from "reactstrap";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { subjetcs } from "./subject.json";

library.add(faPlay);
const preferences = [
  "Timer",
  "Question Number and Subject",
  "Number of Questions Answered",
  "Instructions",
  "Number of Questions Answered"
  // "Exclude Items from Pre-created Exams",
  // "Randomize questions option"
];

export class Custom extends Component {
  constructor(props) {
    super(props);

    this.toggleAccordion = this.toggleAccordion.bind(this);

    this.toggleChange = this.toggleChange.bind(this);
    this.unCheck = this.unCheck.bind(this);
    this.toggleTimer = this.toggleTimer.bind(this);

    this.state = {
      accordion: [false, false, false, false, false, false, false],

      isChecked: false,
      value: [],
      timer: true,
      filteredData: []
    };
  }
  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    fetch("http://barbri.thinrootsoftware.com/barbriapi/past_performance.php")
      .then(response => response.json())
      .then(data =>
        this.setState({ filteredData: data }));
  };

  toggleAccordion(tab) {
    const prevState = this.state.accordion;
    const state = prevState.map((x, index) => (tab === index ? !x : false));
    this.setState({
      accordion: state,
      currentNo: tab
    });
  }

  toggleChange(e, i) {
    let value = this.state.value.slice();
    console.log("value" + value);
    value[i] = e.target.checked;
    this.setState({ value, isChecked: true });
  }
  unCheck(i) {
    let value = this.state.value.slice();
    value[i] = !value[i];
    this.setState({ value });
  }
  toggleTimer(e) {
    this.setState({
      timer: !this.state.timer
    });
  }

  render() {
    console.log(this.state.filteredData);
    if (this.state.filteredData.length === 0) {
      return null;
    }
    return (
      <div>
        <div className="col-md-12 heading-section no-padding">
          <h6>Select subjects &amp; sub topics</h6>
          <div className="form-group all-subject">
            <input id="allSubject" name="AllSubject" className="" />
            <label htmlFor="allSubject">All Subjects</label>
          </div>
        </div>

        <div className="question-subjects-topics">
          <Col xs="12" sm="12" md="12" lg="12" xl="12" className="p-0">
            <Row>
              <Col xs="12" sm="12" md="8" lg="8" xl="8" className="subjects">
                {this.state.filteredData.Subjects.map((item, i) => {
                  return (
                    <div className="subject-list">
                      <Card className="subject-accord">
                        <Col id="headingOne">
                          <Button
                            block
                            color="link"
                            className="text-left m-0 p-0"
                            onClick={() => this.toggleAccordion(i)}
                            aria-expanded={this.state.accordion[i]}
                            aria-controls="collapseOne"
                          >
                            <Col xs="12" sm="12" md="12" lg="12" xl="12">
                              <Row>
                                <Col xs="8" sm="8" md="8" lg="8" xl="8">
                                  <h6 className="m-0 p-0">
                                    {item.subject_name}
                                  </h6>
                                </Col>
                                <Col xs="4" sm="4" md="4" lg="4" xl="4">
                                  <Col xs="12" sm="12" md="12" lg="12" xl="12">
                                    <Row>
                                      <Col
                                        Col
                                        xs="8"
                                        sm="8"
                                        md="8"
                                        lg="8"
                                        xl="8"
                                      >
                                        {this.state.value[i] === true ? (
                                          <input
                                            type="number"
                                            name="nos"
                                            id="number"
                                          />
                                        ) : (
                                            ""
                                          )}
                                      </Col>
                                      <Col xs="4" sm="4" md="4" lg="4" xl="4">
                                        <CustomInput
                                          type="checkbox"
                                          id={i}
                                          checked={this.state.value[i]}
                                          inline
                                          key={i}
                                          onChange={e =>
                                            this.toggleChange(e, i)
                                          }
                                        />
                                      </Col>
                                    </Row>
                                  </Col>
                                </Col>
                              </Row>
                            </Col>
                          </Button>
                          <Collapse
                            isOpen={this.state.accordion[i]}
                            data-parent="#accordion"
                            id="collapseOne"
                            aria-labelledby="headingOne"
                            className="topics"
                          >
                            <div
                              className="under-line"
                              style={{
                                borderBottom:
                                  this.state.accordion[i] === true
                                    ? "1px solid #ccc"
                                    : ""
                              }}
                            ></div>
                            {this.state.filteredData.Topics.map((topics, index) => {
                              return (
                                <div className="topics-list">
                                  <Col xs="12" sm="12" md="12" lg="12" xl="12">
                                    <Row>
                                      <Col xs="8" sm="8" md="8" lg="8" xl="8">
                                        <p className="m-0 p-0">{topics.topic_name}</p>
                                      </Col>
                                      <Col xs="4" sm="4" md="4" lg="4" xl="4">
                                        <Col
                                          xs="12"
                                          sm="12"
                                          md="12"
                                          lg="12"
                                          xl="12"
                                        >
                                          <Row>
                                            <Col
                                              Col
                                              xs="8"
                                              sm="8"
                                              md="8"
                                              lg="8"
                                              xl="8"
                                            >
                                              {this.state.value[i] === true ? (
                                                <input
                                                  type="number"
                                                  name="nos"
                                                  id="number"
                                                />
                                              ) : (
                                                  ""
                                                )}
                                            </Col>
                                            <Col
                                              xs="4"
                                              sm="4"
                                              md="4"
                                              lg="4"
                                              xl="4"
                                            >
                                              <CustomInput
                                                type="checkbox"
                                                id={i}
                                                checked={this.state.value[i]}
                                                inline
                                                key={i}
                                                onChange={e =>
                                                  this.toggleChange(e, i)
                                                }
                                              />
                                            </Col>
                                          </Row>
                                        </Col>
                                      </Col>
                                    </Row>
                                  </Col>
                                </div>
                              );
                            })}
                          </Collapse>
                        </Col>
                      </Card>
                    </div>
                  );
                })}
              </Col>
              <Col
                xs="12"
                sm="12"
                md="4"
                lg="4"
                xl="4"
                className="exam-name-input"
              >
                <div className="form-group">
                  <label htmlFor="examName">Exam name</label>
                  <input
                    id="examName"
                    name="ExamName"
                    className="form-control exam-name"
                    placeholder="Exam name here"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="examDuration">
                    Exam duration (in mintues)
                  </label>
                  <input
                    id="examDuration"
                    name="ExamDuration"
                    className="form-control exam-duration"
                    placeholder="Ex: 60"
                  />
                </div>
                <div>
                  <CustomInput
                    type="checkbox"
                    id="showTimer"
                    // key='1'
                    checked={this.state.timer}
                    onChange={e => this.toggleTimer(e)}
                    label="Show timer"
                  />
                </div>
              </Col>
            </Row>
          </Col>
        </div>
        <div className="questions-start">
          <Col xs="12" sm="12" md="12" lg="12" xl="12">
            <Link to={`/students/exam-question`}>
              <Button className="btn">
                <li>
                  <FontAwesomeIcon icon={faPlay} size="1x" />
                </li>
                <li>START</li>
              </Button>
            </Link>
          </Col>
        </div>
      </div>
    );
  }
}

export default Custom;
