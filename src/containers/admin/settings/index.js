import React, { Component } from "react";
import { Card, Col, Row, UncontrolledTooltip } from "reactstrap";
import { connect } from "react-redux";
import swal from "sweetalert";
import Formsy from "formsy-react";
import CreatableSelect from 'react-select';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

import { instance } from "../../../actions/constants"
import { currentState, redirectPath } from "../../../actions/actionMain";
import MyInput from "../../../components/admin/inputs/MyInput";
import { bindActionCreators } from "redux";
import { errors } from "../../../utils/admin/ErrorMessages";
import { language } from "../../../utils/locale/locale";
import { tooltipMsg } from "../../../components/admin/tooltipMsg";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import ChangePassword from "../../../components/commonComponents/changepassword";
import { getSession } from "../../routes/routePaths"
import { regx } from "../../../utils/admin/Regx";
import { customPageTitle } from '../../../components/commonComponents/customPageTitle';

const components = {
  DropdownIndicator: null,
};

const createOption = (label) => ({
  label,
  value: label,
});

class Settings extends Component {
  constructor() {
    super();
    this.state = {
      adminSession: getSession("AdminSession"),
      isLoading: false,
      cursorDisable: "",
      settingsId: "",
      settingsStandardQuestionAnswerTime: "",
      settingsInvitationLinkToExpireInHours: "",
      value: [],
      inputValue: '',
      isMultiEmail: false,
    };
  }
  componentDidMount() {
    customPageTitle('Settings')
   
    this.props.currentState("settings");
    this.fetchData();
  }

  fetchData = () => {
    instance
      .get(`settings/${this.state.adminSession.userId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,        
        }
      })
      .then(res => {
        this.setState({
          settingsId: res.data.data === null || res.data.data === "" ? "" : res.data.data.settingsId
        });
        if (res.data.status == "Success") {

          var item = (res.data.data.settingsEnquiryEmail === null ? "" : res.data.data.settingsEnquiryEmail)
          var checkstring = item.length > 0  ? item.split(',') : item
          let valueForEmail =checkstring.length > 0 ? checkstring.map(a => { return { value: a, label: a } }) : ''

          if (res.data.data.settingsStandardQuestionAnswerTime === null) {
            this.setState({
              settingsStandardQuestionAnswerTime: "00",
              value : valueForEmail
            });
          } else {
            this.setState({
              settingsStandardQuestionAnswerTime:
                res.data.data.settingsStandardQuestionAnswerTime,
                value : valueForEmail
            });
          }
          if (res.data.data.settingsInvitationLinkToExpireInHours === null) {
            this.setState({
              settingsInvitationLinkToExpireInHours: "00",
              value : valueForEmail
            });
          } else {
            this.setState({
              settingsInvitationLinkToExpireInHours:
                res.data.data.settingsInvitationLinkToExpireInHours,
                value : valueForEmail
            });
          }
        }
      })
  };

  onsubmit = model => {
    this.props.redirectPath("settings");

    const list = this.state.value.map(a => { return a.value })
    var string = list.join(',');

    if (this.state.settingsId === "") {
      const body = JSON.stringify({
        settingsUserId: this.state.adminSession.userId,
        settingsStandardQuestionAnswerTime: model.questionTime,
        settingsInvitationLinkToExpireInHours: model.expireHours,
        settingType: "1",
        settingsEnquiryEmail : string
      });
      this.setState({ isLoading: true })
      instance
        .post(`settings`, body, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,        
          }
        })
        .then(response => {
          this.setState({ isLoading: false })
          if (response.data.status === "Success") {
            swal(language.updated, language.addedMsg, "success");
          } else if (response.data.status === "Failure") {
            swal(language.oops, language.tryAgain, "error");
          }
        })
        .catch(e => {
          this.setState({ isLoading: false })
          swal(language.oops, language.tryAgain, "error");
        });
    } else {
      const body = JSON.stringify({
        settingsId: this.state.settingsId,
        settingsUserId: this.state.adminSession.userId,
        settingsStandardQuestionAnswerTime: model.questionTime,
        settingsInvitationLinkToExpireInHours: model.expireHours,
        settingType: "1",
        settingsEnquiryEmail : string
      });
      this.setState({ isLoading: true })
      instance
        .post(`settings`, body, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,        
          }
        })
        .then(response => {
          this.setState({ isLoading: false })
          if (response.data.status === "Success") {
            swal(language.updated, language.updatedMsg, "success");
          } else if (response.data.status === "Failure") {
            swal(language.oops, language.tryAgain, "error");
          }
        })
        .catch(e => {
          this.setState({ isLoading: false })
          swal(language.oops, language.tryAgain, "error");
        });
    }
  };


  disableButton = () => {
    this.setState({ canSubmit: false, cursorDisable: "not-allowed" });
  };

  enableButton = () => {
    this.setState({ canSubmit: true, cursorDisable: "" });
  };
  userNamehandleChange = (value, actionMeta) => {

    this.setState({ value });
  };

  handleInputChange = (inputValue) => {
    this.setState({ inputValue });
  };
  handleKeyDown = (event) => {
    const { inputValue, value } = this.state;
    if (!inputValue) return;
    switch (event.key) {
      case 'Enter':
      case 'Tab':

        this.setState({
          inputValue: '',
          value: [...value, createOption(inputValue)],
          isMultiEmail: true,
        }, () => this.enableButton());
        event.preventDefault();
      default: return null
    }
  };

  render() {
    return (
      <div>
        <ReactCSSTransitionGroup
          component="div"
          transitionName="TabsAnimation"
          transitionAppear={true}
          transitionAppearTimeout={0}
          transitionEnter={false}
          transitionLeave={false}
        >
          <div className="msedge-settings">
            <div className="container-fluid mt-1">
              <Row>
                <Col xs="12" sm="12" md="7" lg="7" xl="7">
                  <h1 className="msedge-overview-text mb-4" tabIndex="-1">
                    {language.settings}
                  </h1>
                </Col>
              </Row>
            </div>
            <div className="row">
              <div className="container-fluid bg-grey msedge-admin-add">
                <h2 className="text-primary pt-0 pb-3 msedge-adminsettings-subheading">
                  {language.general_settings}
                </h2>
                <div className="msedge-general-settings">
                  <Formsy
                    onValidSubmit={this.onsubmit}
                    onValid={this.enableButton}
                    onInvalid={this.disableButton}
                  >
                    <Card className="p-3">
                      <Row>
                        <Col
                          xs="12"
                          sm="12"
                          md="12"
                          lg="12"
                          xl="12"
                          className="pb-2"
                        >
                          <h3 className="mt-2 msedge-settings-info msedge-setting-time-information">
                            {" "}
                            {language.setting_time}
                          </h3>
                        </Col>
                        <Col
                          xs="12"
                          sm="12"
                          md="12"
                          lg="12"
                          xl="12"
                          className="pb-2"
                        >
                          <Row>
                            <Col
                              md={{ size: 8, offset: 2 }}
                              className="msedge-setting-questio-time"
                            >
                              <MyInput
                                name="questionTime"
                                type="text"
                                fieldName={language.standard_qa_time}
                                value={
                                  this.state.settingsStandardQuestionAnswerTime
                                }
                                className="form-control"
                                validations={{
                                  matchRegexp: regx.float,
                                  maxLength: 4,
                                  minLength: 2
                                }}
                                validationErrors={{
                                  matchRegexp:errors.float,
                                  maxLength: errors.minute,
                                  minLength: errors.minute
                                }}
                                required
                                id="question Time"
                                tooltip={tooltipMsg.settings_exam_duration}
                              />
                              <div className="msedge-settings-time"></div>
                              <MyInput
                                name="expireHours"
                                type="text"
                                fieldName={language.link_to_expire}
                                className="form-control"
                                value={
                                  this.state
                                    .settingsInvitationLinkToExpireInHours
                                }
                                validations={{
                                  matchRegexp: regx.float,
                                  maxLength: 4,
                                  minLength: 2
                                }}
                                validationErrors={{
                                  matchRegexp:errors.float,
                                  maxLength: errors.hours,
                                  minLength: errors.hours
                                }}
                                required
                                id="expire Hours"
                                tooltip={tooltipMsg.settings_exam_duration}
                              />
                              <Row className="student-field pt-2">
                                <Col md="4">
                                  <label htmlFor="lawschool-multi-username" className="fieldname-font-size">
                                    {language.list_of_emails}
                                    {/* <span className="text-danger"> *</span> */}
                                    <p className="multi-emails">{language.msg_nofiy}</p>
                                  </label>
                                </Col>
                                <Col md="7">
                                  <CreatableSelect
                                    aria-label="Usernames"
                                    components={components}
                                    inputValue={this.state.inputValue}
                                    isClearable
                                    isMulti
                                    menuIsOpen={false}
                                    onChange={this.userNamehandleChange}
                                    onInputChange={this.handleInputChange}
                                    onKeyDown={this.handleKeyDown}
                                    placeholder="For more value press enter"
                                    value={this.state.value}
                                  />
                                  <span className="msedge-info-icon" id="auto_complete">
                                    <FontAwesomeIcon icon={faQuestionCircle} />
                                  </span>
                                  <UncontrolledTooltip placement="right" target="auto_complete" >
                                    {language.list_of_emails}
                                  </UncontrolledTooltip>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </Col>
                        <Col
                          xs="12"
                          sm="12"
                          md="12"
                          lg="12"
                          xl="12"
                          className="text-right pb-1 pt-2"
                        >
                          <div>
                            {!this.state.isLoading ?
                              <div className="msedge-admin-settings-button msedge-questions-start msedge-right-br pb-0">
                                <button
                                  type="submit"
                                  onClick={this.submit}
                                  className="btn btn-outline-primary mr-2"
                                  disabled={!this.state.canSubmit}
                                  style={{ cursor: this.state.cursorDisable }}
                                >
                                  <li>
                                    <i
                                      className="pe-7s-download"
                                      aria-hidden="true"
                                    ></i>
                                  </li>
                                  <li>{language.save_for_settings}</li>
                                </button>
                              </div>
                              :
                              <div className="msedge-admin-settings-button msedge-questions-start msedge-right-br pb-0">
                                <button
                                  className="btn btn-primary mr-2"
                                  type="button"
                                  disabled
                                >
                                  <li>
                                    <span
                                      className="spinner-border spinner-border-sm mr-2"
                                      role="status"
                                      aria-hidden="true"
                                    ></span>
                                  </li>
                                  <li className="text-uppercase">
                                    {language.buttonLoading}
                             </li>
                                </button>
                              </div>

                            }
                          </div>
                        </Col>
                      </Row>
                    </Card>
                  </Formsy>
                </div>

                <h4 className="text-primary pt-4 pb-3 msedge-adminsettings-subheading">
                  {language.setting_change_head}
                </h4>

                <ChangePassword passwordUserId={this.state.adminSession.userId} moduleName={"AdminSession"}/>
              </div>
            </div>
          </div>
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}


const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      currentState,
      redirectPath
    },
    dispatch
  );
};

export default connect(
  null,
  mapDispatchToProps
)(Settings);
