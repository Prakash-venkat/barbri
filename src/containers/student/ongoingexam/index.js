import React, { Fragment } from "react";
import PageTitle from "../../layout/AppMain/PageTitle";
import OngoingExam from "./component/ongoingexam"
import {customPageTitle} from "../../../components/commonComponents/customPageTitle";
import {language} from "../../../../src/utils/locale/locale";

export default class List extends React.Component {
    componentDidMount(){
        customPageTitle("Ongoing Exam")
    }
    
    render() {
        return (
            <div className="msedge-student-exam-reports">
                <Fragment>
                    <div className="exam-report-heading-shadow">
                        <PageTitle
                            heading={language.Ongoing_Exam}
                            brdcrumptwo={language.exams}
                            brdcrumpthree={language.Ongoing_Exam}
                            brdcrumptwolink="/students/exam-practice"
                            linkToHome="/students"
                        />
                    </div>
                    <div className="row">
                        <div className="container-fluid bg-grey p-30">
                            <div className="msedge-ongoingcontain">
                                <OngoingExam />
                            </div>
                        </div>
                    </div>

                </Fragment>
            </div>
        );
    }
}



















//  <PageTitle
//                     heading="Ongoing Exam"
//                     subheading="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod"
//                     brdcrumptwo="Exams"
//                     brdcrumpthree="Ongoing Exam"
//                 />