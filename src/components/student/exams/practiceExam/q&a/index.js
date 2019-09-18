import React, { Component } from "react";

import {
  Button
} from "reactstrap";
import PageTitle from "../../../Layout/AppMain/PageTitle";
import Questions from "./Questions";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlay, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
library.add(faPlay);

export class QuestionAnswer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      instruction: true
    };
  }
  InstructionOff = () => {
    this.setState({ instruction: false });
  };
  render() {
    return (
      <div className="question-and-answers">
        <PageTitle
          heading="Practice Exam"
          subheading="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
          brdcrumptwo="practice Exam"
          brdcrumpthree="Main"
        />
        <div className="main-inner-sub">
          <div className="">
            {this.state.instruction === true ? (
              <div className="instructions">
                <h6>Instructions</h6>
                <div className="instruction-content">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proidentut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris um dolore eu fugiat nulla pariatur.
                    Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                  </p>

                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum aecat cupidatat non proidentut labore et dolore
                    magna aliqua. Ut enim ad minim veniam, quis nostrud
                    exercitati laborum.
                  </p>
                </div>

                <div className="instruction-continue text-right">
                  <Button className="btn" onClick={this.InstructionOff}>
                    <li>
                      <FontAwesomeIcon icon={faCheck} size="1x" /> NEXT
                    </li>
                  </Button>
                </div>
              </div>
            ) : (
              <Questions />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default QuestionAnswer;
