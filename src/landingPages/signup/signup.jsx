import React, { Component } from "react";
import { Link } from "react-router-dom";
import Formsy from "formsy-react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { signup } from "../../actions/actionMain";
import moment from "moment";
import { Col } from "reactstrap";
import MyInput from "./floatingInputs/customTextInput";
import TextAreaInput from "./floatingInputs/customTextArea";
import NumberInput from "./floatingInputs/customNumber";
import { regx } from "../../utils/admin/Regx";
import { errors } from "../../utils/admin/ErrorMessages";
import { tooltipMsg } from "../../components/admin/tooltipMsg";
import { dataList } from "../../components/admin/dataList";

import LogoImage from "../../assets/utils/images/logo-color.png"

const initialRow = {
  name: "",
  lawschoolname: "",
  phone: "",
  email: "",
  comments: ""
};

class LawschoolEnquiry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rowData: initialRow,
      canSubmit: false
    };
  }

  disableButton = () => {
    this.setState({ canSubmit: false, cursorDisable: "not-allowed" });
  };

  enableButton = () => {
    this.setState({ canSubmit: true, cursorDisable: "" });
  };

  submit = model => {
    const addDate = moment(new Date()).format("MM-DD-YYYY");
    const body = JSON.stringify({
      enquiryName: model.firstname,
      enquiryLawschoolName: model.lastname,
      enquiryPrimaryEmail: model.userprimaryemail,
      enquiryPhoneNumber: model.userphone,
      commands: model.usercomments,
      enquiryCreatedDate: addDate,
      enquiryStatus: "n"
    });
    this.props.signup(body); //API call

  };

  render() {

    return (
      <div className="signup-container">
        <div className="signup-header">
          <img alt="barbri-logo" className="signup-logo" src={LogoImage} />
          <Link className="x-close" to="/#/"><i className="pe-7s-close" data-for="close"></i></Link>
        </div>
        <div className="signup-setion">

          <form className="signup-sub-section">
            <div className="sign-up-title">Sign Up</div>
            <div className="already-user">
              Already have a account?
               &nbsp;<Link className="login-link" to="">Log In</Link>
            </div>
            <Formsy
              onValidSubmit={this.submit}
              onValid={this.enableButton}
              onInvalid={this.disableButton}
            >

              <div className="signin-section">
                <div className="signin-with-email">

                  <div className="signup-lawschool signup-title-lawschool">
                    If you are a law school
                 </div>
                 <div className="msedge-blew-info">Please enter below information.</div>

                  <div className="floating-label">
                    <MyInput
                      name="firstname"
                      type="text"
                      placeholder={" "}
                      value={this.state.rowData.name}
                      fieldName={dataList.name}
                      labelName={"Your name"}
                      validations={{
                        matchRegexp: regx.letter,
                        maxLength: "50"
                    }}
                    validationErrors={{
                      matchRegexp: errors.name,
                      maxLength: errors.maxLength50
                  }}
                      className="floating-input"
                      required
                      isMandatory={true}
                    />
                  </div>

                  <div className="floating-label">
                    <MyInput
                      name="lastname"
                      type="text"
                      value={this.state.rowData.lawschoolname}
                     
                      fieldName={dataList.lawschoolname}
                      placeholder={" "}
                      labelName={"Your law school"}
                      validations={{
                        matchRegexp: regx.letter,
                        maxLength: "50"
                    }}
                    validationErrors={{
                      matchRegexp: errors.name,
                      maxLength: errors.maxLength50
                  }}
                      className="floating-input"
                      required
                      isMandatory={true}
                    />
                  </div>

                  <div className="floating-label">
                    <MyInput
                      name="userprimaryemail"
                      type="text"
                      value={this.state.rowData.email}
                      validations={{ matchRegexp: regx.email }}
                      validationError={errors.email}
                      placeholder={" "}
                      labelName={"Your email"}
                      className="floating-input"
                      required
                      fieldName={dataList.email}
                      isMandatory={true}
                    />
                  </div>

                  <div className="floating-label">
                    <NumberInput
                      name="userphone"
                      type="number"
                      required
                      value={this.state.rowData.phone}
                      validations={{
                        matchRegexp: regx.phone
                      }}
                      fieldName={dataList.number}
                      validationError={errors.number}
                      placeholder={" "}
                      labelName={"Your phone number"}
                      className="floating-input"
                      isMandatory={true}
                    />
                  </div>

                  <div className="floating-label">
                    <TextAreaInput
                      name="usercomments"
                      type="textarea"
                      rows="3"
                      fieldName={dataList.comments}
                      tooltip={tooltipMsg.mesg_des}
                      placeholder={" "}
                      labelName={"Your comments"}
                      className="floating-input floating-textarea"
                      value={this.state.comments}
                      isMandatory={true}
                      // required
                      id="mesg_des"
                    />
                  </div>
                  <div>
                    <Col
                      md="12"
                      className="text-left mobile-view msedge-questions-start msedge-login-btn pl-0"
                    >
                      <div className="form-group">
                    {!this.props.loading ? (
                      <span className="msedge-questions-start msedge-right-br mt-2">
                        <button
                          type="submit"
                          className="btn btn-outline-primary"
                          disabled={!this.state.canSubmit}
                          style={this.props.style}
                        >
                          <li>
                            <i className="pe-7s-download" aria-hidden="true"></i>
                          </li>
                          <li className="text-uppercase">SUBMIT</li>
                        </button>
                      </span>
                    ) : (
                        <span className="msedge-questions-start msedge-right-br">
                          <button className="btn btn-primary mr-2" type="button" disabled>
                            <li>
                              <span
                                className="spinner-border spinner-border-sm mr-2"
                                role="status"
                                aria-hidden="true"
                              ></span>
                            </li>
                            <li className="text-uppercase">Loading...</li>
                          </button>
                        </span>
                      )}
             
                      </div>
                    </Col>
                  </div>

                
                </div>
                <div className="divider"></div>
                <div className="signup-rightside">
                  <div className="signup-lawschool">
                    If you are a student
                 </div>
                  <div>
                    <div className="signup-content">
                      <div className="signup-wrapper">
                        <div>Please ask your law school’s academic support office about participating in BARBRI’s Multistate EDGE program.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Formsy>
            <div className="terms-of-use">
              <div className="terms-of-use-small">
                * By signing up, you agree to our <Link to="" target="_blank">Terms of Use</Link> and to receive msedge emails &amp; updates and acknowledge that you read our <Link href="" target="_blank">Privacy Policy</Link>.
                </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.main.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      signup
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LawschoolEnquiry);
