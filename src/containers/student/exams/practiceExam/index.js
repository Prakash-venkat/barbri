import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Nav,
  Row,
  Col,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  UncontrolledTooltip

} from "reactstrap";
import classnames from "classnames";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import Custom from "./components/custom";
import PreCreated from "./components/preCreated";
import OngoingExam from "../../ongoingexam/component/ongoingexam";
import PageTitle from "../../../layout/AppMain/PageTitle";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import Report from "../examReports/components/report";
import {
   faInfoCircle, 
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {customPageTitle} from "../../../../components/commonComponents/customPageTitle"
library.add(faPlay);

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "1"
    };
  }

  componentDidMount(){
    customPageTitle("Custom Exam")
  }

  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  };

  render() {
    return (
      <div className="msedge-practice-questions">
        <ReactCSSTransitionGroup
          component="div"
          transitionName="TabsAnimation"
          transitionAppear={true}
          transitionAppearTimeout={0}
          transitionEnter={false}
          transitionLeave={false}
        >
          <PageTitle
            heading="Custom Exam"
            brdcrumptwo="Exams"
            brdcrumpthree="Custom Exam"
            linkToHome="/students"
            subheading="Use Practice Exam mode to practice questions in sets (correct answers and answer explanations will be
              shown at the end of the practice exam). On the Custom tab, enter the number of questions you want to
              practice, and an appropriate exam duration will generate. When the time expires, the exam will close,
              and incomplete questions will be marked incorrect. You can adjust the exam duration to practice under
              nonstandard exam timing. You can choose questions from all subjects or from just a single subject or
              topic. You can also choose to include previously answered questions by selecting flagged, incorrect, or
              correct questions. You can go to pre-created exams, incomplete exams, and exam reports using the tabs
              below."

          />
          <div className="row">
            <div className="container-fluid bg-grey ptb-30">
              <div className="main-inner-sub">
                <div className="container-fluid exam-practice-container">
                  <Card tabs="true" className="mb-3">
                    <Row>
                      <Col md="12" className="plr-30">
                        <Row>
                          <CardHeader className="w-100 msedge-sm-card-header pr-0 msedge-tooltipicon">
                            <Nav justified>
                              <Col xs="3" sm="3" md="3" lg="3">
                                <NavItem>
                                  <NavLink
                                    href="#"
                                    id="Tooltip-custom"
                                    className={
                                      classnames({
                                        active: this.state.activeTab === "1"
                                      }) + " w-unset mx-auto msedge-sm-navlink d-flex"
                                    }
                                    onClick={() => {
                                      this.toggle("1");
                                    }}
                                  >
                                    {" "}
                                    Custom&nbsp;
                                    <span
                                      className="msedge-student-info-icon"
                                      id={
                                        "Tooltip-"
                                      }
                                    >
                                      <FontAwesomeIcon
                                        icon={
                                          faInfoCircle
                                        }
                                      />
                                    </span>
                                    <UncontrolledTooltip
                                      placement="right"
                                      className="react-tooltip-question"
                                      target={
                                        "Tooltip-custom"
                                      }
                                        >
                                      Create your own exam by specifying a number of questions, and whether to include questions from all subjects or just a single subject or topic
                                    </UncontrolledTooltip>
                                    
                                  </NavLink>
                                
                  
                                </NavItem>
                              </Col>
                              <Col xs="3" sm="3" md="3" lg="3">
                                <NavItem>
                                  <NavLink
                                    href="#"
                                    id="Tooltip-pre"
                                    className={
                                      classnames({
                                        active: this.state.activeTab === "2"
                                      }) + " w-unset mx-auto msedge-sm-navlink d-flex"
                                    }
                                    onClick={() => {
                                      this.toggle("2");
                                    }}
                                  >
                                    {" "}
                                    Pre-created&nbsp;

                                    <span
                                      className="msedge-student-info-icon"
                                      id={
                                        "Tooltip-"
                                      }
                                    >
                                      <FontAwesomeIcon
                                        icon={
                                          faInfoCircle
                                        }
                                      />
                                    </span>
                                    <UncontrolledTooltip
                                      placement="right"
                                      className="react-tooltip-question"
                                      target={
                                        "Tooltip-pre"
                                      }
                                        >
                                      Take one of the pre-created exams to simulate the real MBE
                                    </UncontrolledTooltip>
                                  </NavLink>
                                </NavItem>
                              </Col>
                              <Col xs="3" sm="3" md="3" lg="3">
                                <NavItem>
                                  <NavLink
                                    href="#"
                                    id="Tooltip-incomplete"
                                    className={
                                      classnames({
                                        active: this.state.activeTab === "3"
                                      }) + " w-unset mx-auto msedge-sm-navlink d-flex"
                                    }
                                    onClick={() => {
                                      this.toggle("3");
                                    }}
                                  >
                                    Ongoing exam&nbsp;
                                    <span
                                      className="msedge-student-info-icon"
                                      id={
                                        "Tooltip-"
                                      }
                                    >
                                      <FontAwesomeIcon
                                        icon={
                                          faInfoCircle
                                        }
                                      />
                                    </span>
                                    <UncontrolledTooltip
                                      placement="right"
                                      className="react-tooltip-question"
                                      target={
                                        "Tooltip-incomplete"
                                      }
                                        >
                                     Finish a previously started exam
                                    </UncontrolledTooltip>
                                    
                                  </NavLink>
                                </NavItem>
                              </Col>
                              <Col xs="3" sm="3" md="3" lg="3">
                                <NavItem>
                                  <NavLink
                                    href="#"
                                    id="Tooltip-exam"
                                    className={
                                      classnames({
                                        active: this.state.activeTab === "4"
                                      }) + " w-unset mx-auto msedge-sm-navlink d-flex"
                                    }
                                    onClick={() => {
                                      this.toggle("4");
                                    }}
                                  >
                                    Exam reports&nbsp;
                                    <span
                                      className="msedge-student-info-icon"
                                      id={
                                        "Tooltip-"
                                      }
                                    >
                                      <FontAwesomeIcon
                                        icon={
                                          faInfoCircle
                                        }
                                      />
                                    </span>
                                    <UncontrolledTooltip
                                      placement="right"
                                      className="react-tooltip-question"
                                      target={
                                        "Tooltip-exam"
                                      }
                                        >
                                    Review your exam performance
                                    </UncontrolledTooltip>
                                  </NavLink>
                                </NavItem>
                              </Col>
                            </Nav>
                          </CardHeader>
                        </Row>
                      </Col>
                    </Row>
                    <CardBody>
                      <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                          <Custom />
                        </TabPane>
                        <TabPane tabId="2">
                          <PreCreated />
                        </TabPane>
                        <TabPane tabId="3">
                          <OngoingExam />
                        </TabPane>
                        <TabPane tabId="4">
                          <Report />
                        </TabPane>
                      </TabContent>
                    </CardBody>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}
export default Questions;
