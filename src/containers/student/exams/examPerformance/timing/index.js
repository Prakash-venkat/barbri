import React, { Component, Fragment } from "react";
import PageTitle from "../../../../layout/AppMain/PageTitle";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { Col } from "reactstrap";
import TimeTakenforExam from "./components/timeTakenforExam";
import {customPageTitle} from "../../../../../components/commonComponents/customPageTitle"
import { language } from '../../../../../utils/locale/locale'
class Timing extends Component {
 
  componentDidMount() {
    customPageTitle("Timing")
  }

  render() {
    return (
      <div className="msedge-timing">
        <Fragment>
          <ReactCSSTransitionGroup
            component="div"
            transitionName="TabsAnimation"
            transitionAppear={true}
            transitionAppearTimeout={0}
            transitionEnter={false}
            transitionLeave={false}
          >
            <PageTitle
              heading={language.timing}
              brdcrumptwo={language.statistics}
              brdcrumpthree={language.timing}
              subheading={language.exams_header}
              brdcrumptwolink="/students/performance"
              linkToHome="/students"
            />
            <div className="row">
              <div className="container-fluid bg-grey p-30 msedge-timing-res">
                
                <h4 className="performance-over-time msedge-content-header mb-4">
                  {language.time_analysis}
                </h4>

                <Col
                  md="12"
                  xs="12"
                  sm="12"
                  className="msedge-timing-performance-timetakenforexam-main bg-white mt-3 mb-3"
                >
                  <TimeTakenforExam />
                </Col>
              </div>
            </div>
          </ReactCSSTransitionGroup>
        </Fragment>
      </div>
    );
  }
}

export default Timing;
