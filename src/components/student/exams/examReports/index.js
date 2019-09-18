//Authorization:
//Designed : by Muthuraja
//Purpose: Created for exam Reports
//Description: Table for displaying exam reports

import React, { Fragment } from "react";
import "../../../../assets/custom/students/_students_exams.scss";
import PageTitle from "../../Layout/AppMain/PageTitle";
import Report from './utils/report'

export default class List extends React.Component {
 constructor() {
   super();

 }

 render() {
   return (
     <div className="students-exam-reports">
       <Fragment>
         <div className="exam-report-heading-shadow">
           <PageTitle
             heading=" Exam Reports"
             subheading="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
             brdcrumptwo="Exams"
             brdcrumpthree="Exam Reports"
           />
         </div>

         <div>
           <Report />
         </div>

       </Fragment>
     </div>
   );
 }
}