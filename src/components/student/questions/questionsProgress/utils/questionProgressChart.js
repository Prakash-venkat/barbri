import React, { Component } from 'react'
import {
  PieChart, Pie, Sector, Cell, ResponsiveContainer
} from 'recharts';

const data = [
  { name: 'Group A', value: 2000 },
  { name: 'Group B', value: 335 },
];
const subjectPerformance = [
    { subject: 'Contracts', answered: 26, question: 36},
    { subject: 'Criminal law', answered: 32, question: 41},
    { subject: 'Torts', answered: 21, question: 28},
  ];
const COLORS = ['#cccccc', '#0e6aae'];

export class QuestionProgressChart extends Component {
    
    render() {
        
        let performancePercentage = (data[1].value/data[0].value)*100;
            performancePercentage = Math.round( performancePercentage * 10 ) / 10;
        return (
            <div className="col-md-4 col-xs-12 pie-chart">
                <div style={{ width: '100%', height: 280 }}>
                    <ResponsiveContainer>
                        <PieChart onMouseEnter={this.onPieEnter}>
                            <Pie
                            data={data}
                            cx={120}
                            cy={150}
                            innerRadius={75}
                            outerRadius={95}
                            fill="#8884d8"
                            paddingAngle={0}
                            dataKey="value"
                            startAngle={90}
                            endAngle={450}
                            >
                            {
                                data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke={COLORS[index % COLORS.length]} />)
                            }
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="col-md-12 col-xs-12 inner-piechart-content">
                    <span className="performance-perc">{performancePercentage}%</span><br/>
                    <span className="ans-out-of-ques">{data[1].value} question answered <br/>out of {data[0].value}</span>
                </div>
                
            </div>
        )
    }
}

export default QuestionProgressChart
