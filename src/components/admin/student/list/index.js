//Authorization:
//Designed : by Ajay
//Purpose: Created for student list
//Description: Table for displaying data Item

import React, { Fragment } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import _ from "lodash";
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
import classnames from "classnames";
import { reports } from "./utils/data.json"
import Select from "react-select";
import { Link } from "react-router-dom";
import ReactTable from "react-table";
import swal from "sweetalert";
import Loader from 'react-loaders'
import jsPDF from "jspdf";
import '../../lawSchool/list/utils/jspdf.min.js'
import '../../lawSchool/list/utils/jspdf.plugin.js'
// import moment from 'moment'

const options = [
  { value: "All", label: "All" },
  { value: "Active", label: "Active" },
  { value: "Inactive", label: "Inactive" },
  { value: "Deleted", label: "Deleted" }
];

export default class StudentList extends React.Component {
  constructor() {
    super();
    this.state = {
      query: " ",
      // data: makeData(),
      status: "Active",
      filteredData: [],
      student: [],
      selectedfilterOption: options[0],
      studentdefaltrow: 5,
      loading: true,
      activeTab: "1",

    };
  }
  handleSearchactive = selectedfilterOption => {
    this.setState({ selectedfilterOption });
  };


  handleSearchactive = selectedfilterOption => {
    console.log(selectedfilterOption);
    this.setState({ selectedfilterOption });
    let query = selectedfilterOption.value;
    if (query == "Active") {
      query = "y";
    } else if (query == "Inactive") {
      query = "n";
    } else if (query == "Deleted") {
      query = "d";
    } else {
      query = ''
    }
    this.setState(prevState => {
      const filteredData = this.state.data.filter(element => {
        return (
          element.student_active.toString().includes(query.toLowerCase())
        );
      });
      return {
        query,
        filteredData
      };
    });
  };


  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false })
    }, 1000);
    this.fetchData();
  }

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  createPdf = () => {
    var pdfsize = "a3";
    let columns = [
      "Student Name",
      "Student Code",
      "Expected Bar Exam",
      "Exapected Bar Exam State",
      "Law School",
      "Contact",
      "Profile Status"
    ];
    let rows = [];
    this.state.filteredData.forEach(function (obj) {
      rows.push([
        obj["student_first_name"] +
        " " + obj["student_last_name"] +
        "(" + obj["student_barbri_id"] + ")",

        obj["student_code"],
        obj["student_expected_bar_exam"].date.split(" ")[0].split("-")[1] +
        "-" +
        obj["student_expected_bar_exam"].date.split(" ")[0].split("-")[2] +
        "-" +
        obj["student_expected_bar_exam"].date.split(" ")[0].split("-")[0],

        obj["student_expected_bar_exam_state"],
        obj["student_law_school"],
        obj["student_primary_email"] +
        "," + obj["student_phone"],
        obj["student_active"] === "y"
          ? "Active"
          : obj["student_active"] === "n"
            ? "Inactive"
            : "Deleted",
      ]);
    });

    console.log(rows);
    var doc = new jsPDF("p", "pt", pdfsize);
    doc.text('Student List', 350, doc.autoTableEndPosY() + 50);
    doc.autoTable(columns, rows, {
      startY: 60,
      tableWidth: "auto",
      columnWidth: "auto",
      styles: {
        overflow: "linebreak"
      }
    });
    doc.save("student.pdf");
  };

  filterCaseInsensitive = (filter, row) => {
    const id = filter.pivotId || filter.id;
    const content = row[id];
    if (typeof content !== 'undefined') {
      // filter by text in the table or if it's a object, filter by key
      if (typeof content === 'object' && content !== null && content.key) {
        return String(content.key).toLowerCase().includes(filter.value.toLowerCase());
      } else {
        return String(content).toLowerCase().includes(filter.value.toLowerCase());
      }
    }

    return true;
  };

  fetchData = () => {
    try {
      fetch("http://barbri.thinrootsoftware.com/barbriapi/student.php")
        .then(response => response.json())
        .then(data =>
          this.setState({ filteredData: data, data }));
    }
    catch (e) {
      console.log("Something went wrong", e, e.message);
      alert('Something went wrong please try again later');
    }
  };

  deleteUser = row => {
    try {
      swal({
        title: "Are you sure?",
        text:
          "Once deleted, you will not be able to recover this!",
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then(willDelete => {
        if (willDelete) {
          const code = row.original.student_id
          let url = `http://barbri.thinrootsoftware.com/barbriapi/deletestudent.php?id=${code}`;
          console.log(url);
          fetch(url, { method: "post" }).then(resp => console.log(resp));
          swal("Row deleted successfully!", {
            icon: "success"
          });
          this.fetchData();
        } else {
          swal("Cancelled!");
        }
      });
    }
    catch (e) {
      console.log("Something went wrong", e, e.message);
      alert('Something went wrong please try again later');
    }
  };

  columns = [
    {
      columns: [
        {
          id: "fullName",
          Header: (
            <div>
              <span>Student Name </span>
              <i className="lnr-sort-alpha-asc"></i>
            </div>
          ),
          accessor: el => el.student_first_name + " " + el.student_last_name + " " + "(" + el.student_barbri_id + ")",
          Cell: row => (
            <div style={{ textAlign: "left", width: "100%" }}>{row.value}</div>
          )
        },

        {
          Header: (
            <div>
              <span>Student Code </span>
              <i className="lnr-sort-alpha-asc"></i>
            </div>
          ),
          accessor: 'student_code',
          Cell: row => (
            <div style={{ textAlign: "right", width: "100%" }}>{row.value}</div>
          )
        },

        {
          Header: (
            <div>
              <span>Expected Bar Exam </span>
              <i className="lnr-sort-alpha-asc"></i>
            </div>
          ),
          filterable: false,
          accessor: "student_expected_bar_exam.date",
          // Cell: row => {
          //   const date_formatted = row.value;
          //   const dateFormat = typeof date_formatted === "string" ? date_formatted.split(' ')[0] : ""
          //   return (
          //     <div style={{ textAlign: "right", width: "100%" }}>{dateFormat}</div>
          //   )
          // }
          Cell: row => (

            <div style={{ textAlign: "right", width: "100%" }}>
              {row.value.split(" ")[0].split("-")[1]}-{row.value.split(" ")[0].split("-")[2]}-{row.value.split(" ")[0].split("-")[0]}
            </div>
          )

        },
        {
          Header: (
            <div>
              <span>Expected Bar Exam State </span>
              <i className="lnr-sort-alpha-asc"></i>
            </div>
          ),
          accessor: "student_expected_bar_exam_state",
          Cell: row => (
            <div style={{ textAlign: "left", width: "100%" }}>{row.value}</div>
          )
        },
        {
          Header: (
            <div>
              <span>Law School </span>
              <i className="lnr-sort-alpha-asc"></i>
            </div>
          ),
          accessor: "student_law_school",
          Cell: row => (
            <div style={{ textAlign: "left", width: "100%" }}>{row.value}</div>
          )
        },

        {
          Header: "Contact",
          id: "contact",
          accessor: el => (el.student_primary_email + el.student_phone),
          filterMethod: (filter, row) => {
            const escapedStr = filter.value.toLowerCase();
            const termsArr = escapedStr.split(" ");
            const finalRegexStr = termsArr.reduce(
              (acc, curr, idx) => acc + "(?=.*" + curr + ")",
              ""
            );
            const regex = new RegExp(finalRegexStr);
            return regex.test(row[filter.id]);
          },
          Cell: props => <span>{props.original.student_primary_email} <br /> {props.original.student_phone}</span>
        },

        {
          Header: "Profile Active ",
          accessor: "student_active",
          sortable: false,
          Cell: row => (
            <div style={{ textAlign: "center", width: "100%" }}>
              {row.value}
            </div>
          ),
          id: "student_active",
          Cell: ({ value }) =>
            value === "y" ? "Active" : value === "n" ? "InActive" : "Deleted",
          filterMethod: (filter, row) => {
            if (filter.value === "all") {
              return true;
            }
            if (filter.value === "y") {
              return row[filter.id] === "y";
            } else if (filter.value === "n") {
              return row[filter.id] === "n";
            } else {
              return row[filter.id] === "d";
            }
          },
          Filter: ({ filter, onChange }) => (
            <select
              onChange={event => onChange(event.target.value)}
              style={{ width: "100%" }}
              value={filter ? filter.value : "all"}
            >
              <option value="all">Show All</option>
              <option value="y">Active</option>
              <option value="n">InActive</option>
              <option value="d">Deleted</option>
            </select>
          )
        },

        {
          Header: "Actions",
          accessor: "action",
          filterable: false,
          sortable: false,
          width: 150,
          Cell: row => (
            <div className="text-center">
              <Link
                to={{
                  pathname: "/admin/student-add",
                  query: row
                }}
              >
                <Button
                  className="mb-1 ml-3 btn-icon btn-icon-only"
                  color="primary"
                  onClick={this.toggle}
                >
                  <i className="pe-7s-pen btn-icon-wrapper"> </i>
                </Button>
              </Link>
              <Button
                className="mb-1 ml-3 btn-icon btn-icon-only"
                color="primary"
                onClick={this.deleteUser.bind(this, row)}
              >
                <i className="pe-7s-trash btn-icon-wrapper"> </i>
              </Button>
            </div>
          )
        }
      ]
    }
  ];


  examTabTableschema = [
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
            <div style={{ textAlign: "right", width: "100%" }}>{row.value}</div>
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
            <div style={{ textAlign: "right", width: "100%" }}>{row.value}</div>
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
            <div className="text-right" style={{ width: "200px" }}>
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
            <div style={{ textAlign: "right", width: "100%" }}>{row.value}</div>
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
            <div style={{ width: "200px" }}>
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





  handleChange = event => {
    const query = event.target.value;
    this.setState({ query: event.target.value });
    this.setState(prevState => {
      const filteredData = this.state.data.filter(element => {
        return (
          // element.student_first_name.toLowerCase().concat(" " + element.student_last_name.toLowerCase()) ||
          element.student_first_name
            .concat(" " + element.student_last_name)
            .toLowerCase()
            .includes(query.toLowerCase()) ||
          element.student_barbri_id
            .toLowerCase()
            .includes(query.toLowerCase()) ||
          // element.contact.toString().includes(query.toLowerCase()) ||
          element.student_primary_email
            .toLowerCase()
            .includes(query.toLowerCase()) ||
          element.student_law_school.toLowerCase().includes(query.toLowerCase()) ||
          element.student_code.toString().includes(query.toLowerCase()) ||
          element.student_expected_bar_exam.toString().includes(query.toString()) ||
          element.student_active.toString().includes(query.toLowerCase())
        );
      });
      return {
        query,
        filteredData
      };
    });
  };
  render() {
    const { filter, data } = this.state;
    const { selectedfilterOption } = this.state;
    const style = {
      paddingLeft: "5px",
      color: "red"
    };
    console.log(this.state.filteredData);
    return (
      <div>
        {this.state.loading ? <div className="loader-custom">
          <div className="loader-container-inner">
            <div className="text-center">
              <Loader type="line-scale-pulse-out-rapid" />
              <h6 className="mt-2">
                Please Wait... Fetching Information
         </h6>
            </div>               </div>
        </div>
          :
          <div className="admin-student-list">
            {/* <div>
          {this.state.isLoading ? (<Loader />) : null}
        </div> */}
            <Fragment>
              <ReactCSSTransitionGroup
                component="div"
                transitionName="TabsAnimation"
                transitionAppear={true}
                transitionAppearTimeout={0}
                transitionEnter={false}
                transitionLeave={false}
              >
                <div className="mb-2 heading-section">
                  <Row className="page-title">
                    <Col xs="12" sm="12" md="5" lg="5" xl="5">
                      <h5 className="text-primary">Students List</h5>
                      <p className="text-muted">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit
                  </p>
                    </Col>
                    <Col
                      xs="12"
                      sm="12"
                      md="7"
                      lg="7"
                      xl="7"
                      className="text-right"
                    >
                      <div className="form-group">
                        <Link to="/admin/student-add">
                          <button
                            type="submit"
                            className="btn btn-outline-primary pr-5 pl-5 mr-2"
                          >
                            Add
                      </button>
                        </Link>
                        <button className="btn btn-outline-primary pr-5 pl-5 mr-2">
                          Upload
                    </button>
                      </div>
                    </Col>
                  </Row>
                </div>

                <div>
                  <Col xs="12" sm="12" md="12" lg="12" xl="12">
                    <Row className="student-total ">
                      <Col
                        md="2"
                        className="text-center border student-total-first pt-4 pb-3"
                      >
                        <h1>45</h1>
                        <h6>Total Student</h6>
                      </Col>
                      <Col md="2" className="border text-center answers pt-4 pb-3">
                        <h2>15</h2>
                        <h5>0-30%</h5>
                        <h6>Correct Answers</h6>
                      </Col>
                      <Col md="2" className="border text-center answers pt-4 pb-3">
                        <h2>18</h2>
                        <h5>30-50%</h5>
                        <h6>Correct Answers</h6>
                      </Col>
                      <Col md="2" className="border text-center answers pt-4 pb-3">
                        <h2>22</h2>
                        <h5>50-80%</h5>
                        <h6>Correct Answers</h6>
                      </Col>
                      <Col md="2" className="border text-center answers pt-4 pb-3">
                        <h2>8</h2>
                        <h5>80%+</h5>
                        <h6>Correct Answers</h6>
                      </Col>
                    </Row>
                  </Col>
                </div>
                <div className="mt-4">
                  <Row className="pt-3 pb-0">
                    <Col md="8"></Col>
                    <Col md="3 text-right">
                      <div className="form-group ">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search Student"
                          value={filter}
                          onChange={this.handleChange}
                        />
                        <span className="btn pe-7s-search search"></span>
                      </div>
                    </Col>
                    <Col md="1" className="mt-1">
                      {/* <button
                        type="submit"
                        className="btn btn-outline-primary pr-4 pl-4 mr-2"
                        id="pdf"
                        onClick={this.createPdf}
                      >
                        Download
                      </button> */}
                      {/* <button type="submit" id="pdf" onClick={this.createPdf}>
                        <i className="lnr lnr-download"></i>
                      </button> */}
                      <Button
                        className="mb-2 mr-2 btn-icon btn-icon-only"
                        color="link"
                        onClick={this.createPdf}
                      >
                        <i className="pe-7s-download download download-icon btn-icon-wrapper"> </i>
                      </Button>
                    </Col>

                    {/* <Col md="2">
                  <div className="form-group">
                    <Select
                      value={selectedfilterOption}
                      onChange={this.handleSearchactive}
                      options={options}
                      defaultValue={options[1]}
                    />
                  </div>
                </Col> */}
                  </Row>
                </div>
                <div className="student-list pt-3">
                  <Row>
                    <Col md="12">
                      <div className="main-card mb-3">
                        <div>
                          <ReactTable
                            className="-striped -highlight"
                            data={this.state.filteredData}
                            columns={this.columns}
                            defaultPageSize={5}
                            minRows={1}
                            filterable
                            defaultFilterMethod={this.filterCaseInsensitive}
                            SubComponent={(row, index) => {
                              return (
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
                                            data={reports[row.index].exam}
                                            columns={this.examTabTableschema}
                                            defaultPageSize={5}
                                            minRows={1}
                                            filterable
                                          />
                                        </TabPane>
                                        <TabPane tabId="2">
                                          <ReactTable
                                            className="-striped -highlight"
                                            data={reports[row.index].question}
                                            columns={this.questionTabTableschema}
                                            defaultPageSize={5}
                                            minRows={1}
                                            filterable
                                          />
                                        </TabPane>
                                      </TabContent>
                                    </CardBody>

                                  </Card>
                                </div>
                              )
                            }}
                          />

                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </ReactCSSTransitionGroup>
            </Fragment>
          </div>
        }
      </div>
    );
  }
}