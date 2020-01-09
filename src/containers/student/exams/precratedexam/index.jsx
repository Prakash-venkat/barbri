import React, { Fragment,Component } from "react";
import PageTitle from "../../../layout/AppMain/PageTitle";
import PrecreatedExamList from "../practiceExam/components/preCreated"
import {customPageTitle} from "../../../../components/commonComponents/customPageTitle"

export default class PrecreatedExam extends Component {
    componentDidMount(){
        customPageTitle("Pre Created Exam")
    }
    render() {
        return (
            <div className="msedge-student-exam-reports">
                <Fragment>
                    <div className="exam-report-heading-shadow">
                        <PageTitle
                            heading="
                            Pre-Created Exam"
                            brdcrumptwo="Exams"
                            brdcrumpthree="Pre-Created Exam"
                            brdcrumptwolink="/students/exam-practice"
                            linkToHome="/students"
                        />
                    </div>
                    <div className="row">
                        <div className="container-fluid bg-grey p-30">
                            <div className="msedge-practice-questions bg-white p-3">
                                <PrecreatedExamList />
                            </div>
                        </div>
                    </div>

                </Fragment>
            </div>
        );
    }
}