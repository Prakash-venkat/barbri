import React, { Fragment } from "react";
import { Row, Col, UncontrolledTooltip } from "reactstrap";
import ReactTable from "react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import Switch from "react-switch";
import ReactTooltip from 'react-tooltip'

import {
  getData,
  deleteData,
  currentState,
  updateData,
  redirectPath
} from "../../../../actions/actionMain";
import { dataList } from "../../../../components/admin/dataList";
import SortIcon from "../../../../components/admin/sortIcon";
import GlobalSearchComponent from "../../../../components/admin/globalSearch";
import filterCaseInsensitive from "../../../../utils/admin/FilterCaseSensitive";
import { getSession } from "../../../routes/routePaths";
import { customPageTitle } from '../../../../components/commonComponents/customPageTitle'
import {language} from '../../../../utils/locale/locale'


class LawSchoolEnquiry extends React.Component {
  constructor() {
    super();
    this.state = {
      adminSession: getSession("AdminSession"),
      query: "",
      data: [],
      lawschool: [],
      filteredData: [],
    };
  }

  updateStatus = (row, e) => {
    this.props.redirectPath("lawschool_enquiry");
    var body = JSON.stringify({
      enquiryStatus: row.enquiryStatus === "y" ? "n" : "y",
      enquiryPrimaryEmail: row.enquiryPrimaryEmail,
      enquiryName: row.enquiryName,
      enquiryLawschoolName: row.enquiryLawschoolName,
      enquiryPhoneNumber: row.enquiryPhoneNumber,
      enquiryCreatedDate: row.enquiryCreatedDate
    });
    this.props.updateData({
      data: body,
      id: row.enquiryId,
      path: 'admin/school/enquiry'
    })
    .then(res =>{
      this.props.getData();
  })
  };

  componentWillReceiveProps({ listData }) {
    var datalistCond = (listData == null) || (listData == undefined) ? [] : listData;
    var data = datalistCond.filter(a => { return a.enquiryStatus != "d" })
    this.setState({
      data: this.state.adminSession.user_role === "1" ? datalistCond : data,
      filteredData: this.state.adminSession.user_role === "1" ? datalistCond : data
    });
  }

  componentDidMount() {

    customPageTitle('Enquires')
    this.props.currentState("admin/schools/enquiry");
    this.props.getData();
  }
  deleteUser = row => {
    const code = row.original.enquiryId;
    this.props.deleteData(`admin/school/enquiry/${code}`);
  };

  columns = [
    {
      columns: [
        {
          Header: <SortIcon dataList={language.name} sort={true} />,
          accessor: "enquiryName",
          Filter: ({ value, onChange }) => (
            <input
              aria-label="enquiry name"
              onChange={event => onChange(event.target.value)}
              value={value}
            />
          ),
          Cell: row => (
            <div className="msedge-table-content-left-align">{row.value}</div>
          )
        },
        {
          Header: <SortIcon dataList={language.email} sort={true} />,
          accessor: "enquiryPrimaryEmail",
          Filter: ({ value, onChange }) => (
            <input
              aria-label="enquiry email"
              onChange={event => onChange(event.target.value)}
              value={value}
            />
          ),
          Cell: row => (
            <div className="msedge-table-content-left-align admin-list-word-wrap">{row.value}</div>
          )
        },
        {
          Header: <SortIcon dataList={language.law_school_name} sort={true} />,
          accessor: "enquiryLawschoolName",
          Filter: ({ value, onChange }) => (
            <input
              aria-label="enquiry law school name"
              onChange={event => onChange(event.target.value)}
              value={value}
            />
          ),
          Cell: row => (
            <div className="msedge-table-content-left-align admin-list-word-wrap">{row.value}</div>
          )
        },
        {
          Header: (
            <SortIcon
              dataList={language.phone_number}
              sort={true}
              number={true}
            />
          ),
          accessor: "enquiryPhoneNumber",
          width: 150,
          Filter: ({ value, onChange }) => (
            <input
              aria-label="enquiry phone number"
              onChange={event => onChange(event.target.value)}
              value={value}
            />
          ),
          Cell: row => (
            <div className="msedge-table-content-right-align">{row.value}</div>
          )
        },

        {
          Header: "Processed",
          accessor: "enquiryStatus",
          sortable: false,
          width: 110,
          id: "enquiryStatus",
          Cell: row => {
            return (
              <div className="msedge-table-content-center-align">
                {row.value === "d" ? <div><h3 className="mb-0 delete-icon">X</h3></div> :
                  <Switch
                    checked={row.value === "y" ? true : false}
                    onChange={this.updateStatus.bind(this, row.original)}
                    onColor="#86d3ff"
                    handleDiameter={23}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                    height={15}
                    width={42}
                    aria-label="status"
                    onHandleColor="#006EBD"
                    tabindex="0"
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
            }
            if (filter.value === "d") {
              return row[filter.id] === "d";
            } else {
              return row[filter.id] === "n";
            }
          },
          Filter: ({ filter, onChange }) => (
            <select
              aria-label="enquiry status"
              onChange={event => onChange(event.target.value)}
              style={{ width: "100%" }}
              value={filter ? filter.value : "all"}
            >
              <option value="all">{language.show_all}</option>
              <option value="n">{language.not_procressed}</option>
              <option value="y">{language.processed}</option>
              <option value="d">{language.deleted}</option>
            </select>
          )
        },

        {
          Header: "Action",
          filterable: false,
          sortable: false,
          width: 80,
          Cell: row => (
            <div className="msedge-table-content-center-align">
              <ReactTooltip className="customeTheme" id='delete_button' type='info' effect='solid'>
                <span>Delete</span>
              </ReactTooltip>

              <button
                data-tip
                data-for="delete_button"
                aria-label="delete_enquiry"
                className="btn btn-outline-primary fs-icon"
                onClick={this.deleteUser.bind(this, row)}
                tabIndex="0"
                disabled={
                  this.state.adminSession.user_role === "2" || this.state.adminSession.user_role === "3" || row.original.enquiryStatus === "d"
                    ? true
                    : false
                }
              >
                <FontAwesomeIcon icon={faTrashAlt} id="delete" />
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
                    md="6"
                    lg="6"
                    xl="6"
                    className="msedge-admin-title"
                  >
                    <h1 className="msedge-overview-text" tabIndex="-1">
                      {language.law_school_enquiry}
                    </h1>
                  </Col>
                  <Col xs="12" sm="12" md="6" lg="6" xl="6">
                    <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6"></Col>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <GlobalSearchComponent
                          data={this.state.data === null || this.state.data === "" ? [] : this.state.data}
                          handleSetData={this.handleSetData}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>

              <Row>
                <div className="container-fluid bg-grey msedge-overall-padding">
                  <Col md="12" className="msedge-lawschool-enquiries">
                    <div className="law-school-table">
                      <ReactTable
                        id="table"
                        className="bg-white  rounded"
                        data={
                          this.state.filteredData === null ||
                            this.state.filteredData === []
                            ? []
                            : this.state.filteredData
                        }
                        defaultFilterMethod={filterCaseInsensitive}
                        columns={this.columns}
                        defaultPageSize={50}
                        minRows={2}
                        filterable
                        noDataText="No rows found"
                        loading={this.props.loading}
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
    loading: state.main.load
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getData,
      currentState,
      deleteData,
      updateData,
      redirectPath
    },
    dispatch
  );
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LawSchoolEnquiry);
