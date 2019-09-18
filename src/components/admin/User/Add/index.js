import { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { UncontrolledTooltip, Col, Row, Input, Form } from "reactstrap";

import "../../../../../../src/assets/custom/admin/_admin_users.scss";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import swal from "sweetalert";
import "../../../../../assets/custom/admin/_admin_users.scss";

import { postService } from "../../../../../utils/Requester";
import { adminCurrentState } from "../../../../../actions/action-admin";
import { onChangeHandler } from "../../../../../utils/HandleInput";
import { ADMIN_USERS } from "../../../../../constants/requester";
import { onSubmitHandler } from "../../../../../utils/OnSubmitHandler";

import Loader from "react-loaders";
const initialRow = {
  user_first_name: "",
  user_last_name: "",
  user_primary_email: "",
  user_phone: "",
  user_role: "",
  user_profile_active: "y",
  user_password: "",
  user_name: "",
  isEmpty: false
};

const selectedPath = ADMIN_USERS;

export class Add extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isChecked: false,
      isTransferChecked: false,
      status: "Yes",
      transfer: "Yes",
      isCheckedRadio: false,
      active: "Yes",
      rowData: initialRow,
      error: null,
      addORedit: "add",
      editId: "",
      loading: true,
      errorMsg: [],
      showMsg: false,
      type: "password",
      errms: "",
      isHandlingError: false
    };
    this.showHide = this.showHide.bind(this);
  }

  showHide(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      type: this.state.type === "input" ? "password" : "input"
    });
  }
  componentDidMount() {
    this.props.adminCurrentState(selectedPath);

    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
    if (this.props.location.query) {
      this.setState(
        {
          rowData: this.props.location.query.original || null,
          addORedit: "edit",
          editId: this.props.location.query.original.user_id
        },
        () => console.log(this.state.rowData)
      );
    }
  }

  fieldHandler(field, event) {
    let row = this.state.rowData;
    let errorMsg = this.state.errorMsg;
    let letterReg = /^[A-Za-z ]+$/;
    let phoneReg = /^\(?(\d{3})\)?[-\. ]?(\d{3})[-\. ]?(\d{4})( x\d{4})?$/;
    let emailReg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let passReg = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/;
    switch (field) {
      case "userfirstname":
        event.target.value.trim() === ""
          ? (errorMsg[0] = "First name is required")
          : letterReg.test(event.target.value) === false
          ? (errorMsg[0] = "Enter valid Input")
          : (errorMsg[0] = "");
        row.user_first_name = event.target.value;
        this.setState({ rowData: row, errorMsg: errorMsg });
        break;

      case "userlastname":
        event.target.value.trim() === ""
          ? (errorMsg[1] = "Last name is required")
          : letterReg.test(event.target.value) === false
          ? (errorMsg[1] = "Enter valid Input")
          : (errorMsg[1] = "");

        row.user_last_name = event.target.value;
        this.setState({ rowData: row });
        break;

      case "userprimaryemail":
        event.target.value.trim() == ""
          ? (errorMsg[2] = "Email is required")
          : emailReg.test(event.target.value) === false
          ? (errorMsg[2] = "Invalid email")
          : (errorMsg[2] = "");

        row.user_primary_email = event.target.value;
        this.setState({ rowData: row });
        break;
      case "userphone":
        // numberReg.test( row.lawschool_phone) === false

        event.target.value.trim() === ""
          ? (errorMsg[3] = "Phone number required")
          : phoneReg.test(event.target.value) === false
          ? (errorMsg[3] = "Enter valid Input")
          : (errorMsg[3] = "");

        row.user_phone = event.target.value;
        this.setState({ rowData: row });
        break;
      case "userrole":
        row.user_role = event.target.value;
        this.setState({ rowData: row });
        break;
      case "status":
        row.user_profile_active = event.target.value;
        this.setState({ rowData: row });
        break;
      case "userpassword":
        row.user_password = event.target.value;
        this.setState({ rowData: row });
        event.target.value.trim() === ""
          ? (errorMsg[5] = "Password is required")
          : passReg.test(event.target.value) === false
          ? (errorMsg[5] =
              " Password must include one uppercase, one lowercase, one number and  one special character length minimum 6")
          : (errorMsg[5] = "");
        break;
      case "username":
        row.user_name = event.target.value;
        this.setState({ rowData: row });
        event.target.value.trim() === ""
          ? (errorMsg[4] = "Invalid User Name")
          : letterReg.test(event.target.value) === false
          ? (errorMsg[4] = "Enter valid Input")
          : (errorMsg[4] = "");
        break;
    }
  }

  toggleChecked = () => {
    this.setState({
      isChecked: !this.state.isChecked
    });
    if (this.state.isChecked) {
      this.setState({ status: "Yes" });
    } else {
      this.setState({ status: "No" });
    }
  };
  toggleTransferChecked = () => {
    this.setState({
      isTransferChecked: !this.state.isTransferChecked
    });
    if (this.state.isTransferChecked) {
      this.setState({ transfer: "Yes" });
    } else {
      this.setState({ transfer: "No" });
    }
  };
  // componentDidMount() {
  //   if (this.props.location.query) {
  //     this.setState(
  //       {
  //         rowData: this.props.location.query.original || null,
  //         addORedit: "edit",
  //         editId: this.props.location.query.original.user_id
  //       },
  //       () => console.log(this.state.rowData)
  //     );
  //   }
  // }

  onSubmitField = e => {
    const { postService } = this.props;

    postService(selectedPath);

    try {
      // throw new Error('some error in try block'); for testing
      e.preventDefault();
      let validateAll = false;
      let obj = this.state.rowData;
      validateAll = this.state.errorMsg.every((val, i, arr) =>
        val === "" ? true : false
      );
      if (validateAll === true) {
        if (
          obj["user_first_name"] == "" ||
          obj["user_last_name"] == "" ||
          obj["user_primary_email"] == "" ||
          obj["user_role"] == "" ||
          obj["user_profile_active"] == "" ||
          obj["user_name"] == "" ||
          obj["user_password"] == ""
        )
          validateAll = false;
      }

      // this.setState({ validateAll: errorArray });
      // if(this.state.rowData.user_first_name === "" ||  this.state.rowData.user_last_name ==="" || this.state.rowData.user_primary_email ==="" ||this.state.rowData.user_role ===""||this.state.rowData.user_profile_active ===""||this.state.rowData.user_name ===""||this.state.rowData.user_password ===""){
      //   this.setState({isEmpty : true})
      // }else{
      if (validateAll === true) {
        const d = new Date();
        const month = d.getMonth() + 1;
        const day = d.getDate();
        const year = d.getFullYear();
        const date_test = month + "-" + day + "-" + year;
        console.log("date" + date_test);

        this.state.addORedit === "add"
          ? fetch("http://barbri.thinrootsoftware.com/barbriapi/users.php", {
              method: "post",
              body: JSON.stringify({
                user_first_name: this.state.rowData.user_first_name,
                user_last_name: this.state.rowData.user_last_name,
                user_primary_email: this.state.rowData.user_primary_email,
                user_phone: this.state.rowData.user_phone,
                user_role: this.state.rowData.user_role,
                user_profile_active: this.state.rowData.user_profile_active,
                user_name: this.state.rowData.user_name,
                user_password: this.state.rowData.user_password,
                user_last_modified_at: date_test
              })
            }).then(res => {
              console.log("data" + this.state.addORedit);
              swal("Data Added!", "Successfully!", "success");
              this.state.rowData.user_first_name = "";
              this.state.rowData.user_last_name = "";
              this.state.rowData.user_primary_email = "";
              this.state.rowData.user_phone = "";
              this.state.rowData.user_role = "";
              this.state.rowData.user_profile_active = "y";
              this.state.rowData.user_name = "";
              this.state.rowData.user_password = "";
              this.props.history.push("/admin/user-list");
            })
          : fetch(
              `http://barbri.thinrootsoftware.com/barbriapi/Updateuser.php?id=${this.state.editId}`,
              {
                method: "post",
                body: JSON.stringify({
                  user_first_name: this.state.rowData.user_first_name,
                  user_last_name: this.state.rowData.user_last_name,
                  user_primary_email: this.state.rowData.user_primary_email,
                  user_phone: this.state.rowData.user_phone,
                  user_role: this.state.rowData.user_role,
                  user_profile_active: this.state.rowData.user_profile_active,
                  user_profile_active: this.state.rowData.user_profile_active,
                  user_password: this.state.rowData.user_password,
                  user_name: this.state.rowData.user_name,
                  user_last_modified_at: date_test
                })
              }
            ).then(res => {
              console.log("dataaaaaaaa" + res);
              swal("Row updated!", "Successfully!", "success");
              this.props.history.push("/admin/user-list");
            });
      } else {
        window.scrollTo(0, 0);
        this.setState({
          showMsg: true
        });
      }
    } catch (e) {
      console.log("Error thrown from try...catch", e, e.message);
      // alert('Error thrown from onsubmit user add and edit function')
      // this.props.history.push('/admin/user-list');
    }
  };
  // }
  // if () {

  // const d = new Date()
  // const month =d.getMonth() +1;
  // const day=d.getDate()
  // const year=d.getFullYear();
  // const date_test= month+'-'+day+'-'+year
  // console.log("date"+date_test)

  // //  console.log(current_date + 'date');

  //   else{
  //     this.setState({
  //       showMsg : true
  //     })

  render() {
    const style = {
      paddingLeft: "5px",
      color: "red"
    };
    const {
      onChangeHandler,
      onSubmitHandler,
      firstName,
      lastName,
      email,
      phoneNumber,
      role,
      status,
      userName,
      password,
      error
    } = this.props;
    console.log(error + "error");
    return (
      <div>
        {this.state.loading ? (
          <div className="loader-custom">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="line-scale-pulse-out-rapid" />
                <h6 className="mt-2">Please Wait... Fetching Information</h6>
              </div>{" "}
            </div>
          </div>
        ) : (
          <div className="add-student">
            <Fragment>
              <ReactCSSTransitionGroup
                component="div"
                transitionName="TabsAnimation"
                transitionAppear={true}
                transitionAppearTimeout={0}
                transitionEnter={false}
                transitionLeave={false}
              >
                <div>
                  <div className="student-content">
                    <form
                      onSubmit={e => {
                        e.preventDefault();
                        onSubmitHandler();
                      }}
                      id="form-fields"
                    >
                      <div className="mb-2 heading-section">
                        <Row className="page-title">
                          <Col xs="12" sm="12" md="7" lg="7" xl="7">
                            <h5 className="text-primary">
                              {this.state.addORedit === "add"
                                ? "Add User"
                                : "Edit User"}
                            </h5>
                            <p className="text-muted">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit
                            </p>
                          </Col>
                          <Col
                            xs="12"
                            sm="12"
                            md="5"
                            lg="5"
                            xl="5"
                            className="text-right"
                          >
                            <div className="form-group">
                              <button
                                type="submit"
                                className="btn btn-outline-primary pr-5 pl-5 mr-2"
                              >
                                Save
                              </button>

                              <Link to="/admin/user-list">
                                <button
                                  type="button"
                                  className="btn btn-outline-primary pr-5 pl-5"
                                >
                                  Back
                                </button>
                              </Link>
                            </div>
                          </Col>
                        </Row>
                      </div>
                      <Row>
                        <Col md="11" className="pt-3 ml-auto">
                          {this.state.showMsg === false ? null : (
                            <div className="error-txt d-block justify-content-center text-center text-danger">
                              Please fill all mandatory fields correctly{" "}
                            </div>
                          )}
                          {/* <div className="error-txt">{this.state.isEmpty === true ? <p>Please fill required fields </p> : ''}</div> */}
                          {/* <div className="top-error">
                      <h6>{this.state.errms}</h6>
                      </div> */}
                          <h6 className="text-primary form-header font-weight ">
                            Basic Information
                          </h6>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="10" className="pt-2 mx-auto">
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in
                          </p>
                        </Col>
                      </Row>
                      <div className="margin-width ">
                        <Row className="border-bottom">
                          <Col md="10" className="mx-auto ">
                            <div className=" pt-2 pb-3 ">
                              <Row className="student-field pt-2">
                                <Col md="3">
                                  <label htmlFor="firstName">
                                    First Name <b style={style}>*</b>
                                  </label>
                                </Col>
                                <Col md="7">
                                  <div className="form-group">
                                    <Input
                                      name="firstName"
                                      type="text"
                                      id="firstName"
                                      // required
                                      value={firstName}
                                      onChange={onChangeHandler.bind(
                                        this,
                                        "firstName"
                                      )}
                                      className="form-control"
                                    />

                                    <span className="info-icon" id="firstName1">
                                      <FontAwesomeIcon
                                        icon={faQuestionCircle}
                                      />
                                    </span>
                                    <UncontrolledTooltip
                                      placement="right"
                                      target="firstName1"
                                    >
                                      Enter First Name
                                    </UncontrolledTooltip>
                                    <span className="text-danger">{error}</span>
                                  </div>
                                </Col>
                              </Row>
                              <Row className="student-field">
                                <Col md="3">
                                  <label htmlFor="lastName">
                                    Last Name<b style={style}>*</b>
                                  </label>
                                </Col>
                                <Col md="7">
                                  <div className="form-group">
                                    <Input
                                      name="lastName"
                                      id="lastName"
                                      type="text"
                                      //  required
                                      value={lastName}
                                      onChange={onChangeHandler.bind(
                                        this,
                                        "lastName"
                                      )}
                                      className={"form-control"}
                                    />
                                    <span className="info-icon" id="lastName1">
                                      <FontAwesomeIcon
                                        icon={faQuestionCircle}
                                      />
                                    </span>
                                    <UncontrolledTooltip
                                      placement="right"
                                      target="lastName1"
                                    >
                                      Enter Last Name
                                    </UncontrolledTooltip>
                                    <span className="text-danger">{error}</span>
                                  </div>
                                </Col>
                              </Row>
                              <Row className="student-field">
                                <Col md="3">
                                  <label htmlFor="email">
                                    Email <b style={style}>*</b>
                                  </label>
                                </Col>
                                <Col md="7">
                                  <div className="form-group">
                                    <Input
                                      name="email"
                                      id="email"
                                      type="text"
                                      //  required
                                      value={email}
                                      onChange={onChangeHandler.bind(
                                        this,
                                        "userprimaryemail"
                                      )}
                                      className={"form-control"}
                                    />

                                    <span className="info-icon" id="email1">
                                      <FontAwesomeIcon
                                        icon={faQuestionCircle}
                                      />
                                    </span>
                                    <UncontrolledTooltip
                                      placement="right"
                                      target="email1"
                                    >
                                      Enter Your Email
                                    </UncontrolledTooltip>
                                    <span className="text-danger">{error}</span>
                                  </div>
                                </Col>
                              </Row>
                              <Row className="student-field">
                                <Col md="3">
                                  <label htmlFor="phonenumber">
                                    Phone Number <b style={style}>*</b>
                                  </label>
                                </Col>
                                <Col md="7">
                                  <div className="form-group">
                                    <Input
                                      name="phoneNo"
                                      id="phoneNo"
                                      placeholder="123-456-7890 or 1234567890"
                                      type="text"
                                      value={phoneNumber}
                                      onChange={onChangeHandler.bind(
                                        this,
                                        "phoneNumber"
                                      )}
                                      className={"form-control"}
                                    />

                                    <span className="info-icon" id="phoneno">
                                      <FontAwesomeIcon
                                        icon={faQuestionCircle}
                                      />
                                    </span>
                                    <UncontrolledTooltip
                                      placement="right"
                                      target="phoneno"
                                    >
                                      Enter Phone Number
                                    </UncontrolledTooltip>
                                    <span className="text-danger">{error}</span>
                                  </div>
                                </Col>
                              </Row>
                              <Row className="student-field">
                                <Col md="3">
                                  <label htmlFor="role">
                                    Role <b style={style}>*</b>
                                  </label>
                                </Col>
                                <Col md="7">
                                  <div className="form-group">
                                    <Input
                                      name="role"
                                      id="role"
                                      type="select"
                                      //  required
                                      component="select"
                                      value={role}
                                      onChange={onChangeHandler.bind(
                                        this,
                                        "role"
                                      )}
                                      className={"form-control"}
                                    >
                                      {/* <option value="">Please Select</option> */}
                                      <option value="">Please Select</option>
                                      <option value="viewer">Viewer</option>
                                      <option value="operator">Operator</option>
                                      <option value="controller">
                                        Controller
                                      </option>
                                    </Input>

                                    <span className="info-icon" id="role1">
                                      <FontAwesomeIcon
                                        icon={faQuestionCircle}
                                      />
                                    </span>
                                    <UncontrolledTooltip
                                      placement="right"
                                      target="role1"
                                    >
                                      Select Role
                                    </UncontrolledTooltip>
                                  </div>
                                </Col>
                              </Row>

                              <div className="law-school-text">
                                <Row className="pt-2 pb-4">
                                  <Col md="3">
                                    <label htmlFor="lastname">Status:</label>
                                  </Col>
                                  <Col md="3">
                                    <div className="custom-radio custom-control">
                                      <Input
                                        name="profile"
                                        type="radio"
                                        id="radioYes"
                                        className="custom-control-input"
                                        value="y"
                                        onChange={onChangeHandler.bind(
                                          this,
                                          "status"
                                        )}
                                        checked={
                                          this.state.rowData
                                            .user_profile_active === "y"
                                            ? true
                                            : false
                                        }
                                      />
                                      <label
                                        className="custom-control-label"
                                        for="radioYes"
                                      >
                                        Active
                                      </label>
                                    </div>
                                  </Col>
                                  <Col md="3">
                                    <div className="custom-radio custom-control">
                                      <input
                                        name="profile"
                                        type="radio"
                                        id="radioNo"
                                        className="custom-control-input"
                                        value="n"
                                        onChange={onChangeHandler.bind(
                                          this,
                                          "status"
                                        )}
                                        checked={
                                          this.state.rowData
                                            .user_profile_active === "n"
                                            ? true
                                            : false
                                        }
                                      />
                                      <label
                                        className="custom-control-label"
                                        for="radioNo"
                                      >
                                        In Active
                                      </label>
                                    </div>
                                  </Col>
                                </Row>
                              </div>
                            </div>
                          </Col>
                        </Row>

                        <Row>
                          <Col className="pt-3 ml-auto">
                            <h6 className="text-primary form-header font-weight ">
                              Access Information
                            </h6>
                          </Col>
                        </Row>
                        <div>
                          <Row>
                            <Col className="pt-2">
                              <p>
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry. Lorem Ipsum has been
                                the industry's standard dummy text ever since
                                the 1500s, when an unknown printer took a galley
                                of type and scrambled it to make a type specimen
                                book.
                              </p>
                            </Col>
                          </Row>
                          <div className="">
                            <Row>
                              <Col md="10" className="mx-auto">
                                <Row className="pt-2">
                                  <Col md="3" className="">
                                    <label htmlFor="code">
                                      User Name<b style={style}>*</b>
                                    </label>
                                  </Col>
                                  <Col md="7" className="">
                                    <div className="form-group">
                                      <Input
                                        name="username"
                                        //   required
                                        type="text"
                                        className={"form-control"}
                                        value={userName}
                                        onChange={onChangeHandler.bind(
                                          this,
                                          "userName"
                                        )}
                                      />
                                      <span className="info-icon" id="uname">
                                        <FontAwesomeIcon
                                          icon={faQuestionCircle}
                                        />
                                      </span>
                                      <UncontrolledTooltip
                                        placement="right"
                                        target="uname"
                                      >
                                        Enter User Name
                                      </UncontrolledTooltip>
                                      <span className="text-danger">
                                        {error}
                                      </span>
                                    </div>
                                  </Col>
                                </Row>
                                <Row className="student-field">
                                  <Col md="3">
                                    <label htmlFor="password">
                                      Password <b style={style}>*</b>
                                    </label>
                                  </Col>
                                  <Col md="7">
                                    <div className="form-group">
                                      <Input
                                        name="password"
                                        //  required
                                        id="password"
                                        type={this.state.type}
                                        //  type="password"
                                        value={password}
                                        onChange={onChangeHandler.bind(
                                          this,
                                          "password"
                                        )}
                                        className={"form-control"}
                                      />

                                      <span className="info-icon" id="pass">
                                        <FontAwesomeIcon
                                          icon={faQuestionCircle}
                                        />
                                      </span>
                                      <span
                                        className="btn pe-7s-look eye password-show-hide"
                                        onClick={this.showHide}
                                      ></span>
                                      <UncontrolledTooltip
                                        placement="right"
                                        target="pass"
                                      >
                                        Enter Password
                                      </UncontrolledTooltip>
                                      <span className="text-danger">
                                        {error}
                                      </span>
                                    </div>
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                          </div>
                        </div>
                      </div>

                      <div className="mb-2 heading-section">
                        <Row className="page-title">
                          <Col xs="12" sm="12" md="7" lg="7" xl="7"></Col>
                          <Col
                            xs="12"
                            sm="12"
                            md="5"
                            lg="5"
                            xl="5"
                            className="text-right"
                          >
                            <div className="form-group">
                              <button
                                type="submit"
                                className="btn btn-outline-primary pr-5 pl-5 mr-2"
                                onClick={this.addUser}
                              >
                                Save
                              </button>
                              <Link to="/admin/user-list">
                                <button
                                  type="button"
                                  className="btn btn-outline-primary pr-5 pl-5"
                                  onClick={this.toggle}
                                >
                                  Back
                                </button>
                              </Link>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </form>
                  </div>
                </div>
              </ReactCSSTransitionGroup>
            </Fragment>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.RequestReducer.message,
    firstName: state.Inputs.firstName,
    lastName: state.Inputs.firstName,
    email: state.Inputs.email,
    phoneNumber: state.Inputs.email,
    role: state.Inputs.role,
    status: state.Inputs.status,
    username: state.Inputs.userName,
    password: state.Inputs.password
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      postService: postService,
      onChangeHandler: onChangeHandler,
      adminCurrentState: adminCurrentState,
      onSubmitHandler: onSubmitHandler
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Add);
