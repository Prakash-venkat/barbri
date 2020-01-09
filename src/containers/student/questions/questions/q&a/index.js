import React, { Component } from "react";
import PageTitle from "../../../../layout/AppMain/PageTitle";
import Questions from "./questions";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { questions } from '../../../../../actions/actionMain';
import {language} from "../../../../../utils/locale/locale";

class QuestionAnswer extends Component {
  render() {
    return (
      <div className="msedge-question-and-answers">
        <PageTitle
          heading={language.questions}
          brdcrumptwo={language.questions}
          brdcrumpthree={language.practice_questions}
        />

        <div className="row">
          <div className="container-fluid bg-grey msedge-qa-container">
            <Questions {...this.props}/>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listData: state.main.questions,
    isTimer: state.main.timer,
    isQuestionNoChoosed: state.main.questionNo,
    questionResponse: state.main.questionResponse,
    isQuestionLoading: state.main.load
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    questions,
  }, dispatch)
};
export default connect(mapStateToProps, mapDispatchToProps)(QuestionAnswer)
