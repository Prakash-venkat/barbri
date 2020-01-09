import React, { Component, Fragment } from "react";
import PageTitle from "../../../layout/AppMain/PageTitle";
import Report from "./components/report";
import {customPageTitle} from "../../../../components/commonComponents/customPageTitle"
import { language } from '../../../../utils/locale/locale'
class Index extends Component {
  componentDidMount(){
    customPageTitle(language.exam_reports)
  }
  render() {
    return (
      <div className="msedge-student-exam-reports">
        <Fragment>
          <div className="exam-report-heading-shadow">
            <PageTitle
              heading={language.exam_reports}
              brdcrumptwo={language.statistics}
              brdcrumpthree={language.exam_reports}
              subheading={language.exam_report_header}
              brdcrumptwolink="/students/performance"
              linkToHome="/students"
            />
          </div>

          <div className="row">
              <div className="container-fluid bg-grey p-30">
                <div className="msedge-ongoingcontain">
                  <Report />
                </div>
              </div>
          </div>
        </Fragment>
      </div>
    );
  }
}

export default Index