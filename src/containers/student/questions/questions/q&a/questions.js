import React, { Component } from "react";
import Slider from 'rc-slider';
import { Bar } from 'react-chartjs-2';
import swal from "sweetalert";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import classnames from "classnames";
import { Button, Card, CardBody, CardHeader, Col, Row, TabContent, TabPane, Nav, NavItem, NavLink, Table, UncontrolledTooltip } from "reactstrap";
import { faPlay, faCheck, faSquare, faExclamationTriangle, faCheckCircle, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment, { lang } from 'moment';
import RadioInput from "./answerOptions";  
import Switch from "react-switch";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
//import { createHashHistory } from "history";
import ErrorReport from './errorReport';
import {instance, HASH_HISTORY} from "../../../../../actions/constants";
import {enableKeyboard} from "../../../../../actions/actionMain"
import {getSession} from '../../../../routes/routePaths'
import {language} from '../../../../../utils/locale/locale'
import performWhite from '../../../../../assets/utils/images/icons/seo-performance-marketing-graphic (1).png';
import performBlue from '../../../../../assets/utils/images/icons/seo-performance-marketing-graphic.png';
import settingsWhite from '../../../../../assets/utils/images/icons/settings-white.png'
import settingsBlue from '../../../../../assets/utils/images/icons/settings-blue.png'
import infoWhite from '../../../../../assets/utils/images/icons/infoWhite.png'
import infoBlue from '../../../../../assets/utils/images/icons/infoBlue.png'

//export const hashHistory = createHashHistory();

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      current_quiz: [],
      allData: [],
      user_choice: "",
      verifying_answer: false,
      labels: ['A', 'B', 'C', 'D', 'E'],

      explanation: "",
      correct_answer: "",
      choosenAnswer:"",

      activeTab: "1",
      activeTabForVerify: "1",
      hideTimer: false,

      isToggleOn: true,
      isExpanded: false,

      customFontSize: 16,

      isToggleOnHighlight: true,
      isToggleOnShortcuts: true,
      modal: false,
      answerbtnDisable: true,
      isStart: false,
      elapsed: 0,
      diff: 0,
      laps: [],

      endExam: false,
      isFlagged: 0,
      studentOverviewTodayQuestionsAnswered:"",
      studentOverviewQuestionsAnswered:"",
      getAnsweredTime: "00:00:00",
      question_no: 1,
      isAnswered:[],
      storeChoosenAnswers:[],
      storeFlaggedQuestions:[],
      disableWhileFlagged: false,
      enableResumeButton:false,
      isNullresponseforChart: false,
      showFlags: false,
      flagsArray:[],
      isAnswerCorrect: 0,
      questionResponse: [],
      answerFromResponse: '',
      isQuestionLoading: false,
      isTimerpaused : false,
      initialEnabler : true,
      isShortcutsDisabled: false,
      disableFlag: false,
      studentSession: getSession("StudentSession")
    };
  }

  componentDidMount() {

    history.pushState(null, document.title, location.href);
    window.addEventListener('popstate', function (event)
    {
      history.pushState(null, document.title, location.href);
    });
    
    window.scroll({top: 0, left: 0, behavior: 'smooth' })
    window.addEventListener("beforeunload", this.onUnload)

    this.setState({

      isToggleOnShortcuts : (this.props.shortcutEnabled == undefined) || (this.props.shortcutEnabled == null) ? true : this.props.shortcutEnabled
  
    })

    // var dataList = Array.from(this.props.listData)
    var dataList = (this.props.listData == null) || (this.props.listData == undefined) ? [] : this.props.listData;

        this.setState({
      current_quiz: dataList[0] || '',
      allData: dataList || []
    })

    this.initiateTimer()

    var el = document.getElementById("htmldecode");
    // el.addEventListener("mouseup", this.highlightSelection, false);
    var div1Paras = el.getElementsByTagName("p");
    for (var i = 0; i < div1Paras.length; i++) {
      div1Paras[i].style.fontSize = `${this.state.customFontSize}px`;
  }

    document.addEventListener("keydown", this.keyDownTextField, false);

    this.getStatisticsData()

  }

  componentWillReceiveProps({ listData }) {
    if(listData == '' || listData == []){
      HASH_HISTORY.push('/students/questions')
    }
  }

  initiateTimer = () => {
    if (!this.state.isStart) { // start
      var timer = setInterval(this.tick, 33);
      this.setState({
        isStart: true,
        timer: timer,
        start: new Date(),
      });
    } else { // pause
      clearInterval(this.state.timer);
      this.setState({
        timer: undefined,
        isStart: false,
        diff: this.state.elapsed,
      });
    }
  }

  tick = () => {
    var elapsed = Date.now() - this.state.start + this.state.diff;
    this.setState({ elapsed: elapsed});
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

  onUnload=(event)=> { // the method that will be used for both add and remove event
    event.preventDefault()
    event.returnValue = false
    alert('hshdgsdkjwuyensbjshd')
}

  getStatisticsData=()=>{
    let studentSession = this.state.studentSession
      const params = new URLSearchParams();
      params.append('period', studentSession.settingsDefaultTiming);
      const options = {
        method: 'GET',
        headers: { 'content-type': 'application/x-www-form-urlencoded','Authorization': `Bearer ${localStorage.getItem('token')}` },
        params: params,
        url : `students/${studentSession.userStudentID}/dashboard`
      };

     
    
    instance(options)
          .then(response => {
            return response;
          })
          .then(res => {
              if(res.data.data === "" || res.data.data.length===0){
                  this.setState({studentOverviewTodayQuestionAverage: 0, studentOverviewTodayQuestionsAnswered: 0})
              }
              else{
                var listArray =[];
                var studentOverviewTodayQuestionsAnswered,studentOverviewQuestionsAnswered
                listArray.push(res.data.data)
                listArray.map((data,index)=>{
                  studentOverviewTodayQuestionsAnswered = data.studentOverviewTodayQuestionsAnswered || 0
                  studentOverviewQuestionsAnswered = data.studentOverviewQuestionsAnswered || 0
                })
                this.setState({studentOverviewTodayQuestionsAnswered:studentOverviewTodayQuestionsAnswered, studentOverviewQuestionsAnswered:studentOverviewQuestionsAnswered})
              }
          })
          .catch(err=>{
            this.setState({studentOverviewTodayQuestionsAnswered:0, studentOverviewQuestionsAnswered:0})
          })
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.onUnload)
    document.removeEventListener("keydown", this.keyDownTextField, false);
  }

  componentWillUpdate() {
    var el = document.getElementById("htmldecode");
    // el.addEventListener("mouseup", this.highlightSelection, false);
    var div1Paras = el.getElementsByTagName("p");
    for (var i = 0; i < div1Paras.length; i++) {
      div1Paras[i].style.fontSize = `${this.state.customFontSize}px`;
  }
  if(this.props.listData == '' || this.props.listData == []){
    HASH_HISTORY.push('/students/questions')
  }
  }

  keyDownTextField = (e) => {
    var keyCode = e.keyCode;
    if (this.state.isToggleOnShortcuts === true) {
      switch(keyCode){
        case 65 : 
        !this.state.isTimerpaused ? this.setState({ user_choice: this.state.current_quiz.itemBankOption1,correct_answer:"A", answerbtnDisable: false }) : null
        break;
        case 66 : 
        !this.state.isTimerpaused ? this.setState({ user_choice: this.state.current_quiz.itemBankOption2,correct_answer:"B", answerbtnDisable: false }) : null
        break;
        case 67 : 
        !this.state.isTimerpaused ? this.setState({ user_choice: this.state.current_quiz.itemBankOption3,correct_answer: "C", answerbtnDisable: false }) : null
        break;
        case 68 : 
        !this.state.isTimerpaused ? this.setState({ user_choice: this.state.current_quiz.itemBankOption4,correct_answer: "D", answerbtnDisable: false }) : null
        break;
        case 69 : 
        !this.state.isTimerpaused ? this.state.current_quiz.itemBankOption5 == null || this.state.current_quiz.itemBankOption5 == '' || this.state.current_quiz.itemBankOption5 == 'NULL' ? null : this.setState({ user_choice: this.state.current_quiz.itemBankOption5,correct_answer:"E", answerbtnDisable: false }) : null
        break;
        case 83:
        return this.stopForNow()
        case 39 : 
        return setTimeout(() => {
          if(!this.state.isTimerpaused){
              if(!this.state.answerbtnDisable){
                 if(!this.state.verifying_answer){
                     this.handleSubmit()
                 }
                 else{
                   this.handleNextQuestion()
                 }
              }
              else{
                null
              }
          }
          else{
            null
          }
          // !this.state.isTimerpaused ? !this.state.answerbtnDisable ? this.state.verifying_answer == false ? this.handleSubmit() : this.handleNextQuestion() : null  : null
        }, 300);
        // case 39 : 
        // return !this.state.isTimerpaused ? !this.state.answerbtnDisable ? this.handleSubmit() : null : null
        
        default : 
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

  toggleVerify = (tab) => {
    if (this.state.activeTabForVerify !== tab) {
      this.setState({
        activeTabForVerify: tab
      });
    }

    if(tab == "2"){
      if(this.state.isToggleOnHighlight){
        let els = document.getElementById("htmldecodes");
        let changeFontSize = els.getElementsByTagName("p");
        for (var i = 0; i < changeFontSize.length; i++) {
          changeFontSize[i].style.fontSize = `${this.state.customFontSize}px`;
      }
      }
    }
  }

  storeDetails=()=>{
    var lapElapsed = this.state.laps.length ? this.state.laps[0].elapsed : 0;
    var lapTime = this.getTimeSpan(this.state.elapsed - lapElapsed)
    var lapElem = { label: lapTime, elapsed: this.state.elapsed };
    this.setState({ laps: [lapElem].concat(this.state.laps) });

    this.setState({getAnsweredTime: lapTime})

    let isAnswered = this.state.isAnswered
    isAnswered.push(this.state.current)

    let storeChoosenAnswers = this.state.storeChoosenAnswers
    storeChoosenAnswers.push(this.state.user_choice)

    this.setState({isAnswered: isAnswered})
    clearInterval(this.state.timer);
    this.setState({
      timer: undefined,
      isStart: false,
      diff: this.state.elapsed,
    });

    var getTotalTime = lapTime;   // your input string
    var convertToSeconds = getTotalTime.split(':'); // split it at the colons

// minutes are worth 60 seconds. Hours are worth 60 minutes.
    var convertedTime = (+convertToSeconds[0]) * 60 * 60 + (+convertToSeconds[1]) * 60 + (+convertToSeconds[2]); 

    const currentdate = moment(Date.now()).format("YYYY-MM-DD")
    let body = JSON.stringify({
      // questionProgressItemBankQuestion: this.state.current_quiz.itemBankQuestion,
      questionProgressItemBankCode: this.state.current_quiz.itemBankCode,
      // questionProgressItemBankId: this.state.current_quiz.itemBankId,
      questionProgressTakenBy: this.state.studentSession.userStudentID,
      // questionProgressItemBankOption1: this.state.current_quiz.itemBankOption1,
      // questionProgressItemBankOption2: this.state.current_quiz.itemBankOption2,
      // questionProgressItemBankOption3: this.state.current_quiz.itemBankOption3,
      // questionProgressItemBankOption4: this.state.current_quiz.itemBankOption4,
      // questionProgressItemBankOption5: this.state.current_quiz.itemBankOption5 || "",
      questionProgressItemBankAnswer:  this.state.current_quiz.itemBankValue,
      questionProgressItemBankStudentanswer: this.state.correct_answer,
      questionProgressTakenDate: currentdate,
      questionProgressItemBankTimeTaken:convertedTime,
      topicId: this.state.current_quiz.itemBankTopicId == "null" ? 0 : this.state.current_quiz.itemBankTopicId ,
      subjectId: this.state.current_quiz.itemBankSubjectId == "null" ? 0 : this.state.current_quiz.itemBankSubjectId,
      subjectName: this.state.current_quiz.itemBankSubject,
      topicName: this.state.current_quiz.itemBankTopic,
      questionProgressItemBankFlagged: this.state.isFlagged,
      questionProgressItemBankAnswerCorrect: this.state.current_quiz.itemBankValue,
      correctAnswer: this.state.current_quiz.itemBankValue
    })

    this.setState({isQuestionLoading: true})
    instance.post(`students/${this.state.studentSession.userStudentID}/questions/progress`,body , {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,        
      }
    })
    .then(result => {
      return result;
    })
    .then(response => {
      let convertToArray = []
      convertToArray.push(response.data.data)
      window.scroll({top: 80, left: 0, behavior: 'smooth' })
      this.setState({isQuestionLoading: false, answerFromResponse: response.data.data.itemBankAnswer, questionResponse: convertToArray,explanation: response.data.data.itemBankDistractorRationale,verifying_answer:true})
    })
    .catch(error => {
      let dummyValue =[{
        averageTimeTakenByAllStudents: 0,
        averageTimeTakenByStudent: 0,
        lawSchoolAverage: 0,
        nationalAverage: 0,
        selectedOptions: null,
        studentAverage: 0
      }]
      this.setState({isQuestionLoading: false, questionResponse: dummyValue,verifying_answer:true})
    });

    this.setState({isFlagged:0})
    this.getStatisticsData()
    this.setState({
      isToggleOnShortcuts:false
    });
  }

  expandeQuestion = () => {
    this.setState({isExpanded: !this.state.isExpanded})
  }

  handleSubmit = () => {
    if (this.state.current + 1 === this.state.allData.length) {
      this.setState({answerbtnDisable:false, endExam: true})
    }
          this.storeDetails()
  };

  handleNextQuestion = (e) => {
    window.scroll({top: 80, left: 0, behavior: 'smooth' })

    if (this.state.current + 1 === this.state.allData.length) {
      this.setState({verifying_answer:true, answerbtnDisable:false, endExam: true})
    }
    else{
      this.setState({
        verifying_answer:false,
        current_quiz: this.state.allData[this.state.current + 1],
        current: this.state.current + 1,
        user_choice: "",
        time_taken: this.state.laps,
        answerbtnDisable: true,
        question_no: this.state.question_no + 1,
        isToggleOnShortcuts:true
      })

      if(this.state.answerFromResponse === this.state.correct_answer){
        this.setState({isAnswerCorrect: this.state.isAnswerCorrect + 1})
      }

        this.initiateTimer()
}
  }

  endExam=()=>{
      HASH_HISTORY.push("/students/questions")
      window.scroll({top: 0, left: 0, behavior: 'smooth' })
  }

  flagQuestion = (current, questionNo) => {

    let storeFlaggedQuestions= this.state.storeFlaggedQuestions;

    let createdFormatforFlagged ={
      questionNo : questionNo,
      itemBankOption1: current.itemBankOption1,
      itemBankOption2: current.itemBankOption2,
      itemBankOption3: current.itemBankOption3,
      itemBankOption4: current.itemBankOption4,
      itemBankOption5: current.itemBankOption5
    }

    const flagPresent = this.state.flagsArray.some(function (el) {
      return (el.questionNo == questionNo);
    });
    flagPresent ? null : this.state.flagsArray.push(createdFormatforFlagged)

    storeFlaggedQuestions[current.itemBankId]= current.itemBankId
    this.setState({isFlagged:1})
  }

  hideTimer = () => {
    this.setState({hideTimer: !this.state.hideTimer})
  };

  handleShortcuts = () => {
    this.setState({isToggleOnShortcuts : !this.state.isToggleOnShortcuts})
  }
  
  handleHighlights = () => {
    this.setState({isToggleOnHighlight: !this.state.isToggleOnHighlight})
  }

  incFontSize = () => {
    if (this.state.customFontSize < 23) {
      this.setState({
        customFontSize: this.state.customFontSize + 1
      })
    }

    let els = document.getElementById("htmldecodes");
    let changeFontSize = els.getElementsByTagName("p");
    for (var i = 0; i < changeFontSize.length; i++) {
      changeFontSize[i].style.fontSize = `${this.state.customFontSize}px`;
  }

  }
  decFontSize = () => {
    if (this.state.customFontSize > 13) {
      this.setState({
        customFontSize: this.state.customFontSize - 1
      })
    }

    let els = document.getElementById("htmldecodes");
    let changeFontSize = els.getElementsByTagName("p");
    for (var i = 0; i < changeFontSize.length; i++) {
      changeFontSize[i].style.fontSize = `${this.state.customFontSize}px`;
  }
  
  }
  resetFontSize = () => {
    this.setState({
      customFontSize: 16
    })
  }

  onSliderChange = (value) => {
    this.setState({customFontSize: value,});
  };

  // enableErrorReport = () => {
  //   this.setState(prevState => ({
  //     isToggleOnShortcuts: !this.state.isToggleOnShortcuts,
  //     modal: !prevState.modal,
  //   }))
  //   if(this.state.verifying_answer){
  //     this.setState({isToggleOnShortcuts: false})
  //   }

  // }

  enableErrorReport = () => {
    this.setState(prevState => ({
      modal: true,
      isToggleOnShortcuts: false
    }))
    if(this.state.verifying_answer){
      this.setState({isToggleOnShortcuts: false})
    }
  }

  closeErrorReport = () => {
    this.setState(prevState => ({
      modal: false,
      isToggleOnShortcuts: this.state.current+1 === this.state.question_no ? true : false
    }))
  }

  toggleModalProps=(value)=>{
    this.setState({modal: value, isToggleOnShortcuts:true})
  }

  stopForNow = () => {
    swal({
      title: language.stopForNow,
      text:
      language.stopForNowMsg,
      icon: "warning",
      buttons: true,
      dangerMode: true,
      className: "msedge_stop_now",
      buttons: ["No", "Yes"],
    }).then(willClose => {
      if (willClose) {
        window.scroll({top: 0, left: 0, behavior: 'smooth' })
          HASH_HISTORY.push("/students/questions")
      } else {
      }
    });
  }

  handleTimer = () => {
    this.setState({ isTimer: !this.state.isTimer })
  }

  directQstnChange = (index,questionclicked) => {
      let isAnswered = this.state.isAnswered;
      let storeChoosenAnswers = this.state.storeChoosenAnswers

        if (storeChoosenAnswers[index] == questionclicked.itemBankOption1) {
          this.setState({
            user_choice: questionclicked.itemBankOption1,
          })
        }else if (storeChoosenAnswers[index] == questionclicked.itemBankOption2) {
          this.setState({
            user_choice: questionclicked.itemBankOption2,
          })
        }else if (storeChoosenAnswers[index] == questionclicked.itemBankOption3) {
          this.setState({
            user_choice: questionclicked.itemBankOption3,
          })
        }else if (storeChoosenAnswers[index] == questionclicked.itemBankOption4) {
          this.setState({
            user_choice: questionclicked.itemBankOption4,
          })
        }
        else if (storeChoosenAnswers[index] === questionclicked.itemBankOption5){
          this.setState({
            user_choice: questionclicked.itemBankOption5,
          })
        }

        isAnswered.filter(data=>{
        if(data == index || this.state.current == index){
          this.setState({
            current_quiz: this.state.allData[index] || this.state.allData[this.state.current],
            disableWhileFlagged: this.state.current == index ? false : true,
            enableResumeButton: this.state.current == index ? false : true,
            isToggleOnShortcuts:this.state.current == index ? true : false,
            isShortcutsDisabled: this.state.current == index ? false : true,
            disableFlag: this.state.current == index ? false : true,
            question_no: index,
            answerbtnDisable: true
          })
        }
      })
  }

  resumePractice=()=>{
    this.setState({current_quiz:this.state.allData[this.state.current],disableWhileFlagged:false,enableResumeButton:false, isToggleOnShortcuts:true, question_no : this.state.current, disableFlag: false})
  }

  showFlags= () => {
    this.setState({
      showFlags : !this.state.showFlags
    })
  }

  selectedAnswer = (option, index) => {

    var choosenLabel = index === 0 ? this.state.labels[0] : index === 1 ? this.state.labels[1] :
      index === 2 ? this.state.labels[2] : index === 3 ? this.state.labels[3] : index === 4 ? this.state.labels[4] : '';

    if (choosenLabel === this.state.current_quiz.itemBankValue) {
      this.setState({ correct_answer: this.state.current_quiz.itemBankValue })
    }
    else {
      this.setState({ correct_answer: choosenLabel, choosenAnswer: choosenLabel })
    }
    this.setState({ user_choice: option, answerbtnDisable: false });
  };

  highlightSelection = () => {
    var selection;

    //Get the selected stuff
    if (window.getSelection)
      selection = window.getSelection();
    else if (typeof document.selection != "undefined")
      selection = document.selection;

    //Get a the selected content, in a range object
    var range = selection.getRangeAt(0);

    this.setState({
      selection: selection,
      range: range
    })
    //If the range spans some text, and inside a tag, set its css class.
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

  stripHtml = (html) => {
    var tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
 }
 
 pauseTimer = () => {
   clearInterval(this.state.timer);
   this.setState({
     isTimerpaused : true,
     timer: undefined,
     isStart: false,
     diff: this.state.elapsed,
   })
 }
 resumeTimer = () => {
  this.initiateTimer()
  this.setState({
    isTimerpaused : false,
   
  })
 }

  render() {
    const choice1 = this.state.current_quiz.itemBankOption1;
    const choice2 = this.state.current_quiz.itemBankOption2;
    const choice3 = this.state.current_quiz.itemBankOption3;
    const choice4 = this.state.current_quiz.itemBankOption4;
    const choice5 = this.state.current_quiz.itemBankOption5;

    const questionchoices = [
      choice1,
      choice2,
      choice3,
      choice4,
      choice5,
    ]

    var filtered = questionchoices.filter(function(entry) { 
      if(entry == null){
        return entry != null
      }else if(entry == undefined){
        return entry != undefined
      }else if(entry == "NULL"){
        return entry != "NULL"
      }else if(entry == ''){
        return entry != ''
      }else if(entry == '<p></p>'){
        return entry != '<p></p>'
      }else if(entry == '<p>NULL</p>'){
        return entry != '<p>NULL</p>'
      }else{
        return /\S/.test(entry); 
      }
    });

    var self = this;
    var choices = filtered.map(function (choice, index) {
      var classType = "";
      var selectedOne = "";

      if (self.state.verifying_answer) {
        if (choice === self.state.current_quiz.answer) {
          classType = "text-success";
        } else if (
          choice === self.state.user_choice &&
          self.state.user_choice != self.state.current_quiz.answer
        ) {
          classType = "text-danger";
        }
      }

      return (
        <RadioInput
          key={choice}
          choice={choice}
          index={index}
          labels={self.state.labels}
          onChoiceSelect={self.selectedAnswer}
          highlightSelection={self.highlightSelection}
          isToggleOnHighlight={self.state.isToggleOnHighlight}
          disable={self.state.verifying_answer}
          disableWhileFlagged={self.state.disableWhileFlagged}
          classType={classType}
          selection={self.state.user_choice}
          customFontSize={self.state.customFontSize}
          stripHtml = {self.stripHtml}
          isShortcuts={self.state.isToggleOnShortcuts}
          isQuestionLoading = {self.state.isQuestionLoading}
        />
      );
    });

    var isFlagMarked = false
    this.state.storeFlaggedQuestions.filter(data=>{
      if(data== this.state.current_quiz.itemBankId){
        isFlagMarked=true
      }
    })

    var button_name = !this.state.verifying_answer ? "ANSWER" : "NEXT QUESTION";
    
    var isNullresponseforChart = false
   let studentResponse = this.state.questionResponse.map((data,index)=>{
     if(data.selectedOptions == null){
       isNullresponseforChart= true
     }
     else{
      var selectedOptionA= data.selectedOptions == null ? 0: data.selectedOptions.A;
      var selectedOptionB= data.selectedOptions == null ? 0: data.selectedOptions.B;
      var selectedOptionC= data.selectedOptions == null ? 0: data.selectedOptions.C;
      var selectedOptionD= data.selectedOptions == null ? 0: data.selectedOptions.D;
      var selectedOptionE= data.selectedOptions == null ? 0: data.selectedOptions.E;
      return [selectedOptionA, selectedOptionB,selectedOptionC,selectedOptionD,selectedOptionE]
     }
    })


    const barChartData = {
      labels: ['A', 'B', 'C', 'D', 'E'],
      datasets: [
        {
          fill: true,
          backgroundColor: '#006EBD',
          label: 'Options',
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          borderCapStyle: 'round',
          pointHitRadius: 10,
          data: studentResponse[0]
        }
      ]
    };


    var questionNo = this.state.enableResumeButton ? this.state.question_no + 1 : this.state.current + 1
    return (
      <div className="msedge-mcq-section">
                                    <ReactCSSTransitionGroup
                                component="div"
                                transitionName="TabsAnimation"
                                transitionAppear={true}
                                transitionAppearTimeout={0}
                                transitionEnter={false}
                                transitionLeave={false}>
        <Col xs="12" sm="12" md="12" lg="12" xl="12" style={{ marginTop: "30px" }}>
          <Row className="msedge-exam-header">
<Col className="pr-0" xs="12" sm="12" md={this.state.isExpanded === true ? '12' : '7'} lg={this.state.isExpanded === true ? '12' : '8'} xl={this.state.isExpanded === true ? '12' : '8'}>
                
                <div className={`${this.state.isExpanded === false ? "": "mb-3"}`}>

                  {this.state.verifying_answer === true ?
                    <div className="your-answer col-md-12 msedge-questions-correct-or-incorrect-segment">
                      {this.state.answerFromResponse == this.state.correct_answer ? <div className="correct">
                        <Col xs="12" sm="12" md="12" lg="12" xl="12" className="p-0">
                          <h6 style={{ color: "#006EBD" }}><FontAwesomeIcon icon={faCheckCircle} color="#65D259" /> {language.your_question}</h6>
                        </Col>
                      </div> :

                        <div className="wrong">
                          <Col xs="12" sm="12" md="12" lg="12" xl="12" className="p-0">
                            <h6><FontAwesomeIcon icon={faExclamationTriangle} color="#b80404" /> {language.your_incorrect}</h6>
                          </Col>

                        </div>}
                    </div> : ''}
                </div>
                <div className="question-overlay-main">
                  {this.state.isTimerpaused ? <div class="overlay-body">
                <button className="question-overlay" onClick={this.resumeTimer}>
                      <i className="pe-7s-play"></i>
                      <h6>{language.resume}</h6>
                   
                  </button>
                </div> : ''}
                
                  
                <div className="msedge-question-choice-section">
                  {this.state.verifying_answer === true ? <div className="verify-answer-true">
                    <Card tabs="true" className="mb-3">
                      <CardHeader>
                        <Nav justified>
                          <NavItem>
                            <NavLink href="javascript:void(0);"
                              className={classnames({ active: this.state.activeTabForVerify === '1' })}
                              onClick={() => {
                                this.toggleVerify('1');
                              }}
                            >
                              Explanation
                          </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink href="javascript:void(0);"
                              className={classnames({ active: this.state.activeTabForVerify === '2' })}
                              onClick={() => {
                                this.toggleVerify('2');
                              }}
                            >
                              {language.question}
                          </NavLink>
                          </NavItem>

                        </Nav>

                        <div className="msedge-set-flag">
                            <div className="msedge-attention-icon">
                              <UncontrolledTooltip placement="top" target="errors">
                                {language.error}
                          </UncontrolledTooltip>
                              <i className="pe-7s-attention" onClick={this.enableErrorReport} id="errors"></i>
                              <i id={this.state.current_quiz} className="pe-7s-flag" style={{ color: isFlagMarked === true ? 'red' : '', pointerEvents: this.state.disableFlag ? 'none' : 'unset', cursor: this.state.disableFlag ? 'not-allowed' : 'pointer' }}  onClick ={()=> isFlagMarked === true ? this.removeFlag(this.state.current_quiz): this.flagQuestion(this.state.current_quiz,questionNo)}  id="flag"></i>
                              <UncontrolledTooltip placement="top" target="flag">
                                {language.flag}
                          </UncontrolledTooltip>
                          {this.state.isExpanded ? <i className="pe-7s-angle-right" onClick={this.expandeQuestion}/> : ""}
                            </div>
                          </div>

                      </CardHeader>
                      <CardBody>

                        <TabContent activeTab={this.state.activeTabForVerify}>
                          <TabPane tabId="1">
                            {this.state.isToggleOnHighlight ?
                             <div id="htmldecode" className="msedge-questions-question-tab" onMouseUp={this.highlightSelection} dangerouslySetInnerHTML={{__html: this.state.explanation}}></div>
                           : 
                           <div id="htmldecode" className="msedge-questions-question-tab" dangerouslySetInnerHTML={{__html: this.state.explanation}}></div>
                            }
                             </TabPane>
                          <TabPane tabId="2">
                              {this.state.isToggleOnHighlight?
                              <div id="htmldecodes" className="msedge-questions-question-tab" onMouseUp={this.highlightSelection} dangerouslySetInnerHTML={{__html: this.state.current_quiz.itemBankQuestion}}></div>
                                                        :
                                                        <div id="htmldecodes" className="msedge-questions-question-tab"  dangerouslySetInnerHTML={{__html: this.state.current_quiz.itemBankQuestion}}></div>
                            }


                          </TabPane>

                        </TabContent>

                      </CardBody>
                    </Card>
                  </div> : <div className="msedge-question-section mb-0">
                    <Row>
                    <Col md="12" xs="12" lg="12" xl="12" sm="12" className="msedge-practiseexam-border">
                      <div  className="container-fluid pr-0">
                        <Row>
                        <Col xs="9" sm="9" md="9" lg="9" xl="9">
                      {this.props.isQuestionNoChoosed ?
                      <Row>
                            <Col md="1" className="msedge-qus-sub">
                            <Row className="float-left">
                            <h6>#{this.state.enableResumeButton ? this.state.question_no + 1 : this.state.current + 1}</h6>
                            </Row>
                          </Col>
                          <Col md="11" className="msedge-qus-sub">
                            <Row>
                      {this.state.enableResumeButton ? <h6>
                        {this.state.allData[this.state.question_no].itemBankSubject} / <span className="msedge-sub-style">{this.state.allData[this.state.question_no].itemBankTopic}</span></h6> : <h6>
                        {this.state.current_quiz.itemBankSubject} / <span className="msedge-sub-style">{this.state.current_quiz.itemBankTopic}</span></h6>}
                     
                      </Row>
                      </Col>
                          </Row>
                      : ""}
                        </Col>
                        <Col xs="3" sm="3" md="3" lg="3" xl="3" className="pr-0 msedge-qus-flag" >
                          <div className="msedge-set-flag">
                            <div className="msedge-attention-icon">
                              <UncontrolledTooltip placement="top" target="errors">
                                {language.error}
                          </UncontrolledTooltip>
                              <i className="pe-7s-attention" onClick={this.enableErrorReport} id="errors"></i>
                              <i id={this.state.current_quiz} className="pe-7s-flag" style={{ color: isFlagMarked === true ? 'red' : '', pointerEvents: this.state.disableFlag ? 'none' : 'unset', cursor: this.state.disableFlag ? 'not-allowed' : 'pointer' }}  onClick ={()=> isFlagMarked === true ? this.removeFlag(this.state.current_quiz): this.flagQuestion(this.state.current_quiz, questionNo)}  id="flag"></i>
                              <UncontrolledTooltip placement="top" target="flag">
                                {language.flag}
                          </UncontrolledTooltip>
                          {this.state.isExpanded ? <i className="pe-7s-angle-right" onClick={this.expandeQuestion}/> : ""}
                            </div>
                          </div>
                        </Col>
                      </Row >
                      </div>
                      </Col>
                      <div className="question-paragraph container-fluid">
                        {this.state.isToggleOnHighlight ? 
                                                        <div id="htmldecode" onMouseUp={this.highlightSelection} dangerouslySetInnerHTML={{__html: this.state.current_quiz.itemBankQuestion}}></div>
                                                         :
                                                        <div id="htmldecode" dangerouslySetInnerHTML={{__html: this.state.current_quiz.itemBankQuestion}}></div>
                        }
                      </div>
                      </Row>
                    </div>}

                  <div className="msedge-choice-section" style={{ fontSize: `${this.state.fontSize}px` }}>
                    {choices}
                  </div>
                </div>
                </div>
                <div className="msedge-ques-btn-sec">
                  <Col xs="12" sm="12" md="12" lg="12" xl="12" className="p-0">
                    <Row className="m-0">
                      <Col xs="6" sm="6" md="6" lg="6" xl="6" className="p-0 stop msedge-questions-start msedge-stop-btn">
                        <Button onClick={this.stopForNow} disabled={this.state.endExam}>
                          <li><FontAwesomeIcon icon={faSquare} size="1x" /></li>
                          <li>{language.stop}</li></Button>
                      </Col>
                      <Col xs="6" sm="6" md="6" lg="6" xl="6" className="p-0 answer msedge-questions-start msedge-next-btn">
                          {this.state.endExam  && !this.state.answerbtnDisable?
                          <Button onClick={this.endExam}>
                            <li><FontAwesomeIcon icon={faArrowRight} size="1x" /></li>
                            <li>{language.end_practice}</li>
                            </Button>
                        : 
                        this.state.enableResumeButton ?
                        <Button onClick={this.resumePractice}>
                        <li><FontAwesomeIcon icon={faPlay} size="1x" /></li>
                        <li>{language.resume_practice}</li>
                          </Button>
                          :

                          this.state.isQuestionLoading ?
                          <button
                              type="button"
                              disabled
                              className="btn btn btn-secondary"
                            >
                              <li><span
                                className="spinner-border spinner-border-sm mr-2"
                                role="status"
                                aria-hidden="true"
                              ></span></li>
                            <li className="text-uppercase"> {language.buttonLoading}</li>
                            </button>
                            :
                        <Button onClick={this.state.verifying_answer ? this.handleNextQuestion: this.handleSubmit} disabled={this.state.answerbtnDisable || this.state.isTimerpaused ? true :false} style={{cursor: this.state.answerbtnDisable ? "not-allowed": ""}}>
                          <li><FontAwesomeIcon icon={faArrowRight} size="1x" /></li>
                          <li>{button_name}</li>
                        </Button>
                         }
                      </Col>

                    </Row>
                  </Col>
                </div>
              </Col>
            
            <Col xs="12" sm="12" md="5" lg="4" xl="4" className="msedge-performance-settings m-0" style={{ display: this.state.isExpanded === true ? 'none' : 'block' }}>
              <Card tabs="true" className="mb-3">
                <CardHeader>
                  <Nav justified>
                    <div className="msedge-expand-toggle" onClick={() => {
                      this.expandeQuestion()
                    }}>
                      <h4 className="msedge-double-right-icon"> <FontAwesomeIcon icon={faArrowRight} size="1x" /> </h4>
                    </div>
                    {this.state.verifying_answer === false ? <NavItem style={{ background: this.state.activeTab === "1" ? '#006EBD' : '#ffffff', padding: "4px 0" }}>
                      <NavLink
                        id="timer1"
                        onClick={() => {
                          this.toggle("1");
                        }}
                      >

                        <img src={this.state.activeTab === "1" ? infoWhite : infoBlue} alt="icon" />
                        <UncontrolledTooltip placement="top" target="timer1">
                          {language.timer}
                        </UncontrolledTooltip>
                      </NavLink>
                    </NavItem> : <NavItem style={{ background: this.state.activeTab === "1" ? '#006EBD': '#ffffff', padding: "4px 0" }}>
                        <NavLink
                          id="clock1"
                          onClick={() => {
                            this.toggle("1");
                          }}
                        >
                          <img src={this.state.activeTab === "1" ? performWhite : performBlue} alt="clock" />
                          <UncontrolledTooltip placement="top" target="clock1">
                            {language.performance}
                        </UncontrolledTooltip>
                        </NavLink>
                      </NavItem>}

                    <NavItem style={{ background: this.state.activeTab === "2" ? '#006EBD' : '#ffffff', padding: "4px 0" }}>
                      <NavLink
                        id="settings1"
                        onClick={() => {
                          this.toggle("2");
                        }}
                      >
                        <img src={this.state.activeTab === "2" ? settingsWhite : settingsBlue} alt="setting" />
                        <UncontrolledTooltip placement="top" target="settings1">
                        {language.settings}
                        </UncontrolledTooltip>
                      </NavLink>
                    </NavItem>
                  </Nav>
                </CardHeader>
                <CardBody>
                  <TabContent activeTab={this.state.activeTab}>
                    {this.state.verifying_answer === false ? <TabPane tabId="1">
                      <div className="timer-tab msedge-qa-timertab">
                      {this.props.isTimer ?
                        <div className="timer">
                          <Row className="m-0">
                            <Col xs="6" sm="6" md="6" lg="6" xl="6" className="text-left p-0">
                              <h4 className="m-0">{language.timer}</h4>
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
                                <p>{language.hide}</p>
                              </div>
                            </Col>
                          </Row>
                          {this.state.isTimer === true ? (
                            " "
                          ) : (
                              <div>
                                <h1>{this.getTimeSpan(this.state.elapsed)}</h1>
                              </div>
                            )}
                            <div>
                          <Button className="btn btn btn-primary" onClick={this.state.isTimerpaused ? this.resumeTimer : this.pauseTimer}>{this.state.isTimerpaused ? 'Resume' : 'Pause'}</Button>
                            </div>
                        </div> : ""}
                        <div className="timer-tab-questions">
                          <Col xs="12" sm="12" md="12" lg="12" xl="12" className="p-0">
                            <Row>
                              <Col md="6" className="msedge-flag-btn">
                              <h4 className="text-left m-0">{language.questions}</h4>
                              </Col>
                              <Col xs="6" sm="6" md="6" lg="6" xl="6">
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
                                  <p>{language.flag}</p>
                                </div>
                              </Col>
                            </Row>
                            
                            <div className='enable-options'>
                              <Col xs="12" sm="12" md="12" lg="12" xl="12" className="total-questions-intigator">

                              {this.state.showFlags === true ? <div>
                                  {typeof this.state.flagsArray !== 'undefined' && this.state.flagsArray.length > 0   ? this.state.flagsArray.map((data, index) => {
                                return <p key={index} className={`no-of-questions-list`} onClick={() => this.directQstnChange(data.questionNo-1, data)}
                                  className={this.state.isAnswered[index] === index? 'msedge-students-answered-questions' :'' }
                                  style={{cursor: 'pointer'}}
                                  >{data.questionNo}</p>
                                  }) : 'There is no flagged questions'}

                                </div> : <div>
                                {this.state.allData.map((question, index) => {
                                  return <p
                                  onClick={() => this.directQstnChange(index,question)}
                                  className={this.state.isAnswered[index] === index? 'msedge-students-answered-questions' :'' }
                                  style={{
                                  color: this.state.current_quiz.itemBankId === question.itemBankId ? '#006EBD' : '#252525',
                                  border: this.state.storeFlaggedQuestions[question.itemBankId] == question.itemBankId ? "1px solid red" : "",
                                  // border: this.state.storeFlaggedQuestions.includes(question.itemBankId) ? "1px solid red" : "",
                                  cursor: "pointer" }}>
                                  {index + 1}</p>
                                })}
                                </div>}
                              </Col>

                            </div>

                          </Col>


                        </div>

                        <div className="status">
                          <Table>

                            <tbody>

                              <tr> 
                                <td>{this.state.studentOverviewTodayQuestionsAnswered}</td>
                                <td>{this.state.studentOverviewQuestionsAnswered}</td>
                                <td>{`${this.state.isAnswerCorrect  + '/' +  this.state.isAnswered.length}`}</td>
                              </tr>
                              <tr>
                                <td>{language.today}</td>
                                <td>{language.overall}</td>
                                <td>{language.current_session}</td>
                              </tr>
                            </tbody>
                          </Table>
                        </div>

                      </div>
                    </TabPane> : 
                    
                    <TabPane tabId="1">
                      {this.state.questionResponse.map((data,index)=>{
                        return(
                      <div className="msedge-data-loading-segment">
                        <div className="performance">
                          <h4 className="pl-2">{language.performance}</h4>
                          <Table>

                            <tbody>
                              <tr>
                                <td>{Math.round(data.studentAverage)}</td>
                                <td>{Math.round(data.lawSchoolAverage)}</td>
                                <td>{Math.round(data.nationalAverage)}</td>
                              </tr>
                              <tr>

                              <td>{language.your_average}</td>
                                <td>{language.law_average}</td>
                                <td>{language.all_average}</td>
                              </tr>
                            </tbody>
                          </Table>
                        </div>
                        <div className="msedge-timing">
                          <div className="msedge-timing-content-performance">
                            <h4>{language.stud_settings_timing}</h4>
                            <li>
                              <li>{language.your_time} </li>
                              <p>{language.your_answer} {this.state.getAnsweredTime.split(":")[1] + ' ' + "min" + ' ' + this.state.getAnsweredTime.split(":")[2] + ' ' + "sec"}</p>
                            </li>

                          </div>
                        </div>
                        <div className="chart">
                          <h4 className="p-2 ml-0">{language.student_response}</h4>
                          {isNullresponseforChart ? 
                                <h6 className="text-center msedge-setting-time-information py-3">No data found</h6>
                                :
                          <Bar
                            data={barChartData}
                            width={100}
                            height={100}
                            responsive={true}
                            options={{
                              maintainAspectRatio: true
                            }}
                      /> }
                        </div>
                      </div>
                        )
                      })
                     }
                      </TabPane>
                    }

                    <TabPane tabId="2">
                      <div className="settings-tab">
                        <div className="font-size">
                          <h4>{language.font_size}</h4>
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
                                  <Col md="4" lg="4" xl="4" sm="12" xs="12" className="text-center p-0 my-2">
                                    <button className="inc-font" onClick={this.decFontSize}>-</button>
                                  </Col>
                                  <Col md="4" lg="4" xl="4" sm="12" xs="12" className="text-center p-0 my-2">
                                    <button className="inc-font" onClick={this.resetFontSize}>RESET</button>
                                  </Col>
                                  <Col md="4" lg="4" xl="4" sm="12" xs="12" className="text-center p-0 my-2">
                                    <button className="inc-font dec-font" onClick={this.incFontSize}>+</button>
                                  </Col>
                                </Row>
                              </Col>
                            </Row>

                          </div>

                        </div>
                        <div className="short-cuts">
                          <h4>{language.keyboard_shrtcuts}</h4>
                          <div>
                            <Row>
                              <Col md="8">{this.state.isToggleOnShortcuts ? "Shortcuts enabled" : "Shortcuts disabled"}</Col>
                              <Col md="4" className="msedge-exam-switch">
                                <Switch
                                  checked={this.state.isToggleOnShortcuts}
                                  onChange={this.handleShortcuts}
                                  disabled={this.state.verifying_answer || this.state.isShortcutsDisabled ? true : false}
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
                              </Col>
                            </Row>
                            <Row>
                              <Col md="8" className="mt-2">{language.submit}</Col>
                              <Col md="4"><li><FontAwesomeIcon icon={faArrowRight}/></li></Col>
                            </Row>
                            <Row>
                              <Col>{language.select_option}
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
                              <Col md="8" className="mt-2">{language.stop}</Col>
                              <Col md="4"><li>S</li></Col>
                            </Row>
                            <Row>
                              <Col md="8" className="mt-2">{language.next}</Col>
                              <Col md="4"><li><FontAwesomeIcon icon={faArrowRight}/></li></Col>
                            </Row>
                          </div>
                        </div>
                        <div className="highlight">
                          <h4>{language.enable_highlights}</h4>
                          <div>
                            <Row>
                              <Col md="8">{this.state.isToggleOnHighlight ? "Highlight enabled" : "Highlight disabled"}</Col>
                              <Col md="4" className="msedge-exam-switch">
                                <Switch
                                  checked={this.state.isToggleOnHighlight}
                                  onChange={this.handleHighlights}
                                  disabled={this.state.verifying_answer ? true : false}
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
                              </Col>
                            </Row>
                            <Col className="highlight-hints"><span>{language.double_click_text}</span>{language.to_highlight}</Col>
                            <Col className="highlight-hints"><span>{language.click}</span>{language.to_remove_highlight}</Col>
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
                <ErrorReport enableErrorReport={this.enableErrorReport} modal={this.state.modal} itemBankSubject={this.state.current_quiz.itemBankSubject} itemBankTopic={this.state.current_quiz.itemBankTopic} itemBankQuestion={this.state.current_quiz.itemBankQuestion} itemBankCode={this.state.current_quiz.itemBankCode} subjectId = {this.state.current_quiz.itemBankSubjectId} topicId={this.state.current_quiz.itemBankTopicId} keyDownTextField={this.keyDownTextField} toggleModalProps = {this.toggleModalProps} closeModal = {this.closeErrorReport}/> 
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    shortcutEnabled : state.main.enable
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    enableKeyboard
  }, dispatch)
};
export default connect(mapStateToProps, mapDispatchToProps)(Questions)