import React, { Fragment, Component } from "react";
import { Col, Row, UncontrolledTooltip } from "reactstrap";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import Formsy from "formsy-react";
import Select from "react-select";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

import {
  postData,
  currentState,
  updateData,
  redirectPath
} from "../../../../actions/actionMain";
import MyInput from "../../../../components/admin/inputs/MyInput";
import { regx } from "../../../../utils/admin/Regx";
import Error from "../../../../components/admin/error";
import { errors } from "../../../../utils/admin/ErrorMessages";
import { videoCategory } from "../../../../components/admin/initialRows";
import { tooltipMsg } from "../../../../components/admin/tooltipMsg";
import AppButtonTop from "../../../../components/commonComponents/appButtonTop";
import AppButtonBottom from ".././../../../components/commonComponents/appButtonBottom";
import { getSession } from "../../../routes/routePaths";
import { customPageTitle } from '../../../../components/commonComponents/customPageTitle';
import {language} from '../../../../utils/locale/locale'


class VideoLibrary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adminSession: getSession("AdminSession"),
      cursorDisable: "",
      profileStatus: "y",
      selectedState: "",
      editId: "",
      rowData: [],
      canSubmit: false,
      addORedit: "add",
      videoLibraryFileName: "",
      videoLibraryOrder: "",
      videoLibraryCategory: "",
      videoLibraryTitle: "",
      videoLibraryActive: "",
      isSubjectSelected: false,
      displayName: "Others",
      dropDownFilled: false,
    };
  }
  componentDidMount() {
    customPageTitle('Add Video')
    this.props.currentState("videolibrary");
    if (this.props.location.query) {
      let examState = this.props.location.query.original.videoLibraryCategory;
      var selectedCategory = examState === null || examState === undefined ? "" : examState;
      this.setState({
        rowData: this.props.location.query.original || null,
        addORedit: "edit",
        editId: this.props.location.query.original.videoLibraryId,
        profileStatus: this.props.location.query.original.videoLibraryActive,
        isSubjectSelected:selectedCategory.length > 0 ? true : false,
        selectedState: {value : `${selectedCategory}`, label :`${selectedCategory}` },
      },() => {this.enableButton2()});
    }
    if (this.props.location.query) {
      this.setState({ rowData: this.props.location.query.original || null });
    }
  }

  submit = model => {
    this.props.redirectPath("videolibrary");
    const body = JSON.stringify({
      videoLibraryFileName: model.videofile, //video link
      videoLibraryActive: this.state.profileStatus, //status
      videoLibraryCategory: this.state.selectedState.value, //subject
      videoLibraryTitle: model.videotitle, //title
      videoLibraryOrder: model.video_order, //display order
    });
    if (this.state.addORedit === "add") {

      this.props.postData(body);
    } else if (this.state.addORedit === "edit") {
      this.props.updateData({
        data: body,
        id: this.state.editId,
        path: 'videolibrary'
      })
        .then(res => {
          this.setState({ displayName: "" })
        })
    }
  };
  disableButton = () => {
    this.setState({ canSubmit: false, cursorDisable: "not-allowed" });
  };
  enableButton = () => {
    if (this.state.isSubjectSelected === true) {
      this.setState({ canSubmit: true, cursorDisable: "" });
    }
  };
  enableButton2 = () => {
    this.setState({ dropDownFilled: true, cursorDisable: "" });
  };
  statusHandler = e => {
    this.setState({ profileStatus: e.target.value });
  };
  handleStateChange = selectedState => {
    this.setState({
      selectedState,
      isSubjectSelected: true
    }, () =>
      this.enableButton2()
    );
  };
  render() {
    if (this.state.adminSession.user_role === "3") {
      this.props.history.push("/admin/not_allowed");
    }
    return (
      <div className="msedge-add-student">
        <Fragment>
          <ReactCSSTransitionGroup
            component="div"
            transitionName="TabsAnimation"
            transitionAppear={true}
            transitionAppearTimeout={0}
            transitionEnter={false}
            transitionLeave={false}
          >
            <div className="msedge-student-content">
              <Formsy
                onValidSubmit={this.submit}
                onValid={this.enableButton}
                onInvalid={this.disableButton}
              >
                <AppButtonTop
                  disabled={this.state.canSubmit === false || this.state.dropDownFilled === false ? true : false}
                  style={{ cursor: this.state.cursorDisable }}
                  isLoading={this.props.isLoading}
                  addORedit={this.state.addORedit}
                  addTitle={"Add video"}
                  editTitle={"Edit video"}
                  redirectToList={"/admin/list_videolibrary"}
                />
                <Row>
                  <div className="container-fluid bg-grey msedge-admin-add">
                    <div className="col-md-12 bg-white pl-3 pr-3 rounded">
                      <Error />
                      <Col
                        xs="12"
                        sm="12"
                        md="12"
                        lg="12"
                        xl="12"
                        className="msedge-admin-form-title"
                      >
                        <Row>
                          <div className="pt-2">
                            <h2 className="text-primary mb-0">
                              {language.video_title_info}
                            </h2>
                          </div>
                        </Row>
                        <Row>
                          <div className="pt-2">
                            <p>{language.video_info} </p>
                          </div>
                        </Row>
                      </Col>
                      <div className="">
                        <Row className="">
                          <Col md={{ size: 8, offset: 2 }}>
                            <div className="pt-2 pb-3">
                              <MyInput
                                name="videotitle"
                                type="text"
                                fieldName={language.video_title}
                                tooltip={tooltipMsg.video_title}
                                className="form-control"
                                value={this.state.rowData.videoLibraryTitle}
                                validations={{
                                  matchRegexp: regx.alphaNumeric,
                                  maxLength: "250"
                                }}
                                validationErrors={{
                                  matchRegexp: errors.alpha_numeric,
                                  maxLength: errors.valueMaxLength
                                }}
                                required
                                isMandatory={true}
                                id="video title"
                              />
                              <MyInput
                                name="videofile"
                                type="text"
                                fieldName={language.video_link}
                                tooltip={tooltipMsg.video_url}
                                className="form-control"
                                value={this.state.rowData.videoLibraryFileName}
                                validations={{
                                  matchRegexp: regx.link
                                }}
                                validationError={errors.url}
                                required
                                isMandatory={true}
                                id="video file"
                              />
                              <Row className="msedge-student-field pt-2">
                                <Col md="4">
                                  <label htmlFor="lawschool " className="fieldname-font-size">
                              {language.subject}{" "}
                                    <span className="text-danger">*</span>
                                  </label>
                                </Col>
                                <Col md="7">
                                  <div className="form-group">
                                    <Select
                                      aria-label="video category"
                                      value={this.state.selectedState}
                                      options={videoCategory}
                                      onChange={this.handleStateChange}
                                    ></Select>
                                    <span
                                      className="msedge-info-icon"
                                      id="select-subject"
                                    >
                                      <FontAwesomeIcon
                                        icon={faQuestionCircle}
                                      />
                                    </span>
                                    <UncontrolledTooltip
                                      placement="right"
                                      target="select-subject"
                                    >
                                      {tooltipMsg.video_category}
                                    </UncontrolledTooltip>
                                  </div>
                                </Col>
                              </Row>
                              <MyInput
                                name="video_order"
                                type="text"
                                fieldName={language.video_order}
                                tooltip={tooltipMsg.video_order}
                                className="form-control"
                                value={this.state.rowData.videoLibraryOrder}
                                validations={{
                                  matchRegexp: regx.videoLibrary
                                }}
                                validationError={errors.videoOrder}
                                required
                                isMandatory={true}
                                id="video order"
                              />

                              <Row className="pt-2 pb-4">
                                <Col md="4">
                                  <label
                                    htmlFor="lastname"
                                    className="ada-font-size fieldname-font-size"
                                  >
                                    {language.status}
                                  </label>
                                </Col>
                                <Col md="2">
                                  <div className="custom-radio custom-control">
                                    <input
                                      aria-label="status"
                                      name="profile"
                                      type="radio"
                                      id="radioNo"
                                      className="custom-control-input"
                                      value="n"
                                      onChange={this.statusHandler}
                                      checked={
                                        this.state.profileStatus === "n"
                                          ? true
                                          : false
                                      }
                                    />
                                    <label
                                      className="custom-control-label ada-font-size"
                                      htmlFor="radioNo"
                                    >
                                      {language.draft}
                                    </label>
                                  </div>
                                </Col>
                                <Col md="2">
                                  <div className="custom-radio custom-control">
                                    <input
                                      name="profile"
                                      type="radio"
                                      id="radioYes"
                                      className="custom-control-input"
                                      value="y"
                                      onChange={this.statusHandler}
                                      checked={
                                        this.state.profileStatus === "y"
                                          ? true
                                          : false
                                      }
                                    />
                                    <label
                                      className="custom-control-label ada-font-size"
                                      htmlFor="radioYes"
                                    >
                                      {language.published}
                                    </label>
                                  </div>
                                </Col>
                                {this.state.addORedit === "add" ? (
                                  ""
                                ) : (
                                    <Col md="3">
                                      <div className="custom-radio custom-control">
                                        <input
                                          aria-label="status"
                                          name="profile"
                                          type="radio"
                                          id="radioD"
                                          className="custom-control-input"
                                          value="d"
                                          onChange={this.statusHandler}
                                          checked={
                                            this.state.profileStatus === "d"
                                              ? true
                                              : false
                                          }
                                          disabled={this.state.adminSession.user_role === "1" ? false : true}
                                        />
                                        <label
                                          className="custom-control-label ada-font-size"
                                          htmlFor="radioD"
                                        >
                                          {language.delete}
                                        </label>
                                      </div>
                                    </Col>
                                  )}
                              </Row>
                            </div>
                          </Col>
                        </Row>
                      </div>
                      <AppButtonBottom
                        disabled={this.state.canSubmit === false || this.state.dropDownFilled === false ? true : false}
                        style={{ cursor: this.state.cursorDisable }}
                        isLoading={this.props.isLoading}
                        redirectToList={"/admin/list_videolibrary"}
                      />
                    </div>
                  </div>
                </Row>
              </Formsy>
            </div>
          </ReactCSSTransitionGroup>
        </Fragment>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    isLoading: state.main.isDataAdding
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      postData,
      updateData,
      currentState,
      redirectPath
    },
    dispatch
  );
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoLibrary);
