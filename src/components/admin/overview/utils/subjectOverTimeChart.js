import React, { Component } from 'react'
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ResponsiveContainer,
    ReferenceLine
  } from 'recharts';
  
const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    return (
      <div className="custom-tooltip">
        <h6 className="label">{`${payload[0].dataKey}`}</h6>
        <h6 className="desc">Overall Score: <span>{`${payload[0].value}%`}</span></h6>
        <table className="table">
          <thead>
            <tr>
              <th>Topic</th>
              <th>%Correct</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Equal protection</td>
              <td>{`${payload[0].value}%`}</td>
            </tr>
            <tr>
              <td>Federal executive power</td>
              <td>{`${payload[1].value}%`}</td>
            </tr>
            <tr>
              <td>Federal judicial power</td>
              <td>{`${payload[2].value}%`}</td>
            </tr>
            <tr>
              <td>Federalism</td>
              <td>{`${payload[3].value}%`}</td>
            </tr>
            <tr>
              <td>Freedom of religion</td>
              <td>{`${payload[4].value}%`}</td>
            </tr>
            <tr>
              <td>Freedom of speech & assembly</td>
              <td>{`${payload[5].value}%`}</td>
            </tr>
            <tr>
              <td>Procedural due process, Talkings, & Retroactive legistation</td>
              <td>{`${payload[6].value}%`}</td>
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
    <div className="row">
      <div className="legend-wrapper col-md-6 col-xs-12 no-padding">
        <div className="col-md-12 first-row no-padding">
            <div className="first-item col-md-3 no-padding">Overall</div>
            <div className="second-item col-md-4 no-padding">Criminal Law</div>
            <div className="third-item col-md-3 no-padding">Contracts</div>
            <div className="fourth-item col-md-2 no-padding">Torts</div>
        </div>
        <div className="col-md-12 second-row no-padding">
            <div className="fiveth-item col-md-3 no-padding">Evidence</div>
            <div className="sixth-item col-md-4 no-padding">Constitutional Law</div>
            <div className="seventh-item col-md-3 no-padding">Real propert</div>
            <div className="eighth-item col-md-2 no-padding">Civil</div>
        </div>
      </div>
        <div className="legend-msg col-md-6 col-xs-12">
            <span>*click on the legend to view only selected subject</span>
        </div>
    </div>
  );
}
export class SubjectOverTimeChart extends Component { 
    render() {
        return (
                <ResponsiveContainer width='100%' aspect={4.0 / 1.6} className="subject-over-time">
                  <LineChart
                      height={325}
                      data={this.props.data}
                      margin={{
                      top: 5, right: 30, left: 20, bottom: 5,
                      }}
                  >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" padding={{ right: 20, left: 20 }} />
                      <YAxis tickCount={6} tickLine={false} tick={{fill: '#0be365'}}/>
                      <Tooltip viewBox={{ width: 200, height: 200 }} cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip/>}/>
                      <Legend iconType="circle" iconSize={8}  content={renderLegend}/>
                      <ReferenceLine y={60} stroke="#666"/>
                      <Line dataKey="Overall" stroke="#cc9900" fill="#cc9900" activeDot={{ r: 4 }} />
                      <Line dataKey="Criminal_Law" stroke="#0e6aae" fill="#0e6aae" activeDot={{ r: 4 }} />
                      <Line dataKey="Contract" stroke="#ff3399" fill="#ff3399" activeDot={{ r: 4 }} />
                      <Line dataKey="Torts" stroke="#82ca9d" fill="#82ca9d" activeDot={{ r: 4 }} />
                      <Line dataKey="Evidence" stroke="#003300" fill="#003300" activeDot={{ r: 4 }} />
                      <Line dataKey="Constitutional_Law" stroke="#ff6666" fill="#ff6666" activeDot={{ r: 4 }} />
                      <Line dataKey="Real_propert" stroke="#800000" fill="#800000" activeDot={{ r: 4 }} />
                      <Line dataKey="Civil" stroke="#0099cc" fill="#0099cc" activeDot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
        )
    }
}

export default SubjectOverTimeChart
