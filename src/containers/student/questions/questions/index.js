import React, { Component } from "react";
import { Card, Row } from "reactstrap";
import ChooseQuestions from "./steps";
import PageTitle from "../../../layout/AppMain/PageTitle";
import {language} from "../../../../utils/locale/locale";
class Questions extends Component {
  render() {
    return (
      <div className="msedge-practice-questions">
        <PageTitle
          heading={language.questions}
          brdcrumptwo={language.questions}
          linkToHome="/students"
          subheading={language.question_module_subheading}
        />
        <Row>
          <div className="container-fluid bg-grey msedge-student-qus-container">
            <Card>
              <div className="question-common p-3">
                <div className="msedge-questions-steps">
                  <ChooseQuestions />
                </div>
              </div>
            </Card>
          </div>
        </Row>
      </div>
    );
  }
}

export default Questions;
