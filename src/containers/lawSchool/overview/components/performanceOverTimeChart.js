import React, { Component } from "react";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from "recharts";
import {language} from '../../../../utils/locale/locale';
import { Col } from "reactstrap";

const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    if (payload !== null || payload !== "" || payload !== []) {
      var totalQuestions = 0, totalAnswered = 0, correctlyAnswered = 0, totalPercentage = 0
      let getSubjects = payload[0].payload.subjects;
      getSubjects.map((data, index) => {
        totalQuestions += data.totalQuestions,
          totalAnswered += data.answered,
          correctlyAnswered += data.correctlyAnswered
      })

      totalPercentage = Math.round((correctlyAnswered / totalQuestions) * 100)

      return (
        <div className="custom-tooltip pb-3"> 
          <h6 className="label">{`${label}`}</h6>
          <h6 className="desc">
            {language.overall_score}: <span>{ totalPercentage === "Infinity" || null || "" || NaN ? 0 :  totalPercentage > 100 ? 100 : totalPercentage}%</span>
          </h6>
          <p className="text-secondary">
            <span>{`${correctlyAnswered} correct answers out of ${totalQuestions} questions`}</span>
          </p>
          <table className="table">
            <thead>
              <tr>
                <th>{language.subject_or}</th>
                <th>{language.correct_answers}</th>
              </tr>
            </thead>
            <tbody>
              {getSubjects.map((data, index) => {
                return (
                  <tr>
                    <td>{data.subjectName}</td>
                    <td>{`${data.correctlyAnswered} out of ${data.answered}`}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      );
    } else {
      return null
    }
  }
  return null;
};

class PerformanceOverTimeChart extends Component {
  constructor(props) {
    super(props);
    
  }
  render() {
    return (
      <Col
        xs="12"
        sm="12"
        md="12"
        lg="12"
        xl="12"
        className="msedge-performance-over-time no-padding bg-white msedge-student-examperform"
      >
        <Col
          xs="12"
          sm="12"
          md="8"
          lg="6"
          xl="6"
        >
        </Col>
        {typeof this.props.PerformanceData !== 'undefined' && this.props.PerformanceData.length > 0 ?
          <div>
            <ResponsiveContainer width="100%" height="100%" aspect={4.0 / 1.6}>
              <ComposedChart
                width={650}
                height={325}
                data={this.props.PerformanceData}
                margin={{
                  top: 20,
                  right: 20,
                  bottom: 20,
                  left: 20
                }}
              >
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis dataKey="month" stroke="#aaa" />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  stroke="#aaa"
                  tick={{ fill: "#0be365" }}
                  domain={[0, 100]}
                  ticks={[0, 50, 100]}
                  interval={0}
                />
                <YAxis
                  yAxisId="left"
                  orientation="left"
                  stroke="#aaa"
                  tick={{ fill: "#006EBD" }}
                  tickCount={3}
                  tickLine={false}
                />
                <Tooltip
                  stroke="#0be365"
                  fill="#0be365"
                  content={<CustomTooltip />}
                />

                <ReferenceLine yAxisId="left" stroke="#aaa" />
                <Bar
                  yAxisId="left"
                  dataKey="correctlyAnswered"
                  barSize={15}
                  fill="#006EBD"
                />
                <Line
                  yAxisId="right"
                  dataKey="averageScore"
                  stroke="#0be365"
                  fill="#0be365"
                />
              </ComposedChart>
            </ResponsiveContainer>

            <div className="msedge-students-overview-custom-legend-segment-right"><span className="msedge-students-overview-custom-legend-right"></span># of average correct answers</div>
            <div className="msedge-students-overview-custom-legend-segment-left"><span className="msedge-students-overview-custom-legend-left"></span>Average exam score (%)</div>
          </div> : <h6 className="text-center msedge-setting-time-information mt-5">{language.noDataFound}</h6>
          
        }
      </Col>
    );
  }
}

export default PerformanceOverTimeChart;