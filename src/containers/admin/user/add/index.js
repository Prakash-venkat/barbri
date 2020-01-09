import React, { Fragment, Component } from "react";
import { Col, Row, UncontrolledTooltip } from "reactstrap";
import { Link } from "react-router-dom";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import Formsy from "formsy-react";
import swal from "sweetalert";
import Select from "react-select";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
  postData,
  currentState,
  updateData,
  redirectPath
} from "../../../../actions/actionMain";
import MyInput from "../../../../components/admin/inputs/MyInput";
import NumberInput from "../../../../components/admin/inputs/NumberInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { regx } from "../../../../utils/admin/Regx";
import Error from "../../../../components/admin/error";
import { errors } from "../../../../utils/admin/ErrorMessages";
import {
  UsersInitialRow,
  selectUserRole
} from "../../../../components/admin/initialRows";
import { tooltipMsg } from "../../../../components/admin/tooltipMsg";
import AppButtonTop from "../../../../components/commonComponents/appButtonTop";
import { instance } from "../../../../actions/constants";
import { getSession } from "../../../routes/routePaths";
import { customPageTitle } from '../../../../components/commonComponents/customPageTitle';
import {language} from '../../../../utils/locale/locale'


class addUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adminSession: getSession("AdminSession"),
      cursorDisable: "",
      profileStatus: "n",
      selectedState: "",
      editId: "",
      rowData: UsersInitialRow,
      canSubmit: false,
      addORedit: "add",
      userPassword: "",
      userPhone: "",
      isSelected: false,
      userType: "",
      lawschoolList: [],
      LawschoolListData: [],
      selectedSchool: "",
      dropDownFilled: false
    };
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    customPageTitle('Add User')
    
    this.props.currentState("admin/users");
    if (this.props.location.query) {
      let userRole = this.props.location.query.original.userRole;

      var selectedUserRole = userRole === null || userRole === undefined ? "" : userRole;
      var userRoleArray = selectUserRole.filter(function (el) {
        return el.value.toString() === selectedUserRole.toString()
      });
      let isUserRoleEmpty;
      if(userRoleArray.length === 0) {
        isUserRoleEmpty= false;
      }else {
        isUserRoleEmpty = Object.keys(userRoleArray[0]).length === 0 && userRoleArray[0].constructor === Object ? false : true
      }
      this.setState({
        rowData: this.props.location.query.original || null,
        addORedit: "edit",
        editId: this.props.location.query.original.userId,
        profileStatus: this.props.location.query.original.userProfileActive,
        selectedState: userRoleArray[0],
        isSelected: isUserRoleEmpty
      }, () => {this.enableButton2()});
    }
    instance.get("admin/schools", {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,        
      }
    })
      .then(
        res => {
          this.setState(
            {
              lawschoolList: res.data.data
            },
            () => this.selectLawschoolFunction()
          );
        }
      );
  }

  selectLawschoolFunction = () => {
    const data =
      this.state.lawschoolList === null || this.state.lawschoolList === ""
        ? []
        : this.state.lawschoolList;
    let result = data.map((value) => {
      return { value: value.lawSchoolId, label: value.lawSchoolName };
    });
    this.setState({ LawschoolListData: result });
    if (this.props.location.query) {
      let lawSchoolSelect = this.props.location.query.original
        .studentLawschoolName;
      result.forEach(function (element) {
        element.label === lawSchoolSelect ? (lawSchoolSelect = element) : null;
      });
      this.setState({ selectedSchool: lawSchoolSelect });
    }
  };

  submit = model => {
    this.props.redirectPath("user");

    let userType = "";
    if (this.state.selectedState.value === "4") {
      userType = 4;
    } else if (this.state.selectedState.value === "5") {
      userType = 2;
    } else {
      userType = 1;
    }

    if (this.state.addORedit === "add") {
      const body = JSON.stringify({
        userFirstName: model.firstname,
        userLastName: model.lastname,
        userPrimaryEmail: model.userprimaryemail,
        userRole: this.state.selectedState.value,
        userPhone: model.userphone,
        userProfileActive: this.state.profileStatus,
        userName: model.lastname + " " + model.firstname,
        userType: userType,
        userLawschoolID:
          this.state.selectedState.value === "5"
            ? this.state.selectedSchool.value
            : null
      });
      this.props.postData(body);
    } else if (this.state.addORedit === "edit") {
      const bodyEdit = JSON.stringify({
        userFirstName: model.firstname,
        userLastName: model.lastname,
        userPrimaryEmail: model.userprimaryemail,
        userRole: this.state.selectedState.value,
        userPhone: model.userphone,
        userProfileActive: this.state.profileStatus,
        userName: model.lastname + " " + model.firstname,
        userPassword: this.props.location.query.original.userPassword,
        userType: userType,
        userLawschoolID:
          this.state.selectedState.value === "5"
            ? this.state.selectedSchool.value
            : null
      });
      this.props.updateData({
        data: bodyEdit,
        id: this.state.editId,
        path: "admin/users"
      });
    }
  };

  triggerMail = row => {
    const user = JSON.stringify({
      userId: this.state.editId,
      userPrimaryEmail: this.state.rowData.userPrimaryEmail
    });
    instance.put("users/password", user, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,        
      }
    })
      .then(response => {
        if (response.data.status === "Success" || response.data.data === true) {
          swal(
            language.success,
            language.sendResetLink,
            "success"
          );
        } else {
          swal(language.erroronSendingResetLink, "", "warning");
        }
      })
  };
  handleSchoolChange = selectedSchool => {
    this.setState({ selectedSchool },()=> {this.enableButton2()});
  };

  disableButton = () => {
    this.setState({ canSubmit: false, cursorDisable: "not-allowed" });
  };

  enableButton = () => {
    this.setState({ canSubmit: true, cursorDisable: "" });
  };
  enableButton2 = () => {
    if(this.state.isSelected === true){
      if (this.state.selectedState.value === "5") {
        if(this.state.selectedSchool !== "") {
          this.setState({ dropDownFilled: true, cursorDisable: "" });
        } else {
          this.setState({ dropDownFilled: false, cursorDisable: "not-allowed" })
        }
      } else {
        this.setState({ dropDownFilled: true, cursorDisable: "" });
      }
    } else {
      this.setState({ dropDownFilled: false, cursorDisable: "not-allowed" });
    }
  };
  statusHandler = e => {
    this.setState({ profileStatus: e.target.value });
  };

  handleStateChange = selectedState => {
    this.setState({ selectedState, isSelected: true }, () =>
      this.enableButton2()
    );
  };

  render() {
    if (this.state.adminSession.user_role === "3") {
      this.props.history.push("/admin/not_allowed");
    }

    return (
      <div>
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
                    addTitle={language.user_add}
                    editTitle={language.user_edit}
                    redirectToList={"/admin/list_user"}
                  />

                  <Row>
                    <div className="container-fluid bg-grey msedge-admin-add">
                      <div className="col-md-12 bg-white pl-3 pr-3 rounded">
                        <Error />
                        <Col xs="12" sm="12" md="12" lg="12" xl="12"
                          className="msedge-admin-form-title"
                        >
                          <Row>
                            <div className="pt-2">
                              <h2 className="text-primary mb-0">
                                {language.user_title}
                              </h2>
                            </div>
                          </Row>
                          <Row>
                            <div className="pt-2">
                              <p>{language.user_info} </p>
                            </div>
                          </Row>
                        </Col>
                        <div className="">
                          <Row className="">
                            <Col md={{ size: 8, offset: 2 }}>
                              <div className="pt-2 pb-3">
                                <MyInput
                                  name="firstname"
                                  type="text"
                                  value={this.state.rowData.userFirstName}
                                  validations={{
                                    matchRegexp: regx.letter,
                                    maxLength: "50"
                                  }}
                                  validationErrors={{
                                    matchRegexp: errors.name,
                                    maxLength: errors.maxLength50
                                  }}
                                  className="form-control"
                                  required
                                  fieldName={language.user_firstname}
                                  tooltip={tooltipMsg.user_name}
                                  isMandatory={true}
                                />
                                <MyInput
                                  name="lastname"
                                  type="text"
                                  value={this.state.rowData.userLastName}
                                  validations={{
                                    matchRegexp: regx.letter,
                                    maxLength: "50"
                                  }}
                                  validationErrors={{
                                    matchRegexp: errors.name,
                                    maxLength: errors.maxLength50
                                  }}
                                  className="form-control"
                                  required
                                  fieldName={language.user_lastname}
                                  tooltip={tooltipMsg.user_name}
                                  isMandatory={true}
                                />
                                <Row className="msedge-student-field pt-2">
                                  <Col md="4">
                                    <label htmlFor="lawschool">
                                      {language.role}{" "}
                                      <span className="text-danger">*</span>
                                    </label>
                                  </Col>
                                  <Col md="7">
                                    <div className="form-group">
                                      <Select
                                        aria-label="select category"
                                        onChange={this.handleStateChange}
                                        value={this.state.selectedState}
                                        options={selectUserRole}
                                      ></Select>
                                      <span
                                        className="msedge-info-icon"
                                        id="user-rol"
                                      >
                                        <FontAwesomeIcon
                                          icon={faQuestionCircle}
                                        />
                                      </span>
                                      <UncontrolledTooltip
                                        placement="right"
                                        target="user-rol"
                                      >
                                        {tooltipMsg.user_role}
                                      </UncontrolledTooltip>
                                    </div>
                                  </Col>
                                </Row>
                                <div
                                  style={{
                                    display: `${
                                      this.state.selectedState.value === "5"
                                        ? "block"
                                        : "none"
                                      }`
                                  }}
                                >
                                  <Row className="msedge-student-field pt-2">
                                    <Col md="4">
                                      <label htmlFor="lawschool">
                                       {language.lawschoolName}
                                      </label>
                                    </Col>
                                    <Col md="7">
                                      <div className="form-group">
                                        <Select
                                          aria-label="select law school"
                                          onChange={this.handleSchoolChange}
                                          value={this.state.selectedSchool}
                                          options={this.state.LawschoolListData}
                                        ></Select>
                                        <span
                                          className="msedge-info-icon"
                                          id="lawschool"
                                        >
                                          <FontAwesomeIcon
                                            icon={faQuestionCircle}
                                          />
                                        </span>
                                        <UncontrolledTooltip
                                          placement="right"
                                          target="lawschool"
                                        >
                                          {tooltipMsg.select_law_school}
                                        </UncontrolledTooltip>
                                      </div>
                                    </Col>
                                  </Row>
                                </div>
                                <MyInput
                                  name="userprimaryemail"
                                  type="text"
                                  value={this.state.rowData.userPrimaryEmail}
                                  validations={{ matchRegexp: regx.email }}
                                  validationError={errors.email}
                                  className="form-control"
                                  required
                                  fieldName={language.email}
                                  tooltip={tooltipMsg.email}
                                  isMandatory={true}
                                  isDisable={
                                    this.props.location.query ? true : false
                                  }
                                />
                                <NumberInput
                                  name="userphone"
                                  type="number"
                                  value={this.state.rowData.userPhone}
                                  validations={{
                                    matchRegexp: regx.phone
                                  }}
                                  validationError={errors.number}
                                  className="form-control"
                                  fieldName={language.phone_number}
                                  tooltip={tooltipMsg.phone_no}
                                />
                                <Row className="pt-2 pb-4">
                                  <Col md="4">
                                    <label
                                      htmlFor="lastname"
                                      className="ada-font-size"
                                    >
                                      {language.status}
                                    </label>
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
                                        {language.active}
                                      </label>
                                    </div>
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
                                        {language.in_active}
                                      </label>
                                    </div>
                                  </Col>
                                  {this.state.addORedit === "add" ? (
                                    <div></div>
                                  ) : (
                                      <Col md="2">
                                        <div className="custom-radio custom-control">
                                          <input
                                            aria-label="status"
                                            name="profile"
                                            type="radio"
                                            id="radiod"
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
                                            htmlFor="radiod"
                                          >
                                            {language.deleted}
                                          </label>
                                        </div>
                                      </Col>
                                    )}
                                </Row>
                              </div>
                            </Col>
                          </Row>
                        </div>

                        <Row>
                          <Col xs="12" sm="12" md="5" lg="5" xl="5">
                            {this.state.addORedit === "add" ? (
                              ""
                            ) : (
                                <button
                                  type="button"
                                  className="btn btn-outline-primary pr-5 pl-5"
                                  onClick={() =>
                                    this.triggerMail(
                                      this.props.location.query.original.userId
                                    )
                                  }
                                >
                                  {language.stud_reset_password}
                                </button>
                              )}
                          </Col>
                          <Col xs="12" sm="12" md="7" lg="7" xl="7"
                            className="text-right"
                          >
                            <div className="form-group">
                              {!this.props.isLoading ? (
                                <span className="msedge-questions-start msedge-right-br">
                                  <button
                                    type="submit"
                                    className="btn btn-outline-primary mr-2"
                                    disabled={this.state.canSubmit === false || this.state.dropDownFilled === false ? true : false}
                                    style={{
                                      cursor: this.state.cursorDisable
                                    }}
                                  >
                                    <li>
                                      <i
                                        className="pe-7s-download"
                                        aria-hidden="true"
                                      ></i>
                                    </li>
                                    <li className="text-uppercase">
                                      {language.save}
                                    </li>
                                  </button>
                                </span>
                              ) : (
                                  <span className="msedge-questions-start msedge-right-br">
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
                                  </span>
                                )}
                              <span className="msedge-questions-start msedge-right-br">
                                <Link to="/admin/list_user">
                                  <button className="btn btn-outline-primary">
                                    <li>
                                      <i
                                        className="pe-7s-back"
                                        aria-hidden="true"
                                      ></i>
                                    </li>
                                    <li className="text-uppercase">
                                      {language.back}
                                    </li>
                                  </button>
                                </Link>
                              </span>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </Row>
                </Formsy>
              </div>
            </ReactCSSTransitionGroup>
          </Fragment>
        </div>
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
)(addUser);
