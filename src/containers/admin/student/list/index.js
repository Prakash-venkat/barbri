import React, { Fragment } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {
  CardHeader,
  Card,
  NavLink,
  NavItem,
  TabPane,
  TabContent,
  CardBody,
  Nav,
  Col,
  Row,
} from "reactstrap";
import classnames from "classnames";
import { Link } from "react-router-dom";
import ReactTable from "react-table";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Workbook from "react-excel-workbook";
import Switch from "react-switch";
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import ReactTooltip from 'react-tooltip'

import GlobalSearchComponent from "../../../../components/admin/globalSearch";
import filterCaseInsensitive from "../../../../utils/admin/FilterCaseSensitive";
import SortIcon from "../../../../components/admin/sortIcon";
import { instance } from "../../../../actions/constants";
import {
  currentState,
  deleteData,
  getData,
  redirectPath,
  updateData
} from "../../../../actions/actionMain";
import { getSession } from "../../../routes/routePaths";
import { customPageTitle } from '../../../../components/commonComponents/customPageTitle';
import {language} from '../../../../utils/locale/locale';



class ListStudents extends React.Component {
  constructor() {
    super();
    this.state = {
      adminSession: getSession("AdminSession"),
      data: [],
      status: "Active",
      filteredData: [],
      tableLoad: [],
      innerTableLoad: [],
      activeTab: "1",
      examData: [],
      questionData: [],
      isStart: true,
    };
  }
  componentWillReceiveProps({ listData }) {
    var datalist = listData;
    var list = datalist === null || datalist === undefined || datalist === "" ? [] : datalist
    if (this.props.location.status == "y") {
      const activeData = list.filter(a => { return a.studentProfileActive === "y" })
      this.setState({
        data: activeData,
        filteredData: activeData,
      });
    } else {
      const data = list.filter(a => { return a.studentProfileActive === "y" || a.studentProfileActive === "n" })
      this.setState({
        data: this.state.adminSession.user_role === "1" ? list : data,
        filteredData: this.state.adminSession.user_role === "1" ? list : data
      });
    }
  }

  componentDidMount() {
    customPageTitle('Students')
    this.props.currentState("admin/students");
    this.props.getData();
  }

  getExamReport(id) {
    instance.get(`/students/${id.original.studentId}/exams`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,        
      }
    })
      .then(res => {
        let list = this.state.examData
        list[id.index] = res.data.data.exam == null || res.data.data.exam == "" || res.data.data.exam == undefined ?
          [] : res.data.data.exam
        this.setState({
          examData: list,
          isStart: true,
          tableLoad: false,
        });
      })
      .catch(e => {
        console.log(e);
      });
  }
  getQuestion = id => {
    instance.get(`admin/students/${id.original.studentId}/questions`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,        
      }
    })
      .then(res => {
        var list = this.state.questionData
        list[id.index] = res.data.data == null || res.data.data == "" ||
          res.data.data == undefined ? [] : res.data.data
        this.setState({
          questionData: list,
        });
      })
      .catch(e => {
        console.log(e);
      });
  };

  currentStudent = id => {
    this.getQuestion(id);
    this.getExamReport(id);
  };

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }


  updateStatus = (row, e) => {
    this.props.redirectPath("student");

    const dataformat = (row.studentExpectedBarExamDate).split('-')

    let month= dataformat[0]
    let date = dataformat[1]
    let year = dataformat[2]
    let convertedDate = year +'-'+month+'-'+date
    let newDate = new Date(convertedDate)

    let editStudentDetails = JSON.stringify({
      "studentFirstName": row.studentFirstName,
      "studentCode": row.studentCode,
      "studentLastName": row.studentLastName,
      "studentLawSchoolId": row.studentLawSchoolId,
      "studentExpectedBarExamDate": moment(newDate).format("ddd MMM DD YYYY HH:mm:ss +0000"),
      "studentMiddleInitial": row.studentMiddleInitial,
      "studentPrimaryEmail": row.studentPrimaryEmail,
      "studentExpectedBarExamState": row.studentExpectedBarExamState,
      "studentFullTime": row.studentFullTime,
      "studentTransfer": row.studentTransfer,
      "studentProfileActive": row.studentProfileActive === "y" ? "n" : "y",
      "studentBarExamBatch": row.studentBarExamBatch,
      "studentLawschoolName": row.studentLawSchoolName,
      "studentNoPrevBarExamsTaken": row.studentNoPrevBarExamsTaken,
      "studentLawSchoolGPA": row.studentLawSchoolGPA,
      "studentLSAT": row.studentLSAT,
      "studentBarbriId": row.studentBarbriId,
      "studentPhoneNumber": row.studentPhoneNumber,
      "userType": 3
    });
    this.props.updateData({
      data: editStudentDetails,
      id: row.studentId,
      path: "admin/students"
    })
    .then(res =>{
      this.props.getData();
  })
  };

  deleteUser = row => {
    const code = row.original.studentId;
    this.props.deleteData(`admin/students/${code}`);
  };

  columns = [
    {
      columns: [
        {
          Header: <SortIcon dataList={language.student_code} sort={true} />,
          accessor: "studentCode",
          width: 140,
          Filter: ({ value, onChange }) => (
            <input
              aria-label="student code"
              onChange={event => onChange(event.target.value)}
              value={value}
            />
          ),
          Cell: row => (
            <div className="msedge-table-content-left-align">{row.value}</div>
          )
        },
        {
          id: "fullName",
          width: 180,
          Header: <SortIcon dataList={language.name} sort={true} />,
          accessor: el => el.studentLastName + " " + el.studentFirstName + el.userLastLogin ,
          Filter: ({ value, onChange }) => (
            <input
              aria-label="student name"
              onChange={event => onChange(event.target.value)}
              value={value}
            />
          ),
          Cell: row => (
            <div className="msedge-table-content-left-align">
              <div>
              {row.original.studentFirstName + " " + row.original.studentLastName}
              </div>
              {(row.original.userLastLogin == null) || (row.original.userLastLogin == undefined) || (row.original.userLastLogin == " ") ? "" : 
              <div className="mt-2 mb-2">
                <h6 className="font-weight-400">Last login :</h6>
                <p>{row.original.userLastLogin}</p>
              </div> }
            </div>
          )
        },
        {
          Header: <SortIcon dataList={language.lawschoolName} sort={true} />,
          accessor: "studentLawSchoolName",
          width: 200,
          Filter: ({ value, onChange }) => (
            <input
              aria-label="lawschool name"
              onChange={event => onChange(event.target.value)}
              value={value}
            />
          ),
          Cell: row => (
            <div className="msedge-table-content-left-align">{row.value}</div>
          )
        },
        {
          Header: <SortIcon dataList={language.bar_exam_batch} sort={true} />,
          filterable: true,
          accessor: "studentBarExamBatch",
          Filter: ({ value, onChange }) => (
            <input
              aria-label="student bar exam batch"
              onChange={event => onChange(event.target.value)}
              value={value}
            />
          ),
          Cell: row => (
            <div className="msedge-table-content-left-align exam-batch">
              {row.value}
            </div>
          )
        },
        {
          Header: "Status ",
          accessor: "studentProfileActive",
          sortable: false,
          id: "student_active",
          Cell: row => {
            return (
              <div className="msedge-table-content-center-align">
                {row.value === "d" ? <div><h3 className="mb-0 delete-icon">X</h3></div> :
                  <Switch
                    checked={row.value === "y" ? true : false}
                    onChange={this.updateStatus.bind(this, row.original)}
                    onColor="#86d3ff"
                    onHandleColor="#2693e6"
                    handleDiameter={23}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                    height={15}
                    width={42}
                    aria-label="status"
                    onHandleColor="#006EBD"
                    disabled={this.state.adminSession.user_role === "3" ? true : false}
                  />}
              </div>
            );
          },
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
              aria-label="status"
              onChange={event => onChange(event.target.value)}
              style={{ width: "100%" }}
              value={filter ? filter.value : this.props.location.status ? this.props.location.status : "all"}
            >
              <option value="all">Show All</option>
              <option value="y">Active</option>
              <option value="n">Inactive</option>
              <option value="d">Deleted</option>
            </select>
          )
        },

        {
          Header: "Actions",
          accessor: "action",
          filterable: false,
          sortable: false,
          width:200,
          Cell: row => (
            <div className="msedge-table-content-center-align">
              <ReactTooltip className="customeTheme" id='delete_button' type='info' effect='solid'>
                <span>Delete</span>
              </ReactTooltip>
              <ReactTooltip className="customeTheme" id='edit_button' type='info' effect='solid'>
                <span>Edit</span>
              </ReactTooltip>

              <Link
                to={{
                  pathname:
                    this.state.adminSession.user_role == "3" ? "" : "/admin/add_student",
                    query: row
                }}
                disabled={this.state.adminSession.user_role == "3" ? true : false}
                aria-label="edit student details"
              >
                <button
                  data-tip
                  data-for="edit_button"
                  aria-label="edit"
                  className="btn btn-outline-primary fs-icon"
                  onClick={this.toggle}
                  disabled={this.state.adminSession.user_role == "3" ? true : false}
                  id="edit_button"
                >
                  <FontAwesomeIcon icon={faPencilAlt} />
                </button>
              </Link>
              <button
                data-tip
                data-for="delete_button"

                aria-label="delete"
                className="ml-3 btn btn-outline-primary fs-icon"
                onClick={this.deleteUser.bind(this, row)}
                disabled={
                  this.state.adminSession.user_role == "2" || this.state.adminSession.user_role == "3" || row.original.studentProfileActive === "d"
                    ? true
                    : false
                }
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
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
          Header: <SortIcon dataList={language.exam_name} sort={true} />,
          accessor: "examName",
          Cell: row => (
            <div className="msedge-table-content-left-align" >{row.value}</div>
          )
        },
        {
          Header: <SortIcon dataList={language.exam_date} sort={true} number={true} />,
          accessor: "examTakenAt",
          Cell: row => (
            <div className="msedge-table-content-right-align">
              {moment(row.value).format("MM-DD-YYYY")}
            </div>
          )
        },
        {
          Header: <SortIcon dataList={language.total_questions} sort={true} number={true} />,
          accessor: "examTotalQuestions",
          Cell: row => (
            <div className="msedge-table-content-right-align">
              {row.value}
            </div>
          )
        },
        {
          Header: (
            <SortIcon
              dataList={language.total_correct_questions}
              sort={true}
              number={true}
            />
          ),
          id: "total_questions",
          accessor: "examRightAnswersCount",
          Cell: row => (
            <div className="msedge-table-content-right-align">{row.value}</div>
          )
        }
      ]
    }
  ];
  questionTabTableschema = [
    {
      columns: [
        {
          Header: <SortIcon dataList={language.subject} sort={true} />,
          accessor: "questionProgressSummarySubjectName",
          Cell: row => (
            <div className="msedge-table-content-left-align">{row.value}</div>
          )
        },
        {
          Header: (
            <SortIcon
              dataList={language.total_questions}
              sort={true}
              number={true}
            />
          ),
          accessor: "questionProgressSummaryAnsweredQuestions",
          Cell: row => (
            <div className="msedge-table-content-right-align">{row.value}</div>
          )
        },
        {
          Header: (
            <SortIcon
              dataList={language.total_correct_questions}
              sort={true}
              number={true}
            />
          ),
          accessor: "questionProgressSummaryCorrectAnswer",
          Cell: row => (
            <div className="msedge-table-content-right-align">{row.value}</div>
          )
        },
        
      ]
    }
  ];

  handleSetData = data => {
    this.setState({ filteredData: data });
  };
  getFileName = () => {
    let date = Date.now();
    let dateFormat = moment(date).format("MM-DD-YYYY");
    let d = new Date();
    let dformat = `${d.getHours()}-${d.getMinutes()}-${d.getSeconds()}`;
    return "STUDENT_DATA_" + dateFormat + "_" + dformat + ".xlsx";
  };

  render() {
    let Studentsdata = this.state.data.map(data => {
      return {
        name: data.studentFirstName + " " + data.studentLastName,
        studentCode: data.studentCode,
        studentLawschoolName: data.studentLawSchoolName,
        batch: data.studentBarExamBatch,
        email: data.studentPrimaryEmail,
        phone: data.studentPhoneNumber
      };
    });
    
    return (
      <div>
        <div className="msedge-admin-student-list">
          <Fragment>
            <ReactCSSTransitionGroup
              component="div"
              transitionName="TabsAnimation"
              transitionAppear={true}
              transitionAppearTimeout={0}
              transitionEnter={false}
              transitionLeave={false}
            >
              <div className="container-fluid mt-2">
                <Row>
                  <Col xs="12" sm="12" md="4" lg="3" xl="3">
    <h5 className="msedge-overview-text">{language.students}</h5>
                  </Col>

                  <Col md="5" lg="9" sm="5" md="">
                    <Row className="pull-right pr-3">
                      <span className="pr-2">
                        <GlobalSearchComponent
                          data={
                            this.state.data === null || this.state.data === ""
                              ? []
                              : this.state.data
                          }
                          handleSetData={this.handleSetData}
                        />
                      </span>
                      <span className="pr-2">
                        <div className="form-group">
                          <Link
                            to="/admin/add_student"
                            className="msedge-add-law-school-btn msedge-questions-start msedge-admin-add-btn msedge-student-list-icon"
                            disabled={this.state.adminSession.user_role == "3" ? true : false}
                          >
                            <button
                              type="submit"
                              tabIndex="-1"
                              className="btn btn-outline-primary d-flex"
                              disabled={
                                this.state.adminSession.user_role == "3" ? true : false
                              }
                            >
                              <li>
                                <i className="pe-7s-plus" aria-hidden="true"></i>
                              </li>
                              <li className="text-uppercase">Add</li>
                            </button>
                          </Link>
                        </div>
                      </span>
                      <span className="pr-2">
                        <div  tabIndex="-1" className="form-group msedge-questions-start msedge-admin-add-btn msedge-student-list-btn">
                          <Workbook
                            filename={this.getFileName()}
                            element={
                              <button
                                type="button"
                                className="btn btn-outline-primary d-flex msedge-lawschool-download"
                                disabled={
                                  this.state.adminSession.user_role == "2" ||
                                    this.state.adminSession.user_role == "3"
                                    ? true
                                    : false
                                }
                                onClick={this.downloadReport}
                              >
                                <li>
                                  <i
                                    className="pe-7s-download"
                                    aria-hidden="true"
                                  ></i>
                                </li>
                                <li className="text-uppercase">Download</li>
                              </button>
                            }
                          >
                            <Workbook.Sheet data={Studentsdata} name="Students">
                              <Workbook.Column
                                label="Student Name"
                                value="name"
                              />
                              <Workbook.Column
                                label="Student Code"
                                value="studentCode"
                              />
                              <Workbook.Column
                                label="Lawschool Name"
                                value="studentLawschoolName"
                              />
                              <Workbook.Column label="Batch" value="batch" />
                              <Workbook.Column label="Email" value="email" />
                              <Workbook.Column
                                label="contact no"
                                value="phone"
                              />
                            </Workbook.Sheet>
                          </Workbook>
                        </div>
                      </span>
                      <span className="">
                        <div className="form-group msedge-questions-start msedge-admin-add-btn msedge-student-list-btn">
                          <Link
                            to="/admin/upload_student"
                            disabled={this.state.adminSession.user_role == "3" ? true : false}
                          >
                            <button
                             tabIndex="-1"
                              className="btn btn-outline-primary d-flex"
                              disabled={
                                this.state.adminSession.user_role == "3" ? true : false
                              }
                            >
                              <li>
                                <i className="pe-7s-upload" aria-hidden="true"></i>
                              </li>
                              <li className="text-uppercase">Upload</li>
                            </button>
                          </Link>
                        </div>
                      </span>
                    </Row>
                  </Col>
                </Row>
              </div>
              <Row>
                <div className="container-fluid bg-grey msedge-admin-add">
                  <div className="msedge-student-list msedge-lawschool-student-list">
                    <Row>
                      <Col md="12">
                        <div
                          className="msedge-react-table"
                          style={{ minHeight: "500px" }}
                        >
                          <ReactTable
                            className="-striped -highlight"
                            data={
                              this.state.filteredData == null ||
                                this.state.filteredData == []
                                ? []
                                : this.state.filteredData
                            }
                            columns={this.columns}
                            defaultPageSize={50}
                            minRows={2}
                            filterable
                            defaultFilterMethod={filterCaseInsensitive}
                            collapseOnDataChange={false}
                            expanded={this.state.expanded}
                            noDataText="No rows found"
                            loading={this.props.loading}
                            getTdProps={(state, rowInfo, column, instance) => {
                              return {
                                onClick: (e, handleOriginal) => {
                                  if (column.width === 35) {
                                    handleOriginal(); this.currentStudent(rowInfo)
                                  }
                                }
                              };
                            }}

                            SubComponent={(row, index) => {
                              return (
                                <div>
                                  <Card tabs="true" className="mb-3">
                                    <CardHeader>
                                      <Nav className="margin-left-20" justified>
                                        <NavItem>
                                          <NavLink
                                            href="javascript:void(0);"
                                            className={classnames({
                                              active:
                                                this.state.activeTab === "1"
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
                                              active:
                                                this.state.activeTab === "2"
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
                                      <div>
                                        <TabContent
                                          activeTab={this.state.activeTab}
                                        >
                                          <TabPane tabId="1">
                                            <ReactTable
                                              className="-striped -highlight"
                                              data={
                                                this.state.examData[row.index]
                                              }
                                              columns={this.examTabTableschema}
                                              defaultPageSize={5}
                                              minRows={2}
                                              filterable
                                              noDataText="No rows found"
                                              loading={this.state.innerTableLoad[row.index]}
                                            />
                                          </TabPane>
                                          <TabPane tabId="2">
                                            <ReactTable
                                              className="-striped -highlight"
                                              data={
                                                this.state.questionData[row.index]
                                              }
                                              columns={
                                                this.questionTabTableschema
                                              }
                                              defaultPageSize={5}
                                              minRows={2}
                                              filterable
                                              noDataText="No rows found"
                                              loading={this.state.tableLoad[row.index]}
                                            />
                                          </TabPane>
                                        </TabContent>
                                      </div>
                                    </CardBody>
                                  </Card>
                                </div>
                              );
                            }}
                          />
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Row>
            </ReactCSSTransitionGroup>
          </Fragment>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    listData: state.main.data,
    loading: state.main.load
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      currentState,
      deleteData,
      updateData,
      getData,
      redirectPath
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListStudents);
