import React, { Component } from "react";
import {Row, Col, Modal, ModalHeader, ModalBody,ModalFooter, Card, CardBody} from "reactstrap";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import Chart from "react-apexcharts";
import PageTitle from "../../../layout/AppMain/PageTitle";
import Loading from "../../../../components/admin/loading";
import {instance} from "../../../../actions/constants"
import {getSession} from '../../../routes/routePaths'
import {customPageTitle} from '../../../../components/commonComponents/customPageTitle'
import { subjects } from './components/subjects.json'
import {language} from '../../../../utils/locale/locale'
class QuestionsProgress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredData: [],
      totalAnswered: 0,
      totalQuestions: 0,
      totalPercentage: 0,
      totalcorrectanswered:0,
      allcorrectanspercentage:0,
      modal: false,
      indexValue: "",
      loading: true,
      studentSession: getSession("StudentSession")
    };
  }

  componentDidMount() {
    this.fetchData(); //API Call
    customPageTitle("Performance") //Defines the page title
  }

  fetchData = () => {
      let studentSession = this.state.studentSession
    const params = new URLSearchParams();
    params.append('period', studentSession.settingsDefaultTiming);
    const options = {
      method: 'GET',
      headers: { 'content-type': 'application/x-www-form-urlencoded','Authorization': `Bearer ${localStorage.getItem('token')}` },
      params: params,
      url : `students/${studentSession.userStudentID}/questions/progresssummary`
    };
    
    instance(options)
      .then(response => {
        return response;
      })
      .then(res => {
        if (res.data.data === "" || res.data.data.length === 0  || res.data.data === null) {

          const totalAns = subjects.map((data) => {
            const totalAnswered = data.answered++;
            return totalAnswered;
          });
          let totalAnswered = totalAns.reduce((a, b) => a + b, 0);

          const totQues = subjects.map((data) => {
            const totalquestion = data.question++;
            return totalquestion;
          });
          let totalQuestions = totQues.reduce((a, b) => a + b, 0);

          const totalcorrectanswered = subjects.map((data) =>{
            const totalcorrectansweres = data.questionsAnsweredCorrectly++;
            return totalcorrectansweres;
          });
          let totalcorrectans=totalcorrectanswered.reduce((a,b)=>a+b,0);
          let allcorrectanspercen=(totalcorrectans/totalAnswered)*100;

          let totalPercentage = (totalAnswered / totalQuestions) * 100;

          this.setState({
            loading: false,
            filteredData: subjects,
            totalAnswered: totalAnswered,
            totalQuestions: totalQuestions,
            totalPercentage: Math.round(totalPercentage),
            totalcorrectanswered:totalcorrectans,
            allcorrectanspercentage:Math.round(allcorrectanspercen)
          });
        }

        else {
          const totalAns = res.data.data.map((data, index) => {
            const totalAnswered = data.answered++;
            return totalAnswered;
          });
          let totalAnswered = totalAns.reduce((a, b) => a + b, 0);

          const totQues = res.data.data.map((data, index) => {
            const totalquestion = data.question++;
            return totalquestion;
          });
          let totalQuestions = totQues.reduce((a, b) => a + b, 0);


          const totalcorrectanswered = res.data.data.map((data,index) =>{
            const totalcorrectansweres = data.questionsAnsweredCorrectly++;
            return totalcorrectansweres;
          });
          let totalcorrectans=totalcorrectanswered.reduce((a,b) => a+b,0);

          let totalPercentage = (totalAnswered / totalQuestions) * 100
          let allcorrectanspercen=(totalcorrectans/totalAnswered)*100
          this.setState({
            loading: false,
            filteredData: res.data.data,
            totalAnswered: totalAnswered,
            totalQuestions: totalQuestions,
            totalPercentage: Math.round(totalPercentage),
            totalcorrectanswered:totalcorrectans,
            allcorrectanspercentage:Math.round(allcorrectanspercen)
          });
        }
      })
      .then(error => console.log(error));
  };

  toggle = index => {
    this.setState(prevState => ({
      modal: !prevState.modal,
      indexValue: index
    }));
  };

  render() {

    return (
      <div>
        <ReactCSSTransitionGroup
         component="div"
         transitionName="TabsAnimation"
         transitionAppear={true}
         transitionAppearTimeout={0}
         transitionEnter={false}
         transitionLeave={false}
       >
        {this.state.loading ? (
          <Loading />
        ) : (
            <div className="question-progress-students-main">
              <PageTitle
                heading="Performance"
                 subheading="Analyze your performance broken down by subject.
                  Click each subject to see your performance by sub-topic."
                brdcrumptwo="Statistics"
                brdcrumpthree="Performance"
                linkToHome="/students"
              />

              <div className="row">
                <div className="container-fluid bg-grey p-30">
                  <div className="mr-0 msedge-monthly-progress-questions pie-chart">
                    <div tabIndex="0" role="button">
                      <Card>
                        <CardBody>
                          <Row>
                            <Col xs="12" sm="12" md="3" lg="3" xl="3"
                              className=""
                            >
                              <h2 className="m-0">{language.answeredQuestions}</h2>
                            </Col>
                            <Col xs="12" sm="6" md="7" lg="7" xl="7" className="text-center msedge-ques-prog-res">
                              <div className="msedge-overall-content">
                                <div className="progress-bar-sm progress">
                                  <div
                                    className="progress-bar"
                                    style={{
                                      width: this.state.totalPercentage + "%",
                                      backgroundColor:
                                        this.state.totalPercentage > 60 ? "#3ac47d"
                                          :  "#d92550",
                                      borderRadius: "2px",
                                      transition: "all .2s ease-out"
                                    }}
                                  />
                                </div>
                                <span className="msedge-ques-progress-percentage">
                                  <b>
                                    {isNaN(this.state.totalPercentage)||(this.state.totalPercentage)===Infinity ? 0 : this.state.totalPercentage > 100 ? 100 : this.state.totalPercentage}%
                                  </b>
                                </span>
                              </div>
                            </Col>

                            <Col xs="12" sm="12" md="2" sm="6" className="text-center" >
                              <h3 className="text-right mb-0">
                                {this.state.totalAnswered > this.state.totalQuestions ? this.state.totalQuestions +'  '+ language.out_of +' '+ this.state.totalQuestions :

                                this.state.totalAnswered +'  '+ language.out_of +' '+ this.state.totalQuestions }
                              </h3>
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                      
                    </div>

                    <div tabIndex="0" role="button" className="msedge-pt-30 correct-ans">
                      <Card>
                        <CardBody>
                          <Row>
                            <Col xs="12" sm="12" md="3" lg="3" xl="3">
                              <h2 className="m-0">{language.correct_answers}</h2>
                            </Col>
                            <Col xs="12" sm="6" md="7" lg="7" xl="7" className="text-center msedge-ques-prog-res">
                              <div className="msedge-overall-content">
                                <div className="progress-bar-sm progress">
                                  <div
                                    className="progress-bar"
                                    style={{
                                      width: this.state.allcorrectanspercentage + "%",
                                      backgroundColor:
                                        this.state.allcorrectanspercentage > 60 ? "#3ac47d"
                                          :  "#d92550",
                                      borderRadius: "2px",
                                      transition: "all .2s ease-out"
                                    }}
                                  />
                                </div>
                                <span className="msedge-ques-progress-percentage">
                                  <b>
                                    {isNaN(this.state.allcorrectanspercentage)||(this.state.allcorrectanspercentage)===Infinity?0:this.state.allcorrectanspercentage > 100 ? 100 : this.state.allcorrectanspercentage}%
                                  </b>
                                </span>
                              </div>
                            </Col>

                            <Col xs="12" sm="12" md="2" sm="6" className="text-center" >
                              <h3 className="text-right mb-0">
                                {this.state.totalcorrectanswered > this.state.totalAnswered ? this.state.totalAnswered +'  '+ language.out_of +' '+ this.state.totalAnswered :
                                        this.state.totalcorrectanswered +'  '+ language.out_of +' '+ this.state.totalAnswered
                                }
                              </h3>
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                      
                    </div>

                    <Col xs="12" sm="12" md="12" lg="12" xl="12" className="all-card">
                      <Row>
                        {!this.state.filteredData
                          ? ""
                          : this.state.filteredData.map((subject, index) => (
                            <>
                              <Col xs="12" sm="12" md="12" lg="6" xl="6"
                                className="c-pointer p-1 m-0"
                                id="saveChanges"
                                onClick={() => this.toggle(index)}
                              >
                                <div
                                  className="card monthly-progress-student"
                                  tabindex="0"
                                  role="button"
                                >
                                  <div className="">
                                    <h4 className="msedge-subjcts">
                                      {subject.subjectName}
                                    </h4>
                                  </div>

                                  <div className="card-body">
                                    <Row>
                                      <Col
                                        md="6"
                                        className="border-right text-center"
                                      >
                                        <h6 className="">
                                          {language.answeredQuestions}
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
                                                colors: [(Math.round((((subject.answered-1) / (subject.question-1 ))* 100))) < 60 ? "#D92550" : "rgb(58, 196, 125)"]
                                              }
                                            }
                                            series={[isNaN(Math.round(((subject.answered -1) / (subject.question -1)) * 100))||(Math.round(((subject.answered -1) / (subject.question -1)) * 100))===Infinity?0:(Math.round(((subject.answered -1) / (subject.question -1)) * 100))]}
                                            type="radialBar"
                                            height="200"
                                          />
                                          <h5 className="msedge-radial-bar-value" style={{color: (Math.round((((subject.answered-1) / (subject.question-1 ))* 100))) < 60 ? "#D92550" : "rgb(58, 196, 125)" }}>
                                        { isNaN((Math.round((((subject.answered-1) / (subject.question-1 ))* 100))) ) ||(Math.round((((subject.answered-1) / (subject.question-1 ))* 100)))===Infinity ? 0 : Math.round((((subject.answered-1) / (subject.question-1 ))* 100)) > 100 ? 100 : Math.round((((subject.answered-1) / (subject.question-1 ))* 100))}%
                                          </h5>
                                        </div>
                                        <p className="msedge-no-of-questions-answered">
                                          {(subject.answered - 1) > (subject.question-1) ? (subject.question-1) +'  '+ language.out_of +' '+ (subject.question-1):
                                           (subject.answered - 1) +'  '+ language.out_of +' '+ (subject.question - 1)
                                          }
                                          
                                        </p>
                                      </Col>
                                      <Col md="6">
                                        <div className="text-center">
                                          <h6>{language.correct_answers}</h6>
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
                                                colors: [(Math.round((((subject.questionsAnsweredCorrectly-1) / (subject.answered-1)) * 100))) < 60 ?  "#D92550" : "rgb(58, 196, 125)"]
                                           }}
                                         
                                           series={[((subject.questionsAnsweredCorrectly-1) / (subject.answered-1)) * 100]}
                                            type="radialBar"
                                            height="200"
                                          />
                                          <h5 className="msedge-radial-bar-value text-center" style={{color: (Math.round((((subject.questionsAnsweredCorrectly-1) / (subject.answered-1)) * 100))) < 60 ? "#D92550"  : "rgb(58, 196, 125)"}}>
                                            {isNaN((Math.round((((subject.questionsAnsweredCorrectly-1) / (subject.answered-1)) * 100))))||(Math.round((((subject.questionsAnsweredCorrectly-1) / (subject.answered-1)) * 100)))===Infinity?0:(Math.round(((subject.questionsAnsweredCorrectly-1) / (subject.answered-1)) * 100)) > 100 ? 100 : (Math.round(((subject.questionsAnsweredCorrectly-1) / (subject.answered-1)) * 100))}%
                                            </h5>
                                        </div>
                                        <p className="msedge-no-of-questions-answered">
                                        {(subject.questionsAnsweredCorrectly - 1) > (subject.answered - 1) ? (subject.answered - 1) +'  '+ language.out_of +' '+(subject.answered - 1) :
                                           (subject.questionsAnsweredCorrectly - 1) +'  '+ language.out_of +' '+(subject.answered - 1)
                                        }
                                        </p>
                                      </Col>
                                    </Row>
                                  </div>
                                </div>
                              </Col>

                              {this.state.indexValue === index ? (
                                <Modal
                                  isOpen={this.state.modal}
                                  className={`${this.props.className} question-progress-students-modal`}
                                >
                                  <ModalHeader
                                  >
                                    {subject.subjectName}
                                  </ModalHeader>
                                  <ModalBody>
                                    <Row>
                                      <Col md="4" className="text-left pb-2 ada-font-size msedge-mobile-card"><b>{language.topic}</b></Col>
                                      <Col md="4" className="text-left pb-2 ada-font-size msedge-mobile-card"><b>{language.answeredQuestions}</b> </Col>
                                      <Col md="4" className="text-left pb-2 ada-font-size msedge-mobile-card"><b>{language.correct_answers}</b></Col>
                                    </Row>
                                    {subject.topics.map(
                                      (topics, indexvalue) => (
                                        <Row style={{ fontSize: "14px" }}>
                                          <Col md="4" className="msedge-mobile-card">
                                            <p className="ada-font-size">
                                              {topics.topicName}
                                            </p>
                                          </Col>
                                          <Col md="4" className="msedge-mobile-card">
                                          
                                            <div
                                              style={{
                                                width: "100%",
                                                display: "flex",
                                                marginTop: "8px"
                                              }}
                                            >
                                              <div
                                                className="progress-bar-sm progress"
                                                style={{
                                                  width: "94%",
                                                  marginRight: "10px",
                                                  backgroundColor: "#dadada"
                                                }}
                                              >
                                                <div
                                                  className="progress-bar"
                                                  style={{
                                                    width:( Math.round((topics.answered)/(topics.questions)*100))+"%",
                                                    backgroundColor:
                                                 ( Math.round((topics.answered)/(topics.questions)*100)) > 60
                                                        ? "#3ac47d"
                                                        :"#d92550",
                                                          
                                                    borderRadius: "2px",
                                                    transition:
                                                      "all .2s ease-out"
                                                  }}
                                                />
                                              </div>
                                              <span
                                                style={{
                                                  right: "3px",
                                                  fontSize: "14px",
                                                  marginTop: "-8px"
                                                }}
                                              >
                                                <p className="ada-font-size mb-0">
                                                  {isNaN(Math.round((topics.answered)/(topics.questions)*100))||Math.round((topics.answered)/(topics.questions)*100)===Infinity?0:Math.round((topics.answered)/(topics.questions)*100) > 100 ? 100 : Math.round((topics.answered)/(topics.questions)*100)}%
                                                  </p>
                                              </span>
                                            </div>
                                            {/* </Col> */}
                                            {/* <Col md="4" className="pl-3"> */}
                                            <p className="text-left ada-font-size">
                                              {topics.answered > topics.questions ? topics.questions +'  '+ language.out_of +' '+topics.questions :
                                                  topics.answered +'  '+ language.out_of +' '+topics.questions
                                              }
                                              </p>
                                              {/* </Col>
                                              </Row> */}
                                          </Col>

                                          <Col md="4" className="msedge-mobile-card">
                                          
                                              <div
                                              style={{
                                                width: "100%",
                                                display: "flex",
                                                marginTop: "8px"
                                              }}
                                            >
                                              <div
                                                className="progress-bar-sm progress"
                                                style={{
                                                  width: "94%",
                                                  marginRight: "10px",
                                                  backgroundColor: "#dadada"
                                                }}
                                              >
                                                <div
                                                  className="progress-bar"
                                                  style={{
                                                    width: (Math.round((topics.questionsAnsweredCorrectly)/(topics.answered)*100))+"%",
                                                    backgroundColor:
                                                    (Math.round((topics.questionsAnsweredCorrectly)/(topics.answered)*100)) > 60 ? "#3ac47d"
                                                  :"#d92550",
                                                        
                                                    borderRadius: "2px",
                                                    transition:
                                                      "all .2s ease-out"
                                                  }}
                                                />
                                              </div>
                                              <span
                                                style={{
                                                  right: "3px",
                                                  fontSize: "14px",
                                                  marginTop: "-8px"
                                                }}
                                              >
                                                <p className="ada-font-size mb-0">
                                                 
                                                  {isNaN(Math.round((topics.questionsAnsweredCorrectly)/(topics.answered)*100))||Math.round((topics.questionsAnsweredCorrectly)/(topics.answered)*100)===Infinity?0:Math.round((topics.questionsAnsweredCorrectly)/(topics.answered)*100) > 100 ? 100 : Math.round((topics.questionsAnsweredCorrectly)/(topics.answered)*100) }%
                                                  </p>
                                              </span>
                                            </div>
                                              
                                              <p className="text-left ada-font-size">
                                                {topics.questionsAnsweredCorrectly > topics.answered ? topics.answered +'  '+ language.out_of +' '+topics.answered :
                                                    topics.questionsAnsweredCorrectly +'  '+ language.out_of +' '+topics.answered
                                                }
                                              </p>
                                          </Col>
                                        </Row>
                                      )
                                    )}
                                  </ModalBody>

                                  <ModalFooter className="msedge-close-btn">
                                    <button
                                      className="btn btn-outline-primary mr-2"
                                      onClick={this.toggle}
                                    >
                                      <li>
                                        <i className="pe-7s-close" data-for="close"></i>    
                                      </li>
                                      <li className="text-uppercase">{language.close}</li>
                                      </button>
                                  </ModalFooter>
                                </Modal>
                              ) : (
                                  ""
                                )}
                            </>
                          ))}
                      </Row>
                    </Col>
                  </div>
                </div>
              </div>
            </div>
          )}
          </ReactCSSTransitionGroup>

      </div>
    );
  }
}

export default QuestionsProgress
