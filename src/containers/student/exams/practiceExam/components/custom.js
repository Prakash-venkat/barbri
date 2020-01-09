import React, { Component, Fragment } from "react";
import {
  Button,
  Card,
  Col,
  Collapse,
  Row,
  CustomInput,
  UncontrolledTooltip,
  Modal,
  ModalBody, ModalHeader, Table
} from "reactstrap";
import Formsy from "formsy-react";
import Collapsible from "react-collapsible";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import swal from "sweetalert";
import {
  faPaperPlane,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  questions,
  questionChoosed,
  timerChoosed,
  enableKeyboard
} from "../../../../../actions/actionMain";
import MyInput from "../../../../../components/proofReader/input/MyInput";
import { regx } from "../../../../../utils/admin/Regx";
import { errors } from "../../../../../utils/admin/ErrorMessages";
import Loading from "../../../../../components/admin/loading";
import { instance } from '../../../../../actions/constants'
import { subjects as subjectData } from "./subject.json";
import { getSession } from "../../../../routes/routePaths";
import { language } from "../../../../../utils/locale/locale"
import { HASH_HISTORY } from '../../../../../actions/constants'
export class StepOne extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ownchoice: false,
      selectAll: false,
      subAccordion: [false, false, false, false, false, false, false],
      subjectSelec: [false, false, false, false, false, false, false],
      setPreferenceOptions: [true, false, true, true, false, false, false],
      selectGroup: [],
      selectTopic: [],
      arrayTopics: [],
      timer: true,
      subjectquestion: false,
      canSubmit: false,
      cursorDisable: "",
      examName: "Exam-" + moment(Date.now()).format("MM-DD-YYYY"),
      noqs: 10,
      load: false,
      showtotalquestionHead: false,
      calcTime: 15,
      showerror: false,
      subQsEntered: false,
      selectGroupIndex: [],
      selectTopiIndex: [],
      selectGroupValues: subjectData.map(item => item.subjectName),
      selectedGroupIndex: subjectData.map(item => item.subjectId),
      selectTopicValues: subjectData.map(item =>
        item.topics.map(topic => topic.name)
      ),
      modal: false,
      responseData: [],
      storedData: [],
      studentSession: getSession("StudentSession"),
      exceedError: false,
      timePerQuestion: 0,
      inputsTotal: {},
      zeroError: false,
      shortcutEnabled: true,
      loadingOnDelete: false
    };
    this.onSelectAllClick = this.onSelectAllClick.bind(this);
    this.onSelectgroup = this.onSelectgroup.bind(this);
    this.onSelectTopic = this.onSelectTopic.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.submit = this.submit.bind(this);
  }
  componentDidMount() {


    instance.get(`settings/${this.state.studentSession.userId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    })
      .then(res => {
        if (res.data.status === 'Success') {

          const settingsTime = res.data.data.settingsStandardQuestionAnswerTime == null ? 1.48 : res.data.data.settingsStandardQuestionAnswerTime

          var secondsone = settingsTime * 60000;

          var milliseconds = parseInt((secondsone % 1000) / 100),
            seconds = Math.floor((secondsone / 1000) % 60),
            minutes = Math.floor((secondsone / (1000 * 60)) % 60),
            hours = Math.floor((secondsone / (1000 * 60 * 60)) % 24);

          hours = (hours < 10) ? "0" + hours : hours;
          minutes = (minutes < 10) ? "0" + minutes : minutes;
          seconds = (seconds < 10) ? "0" + seconds : seconds;

          const calculateSec = seconds / 60.0;

          const timer = parseInt(minutes) + calculateSec;

          const minuteshous = minutes + "." + seconds;
          const parsefloat = parseFloat(timer)
          const timecalc = Math.round(15 * (parsefloat))

          const shortcut = res.data.data.settingsKeyboardShortcuts == null ? false : res.data.data.settingsKeyboardShortcuts == '0' ? false : res.data.data.settingsKeyboardShortcuts == '1' ? true : false
          this.props.enableKeyboard(shortcut)
          this.setState({
            timePerQuestion: parsefloat,
            calcTime: timecalc,
            noqs: Math.round(timecalc / parsefloat),
          })
        } else {
          this.setState({
            timePerQuestion: 1.48
          })
        }
      })
      .catch(err => {
        this.setState({
          timePerQuestion: 1.48
        })
      });
  }
  onSelectAllClick() {
    this.setState({
      selectAll: !this.state.selectAll,
      selectGroup: !this.state.selectAll
        ? [...this.state.selectGroupValues]
        : [],
      selectTopic: !this.state.selectAll
        ? [].concat(...this.state.selectTopicValues)
        : [],
      ownchoice: !this.state.ownchoice,
      showtotalquestionHead: !this.state.showtotalquestionHead,
      showerror: false,
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

  timer = () => {
    this.setState({
      timer: !this.state.timer
    });
  };

  subjectquestion = () => {
    this.setState({
      subjectquestion: !this.state.subjectquestion
    });
  };

  submit = model => {

    this.props.timerChoosed(this.state.setPreferenceOptions[0])
    this.props.questionChoosed(this.state.setPreferenceOptions[1])

    const { selectTopiIndex, studentSession } = this.state;

    var set1 = []
    var set2 = []
    var set3 = []
    var set4 = []
    var set5 = []
    var set6 = []
    var set7 = []
    selectTopiIndex.map((data, index) => {
      switch (data.toString()[0]) {
        case "1":
          set1.push(data)
          break;
        case "2":
          set2.push(data)
          break;
        case "3":
          set3.push(data)
          break;
        case "4":
          set4.push(data)
          break;
        case "5":
          set5.push(data)
          break;
        case "6":
          set6.push(data)
          break;
        case "7":
          set7.push(data)
          break;
        default:
          return null
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

    const date = Date.now();
    const date_final = moment(date).format("MM-DD-YYYY");
    var questionRound = Math.round(model.duration / this.state.timePerQuestion);
    var choiceSet = this.state.ownchoice === false ? false : true;
    const data =
      choiceSet === false
        ? JSON.stringify({
          examName: model.examname,
          examDuration:
            model.duration != ""
              ? model.duration
              : Math.round(questionRound * this.state.timePerQuestion),
          examTimer: this.state.setPreferenceOptions[0] ? 1 : 0,
          ownChoice: 0,
          numberOfQuestions:
            questionRound != ""
              ? questionRound
              : Math.round(questionRound / this.state.timePerQuestion),
          examTakenBy: studentSession.userStudentID,
          examType: 0,
          examStatus: 0,
          examTakenAt: date_final,
          randomiseQuestion: this.state.setPreferenceOptions[3] ? 1 : 0,
          excludePreCreated: this.state.setPreferenceOptions[2] ? 1 : 0,
          flagged: this.state.setPreferenceOptions[4] ? 1 : 0,
          correctQuestion: this.state.setPreferenceOptions[6] ? 1 : 0,
          incorrectQuestion: this.state.setPreferenceOptions[5] ? 1 : 0,
          timePerQuestion: parseFloat(this.state.timePerQuestion.toFixed(2))
        })
        : checkValueEntered ? JSON.stringify({
          examName: model.examname,
          examDuration:
            model.duration != "" ? model.duration : arrayMap.length * 5,
          examTimer: this.state.setPreferenceOptions[0] ? 1 : 0,
          ownChoice: 1,
          questionDetails: arrayMap,
          examTakenBy: studentSession.userStudentID,
          examType: 0,
          examStatus: 0,
          examTakenAt: date_final,
          randomiseQuestion: this.state.setPreferenceOptions[3] ? 1 : 0,
          excludePreCreated: this.state.setPreferenceOptions[2] ? 1 : 0,
          flagged: this.state.setPreferenceOptions[4] ? 1 : 0,
          correctQuestion: this.state.setPreferenceOptions[6] ? 1 : 0,
          incorrectQuestion: this.state.setPreferenceOptions[5] ? 1 : 0,
          timePerQuestion: parseFloat(this.state.timePerQuestion.toFixed(2))

        }) : JSON.stringify({
          examName: model.examname,
          examDuration:
            model.duration != "" ? model.duration : Math.round(model.noq * this.state.timePerQuestion),
          examTimer: this.state.setPreferenceOptions[0] ? 1 : 0,
          ownChoice: 1,
          numberOfQuestions: model.noq,
          questionDetails: arrayMap,
          examTakenBy: studentSession.userStudentID,
          examType: 0,
          examStatus: 0,
          examTakenAt: date_final,
          randomiseQuestion: this.state.setPreferenceOptions[3] ? 1 : 0,
          excludePreCreated: this.state.setPreferenceOptions[2] ? 1 : 0,
          flagged: this.state.setPreferenceOptions[4] ? 1 : 0,
          correctQuestion: this.state.setPreferenceOptions[6] ? 1 : 0,
          incorrectQuestion: this.state.setPreferenceOptions[5] ? 1 : 0,
          timePerQuestion: parseFloat(this.state.timePerQuestion.toFixed(2))

        });
    this.setState({
      load: true
    });
    instance
      .put(`students/${studentSession.userStudentID}/exams`, data, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      })
      .then(response => {
        this.setState({
          load: false
        });
        return response;
      })
      .then(response => {
        if (
          response.data.data == [] || response.data.data == null || response.data.data == ''
        ) {
          const datacheck = Math.round(15 * this.state.timePerQuestion)
          this.setState({
            calcTime: datacheck,
            noqs: Math.round(datacheck / this.state.timePerQuestion),
            selectGroupIndex: [],
            selectTopiIndex: [],
            selectGroup: [],
            selectTopic: [],
            arrayTopics: [],
          })
          swal(
            language.noQuestions,
            language.noQuestionsMsg,
            "warning"
          );
        } else {
          if (response.data.data.ownChoice == null) {
            this.props.questions(response.data.data.exam);
            this.props.timerChoosed(this.state.setPreferenceOptions[0])
            this.props.questionChoosed(this.state.setPreferenceOptions[1])
            HASH_HISTORY.push("/students/exam-question");
          }
          else {
            let createArray = []
            createArray.push(response.data.data)
            this.setState({ responseData: createArray, storedData: response.data.data.exam })
            this.toggleModal()
          }
        }
      })
      .catch(error => {

        const datacheck = Math.round(15 * this.state.timePerQuestion)
        this.setState({
          load: false,
          calcTime: datacheck,
          noqs: Math.round(datacheck / this.state.timePerQuestion),
          selectGroupIndex: [],
          selectTopiIndex: [],
          selectGroup: [],
          selectTopic: [],
          arrayTopics: [],
        })
        swal(
          language.oops,
          language.errorOnExam,
          "error"
        );
      });


  };

  disableButton = () => {
    this.setState({ canSubmit: false, cursorDisable: "not-allowed" });
  };

  enableButton = () => {
    this.setState({ canSubmit: true, cursorDisable: "" });
  };

  formsyHandle = inputs => {


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
        showerror: false,

      })
    } else {
      var checkempty = sum.includes(undefined);
      var result = sum.filter(item => item === " ").length === 0
      if (checkempty || !result) {

        this.disableButton();
        this.setState({
          subQsEntered: false,
          showerror: true,
          cursorDisable: "not-allowed",
          inputsTotal: inputs
        })
      } else {
        this.enableButton();
        this.setState({
          subQsEntered: true,
          showerror: false,

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
        var value = Math.round(totalQuestions * this.state.timePerQuestion);
        var timeValue = Math.round(totalQuestions / this.state.timePerQuestion)
        this.setState({
          calcTime: value,
          ownChoice: true
          // noqs: timeValue
        });
      } else {
        this.setState({
          calcTime: this.state.calcTime,
          // noqs: this.state.noqs
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
        var value = Math.round(totalQuestions * this.state.timePerQuestion);
        var timeValue = Math.round(totalQuestions / this.state.timePerQuestion)

        this.setState({
          calcTime: value,
          // noqs: timeValue,
          ownChoice: true

        });
      } else {
        this.setState({
          calcTime: this.state.calcTime,
          // noqs: this.state.noqs

        });
      }
    } else {

      if (inputs.noq != '') {

        const dataTrue = this.state.selectAll ? true : this.state.selectGroupValues.some(
          r => this.state.selectGroup.indexOf(r) >= 0) ? true : [].concat(...this.state.selectTopicValues).some(
            r => this.state.selectTopic.indexOf(r) >= 0) ? true : false

        if (dataTrue == false) {

          var reg = /^\d+$/;
          var RegCheck = reg.test(inputs.noq);
          if (RegCheck === true) {
            var value = Math.round(inputs.noq * this.state.timePerQuestion);
            var timediv = Math.round(value / this.state.timePerQuestion);

            if (timediv > 2000) {
              this.setState({
                exceedError: true,
                disableButton: true,
                canSubmit: false,
                // ownChoice : true
              })
            } else {
              this.setState({
                calcTime: value,
                noqs: timediv
              });
            }


          }

        } else {
          var reg = /^\d+$/;
          var RegCheck = reg.test(inputs.noq);
          if (RegCheck === true) {
            var value = Math.round(this.state.noqs * this.state.timePerQuestion);
            var timediv = Math.round(value / this.state.timePerQuestion);

            if (timediv > 2000) {
              this.setState({
                exceedError: true,
                disableButton: true,
                canSubmit: false,
                // ownChoice : true
              })
            } else {
              this.setState({
                calcTime: value,
                noqs: timediv
              });
            }

          }
        }

      } else {
        this.setState({
          calcTime: 0,
          noqs: 0
        });
      }
      if ((inputs.duration).toString() != '') {

        const dataTrue = this.state.selectAll ? true : this.state.selectGroupValues.some(
          r => this.state.selectGroup.indexOf(r) >= 0) ? true : [].concat(...this.state.selectTopicValues).some(
            r => this.state.selectTopic.indexOf(r) >= 0) ? true : false

        if (dataTrue == false) {
          var reg = /^\d+$/;
          var RegCheck = reg.test(inputs.duration);
          if (RegCheck === true) {
            var timevalue = Math.round(inputs.duration / this.state.timePerQuestion);
            var checkduration = Math.round(timevalue * this.state.timePerQuestion);

            this.setState({
              noqs: timevalue,
              duration: checkduration
            });
          }
        } else {
          var reg = /^\d+$/;
          var RegCheck = reg.test(inputs.duration);
          if (RegCheck === true) {
            var timevalue = Math.round(this.state.duration / this.state.timePerQuestion);
            var checkduration = Math.round(timevalue * this.state.timePerQuestion);

            this.setState({
              noqs: timevalue,
              duration: checkduration
            });
          }
        }




      } else {
        this.setState({
          calcTime: 0,
          noqs: 0
        });
      }
    }
  };

  arraysEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length)
      return false;
    for (var i = arr1.length; i--;) {
      if (arr1[i] !== arr2[i])
        return false;
    }

    return true;
  }
  moveToQuestions = () => {
    this.props.questions(this.state.storedData);
    this.forceUpdate();
    HASH_HISTORY.push("/students/exam-question");
  }

  setPreferenceOptions = index => {
    let checked = this.state.setPreferenceOptions;
    checked[index] = !checked[index];
    this.setState(
      { setPreferenceOptions: checked },
    );
  };
  cancelCreatedExam = () => {
    const datacheck = Math.round(15 * this.state.timePerQuestion)

    this.setState({
      calcTime: datacheck,
      noqs: Math.round(datacheck / this.state.timePerQuestion),
      selectGroupIndex: [],
      selectTopiIndex: [],
      selectGroup: [],
      selectTopic: [],
      arrayTopics: [],
      loadingOnDelete: true
    })
    instance.delete(`exams/${this.state.storedData.examId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    })
      .then(response => {
        return response;
      })
      .then(response => {
        this.setState({ loadingOnDelete: false })
        this.toggleModal()
      })
      .catch(error => {
        this.setState({ loadingOnDelete: false })
        this.toggleModal()
      });
  }

  toggleModal = () => {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }))
  }


  removeEmpty = (obj) => {
    Object.keys(obj).forEach(key => {
      if (obj[key] && typeof obj[key] === 'object') removeEmpty(obj[key]);
      else if (obj[key] === undefined || obj[key] === "") delete obj[key];
    });
    return obj;
  };

  objSlice = (obj, lastExclusive) => {
    var filteredKeys = Object.keys(obj).slice(3, lastExclusive);
    var newObj = {};
    filteredKeys.forEach(function (key) {
      newObj[key] = obj[key];
    });
    return newObj;
  }

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
        {this.state.load === true ? (
          <Loading />
        ) : (

            <Formsy
              onValidSubmit={this.submit}
              onValid={this.enableButton}
              onInvalid={this.disableButton}
              onChange={this.formsyHandle}
            >
              <Row className="mb-4">
                <Col md="6" className="msedge-set-pref-justify">
                  <h2 className="">{language.set_preference}</h2>
                </Col>
                <Col md="6">

                  <div className="msedge-questions-start">
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
                  </div>
                </Col>
              </Row>

              <Collapsible open={true}>
                <Col>
                  <Row>
                    <Col md="6">
                      <div className="form-group">
                        <h3
                          htmlFor="examname"
                          className="msedge-students-alter-heading-font"
                        >
                          {language.exam_name}<abbr className="text-danger">*</abbr>
                        </h3>
                        <MyInput
                          id="examname"
                          name="examname"
                          type="text"
                          fieldName={language.exam_name}
                          className="form-control"
                          value={this.state.examName}
                          validations="maxLength:25"
                          validationError="Please enter less than 25 character "
                          required
                          isMandatory={true}
                        />
                      </div>
                      <div className="form-group mb-0">
                        <h3
                          htmlFor="duration mt-3"
                          className="msedge-students-alter-heading-font"
                        >
                          {language.exam_duration}
                        </h3>

                        <MyInput
                          id="duration"
                          name="duration"
                          type="text"
                          fieldName={"Exam Duration"}
                          value={this.state.calcTime}
                          className="form-control"
                          validations={{
                            matchRegexp: regx.nos,
                          }}
                          validationErrors={{
                            matchRegexp: "please enter valid numbers",
                          }}
                          isMandatory={true}
                        />
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="form-group mb-0">
                        <h3
                          htmlFor="noq"
                          className="msedge-students-alter-heading-font"
                        >
                          {language.no_of_ques}
                        </h3>
                        <MyInput
                          id="noq"
                          name="noq"
                          type="text"
                          fieldName={language.no_of_ques}
                          className="form-control"
                          value={this.state.selectAll ? 15 : this.state.selectGroupValues.some(
                            r => this.state.selectGroup.indexOf(r) >= 0) ? 15 : [].concat(...this.state.selectTopicValues).some(
                              r => this.state.selectTopic.indexOf(r) >= 0) ? 15 : this.state.noqs}
                          validations={{
                            // isInt: regx.greaterthanZero,
                            matchRegexp: regx.questionMorethan2000
                          }}
                          validationErrors={{
                            // isInt: "please enter valid numbers",
                            matchRegexp : 'Please enter valid numbers & below 2000 only'
                          }}
                          isDisable={this.state.selectAll ? true : this.state.selectGroupValues.some(
                            r => this.state.selectGroup.indexOf(r) >= 0) ? true : [].concat(...this.state.selectTopicValues).some(
                              r => this.state.selectTopic.indexOf(r) >= 0) ? true : false}
                        />
                      </div>
                    </Col>

                    <Col md="12" className="mt-4 msedge-questions-remove-cursor">
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
                                {language.show_no_of_quest}
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
                                {language.exclude_pre}
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

                    <Col className="mt-2 p-3">
                      <div className="">
                        <Col md="12 p-0">
                          <h2 className="pb-3">
                            {language.choose_specific}
                          </h2>
                        </Col>
                        <div className="Collapsible ">
                          <div className="msedge-flex space-bet pl-2 pt-2 pb-2 msedge-examcustom-timer msedge-questions-topics-list-segment">
                            <Col md="12" className="p-0">
                              <Row>
                                <Col md="5" className="msedge-question-select-all">
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
                                </Col>

                                <Col md="5" className="msedge-question-select-all">
                                  <label><h3 className="msedge-students-alter-heading-font pl-3">{language.view_topics}</h3></label>
                                </Col>
                                <Col md="2" className="pl-0">
                                  {this.state.selectGroup.length > 0 || this.state.selectTopic.length > 0 ? <h3 className="msedge-students-alter-heading-font">
                                    {language.no_of_ques}
                                  </h3> : ''}
                                  {!checkIfTrueForSubject ? <span className="error-color">{language.enter_all_selected_subject_count}</span> : ''}
                                </Col>
                              </Row>
                            </Col>

                          </div>
                          {subjectData.map((item, index) => {
                            return (
                              <div className="accordion-container subject-accordian m-2 ">
                                <Card className="subject-accord">
                                  <Col className="">
                                    <div
                                      key={item.subjectName + index}
                                      className="text-left m-0 p-0 msedge-flex space-bet"
                                      aria-controls="collapseOne"
                                    >
                                      <Col md="12" className="">
                                        <Row className="">
                                          <Col md="5" className="msedge-select-all">
                                            <Row>

                                              <CustomInput
                                                type="checkbox"
                                                checked={
                                                  this.state.selectAll ||
                                                  this.state.selectGroup.includes(
                                                    item.subjectName
                                                  )
                                                }
                                                id={`unselected-checkbox${item.subjectId}`}
                                                className={this.state.selectAll ? `unselected-checkbox${item.subjectId}` : this.state.selectGroup.includes(
                                                  item.subjectName
                                                ) ? `unselected-checkbox${item.subjectId}` : item.topics.map((data, i) => data.name).some(r => this.state.selectTopic.indexOf(r) >= 0) ? `checkbox-designclass` : `unselected-checkbox${item.subjectId}`}
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
                                              }} className={`msedge-students-alter-heading-font msedge-practiseexam-weight msedge-questions-cursor-pointer`}>{item.subjectName}</label>
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
                                                /> : ''

                                            }


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
                                              <Row className=" mt-3">
                                                <Col md="10" className="">

                                                  <CustomInput
                                                    type="checkbox"
                                                    id={`select-${topic.name}`}
                                                    checked={this.state.selectTopic.includes(
                                                      topic.name
                                                    )}
                                                    ref={`checked${topic.topicId}`}
                                                    label={
                                                      <h3 className="m-0 p-0 msedge-students-alter-heading-font msedge-students-questions-nowrap">
                                                        {topic.name}
                                                        <span
                                                          className="msedge-student-info-icon"
                                                          id={
                                                            "Tooltip-" + topic.id
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
                                                          className="react-tooltip-question"
                                                          target={
                                                            "Tooltip-" + topic.id
                                                          }
                                                        >
                                                          {topic.tooltipText}
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
                    </Col>
                  </Row>
                </Col>
              </Collapsible>

              <Col
                xs="12"
                sm="12"
                md="12"
                lg="12"
                xs="12"
                xl="12"
                className="text-right p-0 mt-4"
              >
                <div className="form-group">
                  <div className="msedge-questions-start">
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
                  </div>
                </div>
              </Col>
            </Formsy>
          )}
        <Modal isOpen={this.state.modal} toggle={this.toggleModal} className='modal-center'>
          <ModalHeader toggle={this.toggleModal}>
            {language.insufficient_ques}
          </ModalHeader>
          <ModalBody>
            <div>
              <Row className="justify-content-center">
                <Col md="12">

                  <h6 className="mb-3">{language.custom_modal_header}</h6>
                  {this.state.responseData.map((data, index) => {
                    return (
                      <div>
                        {data.ownChoice == 0 ?
                          data.requestedVSAvailable.map((requesteddata, i) => {
                            return (
                              <Col md="12">
                                <Row>
                                  <Col md="8" className="pl-0">
                                    <h6 className="msedge-questions-request-modal-topics">{language.no_of_ques_requested} : </h6>
                                  </Col>
                                  <Col md="4">
                                    <span className="msedge-questions-request-modal-available-answers">{requesteddata.questionsRequested} questions</span>
                                  </Col>

                                  <Col md="8" className="pl-0">
                                    <h6 className="msedge-questions-request-modal-topics">{language.available}:</h6>
                                  </Col>
                                  <Col md="4">
                                    <span className="msedge-questions-request-modal-available-answers">{requesteddata.questionAvailable} questions</span>
                                  </Col>
                                </Row>
                              </Col>)
                          })
                          :

                          <Table striped size="sm" className="text-center">
                            <thead>
                              <tr>
                                <th>{language.subjects}</th>
                                <th>{language.requested}</th>
                                <th>{language.available}</th>
                              </tr>
                            </thead>

                            <tbody>
                              {data.requestedVSAvailable.map((requesteddata, i) => {
                                return (
                                  <tr>
                                    <td className="text-left">{requesteddata.subjectId == 1 ? "Civil procedure" :
                                      requesteddata.subjectId == 2 ? "Constitutional law" :
                                        requesteddata.subjectId == 3 ? "Contracts" :
                                          requesteddata.subjectId == 4 ? "Criminal law and procedure" :
                                            requesteddata.subjectId == 5 ? "Evidence" :
                                              requesteddata.subjectId == 6 ? "Real property" : "Torts"}</td>
                                    <td>{requesteddata.questionsRequested}</td>
                                    <td>{requesteddata.questionAvailable}</td>
                                  </tr>)
                              })}
                            </tbody>
                          </Table >}
                      </div>)
                  })}

                  <div className="row">
                    <div className="col-md-12 mt-3">
                      <div className="form-group text-right">
                        <h6 className=" mb-3 text-left">{language.click_yes_sentence}</h6>
                        {this.state.loadingOnDelete ?
                          <span class="msedge-questions-start msedge-right-br mr-2">
                            <button
                              class="btn btn-primary"
                              type="button"
                              disabled
                            >
                              <li>
                                <span
                                  class="spinner-border spinner-border-sm mr-2"
                                  role="status"
                                  aria-hidden="true"
                                ></span>
                              </li>
                              <li className="text-uppercase">
                                {language.buttonLoading}
                              </li>
                            </button>
                          </span> :

                          <button type="button" className="btn btn-outline-primary pr-5 pl-5 mr-2" onClick={this.cancelCreatedExam}>No</button>}

                        <button type="button" className="btn btn-outline-primary pr-5 pl-5" onClick={this.moveToQuestions}>Yes</button>
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

const mapStateToProps = state => {
  return {
    listData: state.main.data,
    time: state.main.time,
    isQuestionNoChoosed: state.main.questionNo
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      questions,
      questionChoosed,
      timerChoosed,
      enableKeyboard
    },
    dispatch
  );
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StepOne);