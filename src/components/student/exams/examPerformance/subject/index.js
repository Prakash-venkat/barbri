//Authorization:
//Designed : by Usha M
//Purpose: Created for Subject performance
//Description: Table for displaying  Subject performance
import React, { Component, Fragment } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Collapse,
  Row,
  Progress
} from "reactstrap";
import "../../../../../assets/custom/students/_students_exams.scss";
import SubjectOverTime from "./utils/SubjectOverTime";
import PieChart from "./utils/PieChart";
import PageTitle from "../../../Layout/AppMain/PageTitle";
// import { subjects } from "./utils/subjects.json";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import Select from "react-select";
const settings = [
  { value: "Session", label: "Session" },
  { value: "Today", label: "Today" }
];
const options = [
  { value: "All Subjects", label: "All Subjects" },
  { value: "Evidence", label: "Evidence" },
  { value: "Real Property", label: "Real Property" },
  { value: "Torts", label: "Torts" }
];
export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      performanceOverTime: true,
      dropdownOpen: false,
      accordion: [false, false, false, false, false, false, false],
      toggleAlertAccordian: false,
      tooltipOpen: false,
      filteredData: []
    };
    this.toggleAccordion = this.toggleAccordion.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.toggleToolTip = this.toggleToolTip.bind(this);
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
  toggleToolTip() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }
  toggleAccordion(tab) {
    const prevState = this.state.accordion;
    const state = prevState.map((x, index) => (tab === index ? !x : false));
    this.setState({
      accordion: state
    });
  }
  onMouseEnter() {
    this.setState({ dropdownOpen: true });
  }
  onMouseLeave() {
    this.setState({ dropdownOpen: false });
  }
  toggleAlert = e => {
    console.log(this.state.toggleAlertAccordian);
    this.setState({
      accordion:
        this.state.toggleAlertAccordian === false
          ? [true, true, true, true, true, true, true]
          : [false, false, false, false, false, false, false],
      toggleAlertAccordian: !this.state.toggleAlertAccordian
    });
  };
  render() {
    // const topics = subjects.slice(4, 7);
    console.log(this.state.filteredData);
    if (this.state.filteredData.length === 0) {
      return null;
    }
    return (
      <Fragment>
        <ReactCSSTransitionGroup
          component="div"
          transitionName="TabsAnimation"
          transitionAppear={true}
          transitionAppearTimeout={0}
          transitionEnter={false}
          transitionLeave={false}
        >
          <PageTitle
            heading="Subject Performance"
            brdcrumptwo="Exams"
            brdcrumpthree="ExamPerformance"
            brdcrumpfour="Subject"
            subheading="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do."
          />
          <div className="main-inner-sub">
            <div className="p-0">
              <Row>
                <Col xs="12" sm="12" md="6" lg="6" xl="6"></Col>
                <Col
                  xs="12"
                  sm="12"
                  md="3"
                  lg="3"
                  xl="3"
                  className="text-right mt-2   text-grey"
                >
                  <p className="py-1">Performance Settings</p> <br />
                </Col>
                <Col xs="12" sm="12" md="3" lg="3" xl="3">
                  <Select
                    classame="py-3"
                    defaultValue={settings[0]}
                    options={settings}
                  />
                </Col>
              </Row>
              <div className="row">
                <div className="col-md-5 col-lg-4 col-sm-12 col-xs-12 padding-right-1">
                  <Card>
                    <CardBody className="ml-3 py-0">
                      <h6 className="font-weight-700 mt-4 ml-3">
                        All Subject Performance
                      </h6>
                      <div className="p-2">
                        <PieChart />
                      </div>
                      <div className="neg-margin-top-60 card-1-tablet-view">
                        {this.state.filteredData.Subjects.map(subject => (
                          <Row className="border-bottom-card">
                            <div className=" col-md-12  m-0 p-0 col-lg-5 col-xs-12">
                              <p className="text-primary mt-2 card-1-tablet-view card-head">
                                {subject.subject_name}
                              </p>
                            </div>
                            <div className=" col-md-12 m-0 p-0 d-flex col-lg-7 col-xs-12 justify-content-end">
                              <p className="card-head ml-1  mt-2">(28 of 26)</p>
                              <p
                                className={
                                  this.state.filteredData.stages.stage1 > 66
                                    ? "text-success ml-1 mt-2"
                                    : this.state.filteredData.stages.stage1 > 33
                                      ? "text-warning ml-1 mt-2"
                                      : "text-danger ml-1 mt-2"
                                }
                              >
                                -{this.state.filteredData.stages.stage1}
                              </p>
                            </div>
                          </Row>
                        ))}
                      </div>
                    </CardBody>
                  </Card>
                </div>
                <div className="col-sm-12 col-xl-8 col-lg-8 col-md-7 col-xs-12   ">
                  <Card>
                    <CardBody className="margin-bottom-tablet-card">
                      <div className="row">
                        <div className="col-lg-6 col-md-6 col-xs-12 col-sm-12 ">
                          <h6 className="font-weight-700 mt-1 ml-3">
                            Performance Over Time
                            <br />
                            <br />
                          </h6>
                        </div>
                        <div className="col-lg-4 ml-auto mt-2 col-md-6 col-xs-12 col-sm-12 ">
                          <Select defaultValue={options[0]} options={options} />
                        </div>
                      </div>
                      <SubjectOverTime />
                    </CardBody>
                  </Card>
                </div>
              </div>
              <Row>
                <Col className="py-3">
                  <div id="accordion" className="">
                    {this.state.filteredData.Subjects.map((subject, index) => (
                      <Card className="mt-2 p-0 card-border shadow-sm">
                        <CardHeader
                          id="headingOne"
                          className=" subject-accordian"
                        >
                          <Button
                            block
                            color="link"
                            className="text-left m-0 p-0 under"
                            onClick={() => this.toggleAccordion(index)}
                            aria-expanded={this.state.accordion[index]}
                            aria-controls="collapseOne"
                          >
                            <h6 className="m-0 py-1 text-body">
                              <div className="row">
                                <div className="col-md-3  col-lg-4 col-sm-4">
                                  <h6 className="under card-head mt-2">
                                    {subject.subject_name}
                                  </h6>
                                </div>
                                <div className="col-md-4 col-sm-12 col-lg-4">
                                  <div
                                    className="text-center"
                                    style={{ width: "100%" }}
                                  >
                                    <div className="widget-content p-0">
                                      <div className="widget-content-outer">
                                        <div className="widget-content-wrapper">
                                          <div className="widget-content-left w-100 px-2">
                                            <Progress
                                              className="progress-bar-sm mt-3"
                                              color={
                                                this.state.filteredData.stages.stage1 > 66
                                                  ? "success"
                                                  : this.state.filteredData.stages.stage1 > 33
                                                    ? "warning"
                                                    : "danger"
                                              }
                                              value={this.state.filteredData.stages.stage1}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-5  col-lg-4 col-sm-4  d-flex">
                                  <small className="text-grey ml-1 mt-2 margin-top-11">
                                    ( 490 answered of{" "}
                                    567 )
                                  </small>
                                  <h4
                                    className={
                                      this.state.filteredData.stages.stage1 > 66
                                        ? "text-success mt-1 ml-3 text-small-on-tablet"
                                        : this.state.filteredData.stages.stage1 > 33
                                          ? "text-warning mt-1  ml-3 text-small-on-tablet"
                                          : "text-danger mt-1 ml-3 text-small-on-tablet"
                                    }
                                  >
                                    {this.state.filteredData.stages.stage1}
                                  </h4>
                                  <i className="text-grey pe-7s-angle-down down-arrow-size px-1" />
                                </div>
                              </div>
                            </h6>
                          </Button>
                        </CardHeader>
                        <Collapse
                          isOpen={this.state.accordion[index]}
                          data-parent="#accordion"
                          id="collapseOne"
                          aria-labelledby="headingOne"
                        >
                          <CardBody>
                            {this.state.filteredData.Topics.map((newTopic, index) => (
                              <div className="row">
                                <div className="col-md-4 py-1 text-grey">
                                  {newTopic.topic_name}
                                </div>
                                <div className="col-md-4 py-1">
                                  <div
                                    className="text-center"
                                    style={{ width: " 100%" }}
                                  >
                                    <div className="widget-content p-0">
                                      <div className="widget-content-outer">
                                        <div className="widget-content-wrapper">
                                          <div className="widget-content-left w-100 px-2">
                                            <Progress
                                              className="progress-bar-sm"
                                              color={
                                                this.state.filteredData.stages.stage1 > 66
                                                  ? "success"
                                                  : this.state.filteredData.stages.stage1 > 33
                                                    ? "warning"
                                                    : "danger"
                                              }
                                              value={this.state.filteredData.stages.stage1}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-4 ">
                                  <div className="padding-left-20 d-flex">
                                    <div className=" text-grey">
                                      (70 answered of{" "}
                                      80)
                                    </div>
                                    <p className="font-weight-700 px-2">
                                      {this.state.filteredData.stages.stage1}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </CardBody>
                        </Collapse>
                      </Card>
                    ))}
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </ReactCSSTransitionGroup>
      </Fragment>
    );
  }
}
export default Home;