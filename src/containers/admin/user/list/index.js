import React, { Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Switch from "react-switch";
import swal from "sweetalert";
import { Col, Row } from "reactstrap";
import { Link } from "react-router-dom";
import ReactTable from "react-table";
import ReactTooltip from 'react-tooltip'
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilAlt,
  faTrashAlt,
  faUnlockAlt
} from "@fortawesome/free-solid-svg-icons";

import {
  getData,
  deleteData,
  updateData,
  currentState,
  redirectPath
} from "../../../../actions/actionMain";
import filterCaseInsensitive from "../../../../utils/admin/FilterCaseSensitive";
import GlobalSearchComponent from "../../../../components/admin/globalSearch";
import SortIcon from "../../../../components/admin/sortIcon";
import FilterInputComponent from "../../../../components/admin/FilterInputComponent";
import { instance } from "../../../../actions/constants";
import { getSession } from "../../../routes/routePaths";
import { customPageTitle } from '../../../../components/commonComponents/customPageTitle';
import {language} from '../../../../utils/locale/locale'


class UserList extends React.Component {
  constructor() {
    super();
    this.state = {
      adminSession: getSession("AdminSession"),
      data: [],
      status: "Active",
      loading: true,
      filteredData: [],
    };
  }

  componentWillReceiveProps({ listData }) {
    var datalistCond = (listData == null) || (listData == undefined) ? [] : listData;

    var data = datalistCond.filter(a => { return a.userProfileActive != "d" })
    this.setState({
      data: this.state.adminSession.user_role === "1" ? datalistCond : data,
      filteredData: this.state.adminSession.user_role === "1" ? datalistCond : data
    });
  }

  componentDidMount() {
    customPageTitle('Users')
    this.props.currentState("admin/users");
    this.props.getData();
  }

  updateStatus = row => {
    this.props.redirectPath("user");
    var editDetails = JSON.stringify({
      userFirstName: row.userFirstName,
      userLastName: row.userLastName,
      userPrimaryEmail: row.userPrimaryEmail,
      userPhone: row.userPhone,
      userRole: row.userRole,
      userProfileActive: row.userProfileActive === "y" ? "n" : "y",
      userPassword: row.userPassword,
      userName: row.userName,
      userType: row.userType,
      userLastModifiedAt: row.userLastModifiedAt
    });
    this.props.updateData({
      data: editDetails,
      id: row.userId,
      path: 'admin/users'
    })
    .then(res =>{
      this.props.getData();
  })
  };

  triggerMail = row => {
    const user = JSON.stringify({
      userId: row.original.userId,
      userPrimaryEmail: row.original.userPrimaryEmail
    });
    instance.put(
      "users/password",
      user, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,        
        }
      }
    ).then(response => {
      if (response.data.status === "Success" || response.data.data === true) {
        swal(
          language.success,
          language.sendResetLink,
          "success"
        );
      } else {
        swal(language.erroronSendingResetLink, "", "warning");
      }
    });
  };

  handleSetData = data => {
    this.setState({
      filteredData: data
    });
  };

  columns = [
    {
      columns: [
        {
          id: "fullName",
          Header: (
            <SortIcon dataList={language.full_name} sort={true} tabindex="0" />
          ),
          Filter: props => (
            <FilterInputComponent aria_label="fullName" {...props} />
          ),
          accessor: el => el.userLastName + " " + el.userFirstName + " " + el.userLastLogin,
          width: 210,
          Cell: row => (
            <div className="msedge-table-content-left-align admin-list-word-wrap">
              <div>
              {row.original.userFirstName + " " + row.original.userLastName}
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
          id: "UsernameEmail",
          Filter: props => (
            <FilterInputComponent aria_label="user email" {...props} />
          ),
          Header: <SortIcon dataList={language.user_name_email} sort={true} />,
          accessor: "userPrimaryEmail",
          width: 240,
          Cell: row => (
            <div className="msedge-table-content-left-align admin-list-word-wrap">
              <span> {row.value}</span>
            </div>
          )
        },

        {
          Header: (
            <SortIcon dataList={language.user_type} sort={true} tabindex="0" />
          ),
          Filter: props => (
            <FilterInputComponent aria_label="user type" {...props} />
          ),
          accessor: "userType",
          width: 130,
          Cell: row => {
            return (
              <div className="msedge-table-content-left-align admin-list-word-wrap">
                {row.value === "1"
                  ? "Admin"
                  : row.value === "2"
                    ? "Law school"
                    : row.value === "3"
                      ? "Student"
                      : row.value === "4"
                        ? "Proof reader"
                        : " "}
              </div>
            );
          },
          filterMethod: (filter, row) => {
            if (filter.value === "all") {
              return true;
            }
            if (filter.value === "1") {
              return row[filter.id] === "1";
            }
            if (filter.value === "2") {
              return row[filter.id] === "2";
            }
            if (filter.value === "3") {
              return row[filter.id] === "3";
            } else {
              return row[filter.id] === "4";
            }
          },
          Filter: ({ filter, onChange }) => (
            <select
              aria-label="role"
              onChange={event => onChange(event.target.value)}
              style={{ width: "100%" }}
              value={filter ? filter.value : "all"}
            >
        <option value="all">{language.show_all}</option>
          <option value="1">{language.admin}</option>
          <option value="2">{language.lawschool}</option>
          <option value="3">{language.students}</option>
          <option value="4">{language.proof_reader}</option>
            </select>
          )
        },
        {
          Header: (
            <SortIcon dataList={language.role} sort={true} tabindex="0" />
          ),
          Filter: props => (
            <FilterInputComponent aria_label="role" {...props} />
          ),
          accessor: "userRole",
          width: 130,
          Cell: row => {
            return (
              <div className="msedge-table-content-left-align admin-list-word-wrap">
                {row.value === "1"
                  ? "Controller"
                  : row.value === "2"
                    ? "Operator"
                    : row.value === "3"
                      ? "Viewer"
                      : row.value === "4"
                        ? "Proof reader"
                        : row.value === "5"
                          ? " Law school "
                          : " Student "}
              </div>
            );
          },
          filterMethod: (filter, row) => {
            if (filter.value === "all") {
              return true;
            }
            if (filter.value === "1") {
              return row[filter.id] === "1";
            }
            if (filter.value === "2") {
              return row[filter.id] === "2";
            }
            if (filter.value === "3") {
              return row[filter.id] === "3";
            }
            if (filter.value === "4") {
              return row[filter.id] === "4";
            }
            if (filter.value === "5") {
              return row[filter.id] === "5";
            }
            if (filter.value === "6") {
              return row[filter.id] === "6";
            }
          },
          Filter: ({ filter, onChange }) => (
            <select
              aria-label="role"
              onChange={event => onChange(event.target.value)}
              style={{ width: "100%" }}
              value={filter ? filter.value : "all"}
            >
        <option value="all">{language.show_all}</option>
          <option value="1">{language.controller}</option>
          <option value="2">{language.operator}</option>
          <option value="3">{language.viewer}</option>
          <option value="4">{language.proof_reader}</option>
          <option value="5">{language.lawschool}</option>
          <option value="6">{language.students}</option>
            </select>
          )
        },

        {
          Header: <SortIcon dataList={language.status} tabindex="0" />,
          accessor: "userProfileActive",
          sortable: false,

          id: "userProfileActive",
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
                    aria-label="processed"
                    onHandleColor="#006EBD"
                    tabindex="0"
                    disabled={this.state.adminSession.user_role === "3" || row.original.userType === "2" || row.original.userType === "3" ? true : false}
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
            }
            if (filter.value === "d") {
              return row[filter.id] === "d";
            } else {
              return row[filter.id] === "n";
            }
          },
          Filter: ({ filter, onChange }) => (
            <select
              aria-label="role"
              onChange={event => onChange(event.target.value)}
              style={{ width: "100%" }}
              value={filter ? filter.value : "all"}
            >
        <option value="all">{language.show_all}</option>
          <option value="y">{language.active}</option>
          <option value="n">{language.in_active}</option>
          <option value="d">{language.deleted}</option>
            </select>
          )
        },
        {
          Header: <SortIcon dataList={language.action} tabindex="0" />,
          accessor: "action",
          filterable: false,
          sortable: false,
          width: 223,
          Cell: row => (
            <div className="msedge-table-content-center-align">
              <ReactTooltip className="customeTheme" id='delete_button' type='info' effect='solid'>
          <span>{language.delete}</span>
              </ReactTooltip>
              <ReactTooltip className="customeTheme" id='edit_button' type='info' effect='solid'>
          <span>{language.edit}</span>
              </ReactTooltip>
              <ReactTooltip className="customeTheme" id='reset_pass_button' type='info' effect='solid'>
          <span>{language.resetPassword}</span>
              </ReactTooltip>
              <button
                data-tip
                data-for="reset_pass_button"
                className="mr-3 btn btn-outline-primary fs-icon"
                aria-label="channge password"
                disabled={this.state.adminSession.user_role === "1" || row.original.userProfileActive === "d" ? false : true}
                tabIndex="0"
                onClick={() => this.triggerMail(row)}
              >
                <FontAwesomeIcon icon={faUnlockAlt} />
              </button>
              <Link
                aria-label="link to edit"
                disabled={this.state.adminSession.user_role === "3" ||
                  row.original.userRole === "5" ||
                  row.original.userRole === "6" ? true : false}
                to={{
                  pathname:
                    this.state.adminSession.user_role === "3" ||
                      row.original.userRole === "5" ||
                      row.original.userRole === "6"
                      ? ""
                      : "/admin/add_user",
                  query: row
                }}
                className="add-user-btn"
              >
                <button
                  data-tip
                  data-for="edit_button"
                  className="btn btn-outline-primary fs-icon"
                  aria-label="user edit"
                  disabled={
                    this.state.adminSession.user_role === "3" ||
                      row.original.userRole === "5" ||
                      row.original.userRole === "6"
                      ? true
                      : false
                  }
                >
                  <FontAwesomeIcon icon={faPencilAlt} />
                </button>
              </Link>
              <button
                data-tip
                data-for="delete_button"
                aria-label="delete"
                className="ml-3 btn btn-outline-primary fs-icon"
                onClick={this.props.deleteData.bind(this, `admin/users/${row.original.userId}`)}
                disabled={
                  this.state.adminSession.user_role === "2" ||
                    this.state.adminSession.user_role === "3" ||
                    row.original.userProfileActive === "d"
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

  handleSetData = data => {
    this.setState({ filteredData: data });
  };

  render() {
    return (
      <div>
        <div className="user-list">
          <Fragment>
            <ReactCSSTransitionGroup
              component="div"
              transitionName="TabsAnimation"
              transitionAppear={true}
              transitionAppearTimeout={0}
              transitionEnter={false}
              transitionLeave={false}
            >
              <div className="mt-2 container-fluid">
                <Row>
                  <Col xs="12" sm="12" md="8" lg="8" xl="8">
                    <h1
                      className="msedge-overview-text msedge-listuser-heading"
                      tabIndex="-1"
                    >
                      {language.users}
                    </h1>
                  </Col>
                  <Col xs="12" sm="12" md="4" lg="4" xl="4"
                    className="msedge-bank-listbtns"
                  >
                    <Row className="pull-right">
                      <Col xs="12" sm="12" md="6" lg="7" xl="7"
                        className="pr-0"
                      >
                        <GlobalSearchComponent
                          data={
                            this.state.data === null || this.state.data === ""
                              ? []
                              : this.state.data
                          }
                          handleSetData={this.handleSetData}
                          aria-label={language.Overall_search}
                        />
                      </Col>
                      <Col xs="12" sm="12" md="6" lg="5" xl="5"
                        className="pl-2"
                      >
                        <div className="form-group">
                          <span className="msedge-questions-start msedge-right-br msedge-student-list-btn">
                            <Link
                              to="/admin/add_user"
                              disabled={
                                this.state.adminSession.user_role === "3" ? true : false
                              }
                            >
                              <button
                                type="button"
                                tabIndex="-1"
                                className="btn btn-outline-primary d-flex"
                                disabled={
                                  this.state.adminSession.user_role === "3" ? true : false
                                }
                              >
                                <li>
                                  <i className="pe-7s-plus" aria-hidden="true"></i>
                                </li>
                                <li className="text-uppercase">
                                  {language.add}
                                </li>
                              </button>
                            </Link>
                          </span>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>

              <Row>
                <div className="container-fluid bg-grey msedge-overall-padding msedge-user-list">
                  <Col md="12">
                    <div className="user-list-data">
                      <ReactTable
                        className="bg-white"
                        data={
                          this.state.filteredData === null ||
                            this.state.filteredData === []
                            ? []
                            : this.state.filteredData
                        }
                        columns={this.columns}
                        minRows={2}
                        defaultPageSize={50}
                        filterable
                        defaultFilterMethod={filterCaseInsensitive}
                        noDataText={"No rows found"}
                        loading={this.props.loading}
                      />
                    </div>
                  </Col>
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
      getData,
      deleteData,
      updateData,
      currentState,
      redirectPath
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserList);
