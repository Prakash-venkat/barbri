import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Row, Col, UncontrolledTooltip, Input, Form } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import swal from "sweetalert";
import Loader from "react-loaders";
import moment from 'moment'
import "../../../../assets/custom/admin/_admin_law_schools.scss";
const options = [
  { value: "Catagory one", label: "Catagory one" },
  { value: "Catagory two", label: "Catagory two" },
  { value: "Catagory three", label: "Catagory three" }
];

const initialRow = {
  lawschool_code: "",
  lawschool_name: "",
  lawschool_phone: "",
  lawschool_primary_email: "",
  lawschool_website_link: "",
  lawschool_category: "",
  lawschool_address: "",
  lawschool_contact_first_name: "",
  lawschool_contact_phone_number: "",
  lawschool_contact_email: "",
  lawschool_username: "",
  lawschool_password: "",
  lawschool_profile_active: "y",
  lawschool_category: ""
};
export class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: options[0],
      isChecked: false,
      rowData: initialRow,
      addORedit: "add",
      type: "password",
      editId: "",
      errorMsg: ["", "", "", "", "", "", "", "", "", "", ""],
      showMsg: false,
      validateAll: [],
      loading: true
    };
    this.handleChange.bind(this);
    this.fieldHandler.bind(this);
    this.showHide = this.showHide.bind(this);
  }

  componentDidMount() {
    if (this.props.location.query) {
      let option = this.props.location.query.original.lawschool_category;
      options.forEach(function(element) {
        element.value == option ? (option = element) : null;
      });

      this.setState(
        {
          rowData: this.props.location.query.original || null,
          addORedit: "edit",
          editId: this.props.location.query.original.lawschool_id,
          selectedOption: option
        },
        () => console.log(this.state.rowData)
      );
    }
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
  }
  goBack = () => {
    this.setState({ addORedit: "add", rowData: initialRow });
  };
  handleChange = selectedOption => {
    this.setState({ selectedOption });
  };
  showHide(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      type: this.state.type === "input" ? "password" : "input"
    });
  }

  fieldHandler(field, event) {
    let row = this.state.rowData;
    let errorMsg = this.state.errorMsg;
    let letterReg = /([A-Za-z])/;
    let phoneReg = /^\(?(\d{3})\)?[-\. ]?(\d{3})[-\. ]?(\d{4})( x\d{4})?$/;
    let emailReg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let linkReg = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
    let password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    let numReg = /^[0-9]*$/;
    switch (field) {
      case "lscode":
        event.target.value.trim() == ""
          ? (errorMsg[0] = "Code is required")
          : (errorMsg[0] = "");
        row.lawschool_code = event.target.value;
        this.setState({ rowData: row, errorMsg: errorMsg });
        break;
      case "lsname":
        event.target.value.trim() == ""
          ? (errorMsg[1] = "Name is required")
          : letterReg.test(event.target.value) === false
          ? (errorMsg[1] = "Enter valid Input")
          : (errorMsg[1] = "");
        row.lawschool_name = event.target.value;
        this.setState({ rowData: row, errorMsg: errorMsg });

        break;
      case "lsphno":
        let phone = event.target.value.trim();

        phone == ""
          ? (errorMsg[2] = "Phone number is required")
          : phoneReg.test(phone) === false
          ? (errorMsg[2] = "Invalid  phone number")
          : (errorMsg[2] = "");
        row.lawschool_phone = event.target.value;
        this.setState({ rowData: row });

        break;
      case "email":
        event.target.value.trim() == ""
          ? (errorMsg[3] = "Mail is required")
          : emailReg.test(event.target.value.trim()) === false
          ? (errorMsg[3] = "Invalid  email")
          : (errorMsg[3] = "");
        row.lawschool_primary_email = event.target.value;
        this.setState({ rowData: row });

        break;
      case "weblink":
        let webLink = event.target.value.trim();
        webLink == ""
          ? (errorMsg[4] = "URL  is required")
          : linkReg.test(webLink) === false
          ? (errorMsg[4] = "Invalid URL")
          : (errorMsg[4] = "");

        row.lawschool_website_link = event.target.value;
        this.setState({ rowData: row });

        break;

      case "address":
        event.target.value.trim() == ""
          ? (errorMsg[5] = "Address is required")
          : event.target.value.trim().length <= 15
          ? (errorMsg[5] = "Address is not having enough details")
          : (errorMsg[5] = "");
        row.lawschool_address = event.target.value;
        this.setState({ rowData: row });

        break;
      case "pname":
        event.target.value.trim() == ""
          ? (errorMsg[6] = "Name is required")
          : letterReg.test(event.target.value) === false
          ? (errorMsg[6] = "Enter valid Name")
          : (errorMsg[6] = "");
        row.lawschool_contact_first_name = event.target.value;
        this.setState({ rowData: row });

        break;
      case "personphone":
        let perphone = event.target.value.trim();
        // event.target.value = event.target.value.length===3 ? event.target.value+'-' : event.target.value
        perphone == ""
          ? (errorMsg[7] = "Phone number is required")
          : phoneReg.test(perphone) === false
          ? (errorMsg[7] = "Invalid  phone number")
          : (errorMsg[7] = "");
        row.lawschool_contact_phone_number = perphone;
        this.setState({ rowData: row });

        break;
      case "personemail":
        event.target.value.trim() == ""
          ? (errorMsg[8] = "Mail is required")
          : emailReg.test(event.target.value.trim()) === false
          ? (errorMsg[8] = "Invalid email")
          : (errorMsg[8] = "");
        row.lawschool_contact_email = event.target.value;
        this.setState({ rowData: row });

        break;
      case "username":
        event.target.value.trim() == ""
          ? (errorMsg[9] = "Name is required")
          : letterReg.test(event.target.value) === false
          ? (errorMsg[9] = "Enter valid username")
          : (errorMsg[9] = "");
        row.lawschool_username = event.target.value;
        this.setState({ rowData: row });

        break;
      case "password":
        let pass = event.target.value.trim();
        pass == ""
          ? (errorMsg[10] = "password  is required")
          : password.test(pass) === false
          ? (errorMsg[10] =
              "Password should contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character(# omitted)")
          : (errorMsg[10] = "");
        row.lawschool_password = event.target.value;
        this.setState({ rowData: row });

        break;
      case "status":
        row.lawschool_profile_active = event.target.value;
        this.setState({ rowData: row });

        break;
      case "category":
        row.lawschool_category = this.state.selectedOption;
        this.setState({ rowData: row });

        break;
    }
  }

  onSubmitForm = e => {
    e.preventDefault();
    try {
      let validateAll = false;
      let obj = this.state.rowData;
      validateAll = this.state.errorMsg.every((val, i, arr) =>
        val === "" ? true : false
      ); // true
      if (validateAll === true) {
        if (
          obj["lawschool_code"] == "" ||
          obj["lawschool_name"] == "" ||
          obj["lawschool_phone"] == "" ||
          obj["lawschool_primary_email"] == "" ||
          obj["lawschool_website_link"] == "" ||
          obj["lawschool_address"] == "" ||
          obj["lawschool_contact_first_name"] == "" ||
          obj["lawschool_contact_phone_number"] == "" ||
          obj["lawschool_contact_email"] == "" ||
          obj["lawschool_password"] == "" ||
          obj["lawschool_username"] == ""
        )
          validateAll = false;
        window.scrollTo(0, 0);
      }

      if (validateAll === true) {
        console.log(validateAll);
        this.state.addORedit === "add"
          ? fetch(
              "http://barbri.thinrootsoftware.com/barbriapi/law_school.php",
              {
                method: "post",
                body: JSON.stringify({
                  lawschool_code: this.state.rowData.lawschool_code,
                  lawschool_name: this.state.rowData.lawschool_name,
                  lawschool_phone: this.state.rowData.lawschool_phone,
                  lawschool_primary_email: this.state.rowData
                    .lawschool_primary_email,
                  lawschool_website_link: this.state.rowData
                    .lawschool_website_link,
                  lawschool_category: this.state.selectedOption.value,
                  lawschool_address: this.state.rowData.lawschool_address,
                  lawschool_contact_first_name: this.state.rowData
                    .lawschool_contact_first_name,
                  lawschool_contact_phone_number: this.state.rowData
                    .lawschool_contact_phone_number,

                  lawschool_contact_email: this.state.rowData
                    .lawschool_contact_email,
                  lawschool_username: this.state.rowData.lawschool_username,
                  lawschool_password: this.state.rowData.lawschool_password,
                  lawschool_profile_active: this.state.rowData
                    .lawschool_profile_active
                })
              }
            ).then(res => {
              console.log(res);
              if (res.status === 200) {
                swal("Data Added!", "Successfully!", "success");

                this.state.rowData.lawschool_code = "";
                this.state.rowData.lawschool_name = "";
                this.state.rowData.lawschool_phone = "";
                this.state.rowData.lawschool_primary_email = "";
                this.state.rowData.lawschool_website_link = "";
                this.state.rowData.lawschool_address = "";
                this.state.rowData.lawschool_contact_first_name = "";
                this.state.rowData.lawschool_contact_phone_number = "";
                this.state.rowData.lawschool_contact_email = "";
                this.state.rowData.lawschool_username = "";
                this.state.rowData.lawschool_password = "";

                this.props.history.push("/admin/law-school-list");
              } else {
                Swal.fire({
                  type: "error",
                  title: "Oops...",
                  text: "Something went wrong!"
                });
              }
            })
          : fetch(
              `http://barbri.thinrootsoftware.com/barbriapi/updatelawschool.php?id=${this.state.editId}`,
              {
                method: "post",
                body: JSON.stringify({
                  lawschool_code: this.state.rowData.lawschool_code,
                  lawschool_name: this.state.rowData.lawschool_name,
                  lawschool_phone: this.state.rowData.lawschool_phone,
                  lawschool_primary_email: this.state.rowData
                    .lawschool_primary_email,
                  lawschool_website_link: this.state.rowData
                    .lawschool_website_link,
                  lawschool_category: this.state.selectedOption.value,
                  lawschool_address: this.state.rowData.lawschool_address,
                  lawschool_contact_first_name: this.state.rowData
                    .lawschool_contact_first_name,
                  lawschool_contact_phone_number: this.state.rowData
                    .lawschool_contact_phone_number,
                  lawschool_last_modified_date:moment( new Date()),
                  lawschool_contact_email: this.state.rowData
                    .lawschool_contact_email,
                  lawschool_username: this.state.rowData.lawschool_username,
                  lawschool_password: this.state.rowData.lawschool_password,
                  lawschool_profile_active: this.state.rowData
                    .lawschool_profile_active
                })
              }
            ).then(res => {
              console.log(res);
              if (res.status === 200) {
                swal("Row updated!", "Successfully!", "success");
                this.props.history.push("/admin/law-school-list");
              } else {
                Swal.fire({
                  type: "error",
                  title: "Oops...",
                  text: "Something went wrong!"
                });
              }
            });
      } else {
        this.setState({
          showMsg: true
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  render() {
    const style = {
      paddingLeft: "5px",
      color: "red"
    };
    console.log(this.state.addORedit);
    const { selectedOption } = this.state;
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
          <div className="add-law-school bg-white">
            <div>
              <div className="">
                <Form onSubmit={this.onSubmitForm}>
                  <div className="mb-2 heading-section">
                    <Row className="page-title">
                      <Col xs="12" sm="12" md="7" lg="7" xl="7">
                        <h5 className="text-primary">
                          {this.state.addORedit === "add"
                            ? "Add Law School"
                            : "Edit Law School"}
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
                            onClick={this.onSubmit}
                          >
                            Save
                          </button>
                          <Link
                            to="/admin/law-school-list"
                            className="add-law-school-btn"
                          >
                            <button className="btn btn-outline-primary pr-5 pl-5">
                              Back
                            </button>
                          </Link>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className="justify-content-center">
                    <div className="law-school-info border-bottom">
                   
                      {this.state.showMsg === false ? null : (
                        <div className="error-txt d-block justify-content-center text-center">
                          Please fill all mandatory fields correctly{" "}
                        </div>
                      )}
                      <Row className="">
                        <Col md="6" className="pt-2">
                          <h6>School Information</h6>
                        </Col>
                        <Col md="6"></Col>
                      </Row>
                      <Row>
                        <Col className="pt-2">
                          <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book.
                          </p>
                        </Col>
                      </Row>
                      <div className="law-school-text">
                        <Row className="row-space pt-2">
                          <Col md="3" className="">
                            <label htmlFor="law_school_code">
                              School Code<b style={style}>*</b>
                            </label>
                          </Col>
                          <Col md="7" className="">
                            <div className="form-group">
                              <Input
                                id="law_school_code"
                                name="law_school_code"
                                type="text"
                                ref="lscode"
                                className={"form-control"}
                                value={this.state.rowData.lawschool_code}
                                onChange={this.fieldHandler.bind(
                                  this,
                                  "lscode"
                                )}
                              />
                              <span className="info-icon" id="lscode">
                                <FontAwesomeIcon
                                  icon={faQuestionCircle}
                                  className="icon-color"
                                />
                              </span>
                              <UncontrolledTooltip
                                placement="right"
                                target="lscode"
                              >
                                Enter School Code
                              </UncontrolledTooltip>
                              <span className="text-danger">
                                {this.state.errorMsg[0]}
                              </span>
                              <div className="input-error" id="lscodeError" />
                            </div>
                          </Col>
                        </Row>
                        <Row className="row-space">
                          <Col md="3" className="">
                            <label
                              id="law_school_name_Label"
                              htmlFor="law_school_name"
                            >
                              School Name<b style={style}>*</b>
                            </label>
                          </Col>
                          <Col md="7" className="">
                            <div className="form-group">
                              <Input
                                name="law_school_name"
                                id="law_school_name"
                                type="text"
                                className={"form-control"}
                                value={this.state.rowData.lawschool_name || ""}
                                onChange={this.fieldHandler.bind(
                                  this,
                                  "lsname"
                                )}
                              />
                              <span className="info-icon" id="lsname">
                                <FontAwesomeIcon icon={faQuestionCircle} />
                              </span>
                              <UncontrolledTooltip
                                placement="right"
                                target="lsname"
                              >
                                Enter School Name
                              </UncontrolledTooltip>
                              <span className="text-danger">
                                {this.state.errorMsg[1]}
                              </span>
                              <div id="lsnameError" className="input-error" />
                            </div>
                          </Col>
                        </Row>
                        <Row className="row-space">
                          <Col md="3" className="">
                            <label id="law_school_Label" htmlFor="code">
                              Phone Number<b style={style}>*</b>
                            </label>
                          </Col>
                          <Col md="7" className="">
                            <div className="form-group">
                              <Input
                                name="lsphno"
                                type="phone"
                                className={"form-control"}
                                value={this.state.rowData.lawschool_phone || ""}
                                onChange={this.fieldHandler.bind(
                                  this,
                                  "lsphno"
                                
                                )}
                                placeholder='123-456-7890 or 1234567890'
                              />
                              <span className="info-icon" id="lsphno">
                                <FontAwesomeIcon icon={faQuestionCircle} />
                              </span>
                              <UncontrolledTooltip
                                placement="right"
                                target="lsphno"
                              >
                                Enter Phone Number
                              </UncontrolledTooltip>
                              <span className="text-danger">
                                {this.state.errorMsg[2]}
                              </span>
                              <div id="lsphnoError" className="input-error" />
                            </div>
                          </Col>
                        </Row>
                        <Row className="row-space">
                          <Col md="3" className="">
                            <label id="emailLabel" htmlFor="name">
                              Email<b style={style}>*</b>
                            </label>
                          </Col>
                          <Col md="7" className="">
                            <div className="form-group">
                              <Input
                                name="email"
                                type="text"
                                ref="email"
                                className={"form-control"}
                                value={
                                  this.state.rowData.lawschool_primary_email ||
                                  ""
                                }
                                onChange={this.fieldHandler.bind(this, "email")}
                              />
                              <span className="info-icon" id="lsemail">
                                <FontAwesomeIcon icon={faQuestionCircle} />
                              </span>
                              <UncontrolledTooltip
                                placement="right"
                                target="lsemail"
                              >
                                Enter Email
                              </UncontrolledTooltip>
                              <span className="text-danger">
                                {this.state.errorMsg[3]}
                              </span>
                              <div id="emailError" className="input-error" />
                            </div>
                          </Col>
                        </Row>
                        <Row className="row-space">
                          <Col md="3" className="">
                            <label id="weblinkLabel" htmlFor="name">
                              Website Link<b style={style}>*</b>
                            </label>
                          </Col>
                          <Col md="7" className="">
                            <div className="form-group">
                              <Input
                                name="weblink"
                                type="text"
                                ref="weblink"
                                className={"form-control"}
                                value={
                                  this.state.rowData.lawschool_website_link ||
                                  ""
                                }
                                onChange={this.fieldHandler.bind(
                                  this,
                                  "weblink"
                                )}
                              />
                              <span className="info-icon" id="lswelink">
                                <FontAwesomeIcon icon={faQuestionCircle} />
                              </span>
                              <UncontrolledTooltip
                                placement="right"
                                target="lswelink"
                              >
                                Enter Website Link{" "}
                              </UncontrolledTooltip>
                              <span className="text-danger">
                                {this.state.errorMsg[4]}
                              </span>
                              <div id="weblinkError" className="input-error" />
                            </div>
                          </Col>
                        </Row>

                        <Row className="row-space">
                          <Col md="3" className="">
                            <label htmlFor="description">
                              Category<b style={style}>*</b>
                            </label>
                          </Col>
                          <Col md="7" className="">
                            <div className="form-group">
                              <Select
                                value={selectedOption}
                                onChange={this.handleChange}
                                options={options}
                              />

                              <span className="info-icon" id="lscategory">
                                <FontAwesomeIcon icon={faQuestionCircle} />
                              </span>
                              <UncontrolledTooltip
                                placement="right"
                                target="lscategory"
                              >
                                Select Catagory of School
                              </UncontrolledTooltip>
                            </div>
                          </Col>
                        </Row>

                        <Row className="row-space">
                          <Col md="3" className="">
                            <label id="addressLabel" htmlFor="description">
                              Address<b style={style}>*</b>{" "}
                            </label>
                          </Col>
                          <Col md="7" className="">
                            <div className="form-group">
                              <Input
                                name="address"
                                component="textarea"
                                ref="address"
                                className={"form-control"}
                                value={
                                  this.state.rowData.lawschool_address || ""
                                }
                                onChange={this.fieldHandler.bind(
                                  this,
                                  "address"
                                )}
                              />
                              <span className="info-icon" id="lsadd">
                                <FontAwesomeIcon icon={faQuestionCircle} />
                              </span>
                              <UncontrolledTooltip
                                placement="right"
                                target="lsadd"
                              >
                                Enter School Address
                              </UncontrolledTooltip>
                              <span className="text-danger">
                                {this.state.errorMsg[5]}
                              </span>
                              <div id="addressError" className="input-error" />
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </div>

                    <div className="access-info border-bottom">
                      <Row className="pt-2">
                        <Col className="pt-2">
                          <h6>Profile Information</h6>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="pt-2">
                          <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book.
                          </p>
                        </Col>
                      </Row>
                      <div className="law-school-text">
                        <Row className="pt-2 pb-4">
                          <Col md="3">
                            <label id="profileLabel" htmlFor="lastname">
                              Status:
                            </label>
                          </Col>
                          <Col md="3">
                            <div className="custom-radio custom-control">
                              <input
                                name="profile"
                                type="radio"
                                id="radioYes"
                                className="custom-control-input"
                                value="y"
                                ref="profile"
                                onChange={this.fieldHandler.bind(
                                  this,
                                  "status"
                                )}
                                checked={
                                  this.state.rowData
                                    .lawschool_profile_active === "y"
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
                                onChange={this.fieldHandler.bind(
                                  this,
                                  "status"
                                )}
                                checked={
                                  this.state.rowData
                                    .lawschool_profile_active === "n"
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
                          <Col md="3">
                            <div className="custom-radio custom-control">
                              <input
                                name="profile"
                                type="radio"
                                id="radioDeleted"
                                className="custom-control-input"
                                value="d"
                                onChange={this.fieldHandler.bind(
                                  this,
                                  "status"
                                )}
                                checked={
                                  this.state.rowData
                                    .lawschool_profile_active === "d"
                                    ? true
                                    : false
                                }
                              />
                              <label
                                className="custom-control-label"
                                for="radioDeleted"
                              >
                                Deleted
                              </label>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </div>

                    <div className="contact-person-details contact_person">
                      <Row className="pt-2">
                        <Col className="pt-2">
                          <h6>Contact Person Information</h6>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="pt-2">
                          <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book.
                          </p>
                        </Col>
                      </Row>
                      <div className="law-school-text">
                        <Row className="row-space pt-2">
                          <Col md="3" className="">
                            <label id="pnameLabel" htmlFor="code">
                              Name<b style={style}>*</b>
                            </label>
                          </Col>

                          <Col md="7" className="">
                            <div className="form-group">
                              <Input
                                name="pname"
                                type="text"
                                ref="pname"
                                className={"form-control"}
                                value={
                                  this.state.rowData
                                    .lawschool_contact_first_name || ""
                                }
                                onChange={this.fieldHandler.bind(this, "pname")}
                              />
                              <span className="info-icon" id="pname">
                                <FontAwesomeIcon icon={faQuestionCircle} />
                              </span>
                              <UncontrolledTooltip
                                placement="right"
                                target="pname"
                              >
                                Enter Person Name
                              </UncontrolledTooltip>
                              <span className="text-danger">
                                {this.state.errorMsg[6]}
                              </span>
                              <div id="pnameError" className="input-error" />
                            </div>
                          </Col>
                        </Row>
                        <Row className="row-space">
                          <Col md="3" className="">
                            <label id="personphoneLabel" htmlFor="code">
                              Phone Number<b style={style}>*</b>
                            </label>
                          </Col>
                          <Col md="7" className="">
                            <div className="form-group">
                              <Input
                                name="personphone"
                                id="personphone"
                                type="text"
                                className={"form-control"}
                                value={
                                  this.state.rowData
                                    .lawschool_contact_phone_number || ""
                                }
                                onChange={this.fieldHandler.bind(
                                  this,
                                  "personphone"
                                )}
                              />
                              <span className="info-icon" id="pnumber">
                                <FontAwesomeIcon icon={faQuestionCircle} />
                              </span>
                              <UncontrolledTooltip
                                placement="right"
                                target="pnumber"
                              >
                                Enter Phone Number
                              </UncontrolledTooltip>
                              <span className="text-danger">
                                {this.state.errorMsg[7]}
                              </span>
                              <div
                                id="personphoneError"
                                className="input-error"
                              />
                            </div>
                          </Col>
                        </Row>
                        <Row className="row-space">
                          <Col md="3" className="">
                            <label id="personemailLabel" htmlFor="code">
                              Email<b style={style}>*</b>
                            </label>
                          </Col>
                          <Col md="7" className="">
                            <div className="form-group">
                              <Input
                                name="personemail"
                                type="email"
                                ref="personemail"
                                className={"form-control"}
                                value={
                                  this.state.rowData.lawschool_contact_email ||
                                  ""
                                }
                                onChange={this.fieldHandler.bind(
                                  this,
                                  "personemail"
                                )}
                              />
                              <span className="info-icon" id="pemail">
                                <FontAwesomeIcon icon={faQuestionCircle} />
                              </span>
                              <UncontrolledTooltip
                                placement="right"
                                target="pemail"
                              >
                                Enter Person Email
                              </UncontrolledTooltip>
                              <span className="text-danger">
                                {this.state.errorMsg[8]}
                              </span>
                              <div
                                id="personemailError"
                                className="input-error"
                              />
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </div>
                    <div className="access-info">
                      <Row className="pt-2">
                        <Col className="pt-2">
                          <h6>Access Information</h6>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="pt-2">
                          <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book.
                          </p>
                        </Col>
                      </Row>
                      <div className="law-school-text">
                        <Row className="pt-2">
                          <Col md="3" className="">
                            <label id="usernameLabel" htmlFor="code">
                              User Name<b style={style}>*</b>
                            </label>
                          </Col>
                          <Col md="7" className="">
                            <div className="form-group">
                              <Input
                                name="username"
                                type="text"
                                ref="username"
                                className={"form-control"}
                                value={this.state.rowData.lawschool_username}
                                onChange={this.fieldHandler.bind(
                                  this,
                                  "username"
                                )}
                              />
                              <span className="info-icon" id="uname">
                                <FontAwesomeIcon icon={faQuestionCircle} />
                              </span>
                              <UncontrolledTooltip
                                placement="right"
                                target="uname"
                              >
                                Enter User Name
                              </UncontrolledTooltip>
                              <span className="text-danger">
                                {this.state.errorMsg[9]}
                              </span>
                              <div id="usernameError" className="input-error" />
                            </div>
                          </Col>
                        </Row>
                        <Row className="row-space">
                          <Col md="3" className="">
                            <label id="passwordLabel" htmlFor="code">
                              Password<b style={style}>*</b>
                            </label>
                          </Col>
                          <Col md="7" className="">
                            <div className="form-group">
                              <Input
                                name="password"
                                type={this.state.type}
                                className={"form-control"}
                                value={this.state.rowData.lawschool_password}
                                onChange={this.fieldHandler.bind(
                                  this,
                                  "password"
                                )}
                              />

                              <span className="info-icon" id="password">
                                <FontAwesomeIcon icon={faQuestionCircle} />
                              </span>
                              <span
                                className="btn pe-7s-look eye"
                                onClick={this.showHide}
                              ></span>
                              <UncontrolledTooltip
                                placement="right"
                                target="password"
                              >
                                Enter User Password
                              </UncontrolledTooltip>
                              <span className="text-danger">
                                {this.state.errorMsg[10]}
                              </span>
                              <div id="passwordError" className="input-error" />
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 mt-3 pt-3">
                      <div className="form-group text-right">
                        <button
                          type="submit"
                          className="btn btn-outline-primary pr-5 pl-5 mr-2"
                          onClick={this.onSubmit}
                        >
                          Save
                        </button>
                        <Link
                          to="/admin/law-school-list"
                          className="add-law-school-btn"
                        >
                          <button
                            type=""
                            className="btn btn-outline-primary pr-5 pl-5"
                            onClick={this.goBack}
                          >
                            Back
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Add;
