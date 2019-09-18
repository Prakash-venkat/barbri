import React, {Fragment} from 'react';
import {Route, Switch} from 'react-router-dom';

// Componets

import Overview from './overview/index'


import PracticeExam from './exams/practiceExam/index'
import ExamReports from './exams/examReports/index'
import ExamPerformanceSubject from './exams/examPerformance/subject/index'
import ExamPerformanceTiming from './exams/examPerformance/timing/index'
import ExamPerformancePast from './exams/examPerformance/pastPerformance/index'

import Questions from './questions/questions/index'
import QuestionsProgress from './questions/questionsProgress/index'

import VideoLectures from './videoLectures/index'

import Messages from './messages/index'

import Support from './support/index'
import QuestionAndAnswers from './questions/questions/q&a/index'
import examQuestion from './exams/practiceExam/q&a/index'

// Layout

import AppHeader from './Layout/AppHeader/Header';
import AppSidebar from './Layout/AppSidebar/';
import AppFooter from './Layout/AppFooter/';

// Theme Options

import ThemeOptions from './Layout/ThemeOptions/';

import SupportNext from './support/supportNext';

const Student = ({match}) => (
    <Fragment>
        <div className="app-main">
            <AppSidebar/>

            <div className="app-main__outer">

                <div className="app-main__inner">
                <AppHeader />
                    <Switch>
                      <Route exact path={`${match.url}/`}    component={Overview} exact={true}/>
                      <Route path={`${match.url}/exam-practice`} component={PracticeExam} exact={true}/>
                      <Route path={`${match.url}/exam-reports`} component={ExamReports} exact={true}/>
                      <Route path={`${match.url}/exam-performance-subject`} component={ExamPerformanceSubject} exact={true}/>
                      <Route path={`${match.url}/exam-performance-timing`} component={ExamPerformanceTiming} exact={true}/>
                      <Route path={`${match.url}/exam-performance-past`} component={ExamPerformancePast} exact={true}/>
                      <Route path={`${match.url}/questions`} component={Questions} exact={true}/>
                      <Route path={`${match.url}/questions-progress`} component={QuestionsProgress} exact={true}/>
                      <Route path={`${match.url}/video-lectures`} component={VideoLectures} exact={true}/>
                      <Route path={`${match.url}/inbox`} component={Messages} exact={true}/>
                      <Route path={`${match.url}/get-help`} component={Support} exact={true}/>
                      <Route path={`${match.url}/support-next`} component={SupportNext} exact={true}/>
                      <Route path={`${match.url}/question-answers`} component={QuestionAndAnswers} exact={true}/>
                      <Route path={`${match.url}/exam-question`} component={examQuestion}exact={true}/>
                     

                    </Switch>
                    
                    

                </div>
                <AppFooter/>
            </div>
        </div>
    </Fragment>
);

export default Student;