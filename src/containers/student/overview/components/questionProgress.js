import React, { Component } from "react";
import { Row, Col,Progress} from "reactstrap";
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
        {this.props.isLoadingQuestionProgress ? (
          <Loading />
        ) : (
          <div className="msedge-student-overview-segment-all-subjects">
            <Row>
              <Col
                xs="12"
                sm="12"
                md="12"
                lg="12"
                xl="12"
                className="msedge-pie-chart d-unset bg-white mb-0"
              >
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
                      
                              colors: [this.props.totalPercentage <60 ? "#D92550" : "rgb(58, 196, 125)"]
                          }}
                          series={[this.props.totalPercentage]}
                          type="radialBar"
                          height="260"
                        />
                        <h6 className="msedge-lawschool-bar-value msedge-custom-bar-value pl-2" style={{color: this.props.totalPercentage < 60 ? "#D92550" : "rgb(58, 196, 125)"}}>
                          {this.props.totalPercentage > 100 ? 100 :this.props.totalPercentage }%
                        </h6>
                      </div>
                      <p className="msedge-no-of-questions-answered pb-4">
                        {this.props.totalAnswered > this.props.totalQuestions ? this.props.totalQuestions +'  '+ language.out_of +' '+ this.props.totalQuestions :
                        this.props.totalAnswered +'  '+ language.out_of +' '+ this.props.totalQuestions}
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
                      <Col md="12" xs="12" sm="12" md="12" lg="12" xl="12" className="msedge-reponsive-performance">
                      {!this.props.questionProgress
                      ? ""
                      : this.props.questionProgress.map((entry, index) => (
                          <div className="row msedge-students-overview-question-progress" key={index}>
                    
                            <Col
                              xs="12"
                              sm="12"
                              md="5"
                              lg="5"
                              xl="5"
                              className="msedge-question-progress-align-self-tag"
                            >
                              <span className="msedge-students-overview-question-progress-subjectname">{entry.subjectName}</span>
                            </Col>

                              <Col
                              xs="12"
                              sm="12"
                              md="7"
                              lg="7"
                              xl="7"
                            >
                              <Row>
                                <Col md="6" xs="12" sm="12" lg="6" xl="6" className="mt-2 msedge-question-progress-align-self-tag">
                                  <Progress
                        className="progress-bar-sm"
                        color={
                          Math.round(entry.percentage)> 60
                            ? "success" : "danger"
                        }
                        value={ Math.round(entry.percentage)}
                      />

                                </Col>

                                <Col md="6" xs="12" sm="12" md="6" lg="6" xl="6" className="text-center msedge-question-progress-align-self-tag p-0">
                              
                                <p className="msedge-students-overview-question-progress-subjectname">
                                {Math.round(entry.percentage) > 100 ? 100 : Math.round(entry.percentage)}% {language.correct}
                                </p> 
                                <p className="msedge-no-of-questions-answered m-0 pr-2">
                                  {entry.answered > entry.question ? entry.question +'  '+ language.out_of +' '+entry.question :
                                      entry.answered +'  '+ language.out_of +' '+entry.question +'  ' + language.attempted
                                  }
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
              </Col>
            </Row>
          </div>
        )}
      </div>
    );
  }
}

export default QuestionProgress;
