import React, { Component } from 'react';
// import { Header } from '../../student/DemoPages/Home/Components/Component/header';
import { Statics } from './utils/statics';
import { PerformanceChart } from './utils/performanceChart';
import { PerformanceOverTimeChart } from './utils/PerformanceOverTimeChart';
import { ExamDetails } from './utils/examDetails';
import { ExamReports } from '../../student/overview/utils/ExamReports';
import PageTitle from "../Layout/AppMain/PageTitle"

export class Home extends Component {
    render() {
        const headers = ['Dashboard'];
        const subheader = ['Dashboard']

        const header = [
            'Welcome', 'Registrations in Quarter', 'Quarter Statistics', 'Errors Reported'
        ];
        const contentHeader = [
            'Total Law School', 'Total Student', 'Law schools', 'Students', 'Exams taken', 'Questions reviewed', 'New errors reported', 'Errors pending'
        ];
        const data = [
            {
                totalLawSchool: 87,
                totalStudent: 1487,
                average: 62,
                questionsAnswered: 1254,
                overallAverage: 68,
                overaAllquestionsAnswered: 1267,
                allstudentOverallAverage: 61,
                allstudentQuestionsAnswered: 1234
            }
        ]
        const message = ['Lorem ipsum dolor sit']

        const ExamDetailsHeader = [
            'Incomplete exam(s)', 'New messages', 'Newly added video', 'support@barbri.com'
        ];
        const ExamDetailsData = [
            {
                incompleteExam: 17,
                newMessages: 1254,
                newlyAddedVideo: 68.5,
                supportEmail: '789-5487-965'
            }
        ];
        const ExamDetailsMessage = ['Lorem ipsum dolor sit amet,consectetur adipiscing elit,'];
        return (
            <div className="container-fluid admin-dashboard">
                {/* // <Header header={headers} subheader={subheader} /> */}
                <PageTitle
                    heading="OVERVIEW"
                    subheading="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
                    brdcrumptwo="Overview"
                />
                <Statics header={header} contentHeader={contentHeader} data={data} message={message} />
                <div className="row performance-pie-chart">
                    <div className="col-md-8 col-xs-12">
                        <PerformanceChart />
                    </div>
                    <div className="col-md-4">
                        <ExamDetails examDetailsData={ExamDetailsData} examDetailsHeader={ExamDetailsHeader} message={ExamDetailsMessage} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 col-xs-12">
                        <PerformanceOverTimeChart />
                    </div>
                </div>
                <ExamReports />
            </div>
        )
    }
}

export default Home
