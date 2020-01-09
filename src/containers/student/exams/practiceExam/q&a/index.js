import React, { Component } from "react";
import { Button, Col } from "reactstrap";
import { connect } from "react-redux";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlay,faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import swal from "sweetalert";

import {instance, HASH_HISTORY} from "../../../../../actions/constants"

import Questions from "./questions";
import PageTitle from "../../../../layout/AppMain/PageTitle";

import { language } from '../../../../../utils/locale/locale'

library.add(faPlay);


export class QuestionAnswer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      instruction: true,
      data: [],
      examId : '',
      examName : '',
      duration : '',
      examTakenAt : '',
      disbaleButton : false,
    };
  }
  componentDidMount() {
    const examId = this.props.location.id
      ? this.props.location.id
      : this.props.listData.examId;
    const examName = this.props.location.id
      ? this.props.location.examName
      : this.props.listData.examName; 
    // const duration =   this.props.location.id
    // ? this.props.location.examDuration
    // : this.props.listData.examDuration;
    
    const examDate = this.props.location.id
    ? this.props.location.examTakenAt
    : this.props.listData.examTakenAt; 
    
    this.setState({
      examId : examId,
      examName : examName,
      // duration : duration,
      examTakenAt : examDate,
      disbaleButton : true
    })

    const params = new URLSearchParams();
    params.append('from', 'exams');
    const options = {
      method: 'GET',
      headers: { 'content-type': 'application/x-www-form-urlencoded' , 'Authorization': `Bearer ${localStorage.getItem('token')}`},
      params: params,
      url : `exams/${examId}/details`
    };
    
    instance(options)
      .then(response => {
        return response;
      })
      .then(response => {
        if(response.status === 200){
          
           if(typeof response.data.data !== "undefined" &&
           response.data.data.length > 0){
            const dataForOngoing = response.data.data.map((data, index) => data.examDetailIncompleteFlag === 'n' ? data.examItemTimeTaken : 0)

            var res = dataForOngoing.map(function(v) {
              return parseInt(v, 10);
            });
            const previousExamTakenTime =  res.reduce((a, b) => a + b, 0)
            const duration =   this.props.location.id
        ? this.props.location.examDuration
        : this.props.listData.examDuration;
            const minToSec = duration * 60;
            const totalTimeInSec = minToSec - previousExamTakenTime;
            const totalTimeinMin =Math.floor(totalTimeInSec / 60);
            this.setState({
              disbaleButton : false,
              data: response.data.data,
              duration : totalTimeInSec 
            });
           }else{
            swal({
              text:language.errorcreatedexam,
              icon:"error",
              className: "msedge_stop_now"
            })
            .then(willClose => {
              window.addEventListener("beforeunload", this.clearStorage)
              if (willClose) {
                window.location.href = '/#/students/exam-practice'
              }
            });
           }
        
          
        }else{
          HASH_HISTORY.push('/students/exam-practice')
        }
       
      })
      .catch((err) => {
        HASH_HISTORY.push('/students/exam-practice')
      });
  }
  InstructionOff = () => {
    this.setState({ instruction: false });
  };
  render() {
    return (
      <div className="msedge-question-and-answers" onContextMenu="return false;">
        <PageTitle
          heading={language.practice_exam}
          brdcrumptwo={language.practice_exam}
          brdcrumpthree="Main"
        />
        <div className="row">
          {this.state.instruction === true ? (
            <div className="container-fluid bg-grey ptb-30">
              <div className="instructions col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <h2 className="msedge-exam-instruction">{language.instructions}</h2>
                <p className="msedge-qa-bg-container">
                {language.instruction_first}

<p className="mt-2">For purposes of the MBE, you are to assume the application of (1) the Federal
Rules of Civil Procedure as currently in effect and (2) the sections of Title 28
of the U.S. Code pertaining to trial and appellate jurisdiction, venue, and
transfer. You are to assume that the official text of Articles 1 and 2 of the
Uniform Commercial Code have been adopted and are in effect. The terms
"Constitution," "constitutional," and "unconstitutional" refer to the federal
Constitution unless indicated to the contrary. All Evidence questions should be
answered according to the Federal Rules of Evidence, as currently in effect.
You are to assume that survival actions and claims for wrongful death are
available. Joint and several liability, with pure comparative negligence, is the
relevant rule unless otherwise indicated.</p>
                </p>

               
                <div className="msedge-questions-start mt-3">
                <Col xs="12" sm="12" md="12" lg="12" xl="12">
                  <Button
                    type="submit"
                    className="btn"
                    onClick={this.InstructionOff}
                    disabled={this.state.disbaleButton}
                  >
                    <li>
                      <FontAwesomeIcon icon={faPaperPlane} size="1x" />
                    </li>
          <li>{language.continue}</li>
                  </Button>
                </Col>
              </div>
              </div>
            </div>
          ) : (
            <div className="container-fluid bg-grey p-30">
              <div className="question-and-answers">
                <Questions {...this.props} data={this.state.data} examId={this.state.examId} examName={this.state.examName} duration={this.state.duration} examDate = {this.state.examTakenAt}/>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    listData: state.main.questions
  };
};

export default connect(mapStateToProps)(QuestionAnswer);
