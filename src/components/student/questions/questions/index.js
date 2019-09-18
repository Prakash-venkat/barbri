// //Authorization: Prakash
// //Designed : Prakash
// //Title : Questions page
// //Description: Added questions page

import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  CardTitle,
  Collapse,
  Fade,
  Row,
  CustomInput,
  Input,
  FormGroup,
  Label
} from "reactstrap";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import {
  faPlay,
  faCheck
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { subjetcs } from "./utils/subject.json";
import PageTitle from "../../Layout/AppMain/PageTitle";
import QuestionAndAnswers from "./q&a/index";

import TextSizeSelector from "../../textsizeselector/Textsizeselector";

library.add(
  faPlay
);
const preferences = [
  "Timer",
  "Question Number and Subject",
  "Number of Questions Answered",
  "Instructions",
  "Number of Questions Answered"
  // "Exclude Items from Pre-created Exams",
  // "Randomize questions option"
];

export class Questions extends Component {
  constructor(props) {
    super(props);

    this.toggleAccordion = this.toggleAccordion.bind(this);
    this.toggleAccordionOne = this.toggleAccordionOne.bind(this);
    this.toggleChange = this.toggleChange.bind(this);
    this.unCheck = this.unCheck.bind(this);

    this.state = {
      accordion: [false, false, false, false, false, false, false],
      accordionOne: [false, false, false, false, false, false, false],
      isChecked: false,
      value: [],
      customFontSize: 0,
      filteredData: []
    };
  }

  fetchData = () => {
    fetch("http://barbri.thinrootsoftware.com/barbriapi/past_performance.php")
      .then(response => response.json())
      .then(data =>
        this.setState({ filteredData: data }));
  };

  toggleAccordion(tab) {
    const unchecked = this.state.isChecked;
    const prevState = this.state.accordion;
    const state = prevState.map((x, index) => (tab === index ? !x : false));
    this.setState({
      accordion: state,
      currentNo: tab
    });
  }
  toggleAccordionOne(tab) {
    const unchecked = this.state.isChecked;
    const prevState = this.state.accordionOne;
    const state = prevState.map((x, index) => (tab === index ? !x : false));
    this.setState({
      accordionOne: state,
      currentNo: tab
    });
  }

  toggleChange(e, i) {
    let value = this.state.value.slice();
    console.log("value" + value);
    value[i] = e.target.checked;
    this.setState({ value, isChecked: true });
  }
  toggleColor(e) {

    let element = document.getElementsByName('preference-input');
    for (var i in element) {
      if (element[i].checked) {
        document.getElementsByClassName('preference-checkbox')[i].style.fontWeight = 500;
      }
      else {
        document.getElementsByClassName('preference-checkbox')[i].style.fontWeight = 400;
      }
    }
  }
  unCheck(i) {
    let value = this.state.value.slice();
    value[i] = !value[i];
    this.setState({ value });
  }

  componentDidMount() {
    let element = document.getElementsByName('preference-input');
    for (var i in element) {
      if (element[i].checked) {
        document.getElementsByClassName('preference-checkbox')[i].style.fontWeight = 500;
      }
    }
    this.fetchData();
  }
  render() {

    var halfwayPoint = Math.ceil(subjetcs.length / 2);
    var columnA = subjetcs.slice(0, halfwayPoint);
    var columnB = subjetcs.slice(halfwayPoint);
    console.log(this.state.filteredData);
    if (this.state.filteredData.length === 0) {
      return null;
    }
    return (
      <div className="practice-questions">
        <PageTitle
          heading="Questions"
          subheading="Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do Eiusmod Tempor"
          brdcrumptwo="Questions"
          brdcrumpthree="Practice Questions"
        />
        <div className="d-flex justify-content-between">
          <h6>Question</h6>
          <CustomInput
            type="checkbox"
            id="selectall"
            label="Select all subject"
            inline
            key="9"
            name="preference-input"
            className="preference-checkbox"
            onChange={(e) => this.toggleColor(e)}
          />
        </div>
        {/* <div className="question-preference">
          <Col xs="12" sm="12" md="12" lg="12" xl="12" className="p-0">
             <Row className="m-0">
              <Col xs="12" sm="12" md="2" lg="2" xl="2">
                <p style={{ fontSize: `${14 + this.state.customFontSize}px` }}>Set Preferences</p>
              </Col>
              <Col xs="12" sm="12" md="10" lg="10" xl="10" className="p-0">
                <ul style={{ fontSize: `${14 + this.state.customFontSize}px` }}>
                  <li>
                    <CustomInput
                      type="checkbox"
                      id="timer"
                      label="Timer"
                      defaultChecked="true"
                      inline
                      key="1"
                    />
                  </li>
                  <li>
                    <CustomInput

                      type="checkbox"
                      id="questionNo"
                      label="Question Number and Subject"
                      defaultChecked="true"
                      inline
                      key="2"
                    />
                  </li>
                  <li>
                    <CustomInput
                      type="checkbox"
                      id="instruction"
                      label="Instructions"
                      defaultChecked="true"
                      inline
                      key="3"
                    />
                  </li>
                  <li>
                    <CustomInput
                      type="checkbox"
                      id="noofquestion"
                      label="No of Questions Answered"
                      defaultChecked="true"
                      inline
                      key="4"
                    />
                  </li>
                </ul>
              </Col>
            </Row>
          </Col>
        </div> */}

        <div className="question-subjects-topics">
          <Col xs="12" sm="12" md="12" lg="12" xl="12" className="p-0">
            <Row>
              <Col xs="12" sm="12" md="8" lg="8" xl="8" className="subjects">
                {this.state.filteredData.Subjects.map((item, i) => {
                  return <div className="subject-list">
                    <Card className="subject-accord">
                      <Col id="headingOne">
                        <Button block color="link" className="text-left m-0 p-0"
                          onClick={() => this.toggleAccordion(i)}
                          aria-expanded={this.state.accordion[i]}
                          aria-controls="collapseOne">
                          <Col xs="12" sm="12" md="12" lg="12" xl="12" >
                            <Row>
                              <Col xs="8" sm="8" md="8" lg="8" xl="8">
                                <h6 className="m-0 p-0 text-primary">{item.subject_name} (70)</h6>
                              </Col>
                              <Col xs="4" sm="4" md="4" lg="4" xl="4">
                                <Col xs="12" sm="12" md="12" lg="12" xl="12">
                                  <Row>
                                    <Col Col xs="8" sm="8" md="8" lg="8" xl="8">

                                      {this.state.value[i] === true ? <input type="number" name="nos" id="number" /> : ''}
                                    </Col>
                                    <Col xs="4" sm="4" md="4" lg="4" xl="4">
                                      <CustomInput
                                        type="checkbox"
                                        id={i}
                                        checked={this.state.value[i]}
                                        inline
                                        key={i}
                                        onChange={(e) => this.toggleChange(e, i)}
                                      />
                                    </Col>
                                  </Row>
                                </Col>
                              </Col>
                            </Row>
                          </Col>

                        </Button>
                        <Collapse isOpen={this.state.accordion[i]} data-parent="#accordion"
                          id="collapseOne" aria-labelledby="headingOne" className="topics">
                          <div className="under-line" style={{ borderBottom: this.state.accordion[i] === true ? '1px solid #ccc' : '' }} ></div>
                          {this.state.filteredData.Topics.map((topics, index) => {

                            return <div className="topics-list">
                              <Col xs="12" sm="12" md="12" lg="12" xl="12">
                                <Row>
                                  <Col xs="8" sm="8" md="8" lg="8" xl="8">
                                    <p className="m-0 p-0">{topics.topic_name} (20)</p>
                                  </Col>
                                  <Col xs="4" sm="4" md="4" lg="4" xl="4">
                                    <Col xs="12" sm="12" md="12" lg="12" xl="12">
                                      <Row>
                                        <Col Col xs="8" sm="8" md="8" lg="8" xl="8">

                                          {this.state.value[i] === true ? <input type="number" name="nos" id="number" /> : ''}
                                        </Col>
                                        <Col xs="4" sm="4" md="4" lg="4" xl="4">
                                          <CustomInput
                                            type="checkbox"
                                            id={i}
                                            checked={this.state.value[i]}
                                            inline
                                            key={i}
                                            onChange={(e) => this.toggleChange(e, i)}
                                          />
                                        </Col>
                                      </Row>
                                    </Col>
                                  </Col>
                                </Row>
                              </Col>
                            </div>

                          })}

                        </Collapse>
                      </Col>

                    </Card>
                  </div>;
                })}
              </Col>
              <Col xs="12" sm="12" md="4" lg="4" xl="4" className="set-preference">
                <Col md="12" className="preference-list-wrap">
                  <h6>Set Preferences</h6>
                  <ul>
                    <li>
                      <CustomInput
                        type="checkbox"
                        id="timer"
                        label="Timer"
                        defaultChecked="true"
                        inline
                        key="1"
                        name="preference-input"
                        className="preference-checkbox"
                        onChange={(e) => this.toggleColor(e)}
                      />
                    </li>
                    <li>
                      <CustomInput
                        type="checkbox"
                        id="exacludeQuestionsInPreCreatedexams"
                        label="Exclude Questions In Pre-createdexams"
                        defaultChecked="true"
                        inline
                        key="2"
                        name="preference-input"
                        className="preference-checkbox"
                        onChange={(e) => this.toggleColor(e)}
                      />
                    </li>
                    <li>
                      <CustomInput
                        type="checkbox"
                        id="randomizeQuestionOrder"
                        label="Randomize question order"

                        inline
                        key="3"
                        name="preference-input"
                        className="preference-checkbox"
                        onChange={(e) => this.toggleColor(e)}
                      />
                    </li>
                    <li>
                      <CustomInput
                        type="checkbox"
                        id="noOfQuestionAnswered"
                        label="No of Questions Answered"

                        inline
                        name="preference-input"
                        key="4"
                        className="preference-checkbox"
                        onChange={(e) => this.toggleColor(e)}
                      />
                    </li>
                    <li>
                      <CustomInput
                        type="checkbox"
                        id="includePreviouslyAnsQues"
                        label="Include previously answered questions"
                        defaultChecked="true"
                        inline
                        name="preference-input"
                        key="5"
                        className="preference-checkbox"
                        onChange={(e) => this.toggleColor(e)}
                      />
                    </li>
                    <ul>
                      <li>
                        <CustomInput
                          type="checkbox"
                          id="flaggedQuestion"
                          label="Flagged Question"

                          inline
                          name="preference-input"
                          key="6"

                          onChange={(e) => this.toggleColor(e)}
                        />
                      </li>
                      <li>
                        <CustomInput
                          type="checkbox"
                          id="incorrectQuestion"
                          label="Incorrect Question"

                          inline
                          name="preference-input"
                          key="7"
                          className="preference-checkbox"
                          onChange={(e) => this.toggleColor(e)}
                        />
                      </li>
                      <li>
                        <CustomInput
                          type="checkbox"
                          id="correctQuestion"
                          label="Correct Question"

                          inline
                          name="preference-input"
                          key="8"
                          className="preference-checkbox"
                          onChange={(e) => this.toggleColor(e)}
                        />
                      </li>
                    </ul>
                  </ul>
                </Col>
              </Col>
              {/* <Col xs="12" sm="12" md="8" lg="8" xl="8" className="subjects">
                {columnB.map((item, i) => {
                  return <div className="subject-list">
                    <Card className="subject-accord">
                      <Col id="headingOne ">
                        <Button block color="link" className="text-left m-0 p-0"
                          onClick={() => this.toggleAccordionOne(i)}
                          aria-expanded={this.state.accordionOne[i]}
                          aria-controls="collapseOne">
                          <Col xs="12" sm="12" md="12" lg="12" xl="12" className="subject-head">
                            <Row>
                              <Col xs="8" sm="8" md="8" lg="8" xl="8">
                                <h6 style={{ fontSize: `${16 + this.state.customFontSize}px` }} className="m-0 p-0">{item.subjectName}</h6>
                              </Col>
                              <Col xs="4" sm="4" md="4" lg="4" xl="4">
                                <Col xs="12" sm="12" md="12" lg="12" xl="12">
                                  <Row>
                                    <Col Col xs="8" sm="8" md="8" lg="8" xl="8">
                                      {this.state.value[i + 4] === true ? <input type="number" name="nos" id="number"/> : ''}
                                    </Col>
                                    <Col xs="4" sm="4" md="4" lg="4" xl="4">
                                      <CustomInput
                                        type="checkbox"
                                        id={i + 4}
                                        checked={this.state.value[i + 4]}
                                        inline
                                        key={i + 4}
                                        onChange={(e) => this.toggleChange(e, i + 4)}
                                      />
                                    </Col>
                                  </Row>
                                </Col>
                              </Col>
                            </Row>
                          </Col>                        </Button>
                        <Collapse isOpen={this.state.accordionOne[i]} data-parent="#accordion"
                          id="collapseOne" aria-labelledby="headingOne" className="topics">
                          <div className="under-line" style={{ borderBottom: this.state.accordionOne[i + 4] === true ? '1px solid #ccc' : '' }} ></div>
                          {item.topics.map((topics, index) => {

                            return <div className="topics-list">
                              <Col xs="12" sm="12" md="12" lg="12" xl="12">
                                <Row>
                                  <Col xs="8" sm="8" md="8" lg="8" xl="8">
                                    <p style={{ fontSize: `${14 + this.state.customFontSize}px` }} className="m-0 p-0">{topics}</p>
                                  </Col>
                                  <Col xs="4" sm="4" md="4" lg="4" xl="4">
                                    <Col xs="12" sm="12" md="12" lg="12" xl="12">
                                      <Row>
                                        <Col Col xs="8" sm="8" md="8" lg="8" xl="8">

                                          {this.state.value[i] === true ? <input type="number" name="nos" id="number" /> : ''}
                                        </Col>
                                        <Col xs="4" sm="4" md="4" lg="4" xl="4">
                                          <CustomInput
                                            type="checkbox"
                                            id={i}
                                            checked={this.state.value[i]}
                                            inline
                                            key={i}
                                            onChange={(e) => this.toggleChange(e, i)}
                                          />
                                        </Col>
                                      </Row>
                                    </Col>
                                  </Col>
                                </Row>
                              </Col>
                            </div>

                          })}

                        </Collapse>
                      </Col>

                    </Card>
                  </div>;
                })}
              </Col> */}
            </Row>
          </Col>
        </div>
        <div className="questions-start">
          <Col xs="12" sm="12" md="12" lg="12" xl="12">
            <Link to={`/students/question-answers`}>
              <Button className="btn">

                <li><FontAwesomeIcon icon={faPlay} size="1x" /></li>
                <li>START</li>


              </Button>
            </Link>
          </Col>
        </div>

        {/* <Row>
          <Col md="8">
            <div id="accordion" className="accordion-wrapper mb-3">
              {subjetcs.map((data, index) => (
                <Card>
                  <CardHeader id="headingOne">
                    <Button
                      block
                      color="link"
                      className="text-left m-0 p-0"
                      onClick={() => this.toggleAccordion(index)}
                      aria-expanded={this.state.accordion[index]}
                      aria-controls="collapseOne"
                    >
                      <Row>
                        <Col
                          md="7"
                          className="justify-content-center align-self-center"
                        >
                          {this.state.accordion[index] === true ?  <h6 className="m-0 p-0 accordianOn">{data.subjectName}</h6> :  <h6 className="m-0 p-0 accordianOff">{data.subjectName}</h6>}
                         
                        </Col>
                        <Col md="5" className="p-0">
                          <Row className="header-left-align m-0">
                            <Col md="11" className="">
                              {this.state.value[index] === true ? <Input
                                
                                bsSize="sm"
                                placeholder="No of Questions"
                              /> : ''}
                              
                            </Col>

                            <Col md="1" className=" p-0 checkbox-right ondisplay">
                              {" "}
                              <div class="squaredFour">
                              <input checked={this.state.value[index]} type="checkbox" className="checkbox-head" onChange={(e) => this.toggleChange(e, index)}/>
      <label for="squaredFour"></label>
    </div>
                              
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Button>
                  </CardHeader>
                  <Collapse
                    isOpen={this.state.accordion[index]}
                    data-parent="#accordion"
                    id="collapseOne"
                    aria-labelledby="headingOne"
                  >
                    <CardBody className="subjects-topics">
                      {data.topics.map((topic, i) => (
                        <Row className="subjects-list">
                          <Col md="8">
                            <h6 className="m-0 p-0">{topic}</h6>
                          </Col>
                          <Col md="4" className="p-0 ">
                            <Row className="m-0">
                              <Col md="11">
                              {this.state.value[index] === true ? <Input
                                
                                bsSize="sm"
                                placeholder="No of Questions"
                              /> : ''}
                              </Col>
                              <Col md="1" className="p-0">
                                <input checked={this.state.isChecked} type="checkbox" toggleChange={(e) => this.onChange(e, i)}/>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      ))}
                    </CardBody>
                  </Collapse>
                </Card>
              ))}
            </div>
          </Col>
          <Col md="4" className="p-0">
            <div className="questions-below-section">
              <Col className=" justify-content-center align-self-center text-center preference-head m-0 ">
                <h6 className="m-0 p-0">Preferences</h6>
              </Col>
              <div className="question-preference-list">
                {preferences.map((preferences, index) => (
                  <Col>
                    <CustomInput
                      type="checkbox"
                      id="exampleCustomInline"
                      label={preferences}
                      defaultChecked="true"
                      inline key={index}
                    />
                    
                  </Col>
                ))}
              </div>
            </div>
            <div className="question-start">
                <Link to={`/students/question-answers`}>
            <Button className="" color="primary">
                                        <i className="pe-7s-play btn-icon-wrapper"> </i>
                                        START
                                    </Button></Link>
            </div>
          </Col>
        </Row>

        <Col />
        <Col /> */}
      </div>
    );
  }
}

export default Questions;
