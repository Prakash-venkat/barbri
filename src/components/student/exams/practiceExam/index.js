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
  Nav,
  NavItem,
  NavLink,
  FormGroup,
  Label,
  TabContent,
  TabPane
} from "reactstrap";
import classnames from 'classnames';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import {
  faPlay
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Custom } from './utils/custom';
import { PreCreated } from './utils/preCreated';
import { Incomplete } from './utils/incomplete'
import PageTitle from "../../Layout/AppMain/PageTitle";
import TextSizeSelector from "../../textsizeselector/TextSizeSelector";
import Report from '../examReports/utils/report'
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
    this.state = {
      activeTab: '1',
    };
    this.toggle = this.toggle.bind(this);
  }
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  getTextSizeValue = range => {
    this.setState({ customFontSize: Number.parseInt(range) });
  };
  render() {
    return (
      <div className="practice-questions">
        <PageTitle
          heading="Practice Exam"
          subheading="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
          brdcrumptwo="Exams"
          brdcrumpthree="Practice Exams"
        />
        {/* <div>
          <TextSizeSelector getTextSizeValue={this.getTextSizeValue} />
        </div> */}
        <div className="main-inner-sub">
          <Card tabs="true" className="mb-3">
            <CardHeader>
              <Nav justified>
                <NavItem className="col-md-3" style={{ fontSize: `${14 + this.state.customFontSize}px` }}>
                  <NavLink href="javascript:void(0);"
                    className={classnames({ active: this.state.activeTab === '1' })}
                    onClick={() => {
                      this.toggle('1');
                    }}
                  >
                    Custom
                    </NavLink>
                </NavItem>
                <NavItem className="col-md-3" style={{ fontSize: `${14 + this.state.customFontSize}px` }}>
                  <NavLink href="javascript:void(0);"
                    className={classnames({ active: this.state.activeTab === '2' })}
                    onClick={() => {
                      this.toggle('2');
                    }}
                  >
                    Pre-created
                    </NavLink>
                </NavItem>
                <NavItem className="col-md-3" style={{ fontSize: `${14 + this.state.customFontSize}px` }}>
                  <NavLink href="javascript:void(0);"
                    className={classnames({ active: this.state.activeTab === '3' })}
                    onClick={() => {
                      this.toggle('3');
                    }}
                  >
                    Incomplete
                    </NavLink>
                </NavItem>
                <NavItem className="col-md-3" style={{ fontSize: `${14 + this.state.customFontSize}px` }}>
                  <NavLink href="javascript:void(0);"
                    className={classnames({ active: this.state.activeTab === '4' })}
                    onClick={() => {
                      this.toggle('4');
                    }}
                  >
                    Exam reports
                    </NavLink>
                </NavItem>
              </Nav>
            </CardHeader>
            <CardBody>
              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                  <Custom />
                </TabPane>
                <TabPane tabId="2">
                  <PreCreated />
                </TabPane>
                <TabPane tabId="3">
                  <Incomplete />
                </TabPane>
                <TabPane tabId="4">
                  <Report />
                </TabPane>
              </TabContent>
              {/* <div className="questions-start">
                <Col xs="12" sm="12" md="12" lg="12" xl="12">
                  <Link to={`/students/exam-question`}>
                    <Button className="btn">
                      <li><FontAwesomeIcon icon={faPlay} size="1x" /></li>
                      <li>START</li>
                    </Button>
                  </Link>
                </Col>
              </div> */}
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
}
export default Questions;



