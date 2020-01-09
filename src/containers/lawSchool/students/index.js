import React, {Component} from "react";
import {
  CardHeader,
  Card,
  Progress,
  NavLink,
  NavItem,
  TabPane,
  TabContent,
  CardBody,
  Nav,
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  Collapse,
  ModalFooter,
  UncontrolledTooltip,
  Button
} from "reactstrap";
import ReactTooltip from 'react-tooltip'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import classnames from "classnames";
import ReactTable from "react-table";
import moment from "moment";
import Workbook from "react-excel-workbook";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PageTitle from "../../layout/AppMain/PageTitle";
import {currentState} from "../../../actions/actionMain";
import SortIcon from "../../../components/admin/sortIcon";
import GlobalSearchComponent from "../../../components/admin/globalSearch";
import Loading from "../../../components/admin/loading";
import { ExamBatch } from "../../../components/commonComponents/lawSchoolBatch.json";
import {instance} from '../../../../src/actions/constants';
import {getSession} from '../../routes/routePaths'
import {customPageTitle} from '../../../components/commonComponents/customPageTitle'
import {language} from '../../../utils/locale/locale';
import filterCaseInsensitive from '../../../utils/admin/FilterCaseSensitive'
class StudentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "1",
      studentList: [],
      query: "",
      data: [],
      modal: false,
      preExam: [],
      loading: true,
      tableLoad: [],
      innerTableLoad: [],
      questionData: [],
      progressData: [],
      ModalLoad:true,
      accordion: [false, false, false, false, false, false, false],
      LawSchoolSession: getSession("LawSchoolSession")
    };
  }

  componentDidMount() {
    let getSessionData = this.state.LawSchoolSession
    let lawSchoolId = getSessionData.userLawschoolID;
    var selectedBatch = [];

    ExamBatch.map((name) => {
      return selectedBatch.push(name.value);
    });
    const batch = selectedBatch.toString();

    this.props.currentState("gettingstudentbylawschoolid");

    const studentlistParams = new URLSearchParams();
    studentlistParams.append('batchCodes', batch);
    const studentlistOptions = {
      method: 'GET',
      headers: { 'content-type': 'application/x-www-form-urlencoded','Authorization': `Bearer ${localStorage.getItem('token')}` },
      params: studentlistParams,
      url: `lawschools/${lawSchoolId}/students`
    };

    

    instance(studentlistOptions)

        .then(res => {
          
        let listData = res.data.data;
        var datalistCond = (listData == null) || (listData == undefined) ? [] : listData;

        if (res.data.data == null || "") {
          this.setState({ loading: false, tableLoad: false });
        } else {
          this.setState({
            data: datalistCond,
            studentList: datalistCond,
            loading: false,
            tableLoad: false
          });
        }
      })
      .catch(e => {
        this.setState({ loading: false, tableLoad: false });
      });
    customPageTitle("Students")
  }


  toggleAccordion1 = tab => {
    const prevState = this.state.accordion;
    const state = prevState.map((x, index) => (tab === index ? !x : false));
    this.setState({
      accordion: state
    });
  };


  toggleClose = () => {
    this.setState(prevState => ({
      modal: !prevState.modal,
      progressData: [],
    }));
    this.toggleAccordion1();
  };

  lawschool = [
    {
      columns: [

        {
          Header: <SortIcon dataList={language.student_name} sort={true} />,
          id: "name",
          accessor: el => el.studentCode + " " + el.firstName + " " + el.lastName,
          Cell: props => (
            <span className="admin-list-word-wrap">
              {props.original.studentCode} <br />
              {props.original.firstName} {"  "} {props.original.lastName}
            </span>
          )
        },
        {
          Header: <SortIcon dataList={language.bar_exam_batch} sort={true} />,

          accessor: "barExamBatch",
          width: 200,
          Cell: row => (
            <div className="msedge-table-content-left-align admin-list-word-wrap">{row.value}</div>
          )
        },
        {
          Header: <SortIcon dataList={language.contact} sort={true} />,

          id: "contact",
          width: 240,
          accessor: el => el.primaryEmail + "" + el.phoneNumber,
          Cell: props => (
            <span className="admin-list-word-wrap">
              {props.original.primaryEmail} <br />
              {props.original.phoneNumber}
            </span>
          )
        },

        {
          Header: <SortIcon dataList={language.questionProgress} sort={true} />,
          id: "score",
          width: 300,
          filterable:false,
          accessor: el =>
            el.overAllPercentage +
            "" +
            el.questionsAnswered +
            "" +
            el.numberOfRightAnswer,
          Cell: props => (
            <div className="text-center w-100">
              <div className="widget-content p-0">
                <div className="widget-content-outer">
                  <div className="widget-content-wrapper pb-0">
                    <div className="widget-content-left px-2 w-75">
                      <Progress
                        className="progress-bar-sm"
                        color={
                          props.original.overAllPercentage >= 60
                            ? "success"
                            : "danger"
                        }
                        value={Math.round(props.original.overAllPercentage)}
                      />
                    </div>
                    <div className="widget-content pr-2 pb-0 pt-0">
                      <div className="text-small text-muted">
                        {isNaN(props.original.overAllPercentage) ? 0 : props.original.overAllPercentage > 100 ? 100 : Math.round(props.original.overAllPercentage)}%
                      </div>
                    </div>
                  </div>
                  <span className="text-center mr-4">
                    {" "}
                    ({ Math.round(props.original.questionsAnswered) > Math.round(props.original.totalQuestions) ? Math.round(props.original.questionsAnswered) +' '+language.out_of+' '+ Math.round(props.original.questionsAnswered) +' '+language.que  :
                                     Math.round(props.original.questionsAnswered) +' '+language.out_of+' '+ Math.round(props.original.totalQuestions) +' '+language.que  
                                })


                  </span>
                </div>
              </div>
            </div>
          )
        },
        {
          Header: language.action,
          filterable: false,
          sortable: false,
          width: 100,
          Cell: row => (
            <div className="msedge-table-content-center-align ">
              <button
                data-tip
                data-for="view"
                onClick={() => this.viewQusProgress(row)}
                aria-label="view"
                className="btn btn-outline-primary fs-icon"
                tabIndex="0"
                id="view"
              >
                <i class="pe-7s-look" aria-hidden="true"></i>
              </button>

              <ReactTooltip className="customeTheme" id='view' type='info' effect='solid'>
                <span>{language.moreDetail}</span>
              </ReactTooltip>

            </div>
          )
        }
      ]
    }
  ];

  examTabTableschema = [
    {
      columns: [
        {
          Header: <SortIcon dataList={language.exam_name} sort={true} />,
          accessor: "examName",
          width: 260,
          Cell: row => (
            <div className="msedge-table-content-left-align">{row.value}</div>
          )
        },
        {
          Header: <SortIcon dataList={language.exam_date} sort={true} />,
          accessor: "examTakenAt",
          width: 140,
          Cell: row => (
            <div className="msedge-table-content-right-align">{row.value.split(" ")[0]}</div>
          )
        },
        {
          Header: <SortIcon dataList={language.Progress} sort={true} />,
          accessor: el => el.examRightAnswersCount + "" + el.examTotalQuestions + "" + el.examScore,
          id: "progress",
          filterable:false,
          Cell: row => (
            <div className="text-center w-100">
              <div className="widget-content p-0">
                <div className="widget-content-outer">
                  <div className="widget-content-wrapper">
                    <div className="widget-content-left ls-widget-content px-2 w-75">
                      <Progress
                        className="progress-bar-sm"
                        color={
                          row.original.examScore >= 60
                            ? "success"
                            : "danger"
                        }
                        value={Math.round(row.original.examScore)}
                      />
                    </div>
                    <div className="ml-1 row pr-2">
                      <div className="text-small text-muted">{row.original.examScore}% </div>
                    </div>
                  </div>
                  <span className="ml-1">
                        ({row.original.examRightAnswersCount} {language.out_of}{" "} {row.original.examTotalQuestions} {language.que})
                      </span>
                </div>
              </div>
            </div>
          )
        }
      ]
    }
  ];

  questionTabTableschema = [
    {
      columns: [
        {
          Header: <SortIcon dataList={language.exam_name} sort={true} />,
          accessor: "examName",
          width: 260,
          Cell: row => (
            <div className="msedge-table-content-left-align">{row.value}</div>
          )
        },
        {
          Header: <SortIcon dataList={language.exam_date} sort={true} />,
          accessor: "examTakenAt",
          width: 140,
          Cell: row => (
            <div className="msedge-table-content-right-align">{row.value.split(" ")[0]}</div>
          )
        },
        {
          Header: <SortIcon dataList={language.Progress} sort={true} />,
          accessor: el => el.examRightAnswersCount + "" + el.examTotalQuestions + "" + el.examScore,
          id: "progress",
          filterable : false,
          Cell: row => (
            <div className="text-center w-100">
              <div className="widget-content p-0">
                <div className="widget-content-outer">
                  <div className="widget-content-wrapper">
                    <div className="widget-content-left ls-widget-content px-2 w-75">
                      <Progress
                        className="progress-bar-sm"
                        color={
                          row.original.examScore >= 60
                            ? "success"
                            : "danger"
                        }
                        value={Math.round(row.original.examScore)}
                      />
                    </div>
                    <div className="ml-1 row pr-2">
                      <div className="text-small text-muted">{Math.round(row.original.examScore)}% </div>

                    
                    </div>
                  </div>
                  <span className="ml-1">
                        ({row.original.examRightAnswersCount} {language.out_of}{" "} {row.original.examTotalQuestions} {language.que})
                      </span>
                </div>
              </div>
            </div>
          )
        }
      ]
    }
  ];

  toggleTab=(tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  viewQusProgress = (row) => {

    let Studentid = row.original.studentId;
    instance.get(`students/${Studentid}/questions/progresssummary`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,        
      }
    })
      .then(response => {
        return response;
      })
      .then(res => {
        
        if (res.data.data === "" || res.data.data.length === 0 || res.data.data === null) {
          const totalAns = subjects.map(data => {
            const totalAnswered = data.answered++;
            return totalAnswered;
          });
          let totalAnswered = totalAns.reduce((a, b) => a + b, 0);

          const totQues = subjects.map(data => {
            const totalquestion = data.question++;
            return totalquestion;
          });
          let totalQuestions = totQues.reduce((a, b) => a + b, 0);

          const totalcorrectanswered = subjects.map(data => {
            const totalcorrectansweres = data.questionsAnsweredCorrectly++;
            return totalcorrectansweres;
          });
          let totalcorrectans = totalcorrectanswered.reduce((a, b) => a + b, 0);
          let allcorrectanspercen = (totalcorrectans / totalAnswered) * 100;

          let totalPercentage = (totalAnswered / totalQuestions) * 100;

          this.setState({
            loading: false,
            progressData: subjects,
            totalAnswered: totalAnswered,
            totalQuestions: totalQuestions,
            totalPercentage: Math.round(totalPercentage),
            totalcorrectanswered: totalcorrectans,
            allcorrectanspercentage: Math.round(allcorrectanspercen)
          });
        } else {
          const totalAns = res.data.data.map((data, index) => {
            const totalAnswered = data.answered++;
            return totalAnswered;
          });
          let totalAnswered = totalAns.reduce((a, b) => a + b, 0);

          const totQues = res.data.data.map((data, index) => {
            const totalquestion = data.question++;
            return totalquestion;
          });
          let totalQuestions = totQues.reduce((a, b) => a + b, 0);

          const totalcorrectanswered = res.data.data.map((data, index) => {
            const totalcorrectansweres = data.questionsAnsweredCorrectly++;
            return totalcorrectansweres;
          });
          let totalcorrectans = totalcorrectanswered.reduce((a, b) => a + b, 0);

          let totalPercentage = (totalAnswered / totalQuestions) * 100;
          let allcorrectanspercen = (totalcorrectans / totalAnswered) * 100;
          this.setState({
            loading: false,
            ModalLoad:false,
            progressData: res.data.data,
            totalAnswered: totalAnswered,
            totalQuestions: totalQuestions,
            totalPercentage: Math.round(totalPercentage),
            totalcorrectanswered: totalcorrectans,
            allcorrectanspercentage: Math.round(allcorrectanspercen)
          });
        }
      })
      .catch(error => {
        this.setState({ModalLoad:false})
      });


    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

  handleSetData = data => {    
    this.setState({ studentList: data });
  };

  getExamReport(id) {
    let inner = this.state.innerTableLoad
    inner[id.index] = true
    this.setState({ innerTableLoad: inner })
    let precreate = this.state.preExam;
    let custom = this.state.questionData;
    let a=[],b=[]

    instance.get(`students/${id.original.studentId}/exams`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,        
      }
    })
      .then(res => {
        return res;
      })
      .then(result => {
        if (result.status === 204) {
        } else {        
          result.data.data.exam.map((data) => { 
            if (data.examType === "1"){
              a.push(data)
            }
            if (data.examType === "0"){
              b.push(data)
            }
          })
          precreate[id.index] = a;
          custom[id.index] = b;
          inner[id.index] = false
          this.setState(
            {
              preExam: precreate,
              questionData: custom,
              isStart: true,
              innerTableLoad: inner
            }
          );
        }
      })
      .catch(e => {
        this.setState({
          preExam: [], questionData: [], innerTableLoad: false
        });

      });
  }


  getFileName = () => {
    let date = Date.now();
    let dateFormat = moment(date).format("MM-DD-YYYY");

    let d = new Date();
    let dformat = `${d.getHours()}-${d.getMinutes()}-${d.getSeconds()}`;
    return "STUDENT_DATA_" + dateFormat + "_" + dformat + ".xlsx";
  };

  render() {
    var data = [];
    if (this.state.data === "" || null) data = [];
    else
      data = this.state.data.map(data => {
        return {
          studentCode: data.studentCode,
          studentLastName: data.lastName,
          firstname: data.firstName,
          studentMiddleInitial: data.middleName,
          email: data.primaryEmail,
          phone: data.phoneNumber,
          batch: data.barExamBatch,
          studentExpectedBarExamDate: data.expectedBarExam,
          studentExpectedBarExamState: data.expectedBarExamState,
          studentNoPrevBarExamsTaken: data.noPrevBarExamTaken,
          studentLawSchoolGPA: data.lawSchoolGPA,
          studentLSAT: data.lsat,
          studentFullTime: data.fullTime,
          studentTransfer: data.transfer,
          answeredQus: data.questionsAnswered.toString(),
          crctAns: data.numberOfRightAnswer.toString(),
          overAllPercentage: Math.round(data.overAllPercentage).toString(),
        };
      });

    return (
      <div>
        {this.state.loading ?
          <Loading /> :

          <div className="msedge-lawschool-students-list">
            <PageTitle
              heading="Students"
              brdcrumptwo="Students"
              linkToHome="/law-school"
              subheading="Check progress by student. Sort or filter by name, bar exam batch, or progress by using the column
              headers. Click the arrow on the left to see a student’s exam results. Click the action icon on the right to
              view the student’s results by subject and topic."
            />
            <Row>
              <div className="container-fluid bg-grey ptb-30">
                <div className="container-fluid"></div>
                <div className="container-fluid">
                  <Row>
                    <Col xs="12" sm="12" md="12" lg="12" xl="12">
                      <Row>
                        <Col md="6" lg="6" xs="0" sm="0"></Col>
                        <Col md="3" lg="3" xs="5" sm="5" className="mx-auto msedge-lawschool-student-align">
                          <div className="form-group msedge-questions-start msedge-list-download">
                            {this.state.data === [] || this.state.data.length === 0 ?
                            
                              <button
                                className="btn btn-primary d-flex msedge-right-br c-pointer"
                                style={{ float: "right" }}
                                disabled={this.state.data.length === 0 || this.state.data === [] ? true : false}
                              >
                                <li>
                                  <i
                                    class="pe-7s-download"
                                    aria-hidden="true"
                                  ></i>
                                </li>
                            <li className="text-uppercase">{language.download}</li>
                              </button>
                              :
                          
                            <Workbook
                              filename={this.getFileName()}
                              element={
                                <button
                                  className="btn btn-primary d-flex msedge-right-br c-pointer"
                                  style={{ float: "right" }}
                                  disabled={this.state.data.length === 0 || this.state.data === [] ? true : false}
                                >
                                  <li>
                                    <i
                                      class="pe-7s-download"
                                      aria-hidden="true"
                                    ></i>
                                  </li>
                              <li className="text-uppercase">{language.download}</li>
                                </button>
                              }
                            >
                              <Workbook.Sheet data={data} name="Students">
                                <Workbook.Column
                                  label="Student Code"
                                  value="studentCode"
                                />
                                <Workbook.Column
                                  label="Student  Last Name"
                                  value="studentLastName"
                                />
                                <Workbook.Column
                                  label="Student  First Name"
                                  value="firstname"
                                />
                                <Workbook.Column
                                  label="Student  Middle Initial"
                                  value="studentMiddleInitial"
                                />
                                <Workbook.Column label="Batch" value="batch" />
                                <Workbook.Column label="Email" value="email" />
                                <Workbook.Column label="contact no" value="phone" />
                                <Workbook.Column
                                  label="Expected Bar Exam Date"
                                  value="studentExpectedBarExamDate"
                                />
                                <Workbook.Column
                                  label="Expected Bar Exam State"
                                  value="studentExpectedBarExamState"
                                />
                                <Workbook.Column
                                  label="No. of Previous Bar Exams"
                                  value="studentNoPrevBarExamsTaken"
                                />
                                <Workbook.Column
                                  label="Student Lawschool GPA"
                                  value="studentLawSchoolGPA"
                                />
                                <Workbook.Column
                                  label="Student LSAT"
                                  value="studentLSAT"
                                />
                                <Workbook.Column
                                  label="Student Full Time"
                                  value="studentFullTime"
                                />
                                <Workbook.Column
                                  label="Student Transfer"
                                  value="studentTransfer"
                                />
                                <Workbook.Column
                                  label="No. of Answered Questions"
                                  value="answeredQus"
                                />
                                <Workbook.Column
                                  label="Correct Answers"
                                  value="crctAns"
                                />
                                <Workbook.Column
                                  label="Percentage"
                                  value="overAllPercentage"
                                />
                              </Workbook.Sheet>
                            </Workbook>
                              }
                          </div>
                        </Col>
                        <Col
                          md="3"
                          lg="3"
                          xs="12"
                          sm="12"
                          className="msedge-lawshool-liststudents pl-0"
                        >
                          <GlobalSearchComponent
                            data={this.state.data}
                            handleSetData={this.handleSetData}
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </div>

                <div className="container-fluid">
                  <div className="msedge-student-list">
                    <div>
                      <ReactTable
                        className="-striped -highlight"
                        data={this.state.studentList}
                        columns={this.lawschool}
                        defaultPageSize={10}
                        minRows={2}
                        filterable
                        defaultFilterMethod={filterCaseInsensitive}
                        collapseOnDataChange={false}
                        loading={this.state.tableLoad}
                        getTdProps={(state, rowInfo, column, instance) => {
                          return {
                            onClick: (e, handleOriginal) => {
                              if (column.width === 35) {
                                handleOriginal(); this.getExamReport(rowInfo)
                              }
                            }
                          };
                        }}
                        expanded={this.state.expanded}
                        SubComponent={(row, index) => {
                          return (
                            <div>
                              <Card tabs="true" className="mb-3">
                                <CardHeader>
                                  <Nav className="margin-left-20" justified>
                                    <NavItem>
                                      <NavLink
                                        href="javascript:void(0);"
                                        className={classnames({
                                          active: this.state.activeTab === "1"
                                        })}
                                        onClick={() => {
                                          this.toggleTab("1");
                                        }}
                                      >
                                        {language.precreated_exam}
                                  </NavLink>
                                    </NavItem>
                                    <NavItem>
                                      <NavLink
                                        href="javascript:void(0);"
                                        className={classnames({
                                          active: this.state.activeTab === "2"
                                        })}
                                        onClick={() => {
                                          this.toggleTab("2");
                                        }}
                                      >
                                        {language.customExams}
                                  </NavLink>
                                    </NavItem>
                                  </Nav>
                                </CardHeader>
                                <CardBody className="p-0">
                                  <TabContent activeTab={this.state.activeTab}>
                                    <TabPane tabId="1">
                                      <ReactTable
                                        className="-striped -highlight"
                                        data={this.state.preExam[row.index]}
                                        columns={this.examTabTableschema}
                                        defaultPageSize={10}
                                        minRows={2}
                                        filterable
                                        loading={this.state.innerTableLoad[row.index]}
                                        defaultFilterMethod={filterCaseInsensitive}
                                      />
                                    </TabPane>
                                    <TabPane tabId="2">
                                      <ReactTable
                                        className="-striped -highlight"
                                        data={this.state.questionData[row.index]}
                                        columns={this.questionTabTableschema}
                                        loading={this.state.innerTableLoad[row.index]}
                                        defaultFilterMethod={filterCaseInsensitive}
                                        defaultPageSize={10}
                                        minRows={2}
                                        filterable
                                      />
                                    </TabPane>
                                  </TabContent>
                                </CardBody>
                              </Card>
                            </div>
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="content-progress">
                  <Modal
                    isOpen={this.state.modal}
                    className={`${this.props.className} question-progress-students-modal`}
                  >
              <ModalHeader className="question-progress-header">{language.questionProgress}</ModalHeader>
                    <div className="scroller-studen-modal">
                      {this.state.ModalLoad ? <Loading /> :

                      <ModalBody className="msedge-student-modal">
                        <div className="mr-0 msedge-monthly-progress-questions pie-chart pb-4 pt-2 border-bottom">
                          <div tabIndex="0" role="button">
                            <Card>
                              <CardBody>
                                <Row>
                                  <Col xs="12" sm="12" md="3" lg="3" xl="3">
                      <h2 className="m-0">{language.answeredQuestions}</h2>
                                  </Col>
                                  <Col
                                    xs="7"
                                    sm="7"
                                    md="7"
                                    lg="7"
                                    xl="7"
                                    className="text-center msedge-ques-prog-res pr-0"
                                  >
                                    <div className="msedge-overall-content">
                                      <div className="progress-bar-sm progress">
                                        <div
                                          className="progress-bar"
                                          style={{
                                            width: this.state.totalPercentage + "%",
                                            backgroundColor:
                                              this.state.totalPercentage > 60
                                                ? "#3ac47d"
                                                : "#d92550",
                                            borderRadius: "2px",
                                            transition: "all .2s ease-out"
                                          }}
                                        />
                                      </div>
                                      <span className="msedge-ques-progress-percentage">
                                        <b>{this.state.totalPercentage}%</b>
                                      </span>
                                    </div>
                                  </Col>

                                  <Col
                                    xs="2"
                                    sm="2"
                                    md="2"
                                    lg="2"
                                    xl="2"
                                    className="text-center"
                                  >
                                    <h3 className="text-center">
                                      {this.state.totalAnswered} {" "}
                                      of {this.state.totalQuestions}
                                    </h3>
                                  </Col>
                                </Row>
                              </CardBody>
                            </Card>
                          </div>

                          <div
                            tabIndex="0"
                            role="button"
                            className="msedge-pt-30 correct-ans"
                          >
                            <Card>
                              <CardBody>
                                <Row>
                                  <Col xs="12" sm="12" md="3" lg="3" xl="3">
                                        <h2 className="m-0">{language.correct_answers}</h2>
                                  </Col>
                                  <Col
                                    xs="7"
                                    sm="7"
                                    md="7"
                                    lg="7"
                                    xl="7"
                                    className="text-center msedge-ques-prog-res pr-0"
                                  >
                                    <div className="msedge-overall-content">
                                      <div className="progress-bar-sm progress">
                                        <div
                                          className="progress-bar"
                                          style={{
                                            width:
                                              this.state.allcorrectanspercentage +
                                              "%",
                                            backgroundColor:
                                              this.state.allcorrectanspercentage > 60
                                                ? "#3ac47d"
                                                : "#d92550",
                                            borderRadius: "2px",
                                            transition: "all .2s ease-out"
                                          }}
                                        />
                                      </div>
                                      <span className="msedge-ques-progress-percentage">
                                        <b>
                                          {isNaN(
                                            this.state.allcorrectanspercentage
                                          ) ||
                                            this.state.allcorrectanspercentage ===
                                            Infinity
                                            ? 0
                                            : this.state.allcorrectanspercentage >100 ? 100
                                            : this.state.allcorrectanspercentage}
                                          %
                                  </b>
                                      </span>
                                    </div>
                                  </Col>

                                  <Col
                                    xs="2"
                                    sm="2"
                                    md="2"
                                    lg="2"
                                    xl="2"
                                    className="text-center"
                                  >
                                    <h3 className="text-center">
                                      {this.state.totalcorrectanswered}{" "}
                                      of {this.state.totalAnswered}
                                    </h3>
                                  </Col>
                                </Row>
                              </CardBody>
                            </Card>
                          </div>
                        </div>
                        <div>
                          <Row className="pt-3">
                                          <Col md="5" className="text-center pb-2"><h5>{language.subjectandTopic}</h5></Col>
                                          <Col md="3" className="text-center pb-2"><h5>{language.answeredQuestions}</h5> </Col>
                                          <Col md="3" className="text-center pb-2"><h5>{language.correct_answers}</h5></Col>
                          </Row>
                          <div className="progress-modal-content card">
                            <div id="accordion">
                              {!this.state.progressData
                                ? ""
                                : this.state.progressData.map((subject, index) => (
                                  <>
                                    <div className="my-3 msedge-timing-performance-card">
                                      <CardHeader className="msedge-timing-performance-accordian-background msedge-timing-res">
                                        <Button
                                          block
                                          color="links"
                                          className="text-left m-0 p-0"
                                          onClick={() => this.toggleAccordion1(index)}
                                          aria-expanded={this.state.accordion[index]}
                                          aria-controls="collapseOne"
                                        >

                                          <Row className="msedge-flex-center p-0 m-0">
                                            <Col
                                              md="5"
                                              xs="6"
                                              sm="6"
                                              className="timing-score"
                                            >
                                              {this.state.accordion[index] === true ? (
                                                <h6 className="pl-2 accordianOn msedge-timing-performance-timing-difference">
                                                  {subject.subjectName}
                                                </h6>
                                              ) : (
                                                  <h6 className="pl-2 accordianOff msedge-timing-performance-timing-difference">
                                                    {subject.subjectName}
                                                  </h6>
                                                )}
                                            </Col>

                                            <Col md="3">
                                              <div
                                                style={{
                                                  width: "100%",
                                                  display: "flex",
                                                  marginTop: "8px"
                                                }}
                                              >
                                                <div
                                                  className="progress-bar-sm progress"
                                                  style={{
                                                    width: "94%",
                                                    marginRight: "10px",
                                                    backgroundColor: "#dadada"
                                                  }}
                                                >
                                                  <div
                                                    className="progress-bar"
                                                    style={{
                                                      width: `${[
                                                        isNaN(
                                                          Math.round(
                                                            ((subject.answered - 1) /
                                                              (subject.question - 1)) *
                                                            100
                                                          )
                                                        ) ||
                                                          Math.round(
                                                            ((subject.answered - 1) /
                                                              (subject.question - 1)) *
                                                            100
                                                          ) === Infinity
                                                          ? 0
                                                          : Math.round(
                                                            ((subject.answered - 1) /
                                                              (subject.question -
                                                                1)) *
                                                            100
                                                          )
                                                      ]}%`,
                                                      backgroundColor: Math.round(
                                                        ((subject.answered - 1) /
                                                          (subject.question - 1)) *
                                                        100
                                                      ) > 60 ? "#3ac47d" : "#d92550",

                                                      borderRadius: "2px",
                                                      transition:
                                                        "all .2s ease-out"
                                                    }}
                                                  />
                                                </div>
                                                <span
                                                  style={{
                                                    right: "3px",
                                                    fontSize: "14px",
                                                    marginTop: "-5px"
                                                  }}
                                                >
                                                  <p className="ada-font-size">

                                                    {[
                                                      isNaN(
                                                        Math.round(
                                                          ((subject.answered - 1) /
                                                            (subject.question - 1)) *
                                                          100
                                                        )
                                                      ) ||
                                                        Math.round(
                                                          ((subject.answered - 1) /
                                                            (subject.question - 1)) *
                                                          100
                                                        ) === Infinity
                                                        ? 0
                                                        : Math.round(
                                                          ((subject.answered - 1) /
                                                            (subject.question -
                                                              1)) *
                                                          100
                                                        )
                                                    ]}%
                                                  </p>
                                                </span>
                                              </div>
                                              <p className="text-center ada-font-size msedge-lh-unset">
                                                ({subject.answered - 1}  of{" "}
                                                {subject.question - 1})
                                              </p>
                                            </Col>



                                            <Col md="3">
                                              <div
                                                style={{
                                                  width: "100%",
                                                  display: "flex",
                                                  marginTop: "8px"
                                                }}
                                              >
                                                <div
                                                  className="progress-bar-sm progress"
                                                  style={{
                                                    width: "94%",
                                                    marginRight: "10px",
                                                    backgroundColor: "#dadada"
                                                  }}
                                                >
                                                  <div
                                                    className="progress-bar"
                                                    style={{
                                                      width: `${[
                                                        ((subject.questionsAnsweredCorrectly -
                                                          1) /
                                                          (subject.answered - 1)) *
                                                        100
                                                      ]}%`,
                                                      backgroundColor: (((subject.questionsAnsweredCorrectly -
                                                        1) /
                                                        (subject.answered - 1)) *
                                                        100) > 60 ? "#3ac47d" : "#d92550",
                                                      borderRadius: "2px",
                                                      transition: "all .2s ease-out"
                                                    }}
                                                  />
                                                </div>
                                                <span
                                                  style={{
                                                    right: "3px",
                                                    fontSize: "14px",
                                                    marginTop: "-5px"
                                                  }}
                                                >
                                                  <p className="ada-font-size">

                                                    {[
                                                      isNaN(
                                                        Math.round(
                                                          ((subject.questionsAnsweredCorrectly - 1) /
                                                            (subject.answered - 1)) *
                                                          100
                                                        )
                                                      ) ||
                                                        Math.round(
                                                          ((subject.questionsAnsweredCorrectly - 1) /
                                                            (subject.answered - 1)) *
                                                          100
                                                        ) === Infinity
                                                        ? 0
                                                        : Math.round(
                                                          ((subject.questionsAnsweredCorrectly - 1) /
                                                            (subject.answered -
                                                              1)) *
                                                          100
                                                        )
                                                    ]}%
                                                  </p>
                                                </span>
                                              </div>
                                              <p className="text-center ada-font-size msedge-lh-unset">
                                                ({subject.questionsAnsweredCorrectly -
                                                  1}{" "} of{" "}
                                                {subject.answered - 1})
                                              </p>
                                            </Col>
                                            <Col md="1" xs="6" sm="6">
                                              {this.state.accordion[index] ===
                                                false ? (
                                                  <FontAwesomeIcon
                                                    icon={faChevronDown}
                                                    size="3px"
                                                    className="text-muted mt-2 text-center"
                                                  />
                                                ) : (
                                                  <FontAwesomeIcon
                                                    icon={faChevronUp}
                                                    size="3px"
                                                    className="text-muted mt-2 text-center"
                                                  />
                                                )}
                                            </Col>

                                          </Row>
                                        </Button>
                                      </CardHeader>
                                      <Collapse
                                        isOpen={this.state.accordion[index]}
                                        data-parent="#accordion"
                                        id="collapseOne"
                                        aria-labelledby="headingOne"
                                        className="msedge-timing-performance-accordian-background"
                                      >
                                        <CardBody className="msedge-subject-topics">
                                          <div className="timingsubjectDetails msedge-no-of-questions-answered">
                                            {subject.topics.map((topics, index) => (
                                              <Row>
                                                <Col md="5">
                                                  <p className="">
                                                    {topics.topicName}
                                                  </p>
                                                </Col>
                                                <Col md="3" className="">
                                                  <div
                                                    style={{
                                                      width: "100%",
                                                      display: "flex",
                                                      marginTop: "8px"
                                                    }}
                                                  >
                                                    <div
                                                      className="progress-bar-sm progress"
                                                      style={{
                                                        width: "94%",
                                                        marginRight: "10px",
                                                        backgroundColor: "#dadada"
                                                      }}
                                                    >
                                                      <div
                                                        className="progress-bar"
                                                        style={{
                                                          width: (Math.round((topics.answered) / (topics.questions) * 100)) + "%",
                                                          backgroundColor:
                                                            (Math.round((topics.answered) / (topics.questions) * 100)) > 60
                                                              ? "#3ac47d"
                                                              : "#d92550",

                                                          borderRadius: "2px",
                                                          transition:
                                                            "all .2s ease-out"
                                                        }}
                                                      />
                                                    </div>
                                                    <span
                                                      style={{
                                                        right: "3px",
                                                        fontSize: "14px",
                                                        marginTop: "-8px"
                                                      }}
                                                    >
                                                      <p className="">
                                                        {isNaN(Math.round((topics.answered) / (topics.questions) * 100)) || Math.round((topics.answered) / (topics.questions) * 100) === Infinity ? 0 : Math.round((topics.answered) / (topics.questions) * 100)}%
                                            </p>
                                                    </span>
                                                  </div>
                                                  <p className="text-center  msedge-lh-unset">
                                                    ({topics.answered} of{" "}{topics.questions})
                                        </p>
                                                </Col>

                                                <Col md="3">
                                                  <div
                                                    style={{
                                                      width: "100%",
                                                      display: "flex",
                                                      marginTop: "8px"
                                                    }}
                                                  >
                                                    <div
                                                      className="progress-bar-sm progress"
                                                      style={{
                                                        width: "94%",
                                                        marginRight: "10px",
                                                        backgroundColor: "#dadada"
                                                      }}
                                                    >
                                                      <div
                                                        className="progress-bar"
                                                        style={{
                                                          width: (Math.round((topics.questionsAnsweredCorrectly) / (topics.answered) * 100)) + "%",
                                                          backgroundColor:
                                                            (Math.round((topics.questionsAnsweredCorrectly) / (topics.answered) * 100)) > 60 ? "#3ac47d"
                                                              : "#d92550",

                                                          borderRadius: "2px",
                                                          transition:
                                                            "all .2s ease-out"
                                                        }}
                                                      />
                                                    </div>
                                                    <span
                                                      style={{
                                                        right: "3px",
                                                        marginTop: "-8px"
                                                      }}
                                                    >
                                                      <p className="">

                                                        {isNaN(Math.round((topics.questionsAnsweredCorrectly) / (topics.answered) * 100)) || Math.round((topics.questionsAnsweredCorrectly) / (topics.answered) * 100) === Infinity ? 0 : Math.round((topics.questionsAnsweredCorrectly) / (topics.answered) * 100)}%
                                            </p>
                                                    </span>
                                                  </div>
                                                  <p className="text-center msedge-lh-unset">
                                                    ({topics.questionsAnsweredCorrectly} of{" "}{topics.answered})
                                        </p>
                                                </Col>
                                              </Row>
                                            ))}
                                          </div>
                                        </CardBody>
                                      </Collapse>
                                    </div>
                                  </>
                                ))}
                            </div>
                          </div>
                        </div>
                      </ModalBody>
  }
                    </div>

                    <ModalFooter className="msedge-close-btn">
                      <button
                        className="btn btn-outline-primary mr-2"
                        onClick={this.toggleClose}
                      >
                        <li>
                          <i class="pe-7s-close" data-for="close"></i>
                        </li>
                        <li className="text-uppercase">{language.close}</li>
                      </button>
                    </ModalFooter>
                  </Modal>
                </div>
              </div>
            </Row>
          </div>
        }
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      currentState,
    },
    dispatch
  );
};
export default connect(
  null,
  mapDispatchToProps
)(StudentList);