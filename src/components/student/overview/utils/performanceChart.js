import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import {
    PieChart, Pie, Sector, Cell, ResponsiveContainer
} from 'recharts';

const data = [
    { name: 'Group A', value: 2000 },
    { name: 'Group B', value: 335 },
];
const subjectPerformance = [
    { subject: 'Contracts', answered: 26, question: 36 },
    { subject: 'Criminal Law', answered: 32, question: 41 },
    { subject: 'Evidence', answered: 30, question: 31 },
    { subject: 'Real propert', answered: 19, question: 41 },
    { subject: 'Torts', answered: 32, question: 41 },
    { subject: 'Constitution Law', answered: 7, question: 21 },
    { subject: 'Civil', answered: 15, question: 28 },
];
const COLORS = ['#cccccc', '#0e6aae'];

export class PerformanceChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filteredData: []
        };
    }
    componentDidMount() {
        this.fetchData();
    }

    fetchData = () => {
        fetch("http://barbri.thinrootsoftware.com/barbriapi/past_performance.php")
            .then(response => response.json())
            .then(data =>
                this.setState({ filteredData: data }));
    };

    render() {

        let performancePercentage = (data[1].value / data[0].value) * 100;
        performancePercentage = Math.round(performancePercentage * 10) / 10;
        if (this.state.filteredData.length === 0) {
            return null;
        }
        return (
            <div className="col-md-12 col-xs-12 pie-chart bg-white">
                <div className="col-md-12 col-xs-12 pie-chrt-head">
                    <h5>All subject performance</h5>
                    <span className="rightArrow"><FontAwesomeIcon icon={faArrowRight} /></span>
                </div>
                <div className="col-md-6 col-xs-12">
                    <div style={{ width: '100%', height: 344 }} className="pie-chart-graph">
                        <ResponsiveContainer>
                            <PieChart onMouseEnter={this.onPieEnter}>
                                <Pie
                                    data={data}
                                    // cx={120}
                                    // cy={200}
                                    innerRadius={70}
                                    outerRadius={85}
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
                        <div className="col-md-12 col-xs-12 inner-piechart-content">
                            <span className="performance-perc">{performancePercentage}%</span><br />
                            <span className="ans-out-of-ques">{data[1].value} questions answered <br />out of {data[0].value}</span>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-xs-12 no-padding subject-sec">
                    {this.state.filteredData.Subjects.map((entry, index) =>
                        <div className="col-md-12 no-padding sub-wise-perfor">
                            <div className="col-md-4 no-padding sub">
                                <span>{entry.subject_name}</span>
                            </div>
                            <div className="col-md-8 no-padding num">
                                <p><span>(30 of</span> <span>35) - </span><span>{85}%</span></p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default PerformanceChart
