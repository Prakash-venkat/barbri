import React, { Component } from "react";
import { Link } from "react-router-dom";
import { CustomInput, Col, Button } from "reactstrap";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const data = [1, 2, 3, 4, 5, 6];
export class PreCreated extends Component {
  constructor(props) {
    super(props);
    this.toggleTimer = this.toggleTimer.bind(this);
    this.state = {
      timer: false
    };
  }
  toggleTimer() {
    this.setState({
      timer: !this.state.timer
    });
  }
  chongeColor() {
    let element = document.getElementsByName("ope");
    for (var i in element) {
      if (element[i].checked) {
        document.getElementsByClassName("ope-update-list")[i].style.color =
          "#0e6aae";
        document.getElementsByClassName("color-box")[i].style.background =
          "#0e6aae";
      } else {
        document.getElementsByClassName("ope-update-list")[i].style.color =
          "rgba(0, 0, 0, 0.65)";
        document.getElementsByClassName("color-box")[i].style.background =
          "#ccc";
      }
    }
  }
  render() {
    return (
      <div>
        <div className="pre-create">
          <div className="row heading-section">
            <div className="col-md-6">
              <span>Select an exam</span>
            </div>
            <div className="col-md-6 text-right">
              <CustomInput
                type="checkbox"
                id="showTimer"
                name="ShowTimer"
                checked={this.state.timer}
                onChange={e => this.toggleTimer(e)}
                label="Show timer"
              />
            </div>
          </div>
          {/* Patteren Section */}
          <div className="row">
            <div className="col-md-12">
              <div className="row">
                {data.map((index) => {
                  return (
                    <div className="col-md-7 ope-update-list ml-3 mr-2">
                      <div className="col-md-1 text-center no-padding color-box">
                        <span>OPE</span>
                      </div>
                      <div className="col-md-9 no-padding mid-text">
                        <span>OPE 1:100 Question from 2006 (Updated 2015)</span>
                      </div>
                      <div className="col-md-2 text-center no-padding">
                        <CustomInput
                          type="checkbox"
                          id={"ope" + index}
                          name="ope"
                          onChange={e => this.chongeColor(e)}
                          className=''
                        />
                      </div>
                    </div>
                  );
                })}

                <div className="col-md-4 right-content">
                  <div className="row">
                    <div className="col-md-12">
                      <h6>What are OPEs?</h6>
                      <ul className="font-weight-bold">
                        <li>Created by the NCBE</li>
                        <li>100 licensed question each</li>
                        <li>
                          Released and updated on the date listed next to the exam
               </li>
                      </ul>
                      <p className="font-weight-bold">
                        These exams do not contain Civil Procedure questions, as they
                        are created before Civil procedure was added to the MBE
             </p>
                    </div>
                    <div className="col-md-12">
                      <h6>What are MBE Study Aid Exams</h6>
                      <ul className="font-weight-bold">
                        <li>
                          100 licensed questions each, released by the NCBE in 2017
               </li>
                        <li>
                          All serven MBE subjects included, present in random order
               </li>
                        <li>
                          Subject and subtopics presented in the same as proportions
                          they are tested on MBE
               </li>
                      </ul>
                      <p className="font-weight-bold">
                        hence two exams do not contains licensed Civil Procedure
                        questions. Together, they will be most closely mirror taking an
                        actual 200 question practice MBE.
             </p>
                    </div>
                    <div className="col-md-12">
                      <p>
                        <span className="text-primary">NOTE:</span> The questions in all
                        exams are mixed into barbri's database of licensed questions. If
                        you wish to reserve these questions, you may do so by selecting
                        'Excluded OPE Questions' and 'Excluded MBE Study Aid question'
                        in practice question mode. This will allow you to take these
                        exams at a later date without seeing repeat question.Please note
                        that Customized Exams do not reserve these questions.
             </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Patteren Section */}


        </div>

        <div className="questions-start mt-5">
          <Col xs="12" sm="12" md="12" lg="12" xl="12">
            <Link to={`/students/exam-question`}>
              <Button className="btn">
                <li>
                  <FontAwesomeIcon icon={faPlay} size="1x" />
                </li>
                <li>START</li>
              </Button>
            </Link>
          </Col>
        </div>
      </div>
    );
  }
}

export default PreCreated;
