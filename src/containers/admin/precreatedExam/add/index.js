import React, { Component, Fragment } from "react";
import { Col, Row, Modal, ModalHeader, ModalBody } from "reactstrap";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import Formsy from "formsy-react";
import { subjects } from "./components/subject.json";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Collapsible from 'react-collapsible';
import Switch from "react-switch";
import swal from "sweetalert";
import Select from 'react-select';
import { instance, HASH_HISTORY } from "../../../../actions/constants";
import { customPageTitle } from '../../../../components/commonComponents/customPageTitle';
import {language} from '../../../../utils/locale/locale'


import { postData, updateData, currentState, redirectPath } from "../../../../actions/actionMain";
import Error from "../../../../components/admin/error";
import AppButtonBottom from '../../../../components/commonComponents/appButtonBottom'
import AppButtonTop from '../../../../components/commonComponents/appButtonTop';
import { tooltipMsg } from "../../../../components/admin/tooltipMsg";
import { regx } from "../../../../utils/admin/Regx";
import { errors } from '../../../../utils/admin/ErrorMessages';
import MyInput from "../../../../components/admin/inputs/MyInput";
import { civilProcedure, constitutionalLaw, contracts, criminalLaw, evidence, realProperty, torts } from '../../../../components/commonComponents/subjectTopics'
import { getSession } from "../../../routes/routePaths"

const initialRow = {
  precreatedExamCode: "",
  precreatedExamName: "",
  precreatedExamDesc: "",
  precreatedExamStatus: "n",
  noOfQuestions: ""
};

const filterOptionSubject = [
  { value: "Civil Procedure", label: "Civil Procedure", id: 1 },
  { value: "Constitutional Law", label: "Constitutional Law", id: 2 },
  { value: "Contracts", label: "Contracts", id: 3 },
  { value: "Criminal Law and Procedure", label: "Criminal Law and Procedure", id: 4 },
  { value: "Evidence", label: "Evidence", id: 5 },
  { value: "Real Property", label: "Real Property", id: 6 },
  { value: "Torts", label: "Torts", id: 7 },
  { value: "All Subjects", label: "All Subjects", id: 8 }
]

class AddPracticeExam extends Component {
  constructor(props) {
    super(props);

    this.state = {
      adminSession: getSession("AdminSession"),
      modal: false,
      accordion: [false, false, false, false, false, false, false],
      editId: " ",
      addORedit: "add",
      subjects: subjects,
      rowData: initialRow,
      filteredData: [],
      canSubmit: false,
      cursorDisable: "",
      loading: true,

      checkedQuestion: [],
      readMore: [],
      addDataList: [],
      examCode: "",
      examName: "",
      examDesc: "",
      noOfQuestions: 0,
      itemBankCodes: [],
      preCreatedExamId: "",
      data: [],
      searchInput: "",
      isLoading: false,
      filterSubject: "",
      filterTopic: "",
      selectedTopicValue: "",
      allCodes: [],
      constArray: []
    };

  }


  componentDidMount() {

    customPageTitle('Add Pre-Created Exam')
    this.props.currentState("precreatedexam_add");

    if (this.props.location.query) {
      let subject = this.state.subjects;
      this.setState({
        rowData: this.props.location.query.original || null,
        addORedit: "edit",
        editId: this.props.location.query.original.precreatedExamId,
        subjects: subject,
        noOfQuestions: this.props.location.query.original.precreatedExamTotalQuestions
      });
    }   
  }

  fieldHandler = (field, event) => {
    let row = this.state.rowData;
    switch (field) {
      case "status":
        row.precreatedExamStatus = event.target.value;
        this.setState({ rowData: row });
        break;
    }
  };

  disableButton = () => {
    this.setState({ canSubmit: false, cursorDisable: "not-allowed" });
  };

  enableButton = () => {
    this.setState({ canSubmit: true, cursorDisable: "" });
  };

  onSubmit = model => {
    this.setState({
      examCode: model.precreatedExamCode,
      examName: model.precreatedExamName,
      noOfQuestions: model.noOfQuestions,
      examDesc: model.precreatedExamDesc,
      isLoading: true
    })
    if (this.state.addORedit === "add") {
      var addData = {
        "ownChoice": 0,
        "precreatedExamCode": model.precreatedExamCode,
        "precreatedExamName": model.precreatedExamName,
        "precreatedExamCreatedBy": this.state.adminSession.userId,
        "precreatedExamStatus": this.state.rowData.precreatedExamStatus,
        "precreatedExamDesc": model.precreatedExamDesc,
        "precreatedExamTotalQuestions": 0
      }
      instance.post("admin/exams/precreated", addData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,        
        }
      })
        .then(res => {
          if (res.data.status === "Failure") {
            swal(language.oops, language.pcNameandCodeExist, "error");
            this.setState({ isLoading: false })
          } else {
            const data = res.data.data;
            const index = data.map(item => { return "0" })
            this.setState({
              filteredData: data,
              constArray: data,
              checkedQuestion: index,
              readMore: index,
              preCreatedExamId: data[0].preCreatedExamId,
              data: data,
              isLoading: false
            })
            this.setState(prevState => ({
              modal: !prevState.modal,
            }));
          }
        })
        .catch(e => {
          swal(language.oops, language.tryAgain, "error");
          this.setState({ isLoading: false })
        })
    } else {
      var addData = JSON.stringify({
        "ownChoice": 1,
        "precreatedExamId": this.state.editId,
      })
      instance.post("admin/exams/precreated", addData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,        
        }
      })
        .then(res => {
          if (res.data.status === "Failure") {
            swal(language.oops, language.tryAgain, "error");
            this.setState({ isLoading: false })
          } else {
            const data = res.data.data === null || res.data.data === undefined || res.data.data === "" ? [] : res.data.data;
            const read = data.map(item => { return "0" })
            const select = data.map(item => { return item.questionAddedInPreCreatedExam })
            data.map((item, index) => { return item.questionAddedInPreCreatedExam == "1" ? this.state.itemBankCodes.push(item.itemBankCode) : null })
            this.setState({
              filteredData: data,
              constArray: data,
              data: data,
              checkedQuestion: select,
              readMore: read,
              preCreatedExamId: data[0].preCreatedExamId
            })
            this.setState(prevState => ({
              modal: !prevState.modal,
              isLoading: false
            }));
          }
        })
        .catch(e => {
          this.setState({ isLoading: false })
          swal(language.oops, language.tryAgain, "error");
        })
    }
  }

  saveData = () => {
    this.props.redirectPath("precreatedexam");
    this.setState({ isLoading: true })
    try {
      const total = this.state.itemBankCodes === [] ? this.state.noOfQuestions : this.state.itemBankCodes.length

      if (this.state.addORedit === "add") {
        var addData = {
          precreatedExamId: this.state.preCreatedExamId,
          itemBankCodes: this.state.itemBankCodes,
          precreatedExamTotalQuestions: total,
          precreatedExamCode: this.state.examCode,
          precreatedExamName: this.state.examName,
          precreatedExamStatus: total === 0 ? "n" : this.state.rowData.precreatedExamStatus,
          precreatedExamDesc: this.state.examDesc
        }
        instance.put("admin/exams/precreated/questions", addData, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,        
          }
        })
          .then(res => {
            if (res.data.status === "Success") {
              swal(language.added, language.addedMsg, "success")
              HASH_HISTORY.push("/admin/list_precreatedexam")
              this.setState({ isLoading: false })
            } else {
              swal(language.oops, language.pcNameandCodeExist, "error");
              this.setState({ isLoading: false })
            }
          })
          .catch(e => {
            swal(
              language.oops,
              language.tryAgain,
              "error"
            );
            this.setState({ isLoading: false })
          })
      } else {
        var addData = JSON.stringify({
          precreatedExamId: this.state.editId,
          itemBankCodes: this.state.itemBankCodes,
          precreatedExamTotalQuestions: total,
          precreatedExamCode: this.state.examCode,
          precreatedExamName: this.state.examName,
          precreatedExamStatus: total === 0 ? "n" : this.state.rowData.precreatedExamStatus,
          precreatedExamDesc: this.state.examDesc
        })
        instance.put("admin/exams/precreated/questions", addData, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,        
          }
        })
          .then(res => {
            if (res.data.status === "Success") {
              swal(language.updated, language.updatedMsg, "success")
              HASH_HISTORY.push("/admin/list_precreatedexam")
              this.setState({ isLoading: false })
            } else {
              swal(language.oops, language.pcNameandCodeExist, "error");
              this.setState(prevState => ({
                modal: !prevState.modal,
                isLoading: false
              }));
            }
          })
          .catch(e => {
            swal(
              language.oops,
              language.tryAgain,
              "error"
            );
            this.setState({ isLoading: false })
          })
      }
    } catch (e) {
      console.log(e);
      swal(
        language.oops,
        language.tryAgain,
        "error"
      );
      this.setState({ isLoading: false })
    }
  }

  goBack = () => {
    this.setState(prevState => ({
      modal: !prevState.modal,
      showMsg: false,
      itemBankCodes: []
    }));
  };

  toggle = () => {

    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

  chooseQuestion = (index, item) => {
    let checkedQuestion = this.state.checkedQuestion;
    checkedQuestion[index] = checkedQuestion[index] === "0" ? "1" : "0";

    this.setState({
      checkedQuestion: checkedQuestion
    }
    );
    if (this.state.checkedQuestion[index] === "1") {
      let copyItembankCodes = this.state.itemBankCodes;
      this.state.itemBankCodes.push(item.itemBankCode);
      this.setState({ itemBankCodes: copyItembankCodes })
    } else if (this.state.checkedQuestion[index] === "0") {
      let copyItembankCodes = this.state.itemBankCodes;
      copyItembankCodes = copyItembankCodes.filter((items) => {
        return items !== item.itemBankCode
      })
      this.setState({ itemBankCodes: copyItembankCodes })

    }
  }
  readMore = (index) => {
    let readMore = this.state.readMore;
    readMore[index] = readMore[index] === 0 ? 1 : 0;
    this.setState({
      readMore: readMore
    });
  }

  searchHandleChange = event => {
    this.setState({ searchInput: event.target.value }, () => { this.handleChange() });
  }

  handleChange = () => {
    this.setState(prevState => {
      const filteredData = this.state.data.filter(value => {
        return (
          value.itemBankCode != null && value.itemBankCode
            .toLowerCase()
            .includes(this.state.searchInput.toLowerCase()) ||
          value.itemBankSubject != null && value.itemBankSubject.toLowerCase().includes(this.state.searchInput.toLowerCase()) ||
          value.itemBankContentType != null && value.itemBankContentType.toLowerCase().includes(this.state.searchInput.toLowerCase()) ||
          value.itemBankTopic != null && value.itemBankTopic.toLowerCase().includes(this.state.searchInput.toLowerCase()) ||
          value.itemBankQuestion != null && value.itemBankQuestion
            .toLowerCase()
            .includes(this.state.searchInput.toLowerCase()) ||
          value.itemBankPrefrenceStatus != null && value.itemBankPrefrenceStatus.toString().includes(this.state.searchInput.toString())
        );
      });

      return {
        filteredData
      };
    });
  };

  handleChangeFilterSubject = (filterSubject) => {
    this.setState({ filterSubject, selectedTopicValue: "" })
    if (filterSubject.id === 8) {
      this.setState({ filteredData: this.state.constArray, data: this.state.constArray }, () => { this.handleChange() })
    } else {
      const exampleMap = this.state.constArray.map((data, index)=>{
        return data.itemBankSubject
      })
      const a = this.state.constArray.filter((item, i) => ((item.itemBankSubject).trim()).toLowerCase() == ((filterSubject.value).trim()).toLowerCase())

      this.setState({ filteredData: a, data: a }, () => { this.handleChange() })
    }
  }
  handleChangeFilterTopics = (filterTopic) => {
    this.setState({ filterTopic, selectedTopicValue: filterTopic })
    const a = this.state.constArray.filter((item, i) => (item.itemBankTopic).toLowerCase() === (filterTopic.value).toLowerCase())
    this.setState({ filteredData: a, data: a }, () => { this.handleChange() })
  }

  render() {
    if (this.state.adminSession.user_role == "3") {
      this.props.history.push("/admin/not_allowed");
    }

    return (
      <div className="msedge-precreated-exam-main">
        <Fragment>
          <ReactCSSTransitionGroup
            component="div"
            transitionName="TabsAnimation"
            transitionAppear={true}
            transitionAppearTimeout={0}
            transitionEnter={false}
            transitionLeave={false}
          >
            <Row>
              <Col md="12">
                <Formsy
                  onValidSubmit={this.onSubmit}
                  onValid={this.enableButton}
                  onInvalid={this.disableButton}
                >
                  {" "}

                  <AppButtonTop
                    disabled={!this.state.canSubmit}
                    style={{ cursor: this.state.cursorDisable }}
                    isLoading={this.state.isLoading}
                    addORedit={this.state.addORedit}
                    addTitle={"Add Pre-created Exam"}
                    buttonName={language.set_questions}
                    editTitle={"Edit Pre-created Exam"}
                    redirectToList={"/admin/list_precreatedexam"}
                  />

                  <Row>
                    <div className="container-fluid bg-grey p-30">
                      <div className="col-md-12 bg-white rounded">
                        <div className="msedge-practice-exam">
                          <div className="border-bottom">
                            <Error />
                            <Col
                              md="12"
                              lg="12"
                              xl="12"
                              className="msedge-admin-form-title pt-3"
                            >
                              <Row>
                                <div md="6" className="pt-0">
                                  <h5 className="text-primary mb-0">
                                    {language.exam_information}
                                  </h5>
                                </div>
                              </Row>
                              <Row>
                                <div className="pt-2">
                                  <p>{language.exam_info}</p>
                                </div>
                              </Row>
                            </Col>
                            <div className="msedge-practice-exam-field">
                              <MyInput
                                name="precreatedExamCode"
                                id="code"
                                type="text"
                                value={this.state.rowData.precreatedExamCode}
                                validations={{
                                  matchRegexp: regx.code,
                                  maxLength: "10"
                                }}
                                validationErrors={{
                                  matchRegexp: errors.code,
                                  maxLength: errors.maxLength10
                                }}
                                className="form-control"
                                required
                                fieldName="Exam Code"
                                tooltip={tooltipMsg.precreated_exam_code}
                                isMandatory={true}
                              />
                              <MyInput
                                name="precreatedExamName"
                                id="name"
                                type="text"
                                value={this.state.rowData.precreatedExamName}
                                validations={{
                                  matchRegexp: regx.code,
                                }}
                                validationErrors={{
                                  matchRegexp: errors.code,
                                }}
                                className="form-control"
                                required
                                fieldName="Exam Name"
                                tooltip={tooltipMsg.precreated_exam_code}
                                isMandatory={true}
                              />
                              <MyInput
                                name="precreatedExamDesc"
                                id="name"
                                type="textarea"
                                value={this.state.rowData.precreatedExamDesc}
                                validationError="Please enter correct exam description"
                                validations={{
                                  matchRegexp: regx.alphNum250max
                                }}
                                className="form-control"
                                required
                                fieldName="Exam Description"
                                tooltip={tooltipMsg.precreated_exam_desc}
                                isMandatory={true}
                              />
                              {this.state.addORedit === "add" ? ""
                                :
                                <MyInput
                                  name="noOfQuestions"
                                  id="name"
                                  type="text"
                                  value={this.state.noOfQuestions}
                                  validationError="Only number is allowed, maximum length is 5"
                                  validations={{
                                    matchRegexp: regx.five_no_char_e,
                                    isInt: true

                                  }}
                                  className="form-control"
                                  required
                                  fieldName="Total number of questions"
                                  tooltip={tooltipMsg.previous_bar_exam_taken}
                                  isDisable={true}
                                // isMandatory={true}
                                />}
                              <div className="custom-fields">
                                <Row className="pt-2 pb-4">
                                  <Col md="4">
                                    <label htmlFor="lastname" className="ada-font-size">
                                      {language.status}
                                    </label>
                                  </Col>
                                  <Col md="2">
                                    <div className="custom-radio custom-control">
                                      <input
                                        aria-label="Exam status"
                                        name="precreatedExamStatus"
                                        type="radio"
                                        id="radioNo"
                                        className="custom-control-input"
                                        value="n"
                                        onChange={this.fieldHandler.bind(
                                          this,
                                          "status"
                                        )}
                                        checked={
                                          this.state.rowData
                                            .precreatedExamStatus === "n"
                                            ? true
                                            : false
                                        }
                                      />
                                      <label
                                        className="custom-control-label ada-font-size"
                                        htmlFor="radioNo"
                                      >
                                        {language.draft}
                                      </label>
                                    </div>
                                  </Col>
                                  <Col md="2">
                                    <div className="custom-radio custom-control">
                                      <input
                                        aria-label="Exam status"
                                        name="precreatedExamStatus"
                                        type="radio"
                                        id="radioYes"
                                        className="custom-control-input"
                                        value="y"
                                        disabled={this.state.addORedit === "edit" ? this.state.noOfQuestions === "0" || this.state.noOfQuestions === 0 ? true : false : ""}
                                        checked={
                                          this.state.rowData
                                            .precreatedExamStatus === "y"
                                            ? true
                                            : false
                                        }
                                        onChange={this.fieldHandler.bind(
                                          this,
                                          "status"
                                        )}
                                      />
                                      <label
                                        className="custom-control-label ada-font-size"
                                        htmlFor="radioYes"
                                        checked
                                      >
                                        {language.published}
                                      </label>
                                    </div>
                                  </Col>
                                  <Col md="2" style={{ display: `${this.state.addORedit === "add" ? "none" : "block"}` }}>
                                    <div className="custom-radio custom-control">
                                      <input
                                        aria-label="Exam status"
                                        name="precreatedExamStatus"
                                        type="radio"
                                        id="radioDelete"
                                        className="custom-control-input"
                                        value="d"
                                        onChange={this.fieldHandler.bind(
                                          this,
                                          "status"
                                        )}
                                        checked={
                                          this.state.rowData
                                            .precreatedExamStatus === "d"
                                            ? true
                                            : false
                                        }
                                        disabled={this.state.adminSession.user_role === "1" ? false : true}
                                      />
                                      <label
                                        className="custom-control-label ada-font-size"
                                        htmlFor="radioDelete"
                                      >
                                        {language.delete}
                                      </label>
                                    </div>
                                  </Col>
                                </Row>
                              </div>
                              <div className="custom-fields">
                                <Row className="pt-2 pb-4">
                                  <Col md="12">
                                    <label htmlFor="lastname" className="ada-font-size">
                                     {language.setQuestionsMsg}
                                    </label>
                                  </Col>
                                </Row>
                              </div>
                            </div>
                          </div>
                          <div>
                            <AppButtonBottom
                              disabled={!this.state.canSubmit}
                              style={{ cursor: this.state.cursorDisable }}
                              isLoading={this.state.isLoading}
                              redirectToList={"/admin/list_precreatedexam"}
                              buttonName={language.set_questions}
                            />
                          </div>
                          <Modal
                            isOpen={this.state.modal}
                            toggle={this.goBack}
                            className={`${this.props.className} pre_created_popup_width`}
                          >
                            <ModalHeader className="pre-created-model-header" toggle={this.goBack}>
                              {/* <h5 className="mb-0">Select questions</h5> */}
                              <div className="row pre-create-card-header">
                                <div className="col-md-12">
                                  <div className="row">
                                    <div className="col-md-6">
                                      <Row>
                                        <Col md="6">
                                      <h5 className="mb-0 mt-1">{language.selectQuestions}</h5>
                                        </Col>
                                      </Row>
                                    </div>
                                    <div className="col-md-6">
                                      <div className="form-group text-right">
                                        {!this.state.isLoading ? (
                                          <span className="msedge-questions-start msedge-right-br mr-2">
                                            <button
                                              type="button"
                                              className="btn btn-outline-primary"
                                              onClick={this.saveData}
                                            >
                                              <li>
                                                <i className="pe-7s-download" aria-hidden="true"></i>
                                              </li>
                                        <li className="text-uppercase">{language.update}</li>
                                            </button>
                                          </span>
                                        ) : (
                                            <span className="msedge-questions-start msedge-right-br">
                                              <button
                                                className="btn btn-primary mr-2"
                                                type="button"
                                                disabled
                                              >
                                                <li>
                                                  <span
                                                    className="spinner-border spinner-border-sm mr-2"
                                                    role="status"
                                                    aria-hidden="true"
                                                  ></span>
                                                </li>
                                                <li className="text-uppercase">
                                                  {language.buttonLoading}
                                                </li>
                                              </button>
                                            </span>
                                          )}
                                        <span className="msedge-questions-start msedge-right-br">
                                          <button
                                            type="button"
                                            className="btn btn-outline-primary"
                                            onClick={this.goBack}
                                          >
                                            <li>
                                              <i className="pe-7s-back" aria-hidden="true"></i>
                                            </li>
                                        <li className="text-uppercase">{language.close}</li>
                                          </button>
                                        </span>
                                      </div>
                                    </div>
                                  </div>

                                </div>
                              </div>
                            </ModalHeader>
                            <ModalBody className="bg-grey">
                              <Col xs="12" sm="12" md="12" lg="12" xl="12" className="pr-0">
                                <Row>
                                  <Col md="8">
                                    <Row>
                                      <Col md="4" className="pl-0">
                                        <Select
                                          onChange={this.handleChangeFilterSubject}
                                          options={filterOptionSubject}
                                          placeholder="Select Subject"
                                        >
                                        </Select>
                                      </Col>
                                      <Col md="4" className="pl-0">
                                        <Select
                                          onChange={this.handleChangeFilterTopics}
                                          value={this.state.selectedTopicValue}
                                          placeholder="Select Topic"
                                          options={this.state.filterSubject.id === 1 ? civilProcedure :
                                            this.state.filterSubject.id === 2 ? constitutionalLaw :
                                              this.state.filterSubject.id === 3 ? contracts :
                                                this.state.filterSubject.id === 4 ? criminalLaw :
                                                  this.state.filterSubject.id === 5 ? evidence :
                                                    this.state.filterSubject.id === 6 ? realProperty :
                                                      this.state.filterSubject.id === 7 ? torts : [{ value: '', label: 'No options' }]
                                          }
                                        >
                                        </Select>
                                      </Col>
                                      <Col md="4" className="p-1">
                                        <Row className="p-1">
                                          <Col md="7" className="pre-created-question-count text-right p-0 pt-1">{language.selectedQuestions}:</Col>
                                          <Col md="2" className="pre-created-question-running-count pl-2">{this.state.itemBankCodes.length}</Col>
                                        </Row>
                                      </Col>
                                    </Row>
                                  </Col>
                                  <Col md="4">
                                    <div className="form-group ">
                                      <input
                                        className="text-body msedge-form-control-onsearch"
                                        name="searchInput"
                                        placeholder="Search.."
                                        value={this.state.searchInput || ""}
                                        onChange={this.searchHandleChange}
                                        label="Search"
                                        maxLength="50"
                                        aria-label="Table over all search"
                                      />
                                      <span className="btn pe-7s-search msedge-onsearch-icon"></span>
                                    </div>
                                  </Col>
                                </Row>
                              </Col>
                              <div>
                                <div className="scroller">
                                  <div
                                    id="accordion" className="pre-created-accordion"
                                  >
                                    {this.state.filteredData.length === 0 ?
                                      <div className="text-center py-5 no-data-found">
                                        <div className="py-5">
                                          {language.noDataFound}
                                      </div>
                                      </div>
                                      :
                                      <Row>
                                        {this.state.filteredData.map((item, index) => {
                                          return (
                                            <Col md="4" className="my-2 pr-0">
                                              <div className="pre_created_card">
                                                <Collapsible
                                                  trigger={
                                                    <Col md="12">
                                                      <Row className="py-3">
                                                        <Col md="8">
                                                          {item.itemBankCode}
                                                        </Col>
                                                        <Col md="4" className="pl-0">
                                                          <Row>
                                                            <Col md="8">
                                                              <Switch
                                                                // checked={this.state.checkedQuestion[index] === 1 || this.state.checkedQuestion[index] === "1" ? true : false}
                                                                checked={this.state.itemBankCodes.includes(item.itemBankCode)}
                                                                onChange={this.chooseQuestion.bind(this, index, item)}
                                                                onColor="#86d3ff"
                                                                onHandleColor="#2693e6"
                                                                handleDiameter={23}
                                                                uncheckedIcon={true}
                                                                checkedIcon={true}
                                                                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                                                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                                                height={15}
                                                                width={42}
                                                                aria-label="processed"
                                                                tabIndex="0"
                                                              />
                                                            </Col>
                                                            <Col md="2" className="p-0">
                                                              <FontAwesomeIcon icon={faChevronDown} size="3px" className="text-muted mt-2 text-center" />
                                                            </Col>
                                                          </Row>
                                                        </Col>
                                                        <Col md="12">
                                                          <Col md="12" className="p-0">{item.itemBankSubject} / {item.itemBankTopic}</Col>
                                                        </Col>
                                                      </Row>
                                                    </Col>
                                                  }>
                                                  <Col md="12" className="pb-3 pre-created-popup-question">
                                                    <div dangerouslySetInnerHTML={{
                                                      __html: item.itemBankQuestion
                                                        ? item.itemBankQuestion.length > 85
                                                          ? `${this.state.readMore[index] === 0 ? item.itemBankQuestion.substring(0, item.itemBankQuestion.length) : item.itemBankQuestion.substring(0, 200)}${this.state.readMore[index] === 0 ? "...Read less" : "...Read more"}`
                                                          : item.itemBankQuestion
                                                        : item.itemBankQuestion
                                                    }}
                                                      onClick={this.readMore.bind(this, index)}
                                                    ></div>
                                                  </Col>
                                                </Collapsible>
                                              </div>
                                            </Col>
                                          )
                                        })}
                                      </Row>
                                    }
                                  </div>
                                </div>


                                <div className="row">
                                  <div className="col-md-12 mt-3 pt-3">
                                    <div className="form-group text-right">
                                      {!this.state.isLoading ? (
                                        <span className="msedge-questions-start msedge-right-br mr-2">
                                          <button
                                            type="button"
                                            className="btn btn-outline-primary"
                                            onClick={this.saveData}
                                          >
                                            <li>
                                              <i className="pe-7s-download" aria-hidden="true"></i>
                                            </li>
                                      <li className="text-uppercase">{language.update}</li>
                                          </button>
                                        </span>
                                      ) : (
                                          <span className="msedge-questions-start msedge-right-br">
                                            <button
                                              className="btn btn-primary mr-2"
                                              type="button"
                                              disabled
                                            >
                                              <li>
                                                <span
                                                  className="spinner-border spinner-border-sm mr-2"
                                                  role="status"
                                                  aria-hidden="true"
                                                ></span>
                                              </li>
                                              <li className="text-uppercase">
                                                {language.buttonLoading}
                                                </li>
                                            </button>
                                          </span>
                                        )}
                                      <span className="msedge-questions-start msedge-right-br">
                                        <button
                                          type="button"
                                          className="btn btn-outline-primary"
                                          onClick={this.goBack}
                                        >
                                          <li>
                                            <i className="pe-7s-back" aria-hidden="true"></i>
                                          </li>
                                      <li className="text-uppercase">{language.close}</li>
                                        </button>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </ModalBody>
                          </Modal>
                        </div>
                      </div>
                    </div>
                  </Row>
                </Formsy>
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
    isLoading: state.main.isDataAdding
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      postData,
      currentState,
      updateData,
      redirectPath
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPracticeExam);
