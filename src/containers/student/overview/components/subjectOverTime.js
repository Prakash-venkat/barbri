import React, { Component } from "react";
import { ResponsiveContainer } from "recharts";
import { Col, Row } from "reactstrap";
import { Line as ChartLine } from "react-chartjs-2";
import { subjectPerformanceData } from "./staticData";
import {instance} from "../../../../actions/constants";
import {language} from "../../../../utils/locale/locale";

var backgroundColor = [
  "rgba(75,192,192,0.4)",
  "#006EBD",
  "#82ca9d",
  "#003300",
  "#ff6666",
  "#800000",
  "#0099cc"
]


class AllSubjects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subjectOvertime: [],
      startDate: new Date(2018, 7, 18),
      endDate: new Date(2019, 6, 19),
      noDataFound: false,
      isLoading: false
    };
  }

  componentDidMount() {
    let studentDetails = JSON.parse(sessionStorage.getItem("StudentSession"));
    let studentID = studentDetails.userStudentID;
    instance.get(`dashboard/subjectperformance/student/${studentID}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,        
      }
    })
      .then(response => {
        return response;
      })
      .then(result => {
        if(result.data == '' || result.data.length == 0){
          this.setState({
            noDataFound: true,
            isLoading: false
          });
        }
        else{
          this.setState({
            subjectOvertime: result.data,
            isLoading: false
          });
        }
      })
 
      .catch(error => {
        this.setState({
          noDataFound: true,
          isLoading: false
        });
      });
  }

  render() {
      var labels =[]
      this.state.subjectOvertime.map((data,index)=>{
           labels.push(data.monthYear)
      })

   var final=  this.state.subjectOvertime.map((maindata,index)=>{
       return [{
          label: maindata.subjects.map((subjectdata,subjectindex)=> {return subjectdata.subjectName}),
          fill: false,
          lineTension: 0.1,
          backgroundColor: backgroundColor[index],
          borderColor: backgroundColor[index],
          borderCapStyle: "butt",
          borderDash: [],
          borderWidth: 1,
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 5,
          pointHoverRadius: 2,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: maindata.subjects.map((data,i)=>{return data.totalQuestions})
        }]
      })
    return (
      <div className="col-md-12 no-padding bg-white msedge-subject-outline">
        <div className="col-md-12 no-padding">
          <Row>
            <Col
              xs="12"
              sm="12"
              md="6"
              lg="6"
              xl="6"
              className="no-padding d-flex msedge-sm-unset"
            >
              <h2 className="ml-5 mt-2 msedge-student-subovertime msedge-overview-content-header">
               {language.subject_over_time}
              </h2>
            </Col>
            {/* <Col
              xs="12"
              sm="12"
              md="6"
              lg="6"
              xl="6"
              className="mt-0 overview-input-datepicker"
            >
              <Row className="justify-content-end msedge-md-unset-justify">
                <div className="date-picker subject-datepicker">
                  <FormGroup>
                    <InputGroup>
                      <DatePicker
                        selected={this.state.startDate}
                        onChange={this.handleChange}
                        selectsStart
                        className="form-control"
                        dateFormat="MMM d"
                        title={`Subject over time start date`}
                        aria-label={`Subject over time start date`}
                      />
                      <span className="msedge-date-seperator">-</span>
                      <DatePicker
                        selected={this.state.endDate}
                        onChange={this.handleEndDateChange}
                        selectsEnd
                        className="form-control"
                        dateFormat="MMM d"
                        title={`Subject over time end date`}
                        aria-label={`Subject over time end date`}
                      />
                      <InputGroupAddon addonType="prepend">
                        <div className="input-group-text">
                          <FontAwesomeIcon icon={faCalendarAlt} />
                        </div>
                      </InputGroupAddon>
                    </InputGroup>
                  </FormGroup>
                </div>
              </Row>
            </Col> */}
          </Row>
          <div className="msedge-align-subject-over-time">
            <ResponsiveContainer width="100%" height="100%" aspect={4.0 / 1.6}>
              <ChartLine
                data={subjectPerformanceData}
                options={{
                  scales: {
                    yAxes: [
                      {
                        ticks: {
                          fontSize: `${14}`
                        }
                      }
                    ],
                    xAxes: [
                      {
                        ticks: {
                          fontSize: `${14}`
                        }
                      }
                    ]
                  }
                }}
              />
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  }
}

export default AllSubjects;
