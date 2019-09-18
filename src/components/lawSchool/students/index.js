import React from "react";
import {
  Button,
  CardHeader,
  Card,
  Collapse,
  Progress,
  NavLink,
  NavItem,
  TabPane,
  TabContent,
  CardBody,
  Nav,
  selectedOption,
  Col,
  Row
} from "reactstrap";
import "../../../assets/custom/law-school/_law_school_students.scss";
import classnames from "classnames";
import ReactTable from "react-table";
import "antd/dist/antd.css";
//import { Table } from "antd";
import Select from "react-select";
import PageTitle from "../Layout/AppMain/PageTitle";
import TextSizeSelector from "./utils/Textsizeselector";
import { reports } from "./utils/reports.json";
const options = [
  { value: "Filter", label: "Filter" },
  { value: "Catagory two", label: "Catagory two" },
  { value: "Catagory three", label: "Catagory three" }
];
export default class Example extends React.Component {
  columns = [
    {
      columns: [
        {
          Header: (
            <div className="exam-details">
              <span>Exam Name </span>
              <i className="lnr-sort-alpha-asc" />
            </div>
          ),
          accessor: "examName",
          Cell: row => (
            <div style={{ textAlign: "left", width: "100%" }}>{row.value}</div>
          )
        },
        {
          Header: (
            <div className="exam-details">
              <span>Exam Date </span>
              <i className="lnr-sort-alpha-asc" />
            </div>
          ),
          accessor: "ExamDate",
          Cell: row => (
            <div style={{ textAlign: "center", width: "100%" }}>{row.value}</div>
          )
        },
        {
          Header: (
            <div className="exam-details">
              <span>No. of Questions</span>
              <i className="lnr-sort-alpha-asc" />
            </div>
          ),
          accessor: "noOfQuestions",
          Cell: row => (
            <div style={{ textAlign: "center", width: "100%" }}>{row.value}</div>
          )
        },
        {
          Header: (
            <div className="exam-details">
              <span>Score %</span>
              <i className="lnr-sort-alpha-asc" />
            </div>
          ),
          accessor: "score",
          Cell: row => (
            <div className="text-center" style={{ width: "200px" }}>
              <div className="widget-content p-0">
                <div className="widget-content-outer">
                  <div className="widget-content-wrapper">
                    <div className="widget-content-left w-75 px-2">
                      <Progress
                        className="progress-bar-sm"
                        color={
                          row.value > 66
                            ? "success"
                            : row.value > 33
                              ? "warning"
                              : "danger"
                        }
                        value={row.value}
                      />
                    </div>
                    <div className="widget-content-right pr-2">
                      <div className="text-small text-muted">{row.value}%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      ]
    }
  ];
  questionTabTableschema = [
    {
      columns: [
        {
          Header: (
            <div className="exam-details">
              <span>Subject </span>
              <i className="lnr-sort-alpha-asc" />
            </div>
          ),
          accessor: "subject",
          Cell: row => (
            <div style={{ textAlign: "left", width: "100%" }}>{row.value}</div>
          )
        },
        {
          Header: (
            <div className="exam-details">
              <span>No. of Questions</span>
              <i className="lnr-sort-alpha-asc" />
            </div>
          ),
          accessor: "noOfQuestions",
          Cell: row => (
            <div style={{ textAlign: "center", width: "100%" }}>{row.value}</div>
          )
        },
        {
          Header: (
            <div className="exam-details">
              <span>Score %</span>
              <i className="lnr-sort-alpha-asc" />
            </div>
          ),
          accessor: "score",
          Cell: row => (
            <div className="text-center" style={{ width: "200px" }}>
              <div className="widget-content p-0">
                <div className="widget-content-outer">
                  <div className="widget-content-wrapper">
                    <div className="widget-content-left w-75 px-2">
                      <Progress
                        className="progress-bar-sm"
                        color={
                          row.value > 66
                            ? "success"
                            : row.value > 33
                              ? "warning"
                              : "danger"
                        }
                        value={row.value}
                      />
                    </div>
                    <div className="widget-content-right pr-2">
                      <div className="text-small text-muted">{row.value}%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      ]
    }
  ];
  constructor(props) {
    super(props);
    this.toggleAccordion = this.toggleAccordion.bind(this);
    this.state = {
      customFontSize: 0,
      collapse: false,
      activeTab: "1",
      collapseIndex: null,
      accordion: [false, false, false, false],
      selectedOption: null
    };
    this.toggle = this.toggle.bind(this);
    this.toggleTab = this.toggleTab.bind(this);
  }
  getTextSizeValue = range => {
    this.setState({ customFontSize: Number.parseInt(range) });
  };
  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  toggle = index => {
    this.setState(prevState => ({
      collapse: !prevState.collapse,
      collapseIndex: index
    }));
  }
  // toggle() {
  //   this.setState({ collapse: !this.state.collapse });
  // }
  toggleAccordion(tab) {
    const prevState = this.state.accordion;
    const state = prevState.map((x, index) => (tab === index ? !x : false));
    this.setState({
      accordion: state,
      activeRow: "d-flex bg-primary"
    });
  }
  render() {
    const exam = reports[0].exam;
    const exams = reports[0].question;
    return (
      <div className="lawschool-students-list">
        <div className="container-fluid">
          <PageTitle
            heading="Student List"
            subheading="Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do."
            brdcrumptwo="Students"
            brdcrumpthree="Student List"
          />
        </div>
        <div className="container-fluid">
          <Col xs="12" sm="12" md="12" lg="12" xl="12">
            <Row className="student-total ">
              <Col md="2" lg="2" sm="12" xs="12" className="text-center border student-total-first pt-4 pb-3">
                <h1>45</h1>
                <h6>Total Student</h6>
              </Col>
              <Col md="2" lg="2" sm="12" xs="12" className="border text-center answers pt-4 pb-3 bg-white">
                <h2>15</h2>
                <h5>0-30%</h5>
                <h6>Correct Answers</h6>
              </Col>
              <Col md="2" lg="2" sm="12" xs="12" className="border text-center answers pt-4 pb-3 bg-white">
                <h2>18</h2>
                <h5>30-50%</h5>
                <h6>Correct Answers</h6>
              </Col>
              <Col md="2" lg="2" sm="12" xs="12" className="border text-center answers pt-4 pb-3 bg-white">
                <h2>22</h2>
                <h5>50-80%</h5>
                <h6>Correct Answers</h6>
              </Col>
              <Col md="2" lg="2" sm="12" xs="12" className="border text-center answers pt-4 pb-3 bg-white">
                <h2>8</h2>
                <h5>80%+</h5>
                <h6>Correct Answers</h6>
              </Col>
            </Row>
          </Col>
        </div>
        <div className="container-fluid">
          <Row>
            <Col xs="12" sm="12" md="12" lg="12" xl="12" className="mt-4">
              <Row>
                <Col md="7" lg="7" xs="4" sm="4">
                </Col>
                <Col md="3" lg="3" xs="4" sm="4">
                  <div className="form-group ">
                    <input type="search" className="form-control" placeholder="Search Student" aria-label="Search through table" />
                    <span className="btn pe-7s-search search"></span>
                  </div>
                </Col>
                <Col md="2" lg="2" xs="4" sm="4">
                  <div className="form-group">
                    <Select
                      value={selectedOption}
                      onChange={this.handleChange}
                      options={options}
                      defaultValue={options[0]}
                      aria-label="select Catagory"
                    />
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>

        <div className="container-fluid">
          <table class="table table-striped border table-hover bg-white responsive-view">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Student Name</th>
                <th scope="col">Bar Exam Batch</th>
                <th scope="col">Barbri Reference#</th>
                <th scope="col"># of Answered Questions</th>
                <th scope="col">% Correct Answers</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report, index) => (
                <>
                  <tr className={this.state.accordion[index] === true ? ' bg-primary' : ' '}
                    onClick={() => this.toggleAccordion(index)}
                    aria-expanded={this.state.accordion[index]}
                  >
                    <th className={this.state.accordion[index] === true ? ' text-white' : index % 2 === 0 ? ' bg-light' : 'bg-white'} scope="row">{index + 1}</th>
                    <td className={this.state.accordion[index] === true ? ' text-white' : index % 2 === 0 ? ' bg-light' : 'bg-white'} >{report.name}</td>
                    <td className={this.state.accordion[index] === true ? ' text-white' : index % 2 === 0 ? ' bg-light' : 'bg-white  '}>{report.date}</td>
                    <td className={this.state.accordion[index] === true ? ' text-white' : index % 2 === 0 ? ' bg-light' : 'bg-white'}>{report.barbriReference}</td>
                    <td className={this.state.accordion[index] === true ? ' text-white' : index % 2 === 0 ? ' bg-light' : 'bg-white'}>{report.noOfAnswered}</td>
                    <td className={this.state.accordion[index] === true ? ' text-white' : index % 2 === 0 ? ' bg-light' : 'bg-white'}>{report.percenetageOfAnswered}</td>
                  </tr>
                  <tr>
                    <td className='p-0' colSpan={6}>
                      <Collapse
                        isOpen={this.state.accordion[index]}
                        data-parent="#accordion"
                        id="collapseOne"
                        aria-labelledby="headingOne"
                      >
                        <div>
                          <Card tabs="true" className="mb-3">
                            <CardHeader>
                              <Nav className='margin-left-20' justified>
                                <NavItem>
                                  <NavLink
                                    href="javascript:void(0);"
                                    className={classnames({
                                      active: this.state.activeTab === "1"
                                    })}
                                    onClick={() => {
                                      this.toggleTab("1");
                                    }}
                                  >
                                    Exams
                            </NavLink>
                                </NavItem>
                                <NavItem>
                                  <NavLink
                                    href="javascript:void(0);"
                                    className={classnames({
                                      active: this.state.activeTab === "2"
                                    })}
                                    onClick={() => {
                                      this.toggleTab("2");
                                    }}
                                  >
                                    Questions
                            </NavLink>
                                </NavItem>
                              </Nav>
                            </CardHeader>
                            <CardBody className="p-0">
                              <TabContent activeTab={this.state.activeTab}>
                                <TabPane tabId="1">
                                  <ReactTable
                                    className="-striped -highlight"
                                    data={reports[index].exam}
                                    columns={this.columns}
                                    defaultPageSize={5}
                                    filterable
                                  />
                                </TabPane>
                                <TabPane tabId="2">
                                  <ReactTable
                                    className="-striped -highlight"
                                    data={reports[index].question}
                                    columns={this.questionTabTableschema}
                                    defaultPageSize={5}
                                    filterable
                                  />
                                </TabPane>
                              </TabContent>
                            </CardBody>
                          </Card>
                        </div>
                      </Collapse>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}