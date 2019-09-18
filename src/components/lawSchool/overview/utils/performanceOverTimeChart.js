import React, { Component } from 'react'
import {
  ComposedChart, Line, Area, Bar, XAxis,
  YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, ReferenceLine
} from 'recharts';

import {
  InputGroup, InputGroupAddon, FormGroup, Label, Form, Col, Row
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faCalendarAlt,

} from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-datepicker';
import { SubjectOverTimeChart } from './subjectOverTimeChart'
const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    return (
      <div className="custom-tooltip">
        <h6 className="label">{`${label}`}</h6>
        <h6 className="desc">Overall Score: <span>{`${payload[0].value}%`}</span></h6>
        <table className="table">
          <thead>
            <tr>
              <th>Subject</th>
              <th>%Correct</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Civil procedure</td>
              <td>{`${payload[0].value - 8}%`}</td>
            </tr>
            <tr>
              <td>Constitutional law</td>
              <td>{`${payload[0].value - 20}%`}</td>
            </tr>
            <tr>
              <td>Contracts</td>
              <td>{`${payload[0].value - 13}%`}</td>
            </tr>
            <tr>
              <td>Criminal law and Procedure</td>
              <td>{`${payload[0].value + 10}%`}</td>
            </tr>
            <tr>
              <td>Evidence</td>
              <td>{`${payload[0].value - 30}%`}</td>
            </tr>
            <tr>
              <td>Torts</td>
              <td>{`${payload[0].value + 15}%`}</td>
            </tr>
            <tr>
              <td>Real property</td>
              <td>{`${payload[0].value + 8}%`}</td>
            </tr>
          </tbody>
        </table>
        <div className="footer">*Score breakdown derived from activities performed online</div>
      </div>
    );
  }

  return null;
};
const renderLegend = (props) => {
  const { payload } = props;

  return (
    <div className="legend-wrapper">
      <div className="first-item">Average score</div>
      <div className="second-item">No off answerer question</div>
    </div>
  );
}
export class PerformanceOverTimeChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      perfoemnceOverTime: true,
      subjectOvertime: false,
      perfoemnceOverTimeHeading: "Performance over time",
      subjectOvertimeBtn: "Subject over time",
      index: true,
      startDate: new Date(2018, 7, 18),
      endDate: new Date(2019, 6, 19),
      data: [
        { name: 'Aug 18', Average_score: 59, No_off_answerer_question: 43, amt: 1400, Footer: "*score" },
        { name: 'Sep 18', Average_score: 46, No_off_answerer_question: 53, amt: 1506, Footer: "*score" },
        { name: 'Oct 18', Average_score: 37, No_off_answerer_question: 64, amt: 989, Footer: "*score" },
        { name: 'Nov 18', Average_score: 40, No_off_answerer_question: 47, amt: 1228, Footer: "*score" },
        { name: 'Dec 18', Average_score: 80, No_off_answerer_question: 51, amt: 1100, Footer: "*score" },
        { name: 'Jan 19', Average_score: 30, No_off_answerer_question: 67, amt: 1700, Footer: "*score" },
        { name: 'Feb 19', Average_score: 50, No_off_answerer_question: 47, amt: 1700, Footer: "*score" },
        { name: 'Mar 19', Average_score: 70, No_off_answerer_question: 37, amt: 1700, Footer: "*score" },
        { name: 'Apr 19', Average_score: 30, No_off_answerer_question: 57, amt: 1700, Footer: "*score" },
        { name: 'May 19', Average_score: 70, No_off_answerer_question: 47, amt: 1700, Footer: "*score" },
        { name: 'Jun 19', Average_score: 75, No_off_answerer_question: 57, amt: 1700, Footer: "*score" },
        { name: 'Jul 19', Average_score: 30, No_off_answerer_question: 57, amt: 1700, Footer: "*score" },
      ],
      subjectData: [
        { name: 'Aug 18', Contract: 40, Evidence: 54, Torts: 60, Overall: 63, Criminal_Law: 47, Constitutional_Law: 76, Real_propert: 55, Civil: 53, },
        { name: 'Sep 18', Contract: 48, Evidence: 58, Torts: 69, Overall: 73, Criminal_Law: 57, Constitutional_Law: 66, Real_propert: 85, Civil: 43, },
        { name: 'Oct 18', Contract: 50, Evidence: 50, Torts: 66, Overall: 64, Criminal_Law: 54, Constitutional_Law: 77, Real_propert: 55, Civil: 43, },
        { name: 'Nov 18', Contract: 40, Evidence: 50, Torts: 60, Overall: 64, Criminal_Law: 74, Constitutional_Law: 64, Real_propert: 55, Civil: 53, },
        { name: 'Dec 18', Contract: 45, Evidence: 58, Torts: 63, Overall: 73, Criminal_Law: 47, Constitutional_Law: 56, Real_propert: 65, Civil: 43, },
        { name: 'Jan 19', Contract: 50, Evidence: 58, Torts: 65, Overall: 63, Criminal_Law: 47, Constitutional_Law: 56, Real_propert: 55, Civil: 63, },
        { name: 'Feb 19', Contract: 40, Evidence: 53, Torts: 70, Overall: 63, Criminal_Law: 57, Constitutional_Law: 76, Real_propert: 35, Civil: 53, },
        { name: 'Mar 19', Contract: 48, Evidence: 54, Torts: 60, Overall: 73, Criminal_Law: 47, Constitutional_Law: 76, Real_propert: 55, Civil: 43, },
        { name: 'Apr 19', Contract: 40, Evidence: 58, Torts: 70, Overall: 63, Criminal_Law: 57, Constitutional_Law: 66, Real_propert: 85, Civil: 53, },
        { name: 'May 19', Contract: 48, Evidence: 50, Torts: 60, Overall: 64, Criminal_Law: 54, Constitutional_Law: 67, Real_propert: 55, Civil: 43, },
        { name: 'Jun 19', Contract: 45, Evidence: 50, Torts: 67, Overall: 74, Criminal_Law: 44, Constitutional_Law: 64, Real_propert: 55, Civil: 43, },
        { name: 'Jul 19', Contract: 50, Evidence: 58, Torts: 61, Overall: 73, Criminal_Law: 47, Constitutional_Law: 66, Real_propert: 45, Civil: 43, },
        { name: 'Aug 19', Contract: 50, Evidence: 58, Torts: 65, Overall: 63, Criminal_Law: 47, Constitutional_Law: 76, Real_propert: 55, Civil: 43, },
        { name: 'Sep 19', Contract: 46, Evidence: 53, Torts: 61, Overall: 73, Criminal_Law: 57, Constitutional_Law: 76, Real_propert: 55, Civil: 53, },
      ]
    }
    // this.handleChange = this.handleChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.handleSubjectOverTimeClick = this.handleSubjectOverTimeClick.bind(this);
    this.togleDataWeekly = this.togleDataWeekly.bind(this);
    this.togleDataMonthly = this.togleDataMonthly.bind(this);
  }

  handleEndDateChange(date) {
    this.setState({
      endDate: date
    });
  }
  handleSubjectOverTimeClick() {
    if (this.state.index) {
      this.setState({
        perfoemnceOverTime: false,
        subjectOvertime: true,
        perfoemnceOverTimeHeading: "Subject over time",
        subjectOvertimeBtn: "Performance over time",
        index: false,
      });
    }
    else {
      this.setState({
        perfoemnceOverTime: true,
        subjectOvertime: false,
        perfoemnceOverTimeHeading: "Performance over time",
        subjectOvertimeBtn: "Subject over time",
        index: true,
      });
    }
  }
  componentDidMount() {
    function myFunction() {
      var node = document.createElement("LI");
      var textnode = document.createTextNode("Water");
      node.appendChild(textnode);
      document.getElementsByClassName("recharts-default-tooltip").appendChild(node);
    }
    // this.myFunction();
  }
  togleDataWeekly() {
    document.getElementById('weekly').style.background = '#0e6aae';
    document.getElementById('weekly').style.border = "1px solid #0e6aae";
    document.getElementById('weekly').style.color = "#fff";

    document.getElementById('monthly').style.background = '#fff';
    document.getElementById('monthly').style.border = "1px solid #999";
    document.getElementById('monthly').style.color = "#999";
    this.setState({
      data: [
        { name: 'W1', Average_score: 59, No_off_answerer_question: 83, amt: 1400, Footer: "*score" },
        { name: 'W2', Average_score: 86, No_off_answerer_question: 43, amt: 1506, Footer: "*score" },
        { name: 'W3', Average_score: 67, No_off_answerer_question: 64, amt: 989, Footer: "*score" },
        { name: 'W4', Average_score: 80, No_off_answerer_question: 77, amt: 1228, Footer: "*score" },
        { name: 'W5', Average_score: 20, No_off_answerer_question: 31, amt: 1100, Footer: "*score" },
        { name: 'W6', Average_score: 40, No_off_answerer_question: 37, amt: 1700, Footer: "*score" },
        { name: 'W7', Average_score: 80, No_off_answerer_question: 77, amt: 1700, Footer: "*score" },
        { name: 'W8', Average_score: 40, No_off_answerer_question: 57, amt: 1700, Footer: "*score" },
        { name: 'W9', Average_score: 50, No_off_answerer_question: 47, amt: 1700, Footer: "*score" },
        { name: 'W10', Average_score: 20, No_off_answerer_question: 87, amt: 1700, Footer: "*score" },
        { name: 'W11', Average_score: 50, No_off_answerer_question: 77, amt: 1700, Footer: "*score" },
        { name: 'W12', Average_score: 60, No_off_answerer_question: 87, amt: 1700, Footer: "*score" },
      ],
      subjectData: [
        { name: 'w1', Contract: 60, Evidence: 74, Torts: 30, Overall: 63, Criminal_Law: 47, Constitutional_Law: 76, Real_propert: 55, Civil: 63, },
        { name: 'w2', Contract: 68, Evidence: 78, Torts: 39, Overall: 73, Criminal_Law: 37, Constitutional_Law: 46, Real_propert: 85, Civil: 63, },
        { name: 'w3', Contract: 70, Evidence: 70, Torts: 36, Overall: 44, Criminal_Law: 54, Constitutional_Law: 77, Real_propert: 55, Civil: 73, },
        { name: 'w4', Contract: 60, Evidence: 70, Torts: 30, Overall: 74, Criminal_Law: 74, Constitutional_Law: 64, Real_propert: 55, Civil: 73, },
        { name: 'w5', Contract: 65, Evidence: 78, Torts: 33, Overall: 33, Criminal_Law: 47, Constitutional_Law: 56, Real_propert: 65, Civil: 63, },
        { name: 'w6', Contract: 70, Evidence: 78, Torts: 35, Overall: 63, Criminal_Law: 47, Constitutional_Law: 56, Real_propert: 55, Civil: 44, },
        { name: 'w7', Contract: 60, Evidence: 73, Torts: 40, Overall: 63, Criminal_Law: 57, Constitutional_Law: 76, Real_propert: 35, Civil: 73, },
        { name: 'w8', Contract: 68, Evidence: 74, Torts: 30, Overall: 73, Criminal_Law: 47, Constitutional_Law: 76, Real_propert: 55, Civil: 73, },
        { name: 'w9', Contract: 60, Evidence: 78, Torts: 40, Overall: 63, Criminal_Law: 57, Constitutional_Law: 66, Real_propert: 85, Civil: 73, },
        { name: 'w10', Contract: 68, Evidence: 70, Torts: 30, Overall: 64, Criminal_Law: 54, Constitutional_Law: 67, Real_propert: 55, Civil: 73, },
        { name: 'w11', Contract: 65, Evidence: 70, Torts: 37, Overall: 74, Criminal_Law: 44, Constitutional_Law: 64, Real_propert: 55, Civil: 73, },
        { name: 'w12', Contract: 70, Evidence: 78, Torts: 31, Overall: 73, Criminal_Law: 47, Constitutional_Law: 66, Real_propert: 45, Civil: 73, },
        { name: 'w13', Contract: 70, Evidence: 78, Torts: 35, Overall: 63, Criminal_Law: 47, Constitutional_Law: 76, Real_propert: 55, Civil: 73, },
        { name: 'w14', Contract: 66, Evidence: 73, Torts: 31, Overall: 73, Criminal_Law: 57, Constitutional_Law: 76, Real_propert: 55, Civil: 83, },
      ]
    })
  }
  togleDataMonthly() {
    document.getElementById('monthly').style.background = '#0e6aae';
    document.getElementById('monthly').style.border = "1px solid #0e6aae";
    document.getElementById('monthly').style.color = "#fff";

    document.getElementById('weekly').style.background = '#fff';
    document.getElementById('weekly').style.border = "1px solid #999";
    document.getElementById('weekly').style.color = "#999";
    this.setState({
      data: [
        { name: 'Aug 18', Average_score: 59, No_off_answerer_question: 43, amt: 1400, Footer: "*score" },
        { name: 'Sep 18', Average_score: 46, No_off_answerer_question: 53, amt: 1506, Footer: "*score" },
        { name: 'Oct 18', Average_score: 37, No_off_answerer_question: 64, amt: 989, Footer: "*score" },
        { name: 'Nov 18', Average_score: 40, No_off_answerer_question: 47, amt: 1228, Footer: "*score" },
        { name: 'Dec 18', Average_score: 80, No_off_answerer_question: 51, amt: 1100, Footer: "*score" },
        { name: 'Jan 19', Average_score: 30, No_off_answerer_question: 67, amt: 1700, Footer: "*score" },
        { name: 'Feb 19', Average_score: 50, No_off_answerer_question: 47, amt: 1700, Footer: "*score" },
        { name: 'Mar 19', Average_score: 70, No_off_answerer_question: 37, amt: 1700, Footer: "*score" },
        { name: 'Apr 19', Average_score: 30, No_off_answerer_question: 57, amt: 1700, Footer: "*score" },
        { name: 'May 19', Average_score: 70, No_off_answerer_question: 47, amt: 1700, Footer: "*score" },
        { name: 'Jun 19', Average_score: 75, No_off_answerer_question: 57, amt: 1700, Footer: "*score" },
        { name: 'Jul 19', Average_score: 30, No_off_answerer_question: 57, amt: 1700, Footer: "*score" },
      ],
      subjectData: [
        { name: 'Aug 18', Contract: 40, Evidence: 54, Torts: 60, Overall: 63, Criminal_Law: 47, Constitutional_Law: 76, Real_propert: 55, Civil: 53, },
        { name: 'Sep 18', Contract: 48, Evidence: 58, Torts: 69, Overall: 73, Criminal_Law: 57, Constitutional_Law: 66, Real_propert: 85, Civil: 43, },
        { name: 'Oct 18', Contract: 50, Evidence: 50, Torts: 66, Overall: 64, Criminal_Law: 54, Constitutional_Law: 77, Real_propert: 55, Civil: 43, },
        { name: 'Nov 18', Contract: 40, Evidence: 50, Torts: 60, Overall: 64, Criminal_Law: 74, Constitutional_Law: 64, Real_propert: 55, Civil: 53, },
        { name: 'Dec 18', Contract: 45, Evidence: 58, Torts: 63, Overall: 73, Criminal_Law: 47, Constitutional_Law: 56, Real_propert: 65, Civil: 43, },
        { name: 'Jan 19', Contract: 50, Evidence: 58, Torts: 65, Overall: 63, Criminal_Law: 47, Constitutional_Law: 56, Real_propert: 55, Civil: 63, },
        { name: 'Feb 19', Contract: 40, Evidence: 53, Torts: 70, Overall: 63, Criminal_Law: 57, Constitutional_Law: 76, Real_propert: 35, Civil: 53, },
        { name: 'Mar 19', Contract: 48, Evidence: 54, Torts: 60, Overall: 73, Criminal_Law: 47, Constitutional_Law: 76, Real_propert: 55, Civil: 43, },
        { name: 'Apr 19', Contract: 40, Evidence: 58, Torts: 70, Overall: 63, Criminal_Law: 57, Constitutional_Law: 66, Real_propert: 85, Civil: 53, },
        { name: 'May 19', Contract: 48, Evidence: 50, Torts: 60, Overall: 64, Criminal_Law: 54, Constitutional_Law: 67, Real_propert: 55, Civil: 43, },
        { name: 'Jun 19', Contract: 45, Evidence: 50, Torts: 67, Overall: 74, Criminal_Law: 44, Constitutional_Law: 64, Real_propert: 55, Civil: 43, },
        { name: 'Jul 19', Contract: 50, Evidence: 58, Torts: 61, Overall: 73, Criminal_Law: 47, Constitutional_Law: 66, Real_propert: 45, Civil: 43, },
        { name: 'Aug 19', Contract: 50, Evidence: 58, Torts: 65, Overall: 63, Criminal_Law: 47, Constitutional_Law: 76, Real_propert: 55, Civil: 43, },
        { name: 'Sep 19', Contract: 46, Evidence: 53, Torts: 61, Overall: 73, Criminal_Law: 57, Constitutional_Law: 76, Real_propert: 55, Civil: 53, },
      ]
    })

  }
  render() {
    return (
      <div className="col-md-12 performance-over-time no-padding  bg-white">
        <div className="col-md-12 head-section no-padding">
          <h4 className="col-md-3 col-xs-12">{this.state.perfoemnceOverTimeHeading}</h4>
          <div className="col-md-4 toggleDataButton">
            <button id="monthly" className="monthly" onClick={this.togleDataMonthly}>Monthly</button>
            <button id="weekly" className="weekly" onClick={this.togleDataWeekly}>Weekly</button>
          </div>
          <div className="col-md-5 col-xs-12 heading-wrapper">
            <div className="col-md-6">
              <button className="btn btn-primary col-md-12" onClick={this.handleSubjectOverTimeClick}>{this.state.subjectOvertimeBtn}</button>
            </div>
            <div className="col-md-6 no-padding date-picker">
              <FormGroup>
                <InputGroup>
                  <DatePicker
                    selected={this.state.startDate}
                    onChange={this.handleChange}
                    selectsStart
                    className="form-control"
                    dateFormat="MMM d"
                  />
                  <span>-</span>
                  <DatePicker
                    selected={this.state.endDate}
                    onChange={this.handleEndDateChange}
                    selectsEnd
                    className="form-control"
                    dateFormat="MMM d"
                  />
                  <InputGroupAddon addonType="prepend">
                    <div className="input-group-text">
                      <FontAwesomeIcon icon={faCalendarAlt} />
                    </div>
                  </InputGroupAddon>
                </InputGroup>
              </FormGroup>
            </div>
          </div>
        </div>
        {this.state.perfoemnceOverTime ? (
          <ResponsiveContainer width='100%' height='100%' aspect={4.0 / 1.6}>
            <ComposedChart
              width={650}
              height={325}
              data={this.state.data}
              margin={{
                top: 20, right: 20, bottom: 20, left: 20,
              }}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis dataKey="name" stroke="#aaa" />
              <YAxis yAxisId="left" orientation="left" stroke="#aaa" tick={{ fill: '#0be365' }} tickCount={6} tickLine={false} />
              <YAxis yAxisId="right" orientation="right" stroke="#aaa" tick={{ fill: '#0e6aae' }} tickCount={6} tickLine={false} />
              <Tooltip stroke="#0be365" fill="#0be365" content={<CustomTooltip />} />
              <Legend stroke="#0be365" fill="#0be365" iconType="square" content={renderLegend} />
              <ReferenceLine yAxisId="left" y={60} stroke="#aaa" />
              <Bar yAxisId="left" dataKey="Average_score" barSize={15} fill="#0e6aae" />
              <Line yAxisId="right" dataKey="No_off_answerer_question" stroke="#0be365" fill="#0be365" />
              {/* <Line yAxisId="left" type="monotone" dataKey="Footer"/> */}
            </ComposedChart>
          </ResponsiveContainer>) : (<SubjectOverTimeChart data={this.state.subjectData} />)}
        <div className="percer-simbol">%</div>
      </div>
    )
  }
}

export default PerformanceOverTimeChart
