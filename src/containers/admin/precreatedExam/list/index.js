import React, { Fragment } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { Col, Row } from "reactstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import ReactTable from "react-table";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Switch from "react-switch";
import swal from "sweetalert";
import ReactTooltip from 'react-tooltip'
import {
  getData,
  deleteData,
  currentState,
  updateData,
  redirectPath
} from "../../../../actions/actionMain";
import filterCaseInsensitive from "../../../../utils/admin/FilterCaseSensitive";
import GlobalSearchComponent from "../../../../components/admin/globalSearch";
import SortIcon from "../../../../components/admin/sortIcon";
import FilterInputComponent from "../../../../components/admin/FilterInputComponent";
import { instance } from "../../../../actions/constants"
import { getSession } from "../../../routes/routePaths";
import { customPageTitle } from '../../../../components/commonComponents/customPageTitle';
import {language} from '../../../../utils/locale/locale'

class PrecreatedExamList extends React.Component {
  constructor() {
    super();
    this.state = {
      adminSession: getSession("AdminSession"),
      filteredData: [],
    };
  }

  componentDidMount() {

    customPageTitle('Pre-Created Exams')
    this.props.currentState("admin/exams/precreated");
    this.props.getData();
    
  }

  componentWillReceiveProps({ listData }) {
    var datalistCond = (listData == null) || (listData == undefined) ? [] : listData;

    var data = datalistCond.filter(a => { return a.precreatedExamStatus != "d" })
    this.setState({
      data: this.state.adminSession.user_role === "1" ? datalistCond : data,
      filteredData: this.state.adminSession.user_role === "1" ? datalistCond : data
    });
  }

  updateStatus = (row, e) => {
    this.props.redirectPath("precreatedexam");
    let editDetails = JSON.stringify({
      precreatedExamName: row.precreatedExamName,
      precreatedExamCode: row.precreatedExamCode,
      precreatedExamDesc: row.precreatedExamDesc,
      precreatedExamStatus: row.precreatedExamStatus === "y" ? "n" : "y",
      precreatedExamTotalQuestions: row.precreatedExamTotalQuestions,
      precreatedExamCreatedBy: "Admin"
    });

    this.props.updateData({
      data: editDetails,
      id: '',
      path: `admin/exams/${row.precreatedExamId}/precreated`
    })
    .then(res =>{
      this.props.getData();
  })
  };

  columns = [
    {
      columns: [
        {
          Header: (
            <SortIcon dataList={language.precreated_exam_code} sort={true} />
          ),
          accessor: "precreatedExamCode",
          width: 130,
          Filter: props => (
            <FilterInputComponent aria_label="exam code" {...props} />
          ),
          Cell: row => (
            <div className="msedge-table-content-left-align admin-list-word-wrap">{row.value}</div>
          )
        },

        {
          Header: (
            <SortIcon dataList={language.precreated_exam_name} sort={true} />
          ),
          accessor: "precreatedExamName",
          width: 200,
          Filter: props => (
            <FilterInputComponent aria_label="Exam name" {...props} />
          ),
          Cell: row => (
            <div className="msedge-table-content-left-align admin-list-word-wrap">{row.value}</div>
          )
        },
        {
          Header: (
            <SortIcon dataList={language.precreated_exam_desc} sort={true} />
          ),
          accessor: "precreatedExamDesc",
          Filter: props => (
            <FilterInputComponent aria_label="Exam description" {...props} />
          ),
          minWidth: 300,
          Cell: row => (
            <div className="msedge-table-content-left-align admin-list-word-wrap">{row.value}</div>
          )
        },
        {
          Header: (
            <SortIcon
              dataList={language.number_of_question_included}
              sort={true}
              number={true}
            />
          ),
          accessor: "precreatedExamTotalQuestions",
          width: 120,
          Filter: props => (
            <FilterInputComponent aria_label="Total question" {...props} />
          ),
          Cell: row => (
            <div className="msedge-table-content-right-align">{row.value}</div>
          )
        },
        {
          Header: <SortIcon dataList={language.status} />,
          accessor: "precreatedExamStatus",
          sortable: false,
          width: 130,
          id: "precreatedExamStatus",
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
                      disabled={this.state.adminSession.user_role === "3" || row.original.precreatedExamTotalQuestions === 0 || row.original.precreatedExamTotalQuestions === "0" || row.original.precreatedExamTotalQuestions === "" ? true : false}
                    />
                  )}
              </div>
            );
          },
          filterMethod: (filter, row) => {
            if (filter.value === "all") {
              return true;
            }
            if (filter.value === "n") {
              return row[filter.id] === "n";
            } else if (filter.value === "y") {
              return row[filter.id] === "y";
            } else {
              return row[filter.id] === "d";
            }
          },
          Filter: ({ filter, onChange }) => (
            <select
              aria-label="select option"
              onChange={event => onChange(event.target.value)}
              style={{ width: "100%" }}
              value={filter ? filter.value : "all"}
            >
              <option value="all">{language.show_all}</option>
              <option value="n">{language.draft}</option>
              <option value="y">{language.published}</option>
              <option value="d">{language.deleted}</option>
            </select>
          )
        },
        {
          Header: <SortIcon dataList={language.action} />,
          filterable: false,
          width: 160,
          sortable: false,
          Cell: row => (
            <div className="msedge-table-content-center-align">
              <ReactTooltip className="customeTheme" id='delete_button' type='info' effect='solid'>
          <span>{language.delete}</span>
              </ReactTooltip>
              <ReactTooltip className="customeTheme" id='edit_button' type='info' effect='solid'>
          <span>{language.edit}</span>
              </ReactTooltip>
              <Link
                to={{
                  pathname:
                    this.state.adminSession.user_role === "3"
                      ? ""
                      : "/admin/edit_precreatedexam",
                  query: row
                }}
                className="add-user-btn"
                disabled={this.state.adminSession.user_role === "3" ? true : false}
              >
                <button
                  data-tip
                  data-for="edit_button"
                  aria-label="Edit-button"
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
                onClick={this.deleteData.bind(
                  this,
                  row.original.precreatedExamId
                )}
                disabled={
                  this.state.adminSession.user_role === "2" || this.state.adminSession.user_role === "3" || row.original.precreatedExamStatus === "d"
                    ? true
                    : false
                }
                className="ml-3 btn btn-outline-primary fs-icon"
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            </div>
          )
        }
      ]
    }
  ];

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

  deleteData = (code) => {
    this.props.deleteData(`admin/exams/${code}/precreated`)
  }

  render() {
    return (
      <div className="msedge-precreatedexam-list-segment-main">
        <Fragment>
          <ReactCSSTransitionGroup
            component="div"
            transitionName="TabsAnimation"
            transitionAppear={true}
            transitionAppearTimeout={0}
            transitionEnter={false}
            transitionLeave={false}
          >
            <div className="mt-3 container-fluid">
              <Row>
                <Col xs="12" sm="12" md="8" lg="8" xl="8">
                  <h1
                    className="msedge-overview-text msedge-listuser-heading"
                    tabIndex="-1"
                  >
                    {language.precreated_exam}
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
                            to="/admin/add_precreatedexam"
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
              <div className="container-fluid bg-grey msedge-overall-padding msedge-practice-list">
                <Col md="12">
                  <div className="msedge-precreatedexam-table-shakefix">
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
                      minRows={2}
                      defaultFilterMethod={filterCaseInsensitive}
                      filterable
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
)(PrecreatedExamList);
