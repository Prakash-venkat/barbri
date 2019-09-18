import React, { Component } from "react";
import Slider, { Range } from 'rc-slider';
import Circle from 'react-circle';
import { Doughnut } from 'react-chartjs-2';

import { Progress } from 'react-sweet-progress';
import { Bar } from 'react-chartjs-2';


import classnames from "classnames";
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
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Table
} from "reactstrap";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import {
  faPlay,
  faCheck,
  faSquare,
  faTimes,
  faArrowRight,
  faExclamationTriangle,
  faFlag
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cx from 'classnames';
import { quiz } from "../utils/questions.json";
import RadioInput from "./radioButton";
import ScoreBox from "./scoreBox";

import performWhite from '../../../../../assets/utils/images/icons/performance-white.png';
import performBlue from '../../../../../assets/utils/images/icons/performance-blue.png';
import clockWhite from '../../../../../assets/utils/images/icons/clock-white.png'
import ClockBlue from '../../../../../assets/utils/images/icons/clock-blue.png'
import settingsWhite from '../../../../../assets/utils/images/icons/settings-white.png'
import SettingsBlue from '../../../../../assets/utils/images/icons/settings-blue.png'

library.add(
  faPlay,
  faCheck,
  faSquare,
  faTimes
);

const performanceStudentResponse = {
  labels: [
    'A',
    'B',
    'C',
    'D',
    'E'
  ],
  datasets: [{
    data: [300, 50, 100, 200, 80],
    backgroundColor: [
      '#8dace7',
      '#71deb9',
      '#ef869e',
      '#F8C471',
      '#BB8FCE'

    ],
    hoverBackgroundColor: [
      '#7097e1',
      '#4dd6a7',
      '#eb6886',
      '#eb6886',
      '#eb6886',
    ]
  }]
};
const data = {
  labels: ['A', 'B', 'C', 'D', 'E'],
  datasets: [
    {
      fill: true,
      backgroundColor: '#0e6aae',
      label: 'Options',
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      borderCapStyle: 'round',
      pointHitRadius: 10,
      data: [19, 40, 80, 81, 56]
    }
  ]
};

export class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customFontSize: 0,
      current: 0,
      current_quiz: quiz[0],
      user_choice: "",
      score: 0,
      verifying_answer: false,
      quizlength: quiz.length,
      explanation: "",
      question_no: 1,
      choice_letter_index: "",

      activeTab: "1",
      activeTabForVerify: "1",
      seconds: '00',
      value: '',
      hideTimer: false,

      isToggleOn: true,
      isExpanded: false,
      isTimerOn: false
    };

    this.handleClick = this.handleClick.bind(this);
    this.keyDownTextField = this.keyDownTextField.bind(this);
    this.tick = this.tick.bind(this);
  }

  setTimeForQuestion = () => {

  }
  tick() {
    var min = Math.floor(this.secondsRemaining / 60);
    var sec = this.secondsRemaining - (min * 60);

    this.setState({
      value: min,
      seconds: sec,
    })

    if (sec < 10) {
      this.setState({
        seconds: "0" + this.state.seconds,
      })

    }

    if (min < 10) {
      this.setState({
        value: "0" + min,
      })

    }

    if (min === 0 & sec === 0) {
      clearInterval(this.intervalHandle);
    }


    this.secondsRemaining--
  }
  startCountDown() {
    this.intervalHandle = setInterval(this.tick, 1000);
    let time = this.state.value;
    this.secondsRemaining = time * 60;
    this.setState({
      isTimerOn: true
    })
  }

  componentDidMount() {

    this.setState({
      value: 2
    })

    this.intervalHandle = setInterval(this.tick, 1000);
    let time = this.state.value;
    this.secondsRemaining = time * 60;

    this.setState({
      isTimerOn: true
    })
    console.log(this.state.value + this.state.seconds)
    // document.onmouseup = () => {
    //   console.log(window.getSelection().toString());
    //   let range = window.getSelection().getRangeAt(0);
    //   let selectionContents = range.extractContents();
    //   let div = document.createElement("span");
    //   div.style.color = "white";
    //   div.style.backgroundColor = "red"
    //   div.appendChild(selectionContents);
    //   range.insertNode(div);
    //   div.ondblclick = () => {
    //     div.style.color = "#0e6aae";
    //     div.style.backgroundColor = "white"
    //     div.appendChild(selectionContents);
    //     range.insertNode(div);
    //   }
    // };

    document.addEventListener("keydown", this.keyDownTextField, false);



  }


  keyDownTextField(e) {
    var keyCode = e.keyCode;
    if (keyCode === 13) {
      this.handleSubmit()
    }
    if (keyCode === 65) {
      this.setState({ user_choice: this.state.current_quiz.choices[0] });
    }
    if (keyCode === 66) {
      this.setState({ user_choice: this.state.current_quiz.choices[1] });
    }
    if (keyCode === 67) {
      this.setState({ user_choice: this.state.current_quiz.choices[2] });
    }
    if (keyCode === 68) {
      this.setState({ user_choice: this.state.current_quiz.choices[3] });
    }
    if (keyCode === 39) {
      this.handleNextQuestion()
    }
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  toggleVerify(tab) {
    if (this.state.activeTabForVerify !== tab) {
      this.setState({
        activeTabForVerify: tab
      });
    }
  }
  expandeQuestion() {
    if (this.state.isExpanded === true) {
      this.setState({ isExpanded: false })
    }
    if (this.state.isExpanded === false) {
      this.setState({ isExpanded: true })
    }
  }
  // onChangeProp = propsName =>
  //     evt => {
  //         this.setState({[propsName]: evt.target.type === 'checkbox' ? evt.target.checked : +evt.target.value});
  //     };

  // getSimpleTabs = () =>
  //     dummyData.map(({name, biography}, index) => ({
  //         key: index,
  //         title: name,
  //         getContent: () => biography,
  //     }));

  selectedAnswer = option => {
    console.log('option' + option)
    this.setState({ user_choice: option });
    console.log("user chpice" + console.log(this.state.user_choice));
  };
  handleSubmit = () => {

    this.setState({
      explanation: this.state.current_quiz.ansexplanation
    });
    if (!this.state.verifying_answer) {
      if (this.state.current_quiz.answer === this.state.user_choice) {
        this.setState({
          score: this.state.score + 1
        });
      }
      this.setState({ verifying_answer: true });
    } else {
      if (this.state.current < quiz.length - 1) {
        this.setState({
          current_quiz: quiz[this.state.current + 1],
          current: this.state.current + 1,
          question_no: this.state.question_no + 1,
          verifying_answer: false,
          user_choice: ""
        });
      }
    }
  };
  handleNextQuestion = () => {

    console.log(this.state.question_no)
    if (this.state.question_no <= quiz.length) {

      this.setState({
        current_quiz: quiz[this.state.current + 1],
        current: this.state.current + 1,
        question_no: this.state.question_no + 1,
        verifying_answer: false,
        user_choice: ""


      });
    } else if (this.state.question_no > quiz.length) {
      this.setState({ current_quiz: quiz[0] })
    }
  }

  hideTimer = () => {
    if (this.state.hideTimer === true) {
      this.setState({
        hideTimer: false
      });
    }
    if (this.state.hideTimer === false) {
      this.setState({
        hideTimer: true
      });
    }
  };
  handleClick() {
    this.setState(function (prevState) {
      return { isToggleOn: !prevState.isToggleOn };
    });
  }

  render() {
    //   timer

    // let start =
    //   this.state.time == 0 ? (
    //     <button onClick={this.startTimer}>start</button>
    //   ) : null;
    // let stop = this.state.isOn ? (
    //   <button onClick={this.stopTimer}>stop</button>
    // ) : null;
    // let reset =
    //   this.state.time != 0 && !this.state.isOn ? (
    //     <button onClick={this.resetTimer}>reset</button>
    //   ) : null;
    // let resume =
    //   this.state.time != 0 && !this.state.isOn ? (
    //     <button onClick={this.startTimer}>resume</button>
    //   ) : null;

    // ////
    var self = this;
    var choices = this.state.current_quiz.choices.map(function (choice, index) {
      var classType = "";
      var selectedOne = "";

      if (self.state.verifying_answer) {
        if (choice === self.state.current_quiz.answer) {
          classType = "text-success";
        } else if (
          choice === self.state.user_choice &&
          self.state.user_choice !== self.state.current_quiz.answer
        ) {
          classType = "text-danger";
        }
      }

      return (
        <RadioInput
          key={choice}
          choice={choice}
          index={index}
          onChoiceSelect={self.selectedAnswer}
          disable={self.state.verifying_answer}
          classType={classType}
          selection={self.state.user_choice}
        />
      );
    });
    var button_name = !this.state.verifying_answer ? "ANSWER" : "NEXT";
    return (
      <div className="mcq-section">
        {/* <div>
          <TextSizeSelector getTextSizeValue={this.getTextSizeValue} />
        </div> */}
        <Col xs="12" sm="12" md="12" lg="12" xl="12">
          <Row>
            <Col xs="12" sm="12" md="8" lg="8" xl="8">
              <h6 style={{ fontSize: `${14 + this.state.customFontSize}px` }}>Criminal - 1</h6>
              {this.state.verifying_answer === true ? <div className="your-answer">
                <div className="attention-icons">
                  <i className="pe-7s-attention"></i>
                  <i className="pe-7s-flag"></i>
                </div>
                {this.state.current_quiz.answer === this.state.user_choice ? <div className="correct">
                  <div className="icon"> <FontAwesomeIcon icon={faCheck} size="1x" /></div> <h6>Congratulations! Your Answer is correct</h6>
                </div> : <div className="wrong">
                    <div className="icon"> <FontAwesomeIcon icon={faTimes} size="1x" /></div>
                    <h6>Oops..! Your Answer is Wrong. Please Try Again</h6>
                  </div>}
              </div> : ''}

              <div className="question-choice-section">
                {this.state.verifying_answer === true ? <div className="verify-answer-true">
                  <Card tabs="true" className="mb-3">
                    <CardHeader>
                      <Nav justified>
                        <NavItem>
                          <NavLink href="javascript:void(0);"
                            className={classnames({ active: this.state.activeTabForVerify === '1' })}
                            onClick={() => {
                              this.toggleVerify('1');
                            }}
                          >
                            Explanation
                                                </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink href="javascript:void(0);"
                            className={classnames({ active: this.state.activeTabForVerify === '2' })}
                            onClick={() => {
                              this.toggleVerify('2');
                            }}
                          >
                            Question
                                                </NavLink>
                        </NavItem>

                      </Nav>
                    </CardHeader>
                    <CardBody>

                      <TabContent activeTab={this.state.activeTabForVerify}>
                        <TabPane tabId="1">
                          <p>{this.state.explanation}</p>
                        </TabPane>
                        <TabPane tabId="2">
                          <p>{this.state.current_quiz.question}</p>
                        </TabPane>

                      </TabContent>

                    </CardBody>
                  </Card>
                </div> : <div className="question-section">
                    <p>{this.state.current_quiz.question}</p>
                  </div>}

                <div className="choice-section">
                  {choices}
                </div>
              </div>
              <div className="question-button-section">
                <Col xs="12" sm="12" md="12" lg="12" xl="12" className="p-0">
                  <Row className="m-0">
                    <Col xs="12" sm="12" md="6" lg="6" xl="6" className="p-0 stop">
                      <Button>STOP FOR NOW</Button>
                    </Col>
                    <Col xs="12" sm="12" md="6" lg="6" xl="6" className="p-0 answer">
                      <Button onClick={this.handleSubmit}><FontAwesomeIcon icon={faArrowRight} size="1x" /> NEXT QUESTION</Button>
                    </Col>
                  </Row>
                </Col>
              </div>
            </Col>
            <Col xs="12" sm="12" md="4" lg="4" xl="4" className="performance-settings m-0 p-0" style={{ display: this.state.isExpanded === true ? 'none' : 'block' }}>
              <Card tabs="true" className="mb-3">
                <CardHeader>
                  <div className="expand-toggle" onClick={() => {
                    this.expandeQuestion()
                  }}>
                    <h6> > </h6>
                  </div>
                  <Nav justified>
                    {/* <NavItem className="expand-area">
                  <NavLink
                   href="javascript:void(0);"
                   className={classnames({
                    //  active: this.state.activeTab === "1"
                   })}
                   
                  > <h6> > </h6> 
                  </NavLink>
                </NavItem> */}
                    {this.state.verifying_answer === false ? <NavItem style={{ background: this.state.activeTab === "1" ? '#ffffff' : '' }}>
                      <NavLink
                        // href="javascript:void(0);"
                        // className={classnames({
                        //   active: this.state.activeTab === "1"
                        // })}
                        onClick={() => {
                          this.toggle("1");
                        }}
                      >
                        <img src={this.state.activeTab === "1" ? ClockBlue : clockWhite} alt="icon" />

                      </NavLink>
                    </NavItem> : <NavItem style={{ background: this.state.activeTab === "1" ? '#ffffff' : '' }}>
                        <NavLink
                          // href="javascript:void(0);"
                          // className={classnames({
                          //   active: this.state.activeTab === "1"
                          // })}
                          onClick={() => {
                            this.toggle("1");
                          }}
                        >
                          <img src={this.state.activeTab === "1" ? performBlue : performWhite} alt="icon" />
                        </NavLink>
                      </NavItem>}

                    <NavItem style={{ background: this.state.activeTab === "2" ? '#ffffff' : '' }}>
                      <NavLink
                        // href="javascript:void(0);"
                        // className={classnames({
                        //   active: this.state.activeTab === "2"
                        // })}
                        onClick={() => {
                          this.toggle("2");
                        }}
                      >
                        <img src={this.state.activeTab === "2" ? SettingsBlue : settingsWhite} alt="icon" />
                      </NavLink>
                    </NavItem>
                  </Nav>
                </CardHeader>
                <CardBody>
                  <TabContent activeTab={this.state.activeTab}>
                    {this.state.verifying_answer === false ? <TabPane tabId="1">
                      <div className="timer-tab">
                        <div className="timer">
                          {this.state.hideTimer === true ? (
                            " "
                          ) : (
                              <div>
                                <h1>{this.state.value}:{this.state.seconds}</h1>
                                <p>mm:ss</p>
                              </div>


                            )}

                          {/* <div className="hide-timer">
                          {this.state.hideTimer === false ? (
                            <div
                              className="timer-element"
                              onClick={this.hideTimer}
                            >
                              Hide Timer
                            </div>
                          ) : (
                            <div
                              className="timer-element"
                              onClick={this.hideTimer}
                            >
                              Show Timer
                            </div>
                          )}
                        </div> */}
                        </div>
                        <div className="status">
                          <Table>

                            <tbody>
                              <tr>
                                <td>0</td>
                                <td>0</td>
                                <td>1179</td>
                              </tr>
                              <tr>
                                <td>This Login</td>
                                <td>Today</td>
                                <td>Total</td>
                              </tr>
                            </tbody>
                          </Table>
                        </div>
                        {/* {start}
                      {resume}
                      {stop}
                      {reset} */}
                        {/* <ScoreBox
              score={this.state.score}
              quizlength={this.state.quizlength}
            /> */}
                      </div>
                    </TabPane> : <TabPane tabId="1">
                        <div className="performance">
                          <h6>Performance</h6>
                          <Table>

                            <tbody>
                              <tr>
                                <td>70.8%</td>
                                <td>60.8%</td>
                                <td>58.2%</td>
                              </tr>
                              <tr>

                                <td>Your average</td>
                                <td>Law school average</td>
                                <td>National average</td>
                              </tr>
                            </tbody>
                          </Table>
                        </div>
                        <div className="timing">
                          <h6>Timing</h6>
                          <div className="timing-content-performance">
                            <li>
                              <h6>Your time</h6>
                              <p>Your answer this question in 55 seconds</p>
                            </li>
                            <li>
                              <h6>Average Time</h6>
                              <p>1 Minute 23 seconds</p>
                            </li>
                            <li>
                              <h6>Your Optimal Time</h6>
                              <p>1 Minute 3 seconds</p>
                            </li>
                            <li>
                              <h6>Average Optimal Time</h6>
                              <p>51 seconds</p>
                            </li>

                          </div>
                        </div>
                        <div className="chart">
                          <h6 className="p-2">Student responses</h6>
                          <Bar
                            data={data}
                            width={100}
                            height={100}
                            responsive={true}
                            options={{
                              maintainAspectRatio: true
                            }}
                          />
                        </div>
                        <Col className="history">
                          <h6>History</h6>
                          <Row>
                            <Col md="2" className="options"><li>A</li></Col>
                            <Col md="10"><p>8/20/2019, 5.59 PM</p></Col>
                          </Row>
                          <Row>
                            <Col md="2" className="options-error"><li>A</li></Col>
                            <Col md="10"><p>7/31/2019, 7.00 PM</p></Col>
                          </Row>
                        </Col>

                        {/* <div className="performance-tab">
                    
                      <Col className="text-center">
                     
                      </Col>
                      <Col>
                        <Table>
                        <thead>
                            <tr>
                              <th>Your's</th>
                              <th>State</th>
                              <th>National</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                              <Progress
                                                    type="circle"
                                                    width={52}
                                                    percent={62}
                                                />
                              </td>
                              <td>
                              <Progress
                                                    type="circle"
                                                    width={52}
                                                    percent={89}
                                                />
                              </td>
                              <td>
                              <Progress
                                                    type="circle"
                                                    width={52}
                                                    percent={82}
                                                />
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                        
                      
                      </Col>
                      <Col>
                        <h4>Timing</h4>
                        <div className="timing">
                          <Row>
                            <Col md="8"><h6>Your's</h6></Col>
                            <Col md="4"><li>1m 30s</li></Col>
                          </Row>
                          <Row>
                            <Col md="8"><h6>Average Time</h6></Col>
                            <Col md="4"><li>1m 30s</li></Col>
                          </Row>
                          <Row>
                            <Col md="8"><h6>Your Optional</h6></Col>
                            <Col md="4"><li>1m 30s</li></Col>
                          </Row>
                          <Row>
                            <Col md="8"><h6>Average Optimal</h6></Col>
                            <Col md="4"><li>1m 30s</li></Col>
                          </Row>
                        </div>
                      </Col>
                      <Col>
                       <h4>Students Response</h4>
                       <div className="response">
                          <Doughnut data={performanceStudentResponse}/>
                       </div>
                      </Col>
                     
                    </div> */}
                      </TabPane>}




                    <TabPane tabId="2">
                      <div className="settings-tab">
                        <div className="font-size">
                          <h4>Font size</h4>
                          <div>
                            <Row>
                              <Col md="8">
                                <Slider min={0} max={100} defaultValue={14}
                                  className="rc-slider-primary rc-slider-square mb-2" />
                              </Col>
                              <Col md="4">
                                <p>16px</p>
                              </Col>
                            </Row>

                          </div>

                        </div>
                        <div className="short-cuts">
                          <h4>Keyboard Shortcuts</h4>
                          <div>
                            <Row>
                              <Col md="8">Enable Shortcuts</Col>
                              <Col md="4">
                                <div className="switch has-switch mr-2 mb-2 mr-2" data-on-label="ON"
                                  data-off-label="OFF"
                                  onClick={this.handleClick}>
                                  <div className={cx("switch-animate", {
                                    'switch-on': this.state.isToggleOn,
                                    'switch-off': !this.state.isToggleOn
                                  })}>
                                    <input type="checkbox" /><span
                                      className="switch-left bg-primary">ON</span><label>&nbsp;</label><span
                                        className="switch-right bg-primary">OFF</span>
                                  </div>
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col md="8" className="mt-2"><h6>Submit</h6></Col>
                              <Col md="4"><li>Enter</li></Col>
                            </Row>
                            <Row>
                              <Col><h6>Select Options</h6>
                                <div className="select-options">

                                  <li>A</li>
                                  <li>B</li>
                                  <li>C</li>
                                  <li>D</li>
                                  <li>E</li>
                                </div>
                              </Col>

                            </Row>
                            <Row>
                              <Col md="8" className="mt-2"><h6>Stop</h6></Col>
                              <Col md="4"><li>S</li></Col>
                            </Row>
                            <Row>
                              <Col md="8" className="mt-2"><h6>Pause and Next</h6></Col>
                              <Col md="4"><li>></li></Col>
                            </Row>
                          </div>
                        </div>
                        <div className="highlight">
                          <h4>Enable Highlights</h4>
                          <div>
                            <Row>
                              <Col md="8">Enable Highlights</Col>
                              <Col md="4">
                                <div className="switch has-switch mr-2 mb-2 mr-2" data-on-label="ON"
                                  data-off-label="OFF"
                                  onClick={this.handleClick}>
                                  <div className={cx("switch-animate", {
                                    'switch-on': this.state.isToggleOn,
                                    'switch-off': !this.state.isToggleOn
                                  })}>
                                    <input type="checkbox" /><span
                                      className="switch-left bg-primary">ON</span><label>&nbsp;</label><span
                                        className="switch-right bg-primary">OFF</span>
                                  </div>
                                </div>
                              </Col>
                            </Row>
                            <Col className="highlight-hints"><span>Select text</span>to highlight</Col>
                            <Col className="highlight-hints"><span>Double Click</span>to remove highlight</Col>
                          </div>
                        </div>

                      </div>
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
            </Col>

          </Row>
        </Col>






        {/* <Row className="m-0">
          <Col md={this.state.isExpanded === true ? '12' : '8'} className="m-0">
            <Card>
              {this.state.isExpanded === true ? <CardHeader className="card-expanded"> 
                <div onClick={() => {
                    this.expandeQuestion()
                   }}>
                     <h6> >> </h6>
                   </div>
                
              </CardHeader> : ''}
              
              <CardBody>
              <div className="answer-section">
            {this.state.explanation === "" ? (
              ""
            ) : (
              <div className="explanation-section">
                <div className="explanation-head">
                  <h6>Answer Explanation</h6>
                </div>
                <div className="explanation-ans">
                  <p>{this.state.explanation}</p>
                </div>
              </div>
            )}
            </div>
              </CardBody>
                 
              <CardBody>
              <div className="question-section">
              <Col xs="12" sm="12" md="12" lg="12" xl="12">

              <Row className="m-0">
                <Col xs="1" sm="1" md="1" lg="1" xl="1" className=" question-number m-0 p-0">
                  <li>{this.state.question_no}</li>
                </Col>
                <Col  xs="11" sm="11" md="11" lg="11" xl="11" className="m-0 p-0">
                  <h6>{this.state.current_quiz.question}</h6>
                  <div className="choices-section">{choices}</div>
                  <div className="button-section">
                    <Col xs="12" sm="12" md="12" lg="12" xl="12">
                      <Row>
                        <Col xs="12" sm="12" md="4" lg="4" xl="4"><button
                      id="submit"
                      className="btn btn-default mb-2"
                      onClick={this.handleSubmit}
                    >
                      {button_name}
                    </button ></Col>
                        <Col xs="12" sm="12" md="4" lg="4" xl="4" className="text-center"><button
                      id="pause"
                      className="btn btn-default mb-2"
                      onClick={this.handleSubmit}
                    >
                      Pause
                    </button></Col>
                        <Col xs="12" sm="12" md="4" lg="4" xl="4" className="text-right"> <button
                      id="next"
                      className="btn btn-default mb-2"
                      onClick={this.handleNextQuestion}
                    >
                      Next Question
                    </button></Col>
                      </Row>
                    </Col>
                  </div>
                </Col>
              </Row>
              </Col>
            </div>
           </CardBody>
            </Card>
         
            
          </Col>
          <Col md="4" className="m-0 p-0" className="performance-settings" style={{display : this.state.isExpanded === true ? 'none' : 'block'}}>
            <Card tabs="true" className="mb-3">
              <CardHeader>
                
                <Nav justified>
                <NavItem className="expand-area">
                  <NavLink
                   href="javascript:void(0);"
                   className={classnames({
                    //  active: this.state.activeTab === "1"
                   })}
                   onClick={() => {
                    this.expandeQuestion()
                   }}
                  > <h6> >> </h6> 
                  </NavLink>
                </NavItem>
                  {this.state.verifying_answer === false ? <NavItem>
                    <NavLink
                      href="javascript:void(0);"
                      className={classnames({
                        active: this.state.activeTab === "1"
                      })}
                      onClick={() => {
                        this.toggle("1");
                      }}
                    >
                      Timer
                    </NavLink>
                  </NavItem> : <NavItem>
                    <NavLink
                      href="javascript:void(0);"
                      className={classnames({
                        active: this.state.activeTab === "1"
                      })}
                      onClick={() => {
                        this.toggle("1");
                      }}
                    >
                      performance
                    </NavLink>
                  </NavItem>}
                  
                  <NavItem>
                    <NavLink
                      href="javascript:void(0);"
                      className={classnames({
                        active: this.state.activeTab === "2"
                      })}
                      onClick={() => {
                        this.toggle("2");
                      }}
                    >
                      Settings
                    </NavLink>
                  </NavItem>
                </Nav>
              </CardHeader>
              <CardBody>
                <TabContent activeTab={this.state.activeTab}>
                  {this.state.verifying_answer === false ? <TabPane tabId="1">
                    <div className="timer-tab">
                      <div className="timer">
                        {this.state.hideTimer === true ? (
                          " "
                        ) : (
                          <h3>{this.state.value}:{this.state.seconds}</h3>
                        )}

                        <div className="hide-timer">
                          {this.state.hideTimer === false ? (
                            <div
                              className="timer-element"
                              onClick={this.hideTimer}
                            >
                              Hide Timer
                            </div>
                          ) : (
                            <div
                              className="timer-element"
                              onClick={this.hideTimer}
                            >
                              Show Timer
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="status">
                        <Table>
                          <thead>
                            <tr>
                              <th>This Login</th>
                              <th>Today</th>
                              <th>Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>0</td>
                              <td>0</td>
                              <td>1179</td>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                      {start}
                      {resume}
                      {stop}
                      {reset} 
                       <ScoreBox
              score={this.state.score}
              quizlength={this.state.quizlength}
            /> 
                    </div>
                  </TabPane> : <TabPane tabId="1">
                    <div className="performance-tab">
                      <Col className="text-center">
                     
                      </Col>
                      <Col>
                        <h4>Performance Level</h4>
                        <Table>
                        <thead>
                            <tr>
                              <th>Your's</th>
                              <th>State</th>
                              <th>National</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                              <Progress
                                                    type="circle"
                                                    width={52}
                                                    percent={62}
                                                />
                              </td>
                              <td>
                              <Progress
                                                    type="circle"
                                                    width={52}
                                                    percent={89}
                                                />
                              </td>
                              <td>
                              <Progress
                                                    type="circle"
                                                    width={52}
                                                    percent={82}
                                                />
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      
                      </Col>
                      <Col>
                        <h4>Timing</h4>
                        <div className="timing">
                          <Row>
                            <Col md="8"><h6>Your's</h6></Col>
                            <Col md="4"><li>1m 30s</li></Col>
                          </Row>
                          <Row>
                            <Col md="8"><h6>Average Time</h6></Col>
                            <Col md="4"><li>1m 30s</li></Col>
                          </Row>
                          <Row>
                            <Col md="8"><h6>Your Optional</h6></Col>
                            <Col md="4"><li>1m 30s</li></Col>
                          </Row>
                          <Row>
                            <Col md="8"><h6>Average Optimal</h6></Col>
                            <Col md="4"><li>1m 30s</li></Col>
                          </Row>
                        </div>
                      </Col>
                      <Col>
                       <h4>Students Response</h4>
                       <div className="response">
                          <Doughnut data={performanceStudentResponse}/>
                       </div>
                      </Col>
                      <Col className="history">
                        <h4>History</h4>
                        <Row>
                          <Col md="4"><li>A</li></Col>
                          <Col md="8"><p>8/20/2019, 5.59 PM</p></Col>
                        </Row>
                      </Col>
                    </div>
                  </TabPane>}
                 
                  

                  
                  <TabPane tabId="2">
                    <div className="settings-tab">
                      <div className="font-size">
                        <h4>Font size</h4>
                        <div>
                          <Row>
                            <Col md="8">
                            <Slider min={0} max={100} defaultValue={14}
                                            className="rc-slider-primary rc-slider-square mb-2"/>
                            </Col>
                            <Col md="4">
                              <p>16px</p>
                            </Col>
                          </Row>
                        
                        </div>
                        
                      </div>
                      <div className="short-cuts">
                        <h4>Keboard Shortcuts</h4>
                        <div>
                        <Row>
                          <Col md="8">Enable Shortcuts</Col>
                          <Col md="4">
                          <div className="switch has-switch mr-2 mb-2 mr-2" data-on-label="ON"
                                             data-off-label="OFF"
                                             onClick={this.handleClick}>
                                            <div className={cx("switch-animate", {
                                                'switch-on': this.state.isToggleOn,
                                                'switch-off': !this.state.isToggleOn
                                            })}>
                                                <input type="checkbox"/><span
                                                className="switch-left bg-primary">ON</span><label>&nbsp;</label><span
                                                className="switch-right bg-primary">OFF</span>
                                            </div>
                                        </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col md="8"><h6>Submit</h6></Col>
                          <Col md="4"><li>Enter</li></Col>
                        </Row>
                        <Row>
                          <Col><h6>Select Options</h6>
                              <div className="select-options">

                                <li>A</li>
                                <li>B</li>
                                <li>C</li>
                                <li>D</li>
                                <li>E</li>
                              </div>
                          </Col>
                          
                        </Row>
                        <Row>
                          <Col md="8"><h6>Stop</h6></Col>
                          <Col md="4"><li>S</li></Col>
                        </Row>
                        <Row>
                          <Col md="8"><h6>Pass and Next</h6></Col>
                          <Col md="4"><li>></li></Col>
                        </Row>
                        </div>
                      </div>
                      <div className="highlight">
                        <h4>Enable Highlights</h4>
                        <div>
                        <Row>
                          <Col md="8">Enable Highlights</Col>
                          <Col md="4">
                          <div className="switch has-switch mr-2 mb-2 mr-2" data-on-label="ON"
                                             data-off-label="OFF"
                                             onClick={this.handleClick}>
                                            <div className={cx("switch-animate", {
                                                'switch-on': this.state.isToggleOn,
                                                'switch-off': !this.state.isToggleOn
                                            })}>
                                                <input type="checkbox"/><span
                                                className="switch-left bg-primary">ON</span><label>&nbsp;</label><span
                                                className="switch-right bg-primary">OFF</span>
                                            </div>
                                        </div>
                          </Col>
                        </Row>
                        <Col className="highlight-hints"><span>Select text</span>to highlight</Col>
                        <Col className="highlight-hints"><span>Double Click</span>to remove highlight</Col>
                        </div>
                      </div>
                      
                    </div>
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
          </Col>
        </Row> */}
      </div>
    );
  }
}

export default Questions;
