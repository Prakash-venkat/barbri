import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "reactstrap";
import ReactTable from "react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Workbook from "react-excel-workbook";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import Switch from "react-switch";
import ReactTooltip from 'react-tooltip'
import { currentState, updateData, getData, redirectPath, deleteData } from "../../../../actions/actionMain";
import SortIcon from "../../../../components/admin/sortIcon";
import GlobalSearchComponent from "../../../../components/admin/globalSearch";
import { getSession } from "../../../routes/routePaths";
import { customPageTitle } from '../../../../components/commonComponents/customPageTitle'
import {language} from '../../../../utils/locale/locale';


class LawSchoolList extends React.Component {
  constructor() {
    super();
    this.state = {
      adminSession: getSession("AdminSession"),
      data: [],
      status: "Active",
      lawschool: [],
      filteredData: [],
      isLoading: true
    };
  }
  componentWillReceiveProps({ listData }) {
    var datalist = listData;
    var list = datalist === null || datalist === "" || datalist === undefined ? [] : datalist;
    if (this.props.location.status == "y") {
      const data = list.filter(a => { return a.lawSchoolProfileActive === "y" })
      this.setState(
        {
          data: data,
          filteredData: data,
          isLoading: false
        }
      );
    } else {
      const data = list.filter(a => { return a.lawSchoolProfileActive != "d" })
      this.setState(
        {
          data: this.state.adminSession.user_role === "1" ? list : data,
          filteredData: this.state.adminSession.user_role === "1" ? list : data,
          isLoading: false
        }
      );
    }
  }
  componentDidMount() {

    customPageTitle('Lawschools')
    this.props.currentState("admin/schools");
    this.props.getData();
    
  }

  updateStatus = (row, e) => {
    this.props.redirectPath("lawschool")
    this.setState({ isLoading: true })
    var body = JSON.stringify({
      lawSchoolName: row.lawSchoolName,
      lawSchoolCode: row.lawSchoolCode,
      lawSchoolAddress: row.lawSchoolAddress,
      lawSchoolContactLastName: row.lawSchoolContactLastName,
      lawSchoolContactFirstName: row.lawSchoolContactFirstName,
      lawSchoolPrimaryEmail: row.lawSchoolPrimaryEmail,
      lawSchoolCountry: row.lawSchoolCountry,
      lawSchoolZIP: row.lawSchoolZIP,
      lawSchoolPhoneNumber: row.lawSchoolPhoneNumber,
      lawSchoolProfileActive: row.lawSchoolProfileActive === "y" ? "n" : "y",
      lawSchoolWebsiteLink: row.lawSchoolWebsiteLink,
      lawSchoolContactPersonPhoneNumber: row.lawSchoolContactPersonPhoneNumber,
      lawSchoolPassword: row.lawSchoolPassword,
      lawSchoolUsernme: row.lawSchoolUsernme,
      lawSchoolContactPersonEmail: row.lawSchoolContactPersonEmail,
      userId: row.userId
    });
    this.props.updateData({
      data: body,
      id: row.lawSchoolId,
      path: 'admin/schools'
    })
      .then(res => {
        this.props.getData()
      })
  };

  handleSetData = data => {
    this.setState({
      filteredData: data
    });
  };
  deleteUser = row => {
    var code = row.original.lawSchoolId
    this.props.deleteData(`admin/schools/${code}`)
  };
  columns = [
    {
      columns: [
        {
          Header: <SortIcon dataList={language.school_name} sort={true} />,
          id: "lawschoolcode",
          accessor: el => el.lawSchoolName + el.lawSchoolCode,
          width: 240,
          Filter: ({ value, onChange }) => (
            <input
              aria-label="law School name"
              onChange={event => onChange(event.target.value)}
              value={value}
            />
          ),
          Cell: props => (
            <span className="admin-list-word-wrap">
              <p className="table-lawschool-code">
                {" "}
                {props.original.lawSchoolCode}
              </p>
              <p>{props.original.lawSchoolName}</p>
            </span>
          )
        },
        {
          Header: <SortIcon dataList={language.address} sort={true} />,
          id: "address",
          accessor: el =>
            el.lawSchoolAddress +
            el.lawSchoolPhoneNumber +
            el.lawSchoolPrimaryEmail,
          width: 250,
          Cell: props => (
            <div>
              <p> {props.original.lawSchoolAddress}</p>
              <p>{props.original.lawSchoolPhoneNumber}</p>
              <p>{props.original.lawSchoolPrimaryEmail}</p>
            </div>
          )
        },
        {
          Header: <SortIcon dataList={language.contact} sort={true} />,
          id: "contact",
          width: 240,
          accessor: el => el.lawSchoolContactLastName +
            "" +
            el.lawSchoolContactFirstName +
            "" +
            el.lawSchoolContactPersonPhoneNumber +
            "" +
            el.lawSchoolContactPersonEmail,
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
          Cell: row => (
            <span className="admin-list-word-wrap">
              {row.original.lawSchoolContactLastName + " " + row.original.lawSchoolContactFirstName}
              <br />
              {row.original.lawSchoolContactPersonPhoneNumber}
              <br />
              {row.original.lawSchoolContactPersonEmail}
            </span>
          )
        },

        {
          Header: "Status",
          accessor: "lawSchoolProfileActive",
          sortable: false,
          id: "lawSchoolProfileActive",
          Cell: row => {
            return (
              <div className="msedge-table-content-center-align">
                {row.value === "d" ? (
                  <div>
                    <h3 className="mb-0 delete-icon">X</h3>
                  </div>
                ) : (
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

                      disabled={this.state.adminSession.user_role === "3" ? true : false}
                    />
                  )}
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
          Header: "Action",
          filterable: false,
          sortable: false,
          Cell: row => (
            <div className="msedge-table-content-center-align">
              <ReactTooltip className="customeTheme" id='delete_button' type='info' effect='solid'>
                <span>Delete</span>
              </ReactTooltip>
              <ReactTooltip className="customeTheme" id='edit_button' type='info' effect='solid'>
                <span>Edit</span>
              </ReactTooltip>
              <Link
                aria-label="link to add"
                to={{
                  pathname:
                    this.state.adminSession.user_role === "3" ? "" : "/admin/add_lawschool",
                  query: row
                }}
                className="mesedge-law-school-btn"
                disabled={this.state.adminSession.user_role === "3" ? true : false}
              >
                <button
                  data-tip
                  data-for="edit_button"
                  onClick={this.onClickRow}
                  className="btn btn-outline-primary fs-icon"
                  aria-label="edit"
                  tabIndex="0"
                  disabled={this.state.adminSession.user_role === "3" ? true : false}
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
                tabIndex="0"
                disabled={
                  this.state.adminSession.user_role === "2" || this.state.adminSession.user_role === "3" || row.original.lawSchoolProfileActive === "d"
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

  filterCaseInsensitive = (filter, row) => {
    const id = filter.pivotId || filter.id;
    const content = row[id];
    if (typeof content !== "undefined") {
      if (typeof content === "object" && content !== null && content.key) {
        return String(content.key)
          .toLowerCase()
          .includes(filter.value.toLowerCase());
      } else {
        return String(content)
          .toLowerCase()
          .includes(filter.value.toLowerCase());
      }
    }
    return true;
  };

  render() {
    const data2 =
      this.state.data === null || this.state.data === "" ? [] : this.state.data;
    let data = data2.map(data => {
      return {
        code: data.lawSchoolCode,
        schoolname: data.lawSchoolName,
        schoolnumber: data.lawSchoolPhoneNumber,
        schoolemail: data.lawSchoolPrimaryEmail,
        address: data.lawSchoolAddress,
        contactname:
          data.lawSchoolContactLastName + " " + data.lawSchoolContactFirstName,
        contactphone: data.lawSchoolContactPersonPhoneNumber,
        contactemail: data.lawSchoolContactPersonEmail
      };
    });

    return (
      <div>
        <ReactCSSTransitionGroup
          component="div"
          transitionName="TabsAnimation"
          transitionAppear={true}
          transitionAppearTimeout={0}
          transitionEnter={false}
          transitionLeave={false}
        >
          <div className="msedge-admin-law-school">
            <Fragment>
              <div className="container-fluid mt-2">
                <Row>
                  <Col
                    xs="12"
                    sm="12"
                    md="4"
                    lg="4"
                    xl="4"
                    className="msedge-admin-title"
                  >
                    <h1 className="msedge-overview-text" tabIndex="-1">
                      {language.law_schools}
                    </h1>
                  </Col>
                  <Col xs="12" sm="12" md="8" lg="8" xl="8">
                    <Row className="pull-right pr-3">
                      <span className="pr-2">
                        <div className="form-group ">
                          <GlobalSearchComponent
                            data={
                              this.state.data === null || this.state.data === ""
                                ? []
                                : this.state.data
                            }
                            handleSetData={this.handleSetData}
                          />
                        </div>
                      </span>
                      <span className="pr-2">
                        <div className="form-group">
                          <Link
                            to="/admin/add_lawschool"
                            className="mesedge-law-school-btn msedge-questions-start msedge-admin-add-btn"
                          >
                            <button
                              type="button"
                              tabIndex="-1"
                              className="btn btn-outline-primary d-flex"
                              disabled={
                                this.state.adminSession.user_role == "3" ? true : false
                              }
                            >
                              <li>
                                <i className="pe-7s-plus" aria-hidden="true"></i>
                              </li>
                              <li className="text-uppercase">{language.add}</li>
                            </button>
                          </Link>
                        </div>
                      </span>
                      <span>
                        <div className="form-group msedge-questions-start msedge-admin-add-btn msedge-admin-dwnload-btn">
                          <Workbook
                            filename={"LAWSCHOOL_DATA.xlsx"}
                            element={
                              <button
                                type="button"
                                className="btn btn-outline-primary msedge-lawschool-download d-flex"
                                disabled={
                                  data.length == 0 ||
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
                              <li className="text-uppercase">{language.download}</li>
                              </button>
                            }
                          >
                            <Workbook.Sheet data={data} name="Students">
                              <Workbook.Column
                                label="School Code"
                                value="code"
                              />
                              <Workbook.Column
                                label="Lawschool Name"
                                value="schoolname"
                              />
                              <Workbook.Column
                                label="Lawschool No."
                                value="schoolnumber"
                              />
                              <Workbook.Column
                                label="Lawschool Email"
                                value="schoolemail"
                              />
                              <Workbook.Column
                                label="Address"
                                value="address"
                              />
                              <Workbook.Column
                                label="Contact Person Name"
                                value="contactname"
                              />
                              <Workbook.Column
                                label="Contact Person Phone"
                                value="contactphone"
                              />
                              <Workbook.Column
                                label="Contact Person Email"
                                value="contactemail"
                              />
                            </Workbook.Sheet>
                          </Workbook>
                        </div>
                      </span>
                    </Row>
                  </Col>
                </Row>
              </div>

              <Row>
                <div className="container-fluid bg-grey msedge-overall-padding">
                  <Col md="12">
                    <div className="law-school-table">
                      <ReactTable
                        id="table"
                        className="bg-white rounded table-font"
                        data={
                          this.state.filteredData === null ||
                            this.state.filteredData === ""
                            ? []
                            : this.state.filteredData
                        }
                        defaultFilterMethod={this.filterCaseInsensitive}
                        columns={this.columns}
                        defaultPageSize={50}
                        minRows={2}
                        filterable
                        noDataText="No rows found"
                        loading={this.props.isLoading}
                      />
                    </div>
                  </Col>
                </div>
              </Row>
            </Fragment>
          </div>
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    listData: state.main.data,
    isLoading: state.main.load
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      currentState,
      getData, updateData, redirectPath, deleteData
    },
    dispatch
  );
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LawSchoolList);
