import React, { Fragment } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { Col, Row } from "reactstrap";
import ReactTable from "react-table";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { instance } from '../../../../actions/constants';
import SortIcon from "../../../../components/admin/sortIcon";
import FilterInputComponent from "../../../../components/admin/FilterInputComponent";
import GlobalSearchComponent from "../../../../components/admin/globalSearch";
import ReactTooltip from 'react-tooltip';
import Select from "react-select";
import {
  getData,
  deleteData,
  updateData,
  currentState,
  redirectPath
} from "../../../../actions/actionMain";
import filterCaseInsensitive from "../../../../utils/admin/FilterCaseSensitive";
import { getSession } from "../../../routes/routePaths";
import { customPageTitle } from '../../../../components/commonComponents/customPageTitle';
import {language} from '../../../../utils/locale/locale'


class ItemTagList extends React.Component {
  constructor() {
    super();
    this.state = {
      adminSession: getSession("AdminSession"),
      filteredData: [],
      data: [],
      isLoading: true,
      rowdata:[],
      studentLog:[],
      selectedAuditUser:"",
    };
  }

  componentDidMount() {
    customPageTitle('UI Log')
    this.props.currentState("/admin/logs/error");
    this.props.getData();
    this.fetchData();

  }

  componentWillReceiveProps({ listData }) {

    var datalist = listData == null || listData == undefined ? [] : listData;
    this.setState({
      data: datalist,
      filteredData: datalist
    });
  }


  fetchData = () => {
    instance.get(`admin/users`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,        
        }
      })
        .then(res => {
            let result = res.data.data === null ? [] : res.data.data.map((value, index) => {
                return (
                    { value: value.userPrimaryEmail, label: value.userPrimaryEmail}
                )
            })
            this.setState({ studentLog: result, selectedAuditUser: result[0]},()=>this.fetchAuditData(result[0].value));
        })
    };

    fetchAuditData = (email) => {
      const params = new URLSearchParams();
      params.append('email', email);
  
      const body = {
        method: 'GET',
        headers: { 'content-type': 'application/x-www-form-urlencoded','Authorization': `Bearer ${localStorage.getItem('token')}` },
        params: params,
        url : `admin/logs/error`
      }
      this.setState({isLoading: true})
  
      instance(body)
        .then(res => {
            this.setState({
              isLoading: false,
              filteredData: res.data.data,
              data:res.data.data
            });
        })
        .catch(err => {
          this.setState({isLoading: false})
          console.log(err)
        })
    }

  auditStudent = (selectedValue) => {
    this.setState({
      selectedAuditUser: selectedValue
    },()=>this.fetchAuditData(selectedValue.value));
   
  }


  columns = [
    {
      columns: [
        {
          Header: <SortIcon dataList="Date / Time" sort={true} />,
          accessor: "errorLogDateTime",
          width: 180,
          Filter: props => (
            <FilterInputComponent aria_label="Total question" {...props} />
          ),
          Cell: row => (
            <div className="msedge-table-content-right-align admin-list-word-wrap">{row.value}</div>
          )
        },
        {
          Header: <SortIcon dataList="Screen / Path" sort={true} />,
          accessor: "errorLogScreen",
          width: 180,
          Filter: props => (
            <FilterInputComponent aria_label="Total question" {...props} />
          ),
          Cell: row => (
            <div className="msedge-table-content-left-align admin-list-word-wrap">{row.value}</div>
          )
        },
        {
          Header: (
            <SortIcon dataList="Username" sort={true} />
          ),
          accessor: "errorLogUser",
          Filter: props => (
            <FilterInputComponent aria_label="Total question" {...props} />
          ),
          width: 180,
          Cell: row => (
            <div className="msedge-table-content-left-align">
              {row.value}
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
          accessor: "errorLogModuleName",
          width: 130,
          Cell: row => {
            return (
              <div className="msedge-table-content-left-align admin-list-word-wrap">
                {row.value === "admin"
                  ? "admin"
                  : row.value === "law-school"
                    ? "law-school"
                    : row.value === "student"
                      ? "student"
                      : row.value === "proof-reader"
                        ? "proof-reader"
                        : " "}
              </div>
            );
          },
          filterMethod: (filter, row) => {
            if (filter.value === "all") {
              return true;
            }
            if (filter.value === "admin") {
              return row[filter.id] === "admin";
            }
            if (filter.value === "law-school") {
              return row[filter.id] === "law-school";
            }
            if (filter.value === "student") {
              return row[filter.id] === "student";
            } else {
              return row[filter.id] === "proof-reader";
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
          <option value="admin">{language.admin}</option>
          <option value="law-school">{language.lawschool}</option>
          <option value="student">{language.students}</option>
          <option value="proof-reader">{language.proof_reader}</option>
            </select>
          )
        },

        {
          Header: (
            <SortIcon dataList="Description" sort={true} />
          ),
          accessor: "errorLogDescription",
          Filter: props => (
            <FilterInputComponent aria_label="Total question" {...props} />
          ),
          Cell: row => (
            <div className="msedge-table-content-left-align">
              {row.value}
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
      <div className="msedge-error-log">
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
                <Col xs="12" sm="12" md="4" lg="4" xl="4">
                  <h1 className="msedge-overview-text" tabIndex="-1">
                    Error Log
                  </h1>
                </Col>
                <Col
                  xs="12"
                  sm="12"
                  md="4"
                  lg="4"
                  xl="4"
                  className="msedge-bank-listbtns"
                >
                  <Row className="pull-right">
                    <Col xs="12" sm="12" md="6" lg="11" xl="11" className="pr-0">
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
                    </Col>
                  </Row>
                </Col>
                <Col xs="12" sm="12" md="4" lg="4" xl="4" className="pl-2">
                  <Select
                    aria-label=""
                    className="rect-select-useraudit"
                    onChange={this.auditStudent}
                    value={this.state.selectedAuditUser}
                    options={this.state.studentLog}
                  />
                </Col>
              </Row>

            </div>
            <Row>
              <div className="container-fluid bg-grey msedge-overall-padding">
                <Col md="12">
                  <div className="admin-item-tag">
                    <ReactTable
                      className="bg-white"
                      data={
                        this.state.filteredData === null ||
                          this.state.filteredData === []
                          ? []
                          : this.state.filteredData
                      }
                      columns={this.columns}
                      defaultPageSize={50}
                      filterable
                      minRows={2}
                      defaultFilterMethod={filterCaseInsensitive}
                      noDataText={"No rows found"}
                      loading={this.state.isLoading}
                    />
                  </div>
                </Col>
              </div>
            </Row>
          </ReactCSSTransitionGroup>
        </Fragment>
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
)(ItemTagList);
