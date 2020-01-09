import React, { Component } from 'react'
import { Card, CardBody, Col, Row, CardHeader, TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import { Link } from "react-router-dom";
import { faCheck, faTimes, faSortUp, faSortDown, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Select from 'react-select';
import classnames from "classnames";
import { Table as ReportTable } from 'antd';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
//import { createHashHistory } from "history";
import moment from "moment";
import {
  currentState,
  getData
} from "../../../../../actions/actionMain";
import { instance, HASH_HISTORY } from '../../../../../actions/constants'

import Loading from '../../../../../components/admin/loading';

import Pdf from "./pdf"

//export const hashHistory = createHashHistory();

const filterOption = [
  { value: '1', label: 'All' },
  { value: '2', label: 'Correctly answered' },
  { value: '3', label: 'Incorrectly answered'},
  { value: '4', label: 'Unanswered' },
  { value: '5', label: 'Answered less than 1 min' },
  { value: '6', label: 'Answered between 1 to 2 mins' },
  { value: '7', label: 'Answered between 2 to 4 mins' },
  { value: '8', label: 'Answered greater than 4 mins' },
  { value: '9', label: 'Flagged questions'},
]


class Review extends Component {
  constructor(props) {
    super(props)
    this.state = {
      reportActiveTab: "1",
      filteredData: [],
      filteredInfo: null,
      filteredValue: "",
      tableLoader: false,
      searchText: '',
      query: "",
      data: [],
      isLoading: true,
      constArray:[]

    }
  }

  searchvalue=(event)=>{
    const query = event.target.value;
    this.setState({ query: event.target.value },()=>{this.handleChange()});
  }
  handleChange = () => {
    this.setState(prevState => {
      const filteredData = this.state.data.filter(element => {
        return (
          element.examItemBankQuestion != null && element.examItemBankQuestion.toLowerCase().includes(this.state.query.toLowerCase())
        );
      });

      return {
        filteredData
      };
    });
  };



  componentDidMount() {
    if (this.props.location.state != undefined) {

      const params = new URLSearchParams();
      params.append('from', 'reports');
      const options = {
        method: 'GET',
        headers: { 'content-type': 'application/x-www-form-urlencoded','Authorization': `Bearer ${localStorage.getItem('token')}` },
        params: params,
        url : `exams/${this.props.location.state.examId}/details`
      };
      
      instance(options)
        .then(response => {
          return response;
        })
        .then(response => {
          if(response.status === 200){
            this.setState({
              data: response.data.data,
              filteredData: response.data.data,
              constArray:response.data.data,
              isLoading: false
            })
          }
        })

    } else {
      HASH_HISTORY.push('exam-reports')
    }
  }


  reportToggle = (tab) => {
    if (this.state.reportActiveTab !== tab) {
      this.setState({
        reportActiveTab: tab
      });
    }
  }

  customExpandIcon(props) {
    if (props.expanded) {
      return <a style={{ color: 'black' }} onClick={e => {
        props.onExpand(props.record, e);
      }}>Review <FontAwesomeIcon icon={faSortUp} size="1x" className="review-icon" /></a>
    } else {
      return <a style={{ color: 'black' }} onClick={e => {
        props.onExpand(props.record, e);
      }}>Review<FontAwesomeIcon icon={faSortDown} size="1x" className="review-icon-down" /></a>
    }
  }

  handleChangeFilter = (filterValue) => {
    this.setState({ filterValue })
    switch (filterValue.value) {
      case "1":
        this.setState({ filteredData: this.state.constArray, data:this.state.constArray},()=>{this.handleChange()})
        break;
      case "2":
        const a = this.state.constArray.filter((item, i) => item.examItemBankAnswer === item.examItemBankAnswerByStudents)
        this.setState({ filteredData: a,data:a },()=>{this.handleChange()})
        break;
      case "3":
        const b = this.state.constArray.filter((item, i) => item.examItemBankAnswerByStudents !=null && item.examItemBankAnswerByStudents != '' && item.examItemBankAnswer != item.examItemBankAnswerByStudents )
        this.setState({ filteredData: b,data:b },()=>{this.handleChange()})
        break;
      case "4":
        const c = this.state.constArray.filter((item, i) => item.examItemBankAnswerByStudents === null || '')
        this.setState({ filteredData: c,data:c },()=>{this.handleChange()})
        break;
      case "5":
        const d = this.state.constArray.filter((item, i) => item.examItemTimeTaken < 60)
        this.setState({ filteredData: d,data:d },()=>{this.handleChange()})
        break;
      case "6":
        const e = this.state.constArray.filter((item, i) => (item.examItemTimeTaken >= 60) && (item.examItemTimeTaken < 120))
        this.setState({ filteredData: e,data:e },()=>{this.handleChange()})
        break;
      case "7":
        const f = this.state.constArray.filter((item, i) => (item.examItemTimeTaken >= 120) && (item.examItemTimeTaken <= 240))
        this.setState({ filteredData: f,data:f },()=>{this.handleChange()})
        break;
      case "8":
        const g = this.state.constArray.filter((item, i) => item.examItemTimeTaken > 240)
        this.setState({ filteredData: g,data:g },()=>{this.handleChange()})
        break;
     case "9":
          const h = this.state.constArray.filter((item, i) => item.examItemBankFlagged === "true")
          this.setState({ filteredData: h,data:h },()=>{this.handleChange()})
          break;
      default:
        return null
    }
  }
  removeHTMLTags = str => {
    if (!str) {
      return null
    } else {
      return str.replace(/<[^>]*>?/gm, "");
    }

  };

  render() {
    const reportheader = [
      {
        title: '#',
        dataIndex: 'qno',
        key: 'qno',
        sortDirections: ['descend', 'ascend'],
        sorter: (a, b) => a.qno - b.qno,
      },
      {
        title: <FontAwesomeIcon icon={faCheck} size="1x" />,
        dataIndex: 'isright',
        key: 'isright',
      },
      {
        title: 'Question preview',
        dataIndex: 'question',
        key: 'question',
      },
      {
        title: 'Time',
        dataIndex: 'time',
        key: 'time',
        sortDirections: ['descend', 'ascend'],
        // sorter: (a, b) => a.time - b.time,
      }
    ];
    const reviewdata = typeof this.state.filteredData !== 'undefined' && this.state.filteredData.length > 0 ? this.state.filteredData.map((quiz, index) => {
      return {
        key: index,
        qno: index + 1,
        isright: quiz.examItemBankAnswerByStudents === null || '' ? <FontAwesomeIcon icon={faQuestionCircle} size="1x" /> : quiz.examItemBankAnswer === quiz.examItemBankAnswerByStudents ? <FontAwesomeIcon icon={faCheck} size="1x" /> : <FontAwesomeIcon icon={faTimes} size="1x" />,
        question: <p
          dangerouslySetInnerHTML={{
            __html: quiz.examItemBankQuestion
              ? quiz.examItemBankQuestion
                .length > 250
                ? `${quiz.examItemBankQuestion.substring(
                  0,
                  250
                )}.....`
                : quiz.examItemBankQuestion
              : ""
          }}
        ></p>,
        expandQuestion: <p
          dangerouslySetInnerHTML={{
            __html: quiz.examItemBankQuestion
          }}
        ></p>,
        time: Math.floor(quiz.examItemTimeTaken / 60) + ' ' + "min" + ' ' + (quiz.examItemTimeTaken % 60 ? quiz.examItemTimeTaken % 60 + ' ' + 'sec' : '0' + ' ' + 'sec'),
        explanation: quiz.examItemBankExplanation,
        answer: quiz.examItemBankAnswer,
        choice1: quiz.examItemBankOption1,
        choice2: quiz.examItemBankOption2,
        choice3: quiz.examItemBankOption3,
        choice4: quiz.examItemBankOption4,
        choice5: quiz.examItemBankOption5,
        studentAnswer: quiz.examItemBankAnswerByStudents
      }
    }) : []
    var filtered = reviewdata.filter(function (entry) {
      if (entry === null) {
        return entry != null
      } else if (entry === undefined) {
        return entry != undefined
      } else {
        return /\S/.test(entry);
      }
    });
    return (
      <div>
        {this.state.isLoading ? (
          <Loading />
        ) : (
            <div className="msedge-exam-final-report">
              <div className="container-fluid mb-2">
                <Row>
                  <Col xs="12" sm="12" md="7" lg="7" xl="7">
                    <h1 className="pb-2 msedge-overview-text">Exam Report</h1>
                  </Col>

                  <Col
                    xs="12"
                    sm="12"
                    md="5"
                    lg="5"
                    xl="5"
                    className="text-right"
                  >
                    <div className="form-group">
                      <Link
                        to="/students/exam-reports"
                        className="msedge-law-school-btn msedge-questions-start msedge-right-br"
                      >
                        <button className="btn btn-outline-primary">
                          <li><i className="pe-7s-back" aria-hidden="true"></i></li>
                          <li className="text-uppercase">Back</li>
                        </button>
                      </Link>
                    </div>
                  </Col>
                  <Col xs="12" sm="12" md="12" lg="12" xl="12">
                    <p className="overview-subtext">View your exam performance for each completed practice exam below. Click on “Download” to review
each exam question, along with the answer and explanatory answer, or to download a score report for
the exam.</p>
                  </Col>
                </Row>
              </div>
              <Row>
                <div className="container-fluid bg-grey p-30 msedge-overview-exam-reports">
                  <div className="card">
                    <Col md="12 exam-review-sec">
                      <div>
                        <Row>
                          <Col md="3">
                            <Row>
                              <Col md="12" className="p-0 exam-details-review">
                                <p className="mb-1 text-primary">{this.props.location.state === undefined ? 'null' : this.props.location.state.examName}</p>
                              </Col>
                              <Col md="12" className="p-0 exam-details-review">
                                <p className="msedge-no-of-questions-answered">{this.props.location.state === undefined ? 'null' : moment(this.props.location.state.examDate).format("MM-DD-YYYY")} </p>
                              </Col>
                            </Row>
                          </Col>
                          <Col md="3">
                            <div className="msedge-no-of-questions-answered">
                              <p aria-label="Total number of question" className="mb-1">&#35;  of total questions</p>
                              <div>
                                <p className="msedge-fw-600">{this.props.location.state === undefined ? 'null' : this.props.location.state.examTotalQuestions}</p>
                              </div>
                            </div>
                          </Col>
                          <Col md="3">
                            <div className="msedge-no-of-questions-answered">
                              <p aria-label="Number of right answered questions" className="mb-1">&#35; of correct answers</p>
                              <div>
                                <p className="msedge-fw-600">{this.props.location.state === undefined ? 'null' : this.props.location.state.examRightAnswersCount}</p>
                              </div>
                            </div>
                          </Col>
                          <Col md="3">
                            <div className="msedge-no-of-questions-answered">
                              <p aria-label="Exam score" className="mb-1"> Exam score (%)</p>
                              <Row>
                                <Col md="12">
                                  <div className="progress-bar-sm progress d-inline-flex mr-2 w-75" style={{ border: "1px solid rgb(208, 208, 208)" }}>
                                    <div
                                      className="progress-bar"
                                      style={{
                                        width: this.props.location.state === undefined ? 'null' : this.props.location.state.examScore + "%",
                                        backgroundColor:
                                          this.props.location.state === undefined ? 'null' : this.props.location.state.examScore >= 60 ? "#3ac47d" : "#0e6aae",
                                        borderRadius: "2px",
                                        transition: "all .2s ease-out"
                                      }}
                                    ></div>
                                  </div>
                                  <span className="msedge-fw-600">{this.props.location.state === undefined ? 'null' : !this.props.location.state.examScore ? 0 : Math.round(this.props.location.state.examScore)}%</span>
                                  <p></p>
                                </Col>
                                <Col md="4" lg="3" className="pl-0 pr-0">

                                </Col>
                              </Row>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </div>
                  <Col md="12 table-top-header">
                    <div>
                      <Row>
                        <Col md="5">

                        </Col>
                        <Col md="7" className="p-0 exam-details-review">
                          <Row className="msedge-column-height">
                            <Col md="4" className="pr-0">
                              <div className="form-group m-0">
                                <input
                                  className="text-body msedge-form-control-onsearch msedge-student-review"
                                  name="searchInput"
                                  placeholder="Search.."
                                  value={this.state.query || ""}
                                  onChange={this.searchvalue}
                                  label="Search"
                                  maxLength="50"
                                  aria-label="Table over all search"
                                />
                                <span className="btn pe-7s-search msedge-onsearch-icon"></span>
                              </div>
                            </Col>
                            <Col md="4" className="pl-2 pr-0 msedge-search-hide">
                              <Select
                                onChange={this.handleChangeFilter}
                                value={this.state.filterValue}
                                options={filterOption}
                                placeholder="Select Filter"
                              >

                              </Select>
                            </Col>
                            <Col md="3" className="msedge-questions-start pl-2 pr-0 msedge-search-hide-two">
                              <Pdf
                                examName={this.props.location.state === undefined ? 'null' : this.props.location.state.examName}
                                examDate={this.props.location.state === undefined ? 'null' : moment(this.props.location.state.examDate).format("MM-DD-YYYY")}
                                examRightAnswersCount={this.props.location.state === undefined ? 'null' : this.props.location.state.examRightAnswersCount}
                                examTotalQuestions={this.props.location.state === undefined ? 'null' : this.props.location.state.examTotalQuestions}
                                examScore={this.props.location.state === undefined ? 'null' : Math.round(this.props.location.state.examScore)}
                                examId={this.props.location.state === undefined ? 0 : this.props.location.state.examId}
                              />
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </div>
                  </Col>

                  <Col md="12" className="p-0">
                    <div className="bg-white msedge-anttable-mobile">
                      <ReportTable
                        columns={reportheader}
                        className="report-table"
                        style={{ minHeight: 400 }}
                        expandIcon={(props) => this.customExpandIcon(props)}
                        expandedRowRender={record =>
                          <Card tabs="true" className="mb-3 bg-white">
                            <CardHeader>
                              <Nav justified>
                                <NavItem>
                                  <NavLink
                                    href="#"
                                    className={classnames({
                                      active: this.state.reportActiveTab === "1"
                                    })}
                                    onClick={() => {
                                      this.reportToggle("1");
                                    }}
                                  >
                                    Explanation
                            </NavLink>
                                </NavItem>
                                <NavItem>
                                  <NavLink
                                    href="#"
                                    className={classnames({
                                      active: this.state.reportActiveTab === "2"
                                    })}
                                    onClick={() => {
                                      this.reportToggle("2");
                                    }}
                                  >
                                    Question
                            </NavLink>
                                </NavItem>
                              </Nav>
                            </CardHeader>
                            <CardBody>
                              <TabContent activeTab={this.state.reportActiveTab}>
                                <TabPane tabId="1">
                                  <div className="choice-explanation">
                                    <p dangerouslySetInnerHTML={{ __html: record.explanation }}></p>

                                  </div>
                                  <div className="border">
                                    <div className="choices">
                                      <Row className="m-0 border-bottom p-0">
                                        <Col xs="1" sm="1" md="1" lg="1" xl="1" className={`text-center border-right letter-option option p-0 py-4  ${
                                          this.props.choice === this.props.selection ? "selected-one " : ""
                                          }  ${record.answer === "A" ? "correct_answer" : " "} `
                                        }
                                        >
                                          <h4 className="m-0">A</h4>
                                        </Col>
                                        <Col xs="11" sm="11" md="10" lg="11" xl="11" className="options p-0" style={{
                                          textDecoration:
                                            this.state.isStrike === true ? "line-through" : ""
                                        }}>
                                          <p className="m-0 m-0 pl-4 pr-2 py-3 ">{this.removeHTMLTags(record.choice1)}</p>
                                        </Col>
                                      </Row>
                                      <Row className="m-0 border-bottom  p-0">
                                        <Col xs="1" sm="1" md="1" lg="1" xl="1" className={`text-center border-right letter-option p-0 py-4 ${
                                          this.props.choice === this.props.selection ? "selected-one " : ""
                                          }  ${record.answer === "B" ? "correct_answer" : " "}`
                                        }>
                                          <h4 className="m-0 color-grey">B</h4>
                                        </Col>
                                        <Col xs="11" sm="11" md="10" lg="11" xl="11" className="options p-0" style={{
                                          textDecoration:
                                            this.state.isStrike === true ? "line-through" : ""
                                        }}>
                                          <p className="m-0 pl-4 pr-2 py-3">{this.removeHTMLTags(record.choice2)}</p>
                                        </Col>
                                      </Row>
                                      <Row className="m-0 border-bottom p-0">
                                        <Col xs="1" sm="1" md="1" lg="1" xl="1" className={`text-center border-right letter-option p-0 py-4 ${
                                          this.props.choice === this.props.selection ? "selected-one " : ""
                                          }  ${record.answer === "C" ? "correct_answer" : " "}`
                                        }>
                                          <h4 className="m-0">C</h4>
                                        </Col>
                                        <Col xs="11" sm="11" md="10" lg="11" xl="11" className="options p-0" style={{
                                          textDecoration:
                                            this.state.isStrike === true ? "line-through" : ""
                                        }}>
                                          <p className="m-0 pl-4 pr-2 py-3">{this.removeHTMLTags(record.choice3)}</p>
                                        </Col>
                                      </Row>
                                      <Row className="m-0 border-bottom p-0">
                                        <Col xs="1" sm="1" md="1" lg="1" xl="1" className={`text-center border-right letter-option  p-0 py-4 ${
                                          this.props.choice === this.props.selection ? "selected-one " : ""
                                          }  ${record.answer === "D" ? "correct_answer" : " "}`
                                        }>
                                          <h4 className="m-0">D</h4>
                                        </Col>
                                        <Col xs="11" sm="11" md="10" lg="11" xl="11" className="options p-0" style={{
                                          textDecoration:
                                            this.state.isStrike === true ? "line-through" : ""
                                        }}>
                                          <p className="m-0 pl-4 pr-2 py-3">{this.removeHTMLTags(record.choice4)}</p>
                                        </Col>
                                      </Row>
                                      {record.choice5 ? <Row className="m-0 border-bottom p-0">
                                        <Col xs="1" sm="1" md="1" lg="1" xl="1" className={`text-center border-right letter-option p-0 py-4 ${
                                          this.props.choice === this.props.selection ? "selected-one " : ""
                                          }  ${record.answer === "E" ? "correct_answer" : " "}`
                                        }>
                                          <h4 className="m-0">E</h4>
                                        </Col>

                                        <Col xs="11" sm="11" md="10" lg="11" xl="11" className="options p-0" style={{
                                          textDecoration:
                                            this.state.isStrike === true ? "line-through" : ""
                                        }}>
                                          <p className="m-0 pl-4 pr-2 py-3">{this.removeHTMLTags(record.choice5)}</p>
                                        </Col>
                                      </Row> : ''}

                                    </div>

                                  </div>
                                </TabPane>
                                <TabPane tabId="2">
                                  <p>{record.expandQuestion}</p>
                                  <div className="border">
                                    <div className="choices">
                                      <Row className="m-0 border-bottom p-0">
                                        <Col xs="1" sm="1" md="1" lg="1" xl="1" className={`text-center border-right letter-option option p-0 py-4  ${
                                          this.props.choice === this.props.selection ? "selected-one " : ""
                                          }  ${record.answer === "A" ? "correct_answer" : " "} `

                                        }
                                        >
                                          <h4 className="m-0">A</h4>
                                        </Col>
                                        <Col xs="11" sm="11" md="10" lg="11" xl="11" className="options p-0" style={{
                                          textDecoration:
                                            this.state.isStrike === true ? "line-through" : ""
                                        }}>
                                          <p className="m-0 m-0 pl-4 pr-2 py-3">{this.removeHTMLTags(record.choice1)}</p>
                                        </Col>
                                      </Row>
                                      <Row className="m-0 border-bottom  p-0">
                                        <Col xs="1" sm="1" md="1" lg="1" xl="1" className={`text-center border-right letter-option p-0 py-4 ${
                                          this.props.choice === this.props.selection ? "selected-one " : ""
                                          }  ${record.answer === "B" ? "correct_answer" : " "}`
                                        }>
                                          <h4 className="m-0 color-grey">B</h4>
                                        </Col>
                                        <Col xs="11" sm="11" md="10" lg="11" xl="11" className="options p-0" style={{
                                          textDecoration:
                                            this.state.isStrike === true ? "line-through" : ""
                                        }}>
                                          <p className="m-0 pl-4 pr-2 py-3">{this.removeHTMLTags(record.choice2)}</p>
                                        </Col>
                                      </Row>
                                      <Row className="m-0 border-bottom p-0">
                                        <Col xs="1" sm="1" md="1" lg="1" xl="1" className={`text-center border-right letter-option p-0 py-4 ${
                                          this.props.choice === this.props.selection ? "selected-one " : ""
                                          }  ${record.answer === "C" ? "correct_answer" : " "}`
                                        }>
                                          <h4 className="m-0">C</h4>
                                        </Col>
                                        <Col xs="11" sm="11" md="10" lg="11" xl="11" className="options p-0" style={{
                                          textDecoration:
                                            this.state.isStrike === true ? "line-through" : ""
                                        }}>
                                          <p className="m-0 pl-4 pr-2 py-3">{this.removeHTMLTags(record.choice3)}</p>
                                        </Col>
                                      </Row>
                                      <Row className="m-0 border-bottom p-0">
                                        <Col xs="1" sm="1" md="1" lg="1" xl="1" className={`text-center border-right letter-option  p-0 py-4 ${
                                          this.props.choice === this.props.selection ? "selected-one " : ""
                                          }  ${record.answer === "D" ? "correct_answer" : " "}`
                                        }>
                                          <h4 className="m-0">D</h4>
                                        </Col>
                                        <Col xs="11" sm="11" md="10" lg="11" xl="11" className="options p-0" style={{
                                          textDecoration:
                                            this.state.isStrike === true ? "line-through" : ""
                                        }}>
                                          <p className="m-0 pl-4 pr-2 py-3">{this.removeHTMLTags(record.choice4)}</p>
                                        </Col>
                                      </Row>
                                      {record.choice5 ? <Row className="m-0 border-bottom p-0">
                                        <Col xs="1" sm="1" md="1" lg="1" xl="1" className={`text-center border-right letter-option p-0 py-4 ${
                                          this.props.choice === this.props.selection ? "selected-one " : ""
                                          }  ${record.answer === "E" ? "correct_answer" : " "}`
                                        }>
                                          <h4 className="m-0">E</h4>
                                        </Col>

                                        <Col xs="11" sm="11" md="10" lg="11" xl="11" className="options p-0" style={{
                                          textDecoration:
                                            this.state.isStrike === true ? "line-through" : ""
                                        }}>s
                                        <p className="m-0 pl-4 pr-2 py-3">{this.removeHTMLTags(record.choice5)}</p>
                                        </Col>
                                      </Row> : ''}

                                    </div>

                                  </div>
                                </TabPane>
                              </TabContent>
                            </CardBody>
                          </Card>}
                        dataSource={filtered}
                      /> </div>,
                </Col>
                </div>
              </Row>
            </div>
          )}
      </div>
    )
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
      getData
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Review);
