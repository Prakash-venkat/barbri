import React, { Component } from "react";
import { Card, Col, Row } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import Formsy from "formsy-react";
import { bindActionCreators } from "redux";
import { setPassword } from "../../actions/actionMain";
import SHABase64 from "../admin/shaBase";
import MyInput from "../../components/admin/inputs/MyInput";
import { regx } from "../../utils/admin/Regx";
import { errors } from "../../utils/admin/ErrorMessages";
import { dataList } from "../admin/dataList";
import { settingsInitialRow } from "../admin/initialRows";
import { tooltipMsg } from "../admin/tooltipMsg";

class changepassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rowData: settingsInitialRow,
      canSubmit: false,
      error: null,
      cursorDisable: "",
      userid: "",
      settingsData: [],
      fieldsErrorMsg: false
    };
    this.disableButton = this.disableButton.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.submit = this.submit.bind(this);
  }

  disableButton = () => {
    this.setState({ canSubmit: false, cursorDisable: "not-allowed" });
  };

  enableButton = () => {
    this.setState({ canSubmit: true, cursorDisable: "" });
  };

  submit = model => {
    const encodePassword = SHABase64.btoa(model.rpassword);
    const body = JSON.stringify({
      password: encodePassword,
      userId: this.props.passwordUserId
    });
    this.props.setPassword(body, this.props.moduleName);
    var value = {
      npassword: "",
      rpassword: ""
    };
    this.setState({
      rowData: value
    });
  };

  render() {
    return (
      <div>
        <div className="msedge-general-settings">
          <Formsy
            onValidSubmit={this.submit}
            onValid={this.enableButton}
            onInvalid={this.disableButton}
          >
            <Card className="p-3">
              <Row>
                <div className="msedge-error-header">
                  <Row className="mt-2 justify-content-center">
                    <Col md="12" lg="12" xl="12">
                      <div className="msedge-validation-error">
                        <div className="password-border msedge-border-changepassword msedge-change-password-border ada-font-size">
                          <span className="pr-4 msedge-info-icon msedge-error-info-icon">
                            <FontAwesomeIcon icon={faInfoCircle} />
                          </span>
                          Password must contain one uppercase, one lowercase,
                          one number, and one special character and minimum
                          length should be 8 to 15 characters{" "}
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
                <Col xs="12" sm="12" md="12" lg="12" xl="12" className="pb-1">
                  <h5 className="mt-2 msedge-settings-info ada-font-size msedge-setting-time-information">
                    {dataList.setting_change_password}
                  </h5>
                </Col>

                <Col md={{ size: 8, offset: 2 }} className="mt-3">
                  <MyInput
                    name="npassword"
                    type="password"
                    value={this.state.rowData.userPassword}
                    validations={{
                      matchRegexp: regx.password
                    }}
                    validationError={errors.password}
                    className="form-control"
                    required
                    fieldName={dataList.enter_new_pwd}
                    tooltip={tooltipMsg.settings_user_password}
                    isMandatory={true}
                  />
                  <MyInput
                    name="rpassword"
                    type="password"
                    value={this.state.rowData.rnewpassword}
                    validations="equalsField:npassword"
                    validationError={
                      errors.name,
                      errors.confirmPassword
                    }
                    className="form-control"
                    required
                    fieldName={dataList.confirm_pwd}
                    tooltip={tooltipMsg.settings_user_password}
                    isMandatory={true}
                  />
                </Col>
              </Row>
              <div className="pt-0">
                <div className="pull-right">
                  <div className="msedge-admin-settings-button msedge-questions-start msedge-right-br pb-0">
                    {!this.props.loading ? (
                      <button
                        type="submit"
                        className="btn btn-outline-primary mr-2"
                        disabled={!this.state.canSubmit}
                        style={{ cursor: this.state.cursorDisable }}
                      >
                        <li>
                          <i className="pe-7s-download" aria-hidden="true"></i>
                        </li>
                        <li className="text-uppercase">{dataList.save}</li>
                      </button>
                    ) : (
                        <span className="msedge-questions-start msedge-right-br">
                          <button
                            className="btn btn-primary"
                            type="button"
                            disabled
                          >
                            <li>
                              <span
                                className="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                              ></span>
                            </li>
                            <li className="text-uppercase">
                              Loading...
                          </li>
                          </button>
                        </span>
                      )}
                  </div>
                </div>
              </div>
            </Card>
          </Formsy>
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
      setPassword
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(changepassword);
