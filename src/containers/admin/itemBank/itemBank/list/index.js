import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ReactTooltip from 'react-tooltip'
import {
  getData,
  currentState,
  deleteData
} from "../../../../../actions/actionMain";
import SortIcon from "../../../../../components/admin/sortIcon";
import ReactTable from "react-table";
import filterCaseInsensitive from "../../../../../utils/admin/FilterCaseSensitive";
import GlobalSearchComponent from "../../../../../components/admin/globalSearch";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { getSession } from "../../../../routes/routePaths";
import ItemBankChart from "./itembankChart";
import { customPageTitle } from '../../../../../components/commonComponents/customPageTitle'
import { language } from '../../../../../utils/locale/locale'

class ItemBankList extends Component {
  constructor() {
    super();
    this.state = {
      adminSession: getSession("AdminSession"),
      itembanklist: [],
      pageOfItems: [],
      query: "",
      data: [],
      filteredData: [],
      sample: [],
      readMore: "Read more",
      checked: [],
      list: [],
      customFilterValue: 'all'
    };
    this.state.filterText = "";
  }
  componentWillReceiveProps({ listData }) {
    var dataList = listData    

    var list = dataList === null || dataList === undefined || dataList === "" ? [] : dataList
    this.setState({list})

    if (typeof list !== 'undefined' && list.length > 0) {

      if(this.props.location.status === undefined){
        this.setState({
          data: list,
          filteredData: list
        });
      }else{
        if (this.props.location.status == "2") {
          const activeData = list.filter(a => { return a.itemBankStatus == "2" })
          this.setState({
            data: activeData,
            filteredData: activeData,
            customFilterValue:'2'
          });
        } else if (this.props.location.status == "1") {
          const activeData = list.filter(a => { return a.itemBankStatus == "1" })
          this.setState({
            data: activeData,
            filteredData: activeData,
            customFilterValue: '1'
          });
        } else {
          var data = list.filter(a => { return a.itemBankStatus != "6" })
          this.setState({
            data: this.state.adminSession.user_role === "1" ? dataList : data,
            filteredData: this.state.adminSession.user_role === "1" ? dataList : data
          });
        }
      }      
  }else{
    this.setState({
      data: [],
      filteredData: []
    });
  }

  }
  deleteItemBank = row => {

    const code = row.original.itemBankId;
    this.props.deleteData(`admin/itembanks/${code}`);

  };

  readMoreLess = (row, e) => {
    var checkedCopy = this.state.checked;
    checkedCopy[row.index] = !this.state.checked[row.index];
    this.setState(
      {
        checked: checkedCopy
      });

    if (e.target.id === row.original.itemBankCode) {
      this.setState({
        readMoreIndex: row.index,
        readMore: this.state.readMore === "Read less" ? "Read more" : "Read less"

      })
    }
  };

  cutomFilter=(value)=>{
    this.setState({customFilterValue: value})
    if(value == 'all'){
      this.setState({
        data: this.state.list,
        filteredData: this.state.list
      });
    }
    else{
      let data = this.state.list.filter(a => { return a.itemBankStatus == value})
      this.setState({
        data: data,
        filteredData: data
      });
    }
  }


  columns = [
    {
      columns: [
        {
          Header: <SortIcon dataList={language.reference} sort={true} />,
          id: "title",
          accessor: el => el.itemBankCode + "" + el.itemBankQuestion,
          Cell: props => {
            return (
              <div>
                <p className="itembank-code">{props.original.itemBankCode}</p>
                {props.original.itemBankQuestion === null || props.original.itemBankQuestion === undefined || props.original.itemBankQuestion === "" ? "" : (
                  <div>
                    {
                      props.original.itemBankQuestion.includes("<span") ? (
                        <div
                          className="msedge-table-content-left-align admin-list-word-wrap"
                          dangerouslySetInnerHTML={{
                            __html: props.original.itemBankQuestion
                          }} ></div>
                      ) : (
                          <div
                            className="msedge-table-content-left-align admin-list-word-wrap"

                            dangerouslySetInnerHTML={{
                              __html: props.original.itemBankQuestion.length > 110 ? props.original.itemBankQuestion.substring(0, 110) + "..." : props.original.itemBankQuestion
                            }}
                          ></div>
                        )
                    }
                  </div>
                )}
              </div >
            );
          }
        },
        {
          Header: <SortIcon dataList={language.item_tags} sort={true} />,
          accessor: "itemBankTag",
          width: 180,
          Filter: ({ value, onChange }) => (
            <input
              aria-label="item tage"
              onChange={event => onChange(event.target.value)}
              value={value}
            />
          ),
          Cell: row => (
            <div className="msedge-table-content-left-align admin-list-word-wrap">{row.value}</div>
          )
        },
        {
          Header: <SortIcon dataList={language.subject} sort={true} />,
          id: "subject",
          accessor: el => el.itemBankSubject + " / " + el.itemBankTopic,
          width: 160,
          Cell: row => (
            <div className="msedge-table-content-left-align admin-list-word-wrap">
              {row.value}
            </div>
          )
        },
        {
          Header: <SortIcon dataList={language.status} sort={true} />,
          accessor: "itemBankStatus",
          id: "itemBankStatus",
          width: 120,
          Cell: row => {
            return (
              <div className="msedge-table-content-left-align admin-list-word-wrap">
                {row.value == "1"
                  ? "Published"
                  : row.value == "2"
                    ? "Review Inprogress"
                    : row.value == "3"
                      ? "Reviewed"
                      : row.value == "4"
                        ? "Draft"
                        : row.value == "5"
                          ? "Inactive"
                          : row.value == "6"
                            ? "Deleted"
                            : ""}
              </div>
            );
          },
          filterMethod: (filter, row) => {
            if (filter.value === "all") {
              return true;
            }
            if (filter.value == 1) {
              return row[filter.id] == 1;
            } else if (filter.value == 2) {
              return row[filter.id] == 2;
            } else if (filter.value == 3) {
              return row[filter.id] == 3;
            } else if (filter.value == 4) {
              return row[filter.id] == 4;
            } else if (filter.value == 5) {
              return row[filter.id] == 5;
            } else {
              return row[filter.id] == 6;
            }
          },
          Filter: ({ filter, onChange }) => (
            <select
              aria-label="status"
              onChange={event =>{ 
              //  onChange(event.target.value)
                this.cutomFilter(event.target.value)
              }}
              style={{ width: "100%" }}
              value={this.state.customFilterValue}
            >
        <option value="all">{language.show_all}</option>
          <option value="1">{language.published}</option>
          <option value="2">{language.review_inprogress}</option>
          <option value="3">{language.reviewd}</option>
          <option value="4">{language.draft}</option>
          <option value="5">{language.in_active}</option>
          <option value="6">{language.deleted}</option>
            </select>
          )
        },
        {
          Header: <SortIcon dataList={language.action} sort={false} />,
          filterable: false,
          sortable: false,
          width: 120,
          Cell: row => {
            return (
              <div>
                <ReactTooltip className="customeTheme" id='delete_button' type='info' effect='solid'>
            <span>{language.delete}</span>
                </ReactTooltip>
                <ReactTooltip className="customeTheme" id='edit_button' type='info' effect='solid'>
            <span>{language.edit}</span>
                </ReactTooltip>
                <div className="msedge-table-content-center-align d-flex justify-content-center">

                  <Link
                    to={{
                      pathname:
                        this.state.adminSession.user_role === "3" ? "" : "/admin/view_itembank",
                      query: row.original
                    }}
                    disabled={this.state.adminSession.user_role === "3" ? true : false}
                  >
                    <button
                      data-tip
                      data-for="edit_button"
                      className="btn btn-outline-primary fs-icon"
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
                    onClick={this.deleteItemBank.bind(this, row)}
                    disabled={
                      this.state.adminSession.user_role === "2" || this.state.adminSession.user_role === "3" || row.original.itemBankStatus == "6"
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

  componentDidMount() {

    customPageTitle('Item Bank ')
    this.props.currentState("admin/itembank/")

    this.props.getData();
  }

  onChangePage(pageOfItems) {
    this.setState({ pageOfItems });
  }

  getTextSizeValue = range => {
    this.setState({ customFontSize: Number.parseInt(range) });
  };

  handleUserInput(filterText) {
    this.setState({ filterText: filterText });
  }

  fetchData() {
    try {
      this.setState({
        filteredData: this.props.listData
      });
    } catch (e) { }
  }

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
          <div className="msedge-student-exam-reports msedge-itembank">
            <div className="mt-2 container-fluid">
              <Row>
                <Col xs="12" sm="12" md="8" lg="8" xl="8">
                  <h1
                    className="msedge-overview-text msedge-listuser-heading"
                    tabIndex="-1"
                  >
                    ITEM BANK
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
                    <Col xs="12" sm="12" md="6" lg="5" xl="5" className="pl-2">
                      <div className="form-group">
                        <span className="msedge-questions-start msedge-right-br msedge-student-list-btn">
                          <Link
                            to="/admin/add_itembank"
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
              <div className="container-fluid bg-grey  msedge-overall-padding">
                <Col md="12" className="pb-3">
                  <div className="card">
                    <ItemBankChart />
                  </div>
                </Col>
                <Col md="12">
                  <div className="item-bank-table">
                    <ReactTable
                      className="-striped -highlight"
                      data={
                        this.state.filteredData == null ||
                          this.state.filteredData == ""
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
      deleteData
    },
    dispatch
  );
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemBankList);
