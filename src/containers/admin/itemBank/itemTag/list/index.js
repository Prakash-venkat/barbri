import React, { Fragment } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { Col, Row } from "reactstrap";
import ReactTable from "react-table";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ReactTooltip from 'react-tooltip'
import GlobalSearchComponent from "../../../../../components/admin/globalSearch";
import Switch from "react-switch";
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SortIcon from "../../../../../components/admin/sortIcon";
import FilterInputComponent from "../../../../../components/admin/FilterInputComponent";
import {
  getData,
  deleteData,
  updateData,
  currentState,
  redirectPath
} from "../../../../../actions/actionMain";
import filterCaseInsensitive from "../../../../../utils/admin/FilterCaseSensitive";
import { getSession } from "../../../../routes/routePaths";
import { customPageTitle } from '../../../../../components/commonComponents/customPageTitle';
import {language} from '../../../../../utils/locale/locale'


class ItemTagList extends React.Component {
  constructor() {
    super();
    this.state = {
      adminSession: getSession("AdminSession"),
      filteredData: [],
      data: [],
    };
  }
  componentWillReceiveProps({ listData }) {
    var datalistcond = listData == null || listData == undefined ? [] : listData;
    var data = datalistcond.filter(a => { return a.itemTagStatus != "d" })
    this.setState({
      data: this.state.adminSession.user_role === "1" ? datalistcond : data,
      filteredData: this.state.adminSession.user_role === "1" ? datalistcond : data
    });
  }
  componentDidMount() {
    customPageTitle('Item Tags')
    this.props.currentState("admin/itemtags");
    this.props.getData();
  
  }
  fetchData() {
    try {
      this.setState({
        filteredData: this.props.listData
      });
    } catch (e) { }
  }
  deleteData = row => {
    var code = row.original.itemTagId;
    this.props.deleteData(`admin/itemtags/${code}`);
  };
  updateStatus = (row, e) => {
    this.props.redirectPath("itemtag");
    var details = JSON.stringify({
      itemTagItemCode: row.itemTagItemCode,
      itemTagCategory: row.itemTagCategory,
      itemTagName: row.itemTagName,
      itemTagStatus: row.itemTagStatus === "y" ? "n" : "y"
    });
    this.props.updateData({
      data: details,
      id: row.itemTagId,
      path: "admin/itemtags"
    })
    .then(res =>{
      this.props.getData();
  })
  };
  columns = [
    {
      columns: [
        {
          Header: <SortIcon dataList={language.tag_code} sort={true} />,
          accessor: "itemTagItemCode",
          width: 150,
          Filter: props => (
            <FilterInputComponent aria_label="Total question" {...props} />
          ),
          Cell: row => (
            <div className="msedge-table-content-left-align admin-list-word-wrap">{row.value}</div>
          )
        },
        {
          Header: <SortIcon dataList={language.tag_name} sort={true} />,
          accessor: "itemTagName",
          Filter: props => (
            <FilterInputComponent aria_label="Total question" {...props} />
          ),
          Cell: row => (
            <div className="msedge-table-content-left-align admin-list-word-wrap">{row.value}</div>
          )
        },
        {
          Header: (
            <SortIcon dataList={language.last_modified_date} sort={true} />
          ),
          accessor: "itemTagLastModifiedAt",
          id: "date",
          Filter: props => (
            <FilterInputComponent aria_label="Total question" {...props} />
          ),
          width: 180,
          Cell: row => (
            <div className="msedge-table-content-right-align">
              {row.value}
            </div>
          )
        },
        {
          Header: <SortIcon dataList={language.item_bank_status} />,
          accessor: "itemTagStatus",
          sortable: false,
          id: "itemTagStatus",
          width: 160,
          Cell: row => {
            return (
              <div className="msedge-table-content-center-align">
                {row.value === "d" ? <div><h3 className="mb-0 delete-icon">X</h3></div> :
                  <Switch
                    checked={row.value === "y" ? true : false}
                    onChange={this.updateStatus.bind(this, row.original)}
                    onColor="#86d3ff"
                    onHandleColor="#2693e6"
                    onColor="#86d3ff"
                    handleDiameter={23}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                    height={15}
                    width={42}
                    aria-label="status"
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
            if (filter.value === "n") {
              return row[filter.id] === "n";
            } else {
              return row[filter.id] === "d";
            }
          },
          Filter: ({ filter, onChange }) => (
            <select
              aria-label="Select option"
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
          Header: <span>{language.action}</span>,
          filterable: false,
          sortable: false,
          width: 150,
          Cell: row => {
            return (
              <div>
                <ReactTooltip className="customeTheme" id='delete_button' type='info' effect='solid'>
            <span>{language.delete}</span>
                </ReactTooltip>
                <ReactTooltip className="customeTheme" id='edit_button' type='info' effect='solid'>
            <span>{language.edit}</span>
                </ReactTooltip>
                <div className="msedge-table-content-center-align">
                  <Link
                    aria-label="Edit-link"
                    to={{
                      pathname:
                        this.state.adminSession.user_role === "3" ? "" : "/admin/add_itemtag",
                      query: row
                    }}
                    disabled={this.state.adminSession.user_role === "3" ? true : false}
                  >
                    <button
                      data-tip
                      data-for="edit_button"

                      aria-label="Edit button"
                      className="btn btn-outline-primary fs-icon"
                      disabled={this.state.adminSession.user_role === "3" ? true : false}
                    >
                      <FontAwesomeIcon icon={faPencilAlt} />
                    </button>
                  </Link>
                  <button
                    data-tip
                    data-for="delete_button"

                    aria-label="Delete button"
                    className="ml-3 btn btn-outline-primary fs-icon"
                    onClick={() => this.deleteData(row)}
                    disabled={
                      this.state.adminSession.user_role === "2" || this.state.adminSession.user_role === "3" || row.original.itemTagStatus === "d"
                        ? true
                        : false
                    }
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </div>
              </div>
            );
          }
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
                <Col xs="12" sm="12" md="8" lg="8" xl="8">
                  <h1 className="msedge-overview-text" tabIndex="-1">
                    {language.item_tags}
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
                    <Col xs="12" sm="12" md="6" lg="7" xl="7" className="pr-0">
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
                    <Col xs="12" sm="12" md="6" lg="5" xl="5" className="pl-2">
                      <div className="form-group">
                        <span className="msedge-questions-start msedge-right-br msedge-student-list-btn">
                          <Link
                            to="/admin/add_itemtag"
                            disabled={
                              this.state.adminSession.user_role === "2" ||
                                this.state.adminSession.user_role === "3"
                                ? true
                                : false
                            }
                          >
                            <button
                              type="submit"
                              className="btn btn-outline-primary d-flex"
                              tabIndex="-1"
                              disabled={
                                this.state.adminSession.user_role === "2" ||
                                  this.state.adminSession.user_role === "3"
                                  ? true
                                  : false
                              }
                            >
                              <li>
                                <i className="pe-7s-plus" aria-hidden="true"></i>
                              </li>
                              <li className="text-uppercase">{language.add}</li>
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
                      loading={this.props.isLoading}
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
