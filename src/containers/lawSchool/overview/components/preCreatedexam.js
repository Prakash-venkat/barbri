import React, { Component } from "react";
import { Row, Col, Progress } from "reactstrap";
import Chart from "react-apexcharts";
import {language} from "../../../../utils/locale/locale";

class PreCreatedExam extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Col xs="12" sm="12" md="12" lg="12" xl="12" className="all-card msedge-lawschool-precreatedexam-segment mb-4">
                <Row>
                    {this.props.PreCreatedExamData === [] || this.props.PreCreatedExamData === null || this.props.PreCreatedExamData.length === 0
                        ?
                        <Col
                            xs="12"
                            sm="12"
                            md="12"
                            lg="12"
                            xl="12"
                            className=" msedge-pie-chart d-unset bg-white"
                        >

                            <div>
                                <h5 className="text-center msedge-lawschool-overview-no-data-found-segment msedge-setting-time-information" >
                                  {language.no_exam_found}
                                            </h5>
                            </div>
                        </Col>

                        :
                        this.props.PreCreatedExamData.map((exam, index) => (
                            <Col xs="12" sm="12" md="12" lg="6" xl="6" key="1"
                                className="p-1 m-0"
                            >
                                <div
                                    className="card monthly-progress-student"
                                    tabIndex="0"
                                    role="button" >
                                    <div className="">
                                        <h4 className="msedge-subjcts">
                                            {exam.examName}
                                        </h4>
                                    </div>

                                    <div className="card-body">
                                        <Row>
                                            <Col

                                                md="6"
                                                className="border-right text-center"
                                            >
                                                <h6 className="msedge-no-of-questions-answered" >
                                                    {language.your_student}
                                          </h6>

                                                <div className="radialbar border  radial-bar-main">
                                                    <Chart
                                                        options={{
                                                            labels: ["160 answered out of 200"],
                                                            plotOptions: {
                                                                radialBar: {
                                                                    hollow: {
                                                                        size: "60%"
                                                                    }
                                                                }
                                                            },
                                                            colors: [(Math.round((exam.totalLawSchoolExamTaken / exam.totalLawSchoolStudents) * 100)) >= 60 ? "#3ac47d" : "#d92550"]
                                                        }
                                                        }

                                                        series={[isNaN(Math.round(((exam.totalLawSchoolExamTaken) / (exam.totalLawSchoolStudents)) * 100))
                                                            || (Math.round(((exam.totalLawSchoolExamTaken) / (exam.totalLawSchoolStudents)) * 100)) === Infinity ? 0
                                                            : (Math.round(((exam.totalLawSchoolExamTaken) / (exam.totalLawSchoolStudents)) * 100))]}
                                                        type="radialBar"
                                                        height="250"
                                                    />

                                                    <div className="msedge-lawschool-overview-precreatedexam-chart-bar-value">
                                                        <h6 className="msedge-lawschool-overview-precreatedexam-chart-bar-value-percentage" style={{ color: (Math.round((exam.totalLawSchoolExamTaken / exam.totalLawSchoolStudents) * 100)) >= 60 ? "#3ac47d" : "#d92550" }}>

                                                            {isNaN((Math.round((((exam.totalLawSchoolExamTaken) / (exam.totalLawSchoolStudents)) * 100))))
                                                                || (Math.round((((exam.totalLawSchoolExamTaken) / (exam.totalLawSchoolStudents)) * 100))) === Infinity ? 0
                                                                :(Math.round((((exam.totalLawSchoolExamTaken) / (exam.totalLawSchoolStudents)) * 100))) > 100 ? 100
                                                                : Math.round((((exam.totalLawSchoolExamTaken) / (exam.totalLawSchoolStudents)) * 100))}%
                                            </h6>
                                                        <p className="m-0 msedge-lawschool-overview-precreatedexam-chart-bar-value-average-score pt-1"> {language.avg_Scr}</p>
                                                    </div>

                                                </div>
                                                <p className="msedge-no-of-questions-answered">
                                                    {exam.totalLawSchoolExamTaken} {language.out_of}{" "}
                                                    {exam.totalLawSchoolStudents} {language.stud}
                                              </p>
                                            </Col>

                                            <Col md="6">
                                                <div className="text-center">
                                                    <h6 className="msedge-no-of-questions-answered">{language.all_student}</h6>
                                                </div>

                                                <div className="radialbar border  radial-bar-main">
                                                    <Chart
                                                        options={{
                                                            labels: ["160 answered out of 200"],
                                                            plotOptions: {
                                                                radialBar: {
                                                                    hollow: {
                                                                        size: "60%"
                                                                    }
                                                                }
                                                            },
                                                            colors: [(Math.round((exam.totalLawSchoolExamTaken / exam.totalLawSchoolStudents) * 100)) >= 60 ? "#3ac47d" : "#d92550"]
                                                        }
                                                        }

                                                        series={[isNaN(Math.round(((exam.totalAllExamTaken) / (exam.totalStudents)) * 100))
                                                            || (Math.round(((exam.totalAllExamTaken) / (exam.totalStudents)) * 100)) === Infinity ? 0
                                                            : (Math.round(((exam.totalAllExamTaken) / (exam.totalStudents)) * 100))]}
                                                        type="radialBar"
                                                        height="250"
                                                    />

                                                    <div className="msedge-lawschool-overview-precreatedexam-chart-bar-value">
                                                        <h6 className="msedge-lawschool-overview-precreatedexam-chart-bar-value-percentage" style={{ color: (Math.round((exam.totalLawSchoolExamTaken / exam.totalLawSchoolStudents) * 100)) >= 60 ? "#3ac47d" : "#d92550" }}>
                                                            {isNaN((Math.round((((exam.totalAllExamTaken) / (exam.totalStudents)) * 100))))
                                                                || (Math.round((((exam.totalAllExamTaken) / (exam.totalStudents)) * 100))) === Infinity ? 0
                                                                : (Math.round(((exam.totalAllExamTaken) / (exam.totalStudents)) * 100))}%
                                            </h6>
                                                        <p className="m-0 msedge-lawschool-overview-precreatedexam-chart-bar-value-average-score pt-1"> Avg score</p>
                                                    </div>

                                                </div>
                                                <p className="msedge-no-of-questions-answered text-center">

                                                    {exam.totalAllExamTaken}{" "} {language.out}
                                                of {exam.totalStudents} {language.stud}
                                              </p>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </Col>
                        ))}
                </Row>
            </Col>
        )
    }
}

export default PreCreatedExam;