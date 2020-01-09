import React, { Component, Fragment } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Col, Row, UncontrolledTooltip } from "reactstrap";
import { Link } from "react-router-dom";
import {
  faSort,
  faTrashAlt,
  faPauseCircle
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactTable from "react-table";
import {
  getData,
  currentState,
  deleteData,
  timerChoosed,
  questionChoosed
} from "../../../../../actions/actionMain";
import {instance} from "../../../../../actions/constants"
import {getSession} from "../../../../routes/routePaths";
import { language } from '../../../../../utils/locale/locale'

export class Incomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      modal: false,
      status: "Active",
      filteredData: [],
      studentSession: getSession("StudentSession")
    };
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    this.props.timerChoosed(true);
    this.props.questionChoosed(true)
    this.fetchData();
  }
  fetchData = () => {
    let studentSession = this.state.studentSession
    instance.get(`incompleteExam/${studentSession.userStudentID}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,        
      }
    })
      .then(response => {
        this.setState({
          data: response.data,
          filteredData: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleChange = event => {
    const query = event.target.value;
    this.setState({ query: event.target.value });
    this.setState(prevState => {
      const filteredData = this.state.data.filter(element => {
        return (
          (element.examName != null &&
            element.examName.toLowerCase().includes(query.toString())) ||
          (element.examTotalQuestions != null &&
            element.examTotalQuestions.toString().includes(query.toString())) ||
          (element.examRightAnswersCount != null &&
            element.examRightAnswersCount
              .toString()
              .includes(query.toString())) ||
          (element.examTakenAt != null &&
            element.examTakenAt.toString().includes(query.toString()))
        );
      });
      return {
        query,
        filteredData
      };
    });
  };

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }
  columns = [
    {
      Header: props => (
        <div className="table-header msedge-overview-exam-reports">
    <span>{language.exam_name}</span>
          <FontAwesomeIcon icon={faSort} className=" sortIcon" size="1x" />
        </div>
      ),
      accessor: "examName",
      Cell: row => (
        <div style={{ textAlign: "center", width: "100%" }}>
          <Link
            to={{
              pathname: "/students/exam-question",
              id: row.original.examId,
              examName: row.original.examName,
              examDuration: row.original.examDuration,
              examTakenAt: row.original.examTakenAt
            }}
            style={{ textDecoration: "underline", color: "#006EBD" }}
          >
            {row.value}
          </Link>
        </div>
      )
    },
    {
      Header: props => (
        <div className="table-header msedge-overview-exam-reports">
          <span>{language.exam_date}</span>
          <FontAwesomeIcon icon={faSort} className=" sortIcon" size="1x" />
        </div>
      ),
      width: 170,
      accessor: "examTakenAt",
      Cell: row => (
        <div style={{ textAlign: "center", width: "100%", color: "#000000d9" }}>
          {/* {moment(row.value).format("MM-DD-YYYY")} */}
          {row.value}
        </div>
      )
    },
    {
      Header: props => (
        <div className="table-header msedge-overview-exam-reports">
    <span>{language.exam_progress}</span>
          <FontAwesomeIcon icon={faSort} className=" sortIcon" size="1x" />
        </div>
      ),
      // width: 350,
      accessor: el => el.examTotalQuestions + el.examAnsweredQuestionsCount,
      id: "exam",
      Cell: props => {
        var examAvg =
          (props.original.examAnsweredQuestionsCount /
            props.original.examTotalQuestions) *
          100;
        var examAvground = Math.round(examAvg);
        return (
          <div style={{ textAlign: "center", width: "100%" }}>
            <span
              className="progress-bar-sm progress d-inline-flex mr-2 student-ques-prog-bar"
              style={{
                textAlign: "center",
                border: "1px solid rgb(208, 208, 208)"
              }}
            >
              <span
                className="progress-bar"
                style={{
                  width: examAvg + "%",
                  backgroundColor: examAvg >= 60 ? "#3ac47d" : "#d92550",
                  borderRadius: "2px",
                  transition: "all .2s ease-out"
                }}
              ></span>
            </span>
            <span className="ant-table-content">{examAvground != null ? examAvground : 0}%</span>

            <div style={{ textAlign: "center", width: "100%", color: "#000000d9" }}>
              (
              {props.original.examAnsweredQuestionsCount != null
                ? props.original.examAnsweredQuestionsCount
                : 0}
              {}
              &nbsp;of {props.original.examTotalQuestions} questions)
            </div>
          </div>
        );
      }
    },
    // {
    //   accessor: "examAnsweredQuestionsCount",
    //   Cell: row => (
    //     <div style={{ textAlign: "center", width: "100%", color: "#666" }}>
    //       {row.value}
    //     </div>
    //   )
    // },
    {
      //   Header: "Action",
      Header: props => (
        <div className="table-header msedge-overview-exam-reports">
    <span>{language.action}</span>
        </div>
      ),
      accessor: "action",
      filterable: false,
      sortable: false,
      width: 150,
      Cell: row => (
        // <div className="table-header">
        //   <Button id="action" aria-label="action" onClick={this.props.deleteData.bind(this, row.original.userId)} className="mb-1 ml-5 btn-icon btn-icon-only delete-btn">
        //     <i className="pe-7s-trash btn-icon-wrapper"> </i>
        //   </Button>
        // </div>
        <div className="msedge-table-content-center-align">
          {/* <Link
            aria-label="link to add"
            to={{
              pathname: "/admin/add_lawschool",
              query: row
            }}
            className="mesedge-law-school-btn"
          > */}
          <Link
            to={{
              pathname: "/students/exam-question",
              id: row.original.examId,
              examName: row.original.examName,
              examDuration: row.original.examDuration,
              examTakenAt: row.original.examTakenAt
            }}
          >
            <UncontrolledTooltip
              placement="top"
              target="continu-btn"
            >
              {language.continue}
          </UncontrolledTooltip>
            <button
              id="continu-btn"
              className="btn btn-outline-primary fs-icon"
              aria-label="edit"
              tabIndex="0"
            >
              <FontAwesomeIcon icon={faPauseCircle} />
            </button>
          </Link>
          {/* </Link> */}
          <UncontrolledTooltip
            placement="top"
            target="delete-btn"
          >
            {language.delete}
          </UncontrolledTooltip>
          <button
            id="delete-btn"

            aria-label="delete"
            className="ml-3 btn btn-outline-primary fs-icon"
            tabIndex="0"
            onClick={this.props.deleteData.bind(this, row.original.userId)}
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        </div>
      )
    }
  ];
  render() {
    return (
      <div className="incomplete mt-1">
        <Fragment>
          <ReactCSSTransitionGroup
            component="div"
            transitionName="TabsAnimation"
            transitionAppear={true}
            transitionAppearTimeout={0}
            transitionEnter={false}
            transitionLeave={false}
          >
            <div />
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-9 col-xs-12"></div>
                <div className="col-md-3 col-xs-12 msedge-student-report pr-0">
                  <div className="exam-reports-search mt-0">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search Exam"
                      onChange={this.handleChange}
                      aria-label="exam report search"
                    />
                    <span className="btn pe-7s-search search"></span>
                  </div>
                </div>
              </div>
            </div>
            <Row>

              <Col md="12">
                <div className="msedge-main-card mb-3">
                  <div className="incomplete-data-table">
                    <ReactTable
                      data={
                        !this.state.filteredData ? [] : this.state.filteredData
                      }
                      columns={this.columns}
                      defaultPageSize={10}
                      minRows={2}
                      noDataText={language.no_rows_found}
                      loading={this.props.isLoading}
                      defaultFilterMethod={(filter, row) =>
                        String(row[filter.id]) === filter.value
                      }
                    />
                  </div>
                </div>
              </Col>
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
      currentState,
      timerChoosed,
      questionChoosed
    },
    dispatch
  );
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Incomplete);
