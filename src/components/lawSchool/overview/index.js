import React, { Component } from 'react';
import { Statics } from './utils/statics';
import { PerformanceChart } from './utils/performanceChart';
import { PerformanceOverTimeChart } from './utils/performanceOverTimeChart';
import { ExamDetails } from './utils/examDetails';
import { ExamReports } from '../../student/overview/utils/ExamReports';
import PageTitle from "../Layout/AppMain/PageTitle"

export class Home extends Component {
    render() {
        const header = ['Dashboard'];
        const subheader = ['Dashboard'];
        const contentHeader = [
            'Today', 'Your overall statistics', 'All student statistics'
        ];
        const contentHeaderData = [
            'Average', 'Questions answered', 'Overall average', 'Questions answered', 'Overall average', 'Questions answered'
        ];
        const staticsData = [
            {
                average: '62.3%',
                questionsAnswered: 1254,
                overallAverage: '68.5%',
                overaAllquestionsAnswered: 1267,
                allstudentOverallAverage: '61.8%',
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
        ]
        const ExamDetailsMessage = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit,']

        return (
            <div className="overview-section">
                <div className="container-fluid ">
                <PageTitle
                    heading="OVERVIEW"
                    subheading="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
                    brdcrumptwo="Overview"
                />
                </div>
                <div className="container-fluid law-school-dashboard">
                    {/* <Header header={header} subheader={subheader} /> */}

                    <Statics header={contentHeader} contentHeader={contentHeaderData} data={staticsData} message={message} />
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
            </div>
        )
    }
}

export default Home
