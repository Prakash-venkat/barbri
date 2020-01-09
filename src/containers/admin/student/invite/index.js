import React, { Fragment } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { Col, Row, CustomInput } from "reactstrap";
import ReactTable from "react-table";
import swal from "sweetalert";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { getData, currentState } from "../../../../actions/actionMain";
import SortIcon from "../../../../components/admin/sortIcon";
import { dataList } from "../../../../components/admin/dataList";
import GlobalSearchComponent from "../../../../components/admin/globalSearch";
import FilterInputComponent from "../../../../components/admin/FilterInputComponent";
import filterCaseInsensitive from "../../../../utils/admin/FilterCaseSensitive"
import { instance } from "../../../../actions/constants";
import { getSession } from "../../../routes/routePaths";
import { customPageTitle } from '../../../../components/commonComponents/customPageTitle';
import {language} from '../../../../utils/locale/locale'


class InviteStudent extends React.Component {
  constructor() {
    super();
    this.state = {
      adminSession: getSession("AdminSession"),
      data: [],
      filteredData: [],
      selectAll: false,
      checked: [],
      selectedStudent: [],
      isLoading: false,
      canSubmit: false,
      cursorDisable: '',
    };
  };

  componentWillReceiveProps({ listData }) {
    var datalistCond = (listData == null) || (listData == undefined) ? [] : listData;
    this.setState({
      data: datalistCond,
      filteredData: datalistCond
    });
  }

  componentDidMount() {
    customPageTitle('Invite Students')
    this.props.currentState("admin/students");
    this.props.getData();
   
  }

  selectStudent = row => {
    var checkedCopy = this.state.checked;
    checkedCopy[row.index] = !this.state.checked[row.index];
    if (checkedCopy[row.index] === false) {
      this.setState({ selectAllStudent: false });
    }
    this.setState(
      {
        checked: checkedCopy,
        selectAll: false
      },

    );
    if (this.state.checked[row.index] === true) {
      this.state.selectedStudent.push(row.original);

    } else if (this.state.checked[row.index] === false) {
      this.state.selectedStudent.splice([row.index], 1);

    }
    this.enableButton();
  };

  selectAllStudent = () => {
    var selectAll = !this.state.selectAll;
    this.setState({ selectAll: selectAll });
    var checkedCopy = [];
    this.state.filteredData.forEach(function (e, index) {
      checkedCopy.push(selectAll);
    });

    this.setState(
      {
        checked: checkedCopy
      },
      () => {
        this.state.selectedStudent.push(this.state.filteredData);
      }
    );
    this.setState(
      {
        selectedStudent: this.state.filteredData.map((inviteAll, index) => {
          return {
            userId: inviteAll.studentId,
            studentPrimaryEmail: inviteAll.studentPrimaryEmail
          };
        })
      },
      () => {
        this.enableButton()
        if(!this.state.selectAll){
          this.setState({selectedStudent:[]})
        }
      }
    );
  };

  enableButton = () => {
    const a = this.state.checked;
    const b = a.filter(a => { return a === true })
    if (b.length > 0) {
      this.setState({ canSubmit: true, cursorDisable: "" });
    } else {
      this.setState({ canSubmit: false, cursorDisable: "" });
    }
  }

  inviteStudent = () => {
    const inviteStudents = this.state.selectedStudent.map(
      (selectedStudent, index) => {
        return {
          userPrimaryEmail: selectedStudent.studentPrimaryEmail
        };
      }
    );
    const body = {
      userPassUpdateList: inviteStudents
    };

    this.setState({ isLoading: true });
    instance
      .post("admin/students/invite", body, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,        
        }
      })
      .then(response => {
        this.setState({ isLoading: false,checked:[],selectedStudent:[],selectAll: false });
        this.enableButton()
        if (response.data.status === "Success" || response.data === true) {
          swal(language.invitationSent, language.invitationSentMsg, "success");
        } else if (
          response.data.status === "Failure" ||
          response.data === false
        ) {
          swal(language.oops, language.tryAgain, "error");
          this.setState({ isLoading: false });
        }
      })
      .catch(e => {
        this.setState({ isLoading: false });
        swal(
          language.oops,
          language.tryAgain,
          "error"
        );
      });
  };

  handleSetData = data => {
    this.setState({ filteredData: data });
  };

  render() {
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
                  <Col xs="12" sm="12" md="7" lg="7" xl="7">
                    <h1
                      className="msedge-overview-text msedge-listuser-heading"
                      tabIndex="-1"
                    >
                      Invite Students
                    </h1>
                  </Col>
                  <Col xs="12" sm="12" md="5" lg="5" xl="5">
                    <Row className="pull-right">
                      <span>
                        <GlobalSearchComponent
                          data={
                            this.state.data === null || this.state.data === ""
                              ? []
                              : this.state.data
                          }
                          handleSetData={this.handleSetData}
                          aria-label={dataList.Overall_search}
                        />
                      </span>
                      <span className="pl-2">
                        <div className="form-group">
                          {!this.state.isLoading ? (
                            <span className="msedge-questions-start msedge-right-br">
                              <button
                                type="button"
                                className="btn btn-outline-primary d-flex"
                                onClick={this.inviteStudent}
                                disabled={
                                  this.state.adminSession.user_role === "2" || !this.state.canSubmit ||
                                    this.state.adminSession.user_role === "3"
                                    ? true
                                    : false
                                }
                                style={{ cursor: this.state.cursorDisable }}

                              >
                                <li>
                                  <i
                                    className="pe-7s-paper-plane"
                                    aria-hidden="true"
                                  ></i>
                                </li>
                                <li className="text-uppercase">Invite</li>
                              </button>
                            </span>
                          ) : (
                              <span className="msedge-questions-start msedge-right-br">
                                <button
                                  className="btn btn-primary d-flex"
                                  type="button"
                                  disabled
                                >
                                  <li>
                                    <span
                                      className="spinner-border spinner-border-sm mr-2"
                                      role="status"
                                      aria-hidden="true"
                                    ></span>
                                  </li>
                                  <li className="text-uppercase">
                                    Loading...
                                </li>
                                </button>
                              </span>
                            )}
                        </div>
                      </span>
                    </Row>
                  </Col>
                </Row>
              </div>

              <div className="msedge-invite-students">
                <Row>
                  <div className="container-fluid bg-grey msedge-overall-padding">
                    <Col md="12">
                      <div className="invite-student-table">
                        <ReactTable
                          className="-striped -highlight"
                          data={
                            this.state.filteredData === null ||
                              this.state.filteredData === []
                              ? []
                              : this.state.filteredData
                          }
                          defaultPageSize={50}
                          minRows={2}
                          filterable
                          defaultFilterMethod={filterCaseInsensitive}
                          collapseOnDataChange={false}
                          expanded={this.state.expanded}
                          noDataText="No rows found"
                          loading={this.props.loading}
                          onExpandedChange={(newExpanded, index, event) =>
                            this.handleRowExpanded(newExpanded, index, event)
                          }
                          columns={[
                            {
                              columns: [
                                {
                                  Header: (
                                    <div>
                                      <span>Select</span>
                                      <div className="student-select-all">
                                        <CustomInput
                                          type="checkbox"
                                          id="select_all"
                                          inline
                                          key="9"
                                          name="preference-input"
                                          className="perefrence-input float-right"
                                          checked={this.state.selectAll}
                                          onChange={this.selectAllStudent}
                                        />
                                      </div>
                                    </div>
                                  ),
                                  accessor: "studentId",
                                  width: 100,
                                  sortable: false,
                                  filterable: false,
                                  subheading: true,
                                  selectable: true,
                                  Cell: row => (
                                    <div style={{textAlign: 'center', width:'100%'}}
                                    >
                                      <CustomInput
                                        aria-label="Select checkbox"
                                        type="checkbox"
                                        id={row.value}
                                        inline
                                        key="9"
                                        name="preference-input"
                                        checked={
                                          this.state.checked[row.index] == true
                                        }
                                        onChange={() => this.selectStudent(row)}
                                      />
                                    </div>
                                  )
                                },
                                {
                                  id: "fullName",
                                  Header: (
                                    <SortIcon
                                      dataList={dataList.name}
                                      sort={true}
                                    />
                                  ),
                                  accessor: el =>
                                    el.studentLastName +
                                    " " +
                                    el.studentFirstName,
                                  filterable: true,
                                  Filter: props => (
                                    <FilterInputComponent
                                      aria_label="Student name"
                                      {...props}
                                    />
                                  ),
                                  Cell: row => (
                                    <div className="msedge-table-content-left-align admin-list-word-wrap">
                                      {row.value}
                                    </div>
                                  )
                                },
                                {
                                  Header: (
                                    <SortIcon
                                      dataList={dataList.school_name}
                                      sort={true}
                                    />
                                  ),
                                  accessor: "studentLawSchoolName",
                                  Filter: ({ value, onChange }) => (
                                    <input
                                      aria-label="law School name"
                                      onChange={event =>
                                        onChange(event.target.value)
                                      }
                                      value={value}
                                    />
                                  ),
                                  Cell: row => (
                                    <div className="msedge-table-content-left-align admin-list-word-wrap">
                                      {row.value}
                                    </div>
                                  )
                                },
                                {
                                  Header: (
                                    <SortIcon
                                      dataList={dataList.contact}
                                      sort={true}
                                    />
                                  ),
                                  id: "contact",
                                  Filter: props => (
                                    <FilterInputComponent
                                      aria_label="Contact"
                                      {...props}
                                    />
                                  ),
                                  accessor: el =>
                                    el.studentPrimaryEmail +
                                    "" +
                                    el.studentPhoneNumber,
                                  Cell: props => (
                                    <span className="admin-list-word-wrap">
                                      {props.original.studentPrimaryEmail}{" "}
                                      <br /> {props.original.studentPhoneNumber}
                                    </span>
                                  )
                                },
                                {
                                  Header: (
                                    <SortIcon
                                      dataList={dataList.bar_exam_batch}
                                      sort={true}
                                    />
                                  ),
                                  filterable: true,
                                  Filter: props => (
                                    <FilterInputComponent
                                      aria_label="Bar exam batch"
                                      {...props}
                                    />
                                  ),
                                  accessor: "studentBarExamBatch",
                                  Filter: ({ value, onChange }) => (
                                    <input
                                      aria-label="student bar exam batch"
                                      onChange={event =>
                                        onChange(event.target.value)
                                      }
                                      value={value}
                                    />
                                  ),
                                  Cell: row => (
                                    <div className="msedge-table-content-left-align exam-batch admin-list-word-wrap">
                                      {row.value}
                                    </div>
                                  )
                                }

                              ]
                            }
                          ]}
                        />
                      </div>
                    </Col>
                  </div>
                </Row>
              </div>
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
      getData
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InviteStudent);