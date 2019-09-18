//Authorization:
//Designed : by Usha M
//Purpose: Created for adding item tag
//Description: Table for adding  data Item tags
import { Component } from "react";
import { UncontrolledTooltip, Col, Row } from "reactstrap";
import { Form, ErrorMessage } from "formik";
import React, { Fragment } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Select from "react-select";
import swal from "sweetalert";
import Loader from 'react-loaders'
import "../../../../../assets/custom/admin/_admin_users.scss";

const initialRow = {
  // slNo: "",
  item_tag_code: "",
  item_tag_name: "",
  item_tag_category: "",
  item_tag_status: "y",

};
const options = [
  { value: "Catagory one", label: "Catagory one" },
  { value: "Catagory two", label: "Catagory two" },
  { value: "Catagory three", label: "Catagory three" }
];
export class Add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rowData: initialRow,
      selectedOption: options[0],
      rowData: initialRow,
      addORedit: "add",
      editId: "",
      errorMsg: ["", "", "", "", ""],
      showMsg: false,
      validateAll: [],
      loading: true,
      loading: true
    };
    this.fieldHandler.bind(this);
    this.handleChange.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false })
    }, 1000);
    if (this.props.location.query) {
      let option = this.props.location.query.original.item_tag_category;
      options.forEach(function (element) {
        element.value == option ? (option = element) : null;
      });
      this.setState(
        {
          rowData: this.props.location.query.original || null,
          addORedit: "edit",
          editId: this.props.location.query.original.item_tag_id,
          selectedOption: option
        },
        () => console.log(this.state.rowData)
      );
    }
    if (this.props.location.query) {
      this.setState(
        { rowData: this.props.location.query.original || null },
        () => console.log(this.state.rowData)
      );
    }
    setTimeout(() => {
      this.setState({ loading: false })
    }, 1000);
  }

  handleChange = selectedOption => {
    console.log(selectedOption.value);
    this.setState({ selectedOption });
  };

  fieldHandler(field, event) {
    let row = this.state.rowData;
    let errorMsg = this.state.errorMsg;
    let letterReg = /([A-Za-z])/;
    switch (field) {
      case "tagCode":
        row.item_tag_code = event.target.value;
        console.log(event.target.value)
        this.setState({ rowData: row });
        event.target.value.trim() == ""
          ? errorMsg[0] = "Tag code is required"
          : errorMsg[0] = "";
        this.setState({ rowData: row, errorMsg: errorMsg });
        break;
      case "tagName":
        row.item_tag_name = event.target.value;
        event.target.value.trim() == ""
          ? errorMsg[1] = "Tag Name is required"
          : letterReg.test(event.target.value) === false
            ? errorMsg[1] = "Enter valid input"
            : errorMsg[1] = "";
        row.item_tag_name = event.target.value;
        this.setState({ rowData: row, errorMsg: errorMsg });
        break;
      case "category":
        row.item_tag_category = event.target.value;
        this.setState({ rowData: row });
        break;
      case "status":
        row.item_tag_status = event.target.value;
        this.setState({ rowData: row });
        break;
    }
  }
  onSubmitForm = e => {
    console.log(this.state.rowData)
    e.preventDefault();
    try {

      let validateAll = false;
      let obj = this.state.rowData;
      validateAll = this.state.errorMsg.every((val, i, arr) => val === "" ? true : false); // true
      if (validateAll === true) {
        if (
          obj['item_tag_code'] == '' ||
          obj['item_tag_name'] == ''
          // obj['item_tag_category'] == '' ||
          // obj['item_tag_status'] == ''
        )
          validateAll = false
      }
      if (validateAll === true) {
        this.state.addORedit === "add"
          ? fetch("http://barbri.thinrootsoftware.com/barbriapi/item_tag.php", {
            method: "post",
            body: JSON.stringify({
              item_tag_code: this.state.rowData.item_tag_code,
              item_tag_name: this.state.rowData.item_tag_name,
              item_tag_category: this.state.selectedOption.value,
              item_tag_status: this.state.rowData.item_tag_status
            })
          }).then(res => {
            console.log("dataaaaaaaa" + res);
            swal("Data Added!", "Successfully!", "success");
            this.state.rowData.item_tag_code = "";
            this.state.rowData.item_tag_name = "";
            this.state.rowData.item_tag_category = options[0].value;
            this.state.rowData.item_tag_status = "y";
            this.props.history.push("/admin/item-tag-list");
          })
          : fetch(
            `http://barbri.thinrootsoftware.com/barbriapi/update_item_tag.php?id=${this.state.editId}`,
            {
              method: "post",
              body: JSON.stringify({
                item_tag_code: this.state.rowData.item_tag_code,
                item_tag_name: this.state.rowData.item_tag_name,
                item_tag_category: this.state.selectedOption.value,
                item_tag_status: this.state.rowData.item_tag_status
              })
            }
          ).then(res => {
            console.log("edit data" + res);
            swal("Row updated!", "Successfully!", "success");
            this.state.rowData.item_tag_code = "";
            this.state.rowData.item_tag_name = "";
            this.state.rowData.item_tag_category = options[0].value;
            this.state.rowData.item_tag_status = "y";
            this.props.history.push("/admin/item-tag-list");
          });
      } else {
        this.setState({
          showMsg: true
        });
      }
    }
    catch (e) {
      // alert('error thrown from try.. catch')
      console.log("error found in admin item tags add and edit")
    }
  };

  render() {
    const style = {
      paddingLeft: "5px",
      color: "red"
    };
    const { selectedOption } = this.state;
    return (
      <div className="add-student">
        <Fragment>
          <div>
            {this.state.loading ?
              <div className="loader-custom">
                <div className="loader-container-inner">
                  <div className="text-center">
                    <Loader type="line-scale-pulse-out-rapid" />
                    <h6 className="mt-2">
                      Please Wait... Fetching Information
                </h6>
                  </div>
                </div>
              </div>

              :
              <ReactCSSTransitionGroup
                component="div"
                transitionName="TabsAnimation"
                transitionAppear={true}
                transitionAppearTimeout={0}
                transitionEnter={false}
                transitionLeave={false}
              >
                <div>
                  <Form onSubmit={this.onSubmitForm}>
                    <div className="student-content">
                      <div className="mb-2 heading-section">
                        <Row className="w-100">
                          <Col xs="12" sm="12" md="7" lg="7" xl="7">
                            <h5 className="text-primary">Add Item Tag</h5>
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
                              <Link to="/admin/item-tag-list">
                                <button
                                  type="submit"
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
                      <Row>
                        <Col md="11" className="pt-3 ml-auto">
                          <h6 className="text-primary form-header ">
                            Item tag Information
                      </h6>
                        </Col>
                      </Row>
                      {this.state.showMsg === false ? null : (
                        <div className="error-txt d-block justify-content-center text-center text-danger">
                          Please fill all mandatory fields correctly{" "}
                        </div>
                      )}
                      <Row>
                        <Col md="10" className="pt-2 mx-auto">
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore
                            magna aliqua. Ut enim ad minim veniam, quis nostrud
                            exercitation ullamco laboris nisi ut aliquip
                      </p>
                        </Col>
                      </Row>
                      <div className="margin-width">
                        <Row>
                          <Col md="10" className="mx-auto">
                            <div className=" pt-2 pb-3">
                              <Row className="student-field pt-2">
                                <Col md="3">
                                  <label htmlFor="tagCode">
                                    Tag Code <b style={style}>*</b>{" "}
                                  </label>
                                </Col>
                                <Col md="7">
                                  <div className="form-group">
                                    <input
                                      name="tagCode"
                                      type="text"
                                      id="tagCode"
                                      className="form-control"
                                      value={this.state.rowData.item_tag_code || ""}
                                      onChange={this.fieldHandler.bind(
                                        this,
                                        "tagCode"
                                      )}

                                    />
                                    <span className="info-icon" id="tagCode1">
                                      <FontAwesomeIcon icon={faQuestionCircle} />
                                    </span>
                                    <UncontrolledTooltip
                                      placement="right"
                                      target="tagCode1"
                                    >
                                      Enter tag code
                                </UncontrolledTooltip>
                                    <ErrorMessage
                                      name="tagCode"
                                      component="div"
                                      className="invalid-feedback"
                                    />
                                    <span className="text-danger">
                                      {this.state.errorMsg[0]}
                                    </span>
                                  </div>
                                </Col>
                              </Row>
                              <Row className="student-field">
                                <Col md="3">
                                  <label htmlFor="tagName">
                                    Tag Name<b style={style}>*</b>
                                  </label>
                                </Col>
                                <Col md="7">
                                  <div className="form-group">
                                    <input
                                      name="tagName"
                                      type="text"
                                      className="form-control"
                                      value={this.state.rowData.item_tag_name || ""}
                                      onChange={this.fieldHandler.bind(
                                        this,
                                        "tagName"
                                      )}

                                    />
                                    <span className="info-icon" id="barbariiId">
                                      <FontAwesomeIcon icon={faQuestionCircle} />
                                    </span>
                                    <UncontrolledTooltip
                                      placement="right"
                                      target="barbariiId"
                                    >
                                      Enter Tag Name
                                </UncontrolledTooltip>
                                    <ErrorMessage
                                      name="tagName"
                                      component="div"
                                      className="invalid-feedback"
                                    />
                                    <span className="text-danger">
                                      {this.state.errorMsg[1]}
                                    </span>
                                  </div>
                                </Col>
                              </Row>
                              <Row className="student-field">
                                <Col md="3">
                                  <label htmlFor="category">
                                    Category<b style={style}>*</b>
                                  </label>
                                </Col>
                                <Col md="7">
                                  <div className="form-group">
                                    <Select
                                      value={selectedOption}
                                      onChange={this.handleChange}
                                      options={options}
                                    />

                                    <span className="info-icon" id="category">
                                      <FontAwesomeIcon icon={faQuestionCircle} />
                                    </span>
                                    <UncontrolledTooltip
                                      placement="right"
                                      target="category"
                                    >
                                      Enter category
                                </UncontrolledTooltip>
                                    <ErrorMessage
                                      name="category"
                                      component="div"
                                      className="invalid-feedback"
                                    />
                                  </div>
                                </Col>
                              </Row>

                              <Row className="pt-2 pb-4">
                                <Col md="3">
                                  <label htmlFor="lastname">Status</label>
                                </Col>
                                <div className="d-flex justify-content-between">
                                  <Col md="2">
                                    <div className="custom-radio custom-control">
                                      <input
                                        name="status"
                                        type="radio"
                                        id="radioYes"
                                        className="custom-control-input"
                                        value="y"
                                        checked={
                                          this.state.rowData.item_tag_status === "y"
                                            ? true
                                            : false
                                        }
                                        onChange={this.fieldHandler.bind(
                                          this,
                                          "status"
                                        )}
                                      />
                                      <label
                                        className="custom-control-label"
                                        for="radioYes"
                                      >
                                        Active
                                  </label>
                                    </div>
                                  </Col>
                                  <Col md="2">
                                    <div className="custom-radio custom-control ">
                                      <input
                                        name="status"
                                        type="radio"
                                        id="radioNo"
                                        className="custom-control-input"
                                        value="n"
                                        checked={
                                          this.state.rowData.item_tag_status === "n"
                                            ? true
                                            : false
                                        }
                                        onChange={this.fieldHandler.bind(
                                          this,
                                          "status"
                                        )}
                                      />
                                      <label
                                        className="custom-control-label   "
                                        for="radioNo"
                                      >
                                        InActive
                                  </label>
                                    </div>
                                  </Col>
                                  <Col md="2">
                                    <div className="custom-radio custom-control ">
                                      <input
                                        name="status"
                                        type="radio"
                                        value="d"
                                        id="radioDeleted"
                                        className="custom-control-input"
                                        checked={
                                          this.state.rowData.item_tag_status === "d"
                                            ? true
                                            : false
                                        }
                                        onChange={this.fieldHandler.bind(
                                          this,
                                          "status"
                                        )}
                                      />
                                      <label
                                        className="custom-control-label"
                                        for="radioDeleted"
                                      >
                                        Deleted
                                  </label>
                                    </div>
                                  </Col>
                                </div>
                              </Row>
                            </div>
                          </Col>
                        </Row>
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
                              >
                                Save
                          </button>
                              <Link to="/admin/item-tag-list">
                                <button
                                  type="submit"
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
                    </div>
                  </Form>
                </div>
              </ReactCSSTransitionGroup>
            }
          </div>
        </Fragment>
      </div>
    );
  }
}

export default Add;
