import React, { Component } from "react";
import { Row, Col, UncontrolledTooltip } from "reactstrap";
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import StudentStatistics from "./components/studentStatistics";
import QuestionProgress from "./components/questionProgress";
import PerformanceOverTimeChart from "./components/performanceOverTimeChart";
import ExamReports from "./components/examReports";
import PageTitle from "../../layout/AppMain/PageTitle";
import Loading from "../../../components/admin/loading";
import {instance} from "../../../actions/constants";
import {customPageTitle} from "../../../components/commonComponents/customPageTitle";
import {language} from "../../../utils/locale/locale";
import { tooltipMsg } from "../../../components/admin/tooltipMsg";


const timePeriod = [
  {value: 1, label: "Past one month"},
  {value: 2, label: "Past three months"},
  {value: 3, label: "Past 12 months"},
  {value: 4, label: "All data"},
]

const staticDummyValue =[
  {
      "studentOverviewTodayQuestionsAnswered": 0,
      "studentOverviewTodayQuestionAverage": 0,
      "studentOverviewQuestionsAnswered": 0,
      "studentOverviewQuestionsAverage":0,
      "allStudentQuestionsAnswered": 0,
      "allStudentQuestionsAverage": 0,
      "inCompleteExams": 0,
      "newMessages": 0
    }
]

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staticsData: [],
      isLoadingStatics: true,
      questionProgress: [],
      isLoadingQuestionProgress:true,
      totalAnswered: 0,
      totalQuestions: 0,
      totalPercentage: 0,
      performanceOverTime:[],
      isLoadingPerformanceOverTime:true,
      timePeriodLoading: false,
      settingsDefaultTiming:"",
      studentID:"",
      body:"",
      isAllStudentsDataEnabled: true
    };
  }

  componentDidMount() {   
    customPageTitle("Overview") //Defines a page title

    let studentDetails = localStorage.getItem("StudentSession") ? JSON.parse(localStorage.getItem("StudentSession")) : JSON.parse(sessionStorage.getItem("StudentSession"));
    let studentID = studentDetails.userStudentID;
    let settingsDefaultTiming = studentDetails.settingsDefaultTiming
    this.setState({settingsDefaultTiming,studentID},()=>{this.fetchData()})

    instance.get(`settings/${studentDetails.userId}`, {
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
  
  timePeriodSelection = (e) =>{
    this.setState({
      settingsDefaultTiming : e.target.value,
      timePeriodLoading: true
    },()=>{this.fetchData()})
  }
  
  fetchData = () => {
      
      const params = new URLSearchParams();
      params.append('period', this.state.settingsDefaultTiming);
      const options1 = {
        method: 'GET',
        headers: { 'content-type': 'application/x-www-form-urlencoded','Authorization': `Bearer ${localStorage.getItem('token')}` },
        params: params,
        url : `students/${this.state.studentID}/dashboard`
      };
      const options2 = {
        method: 'GET',
        headers: { 'content-type': 'application/x-www-form-urlencoded','Authorization': `Bearer ${localStorage.getItem('token')}` },
        params: params,
        url : `students/${this.state.studentID}/performance`
      };
      const options3 = {
        method: 'GET',
        headers: { 'content-type': 'application/x-www-form-urlencoded','Authorization': `Bearer ${localStorage.getItem('token')}` },
        params: params,
        url : `students/${this.state.studentID}/questions/progresssummary`
      };
      const options4 = {
        method: 'GET',
        headers: { 'content-type': 'application/x-www-form-urlencoded','Authorization': `Bearer ${localStorage.getItem('token')}` },
        params: params,
        url : `students/${this.state.studentID}/exams`
      };
      this.setState({body:options4})
      // Static Data
      instance(options1)
      .then(response => {
        return response;
      })
      .then(res => {
        if (res.data.data == "" || res.data.data.length == 0 || res.data.data == null ) {
          this.setState({ staticsData: staticDummyValue, isLoadingStatics: false,timePeriodLoading: false });
        } else {
          var listArray = [];
          listArray.push(res.data.data);
          this.setState({ staticsData: listArray, isLoadingStatics: false,timePeriodLoading: false });
        }
      })
      .catch(err =>{ 
        this.setState({staticsData:staticDummyValue,isLoadingStatics: false })
       });
    
      instance(options3)
      .then(response => {
        return response;
      })
        .then(response => {
          return response;
        })
        .then(result => {

          let totalQuestions = 0,
          totalAnswered = 0;
      
        result.data.data.map(data => {
          totalAnswered = totalAnswered + data.answered;
          totalQuestions = totalQuestions + data.question;
        });
      
        let totalPercentage = Math.round(
          (totalAnswered / totalQuestions) * 100
        );
      
        this.setState({
          totalAnswered,
          totalQuestions,
          totalPercentage,
          questionProgress: result.data.data,
          isLoadingQuestionProgress:false
        });
        })
  
        .catch(error => {
          this.setState({questionProgress:[],isLoadingQuestionProgress:false})
        });
      //  Performance
      instance(options2)
        .then(response => {
          return response;
        })
        .then(result => {
          if (result.data.data === "" || result.data.data.length === 0 || result.data.data === null ) {
            this.setState({
              performanceOverTime: [],
              isLoadingPerformanceOverTime:false
            })
          }else{
            this.setState({
              performanceOverTime: result.data.data,
              isLoadingPerformanceOverTime:false
            })
          }
          })

        .catch(error => {
          this.setState({performanceOverTime:[],isLoadingPerformanceOverTime:false})
        });

  }
  render() {
    return (
      <div>
        {this.state.isLoadingStatics ? (
          <Loading />
        ) : (
          <div className="msedge-student-segment-overview">
            <div className="overview-section">
              <PageTitle
                heading={language.overview}
                brdcrumptwo={language.overview}
               subheading={language.student_overview_heading}
              />
            </div>
            <div className="row">
              <div className="container-fluid msedge-student-dashboard pb-5">
                <Col md="12">
                  <Row>
                    <Col
                      sm="3"
                      md="4"
                      lg="4"
                      xl="4"
                      className="msedge-second-sec mt-4 ml-auto"
                    >
                      <div className="form-group d-flex">
                        <Col md="5" className="p-0">
                        <label htmlFor="allBatch" className="font-weight-bold">
                          <h5 className="text-secondary">{language.time}</h5>
                        </label>
                        </Col>
                        <Col md="7" className="p-0">
                          <select
                            className="form-control"
                            id="allBatch"
                            name="AllBatch"
                            aria-label="select Batch"
                            value ={this.state.settingsDefaultTiming}
                            onChange={this.timePeriodSelection}
                          >
                            {timePeriod.map((data, index) => {
                              return <option value={data.value} key={index}>{data.label}</option>
                            })}

                          </select>
                        </Col>
                      </div>
                    </Col>
                    </Row>
                </Col>
              {this.state.timePeriodLoading ? (
                <Loading />
              ) : (
                <div>
                <StudentStatistics
                  data={this.state.staticsData}
                  isAllStudentsDataEnabled = {this.state.isAllStudentsDataEnabled}
                />

                <div className="container-fluid">
                      <div className="col-md-12 col-xs-12 mb-2 pb-3">
                        <div className="row">
                          <h2 className="mb-4 msedge-overview-content-header-main">
                          <Link className="msedge-overview-content-header-main"
                                                to={{
                                                    pathname: "/students/performance"
                                                }}
                                                aria-label="students exam reports" className="msedge-overview-content-header-main"
                                            >
                          Performance by Subject
                          </Link>
                           <span
                                  className=" pl-2"
                                  id="performance"
                                >
                                  <FontAwesomeIcon
                                    icon={faQuestionCircle}
                                  />
                                </span>
                          </h2>
                              <UncontrolledTooltip
                                placement="right"
                                target="performance">
                                {tooltipMsg.Click_for_more_details}
                              </UncontrolledTooltip>

                        </div>
                      <Link to={`/students/performance`}>
                        <QuestionProgress 
                        totalQuestions={this.state.totalQuestions}
                        totalAnswered={this.state.totalAnswered}
                        totalPercentage={this.state.totalPercentage}
                        questionProgress={this.state.questionProgress}
                        isLoadingQuestionProgress={this.state.isLoadingQuestionProgress}
                        />
                        </Link> 
                      </div>

                  <div className="row">
                    <div className="col-md-12 col-xs-12">

                      <h2 className="mb-4 msedge-overview-content-header-main">
                      {language.Performance_Over_time}
                      </h2>
                      <PerformanceOverTimeChart 
                      performanceOverTime = {this.state.performanceOverTime}
                      isLoadingPerformanceOverTime={this.state.isLoadingPerformanceOverTime}
                      />
                    </div>
                  </div>
                  <h2 className="mb-4 msedge-overview-content-header-main">
                     {language.exam_reports}
                      </h2>
                  <div className="bg-white ptb-16 msedge-student-overview-examreview">
                  
                    <ExamReports  
                      body={this.state.body}
                    />
                  </div>
                </div>
                </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default Home;
