import React, { Component } from "react";
import Switch from "react-switch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import PageTitle from "../../layout/AppMain/PageTitle";
import { dataList } from "../../../components/admin/dataList";
import { Card, Col, Row, UncontrolledTooltip } from "reactstrap";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import ChangePassword from "../../../components/commonComponents/changepassword";
import Loading from "../../../components/admin/loading";
import { instance } from '../../../actions/constants'
import { getSession } from '../../routes/routePaths'
import {customPageTitle} from '../../../components/commonComponents/customPageTitle'
import {language} from '../../../utils/locale/locale'
import {tooltipMsg } from '../../../components/admin/tooltipMsg'

class LawSchoolSettings extends Component {
  constructor() {
    super();
    this.state = {
      checked: [false, false, false, false],
      settingsData: [],
      profileStatus: "4",
      userId: "",
      message: false,
      overview: false,
      shortcuts: false,
      settingsKey: false,
      settingsDataList: [],
      settingsId: "",
      loading: true,
      LawSchoolSession: getSession("LawSchoolSession")
    };
  }

  componentDidMount = () => {
    let getSessionData = this.state.LawSchoolSession
    let userId = getSessionData.userId;
    this.setState(
      {
        userId: userId
      },
      () => this.fetchData()
    );
    customPageTitle("Settings")
  };

  fetchData = () => {
    try {
      instance.get(`settings/${this.state.userId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,        
        }
      })
        .then(res => {
          if (res.data.data != "" || res.data.data != null || res.data.data != undefined) {

            this.setState({
              settingsDataList: res.data.data,
              settingsId: res.data.data.settingsId,
              loading: false
            }, () => {

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
                    .settingsKeyboardShortcuts === "1")
              ) {
                this.setState({
                  shortcuts: !this.state.shortcuts
                });
              }
              if (
                this.state.settingsDataList
                  .settingsDefaultTiming === "4"
              ) {
                this.setState({ profileStatus: "4" });
              } else if (
                this.state.settingsDataList
                  .settingsDefaultTiming === "1"
              ) {
                this.setState({ profileStatus: "1" });
              } else if (
                this.state.settingsDataList
                  .settingsDefaultTiming === "2"
              ) {
                this.setState({ profileStatus: "2" });
              } else if (
                this.state.settingsDataList
                  .settingsDefaultTiming === "3"
              ) {
                this.setState({ profileStatus: "3" });
              }
            });
          }
        })
        .catch(err => {
          this.setState({ settingsKey: true, loading: false });
        });
    } catch (e) { }
  };

  updateSettings = () => {
    if (this.state.settingsId === "" || this.state.settingsKey === true) {

      let getSessionData = this.state.LawSchoolSession

      var userDetails = JSON.stringify({
        userId: getSessionData.userId,
        name: getSessionData.name,
        user_role: getSessionData.user_role,
        user_type: getSessionData.user_type,
        userLawschoolID: getSessionData.userLawschoolID,
        userStudentID: getSessionData.userStudentID,
        settingsDefaultTiming: this.state.profileStatus
      });

      localStorage.getItem("LawSchoolSession") ? localStorage.setItem("LawSchoolSession", userDetails) : sessionStorage.setItem("LawSchoolSession", userDetails)

      var body1 = JSON.stringify({
        settingsUserId: this.state.userId,
        settingsMessageCenterNotify: this.state.message,
        settingsAlluserStatusDashboard: this.state.overview,
        settingsKeyboardShortcuts: this.state.shortcuts,
        settingsDefaultTiming: this.state.profileStatus
      });
      instance
        .post("/settings", body1, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,        
          }
        })
        .then(res => {
          this.setState({
            settingsId: res.data.data.settingsId,
            settingsKey: false
          });
        })
        .catch(e => {
          swal(
            language.oops,
            language.tryAgain,
            "error"
          );
        });
    } else {
      let getSessionData = this.state.LawSchoolSession
      var userDetails = JSON.stringify({
        userId: getSessionData.userId,
        name: getSessionData.name,
        user_role: getSessionData.user_role,
        user_type: getSessionData.user_type,
        userLawschoolID: getSessionData.userLawschoolID,
        userStudentID: getSessionData.userStudentID,
        settingsDefaultTiming: this.state.profileStatus
      });

      localStorage.getItem("LawSchoolSession") ? localStorage.setItem("LawSchoolSession", userDetails) : sessionStorage.setItem("LawSchoolSession", userDetails)

      var body = JSON.stringify({
        settingsUserId: this.state.userId,
        settingsId: this.state.settingsId,
        settingsMessageCenterNotify: this.state.message,
        settingsAlluserStatusDashboard: this.state.overview,
        settingsKeyboardShortcuts: this.state.shortcuts,
        settingsDefaultTiming: this.state.profileStatus
      });

      instance
        .post(`settings`, body, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,        
          }
        })
        .catch(e => {
          swal(
            language.oops,
            language.tryAgain,
            "error"
          );
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

  statusHandler = e => {
    this.setState({ profileStatus: e.target.value }, () =>
      this.updateSettings()
    );
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
            <div className="msedge-overview-section">
              <PageTitle
                heading="SETTINGS"
                subheading="Configure options, set your default timing, and change your password."
                brdcrumptwo="Support"
                brdcrumptwolink="/law-school/videolecture"
                brdcrumpthree="Settings"
                linkToHome="/law-school"
              />
            </div>

            <div>
              {this.state.loading ? (
                <Loading />
              ) : (
                  <div className="row">
                    <div className="container-fluid bg-grey pb-5">
                      <div className="plr-15">
                        <div className="mt-4 msedge-subhead">
                          <h2 className="text-primary pb-3">
                            {dataList.general_settings}
                          </h2>
                        </div>

                        <div>
                          <Card className="rounded border">
                            <Col xs="12" sm="12" md="12" lg="12" xl="12">
                              <Row>
                                <Col md="6" className="text-center border-right">
                                  <div className="msedge-settings-align">
                                    <h3
                                      className={
                                        this.state.message === true
                                          ? "setting-text-primary"
                                          : "setting-text-secondary"
                                      }
                                    >
                                      {dataList.msg_center_notification}
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

                                <Col md="6" className="text-center border-right">
                                  <div className="msedge-settings-align">
                                    <h3
                                      className={
                                        this.state.overview === true
                                          ? "setting-text-primary"
                                          : "setting-text-secondary"
                                      }
                                    >
                                      {dataList.all_user_stat_overview}
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
                              </Row>
                            </Col>
                          </Card>
                        </div>

                        <div className="mt-4 msedge-subhead">
                          <h2 className="text-primary pb-3">
                            {dataList.default_date}
                          </h2>
                        </div>

                        <div className="">
                          <Card className="msedge-main-card">
                            <Col xs="12" sm="12" md="12" lg="12" xl="12">
                              <Row>
                                <div className="msedge-default-date">
                                  <Col
                                    md="12"
                                    lg="12"
                                    sm="12"
                                    xl="12"
                                    xs="12"
                                    className=""
                                  >
                                    <div className="mt-3">
                                      <h3>{dataList.Def_dates_for_perf_stats}</h3>
                                    </div>
                                    <div>
                                      <div className="custom-radio custom-control mt-3">
                                        <input
                                          name="profile"
                                          type="radio"
                                          id="radioYes"
                                          value="1"
                                          className="custom-control-input"
                                          checked={
                                            this.state.profileStatus === "1"
                                              ? true
                                              : false
                                          }
                                          onChange={this.statusHandler}
                                        />
                                        <label
                                          className="custom-control-label"
                                          for="radioYes"
                                          role="checkbox"
                                          aria-checked="false"
                                          checked
                                        >
                                          {language.past_one}
                                      </label>
                                      </div>

                                      <div className="custom-radio custom-control mt-3">
                                        <input
                                          name="profile"
                                          type="radio"
                                          id="radioNo"
                                          value="2"
                                          className="custom-control-input"
                                          checked={
                                            this.state.profileStatus === "2"
                                              ? true
                                              : false
                                          }
                                          onChange={this.statusHandler}
                                        />
                                        <label
                                          className="custom-control-label"
                                          for="radioNo"
                                          role="checkbox"
                                          aria-checked="false"
                                        >
                                          {language.past_three}
                                      </label>
                                      </div>

                                      <div className="custom-radio custom-control mt-3">
                                        <input
                                          name="profile"
                                          type="radio"
                                          value="3"
                                          id="radioyear"
                                          className="custom-control-input"
                                          checked={
                                            this.state.profileStatus === "3"
                                              ? true
                                              : false
                                          }
                                          onChange={this.statusHandler}
                                        />
                                        <label
                                          className="custom-control-label"
                                          for="radioyear"
                                          role="checkbox"
                                          aria-checked="false"
                                        >
                                          {language.past_twelve}
                                      </label>
                                      </div>

                                      <div className="custom-radio custom-control mt-3 mb-4">
                                        <input
                                          name="profile"
                                          type="radio"
                                          id="radio"
                                          value="4"
                                          className="custom-control-input"
                                          checked={
                                            this.state.profileStatus === "4"
                                              ? true
                                              : false
                                          }
                                          onChange={this.statusHandler}
                                        />
                                        <label
                                          className="custom-control-label ada-font"
                                          for="radio"
                                          role="checkbox"
                                          aria-checked="false"
                                        >
                                          {language.all_data}
                                      </label>
                                      </div>
                                    </div>
                                  </Col>
                                </div>
                              </Row>
                            </Col>
                          </Card>
                        </div>
                        <div className="mt-4 msedge-subhead">
                          <h2 className="text-primary pb-3">
                            {dataList.setting_change_head}
                          </h2>
                        </div>
                        <ChangePassword passwordUserId={this.state.userId} moduleName={"LawSchoolSession"}/>
                      </div>
                    </div>
                  </div>
                )}
            </div>
          </div>
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

export default LawSchoolSettings