import React, { Component } from 'react'
import { Col, Row, Modal, ModalHeader, ModalBody, UncontrolledTooltip } from "reactstrap";
import Formsy from "formsy-react";
import Select from "react-select";
import moment from 'moment';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MyInput from '../../../../../components/admin/inputs/MyInput';
import TextAreaInput from '../../../../../components/admin/inputs/TextAreaInput';
import { regx } from '../../../../../utils/admin/Regx'
import {instance} from '../../../../../actions/constants'
import {getSession} from '../../../../routes/routePaths'
import {language} from '../../../../../utils/locale/locale';
import {tooltipMsg} from "../../../../../components/admin/tooltipMsg";

var errorCategory = [
  { value: "Problem with title", label: "Problem with title" },
  { value: "Problem with questions", label: "Problem with questions" },
  { value: "Problem with answer choices", label: "Problem with answer choices" }
];

class ErrorReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorType: '',
      errorCategory: errorCategory[0],
      errorNote: '',
      loading: false,
      studentSession: getSession("StudentSession")
    }
  }

  disableButton = () => {
    this.setState({ canSubmit: false, cursorDisable: "not-allowed" });
  };

  enableButton = () => {
    this.setState({ canSubmit: true, cursorDisable: "" });
  };

  handleErrorCategory = selectedState => {
    this.setState({ errorCategory: selectedState });
  };



  submit = model => {
    this.setState({
      loading: true
    })
    const errrorCategory = this.state.errorCategory;
    const currentdate = Date.now();

    const body = JSON.stringify({
      "itemBankCode": this.props.itemBankCode,
      "itemErrorCreatedAt": moment(currentdate).format("MM-DD-YYYY"),
      "itemErrorDescription": model.errorNote,
      "itemErorCreatedBy": this.state.studentSession.userId,
      "itemErrorSubject": this.props.itemBankSubject,
      "itemErrorSubjectId":this.props.subjectId,
      "itemErrorTopic": this.props.itemBankTopic,
      "itemErrorTopicId" : this.props.topicId,
      "itemErrorQuestion": this.props.itemBankQuestion,
      "itemErrorTitle": model.errorType,
      "itemErrorCategory": errrorCategory.value,

    })

    instance.post('student/itemerror', body, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,        
      }
    })
      .then((response) => {
        this.props.toggleModalProps(false)
        this.setState({
          loading: false
        })
        if (response.data.status === "Success") {
          swal(language.reported, language.reportedMsg, "success");
        } else {
          swal(language.oops, language.erroronReport, "error");
        }
      })
      .catch((error) => {
        this.setState({
          loading: false
        })
        swal(language.oops, language.tryAgain, "error");
      })

  };

  render() {
    return (
      <div>
        <Modal isOpen={this.props.modal} toggle={this.props.enableErrorReport} className='modal-center'>
          <ModalHeader toggle={this.props.enableErrorReport}>
            {language.Error_report}
                            </ModalHeader>
          <ModalBody>
            <div>
              <Row className="justify-content-center">
                <Col md="12">

                  <Formsy
                    onValidSubmit={this.submit}
                    onValid={this.enableButton}
                    onInvalid={this.disableButton}
                  >
                    <div className="">
                      <Row className="">
                        <Col>
                          <div className="pt-2 pb-3">
                            <MyInput
                              name="errorType"
                              type="text"
                              value={this.state.errorType}
                              validationError={'Please Enter valid error type'}
                              validations="isWords"
                              className="form-control"
                              required
                              fieldName={'Error title'}
                              tooltip={'Fill the error type'}
                              isMandatory={true}
                            />
                            <Row className="msedge-student-field pt-2">
                              <Col md="4">
                                <label className="msedge-setting-time-information" htmlFor="category">
                                  {language.category}
                                        <span className="text-danger">*</span>
                                </label>
                              </Col>
                              <Col md="7">
                                <div className="form-group">
                                  <Select
                                    aria-label="select category"
                                    onChange={this.handleErrorCategory}
                                    value={this.state.errorCategory}
                                    options={errorCategory}
                                  ></Select>
                                  <span
                                    className="msedge-info-icon"
                                    id="category"
                                  >
                                    <FontAwesomeIcon
                                      icon={faQuestionCircle}
                                    />
                                  </span>
                                  <UncontrolledTooltip
                                    placement="right"
                                    target="category"
                                  >
                                    {tooltipMsg.select_error}
                                        </UncontrolledTooltip>
                                </div>
                              </Col>
                            </Row>

                            <TextAreaInput
                              name="errorNote"
                              type="textarea"
                              rows="7"
                              fieldName={'Comments'}
                              tooltip={'Fill the comments'}
                              className="form-control"
                              value={this.state.errorNote}
                              isMandatory={true}
                              validations={{
                                matchRegexp: regx.alphNum250max
                              }}
                              validationError={'Please enter valid Alphanumeric. Note should contains 250 characters'}
                              required
                              id="messageContents"
                            />
                          </div>
                        </Col>
                      </Row>
                    </div>
                    <div className="row">
                      <div className="col-md-12 mt-3 pt-3">
                        <div className="form-group msedge-error-model">
                          {!this.state.loading ? (
                            <button type="submit" className="btn btn-outline-primary ques-submit-btn ">
                              <li>
                                <i class="pe-7s-download" aria-hidden="true"></i>
                              </li>
                              <li className="text-uppercase">{language.submit}</li>
                            </button>
                          ) : (
                              <span class="msedge-questions-start msedge-right-br mr-2">
                                <button
                                  class="btn btn-primary"
                                  type="button"
                                  disabled
                                >
                                  <li>
                                    <span
                                      class="spinner-border spinner-border-sm mr-2"
                                      role="status"
                                      aria-hidden="true"
                                    ></span>
                                  </li>
                                  <li className="text-uppercase">
                                    {language.buttonLoading}
                                </li>
                                </button>
                              </span>
                            )}
                          <button type="button" className="btn btn-outline-primary ml-2 ques-btn" onClick={this.props.closeModal}>
                            <li>
                              <i class="pe-7s-back" aria-hidden="true"></i>
                            </li>
                            <li className="text-uppercase">{language.back}</li>
                          </button>
                        </div>
                      </div>
                    </div>

                  </Formsy>

                </Col>
              </Row>
            </div>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}
export default ErrorReport