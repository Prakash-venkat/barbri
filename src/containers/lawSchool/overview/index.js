import React, { Component } from "react";
import { Row, Col, UncontrolledTooltip } from "reactstrap";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import LawschoolStatistics  from "./components/lawschoolStatistics";
import  QuestionProgress  from "./components/questionProgress";
import PerformanceOverTimeChart from '../overview/components/performanceOverTimeChart'
import PreCreatedExam from './components/preCreatedexam'
import PageTitle from "../../layout/AppMain/PageTitle";
import Loading from "../../../components/admin/loading";
import { ExamBatch } from '../../../components/commonComponents/lawSchoolBatch.json';
import {instance} from '../../../actions/constants';
import {customPageTitle} from '../../../components/commonComponents/customPageTitle'
import {tooltipMsg} from '../../../components/admin/tooltipMsg'
import {language} from '../../../utils/locale/locale'
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      performanceOverTime: true,
      loading: true,
      contentload: true,
      isAllStudentsDataEnabled:true,
      sessionData:[],
      batchSelected: "February 2020,July 2020,February 2021,July 2021,February 2022,July 2022",
      periodSelected: localStorage.getItem("LawSchoolSession") ? JSON.parse(localStorage.getItem("LawSchoolSession")).settingsDefaultTiming : JSON.parse(sessionStorage.getItem("LawSchoolSession")).settingsDefaultTiming,
      statisticsData: [
        {
          average: "0",
          questionsAnswered: 0,
          overallAverage: "0",
          overaAllquestionsAnswered: 0,
          allstudentOverallAverage: "0",
          allstudentQuestionsAnswered: 0
        }
      ],
     
      subjectPerformance: [],
      examDetails: [],
      PerformanceOverTimeData: [],
      QusProgressOverallpercentage: "",
      QusProgressOverallquestion: "",
      QusProgressOverallansware: ""
    };
  }
 
  componentDidMount() {
    customPageTitle("Overview")
    this.statistics();

    const user =localStorage.getItem("LawSchoolSession") ? JSON.parse(localStorage.getItem("LawSchoolSession")) : JSON.parse(sessionStorage.getItem("LawSchoolSession"));

    instance.get(`settings/${user.userId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,        
      }
    })
    .then(res=>{
      return res})
    .then(response=>{
      if(response.data.status == "Success"){
        if(response.data.data != null){
          if(response.data.data.settingsAlluserStatusDashboard==0){
            this.setState({isAllStudentsDataEnabled: false})
          }
        }
        }
    })
    .catch(err=>console.log(err))
  }

  periodSelection=(e)=>{
    this.setState({ periodSelected: e.target.value }, () => {
      this.statistics()
    })
  }
  
  batchSelection = (e) => {

    this.setState({ batchSelected: e.target.value }, () => {
      this.statistics()
    })

  }

  statistics = () => {

    this.setState({ contentload: true });

    let getSessionData = localStorage.getItem("LawSchoolSession") ? JSON.parse(localStorage.getItem("LawSchoolSession")) : JSON.parse(sessionStorage.getItem("LawSchoolSession"));
    
    let lawSchoolId = getSessionData.userLawschoolID;
    let batch = this.state.batchSelected;
    let settingDefaultTiming = this.state.periodSelected;

    //STATISTICS 
 
    const StatParams = new URLSearchParams();
    StatParams.append('batchCodes', batch);
    StatParams.append('period', settingDefaultTiming)
    
    const StatOptions = {
      method: 'GET',
      headers: { 'content-type': 'application/x-www-form-urlencoded','Authorization': `Bearer ${localStorage.getItem('token')}` },
      params: StatParams,
      url: `lawschools/${lawSchoolId}/dashboard`
    };
    
    instance(StatOptions)
      .then(res => {        
        if (res.data.data === null || "") {
          this.setState({ contentload: false });
        }
        let listArray = [res.data.data];
        this.setState({
          loading: false,
          contentload: false,
          statisticsData: [
            {
              average: NaN === NaN ? 0 : Math.round(listArray[0].studentsPastThreeMonths),
              questionsAnswered: Math.round(listArray[0].overAllStudents),
              overallAverage: Math.round(listArray[0].lawSchoolOverviewQuestionsAverage),
              overaAllquestionsAnswered: Math.round(listArray[0].lawSchoolOverviewQuestionsAnswered),
              allstudentOverallAverage: Math.round(listArray[0].allLawSchoolQuestionsAverage),
              allstudentQuestionsAnswered: Math.round(listArray[0].allLawSchoolQuestionsAnswered)
            }
          ]
        });
      })
      .catch(e => {
        this.setState({ loading: false, contentload: false });
      });

    //PROGRESS
      const Qusparams = new URLSearchParams();
    Qusparams.append('batchCodes', batch);    
    const Qusoptions = {
      method: 'GET',
      headers: { 'content-type': 'application/x-www-form-urlencoded','Authorization': `Bearer ${localStorage.getItem('token')}` },
      params: Qusparams,
      url: `lawschools/${lawSchoolId}/questions/progresssummary`
    };
    
    instance(Qusoptions)

    .then(result => {
      if (result.data.data == "" || result.data.data.length == 0) {
        this.setState({ loading: false })

      } else {
        let TotAns = 0;
        let TotQus = 0;

        result.data.data.map((data) => {

          TotAns = TotAns + data.answered;
          TotQus = TotQus + data.question;
        });

        this.setState({
          subjectPerformance: result.data.data,
          QusProgressOverallpercentage: (TotAns / TotQus) * 100,
          QusProgressOverallquestion: TotQus,
          QusProgressOverallansware: TotAns,
          loading: false
        })
      }
    })
      .catch(e => {
        this.setState({loading: false})
      })

    // PERFORMANCE OVERTIME CHART

    const performanceOptions = {
      method: 'GET',
      headers: { 'content-type': 'application/x-www-form-urlencoded', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      params: StatParams,
      url: `lawschools/${lawSchoolId}/performance`
    };

    instance(performanceOptions)

  .then(result => {           
        this.setState({ PerformanceOverTimeData: result.data.data,loading:false })
      
    }).catch(e => {
      this.setState({ loading: false })
    })
    //PRE-CREATED EXAMS

    const precreatedOptions = {
      method: 'GET',
      headers: { 'content-type': 'application/x-www-form-urlencoded', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      params: StatParams,
      url: `lawschools/${lawSchoolId}/performance/exmas/precreated`
    };
    
    instance(precreatedOptions)
    
      .then(result => {
        if (result.data.data === null ||result.data.data.length===0) {
          this.setState({ loading: false })
        } else {

          this.setState({ examDetails: result.data.data,loading:false })

        }
      }).catch(e => {
        this.setState({ loading: false })
      })
  }

  render() {
    
    return (
      <div>
        {this.state.loading ? (
          <Loading />
        ) : (
            <ReactCSSTransitionGroup
              component="div"
              transitionName="TabsAnimation"
              transitionAppear={true}
              transitionAppearTimeout={0}
              transitionEnter={false}
              transitionLeave={false}
            >
              <div className="msedge-overview-section">
                <PageTitle
                  heading="OVERVIEW"
                  brdcrumptwo="Overview"
                  linkToHome="/law-school"
                  subheading="Progress for your law school at-a-glance. To filter students by the exam they intend to take, use the
                  Batch drop-down."
                />

                <div className="row">
                  <div className="container-fluid msedge-law-school-dashboard">
                    <Col md="12">
                      <Row>
                        <Col
                          sm="4"
                          md="4"
                          lg="4"
                          xl="4"
                          className="msedge-first-sec  mt-4"
                        >
                          <div className="msedge-second-sec form-group d-flex font-weight-bold">

                            <label htmlFor="alldata" className="font-weight-bold">
        <h5 className="text-secondary msedge-lawschool-overview-time-period">{language.time_period}</h5>
                            </label>
                            <select
                              className="form-control"
                              id="alldata"
                              value={this.state.periodSelected}
                              name="Alldata"
                              aria-label="select data"
                              onChange={this.periodSelection}
                            >
                                <option value="4">{language.all_data}</option>                           
                                <option value="1">{language.past_one}</option>
                              <option value="2">{language.past_three}</option>
                              <option value="3">{language.past_twelve}</option>
                            </select>
                          </div>                          
                        </Col>
                        <Col
                          sm="5"
                          md="5"
                          lg="5"
                          xl="5">

                          </Col>

                        <Col
                          sm="3"
                          md="3"
                          lg="3"
                          xl="3"
                          className="msedge-second-sec mt-4"
                        >
                          <div className="form-group d-flex">
                            <label htmlFor="allBatch" className="font-weight-bold">
        <h5 className="text-secondary">{language.batch}</h5>
                            </label>
                            <select
                              className="form-control"
                              id="allBatch"
                              name="AllBatch"
                              aria-label="select Batch"
                              onChange={this.batchSelection}
                            >
  <option value="February 2020,July 2020,February 2021,July 2021,February 2022,July 2022">{language.all_batches}</option>
                              {ExamBatch.map((data, index) => {
                                return <option value={data.value} key={index}>{data.value}</option>

                              })}

                            </select>
                          </div>
                        </Col>
                      </Row>
                    </Col>

                    {this.state.contentload ? <Loading /> :
                      <div>
                        
                        <LawschoolStatistics
                          data={this.state.statisticsData}
                          isAllStudentsDataEnabled={this.state.isAllStudentsDataEnabled}
                        />

                        <Col xs="12" sm="12" md="12" lg="12" xl="12">
                          <div className="msedge-precreated-card-header pb-2">
                    <h2>{language.progress_All_Subjects}</h2>
                          </div>
                        </Col>

                        <div className="row">
                          <div className="container-fluid bg-grey plr-30" tabIndex="0">

                            <div className="col-md-12">
                              <div className="row">
                                <div className="col-md-12 col-xs-12 mb-4">
                                  <QuestionProgress
                                    subjectPerformance={this.state.subjectPerformance}
                                    isLoading={this.state.loading}
                                    overallpercentage={this.state.QusProgressOverallpercentage}
                                    overallquestion={this.state.QusProgressOverallquestion}
                                    overallansware={this.state.QusProgressOverallansware} 
                                    questionAnswered = {this.state.statisticsData[0].overaAllquestionsAnswered === "Infinity" || null || "" || NaN ? 0 : this.state.statisticsData[0].overaAllquestionsAnswered }/>
                                </div>
                              </div>
                            </div>

                            <Row>
                              <Col xs="12" sm="12" md="12" lg="12" xl="12">
                                <div className="msedge-precreated-card-header pb-2">
                    <h2>{language.performance_over}</h2>
                                </div>
                              </Col>
                            </Row>

                            <div className="col-md-12 mb-4">
                              <div className="row">

                                <PerformanceOverTimeChart
                                  PerformanceData={this.state.PerformanceOverTimeData}
                                />
                              </div>
                            </div>
                            
                            <Row>
                              <Col xs="12" sm="12" md="12" lg="12" xl="12">
                                <div className="msedge-precreated-card-header pb-2">
                                  <h2 className>{language.precreated_Exam}
                                               <span
                                      className=" pl-2"
                                      id="yourstudent"
                                    >
                                      <FontAwesomeIcon
                                        icon={faQuestionCircle}
                                      />
                                    </span>
                                    </h2>

                                  <UncontrolledTooltip
                                    placement="right"
                                    target="yourstudent"
                                  >
                                   {tooltipMsg.precreated_exam_progress}
                                 </UncontrolledTooltip>

                                </div>
                              </Col>
                            </Row>

                            <div className="col-md-12 mb-4">
                              <div className="row">
                                <PreCreatedExam
                                  PreCreatedExamData={this.state.examDetails}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    }
                  </div>
                </div>
              </div>
            </ReactCSSTransitionGroup>
          )}
      </div>
    );
  }
}

export default Home;