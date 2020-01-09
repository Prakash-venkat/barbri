import React, { Component } from "react";
import { connect } from "react-redux";
import Formsy from "formsy-react";
import { bindActionCreators } from "redux";
import { CustomInput, Col, Button, Row, Collapse } from "reactstrap";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  getData,
  currentState,
  questions,
  timerChoosed,
  questionChoosed,
  enableKeyboard
} from "../../../../../actions/actionMain";
import {getSession} from '../../../../routes/routePaths'
import swal from "sweetalert";
import {instance, HASH_HISTORY} from "../../../../../actions/constants"
import {language} from "../../../../../utils/locale/locale"
import Loading from '../../../../../components/admin/loading';

export class PreCreated extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: true,
      data: [],
      canSubmit: true,
      cursorDisable: "",
      selectedExam: [],
      filteredSubject: [],
      load: false,
      loading: true,
      checked: 0,
      collapse: false,
      accordion: [true, false, false],
      isLoadingButton: false,
      studentSession: getSession("StudentSession"),
      timePerQuestion : 1.48
    };
  }

  toggleAccordion(tab) {
    const prevState = this.state.accordion;
    const state = prevState.map((x, index) => tab === index ? !x : false);
    this.setState({
      accordion: state,
    });
  }

  componentDidMount() {
    this.props.currentState("activeprecreatedexam");
    this.fetchData();
    this.fetchSeetings();
    this.props.timerChoosed(true),
    this.props.questionChoosed(false)
  }

  // componentDidUpdate(){
  //   this.props.choosenPreferences(true, false);
  // }

  fetchSeetings = () => {
     
    instance.get(`settings/${this.state.studentSession.userId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,        
      }
    })
        .then(res => {
          if (res.data.status === 'Success') {


            var secondsone = res.data.data.settingsStandardQuestionAnswerTime * 60000;
            const shortcut = res.data.data.settingsKeyboardShortcuts == null ? false : res.data.data.settingsKeyboardShortcuts == '0' ? false : res.data.data.settingsKeyboardShortcuts == '1' ? true : false
            this.props.enableKeyboard(shortcut)
  
            var milliseconds = parseInt((secondsone % 1000) / 100),
              seconds = Math.floor((secondsone / 1000) % 60),
              minutes = Math.floor((secondsone / (1000 * 60)) % 60),
              hours = Math.floor((secondsone / (1000 * 60 * 60)) % 24);
          
            hours = (hours < 10) ? "0" + hours : hours;
            minutes = (minutes < 10) ? "0" + minutes : minutes;
            seconds = (seconds < 10) ? "0" + seconds : seconds;
          
            const calculateSec = seconds / 60.0;

            const timer = parseInt(minutes)+calculateSec;

            const minuteshous = minutes + "." + seconds;

            
            const parsefloat = parseFloat(timer)
            const timecalc = Math.round(15 * (parsefloat))
              this.setState({
              timePerQuestion : parsefloat,
              
            })
          }else{
            this.setState({
              timePerQuestion : 1.48
            })
          }
        })
        .catch(err => {
          this.setState({
            timePerQuestion : 1.48
          })
        });
  }

  fetchData = () => {
    instance.get(`students/${this.state.studentSession.userStudentID}/exams/precreated`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,        
      }
    })
      .then(response => {
        var checkEmpty = typeof response.data.data != "undefined" && response.data.data != null && response.data.data.length != null
          && response.data.data.length > 0
        this.setState(
          {
            data: checkEmpty ? response.data.data : [],
            selectedExam: checkEmpty ? response.data.data[0] : [],
            loading:false
          },
        );
      })
      .catch(error => {
        console.log(error);
      });
  };
  
  toggleTimer = () => {
    this.setState({
      timer: !this.state.timer
    });
  };
  chongeColor(e, subjects, index) {
    this.setState({
      selectedExam: subjects,
      canSubmit: true,
      checked: index
    });
  }
  submit = model => {
    const { selectedExam, studentSession } = this.state;
    this.setState({ isLoadingButton: true })

    const body = JSON.stringify({
      precreatedExamId: selectedExam.precreatedExamId,
      examName: selectedExam.precreatedExamName,
      examDuration: selectedExam.precreatedExamTotalQuestions
        ? Math.round(selectedExam.precreatedExamTotalQuestions * this.state.timePerQuestion)
        : 50,
      examTakenBy: studentSession.userStudentID,
      timePerQuestion : parseFloat(this.state.timePerQuestion.toFixed(2))
    });
    instance.post("students/exams/precreated",body, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,        
      }
    })
      .then(response => {
        this.setState({
          isLoadingButton: false
        });
        return response;
      })
      .then(response => {
        if (response.data.data === 0 || response.data.data === null) {
          swal(
            language.oops,
            language.errorCreatingExam,
            "error"
          );
        } else {
          this.props.questions(response.data.data);
          this.props.timerChoosed(this.state.timer),
          this.props.questionChoosed(false)

          HASH_HISTORY.push("/students/exam-question");
        }
      })
      .catch(error => {
        this.setState({ isLoadingButton: false })
        swal(
          language.oops,
          language.tryAgain,
          "error"
        );
      });
  };

  disableButton = () => {
    this.setState({ canSubmit: false, cursorDisable: "not-allowed" });
  };

  enableButton = () => {
    this.setState({ canSubmit: true, cursorDisable: "" });
  };


  render() {
    return (
      <div className="msedge-ques-subject-topics w-100 pre-created-exam">
         {this.state.loading ? (
                    <Loading />
                ) : (
            <Formsy
              onValidSubmit={this.submit}
              onValid={this.enableButton}
              onInvalid={this.disableButton}
            >
              <div>
                <Row>
                  <Col
                    xs="12"
                    md="6"
                    lg="7"
                    className="msedge-set-pref-justify pre-created-timer-sec"
                  >
                    <div className="m-0">
                      <div className="pull-left d-inline-flex">
                <h2 className="">{language.select_an_exam}</h2>
                      </div>
                      <div className="pull-right msedge-sm-text-center">
                        <div className="col-md-12 msedge-student-showtimer pr-0">
                          <CustomInput
                            type="checkbox"
                            id="showTimer"
                            name="ShowTimer"
                            checked={this.state.timer}
                            onChange={e => this.toggleTimer(e)}
                            label={
                              <h3 className="msedge-students-alter-heading-font">
                                {language.timer}
                              </h3>
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col md="5">
                    <div className="msedge-questions-start mb-0">
                      <Col xs="12" sm="12" md="12" lg="12" xl="12">
                        {!this.state.isLoadingButton ?
                          (<Button
                            type="submit"
                            className="btn"
                            disabled={!this.state.canSubmit}
                            style={{
                              cursor: this.state.cursorDisable
                            }}
                          >
                            <li>
                              <FontAwesomeIcon icon={faPaperPlane} size="1x" />
                            </li>
                          <li>{language.start}</li>
                          </Button>
                          ) : (
                            <Button
                              type="button"
                              disabled
                            >
                              <li>
                                <span
                                  class="spinner-border spinner-border-sm"
                                  role="status"
                                  aria-hidden="true"
                                ></span>
                              </li>
                              <li className="text-uppercase">
                                Loading...
                              </li>
                            </Button>
                          )}
                      </Col>
                    </div>
                  </Col>
                </Row>

                <div className="pre-create">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-md-7 ">
                        {this.state.data == [] || this.state.data == "" || this.state.data == null ?
                            <h6 className="text-center msedge-setting-time-information mt-5 pt-5">{language.no_pre_exam_found}</h6>
                          :
                          <div className="row">
                            {this.state.data.map((subject, index) => {
                              // if (index <= 2) {
                              return (
                                <div
                                  key={index}
                                  className="col-xs-12 col-md-10 col-lg-12 msedge-open-update-list ant-table-content"
                                >
                                  <div
                                    style={{
                                      background:
                                        this.state.checked === index
                                          ? "#006EBD"
                                          : "",
                                      color:
                                        this.state.checked === index
                                          ? "#ffffff"
                                          : ""
                                    }}
                                    className="col-4 col-sm-1 col-md-2 text-center no-padding color-box msedge-created-status"
                                  > 
                                    <span>{subject.precreatedExamCode}</span>
                                  </div>
                                  <div className="col-7 col-sm-9 col-md-9 no-padding mid-text msedge-mid-sec">
                                    <span>
                                      {subject.precreatedExamName}(
                                  {subject.precreatedExamTotalQuestions})
                                </span>
                                  </div>

                                  <div className="col-1 col-sm-1 text-center no-padding msedge-student-exam-input custom-radio-detai mid-text">
                                    <CustomInput
                                      type="radio"
                                      id={"ope" + subject.precreatedExamId}
                                      name="ope"
                                      onChange={e =>
                                        this.chongeColor(e, subject, index)
                                      }
                                      className=""
                                      checked={
                                        this.state.checked === index ? true : false
                                      }
                                      tabIndex="0"
                                    />
                                  </div>
                                </div>
                              );
                            })}

                          </div>}
                      </div>
                      <div className="col-md-5 col-lg-5 right-content rounded ant-table-content">
                        <div className="row ">
                          <div className="col-md-12 what-are-ope">
                            <div className="msedge-student-precreated-exam">
                              <Button block color="link" className="text-left m-0 p-0"
                                onClick={() => this.toggleAccordion(0)}
                                aria-expanded={this.state.accordion[0]}
                                aria-controls="collapseOne">
                                  <h2>{language.what_are_pre}</h2>
                              </Button>


                              <Collapse isOpen={this.state.accordion[0]} data-parent="#accordion"
                                id="collapseOne" aria-labelledby="headingOne" className="msedge-student-precreated-exam-bgcolor">

                                <p>{language.what_are_pre_ans}
                                </p>
                              </Collapse>
                            </div>
                            <div className="msedge-student-precreated-exam">
                              <Button block color="link" className="text-left m-0 p-0"
                                onClick={() => this.toggleAccordion(1)}
                                aria-expanded={this.state.accordion[1]}
                                aria-controls="collapseTwo">
                                  <h2>{language.study_guid}</h2>
                              </Button>
                              <Collapse isOpen={this.state.accordion[1]} data-parent="#accordion"
                                id="collapseTwo" aria-labelledby="headingOne" className="msedge-student-precreated-exam-bgcolor">
                                    <p className="my-2" dangerouslySetInnerHTML={{__html :language.studey_guide_ans }} />
                              </Collapse>
                            </div>
                            <div className="msedge-student-precreated-exam">
                              <Button block color="link" className="text-left m-0 p-0"
                                onClick={() => this.toggleAccordion(2)}
                                aria-expanded={this.state.accordion[2]}
                                aria-controls="collapseThree">
                                <h2>OPE</h2>
                              </Button>

                              <Collapse isOpen={this.state.accordion[2]} data-parent="#accordion"
                                id="collapseThree" aria-labelledby="headingOne" className="msedge-student-precreated-exam-bgcolor">
                                <p dangerouslySetInnerHTML={{__html : language.ope_ans} }/>

                              </Collapse>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Patteren Section */}
                </div>

                <div className="msedge-questions-start">
                  <Col xs="12" sm="12" md="12" lg="12" xl="12">
                    {!this.state.isLoadingButton ?
                      (<Button
                        type="submit"
                        className="btn"
                        disabled={!this.state.canSubmit}
                        style={{
                          cursor: this.state.cursorDisable
                        }}
                      >
                        <li>
                          <FontAwesomeIcon icon={faPaperPlane} size="1x" />
                        </li>
                      <li>{language.start}</li>
                      </Button>
                      ) : (
                        <Button
                          type="button"
                          disabled
                        >
                          <li>
                            <span
                              class="spinner-border spinner-border-sm"
                              role="status"
                              aria-hidden="true"
                            ></span>
                          </li>
                          <li className="text-uppercase">
                            Loading...
                          </li>
                        </Button>
                      )}
                  </Col>
                </div>
              </div>
            </Formsy>
          )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    listData: state.main.data,
    isLoading: state.main.load,
    questionchoosed : state.main.questionNo
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getData,
      currentState,
      questions,
      timerChoosed,
      questionChoosed,
      enableKeyboard
    },
    dispatch
  );
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PreCreated);
