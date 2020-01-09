import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import ReactTable from "react-table";
import ReactTooltip from 'react-tooltip'
import SortIcon from "../../../components/admin/sortIcon";
import filterCaseInsensitive from "../../../utils/admin/FilterCaseSensitive";
import { getData, currentState } from "../../../actions/actionMain";
import Loading from "../../../components/admin/loading";
import PageTitle from "../../layout/AppMain/PageTitle";
import { getSession } from "../../routes/routePaths";
import {customPageTitle} from "../../../components/commonComponents/customPageTitle";
import {language} from '../../../utils/locale/locale'

class ItemReview extends Component {
  constructor() {
    super();
    this.state = {
      query: "",
      selectedStatus: { value: "2", label: "Review in progress" },
      data: [],
      filteredData: [],
      pending_review: 0,
      ProofReaderSession: getSession("ProofReaderSession"),
      filterSubject: "",
      filterTopic: "",
      selectedTopicValue: "",
      allCodes: [],
      constArray: []
    };
  }

  componentWillReceiveProps({ listData }) {
    var datalistCond = (listData == null) || (listData == undefined) ? [] : listData;

    var reviewinprogress = 0;

    if (datalistCond != [] || datalistCond.length != 0) {
      datalistCond.map((data, i) => {
        if (data.itemBankStatus == 2) reviewinprogress += 1;
      });
    }

    this.setState(
      {
        data: datalistCond,
        filteredData: datalistCond,
        pending_review: reviewinprogress
      }
    );
  }

  componentDidMount() {
    customPageTitle("Items For Review")

    let ProofReaderSession = this.state.ProofReaderSession;
    let UserId = ProofReaderSession.userId;
    this.setState({ UserId: UserId });
    this.props.currentState(`/proofreader/itembanks/${UserId}`);
    this.props.getData();
  }


  handleChange = event => {
    const query = event.target.value;

    this.setState({ query: event.target.value });
    this.setState(prevState => {
      const filteredData = this.state.data.filter(element => {
        return (
          (element.itemBankQuestion &&
            element.itemBankQuestion
              .toLowerCase()
              .includes(query.toLowerCase())) ||

              element.itemBankSubject != null && element.itemBankTopic && 
          (element.itemBankSubject + ' / ' + element.itemBankTopic)
          .toLowerCase().includes(query.toLowerCase()) ||

          (element.itemBankSubject &&
            element.itemBankSubject
              .toLowerCase()
              .includes(query.toLowerCase())) ||
          (element.itemBankCode &&
            element.itemBankCode.toLowerCase().toString().includes(query.toLowerCase().toString()))
        );
      });

      return {
        query,
        filteredData
      };
    });
  };


  columns = [
    {
      columns: [
        {
          Header: <SortIcon dataList={language.reference} sort={true} />,
          id: "title",
          accessor: el => el.itemBankCode + "" + el.itemBankQuestion,
          // width: 420,
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
                {row.value == "2"
                  ? "Review Inprogress"
                    : row.value == "3"
                      ? "Reviewed"
                            : ""}
              </div>
            );
          },
          filterMethod: (filter, row) => {
            if (filter.value === "all") {
              return true;
            }
            if (filter.value == 2) {
              return row[filter.id] == 2;
            } else {
              return row[filter.id] == 3;
            }
          },
          Filter: ({ filter, onChange }) => (
            <select
              aria-label="status"
              onChange={event => onChange(event.target.value)}
              style={{ width: "100%" }}
              value={filter ? filter.value : this.props.location.status ? this.props.location.status : "all"}
            >
        <option value="all">{language.show_all}</option>
          <option value="2">{language.review_inprogress}</option>
        <option value="3">{language.reviewd}</option>
              
            </select>
          )
        },
        {
          Header: <SortIcon dataList={language.action} sort={false} />,
          filterable: false,
          sortable: false,
          accessor: "itemBankStatus",
          id:"actionstatus",
          width: 120,
          Cell: row => {
            return (
              <div>
                <ReactTooltip className="customeTheme" id='view_button' type='info' effect='solid'>
               <span>{language.view}</span>
                </ReactTooltip>
                <ReactTooltip className="customeTheme" id='edit_button' type='info' effect='solid'>
            <span>{language.edit}</span>
                </ReactTooltip>
                <div className="msedge-table-content-center-align d-flex justify-content-center">
                       {
                         row.value== 3 ?  <button
                         data-tip
                         data-for="edit_button"
                        disabled="true"
                         className="btn btn-outline-primary fs-icon  mr-2"
                       >
                          <i className="lnr-pencil"></i>
                       </button>
               :
                    <Link
                    to={{
                      pathname:
                      "/proof-reader/update-review",
                      query: row.original
                    }}
                  >
                    <button
                      data-tip
                      data-for="edit_button"

                      className="btn btn-outline-primary fs-icon  mr-2"
                    >
                      <i className="lnr-pencil"></i>
                    </button>
                  </Link>
          }
                  <Link
                    to={{
                      pathname:
                      "/proof-reader/item-preview",
                      query: row.original
                    }}
                  >
                    <button
                      data-tip
                      data-for="view_button"

                      className="btn btn-outline-primary fs-icon mr-2"
                    >
                       <i className="lnr-book"></i>
                    </button>
                  </Link>
                  

                </div>
              </div>
            );
          }
        }
      ]
    }
  ];

  render() {
    return (
      <div className="msedge-student-exam-reports">
        {this.props.isLoading ? (
          <Loading />
        ) : (
          <ReactCSSTransitionGroup
            component="div"
            transitionName="TabsAnimation"
            transitionAppear={true}
            transitionAppearTimeout={0}
            transitionEnter={false}
            transitionLeave={false}
          >
            <div className="msedge-proof-reader">
              <PageTitle
                heading="ITEMS FOR REVIEW"
                brdcrumptwo="Items For Review"
                linkToHome="/proof-reader"
              />
              <div className="row">
                <div className="container-fluid p-30 bg-grey">
                  <div className="msedge-itemreview-reports mt-0 rounded">
                    <div className="col-md-12">
                      <div className="row">
                        <div className="col-md-4 col-xs-12">
                          <div className="msedge-proofreader-itemreview-search">
                            <input
                              type="search"
                              className="form-control"
                              placeholder="Search Item"
                              onChange={this.handleChange}
                              aria-label="Search Item Code"
                            />
                            <span className="btn pe-7s-search search"></span>
                          </div>
                        </div>

                        <div className="col-md-8 col-xs-12">
                          <div className="msedge-pending-review">
                            <div className="row offset-md-10">
                              <div className="col-md-8 pending-review">
                                <div className="pending-review-content pt-2">
                                  <h2>{this.state.pending_review}</h2>
                                        <p>{language.pending}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

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
                 
                </div>
              </div>
            </div>
          </ReactCSSTransitionGroup>
        )}
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
      currentState
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(ItemReview);
