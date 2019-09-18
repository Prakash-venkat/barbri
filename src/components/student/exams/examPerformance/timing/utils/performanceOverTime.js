import React, { Component } from 'react'

// import { Bar } from 'react-chartjs-2';
import {
    ResponsiveContainer, ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import Timing from '..';

const data = [
    {
        AnswerTime: '10', Performance: 0,
    },
    {
        AnswerTime: '20', Performance: 0,
    },
    {
        AnswerTime: '30', Performance: 100,
    },
    {
        AnswerTime: '40', HighestAccuracy: 100, Performance: 80,
    },
    {
        AnswerTime: '50', Performance: 100,
    },
    {
        AnswerTime: '60', Performance: 10,
    },
    {
        AnswerTime: '70', AverageAllocatedTime: 100, Performance: 0,
    },
    {
        AnswerTime: '80', Performance: 0,
    },
    {
        AnswerTime: '90', Performance: 0,
    },

    {
        AnswerTime: '100', Performance: 0,
    },
];
export class PerformanceOverTime extends Component {
    render() {
        return (
            <div style={{ width: '100%', height: 350 }}>
                <ResponsiveContainer>
                    <ComposedChart
                        width={500}
                        height={400}
                        data={data}
                        margin={{
                            top: 20, right: 20, bottom: 20, left: 20,
                        }}
                    >
                        <CartesianGrid stroke="#f5f5f5" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <XAxis dataKey="AnswerTime" />
                        <Area type="monotone" dataKey="Performance" fill="#8884d8" stroke="#8884d8" fillOpacity="0.1" />
                        <Bar dataKey="HighestAccuracy" barSize={50} left={12} fill=" #f7b924" />
                        <Bar dataKey="AverageAllocatedTime" barSize={5} fill="#FF0074" />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        )
    }
}

export default PerformanceOverTime
