import React, { Component, Fragment } from "react";
import { Button, Card, Col, Collapse, Row, CustomInput, UncontrolledTooltip, Modal, ModalHeader, ModalBody, Table } from "reactstrap";
import Formsy from "formsy-react";
//import { createHashHistory } from "history";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import swal from "sweetalert";
import { faPaperPlane, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { questions, timerChoosed, questionChoosed } from "../../../../../actions/actionMain";
import MyInput from "../../../../../components/proofReader/input/MyInput";
import { subjects as subjectData } from "../../../exams/practiceExam/components/subject.json";
import { instance, HASH_HISTORY } from "../../../../../actions/constants"
import { getSession } from '../../../../routes/routePaths'
import { regx } from "../../../../../utils/admin/Regx";
import {customPageTitle} from "../../../../../components/commonComponents/customPageTitle";
import {language} from "../../../../../utils/locale/locale"

//const hashHistory = createHashHistory();
class ChooseQuestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accordion: false,
      ownchoice: false,
      selectAll: false,
      subAccordion: [false, false, false, false, false, false, false],
      selectGroup: [],
      selectTopic: [],
      arrayTopics: [],
      canSubmit: false,
      cursorDisable: "",
      noOfQuestions: 30,
      load: false,
      subQsEntered: false,
      selectGroupIndex: [],
      selectTopiIndex: [],
      setPreferenceOptions: [true, false, true, true, false, false, false],
      selectGroupValues: subjectData.map(item => item.subjectName),
      selectedGroupIndex: subjectData.map(item => item.subjectId),
      selectTopicValues: subjectData.map(item => item.topics.map(topic => topic.name)),
      modal: false,
      responseData: [],
      inputsTotal: {},
      studentSession: getSession("StudentSession")
    };
  }

  componentDidMount() {
    customPageTitle("Questions") //Defines the page title
  }

  onSelectAllClick = () => { //Select all the subjects
    this.setState({
      selectAll: !this.state.selectAll,
      selectGroup: !this.state.selectAll
        ? [...this.state.selectGroupValues]
        : [],
      selectTopic: !this.state.selectAll
        ? [].concat(...this.state.selectTopicValues)
        : [],
      ownchoice: !this.state.ownchoice,
      selectGroupIndex: !this.state.selectAll
        ? [...this.state.selectedGroupIndex]
        : []
    });
  }

  onSelectgroup(data, subject, index, topics) {
    let { selectGroup, selectTopic, selectGroupIndex, selectTopiIndex } = this.state;
    selectGroup =
      selectGroup.length > 0 && selectGroup.includes(data)
        ? selectGroup.filter(item => item !== data)
        : [...selectGroup, data];

    selectGroupIndex =
      selectGroupIndex.length > 0 && selectGroupIndex.includes(subject)
        ? selectGroupIndex.filter(item => item !== subject)
        : [...selectGroupIndex, subject];

    var arrayNew = []
    topics.map((data, i) => {
      selectTopic =
        selectTopic.length > 0 && selectTopic.includes(data.name)
          ? selectTopic.filter(item => item !== data.name)
          : [...selectTopic, data.name];
      selectTopiIndex = selectTopiIndex.length > 0 && selectTopiIndex.includes(data.topicId)
        ? selectTopiIndex.filter(item => item !== data.topicId)
        : [...selectTopiIndex, data.topicId];
      return this.state.arrayTopics.push(data.name) && arrayNew.push(data.name)
    })


    selectGroup.includes(data) ? selectTopic = [...selectTopic, ...arrayNew] : selectTopic

    this.setState({
      ownchoice: true,
      selectAll: selectGroup.length === this.state.selectGroupValues.length,
      selectGroup: selectGroup,
      selectTopic: selectTopic,
      selectGroupIndex: selectGroupIndex,
      showtotalquestionHead: true,
      showtotalquestionHead: true,
      selectTopiIndex: selectTopiIndex
    });
  }

  onSelectTopic(topic, topicId, index, subjectName, currentitem, itemTopics) {
    let { selectTopic, selectGroup, selectTopiIndex, selectGroupIndex } = this.state;
    let selectedGroupVal = this.state.selectGroupValues[index];
    let selectGroupIndexSet = this.state.selectedGroupIndex[index]
    selectGroup =
      selectGroup.length > 0 && selectGroup.includes(selectedGroupVal)
        ? selectGroup.filter(item => item !== selectedGroupVal)
        : this.state.selectGroup;




    selectGroupIndex = selectGroupIndex.length > 0 && selectGroupIndex.includes(selectGroupIndexSet)
      ? selectGroupIndex.filter(item => item !== selectGroupIndexSet)
      : this.state.selectGroupIndex;


    selectTopic =
      selectTopic.length > 0 && selectTopic.includes(topic)
        ? selectTopic.filter(item => item !== topic)
        : [...selectTopic, topic];

    selectTopiIndex =
      selectTopiIndex.length > 0 && selectTopiIndex.includes(topicId)
        ? selectTopiIndex.filter(item => item !== topicId)
        : [...selectTopiIndex, topicId];

    var index = selectGroup.indexOf(`${subjectName}`);
    if (index > -1) {
      selectGroup.splice(index, 1);
    }

    var topicarray = []
    itemTopics.map((topicind, i) => {
      topicarray.push(topicind.topicId)
    })
    let checker = (arr, target) => target.every(v => arr.includes(v));

    checker(selectTopiIndex, topicarray) ? selectGroup.push(subjectName) && selectGroupIndex.push(selectGroupIndexSet) : null

    this.setState({
      selectAll: false,
      selectTopic: selectTopic,
      selectGroup: selectGroup,
      ownchoice: true,
      showtotalquestionHead: false,
      selectTopiIndex: selectTopiIndex,
      selectGroupIndex: selectGroupIndex
    });
  }
  toggleAccordion = (index) => {
    const prevState = this.state.subAccordion;
    const state = prevState.map((x, i) => (index === i ? !x : false));
    this.setState({ subAccordion: state })
  }

  ownChoice = () => {
    this.setState({
      ownchoice: !this.state.ownchoice
    });
  };

  submit = model => { //API call
    const { selectTopiIndex, studentSession } = this.state;

    var set1 = []
    var set2 = []
    var set3 = []
    var set4 = []
    var set5 = []
    var set6 = []
    var set7 = []
    selectTopiIndex.map((data, index) => {
      if (data.toString()[0] === '1') {
        set1.push(data)
      } else if (data.toString()[0] === '2') {
        set2.push(data)
      } else if (data.toString()[0] === '3') {
        set3.push(data)
      } else if (data.toString()[0] === '4') {
        set4.push(data)
      } else if (data.toString()[0] === '5') {
        set5.push(data)
      } else if (data.toString()[0] === '6') {
        set6.push(data)
      } else if (data.toString()[0] === '7') {
        set7.push(data)
      }
    })

    const checkALLisUndefined = model.sub
      ? Object.entries(model.sub).map(([key, value]) => {
        return value
      }) : []

    var checkValueEntered = checkALLisUndefined.some(function (el) {
      return el >= 1;
    });

    const conditionMap = model.sub
      ? Object.entries(model.sub).map(([key, value]) => {

        var valueF = value === undefined ? 0 : value;
        var finalData = key + "-" + valueF;
        var res = finalData.split("-");
        if (res[1] === '1') {
          var result = set1.length > 0 ? res.concat(set1.toString()) : res
        } else if (res[1] === '2') {
          var result = set2.length > 0 ? res.concat(set2.toString()) : res
        } else if (res[1] === '3') {
          var result = set3.length > 0 ? res.concat(set3.toString()) : res
        } else if (res[1] === '4') {
          var result = set4.length > 0 ? res.concat(set4.toString()) : res
        } else if (res[1] === '5') {
          var result = set5.length > 0 ? res.concat(set5.toString()) : res
        } else if (res[1] === '6') {
          var result = set6.length > 0 ? res.concat(set6.toString()) : res
        } else if (res[1] === '7') {
          var result = set7.length > 0 ? res.concat(set7.toString()) : res
        }
        return result;

      }) : []

    var filtered = conditionMap.filter(function (el) {
      return el != null;
    });

    const arrayCondition =
      filtered === null
        ? null
        : filtered.map((col, index) => {
          return col;
        });
    const arrayMap =
      arrayCondition === null
        ? null
        : arrayCondition.map((array, index) => {
          const indexdata = `condition${index}`;
          const condtions = {
            [indexdata]: array
          };
          return condtions;
        });


    var choiceSet = this.state.ownchoice === false ? false : true;
    const data =
      choiceSet === false
        ? JSON.stringify({
          questionTimer: this.state.setPreferenceOptions[0] ? 1 : 0,
          excludePreCreated: this.state.setPreferenceOptions[2] ? 1 : 0,
          randomiseQuestion: this.state.setPreferenceOptions[3] ? 1 : 0,
          flagged: this.state.setPreferenceOptions[4] ? 1 : 0,
          incorrectQuestion: this.state.setPreferenceOptions[5] ? 1 : 0,
          correctQuestion: this.state.setPreferenceOptions[6] ? 1 : 0,
          examTakenBy: studentSession.userStudentID,
          ownChoice: 0,
          numberOfQuestions: model.noOfQuestions
        })

        : checkValueEntered ?
          JSON.stringify({
            questionTimer: this.state.setPreferenceOptions[0] ? 1 : 0,
            excludePreCreated: this.state.setPreferenceOptions[2] ? 1 : 0,
            randomiseQuestion: this.state.setPreferenceOptions[3] ? 1 : 0,
            flagged: this.state.setPreferenceOptions[4] ? 1 : 0,
            incorrectQuestion: this.state.setPreferenceOptions[5] ? 1 : 0,
            correctQuestion: this.state.setPreferenceOptions[6] ? 1 : 0,
            examTakenBy: studentSession.userStudentID,
            ownChoice: 1,
            questionDetails: arrayMap,
          })
          : JSON.stringify({
            questionTimer: this.state.setPreferenceOptions[0] ? 1 : 0,
            excludePreCreated: this.state.setPreferenceOptions[2] ? 1 : 0,
            randomiseQuestion: this.state.setPreferenceOptions[3] ? 1 : 0,
            flagged: this.state.setPreferenceOptions[4] ? 1 : 0,
            incorrectQuestion: this.state.setPreferenceOptions[5] ? 1 : 0,
            correctQuestion: this.state.setPreferenceOptions[6] ? 1 : 0,
            examTakenBy: studentSession.userStudentID,
            questionDetails: arrayMap,
            numberOfQuestions: model.noOfQuestions,
            ownChoice: 1,
          });

    this.setState({ load: true });
    instance.put(`students/${studentSession.userStudentID}/questions/subjectandtopic`, data, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,        
      }
    })

      .then(response => {
        this.setState({ load: false });
        return response;
      })

      .then(result => {
        if (result.data.data.questions == [] || result.data.data.questions == null || result.data.data.questions == "") {
          swal(
            language.noQuestions,
            language.noQuestionsMsg,
            "warning"
          );
        } else {

          if (result.data.data.ownChoice == null) {
            this.props.questions(result.data.data.questions);
            this.props.timerChoosed(this.state.setPreferenceOptions[0])
            this.props.questionChoosed(this.state.setPreferenceOptions[1])
            // this.props.choosenPreferences(
            //   this.state.setPreferenceOptions[0],
            //   this.state.setPreferenceOptions[1]
            // );
            HASH_HISTORY.push("/students/question-answers");
          }

          else {
            let createArray = []
            createArray.push(result.data.data)
            this.setState({ responseData: createArray })
            this.toggleModal()
          }

        }
      })
      .catch(error => {
        this.setState({ load: false })
        swal(language.oops, language.errorOnExam, "error");
      });
  };

  moveToQuestions = () => {
    let questions = this.state.responseData
    this.props.questions(questions[0].questions);

    this.props.timerChoosed(this.state.setPreferenceOptions[0])
    this.props.questionChoosed(this.state.setPreferenceOptions[1])
    // this.props.choosenPreferences(
    //   this.state.setPreferenceOptions[0],
    //   this.state.setPreferenceOptions[1]
    // );
    HASH_HISTORY.push("/students/question-answers");
  }

  disableButton = () => {
    this.setState({ canSubmit: false, cursorDisable: "not-allowed" });
  };

  enableButton = () => {
    this.setState({ canSubmit: true, cursorDisable: "" });
  };

  formsyHandle = inputs => { //Onchange event of the input fields

    this.setState({
      inputsTotal: inputs
    })

    var sum = Object.entries(inputs)
      .slice(3, inputs.length)
      .map(entry => entry[1]);
    var allUndefined = sum.every(x => (x === undefined) || (x === " "));
    if (allUndefined) {
      this.setState({
        subQsEntered: false,

      })
    } else {
      var checkempty = sum.includes(undefined);
      var result = sum.filter(item => item === "").length === 0
      if (checkempty || !result) {
        this.disableButton();
        this.setState({
          subQsEntered: false,
          cursorDisable: "not-allowed",
          inputsTotal: inputs
        })
      } else {
        this.setState({
          subQsEntered: true,

        })
      }
    }

    if (
      typeof this.state.selectGroup !== "undefined" &&
      this.state.selectGroup.length > 0
    ) {
      var sum = Object.entries(inputs)
        .slice(3, inputs.length)
        .map(entry => entry[1]);
      var res = sum.map(v => parseInt(v, 10));
      var totalQuestions = res.reduce((a, b) => a + b, 0);
      var reg = /^\d+$/;
      var RegCheck = reg.test(totalQuestions);
      if (RegCheck === true) {
        var value = Math.round(totalQuestions * 1.8);

        this.setState({
          calcTime: value
        });
      } else {
        this.setState({
          calcTime: this.state.calcTime
        });
      }
    } else if (
      typeof this.state.selectTopic !== "undefined" &&
      this.state.selectTopic.length > 0
    ) {
      var sum = Object.entries(inputs)
        .slice(3, inputs.length)
        .map(entry => entry[1]);
      var res = sum.map(v => parseInt(v, 10));
      var totalQuestions = res.reduce((a, b) => a + b, 0);
      var reg = /^\d+$/;
      var RegCheck = reg.test(totalQuestions);
      if (RegCheck === true) {
        var value = Math.round(totalQuestions * 1.8);
        this.setState({
          calcTime: value
        });
      } else {
        this.setState({
          calcTime: this.state.calcTime
        });
      }
    } else if (inputs.noqs != " ") {

      var reg = /^\d+$/;
      var RegCheck = reg.test(inputs.noq);
      if (RegCheck === true) {
        var value = Math.round(inputs.noq * 1.8);
        this.setState({
          calcTime: value,
          disableButton: true,
          canSubmit : false
        });
      } else {
        this.setState({
          calcTime: 0
        });
      }
    }
  };

  setPreferenceOptions = index => { //Onchange event of the checkbox fields
    let checked = this.state.setPreferenceOptions;
    checked[index] = !checked[index];
    this.setState({ setPreferenceOptions: checked });
  };

  toggleModal = () => {
    this.setState(prevState => ({
      modal: !prevState.modal,
      selectGroupIndex: [],
      selectTopiIndex: [],
      selectGroup: [],
      selectTopic: [],
      arrayTopics: [],
      ownchoice: false,
      selectAll: false
    }))
  }

  closeModal=()=>{
    this.setState(prevState => ({
      modal: false,
      selectGroupIndex: [],
      selectTopiIndex: [],
      selectGroup: [],
      selectTopic: [],
      arrayTopics: [],
      ownchoice: false,
      selectAll: false
    }))
  }
  objSlice = (obj, lastExclusive) => {
    var filteredKeys = Object.keys(obj).slice(1, lastExclusive);
    var newObj = {};
    filteredKeys.forEach(function (key) {
      newObj[key] = obj[key];
    });
    return newObj;
  }
  removeEmpty = (obj) => {
    Object.keys(obj).forEach(key => {
      if (obj[key] && typeof obj[key] === 'object') removeEmpty(obj[key]);
      else if (obj[key] === undefined || obj[key] === "") delete obj[key];
    });
    return obj;
  };


  render() {
    var newObj = this.objSlice(this.state.inputsTotal, this.state.inputsTotal.length);
    const filtered = this.removeEmpty(newObj)
    var checksum = Object.entries(filtered).map(entry => entry[0]);
    var splitPush = []
    checksum.map((data, index) => {
      const dataset = data.split('.')
      const secondSelect = dataset[1].split('-')
      splitPush.push(secondSelect[1])
    })
    var arrayOfNumbers = splitPush.map(Number);
    let checker = (arr, target) => target.every(v => arr.includes(v));
    const checkIfTrueForSubject = arrayOfNumbers.length > 0 ? checker(arrayOfNumbers, this.state.selectGroupIndex) : true

    return (
      <div className="msedge-ques-subject-topics msedge-practice-exam-custom">
        <ReactCSSTransitionGroup
          component="div"
          transitionName="TabsAnimation"
          transitionAppear={true}
          transitionAppearTimeout={0}
          transitionEnter={false}
          transitionLeave={false}
        >
          <Formsy
            onValidSubmit={this.submit}
            onValid={this.enableButton}
            onInvalid={this.disableButton}
            onChange={this.formsyHandle}
          >
            <Row className="pt-2 pb-4">
              <Col md="6" className="msedge-set-preference">
                <h2 className="mt-2">{language.set_preference}</h2>
              </Col>

              <Col md="6">
                {!this.state.load ?
                  <div className="msedge-questions-start mb-0">
                    <Button
                      type="submit"
                      className="btn"
                      disabled={this.state.canSubmit && !checkIfTrueForSubject}
                      style={{
                        cursor: this.state.cursorDisable
                      }}
                    >
                      <li>
                        <FontAwesomeIcon icon={faPaperPlane} size="1x" />
                      </li>
                      <li>{language.start}</li>
                    </Button>
                  </div> :

                  <span className="msedge-questions-start msedge-right-br">
                    <button className="btn btn-primary mr-2 py-1" type="button" disabled>
                      <li>
                        <span
                          className="spinner-border spinner-border-sm mr-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      </li>
                      <li className="text-uppercase">{language.buttonLoading}</li>
                    </button>
                  </span>}

              </Col>
            </Row>

            <div>
              <Card className="subject-accord pb-0 Collapsible">
                <Col id="headingOne" className="msedge-questions-remove-cursor">
                  <div>
                    <Col
                      md="12"
                      sm="12"
                      xl="12"
                      xs="12"
                      lg="12"
                    >
                      <Row>
                        <Col md="6">
                          <div className="form-group">
                            <h3 className="msedge-students-alter-heading-font">
                              # {language.of_questions_1}
                              </h3>
                            <MyInput
                              id="noOfQuestions"
                              name="noOfQuestions"
                              type="text"
                              fieldName={"No of Questions"}
                              value={this.state.noOfQuestions}
                              className="form-control"
                              validations={{
                                // isInt: regx.nos,
                                matchRegexp : regx.questionMorethan2000
                              }}
                              validationErrors={{
                                // isInt: "please enter valid numbers",
                                matchRegexp : 'Please enter valid numbers & below 2000 only'
                              }}
                              required={
                                this.state.ownchoice === true ? false : true
                              }
                              disabled={
                                this.state.ownchoice === true ? true : false
                              }
                            />
                          </div>
                        </Col>

                        <Col md="6" className="pt-4"></Col>
                      </Row>

                      <Row>
                        <Col md="12" sm="12" xl="6" xs="12" lg="6">
                          <CustomInput
                            type="checkbox"
                            id={0}
                            label={
                              <h3 className="msedge-students-alter-heading-font">
                                {language.timer}
                                </h3>
                            }
                            checked={
                              this.state.setPreferenceOptions[0] === true
                                ? true
                                : false
                            }
                            onClick={() => this.setPreferenceOptions(0)}
                          />

                          <CustomInput
                            type="checkbox"
                            id={1}
                            label={
                              <h3 className="msedge-students-alter-heading-font">
                               {language.Show_question_number}
                                </h3>
                            }
                            className="pt-3"
                            checked={
                              this.state.setPreferenceOptions[1] === true
                                ? true
                                : false
                            }
                            onClick={() => this.setPreferenceOptions(1)}
                          />

                          <CustomInput
                            type="checkbox"
                            id={2}
                            label={
                              <h3 className="msedge-students-alter-heading-font">
                                {language.Exclude_questions}
                                </h3>
                            }
                            className="py-3"
                            checked={
                              this.state.setPreferenceOptions[2] === true
                                ? true
                                : false
                            }
                            onClick={() => this.setPreferenceOptions(2)}
                          />

                          <CustomInput
                            type="checkbox"
                            id={3}
                            label={
                              <h3 className="msedge-students-alter-heading-font">
                                {language.randomize}
                                </h3>
                            }
                            checked={
                              this.state.setPreferenceOptions[3] === true
                                ? true
                                : false
                            }
                            onClick={() => this.setPreferenceOptions(3)}
                          />
                        </Col>

                        <Col md="12" sm="12" xl="6" xs="12" lg="6">
                          <h3 className="msedge-students-alter-heading-font">
                            {language.include_prev}
                            </h3>

                          <CustomInput
                            type="checkbox"
                            id={4}
                            label={
                              <h3 className="msedge-students-alter-heading-font">
                                {language.flagged_ques}
                                </h3>
                            }
                            className="mt-3"
                            onClick={() => this.setPreferenceOptions(4)}
                          />

                          <CustomInput
                            type="checkbox"
                            id={5}
                            label={
                              <h3 className="msedge-students-alter-heading-font">
                                {language.incorrect_ques}
                                </h3>
                            }
                            className="py-3"
                            onClick={() => this.setPreferenceOptions(5)}
                          />

                          <CustomInput
                            type="checkbox"
                            id={6}
                            label={
                              <h3 className="msedge-students-alter-heading-font">
                                {language.correct_ques}
                                </h3>
                            }
                            onClick={() => this.setPreferenceOptions(6)}
                          />
                        </Col>
                      </Row>
                    </Col>
                  </div>
                </Col>

                <div className=" pt-4">
                  <Card className="subject-accord">
                    <Col id="headingOne">
                      <Col xs="12" sm="12" md="12" lg="12" xl="12">
                        <Row>
                          <Col xs="9" sm="9" md="10" lg="8" xl="8">
                            <h2 className="mb-4">
                              {language.choose_specific}
                              </h2>
                          </Col>
                          <Col xs="3" sm="3" md="2" lg="4" xl="4">
                            <Col
                              xs="12"
                              sm="12"
                              md="12"
                              lg="12"
                              xl="12"
                              className="question-selection"
                            >
                              <Row>
                                <Col
                                  xs="4"
                                  sm="4"
                                  md="4"
                                  lg="4"
                                  xl="4"
                                  style={{ marginLeft: "50%" }}
                                ></Col>
                              </Row>
                            </Col>
                          </Col>
                        </Row>
                      </Col>

                      <div className="msedge-exam-toggle-sec Collapsible">
                        <Row>
                          <Col md="5" className="msedge-question-select-all">
                            <div className="msedge-flex space-bet pt-2 pb-3 msedge-examcustom-timer msedge-questions-topics-list-segment">
                              <CustomInput
                                type="checkbox"
                                id="select-all"
                                className={this.state.selectAll ? `unselected-checkbox` : this.state.selectGroupValues.some(
                                  r => this.state.selectGroup.indexOf(r) >= 0) ? `checkbox-designclass` : [].concat(...this.state.selectTopicValues).some(
                                    r => this.state.selectTopic.indexOf(r) >= 0) ? `checkbox-designclass` : `unselected-checkbox`}
                                label={
                                  <h3 className="msedge-students-alter-heading-font">
                                    {language.select_all}
                                    </h3>
                                }
                                checked={this.state.selectAll}
                                onClick={this.onSelectAllClick}
                              />
                            </div>
                          </Col>

                          <Col md="5" className="msedge-question-select-all">
                            <label><h3 className="msedge-students-alter-heading-font mt-2 pl-3">View topics</h3></label>
                          </Col>

                          <Col md="2" className="pl-0">
                                  {this.state.selectGroup.length > 0 || this.state.selectTopic.length > 0 ? <h3 className="msedge-students-alter-heading-font">
                                    {language.no_of_ques}
                                  </h3> : ''}
                                  {!checkIfTrueForSubject ? <span className="error-color">{language.enter_all_selected_subject_count}</span> : ''}
                          </Col>
                        </Row>


                        <div>
                          {subjectData.map((item, index) => {
                            return (
                              <div className="accordion-container subject-accordian m-2">
                                <Card className="subject-accord">
                                  <Col>
                                    <div
                                      key={item.subjectName + index}
                                      className="text-left m-0 p-0 msedge-flex space-bet"
                                      aria-controls="collapseOne"
                                    >
                                      <Col md="12">
                                        <Row>
                                          <Col md="5" className="msedge-select-all">
                                            <Row>
                                              <CustomInput
                                                type="checkbox"
                                                className={this.state.selectAll ? `msedge-questions-set-preference-alter-checkbox unselected-checkbox${item.subjectId}` : this.state.selectGroup.includes(
                                                  item.subjectName
                                                ) ? `msedge-questions-set-preference-alter-checkbox unselected-checkbox${item.subjectId}` : item.topics.map((data, i) => data.name).some(r => this.state.selectTopic.indexOf(r) >= 0) ? `msedge-questions-set-preference-alter-checkbox checkbox-designclass` : `msedge-questions-set-preference-alter-checkbox unselected-checkbox${item.subjectId}`}
                                                id={`select-${item.subjectName}`}
                                                checked={
                                                  this.state.selectAll ||
                                                  this.state.selectGroup.includes(
                                                    item.subjectName
                                                  )
                                                }

                                                onClick={() => {
                                                  this.onSelectgroup(
                                                    item.subjectName,
                                                    item.subjectId,
                                                    index,
                                                    item.topics

                                                  );
                                                }}
                                              />
                                              <label onClick={() => {
                                                this.onSelectgroup(
                                                  item.subjectName,
                                                  item.subjectId,
                                                  index,
                                                  item.topics
                                                );
                                              }} className="msedge-students-alter-heading-font msedge-practiseexam-weight msedge-questions-cursor-pointer">{item.subjectName}</label>
                                            </Row>
                                          </Col>

                                          <Col md="5" className="msedge-view-topics">
                                            <span><i className={`${this.state.subAccordion[index] == true ? "pe-7s-angle-up-circle ml-5 msedge-questions-cursor-pointer msedge-questions-add-minus-icon" : "pe-7s-angle-down-circle ml-5 msedge-questions-cursor-pointer msedge-questions-add-minus-icon"}`} onClick={() => this.toggleAccordion(index)} /></span>
                                          </Col>

                                          <Col
                                            md="2"
                                            className="msedge-practise-custom"
                                          >

                                            {
                                              this.state.selectAll ||
                                                this.state.selectGroup.includes(
                                                  item.subjectName
                                                ) || item.topics.map((data, i) => data.name).some(r => this.state.selectTopic.indexOf(r) >= 0) ?

                                                <MyInput
                                                  id={item.subjectName}
                                                  name={`sub.1-${item.subjectId}`}
                                                  fieldName={"count"}
                                                  className="form-control"
                                                  validations={{
                                                    matchRegexp: regx.lessThan999,
                                                  }}
                                                  validationErrors={{
                                                    matchRegexp: "please enter valid numbers & greater than 0 / less than 999",
                                                  }}
                                                  isMandatory={true}
                                                /> : ''}
                                          </Col>
                                        </Row>
                                      </Col>
                                    </div>

                                    <Collapse
                                      isOpen={this.state.subAccordion[index]}
                                      data-parent="#accordion"
                                      id="collapseOne"
                                      aria-labelledby="collapseOne"
                                      className="subjects questions-select-all"
                                    >
                                      <section className="msedge-questions-topics-list-segment">
                                        {item.topics.map((topic, i) => {
                                          return (
                                            <Fragment key={i}>
                                              <Row className="mt-3">
                                                <Col md="10">
                                                  <div>
                                                    <CustomInput
                                                      type="checkbox"
                                                      className="msedge-questions-set-preference-alter-checkbox"
                                                      id={`select-${topic.name}`}
                                                      checked={this.state.selectTopic.includes(
                                                        topic.name
                                                      )}

                                                      label={
                                                        <h3 className="msedge-students-alter-heading-font msedge-students-questions-nowrap">
                                                          {" "}
                                                          {topic.name}
                                                          <span
                                                            className="msedge-student-info-icon"
                                                            id={
                                                              "Tooltip-" +
                                                              topic.id
                                                            }
                                                          >
                                                            <FontAwesomeIcon
                                                              icon={
                                                                faQuestionCircle
                                                              }
                                                            />
                                                          </span>
                                                          <UncontrolledTooltip
                                                            placement="right"
                                                            target={
                                                              "Tooltip-" +
                                                              topic.id
                                                            }
                                                          >
                                                            {
                                                              topic.tooltipText
                                                            }
                                                          </UncontrolledTooltip>
                                                        </h3>
                                                      }
                                                      onClick={() => {
                                                        this.onSelectTopic(
                                                          topic.name,
                                                          topic.topicId,
                                                          index,
                                                          item.subjectName,
                                                          topic,
                                                          item.topics
                                                        );
                                                      }}
                                                    />
                                                  </div>
                                                </Col>
                                                <Col
                                                  md="2"
                                                  className="msedge-practiseexam-select"
                                                >
                                                </Col>
                                              </Row>
                                            </Fragment>
                                          );
                                        })}
                                      </section>
                                    </Collapse>
                                  </Col>
                                </Card>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <Collapse
                        isOpen={this.state.ownchoice}
                        data-parent="#accordion"
                        id="collapseOne"
                        aria-labelledby="headingOne"
                        className="topics"
                      ></Collapse>
                    </Col>
                  </Card>
                </div>
              </Card>
            </div>
            <Col
              xs="12"
              sm="12"
              md="12"
              lg="12"
              xs="12"
              xl="12"
              className="text-right p-0  mb-2 mt-4"
            >
              <div className="form-group mb-0">

                {!this.state.load ?
                  <div className="msedge-questions-start mb-0">
                    <Button
                      type="submit"
                      className="btn"
                      disabled={this.state.canSubmit && !checkIfTrueForSubject}
                      style={{
                        cursor: this.state.cursorDisable
                      }}
                    >
                      <li>
                        <FontAwesomeIcon icon={faPaperPlane} size="1x" />
                      </li>
                      <li>{language.start}</li>
                    </Button>
                  </div> :

                  <span className="msedge-questions-start msedge-right-br">
                    <button className="btn btn-primary mr-2 py-1" type="button" disabled>
                      <li>
                        <span
                          className="spinner-border spinner-border-sm mr-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      </li>
                      <li className="text-uppercase">{language.buttonLoading}</li>
                    </button>
                  </span>}
              </div>

            </Col>
          </Formsy>
        </ReactCSSTransitionGroup>

        <Modal isOpen={this.state.modal} toggle={this.toggleModal} className='modal-center'>
          <ModalHeader toggle={this.toggleModal}>
            {language.insufficient_ques}
                            </ModalHeader>
          <ModalBody>
            <div>
              <Row className="justify-content-center">
                <Col md="12">

                  <h6 className="mb-3">{language.number_of_question }</h6>
                  {this.state.responseData.map((data, index) => {
                    return (
                      <div>
                        {data.ownChoice == 0 ?
                          data.requestedVSAvailable.map((requesteddata, i) => {
                            return (
                              <Col md="12">
                                <Row>
                                  <Col md="8" className="pl-0">
                                    <h6 className="">{language.Number_of_questions}</h6>
                                  </Col>
                                  <Col md="4">
                                    <h6 className="">{requesteddata.questionsRequested} {language.questions_small}</h6>
                                  </Col>

                                  <Col md="8" className="pl-0">
                                    <h6 className="">Available:</h6>
                                  </Col>
                                  <Col md="4">
                                    <h6 className="">{requesteddata.questionAvailable} {language.questions_small}</h6>
                                  </Col>
                                </Row>
                              </Col>)
                          })
                          :

                          <Table striped size="sm" className="text-center">
                            <thead>
                              <tr>
                                <th className="ant-table-content">{language.subjects}</th>
                                <th className="ant-table-content">{language.requested}</th>
                                <th className="ant-table-content">{language.available}</th>
                              </tr>
                            </thead>

                            <tbody>
                              {data.requestedVSAvailable.map((requesteddata, i) => {
                                return (
                                  <tr>
                                    <td className="text-left msedge-students-alter-heading-font ant-table-content">{requesteddata.subjectId == 1 ? "Civil procedure" :
                                      requesteddata.subjectId == 2 ? "Constitutional law" :
                                        requesteddata.subjectId == 3 ? "Contracts" :
                                          requesteddata.subjectId == 4 ? "Criminal law and procedure" :
                                            requesteddata.subjectId == 5 ? "Evidence" :
                                              requesteddata.subjectId == 6 ? "Real property" : "Torts"}</td>
                                    <td className="ant-table-content">{requesteddata.questionsRequested}</td>
                                    <td className="ant-table-content">{requesteddata.questionAvailable}</td>
                                  </tr>)
                              })}
                            </tbody>
                          </Table >}
                      </div>)
                  })}

                  <div className="row">
                    <div className="col-md-12 mt-3">
                      <div className="form-group text-right msedge-error-model">
                        <h6 className="mb-3 text-left">{language.Click_to_continue}</h6>
                        <button type="button" className="btn btn-outline-primary ques-submit-btn" onClick={this.closeModal}>
                          <li>
                            <i className="pe-7s-close-circle" aria-hidden="true"></i>
                          </li>
                          <li className="text-uppercase">{language.no}</li>
                        </button>
                        <button type="button" className="btn btn-outline-primary ml-2 ques-btn" onClick={this.moveToQuestions}>
                          <li>
                            <i className="pe-7s-check" aria-hidden="true"></i>
                          </li>
                          <li className="text-uppercase">{language.yes}</li>
                        </button>
                      </div>
                    </div>
                  </div>

                </Col>
              </Row>
            </div>
          </ModalBody>
        </Modal>

      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      questions,
      timerChoosed, 
      questionChoosed 
    },
    dispatch
  );
};
export default connect(
  null,
  mapDispatchToProps
)(ChooseQuestions);