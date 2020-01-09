import React, { Component } from "react";
import Slider from 'rc-slider';
import swal from "sweetalert";
import 'antd/dist/antd.css';
import { Redirect } from 'react-router-dom'
import { Button, Card, CardBody, Col, Row, CardHeader, TabContent, TabPane, Nav, NavItem, NavLink, Table, Modal, ModalHeader, ModalBody, UncontrolledTooltip, ModalFooter } from "reactstrap";
import Switch from "react-switch";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlay, faCheck, faSquare, faTimes, faQuestionCircle, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cx from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Formsy from "formsy-react";
import Select from "react-select";
import moment from 'moment';
import Timer from 'react-compound-timer';
//import { createHashHistory } from "history";
import { currentState, getData, updateAnswer, enableKeyboard } from '../../../../../actions/actionMain'
import RadioInput from "./radioInput";
import MyInput from '../../../../../components/admin/inputs/MyInput';
import TextAreaInput from '../../../../../components/admin/inputs/TextAreaInput';
import { regx } from '../../../../../utils/admin/Regx'
import { instance, HASH_HISTORY } from '../../../../../actions/constants'
import { getSession } from '../../../../routes/routePaths'
import {language} from '../../../../../utils/locale/locale'
import performWhite from '../../../../../assets/utils/images/icons/performance-white.png';
import performBlue from '../../../../../assets/utils/images/icons/performance-blue.png';
import infoWhite from '../../../../../assets/utils/images/icons/infoWhite.png'
import infoBlue from '../../../../../assets/utils/images/icons/infoBlue.png'
import settingsWhite from '../../../../../assets/utils/images/icons/settings-white.png'
import SettingsBlue from '../../../../../assets/utils/images/icons/settings-blue.png';

//export const hashHistory = createHashHistory();

library.add(
  faPlay,
  faCheck,
  faSquare,
  faTimes
);


var errorCategory = [
  { value: "Problem with title", label: "Problem with title" },
  { value: "Problem with questions", label: "Problem with questions" },
  { value: "Problem with answer choices", label: "Problem with answer choices" }
];

export class Questions extends Component {
  constructor(props) {
    const { data } = props;
    if (typeof data != "undefined" && data != null && data.length != null && data.length > 0) {
      
      // var dataList = Array.from(props.data)
      var dataList = (props.data == null) || (props.data == undefined) ? [] : props.data;

      var exam_id = props.examId;
      var arrayAns = [];
      var arrChoice = [];
      var flagsArray = [];
      var storeFlaggedQuestions = [];
      dataList.map((dataAns , i) => {
          dataAns.examDetailIncompleteFlag === 'n' ? arrayAns.push(i) && arrChoice.push(dataAns.examItemBankAnswerByStudents === 'A' ? 0 : dataAns.examItemBankAnswerByStudents === 'B' ? 1 : dataAns.examItemBankAnswerByStudents === 'C' ? 2 :
          dataAns.examItemBankAnswerByStudents === 'D' ? 3 : dataAns.examItemBankAnswerByStudents === 'E' ? 4 : '') : null;
         

          let createdFormatforFlagged ={
            questionNo : i+1,
            examItemBankOption1: dataAns.examItemBankOption1,
            examItemBankOption2: dataAns.examItemBankOption2,
            examItemBankOption3: dataAns.examItemBankOption3,
            examItemBankOption4: dataAns.examItemBankOption4,
            examItemBankOption5: dataAns.examItemBankOption5
          }
         
          dataAns.examItemBankFlagged === 'true' ? flagsArray.push(createdFormatforFlagged) && storeFlaggedQuestions.push(dataAns.examDetailId) : null
      })
      var index = dataList.findIndex(x => x.examDetailIncompleteFlag === "y");
    } else {
      HASH_HISTORY.push('/students/exam-practice')
    }

    super(props);
    this.state = {
      current: index,
      current_quiz: dataList[index],
      user_choice: "",
      verifying_answer: false,
      question_no: 1,
      current_topic: dataList[index],
      total_data: dataList,
      isFlagged: true,
      FlagCheck: false,
      isTimer: false,

      activeTab: "1",
      value: '',
      hideTimer: true,
      isToggleOn: true,
      isExpanded: false,
      questionEnd: false,

      answerbtnDisable: true,
      isShortcutsEnabled: true,
      customFontSize: 16,
      choiceIndex: '',
      elapsed: 0,
      diff: 0,
      laps: [],
      selection: '',
      range: '',
      modal: false,

      canSubmit: false,
      loading: false,
      errorType: '',
      errorCategory: errorCategory[0],
      errorNote: '',
      cursorDisable: "",
      examId: exam_id,
      redirect: false,
      nextDisabled: false,
      examData: [],
      isAnswered: arrayAns,
      storeChoosenAnswers: arrChoice.filter(entry => /\S/.test(entry)),
      storeFlaggedQuestions: storeFlaggedQuestions,
      disableWhileFlagged: false,
      enableResumeButton: false,
      showFlags: false,
      flagsArray: flagsArray,
      endExamModal: false,
      endexamLoading: false,
      studentSession: getSession("StudentSession"),
      disableExpirePopup: false,
      pauseTimer: false, 
      initialEnabler : true,
      isShortcutsDisabled: false,
      disableFlag: false

    };
    this.highlightSelection = this.highlightSelection.bind(this);
    this.clearStorage = this.clearStorage.bind(this);
  }

  tick = () => {
    var elapsed = Date.now() - this.state.start + this.state.diff;
    this.setState({ elapsed: elapsed });
  }
  getTimeSpan = (elapsed) => {
    var milliseconds = parseInt((elapsed % 1000) / 100),
      seconds = Math.floor((elapsed / 1000) % 60),
      minutes = Math.floor((elapsed / (1000 * 60)) % 60),
      hours = Math.floor((elapsed / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;
  }

  // componentDidUpdate(){
  // }

  componentDidMount() {

    history.pushState(null, document.title, location.href);
window.addEventListener('popstate', function (event)
{
  history.pushState(null, document.title, location.href);
});
    
    window.scroll({ top: 0, left: 0, behavior: 'smooth' })

  this.setState({

    isShortcutsEnabled : (this.props.shortcutEnabled == undefined) || (this.props.shortcutEnabled == null) ? true : this.props.shortcutEnabled

  })


    if (this.state.user_choice === "") {
      this.setState({
        answerbtnDisable: true
      })
    }
    if (this.state.current_quiz === undefined) {
      this.handleNextQuestion()
    } else {
      if (this.state.current_quiz.examItemBankAnswerByStudents != null) {
        const userChoice = this.state.current_quiz.examItemBankAnswerByStudents === 0 ? this.state.current_quiz.examItemBankOption1 : this.state.current_quiz.examItemBankAnswerByStudents === 1 ? this.state.current_quiz.examItemBankOption2 : this.state.current_quiz.examItemBankAnswerByStudents === 2 ? this.state.current_quiz.examItemBankOption3 : this.state.current_quiz.examItemBankAnswerByStudents === 3 ? this.state.current_quiz.examItemBankOption4 : this.state.current_quiz.examItemBankAnswerByStudents === 4 ? this.state.current_quiz.examItemBankOption5 : ''
        this.setState({
          user_choice: userChoice
        })
      }
    }
    var timer = setInterval(this.tick, 33);
    this.setState({
      timer: timer,
      start: new Date(),
      value: 2,

    });

    var el = document.getElementById("htmldecode");
    // el.addEventListener("mouseup", this.highlightSelection, false);
    var div1Paras = el.getElementsByTagName("p");
    for (var i = 0; i < div1Paras.length; i++) {
      div1Paras[i].style.fontSize = `${this.state.customFontSize}px`;
    }
    window.addEventListener("beforeunload", this.clearStorage)
    document.addEventListener("keydown", this.keyDownTextField, false);
    
    // if (!this.state.disableExpirePopup) {
    //   setTimeout(() => {
    //     // this.examExpired()
        
    //   }, this.props.duration * 1000);
    // }
  }

  componentWillMount() {
    if (this.props.data === '') {
      HASH_HISTORY.push('/students/exam-practice')
    } else {
      this.props.data.map((data, index) => {
        localStorage.removeItem(data.examItemBankCode);
        localStorage.removeItem(data.examDetailId);
      })
    }

  }
  

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.onUnload)
    document.removeEventListener("keydown", this.keyDownTextField, false);
  }

  componentWillUpdate() {
    var el = document.getElementById("htmldecode");
    var div1Paras = el.getElementsByTagName("p");
    for (var i = 0; i < div1Paras.length; i++) {
      div1Paras[i].style.fontSize = `${this.state.customFontSize}px`;
    }
    window.addEventListener("beforeunload", this.clearStorage)


  }
  

  getTimeInMinute = (timeInMilli) => {
    let seconds = timeInMilli / 1000;
    let minutes = seconds / 60;
    return Math.floor(minutes);
  }

  keyDownTextField = (e) => {
    var keyCode = e.keyCode;
    if (this.state.isShortcutsEnabled === true) {
      switch (keyCode) {
        case 65:
          this.setState({ user_choice: 0, choiceIndex: 0, answerbtnDisable: false });
          break;
        case 66:
          this.setState({ user_choice: 1, choiceIndex: 1, answerbtnDisable: false });
          break;
        case 67:
          this.setState({ user_choice: 2, choiceIndex: 2, answerbtnDisable: false });
          break;
        case 68:
          this.setState({ user_choice: 3, choiceIndex: 3, answerbtnDisable: false });
          break;
        case 69:
          this.state.current_quiz.examItemBankOption5 == null || this.state.current_quiz.examItemBankOption5 == ''|| this.state.current_quiz.examItemBankOption5 == 'NULL' ? null : this.setState({ user_choice: 4, choiceIndex: 4, answerbtnDisable: false });
          break;
        case 83:
          return this.stopForNow()
        // case 13:
        //   return this.state.answerbtnDisable ? null : this.handleNextQuestion()
        case 39:
          return this.state.answerbtnDisable ? null : this.handleNextQuestion()
        case 37 : 
          return this.handlePrevQuestion()   
        default:
          return null
      }
    }
  }

  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  expandeQuestion = () => {
    if (this.state.isExpanded === true) {
      this.setState({ isExpanded: false })
    }
    if (this.state.isExpanded === false) {
      this.setState({ isExpanded: true })
    }
  }


  selectedAnswer = option => {
    this.setState({  answerbtnDisable: false });

  };

  choiceIndex = index => {
    this.setState({
      choiceIndex: index,
      user_choice: index,
    })

  }

  onSliderChange = (value) => {
    this.setState({ customFontSize: value, });
  };



  handleNextQuestion = () => {

    var lapElapsed = this.state.laps.length ? this.state.laps[0].elapsed : 0;
    var lapTime = this.getTimeSpan(this.state.elapsed - lapElapsed)
    var lapElem = { label: lapTime, elapsed: this.state.elapsed };
    this.setState({ laps: [lapElem].concat(this.state.laps) });

    let isAnswered = this.state.isAnswered
    isAnswered.push(this.state.current)

    let storeChoosenAnswers = this.state.storeChoosenAnswers


    storeChoosenAnswers.push(this.state.user_choice)

    const answer = this.state.choiceIndex === 0 ? 'A' : this.state.choiceIndex === 1 ? 'B' : this.state.choiceIndex === 2 ? 'C' : this.state.choiceIndex === 3 ? 'D' : this.state.choiceIndex === 4 ? 'E' : '';
    var hms = lapTime;
    var a = hms.split(':');
    var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);

    var bodyFormData = new FormData();
    var isFlagged = this.state.FlagCheck === true ? 1 : 0
    const params = new URLSearchParams();
    // params.append('examId', this.props.examId);
    params.append('itemCode', this.state.current_quiz.examItemBankCode);
    params.append('answerByStudent', answer);
    params.append('timeTaken', Math.round(seconds));
    params.append('examItemBankFlagged', isFlagged);

    const bodyConstruct = {
      method: 'PUT',
      headers: { 'content-type': 'application/x-www-form-urlencoded','Authorization': `Bearer ${localStorage.getItem('token')}`, },
      params: params,
      url: `exams/${this.props.examId}/details`
    };
   
    this.setState({
      nextDisabled: true,
      isShortcutsEnabled: false,
      pauseTimer: true
    })
    instance(bodyConstruct)
      .then(response => {
        return response;
      })
      .then(res => {
        if (res.status === 200) {
          if (this.props.data.length === this.state.current + 1) {
            this.setState({
              nextDisabled: true,
              questionEnd: true,
              disableExpirePopup : true,
              isShortcutsEnabled: true
            })
           

            if (this.props.data === '') {
              HASH_HISTORY.push('/students/exam-practice')
            } else {
              this.props.data.map((data, index) => {
                localStorage.removeItem(data.examItemBankCode);
                localStorage.removeItem(data.examDetailId);

              })
            }
            this.endExamState()

          } else {
            this.setState({
              current_quiz: this.props.data[this.state.current + 1],
              current: this.state.current + 1,
              question_no: this.state.question_no + 1,
              current_topic: this.props.data[this.state.current + 1],
              verifying_answer: false,
              user_choice: "",
              FlagCheck: false,
              answerbtnDisable: true,
              nextDisabled: false,
              isShortcutsEnabled: true,
              pauseTimer:false
            })
            window.scroll({ top: 80, left: 0, behavior: 'smooth' })
          }
        }
      })
      .catch(error => console.log(error));
  }

  handlePrevQuestion = () => {

    // const index = 
    // let isAnswered = this.state.isAnswered;
    // let storeChoosenAnswers = this.state.storeChoosenAnswers

    // if (storeChoosenAnswers[index] == 0) {
    //   this.setState({
    //     user_choice: 0,
    //   })
    // }else if (storeChoosenAnswers[index] == 1) {
    //   this.setState({
    //     user_choice: 1,
    //   })
    // }else if (storeChoosenAnswers[index] == 2) {
    //   this.setState({
    //     user_choice: 2,
    //   })
    // }else if (storeChoosenAnswers[index] == 3) {
    //   this.setState({
    //     user_choice: 3,
    //   })
    // }
    // else if (storeChoosenAnswers[index] === 4){
    //   this.setState({
    //     user_choice: 4,
    //   })
    // }



    // isAnswered.filter(data => {
    //   if (data == index || this.state.current == index) {

    //     this.setState({
    //       current_quiz: this.props.data[index] || this.props.data[this.state.current],
    //       disableWhileFlagged: this.state.current == index ? false : true,
    //       answerbtnDisable: this.state.current == index ? true : false,
    //       enableResumeButton: this.state.current == index ? false : true,
    //       isShortcutsEnabled: this.state.current === index ? true : false,
    //       question_no: index
    //     })
    //   }
    // })

  }

  directQstnChange = (index, questionclicked) => {

    let isAnswered = this.state.isAnswered;
    let storeChoosenAnswers = this.state.storeChoosenAnswers

    if (storeChoosenAnswers[index] == 0) {
      this.setState({
        user_choice: 0,
      })
    }else if (storeChoosenAnswers[index] == 1) {
      this.setState({
        user_choice: 1,
      })
    }else if (storeChoosenAnswers[index] == 2) {
      this.setState({
        user_choice: 2,
      })
    }else if (storeChoosenAnswers[index] == 3) {
      this.setState({
        user_choice: 3,
      })
    }
    else if (storeChoosenAnswers[index] === 4){
      this.setState({
        user_choice: 4,
      })
    }



    isAnswered.filter(data => {
      if (data == index || this.state.current == index) {

        this.setState({
          current_quiz: this.props.data[index] || this.props.data[this.state.current],
          disableWhileFlagged: this.state.current == index ? false : true,
          answerbtnDisable: this.state.current == index ? true : false,
          enableResumeButton: this.state.current == index ? false : true,
          isShortcutsEnabled: this.state.current === index ? true : false,
          isShortcutsDisabled: this.state.current === index ? false : true,
          disableFlag: this.state.current === index ? false : true,
          question_no: index
        })
      }
    })
  }

  hideTimer = () => {
    if (this.state.hideTimer === true) {
      this.setState({
        hideTimer: false
      });
    }
    if (this.state.hideTimer === false) {
      this.setState({
        hideTimer: true
      });
    }
  };
  handleClick=()=>{
    this.setState(function (prevState) {
      return { isToggleOn: !prevState.isToggleOn };
    });
  }
  
  handleTimer = (isTimer) => {
    this.setState({ isTimer, hideTimer: !this.state.hideTimer })

  }



  flagQuestion = (index, questionNo) => {

    let storeFlaggedQuestions = this.state.storeFlaggedQuestions;

    let createdFormatforFlagged ={
      questionNo : questionNo,
      examItemBankOption1: index.examItemBankOption1,
      examItemBankOption2: index.examItemBankOption2,
      examItemBankOption3: index.examItemBankOption3,
      examItemBankOption4: index.examItemBankOption4,
      examItemBankOption5: index.examItemBankOption5
    }

    const flagPresent = this.state.flagsArray.some(function (el) {
      return (el.questionNo == questionNo);
    });
    flagPresent ? null : this.state.flagsArray.push(createdFormatforFlagged) && storeFlaggedQuestions.push(index.examDetailId)
    var storeQ = { id: this.state.current_quiz.examDetailId, flag: true }

    window.localStorage.setItem(this.state.current_quiz.examDetailId, JSON.stringify(storeQ));

    this.setState({
      FlagCheck: true
    })

    
    // [index.examDetailId] = index.examDetailId
    this.setState({ isFlagged: 1 })
  }

  clearStorage() {
    if (this.props.data === '') {
      HASH_HISTORY.push('/students/exam-practice')
    } else {
      this.props.data.map((data, index) => {
        localStorage.removeItem(data.examItemBankCode);
        localStorage.removeItem(data.examDetailId);


      })
    }
  }

  stopForNow = () => {

    swal({
      title: language.confirmationPopupHeading,
      text:
        language.stopExamMsg,
      icon: "warning",
      buttons: true,
      dangerMode: true,
      className: "msedge_stop_now",
    }).then(willClose => {
      window.addEventListener("beforeunload", this.clearStorage)
      if (willClose) {
        this.setState({ disableExpirePopup: true })
        window.location.href = '/#/students/exam-practice'
      }
    });
  }
  endExamState = () => {

    const timeInFull = this.getTimeSpan(this.state.elapsed)
    var hoursMinsSec = timeInFull;
    var aTime = hoursMinsSec.split(':');
    var secondsCalc = (+aTime[0]) * 60 * 60 + (+aTime[1]) * 60 + (+aTime[2]);
    var requestBody = JSON.stringify({
      examDuration: secondsCalc,
      examTimer: 1,
      examName: this.props.examName
    })
    this.setState({
      isShortcutsEnabled : false,
      endexamLoading: true
    })
    instance.put(`exams/${this.state.examId}`, requestBody , {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,        
      }
    })
      .then((response) => {
        if (response.status === 200) {
          swal(language.thanks, language.examCompleted, "success");
          this.setState({
            redirect: true,
            examData: response.data.data,
            endexamLoading: false
          })

        } else {
          swal(language.oops, language.tryAgain, "error");
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  examExpired = () => {
    swal({
      title: language.examExpired,
      text:  language.examExpiredMsg,
      type: "warning"
    }).then(() => {
      window.addEventListener("beforeunload", this.clearStorage)
      this.endExamState()
    });
  }

  isShortcutsEnabled = () => {

    this.setState(function (prevState) {
      return { isShortcutsEnabled: !prevState.isShortcutsEnabled };
    });
  }

  incFontSize = () => {
    if (this.state.customFontSize < 23) {
      this.setState({
        customFontSize: this.state.customFontSize + 1
      })
    }
  }
  decFontSize = () => {
    if (this.state.customFontSize > 13) {
      this.setState({
        customFontSize: this.state.customFontSize - 1
      })
    }
  }
  resetFontSize = () => {
    this.setState({
      customFontSize: 16
    })
  }
  highlightSelection = () => {
    var selection;
    if (window.getSelection)
      selection = window.getSelection();
    else if (typeof document.selection != "undefined")
      selection = document.selection;
    var range = selection.getRangeAt(0);

    this.setState({
      selection: selection,
      range: range
    })
    if (range && !selection.isCollapsed) {
      if (selection.anchorNode.parentNode == selection.focusNode.parentNode) {
        var span = document.createElement('span');
        span.className = 'highlight-selection';
        range.surroundContents(span);
        span.onclick = () => {
          span.style.color = "#000";
          span.style.backgroundColor = "white"
        }
      }
    }
  }
  submit = model => {
    this.setState({
      loading: true,
      isShortcutsEnabled: false
    })
    const errrorCategory = this.state.errorCategory;
    const currentdate = Date.now();
    const body = {
      "itemBankCode": this.state.current_quiz.examItemBankCode,
      "itemErrorCreatedAt": moment(currentdate).format("MM-DD-YYYY"),
      "itemErrorDescription": model.errorNote,
      "itemErorCreatedBy": this.state.studentSession.userId,
      "itemErrorSubject": this.state.current_quiz.examItemBankSubject,
      "itemErrorTopic": this.state.current_quiz.examItemBankTopic,
      "itemErrorQuestion": this.state.current_quiz.examItemBankQuestion,
      "itemErrorSubjectId" : this.state.current_quiz.examItemBankSubjectId,
      "itemErrorTopicId" : this.state.current_quiz.examItemBankTopicId,
       "itemErrorTitle": model.errorType,
      "itemErrorCategory": errrorCategory.value
    }

    instance.post("student/itemerror", body , {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,        
      }
    })
      .then((response) => {
        if (response.data.status === "Success") {
          swal(language.reported, language.reportedMsg, "success");
          this.setState({
            modal: false,
            loading: false,
            isShortcutsEnabled: this.state.current === this.state.question_no ? true : false
          })
        } else {
          this.setState({
            loading: false,
          })
          swal(language.oops, language.erroronReport, "error");
          this.setState({
            modal: false,
            loading: false,
            isShortcutsEnabled: this.state.current === this.state.question_no ? true : false
          })
        }
      })
      .catch((error) => {
        this.setState({
          loading: false,
        })
        swal(language.oops, language.tryAgain, "error");
        this.setState({
          modal: false,
          loading: false,
          isShortcutsEnabled: this.state.current === this.state.question_no ? true : false
        })
      })

  };

  enableErrorReport = () => {
    this.setState(prevState => ({
      modal: true,
      isShortcutsEnabled: false
    }))
  }

  closeErrorReport = () => {
    this.setState(prevState => ({
      modal: false,
      isShortcutsEnabled: this.state.current === this.state.question_no ? true : false
    }))
  }

  disableButton = () => {
    this.setState({ canSubmit: false, cursorDisable: "not-allowed" });
  };

  enableButton = () => {
    this.setState({ canSubmit: true, cursorDisable: "" });
  };

  handleErrorCategory = selectedState => {
    this.setState({ errorCategory: selectedState });
  };
  stripHtml = (html) => {
    var tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  }

  resumePractice = () => {
    this.setState({ current_quiz: this.props.data[this.state.current], disableWhileFlagged: false, enableResumeButton: false, user_choice: '', user_choice: "", answerbtnDisable: true, isShortcutsEnabled: true, question_no : this.state.current, isShortcutsDisabled: false,disableFlag: false})
  }
  showFlags = () => {
    this.setState({
      showFlags: !this.state.showFlags
    })
  }
  examexpireSet = () => {
    this.setState({
      endExamModal: true,
      isShortcutsEnabled:false
    })
  }

  showTimerSection = () => {

    const calcTimeFromProps = this.props.duration * 1000
    const finalTime = calcTimeFromProps - this.state.elapsed

    const data = 
      <Timer
        formatValue={(value) => `${(value < 10 ? `0${value}` : value)}`}
        initialTime={finalTime}
        direction="backward"
        checkpoints={[
          {
              time: 0,
              callback: () => this.examexpireSet(),
          }
      ]}
      >
        {({pause,resume}) => (
          <React.Fragment>
            <h1><Timer.Hours /> : <Timer.Minutes /> : <Timer.Seconds />
            </h1>
           {this.state.pauseTimer ? pause() : resume()}
          </React.Fragment>
        )}
      </Timer>
    return data
  }

  render() {
    if (this.state.current_quiz === undefined) {
      return null
    } else {
      const choice1 = this.state.current_quiz.examItemBankOption1;
      const choice2 = this.state.current_quiz.examItemBankOption2;
      const choice3 = this.state.current_quiz.examItemBankOption3;
      const choice4 = this.state.current_quiz.examItemBankOption4;
      const choice5 = this.state.current_quiz.examItemBankOption5;
      const questionchoices = [
        choice1,
        choice2,
        choice3,
        choice4,
        choice5
      ]
      var filtered = questionchoices.filter(function (entry) {
        if (entry === null) {
          return entry != null
        } else if (entry === undefined) {
          return entry != undefined
        } else if(entry === "NULL"){
          return entry != "NULL"
        }else if(entry === ""){
          return entry != ""
        }
        else if(entry === "<p></p>"){
          return entry != "<p></p>"
        }else if(entry === "<p>NULL</p>"){
          return entry != "<p>NULL</p>"
        }
        else {
          return /\S/.test(entry);
        }

      });
      var self = this;
      var question = this.state.current_quiz.examItemBankCode
      var questionAns = this.state.current_quiz.examItemBankAnswerByStudents
      var choices = filtered.map(function (choice, index) {
        var classType = "";
        return (
          <RadioInput
            key={choice}
            choice={choice}
            index={index}
            question={question}
            onChoiceSelect={self.selectedAnswer}
            onChoiceIndex={self.choiceIndex}
            disable={self.state.verifying_answer}
            disableWhileFlagged={self.state.disableWhileFlagged}
            classType={classType}
            selection={self.state.user_choice}
            customFontSize={self.state.customFontSize}
            studentAnswer={questionAns}
            stripHtml={self.stripHtml}
            highlightSelection={self.highlightSelection}
            isToggleOn={self.state.isToggleOn}
            isShortcuts={self.state.enableResumeButton}
            nextDisabled = {self.state.nextDisabled}
          />
        );
      });
    }
    var button_name = this.props.data.length === this.state.current + 1 ? 'End Exam' : "Next Question";
    if (this.state.redirect) {
      return <Redirect to={{
        pathname: 'exam-review',
        state: {
          examId: this.state.examId, examName: this.props.examName, examDate: this.props.examDate,
          examTotalQuestions: this.state.examData.examTotalQuestions,
          examRightAnswersCount: this.state.examData.examRightAnswersCount,
          examScore: this.state.examData.examScore
        }
      }} />;
    }
    var retrievedObject = window.localStorage.getItem(this.state.current_quiz.examDetailId);
    var retrived = JSON.parse(retrievedObject)
    var showFlag = retrived != undefined || retrived != null ? retrived.id === this.state.current_quiz.examDetailId ? true : false : false

    var questionNo = this.state.enableResumeButton ? this.state.question_no + 1 : this.state.current + 1

    return (
      <div className="msedge-mcq-section">
        <Col xs="12" sm="12" md="12" lg="12" xl="12" className="p-0">
          <Row className="msedge-exam-header">
            <Col className="pr-0" xs="12" sm="12" md={this.state.isExpanded === true ? '12' : '8'} lg={this.state.isExpanded === true ? '12' : '8'} xl={this.state.isExpanded === true ? '12' : '8'}>
              <div className="msedge-question-choice-section">
                <div className="msedge-question-section">
                  <Row>
                    <Col xs="12" sm="12" md="12" lg="12" xl="12" className="msedge-practiseexam-border">
                      <Row>
                        <Col xs="6" sm="6" md="9" lg="9" xl="9" className="msedge-qus-sub">
                          {this.state.isExpanded === false ? <Row className="m-0">
                            {this.props.isQuestionNoChoosed === true ?
                              <Col xs="12" sm="12" md="12" lg="12" xl="12" className="p-0">
                                <h6 className="float-left pr-2">#{questionNo}</h6>

                                <h6>{this.state.total_data[questionNo - 1].examItemBankSubject} / <span className="msedge-sub-style">{this.state.total_data[questionNo - 1].examItemBankTopic}</span></h6>

                              </Col> : ''}
                          </Row> : <Row className="m-0 msedge-question-head-expanded" style={{ background: this.state.isExpanded === true ? '' : '', color: this.state.isExpanded === true ? '#ffffff' : '' }}>
                              {this.props.isQuestionNoChoosed === true ? <Col xs="10" sm="10" md="10" lg="10" xl="10" className="p-0 ">
                                <h6>{this.state.total_data[questionNo - 1].examItemBankSubject} / <span className="msedge-sub-style">{this.state.total_data[questionNo - 1].examItemBankTopic}</span></h6>
                              </Col> : ''}


                            </Row>}
                        </Col>
                        <Col xs="6" sm="6" md="3" lg="3" xl="3" className="pr-0 msedge-qus-flag" >
                          <div className="msedge-set-flag">
                            <div className="msedge-attention-icon">
                              <UncontrolledTooltip placement="top" target="errors">
                                Error
                          </UncontrolledTooltip>
                              <i className="pe-7s-attention" onClick={this.enableErrorReport} id="errors"></i>
                              <i id={this.state.current_quiz.question_number} style={{ color: this.state.storeFlaggedQuestions.includes(this.state.current_quiz.examDetailId) ? 'red' : '', pointerEvents:this.state.disableFlag ? 'none' : 'unset', cursor: this.state.disableFlag ? 'not-allowed' : 'pointer' }} className="pe-7s-flag" onClick={() => this.flagQuestion(this.state.current_quiz, questionNo)} id="flag"></i>
                              <UncontrolledTooltip placement="top" target="flag">
                                Flag
                          </UncontrolledTooltip>
                              {this.state.isExpanded ? <i className="pe-7s-angle-right" onClick={() => {
                                this.expandeQuestion()
                              }} /> : ""}
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row >
                  {this.state.isToggleOn ? 
                                    <div id="htmldecode" onMouseUp={this.highlightSelection} dangerouslySetInnerHTML={{ __html: this.state.current_quiz.examItemBankQuestion }}></div>
                                    : 
                                    <div id="htmldecode" dangerouslySetInnerHTML={{ __html: this.state.current_quiz.examItemBankQuestion }}></div>
                  }
                </div>
                <div className="msedge-choice-section">
                  {choices}
                </div>
              </div>
              <div className="msedge-ques-btn-sec">
                <Col xs="12" sm="12" md="12" lg="12" xl="12" className="p-0">
                  <Row className="m-0">
                    <Col xs="6" sm="6" md="6" lg="6" xl="6" className="p-0 stop msedge-questions-start msedge-stop-btn">
                    {this.state.answerbtnDisable ?
                      <button className="btn btn btn-secondary" onClick={this.stopForNow}>
                        <li><FontAwesomeIcon icon={faSquare} size="1x" /></li>
                        <li>STOP</li>
                      </button> : <button  disabled={true} className="btn btn btn-secondary" onClick={this.stopForNow}>
                        <li><FontAwesomeIcon icon={faSquare} size="1x" /></li>
                        <li>STOP</li>
                    </button> }
                    </Col>
                    <Col xs="6" sm="6" md="6" lg="6" xl="6" className="p-0 answer msedge-questions-start msedge-next-btn">
                      {this.state.answerbtnDisable ?
                        <button className="btn btn btn-secondary" disabled style={{ cursor: "not-allowed" }}>
                          <li><FontAwesomeIcon icon={faArrowRight} size="1x" /></li>
                          <li className="text-uppercase">{button_name}</li>
                        </button>
                        : this.state.enableResumeButton ?
                          <Button onClick={this.resumePractice}>
                            <li><FontAwesomeIcon icon={faPlay} size="1x" /></li>
                            <li>RESUME PRACTICE</li>
                          </Button>
                          :
                          !this.state.nextDisabled ?
                            <button className="btn btn btn-secondary" disabled={this.state.nextDisabled} onClick={this.handleNextQuestion}>
                              <li><FontAwesomeIcon icon={faArrowRight} size="1x" /></li>
                              <li className="text-uppercase">{button_name}</li>
                            </button> : <button
                              type="button"
                              disabled
                              className="btn btn btn-secondary"
                            >
                              <li><span
                                className="spinner-border spinner-border-sm mr-2"
                                role="status"
                                aria-hidden="true"
                              ></span></li>
                              <li className="text-uppercase"> Loading...</li>
                            </button>
                      }
                    </Col>
                  </Row>
                </Col>
              </div>
            </Col>
            <Col xs="12" sm="12" md="4" lg="4" xl="4" className="msedge-performance-settings" style={{ display: this.state.isExpanded === true ? 'none' : 'block' }}>
              <Card tabs="true" className="mb-3">
                <CardHeader>
                  <Nav justified>
                    <div className="msedge-expand-toggle" onClick={() => {
                      this.expandeQuestion()
                    }}>
                      <h4 className="msedge-double-right-icon"> <FontAwesomeIcon icon={faArrowRight} size="1x" /> </h4>
                    </div>
                    {this.state.verifying_answer === false ? <NavItem style={{ background: this.state.activeTab === "1" ? '#006EBD' : '#ffffff' }}>
                      <NavLink
                        onClick={() => {
                          this.toggle("1");
                        }}
                      >
                        <img src={this.state.activeTab === "1" ? infoWhite : infoBlue} alt="Clock_Image_icon" />

                      </NavLink>
                    </NavItem> : <NavItem style={{ background: this.state.activeTab === "1" ? '#006EBD' : '#ffffff' }}>
                        <NavLink
                          onClick={() => {
                            this.toggle("1");
                          }}
                        >
                          <img src={this.state.activeTab === "1" ? performBlue : performWhite} alt="Perform_blue_icon" />
                        </NavLink>
                      </NavItem>}

                    <NavItem style={{ background: this.state.activeTab === "2" ? '#006EBD' : '#ffffff' }}>
                      <NavLink
                        onClick={() => {
                          this.toggle("2");
                        }}
                      >
                        <img src={this.state.activeTab === "2" ? settingsWhite : SettingsBlue} alt="Settings_icon" />
                      </NavLink>
                    </NavItem>
                  </Nav>
                </CardHeader>
                <CardBody>
                  <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                      <div className="timer-tab">
                        {this.props.isTimerChoosed === true ?
                          <div className="timer">
                            <Row className="m-0">
                              <Col xs="6" sm="6" md="6" lg="6" xl="6" className="text-left p-0">
                                <h4 className="m-0">Timer</h4>
                              </Col>
                              <Col xs="6" sm="6" md="6" lg="6" xl="6" className="text-right p-0">
                                <div className="d-flex justify-content-end">
                                  <Switch
                                    checked={this.state.isTimer}
                                    onChange={this.handleTimer}
                                    onColor="#86d3ff"
                                    onHandleColor="#2693e6"
                                    handleDiameter={20}
                                    uncheckedIcon={false}
                                    checkedIcon={false}
                                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                    height={15}
                                    width={40}
                                    className="mr-2 mb-2"
                                    id="material-switch"
                                  />
                                  <p>Hide</p>
                                </div>
                              </Col>
                            </Row>
                            {this.state.hideTimer === true ? this.showTimerSection() : <div></div>}

                            <p className="text-center">hh:mm:ss</p>


                          </div> : ''}
                        <div className="timer-tab-questions">
                          <div className="timer msedge-exam-qus-timer">
                            <Row className="m-0">
                              <Col xs="6" sm="6" md="6" lg="6" xl="6" className="text-left p-0">
                                <h4 className="m-0">Questions</h4>
                              </Col>
                              <Col xs="6" sm="6" md="6" lg="6" xl="6" className="text-right p-0">
                                <div className="d-flex justify-content-end">
                                  <Switch
                                    checked={this.state.showFlags}
                                    onChange={this.showFlags}
                                    onColor="#86d3ff"
                                    onHandleColor="#2693e6"
                                    handleDiameter={20}
                                    uncheckedIcon={false}
                                    checkedIcon={false}
                                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                    height={15}
                                    width={40}
                                    className="mr-2 mb-2"
                                    id="material-switch"
                                  />
                                  <p>Flag</p>
                                </div>
                              </Col>
                            </Row>

                            <div className='enable-options mt-2'>
                              <Col xs="12" sm="12" md="12" lg="12" xl="12" className="p-0">
                                <Row className="m-0">

                                  <Col xs="12" sm="12" md="12" lg="12" xl="12" className="text-right p-0">

                                  </Col>

                                  <Col xs="6" sm="12" md="6" lg="6" xl="6" className="text-left p-0">
                                  </Col>
                                </Row>

                              </Col>
                              <Col xs="12" sm="12" md="12" lg="12" xl="12" className="total-questions-intigator">
                                {this.state.showFlags === true ? <div>
                                  {typeof this.state.flagsArray !== 'undefined' && this.state.flagsArray.length > 0 ? this.state.flagsArray.map((data, index) => {
                                    return <p key={index} className={`no-of-questions-list`} onClick={() => this.directQstnChange(data.questionNo -1, data)}
                                      className={this.state.isAnswered[index] === index ? 'msedge-students-answered-questions' : ''}
                                      style={{cursor: 'pointer'}}
                                      >{data.questionNo}</p>
                                  }) : 'There is no flagged questions'}

                                </div> : <div>
                                    {this.props.data != ' ' ? this.props.data.map((question, index) => {
                                      return <p key={index} className={`no-of-questions-list`} onClick={() => this.directQstnChange(index, question)}
                                        className={question.examDetailIncompleteFlag === 'n' || this.state.isAnswered[index] === index? 'msedge-students-answered-questions' : ''}
                                        style={{
                                          border: this.state.storeFlaggedQuestions.includes(question.examDetailId) ? "1px solid red" : " ",
                                          color: this.state.current_quiz.examDetailId === question.examDetailId  ? '#006EBD' : '#252525', cursor: 'pointer'
                                        }}>{index + 1}</p>
                                    }) : ''}
                                  </div>}
                              </Col>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabPane>
                    <TabPane tabId="2">
                      <div className="settings-tab">
                        <div className="font-size">
                          <h4>Font size</h4>
                          <div>
                            <Row>
                              <Col md="12">
                                <Row className="m-0 p-0">
                                  <Slider min={14} max={22} value={this.state.customFontSize} defaultValue={16} onChange={this.onSliderChange}
                                    className="rc-slider-primary rc-slider-square mb-2" />
                                </Row>
                              </Col>
                              <Col md="12">
                                <Row className="m-0">
                                  <Col md="4" lg="4" xl="4" sm="3" xs="3" className="text-center p-0 my-2">
                                    <button className="inc-font" onClick={this.decFontSize}>-</button>
                                  </Col>
                                  <Col md="4" lg="4" xl="4" sm="6" xs="6" className="text-center p-0 my-2">
                                    <button className="inc-font" onClick={this.resetFontSize}>RESET</button>
                                  </Col>
                                  <Col md="4" lg="4" xl="4" sm="3" xs="3" className="text-center p-0 my-2">
                                    <button className="inc-font dec-font" onClick={this.incFontSize}>+</button>
                                  </Col>
                                </Row>
                              </Col>
                            </Row>

                          </div>

                        </div>
                        <div className="short-cuts">
                                  <h4>{language.keyboard_shortcuts}</h4>
                          <div>
                            <Row>
                              <Col md="8">Enable Shortcuts</Col>
                              <Col md="4">
                                <div className={`${this.state.isShortcutsDisabled ? 'msedge-exams-shortcuts-disabled switch has-switch mr-2 mb-2 mr-2' : 'switch has-switch mr-2 mb-2 mr-2'}`} data-on-label="ON"
                                  data-off-label="OFF"
                                  onClick={this.isShortcutsEnabled}>
                                  <div className={cx("switch-animate", {
                                    'switch-on': this.state.isShortcutsEnabled,
                                    'switch-off': !this.state.isShortcutsEnabled
                                  })}>
                                    <input type="checkbox" /><span
                                      className="switch-left bg-primary">ON</span><label>&nbsp;</label><span
                                        className="switch-right bg-primary">OFF</span>
                                  </div>
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col md="8">Submit</Col>
                              <Col md="4"><li><FontAwesomeIcon icon={faArrowRight}/></li></Col>
                            </Row>
                            <Row>
                              <Col>Select Options
                                <div className="select-options">

                                  <li>A</li>
                                  <li>B</li>
                                  <li>C</li>
                                  <li>D</li>
                                  <li>E</li>
                                </div>
                              </Col>

                            </Row>
                            <Row>
                              <Col md="8">Stop</Col>
                              <Col md="4"><li>S</li></Col>
                            </Row>
                            <Row>
                              <Col md="8">Pass and Next</Col>
                              <Col md="4"><li>></li></Col>
                            </Row>
                          </div>
                        </div>
                        <div className="highlight">
                          <h4>Enable Highlights</h4>
                          <div>
                            <Row>
                              <Col md="8">Enable Highlights</Col>
                              <Col md="4">
                                <div className="switch has-switch mr-2 mb-2 mr-2" data-on-label="ON"
                                  data-off-label="OFF"
                                  onClick={this.handleClick}>
                                  <div className={cx("switch-animate", {
                                    'switch-on': this.state.isToggleOn,
                                    'switch-off': !this.state.isToggleOn
                                  })}>
                                    <input type="checkbox" /><span
                                      className="switch-left bg-primary">ON</span><label>&nbsp;</label><span
                                        className="switch-right bg-primary">OFF</span>
                                  </div>
                                </div>
                              </Col>
                            </Row>
                            <Col className="highlight-hints"><span>Select text</span>to highlight</Col>
                            <Col className="highlight-hints"><span>On Click of selected text</span> to remove highlight</Col>
                          </div>
                        </div>

                      </div>
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
            </Col>

          </Row>
        </Col>


        <Modal isOpen={this.state.modal}>
          <ModalHeader>
            Error report
                            </ModalHeader>
          <ModalBody>
            <div>
              <Row className="justify-content-center">
                <Col md="12">

                  <Formsy
                    onValidSubmit={this.submit}
                    onValid={this.enableButton}
                    onInvalid={this.disableButton}
                  >
                    <div className="">
                      <Row className="">
                        <Col>
                          <div className="pt-2 pb-3">
                            <MyInput
                              name="errorType"
                              type="text"
                              value={this.state.errorType}
                              validationError={'Please Enter valid error type'}
                              validations="isWords"
                              className="form-control"
                              required
                              fieldName={'Error title'}
                              tooltip={'Fill the error type'}
                              isMandatory={true}
                            />
                            <Row className="msedge-student-field pt-2">
                              <Col md="4">
                                <label className="msedge-setting-time-information" htmlFor="category">
                                  Category
                                        <span className="text-danger">*</span>
                                </label>
                              </Col>
                              <Col md="7">
                                <div className="form-group">
                                  <Select
                                    aria-label="select category"
                                    onChange={this.handleErrorCategory}
                                    value={this.state.errorCategory}
                                    options={errorCategory}
                                  ></Select>
                                  <span
                                    className="msedge-info-icon"
                                    id="category"
                                  >
                                    <FontAwesomeIcon
                                      icon={faQuestionCircle}
                                    />
                                  </span>
                                  <UncontrolledTooltip
                                    placement="right"
                                    target="category"
                                  >
                                    Select error category
                                        </UncontrolledTooltip>
                                </div>
                              </Col>
                            </Row>

                            <TextAreaInput
                              name="errorNote"
                              type="textarea"
                              rows="7"
                              fieldName={'Comments'}
                              tooltip={'Fill the comments'}
                              className="form-control"
                              value={this.state.errorNote}
                              isMandatory={true}
                              validations={{
                                matchRegexp: regx.alphNum250max
                              }}
                              validationError={'Please enter valid Alphanumeric. Note should contains 250 characters'}
                              required
                              id="messageContents"
                            />
                          </div>
                        </Col>
                      </Row>
                    </div>
                    <div className="row">
                      <div className="col-md-12 mt-3 pt-3">
                        <div className="form-group text-right msedge-error-model">
                          {!this.state.loading ? (
                            <button type="submit" className="btn btn-outline-primary ques-submit-btn">
                              <li>
                                <i className="pe-7s-download" aria-hidden="true"></i>
                              </li>
                              <li className="text-uppercase">Submit</li>
                            </button>
                          ) : (
                              <span className="msedge-questions-start msedge-right-br mr-2">
                                <button
                                  className="btn btn-primary"
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
                                    Loading...
                                </li>
                                </button>
                              </span>
                            )}
                          <button type="button" className="btn btn-outline-primary ques-btn ml-2" onClick={this.closeErrorReport}>
                            <li>
                              <i className="pe-7s-back" aria-hidden="true"></i>
                            </li>
                            <li className="text-uppercase">Back</li>
                          </button>

                        </div>
                      </div>
                    </div>

                  </Formsy>

                </Col>
              </Row>
            </div>
          </ModalBody>
        </Modal>
        <Modal isOpen={this.state.endExamModal} toggle={this.endExamToggle}>
          <ModalBody>
            <h2> Your exam time expired</h2>
            <p> Hence your exam is auto submitted and redirecting to the main page</p>
          </ModalBody>
          <ModalFooter>
            {!this.state.endexamLoading ? (
              <button onClick={this.endExamState} type="submit" className="btn btn-outline-primary ques-submit-btn">
                <li>
                  <i className="pe-7s-download" aria-hidden="true"></i>
                </li>
                <li className="text-uppercase">Ok</li>
              </button>
            ) : (
                <span className="msedge-questions-start msedge-right-br mr-2">
                  <button
                    className="btn btn-primary"
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
                      Loading...
                                </li>
                  </button>
                </span>
              )}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isTimerChoosed: state.main.timer,
    isQuestionNoChoosed: state.main.questionNo,
    shortcutEnabled : state.main.enable

  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    currentState,
    getData,
    updateAnswer,
    enableKeyboard
  }, dispatch)
};
export default connect(mapStateToProps, mapDispatchToProps)(Questions)