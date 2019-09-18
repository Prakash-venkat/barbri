import React, { Component } from 'react'
import { Header } from './utils/header'
import { Statics } from './utils/statics'
import { PerformanceChart } from './utils/performanceChart'
import { PerformanceOverTimeChart } from './utils/performanceOverTimeChart'
import { ExamDetails } from './utils/examDetails'
import { ExamReports } from './utils/examReports'
import { Loader } from '../Loader/loader'
import PageTitle from "../Layout/AppMain/PageTitle"

export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            performanceOverTime: true,
            isLoading: true
        };
    }

    componentDidMount() {
        this.setState({
            isLoading: false
        });
    }
    render() {
        const header = ['Dashboard'];
        const subheader = ['Dashboard']
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
        const ExamDetailsMessage = ['Lorem ipsum dolor sit amet,consectetur adipiscing elit,']
        return (

            <div className="container-fluid student-dashboard">
                <div>
                    {this.state.isLoading ? (<Loader />) : null}
                </div>
                <PageTitle
                    heading="OVERVIEW"
                    subheading="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
                    brdcrumptwo="Overview"
                />
                <Statics header={contentHeader} contentHeader={contentHeaderData} data={staticsData} message={message} />
                <div className="row performance-pie-chart">
                    <div className="col-md-8 col-xs-12">
                        <PerformanceChart />
                    </div>
                    <div className="col-md-4 col-xs-12">
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