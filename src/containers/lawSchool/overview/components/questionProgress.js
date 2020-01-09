import React, { Component } from "react";
import { Row, Col, Progress } from "reactstrap";
import Chart from "react-apexcharts";
import Loading from "../../../../components/admin/loading";
import {language} from "../../../../utils/locale/locale";

class QuestionProgress extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        {this.props.isLoading ? (
          <Loading />
        ) : (
            <Row className="msedge-md-prog-subj">
              <Col
                xs="12"
                sm="12"
                md="12"
                lg="12"
                xl="12"
                className="msedge-pie-chart d-unset bg-white mb-0"
              >
                <Row>
                  <Col
                    xs="12"
                    sm="12"
                    md="12"
                    lg="12"
                    xl="12"
                    className="pt-3 pl-3"
                  >
                  </Col>
                  {this.props.subjectPerformance === [] || this.props.subjectPerformance.length === 0 ?
                    <Col
                      xs="12"
                      sm="12"
                      md="12"
                      lg="12"
                      xl="12"
                    >
                      <div>
                        <h5 className="text-center msedge-lawschool-overview-no-data-found-segment msedge-setting-time-information" >
                          {language.no_question_found}
                                            </h5>
                      </div>
                    </Col>
                    :
                    <div className="container-fluid">
                      <Col md="12" sm="12" lg="12" xl="12">
                        <Row>
                          <Col
                            xs="12"
                            sm="12"
                            md="3"
                            lg="3"
                            xl="3"
                            className="msedge-performance-chart-students-segment msedge-question-progress-align-self-tag"
                          >
                            <div className="radialbar border msedge-radial-bar-main msedge-students-radialbar">
                              <div className="msedge-radialbar msedge-radial-bar-main">
                                <h3 className="msedge-questions-overview-question-progress-answered-questions">{language.answeredQuestions}</h3>
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
                                    colors: [Math.round((this.props.questionAnswered/this.props.overallquestion)*100) >= 60 ? "#3ac47d" : "#d92550"]
                                  }
                                  }
                                  series={[Math.round((this.props.questionAnswered/this.props.overallquestion)*100)]}
                                  type="radialBar"
                                  height="260"
                                />
                                <h6 className="msedge-lawschool-bar-value msedge-custom-bar-value pl-2" style={{ color: Math.round((this.props.questionAnswered/this.props.overallquestion)*100) >= 60 ? "#3ac47d" : "#d92550" }}>
                                  {isNaN(Math.round((this.props.questionAnswered/this.props.overallquestion)*100)) ? 0 : Math.round((this.props.questionAnswered/this.props.overallquestion)*100) > 100 ? 100 : Math.round((this.props.questionAnswered/this.props.overallquestion)*100)}%
                                      </h6>
                              </div>
                              <p className="msedge-no-of-questions-answered pb-4">
                                {this.props.questionAnswered} {language.out_of}{" "}
                                {this.props.overallquestion} {language.que}
                              </p>
                            </div>
                          </Col>

                          <Col
                            xs="12"
                            sm="12"
                            md="9"
                            lg="9"
                            xl="9"
                            className="pt-3"
                          >
                            <Row>
                              <Col md="12" xs="12" sm="12" md="12" lg="12" xl="12">
                                {this.props.subjectPerformance.map((entry, index) => (
                                  <div className="row msedge-students-overview-question-progress" key="1">

                                    <Col
                                      xs="5"
                                      sm="5"
                                      md="5"
                                      lg="5"
                                      xl="5"
                                      className="msedge-question-progress-align-self-tag"
                                    >
                                      <span className="msedge-students-overview-question-progress-subjectname">{entry.subjectName}</span>
                                    </Col>

                                    <Col xs="7" sm="7" md="7" lg="7" xl="7">
                                      <Row>
                                        <Col md="6" xs="6" sm="6" lg="6" xl="6" className="mt-2" className="msedge-question-progress-align-self-tag">
                                          <Progress
                                            className="progress-bar-sm"
                                            color={
                                              Math.round(entry.percentage) > 60
                                                ? "success" : "danger"
                                            }
                                            value={Math.round(entry.percentage)}
                                          />

                                        </Col>

                                        <Col md="6" xs="6" sm="6" md="6" lg="6" xl="6" className="text-center msedge-question-progress-align-self-tag p-0">

                                          <p className="msedge-students-overview-question-progress-subjectname">
                                            {Math.round(entry.percentage) > 100 ? 100 : Math.round(entry.percentage)}%  {language.correct}
                                </p> 
                                <p className="msedge-no-of-questions-answered m-0 pr-2">
                                            

                                              ({ entry.answered > entry.question ?  entry.answered +'  '+ language.out_of +'  '+ entry.answered +'  '+language.attempted  :
                                             entry.answered +'  '+ language.out_of +'  '+ entry.question +'  '+language.attempted
                                })

                              </p>

                                        </Col>
                                      </Row>
                                    </Col>
                                  </div>
                                ))}
                              </Col>
                            </Row>

                          </Col>
                        </Row>
                      </Col>
                    </div>
                  }
                </Row>
              </Col>
            </Row>
          )}
      </div>
    );
  }
}

export default QuestionProgress;