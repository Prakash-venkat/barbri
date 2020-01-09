import React, { Component } from "react";
import { Card, Col, Row,UncontrolledTooltip } from "reactstrap";
import Slider from "rc-slider";
import Switch from "react-switch";
import Tooltip from "rc-tooltip";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import PageTitle from "../../layout/AppMain/PageTitle";
import { dataList } from "../../../components/admin/dataList";
import {currentState,timePerQuestion, enableKeyboard} from "../../../actions/actionMain";
import Changepassword from "../../../components/commonComponents/changepassword";
import { instance } from "../../../actions/constants"
import { getSession } from "../../routes/routePaths"
import {customPageTitle} from "../../../components/commonComponents/customPageTitle"
import {language} from "../../../utils/locale/locale"
import {tooltipMsg} from "../../../components/admin/tooltipMsg"

const Handle = Slider.Handle;
const handle = props => {
  const { value, dragging, index, ...restProps } = props;
  var secondsone = value * 60000;
  
  var milliseconds = parseInt((secondsone % 1000) / 100),
    seconds = Math.floor((secondsone / 1000) % 60),
    minutes = Math.floor((secondsone / (1000 * 60)) % 60),
    hours = Math.floor((secondsone / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  const minuteshous = minutes + ":" + seconds;


  return (
    <div>
      <Tooltip
        className=""
        prefixCls="rc-slider-tooltip"
        overlay={minuteshous}
        visible={dragging}
        placement="bottom"
        key={index}
      >
        <Handle value={minuteshous} {...restProps} />
      </Tooltip>
      <Col md="12" className="pt-2"></Col>
      <p className="text-right">{minuteshous}</p>
    </div>
  );
};

class StudentSettings extends Component {
  constructor() {
    super();
    this.state = {
      timingValue: 1.80,
      settingsData: [],
      lsprofileStatus: "4",
      message: false,
      overview: false,
      shortcuts: false,
      settingsKey: false,
      countdown: true,
      settingsDataList: [],
      settingsId: "",
      loading: true,
      studentSession: getSession("StudentSession")
    };
  }

  componentDidMount = () => {

    this.fetchData() //Making a API call
    this.props.currentState("user"); //Defines the current state of the App
    customPageTitle('Settings') //Defines the page title
  };

  fetchData = () => {
    let studentSession = this.state.studentSession
    try {
      instance.get(`settings/${studentSession.userId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,        
        }
      })
        .then(res => {
          if (res.data.data != null || res.data.data != undefined || res.data.data != "") {
            this.props.timePerQuestion(res.data.data.settingsStandardQuestionAnswerTime)
            this.setState(
              {
                settingsDataList: res.data.data,
                timingValue: parseFloat(res.data.data.settingsStandardQuestionAnswerTime),
                settingsId: res.data.data.settingsId,
                loading: false
              },
              () => {
                if (
                  (res.data.data,
                    this.state.settingsDataList
                      .settingsMessageCenterNotify === "1")
                ) {
                  this.setState({
                    message: !this.state.message
                  });
                }
                if (
                  (res.data.data,
                    this.state.settingsDataList
                      .settingsAlluserStatusDashboard === "1")
                ) {
                  this.setState({
                    overview: !this.state.overview
                  });
                }
                if (
                  (res.data.data,
                    this.state.settingsDataList
                      .settingsMbeCountdownDashboard === "1")
                ) {
                  this.setState({
                    countdown: !this.state.countdown
                  });
                }
                if (
                  (res.data.data,
                    this.state.settingsDataList
                      .settingsKeyboardShortcuts === "1")
                ) {
                  this.props.enableKeyboard(!this.state.shortcuts)
                  this.setState({
                    shortcuts: !this.state.shortcuts
                  });
                }
                if (
                  this.state.settingsDataList
                    .settingsDefaultTiming === "1"
                ) {
                  this.setState({ lsprofileStatus: "1" });
                } else if (
                  this.state.settingsDataList
                    .settingsDefaultTiming === "2"
                ) {
                  this.setState({ lsprofileStatus: "2" });
                } else if (
                  this.state.settingsDataList
                    .settingsDefaultTiming === "3"
                ) {
                  this.setState({ lsprofileStatus: "3" });
                } else if (
                  this.state.settingsDataList
                    .settingsDefaultTiming === "4"
                ) {
                  this.setState({ lsprofileStatus: "4" });
                }
              }
            );
          }
        })
        .catch(err => {

          this.setState({ settingsKey: true });
        });
    } catch (e) {
      console.log(e);
    }
  };

  updateSession=(id)=>{
    let studentSession = this.state.studentSession
    let userDetails = JSON.stringify({
      userId: studentSession.userId,
      name: studentSession.name,
      user_role: studentSession.user_role,
      user_type: studentSession.user_type,
      // userOrganisationId: studentSession.userOrganisationId,
      userLawschoolID: studentSession.userLawschoolID,
      userStudentID: studentSession.userStudentID,
      settingsDefaultTiming: this.state.lsprofileStatus,
      settingsId: id
    });

    localStorage.getItem("StudentSession") ? localStorage.setItem("StudentSession", userDetails) : sessionStorage.setItem("StudentSession", userDetails)
  }

  updateSettings = () => {
    let studentSession = this.state.studentSession
    this.props.timePerQuestion(this.state.lsprofileStatus)

    if (this.state.settingsId === "" || this.state.settingsKey === true) {
      this.props.enableKeyboard(this.state.shortcuts)
      var body1 = JSON.stringify({
        settingsUserId: studentSession.userId,
        settingsId: studentSession.settingsId,
        settingsMessageCenterNotify: this.state.message,
        settingsAlluserStatusDashboard: this.state.overview,
        settingsKeyboardShortcuts: this.state.shortcuts,
        settingsDefaultTiming: this.state.lsprofileStatus,
        settingsMbeCountdownDashboard: this.state.countdown,
        settingsStandardQuestionAnswerTime: parseFloat(this.state.timingValue)
      });
      instance.post("settings", body1, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,        
        }
      })
        .then(res => {
            this.updateSession(res.data.data.settingsId)
          this.setState({
            settingsId: res.data.data.settingsId,
            settingsKey: false
          });
        })
        .catch(e => console.log(e));
    } else {
      this.props.enableKeyboard(this.state.shortcuts)
      let settingsId = getSession("StudentSession");
      var body = JSON.stringify({
        settingsUserId: studentSession.userId,
        settingsId: settingsId.settingsId,
        settingsMessageCenterNotify: this.state.message,
        settingsAlluserStatusDashboard: this.state.overview,
        settingsKeyboardShortcuts: this.state.shortcuts,
        settingsDefaultTiming: this.state.lsprofileStatus,
        settingsMbeCountdownDashboard: this.state.countdown,
        settingsStandardQuestionAnswerTime: parseFloat(this.state.timingValue)
      });

      instance.post(`settings`, body, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,        
        }
      })
      .then(res=>{
        this.updateSession(res.data.data.settingsId)
      })
        .catch(e => {
          console.log(e);
        });
    }
  };
  messageNotification = () => {
    this.setState(
      {
        message: !this.state.message
      },
      () => this.updateSettings()
    );
  };
  countdown = () => {
    this.setState(
      {
        countdown: !this.state.countdown
      },
      () => this.updateSettings()
    );
  };
  userStatus = () => {
    this.setState(
      {
        overview: !this.state.overview
      },
      () => this.updateSettings()
    );
  };

  keyboardShortcut = () => {
    this.setState(
      {
        shortcuts: !this.state.shortcuts
      },
      () => this.updateSettings()
    );
  };

  lsstatusHandler = e => {
    this.setState({ lsprofileStatus: e.target.value }, () =>
      this.updateSettings()
    );
  };

  onSliderChange = timingValue => {
    this.setState(
      {
        timingValue: timingValue
      });
  };

  handleReset = () => {
    this.setState({ timingValue: 1.80 }, () => this.updateSettings());
  };

  render() {
    let studentSession = this.state.studentSession
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
            <div className="msedge-overview-section">
              <PageTitle
                heading={dataList.settings}
                brdcrumptwo={dataList.stud_settings_support}
                brdcrumpthree={dataList.settings}
                subheading="Configure options, set your default timing, and change your password."
                brdcrumptwolink="/students/video-lectures"
                linkToHome="/students"
              />
            </div>
            <div className="row">
              <div className="container-fluid bg-grey ptb-30">
                <div className="plr-15">
                  <div className="msedge-subhead">
                    <h2 className="text-primary pb-3">
                      {dataList.students_setting}
                    </h2>
                  </div>
                  <div>
                    <Card className="border">
                      <Col xs="12" sm="12" md="12" lg="12" xl="12">
                        <Row>
                          <Col md="4" className="text-center border-right">
                            <div className="msedge-settings-align">
                              <h3
                                className={
                                  this.state.message === true
                                    ? "setting-text-primary"
                                    : "setting-text-secondary"
                                }
                              >
                                {language.msg_center_notification}
                              </h3>

                              <Switch
                                checked={
                                  this.state.message === true ? true : false
                                }
                                onChange={this.messageNotification}
                                onColor="#86d3ff"
                                handleDiameter={23}
                                uncheckedIcon={false}
                                checkedIcon={false}
                                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                height={15}
                                width={42}
                                aria-label="processed"
                                onHandleColor="#006EBD"
                                tabIndex="0"
                              />
                            </div>
                          </Col>

                          <Col md="4" className="text-center border-right">
                            <div className="msedge-settings-align">
                              <h3
                                className={
                                  this.state.overview === true
                                    ? "setting-text-primary"
                                    : "setting-text-secondary"
                                }
                              >
                                {language.all_user_stat_overview}
                                <span className="msedge-lawschool-settings-icon ml-2" id="settings-overview">
                                        <FontAwesomeIcon icon={faInfoCircle} className="msedge-font-size-lawschool-settings" />
                                      </span>
                                      <UncontrolledTooltip placement="right" target="settings-overview">
                                      {tooltipMsg.law_school_setting}
                                      </UncontrolledTooltip>
                              </h3>

                              <Switch
                                checked={
                                  this.state.overview === true ? true : false
                                }
                                onChange={this.userStatus}
                                onColor="#86d3ff"
                                handleDiameter={23}
                                uncheckedIcon={false}
                                checkedIcon={false}
                                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                height={15}
                                width={42}
                                aria-label="processed"
                                onHandleColor="#006EBD"
                                tabIndex="0"
                              />
                            </div>
                          </Col>
                          <Col md="4" className="text-center border-right">
                            <div className="msedge-settings-align">
                              <h3
                                className={
                                  this.state.shortcuts === true
                                    ? "setting-text-primary"
                                    : "setting-text-secondary"
                                }
                              >
                                {language.keyboard_shrtcuts}
                              </h3>
                              <Switch
                                checked={
                                  this.state.shortcuts === true ? true : false
                                }
                                onChange={this.keyboardShortcut}
                                onColor="#86d3ff"
                                handleDiameter={23}
                                uncheckedIcon={false}
                                checkedIcon={false}
                                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                height={15}
                                width={42}
                                aria-label="processed"
                                onHandleColor="#006EBD"
                                tabIndex="0"
                              />
                            </div>
                          </Col>
                        </Row>
                      </Col>
                    </Card>
                  </div>
                  <div className="mt-4 msedge-subhead">
                    <h2 className="text-primary pb-3">
                      {dataList.stud_settings_default_date}
                    </h2>
                  </div>
                  <Card className="msedge-main-card">
                    <Col xs="12" sm="12" md="12" lg="12" xl="12">
                      <Row className="msedge-default-date">
                        <Col md="6" className="">
                          <div className="mt-3">
                            <h3 className="msedge-setting-time-information">
                              {dataList.stud_settings_dafault_date_perform}
                            </h3>
                          </div>
                          <div className="msedge-setting-labelview">
                            <div className="custom-radio custom-control mt-3">
                              <input
                                name="lsprofile"
                                type="radio"
                                id="one_month"
                                className="custom-control-input"
                                value="1"
                                onChange={this.lsstatusHandler}
                                checked={
                                  this.state.lsprofileStatus === "1"
                                    ? true
                                    : false
                                }
                              />
                              <label
                                className="custom-control-label"
                                for="one_month"
                                checked
                              >
                                {language.past_one}
                              </label>
                            </div>
                            <div className="custom-radio custom-control mt-3">
                              <input
                                name="lsprofile"
                                type="radio"
                                id="three_month"
                                className="custom-control-input"
                                value="2"
                                onChange={this.lsstatusHandler}
                                checked={
                                  this.state.lsprofileStatus === "2"
                                    ? true
                                    : false
                                }
                              />
                              <label
                                className="custom-control-label"
                                for="three_month"
                              >
                                {language.past_three}
                              </label>
                            </div>
                            <div className="custom-radio custom-control mt-3">
                              <input
                                name="lsprofile"
                                type="radio"
                                id="twelve_month"
                                className="custom-control-input"
                                value="3"
                                onChange={this.lsstatusHandler}
                                checked={
                                  this.state.lsprofileStatus === "3"
                                    ? true
                                    : false
                                }
                              />
                              <label
                                className="custom-control-label"
                                for="twelve_month"
                              >
                                {language.past_twelve}
                              </label>
                            </div>
                            <div className="custom-radio custom-control mt-3 mb-4">
                              <input
                                name="lsprofile"
                                type="radio"
                                id="all_data"
                                className="custom-control-input"
                                value="4"
                                onChange={this.lsstatusHandler}
                                checked={
                                  this.state.lsprofileStatus === "4"
                                    ? true
                                    : false
                                }
                              />
                              <label
                                className="custom-control-label"
                                for="all_data"
                              >
                                {language.all_data}
                              </label>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Card>
                  <div className="mt-4 msedge-subhead">
                    <h2 className="text-primary pb-3">
                      {dataList.stud_settings_timing}
                    </h2>
                  </div>
                  <div className="">
                    <Card className="msedge-main-card">
                      <Col xs="12" sm="12" md="12" lg="12" xl="12">
                        <Row className="msedge-default-date">
                          <Col md="12" className="">
                            <div className="mt-3">
                              <p className="msedge-timing-section fieldname-font-size">
                                {" "}
                                {dataList.stud_setting_time}
                              </p>
                            </div>
                          </Col>
                          <Col md="8" xs="8">
                            <div className="mt-4 mb-4">
                              <Slider
                                min={1}
                                step={0.01}
                                max={5}
                                onChange={this.onSliderChange}
                                onAfterChange={this.updateSettings}
                                value={this.state.timingValue}
                                handle={handle}
                                railStyle={{
                                  height: 3
                                }}

                                
                                // className="rc-slider-primary rc-slider-line mb-2"
                              />
                            </div>
                          </Col>
                          <Col md="4" xs="4" className="msedge-timing-slider">
                            <div className="mt-4 mb-4 msedge-settings-pointer">
                              <div
                                onClick={this.handleReset}
                                className="msedge-settin-reset"
                              >
                                {dataList.stud_settings_reset}
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </Col>
                    </Card>
                  </div>

                  <div className="mt-4 msedge-subhead">
                    <h2 className="text-primary pb-3">
                      {dataList.setting_change_head}
                    </h2>
                  </div>
                  <Changepassword passwordUserId={studentSession.userId} moduleName={"StudentSession"}/>
                </div>
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
      timePerQuestion,
      enableKeyboard
    },
    dispatch
  );
};

export default connect(
  null,
  mapDispatchToProps
)(StudentSettings);
