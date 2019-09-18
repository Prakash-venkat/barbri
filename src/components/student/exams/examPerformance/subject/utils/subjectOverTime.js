import React, { Component } from 'react'
import "../../../../../../assets/custom/students/_students_exams.scss"

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip as Tool,
  AreaChart,
  Area,
  ResponsiveContainer
} from "recharts";

const data = [
  {
    month: "Apr 19",
    percentage: 20,
   
  },
  {
    month: "May 19",
    percentage: 51,

  },
  {
    month: "Jun 19",
    percentage: 79,
   
  },
  {
    month: "Jul 19",
    percentage: 60,
    
  }
];

   
const CustomTooltip = ({ active, payload, label }) => {
 
  if (active) {
    
    return (
      <div className="custom-tooltip bg-white card-border text-center ">
        <h6 className="label bg-primary text-white p-2 rounded-top">{`${label}`}</h6>
        <h6 className="desc p-2"> Score: <span className={payload[0].value > 70 ? 'text-success p-3 ' :payload[0].value > 50 ? ' text-warning p-1' : 'text-danger p-1' }>{`${payload[0].value}%`}</span></h6>
       
        {/* <div className="footer">*Score breakdown </div> */}
      </div>
    );
  } 

  return null;
};
export default class SubjectOverTime extends Component {
  render() {
    const screenSize=screen.width;

    return (
      <div>
         
          <AreaChart
             className='mt-4 chart-margin-right'
              width={  screenSize > 1339 ?  600 : screenSize > 1023 ?  520 : screenSize > 768 ?  600  : screenSize > 425 ?  370:  screenSize > 375 ?  330 :  screenSize > 320 ?  270 : 230}
            //  width={600} 
              height={screenSize > 768 ?  295 : screenSize > 320 ?  300 : 200}
              height={  screenSize > 1339 ?  295 : screenSize > 1023 ?  295 : screenSize > 768 ?  295  : screenSize > 424 ?  295:  screenSize > 375 ?  400 :  screenSize > 320 ?  290 : 230}
              data={data}
             
            >
              <defs>
                
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3559af" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tool stroke="#0be365" fill="#0be365" content={<CustomTooltip/>}/>
            
              <Area
              dot={true} 
                type="monotone"
                dataKey="percentage"
                stroke="#3559af"
                fillOpacity={1}
              
                fill="url(#colorPv)"
              />
            </AreaChart>
           
      </div>
    )
  }
}
