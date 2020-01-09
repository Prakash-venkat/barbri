import React from "react";
import { Col, Row } from "reactstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Formsy from "formsy-react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import MyInput from "../../../../../components/admin/inputs/MyInput";
import {
  currentState,
  postData,
  updateData,
  redirectPath
} from "../../../../../actions/actionMain";
import { regx } from "../../../../../utils/admin/Regx";
import Error from "../../../../../components/admin/error";
import { errors } from "../../../../../utils/admin/ErrorMessages";
import { tooltipMsg } from '../../../../../components/admin/tooltipMsg';
import {
  ItemTagInitialRow,
  categories
} from "../../../../../components/admin/initialRows";
import AppButtonTop from "../../../../../components/commonComponents/appButtonTop";
import AppButtonBottom from "../../../../../components/commonComponents/appButtonBottom";
import { getSession } from "../../../../routes/routePaths"
import { customPageTitle } from '../../../../../components/commonComponents/customPageTitle'
import {language} from '../../../../../utils/locale/locale'


class AddItemTag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      adminSession: getSession("AdminSession"),
      canSubmit: false,
      rowData: ItemTagInitialRow,
      addORedit: "add",
      editId: "",
      cursorDisable: "",
      profileStatus: "n",
      value: [],
    };
  }
  
  componentDidMount() {
    customPageTitle('Add Item Tag')
    let getSessionData = this.state.adminSession
    let userRole = getSessionData.user_role;
    this.setState({ userRole: userRole });
    this.props.currentState("admin/itemtag");

    if (this.props.location.query) {
      let categoryOption = this.props.location.query.original.itemTagCategory;
      categories.forEach(function (element) {
        element.value === categoryOption ? (categoryOption = element) : null;
      });

      this.setState({
        rowData: this.props.location.query.original || null,
        addORedit: "edit",
        editId: this.props.location.query.original.itemTagId,
        profileStatus: this.props.location.query.original.itemTagStatus,
      });
    }
    if (this.props.location.query) {
      this.setState({ rowData: this.props.location.query.original || null });
    }
  }

  disableButton = () => {
    this.setState({ canSubmit: false, cursorDisable: "not-allowed" });
  }

  enableButton = () => {
    this.setState({ canSubmit: true, cursorDisable: "" });
  }

  statusHandler = e => {
    this.setState({ profileStatus: e.target.value });
  };

  submit = model => {
    this.props.redirectPath("itemtag");

    let addItemtagDetail = JSON.stringify({
      itemTagItemCode: model.tagCode,
      itemTagName: model.tagName,
      itemTagStatus: this.state.profileStatus,
      itemTagCreatedBy: this.state.tagValue
    });

    try {
      if (this.state.addORedit === "add") {
        this.props.postData(addItemtagDetail);
      } else {
        this.props.updateData({
          data: addItemtagDetail,
          id: this.state.editId,
          path: "admin/itemtags"
        });
      }
    } catch (e) {
      console.log(e)
    }
  };

  render() {
    if (this.state.adminSession.user_role === "3") {
      this.props.history.push("/admin/not_allowed");
    }

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
          <Formsy
            onValidSubmit={this.submit}
            onValid={this.enableButton}
            onInvalid={this.disableButton}
          >
            <AppButtonTop
              disabled={!this.state.canSubmit}
              style={{ cursor: this.state.cursorDisable }}
              isLoading={this.props.isLoading}
              addORedit={this.state.addORedit}
              addTitle={"Add item tag"}
              editTitle={"Edit item tag"}
              redirectToList={"/admin/list_itemtag"}
            />

            <Row>
              <div className="container-fluid bg-grey msedge-admin-add">
                <div className="col-md-12 bg-white msedge-student-content mseddge-admin-add-item">
                  <div className="col-md-12 col-lg-12 col-xl-12 col-sm-12">
                    <Error />
                  </div>
                  <Col
                    md="12"
                    lg="12"
                    xl="12"
                    sm="12"
                    xs="12"
                    className="msedge-admin-form-title"
                  >
                    <Row>
                      <Col md="12" className="mt-3">
                        <h5 className="text-primary mb-0">
                          {language.item_tag_information}
                        </h5>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12" className="pt-2">
                        <p>{language.tag_info}</p>
                      </Col>
                    </Row>
                  </Col>
                  <div className="">
                    <Row>
                      <Col md={{ size: 8, offset: 2 }}>
                        <div className=" pt-2 pb-3">
                          <MyInput
                            name="tagCode"
                            type="text"
                            fieldName={"Tag code"}
                            tooltip={tooltipMsg.law_school_address}
                            className="form-control"
                            value={this.state.rowData.itemTagItemCode}
                            required
                            isMandatory={true}
                            validations={{
                              matchRegexp: regx.code,
                              maxLength: "30"

                            }}
                            validationErrors={{
                              matchRegexp: errors.code,
                              maxLength: errors.tagCodeMaxLength
                            }}
                          />

                          <MyInput
                            name="tagName"
                            type="text"
                            value={this.state.rowData.itemTagName}
                            validations={{
                              matchRegexp: regx.code,
                              maxLength: "30"
                            }}
                            validationErrors={{
                              matchRegexp: errors.code,
                              maxLength: errors.tagCodeMaxLength
                            }}
                            className="form-control"
                            required
                            fieldName={language.tag_name}
                            tooltip={tooltipMsg.law_school_address}
                            isMandatory={true}
                          />
                          <Row className="pt-1">
                            <Col md={{ size: 12 }}>
                              <Row className="pt-2 pb-4">
                                <Col md="4">
                                  <label
                                    className="fieldname-font-size"
                                    htmlFor="lastname"
                                  >
                                    {language.status}
                                  </label>
                                </Col>
                                <Col md="2">
                                  <div className="custom-radio custom-control fieldname-font-size">
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
                                      className="custom-control-label "
                                      htmlFor="radioYes"
                                    >
                                      {language.active}
                                    </label>
                                  </div>
                                </Col>
                                <Col md="2">
                                  <div className="custom-radio custom-control fieldname-font-size">
                                    <input
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
                                      className="custom-control-label"
                                      htmlFor="radioNo"
                                    >
                                      {language.in_active}
                                    </label>
                                  </div>
                                </Col>
                                {this.state.addORedit === "add" ? (
                                  ""
                                ) : (
                                    <Col md="2">
                                      <div className="custom-radio custom-control fieldname-font-size">
                                        <input
                                          name="profile"
                                          type="radio"
                                          id="radioDeleted"
                                          className="custom-control-input"
                                          value="d"
                                          onChange={this.statusHandler}
                                          checked={
                                            this.state.profileStatus === "d"
                                              ? true
                                              : false
                                          }
                                          disabled={this.state.userRole === "1" ? false : true}
                                        />
                                        <label
                                          className="custom-control-label"
                                          htmlFor="radioDeleted"
                                        >
                                          {language.deleted}
                                        </label>
                                      </div>
                                    </Col>
                                  )}
                              </Row>
                            </Col>
                          </Row>
                        </div>
                      </Col>
                    </Row>
                  </div>

                  <AppButtonBottom
                    disabled={!this.state.canSubmit}
                    style={{ cursor: this.state.cursorDisable }}
                    isLoading={this.props.isLoading}
                    redirectToList={"/admin/list_itemtag"}
                  />
                </div>
              </div>
            </Row>
          </Formsy>
        </ReactCSSTransitionGroup>
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
)(AddItemTag);
