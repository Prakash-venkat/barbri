import React, { Component } from "react";
import Workbook from "react-excel-workbook";
import moment from "moment";
import swal from "sweetalert";
import { Col, CustomInput, Row } from "reactstrap";
import PageTitle from "../../../layout/AppMain/PageTitle";
import Loading from "../../../../components/admin/loading";
import {instance} from '../../../../actions/constants'
import {getSession} from '../../../routes/routePaths'
import {customPageTitle} from '../../../../components/commonComponents/customPageTitle'
import { ExamBatch } from '../../../../components/commonComponents/lawSchoolBatch.json'
import {language} from '../../../../utils/locale/locale'

var selectedBatch = [];

class DownloadReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [false, false, false],
      studentDetails: [],
      selectAllBox: false,
      loading: false,
      preExam: [],
      customExam: [],
      QusData: [],
      customFontSize: 0,
      LawSchoolSession: getSession("LawSchoolSession")
    };
  }

  componentDidMount = () => {
    selectedBatch = []

    this.selectAll();
    customPageTitle("Download Report")
  };

  selectAll = () => {

    if (this.state.selectAllBox === false) {

      this.setState({ selectAllBox: true })

      ExamBatch.map((name, index) => {
        let checked = this.state.checked;

        if (checked[index] != true) {
          checked[index] = true;
          selectedBatch.push(name.value);
        }
        this.setState({
          checked: checked
        });
      })

    } else if (this.state.selectAllBox === true) {
      this.setState({
        selectAllBox: false,
        studentDetails: [],
        preExam: [],
        customExam: [],
        QusData: []
      })

      ExamBatch.map((name, index) => {
        let checked = this.state.checked;

        if (checked[index] != false) {
          checked[index] = false;
          selectedBatch.splice(name.value);
        }
        checked[index] = false;
        this.setState({
          checked: checked
        });
      })
    }

    this.downloadReport();
  }

  checkHandler = (index, name) => {

    if (this.state.selectAllBox === true)
      this.setState({ selectAllBox: false })

    let checked = this.state.checked;
    checked[index] = !checked[index];
    this.setState({
      checked: checked
    });


    if (this.state.checked[index] === true) {
      selectedBatch.push(name.value);
    } else if (this.state.checked[index] === false) {
      selectedBatch = selectedBatch.filter(function (item) {
        return item !== name.value
      })
    }

    this.downloadReport();

  };

  clearAll = () => {
    if (this.state.selectAllBox === true)

      selectedBatch = [];
      this.setState( {

          selectAllBox: false,
        checked: [false, false, false], studentDetails: [],
        preExam: [],
        customExam: [],
        QusData: []
        });
  };
  
  downloadReport = () => {

    const batch = selectedBatch.toString();

    let lawSchoolId = this.state.LawSchoolSession.userLawschoolID;

    if (batch != "" || null) {

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
        this.setState({ studentDetails: res.data.data })

      }).catch(e => {
      })

      // GET EXAMS PROGRESS BY LAWSCHOOLID

      let precreate = [];
      let custom = [];

      this.setState({ preExam: [], customExam: [] });


      const options = {
        method: 'GET',
        headers: { 'content-type': 'application/x-www-form-urlencoded','Authorization': `Bearer ${localStorage.getItem('token')}` },
        params: studentlistParams,
        url: `lawschools/${lawSchoolId}/exams`
      };
      
      instance(options)
        .then(result => {

          if (result.status === 204) {
          } else {

            result.data.data.map((data) => {
              if (data.examType === "true")
                precreate.push(data)

              if (data.examType === "false")
                custom.push(data)
            })

            this.setState(
              {
                preExam: precreate,
                customExam: custom
              }
            );
          }
        })
        .catch(e => {
          this.setState({ preExam: [], customExam: [] });

        });

      // GET QUESTIONS PROGRESS BY LAWSCHOOLID

      const Qusoptions = {
        method: 'GET',
        headers: { 'content-type': 'application/x-www-form-urlencoded', 'Authorization': `Bearer ${localStorage.getItem('token')}`,   },
        params: studentlistParams,
        url: `lawchools/${lawSchoolId}/questions/progress`
      };
      
      instance(Qusoptions)
      .then(res => {        
        let listData = res.data.data;
        var datalistCond = (listData == null) || (listData == undefined) ? [] : listData;

        this.setState({ QusData: datalistCond })
      }).catch(e => {

      })
    } else if (batch === "") {
      this.setState({
        studentDetails: [],
        preExam: [],
        customExam: [],
        QusData: []
      })
    }
  }

  noData = () => {

    swal("", language.noDataToDownload, "warning");
  }

  getFileName = () => {
    let date = Date.now()
    let dateFormat = moment(date).format("MM-DD-YYYY");

    let d = new Date();
    let dformat = `${d.getHours()}-${d.getMinutes()}-${d.getSeconds()}`;

    return "STUDENT_DATA_" + dateFormat + "_" + dformat + ".xlsx";
  }

  render() {

    var data1 = []
    var data2 = []
    var data3 = []
    var data4 = []

    if (this.state.studentDetails === "" || null)
      data1 = []
    else
      data1 = this.state.studentDetails.map((data, i) => {
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
          overAllPercentage: Math.round(data.overAllPercentage).toString()
        };
      });

    if (this.state.preExam === "" || null)
      data2 = [];
    else
      data2 = this.state.preExam.map((data, i) => {
        return {
          studentCode: data.studentCode,
          StudentName: data.firstName + " " + data.lastName,
          barExamBatch: data.barExamBatch,
          examTakenAt: data.examTakenAt,
          examName: data.examName,
          questionsAnswered: data.questionsAnswered,
          numberOfRightAnswer: data.numberOfRightAnswer,
          examDuration: data.examDuration,
          totalQuestions: data.totalQuestions,
          examScore: data.examScore
        };
      });

    if (this.state.QusData === "" || null)
      data3 = [];
    else
      data3 = this.state.QusData.map((data, i) => {
        return {
          studentCode: data.studentCode,
          StudentName: data.firstName + " " + data.lastName,
          barExamBatch: data.barExamBatch,
          subject: data.subject,
          topic: data.topic,
          questionsAnswered: data.questionsAnswered.toString(),
          numberOfRightAnswer: data.numberOfRightAnswer.toString(),
          totalQuestions: data.totalQuestions.toString(),
          overAllPercentage: Math.round(data.overAllPercentage).toString()
        };
      });

    if (this.state.customExam === "" || null)
      data4 = [];
    else
      data4 = this.state.customExam.map((data, i) => {
        return {
          studentCode: data.studentCode,
          StudentName: data.firstName + " " + data.lastName,
          barExamBatch: data.barExamBatch,
          examTakenAt: data.examTakenAt,
          examName: data.examName,
          questionsAnswered: data.questionsAnswered,
          numberOfRightAnswer: data.numberOfRightAnswer,
          examDuration: data.examDuration,
          totalQuestions: data.totalQuestions,
          examScore: data.examScore
        };
      });

    return (
      <div className="msedge-download-report">
        <PageTitle
          heading="Download Report"
          subheading="Click download to download the report for all batches of students or select the batches below to be
          included in the report."
          brdcrumptwo="Students"
          brdcrumpthree="Download Report"
          brdcrumptwolink="/law-school/students"
          linkToHome="/law-school"
        />
        <div>
          {this.state.loading ? (
            <Loading />
          ) : (
              <Row>
                <div className="container-fluid msedge-student-dashboard p-30 pb-3 pt-3">
                  <Row>
                    <Col
                      lg="12"
                      md="12"
                      sm="12"
                      xl="12"
                      xs="12"
                      className="msedge-download-report-top bg-white"
                    >
                      <Row className="mt-3">
                        <Col md="6">
                          <h2 className="msedge-exam-batch msedge-lawschool-download-report text-primary">
                            {language.bar_exams_batches}
                             </h2>
                        </Col>

                        <Col
                          lg="6"
                          md="6"
                          sm="6"
                          xl="6"
                          className="text-right  msedge-responsive-view msedge-questions-start msedge-icon-btn"
                        >
                          <button
                            style={{
                              fontSize: `${0.875 + this.state.customFontSize}rem`
                            }}
                            type="button"
                            className="text-md btn btn-outline-secondary"
                            onClick={this.clearAll}
                          ><li>
                              <i class="pe-7s-close" aria-hidden="true"></i>
                            </li>
                            <li className="text-uppercase">{language.clear_selection}</li>
                          </button>

                          {this.state.studentDetails.length === 0 || this.state.studentDetails === [] ?

                            <button
                              style={{
                                fontSize: `${0.875 + this.state.customFontSize}rem`
                              }}
                              type="button"
                              className=" ml-2 text-md btn-lg text-center btn btn-primary"
                              disabled={selectedBatch.length === 0 ||selectedBatch===[] ? true : false}
                              onClick={this.noData}
                            ><li>
                                <i class="pe-7s-download" aria-hidden="true"></i>
                              </li>
                              <li className="text-uppercase">{language.download} </li>
                            </button>
                            :
                            <Workbook filename={this.getFileName()}
                              element={
                                <button
                                  style={{
                                    fontSize: `${0.875 + this.state.customFontSize}rem`
                                  }}
                                  type="button"
                                  className=" ml-2 text-md btn-lg text-center btn btn-primary"
                                  disabled={selectedBatch.length === 0 || selectedBatch === [] ? true : false}
                                  onClick={this.downloadReport}
                                ><li>
                                    <i class="pe-7s-download" aria-hidden="true"></i>
                                  </li>
                                  <li className="text-uppercase">{language.download}</li>
                                </button>
                              }
                            >

                              <Workbook.Sheet data={data1} name="Students">
                                <Workbook.Column label="Student Code" value="studentCode" />
                                <Workbook.Column label="Student  last Name" value="studentLastName" />
                                <Workbook.Column label="Student  First Name" value="firstname" />
                                <Workbook.Column label="Student  Middle Initial" value="studentMiddleInitial" />
                                <Workbook.Column label="Batch" value="batch" />
                                <Workbook.Column label="Email" value="email" />
                                <Workbook.Column label="contact No" value="phone" />
                                <Workbook.Column label="Expected Bar Exam Date" value="studentExpectedBarExamDate" />
                                <Workbook.Column label="Expected Bar Exam State" value="studentExpectedBarExamState" />
                                <Workbook.Column label="No.of Previous Bar Exams" value="studentNoPrevBarExamsTaken" />
                                <Workbook.Column label="Student Lawschool GPA" value="studentLawSchoolGPA" />
                                <Workbook.Column label="Student LSAT" value="studentLSAT" />
                                <Workbook.Column label="Student Full Time" value="studentFullTime" />
                                <Workbook.Column label="Student Transfer" value="studentTransfer" />
                                <Workbook.Column label="No. of Answered Questions" value="answeredQus" />
                                <Workbook.Column label="Correct Answers" value="crctAns" />
                                <Workbook.Column label="Percentage" value="overAllPercentage" />
                              </Workbook.Sheet>

                              <Workbook.Sheet data={data2} name="Pre-created exams ">
                                <Workbook.Column label="Student Code" value="studentCode" />
                                <Workbook.Column label="Student Name " value="StudentName" />
                                <Workbook.Column label="Batch " value="barExamBatch" />
                                <Workbook.Column label="Pre-created Exam Name" value="examName" />
                                <Workbook.Column label="Date" value="examTakenAt" />
                                <Workbook.Column label="Total Questions " value="totalQuestions" />
                                <Workbook.Column label="Answered Questions " value="questionsAnswered" />
                                <Workbook.Column label="Right Answeres " value="numberOfRightAnswer" />
                                <Workbook.Column label="Percentage" value="examScore" />
                              </Workbook.Sheet>


                              <Workbook.Sheet data={data4} name="Custom exams ">
                                <Workbook.Column label="Student Code" value="studentCode" />
                                <Workbook.Column label="Student Name " value="StudentName" />
                                <Workbook.Column label="Batch " value="barExamBatch" />
                                <Workbook.Column label="Custom Exam Name" value="examName" />
                                <Workbook.Column label="Date" value="examTakenAt" />
                                <Workbook.Column label="Total Questions " value="totalQuestions" />
                                <Workbook.Column label="Answered Questions " value="questionsAnswered" />
                                <Workbook.Column label="Right Answeres " value="numberOfRightAnswer" />
                                <Workbook.Column label="Percentage" value="examScore" />
                              </Workbook.Sheet>

                              <Workbook.Sheet data={data3} name="Questions progress ">
                                <Workbook.Column label="Student Code" value="studentCode" />
                                <Workbook.Column label="Student Name " value="StudentName" />
                                <Workbook.Column label="Batch " value="barExamBatch" />
                                <Workbook.Column label="Subject Name " value="subject" />
                                <Workbook.Column label="Topic Name " value="topic" />
                                <Workbook.Column label="Answered Questions " value="questionsAnswered" />
                                <Workbook.Column label="Correct Answers " value="numberOfRightAnswer" />
                                <Workbook.Column label="Total Questions " value="totalQuestions" />
                                <Workbook.Column label="Percentage" value="overAllPercentage" />
                              </Workbook.Sheet>
                            </Workbook>
                          }
                        </Col>
                      </Row>

                      <Col md="11" className="mt-3 mx-auto msedge-lawschool-download-report-select-all pl-0">
                        <CustomInput
                          type="checkbox"
                          label="Select all"
                          checked={this.state.selectAllBox}
                          id={2}
                          style={{ fontSize: "1rem" }}
                          onClick={this.selectAll}
                        />
                      </Col>


                      <Row className="py-3 ">
                        <Col
                          lg="11"
                          md="11"
                          sm="11"
                          xl="11"
                          xs="11"
                          className="pb-3 mx-auto"
                        >
                          {ExamBatch.map((batch, index) =>

                            batch !== "null" ? (
                              <label
                                id="chk1-label"
                                role="checkbox"
                                aria-checked="false"
                                tabindex="0"
                                className={
                                  this.state.checked[index] === true
                                    ? "btn btn-primary active margin-right msedge-txt-large "
                                    : "msedge-txt-large margin-right btn btn-outline-secondary "
                                }
                              >
                                <input
                                  type="checkbox"
                                  name={batch.studentLawSchoolId}
                                  value={index}
                                  autocomplete="off"
                                  for="chk1-label"
                                  onClick={() => this.checkHandler(index, batch)}
                                />
                                {batch.value}
                                <span
                                  className={
                                    this.state.checked[index] === true
                                      ? " "
                                      : "close"
                                  }
                                >
                                  <i className="pe-7s-close text-white msedge-txt-large">
                                    {" "}
                                  </i>
                                </span>

                              </label>

                            ) : (
                                ""
                              )
                          )}
                        </Col>
                      </Row>                  
                    </Col>
                  </Row>
                </div>
              </Row>
            )}
        </div>
      </div>
    );
  }
}

export default DownloadReport