import React, { Component } from "react";
import { Link } from "react-router-dom";
import Formsy from "formsy-react";
import moment from "moment";
import { CardBody, Col, Row } from "reactstrap";
import {
  faChevronLeft, faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setPassword } from "../../actions/actionMain";
import SHABase64 from "../../components/admin/shaBase";
import MyInput from "../../components/proofReader/input/MyInput";
import { regx } from "../../utils/admin/Regx";
import { errors } from "../../utils/admin/ErrorMessages";
import { tooltipMsg } from "../../components/admin/tooltipMsg";
import { dataList } from "../../components/admin/dataList";
import Background from "../../assets/utils/images/MultistateEdgePortal_Image.jpg";
const initialRow = {
  rpassword: "",
  npassword: ""
};

class RecoverPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rowData: initialRow,
      userID: "",
      linkExpired: false
    };
  }

  componentDidMount() {

    let userID = this.props.location.pathname.split('/')[2] //Get the userID from the URL
    this.setState({ userID: userID });

    let token = this.props.location.search.split('=')[1]

    if(token){
      var decodedToken = window.atob(token);  

      let getDateTime = decodedToken.split('and')[0]
      let expiryPeriod = parseInt(decodedToken.split('and')[1])
  
      let getDate = getDateTime.split(' ')[0]
      let getTime = getDateTime.split(' ')[1]
  
      let year = getDate.split('-')[2]
      let month = getDate.split('-')[0]
      let date = getDate.split('-')[1]
  
      let formattedDateTime = year+'/'+month+'/'+date +' '+ getTime
      
        let expiryTarget = new Date(formattedDateTime).setHours(expiryPeriod)
  
        let currentTime = new Date().valueOf()

        if(!isNaN(expiryTarget)){
    
          if(currentTime >= expiryTarget){
            this.setState({linkExpired: true})
          }
        }
        else{
          this.props.history.push('/')
        }
    }
    else{
      this.props.history.push('/')
    }
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
      userId: this.state.userID
    });
    this.props.setPassword(body); //API call
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
        {this.state.linkExpired ?
        <div className="msedge-set-password-link-expired-segment">
          <FontAwesomeIcon icon={faExclamationTriangle} className="msedge-set-password-link-expired-icon"/>
          <h1 className="my-2">Expired</h1>
          <p>Your link has been expired. Please contact multistate edge administrator.</p>
          </div>
          :
          <div className="login-cntr" style={{backgroundImage:`url(${Background})`}}>
          <section>
            <div className="set-password-compo">
              <Formsy
                onValidSubmit={this.submit}
                onValid={this.enableButton}
                onInvalid={this.disableButton}
              >
                <Col md="12 recoverpassword-form-main set-password-fields">
                  <CardBody>
                    <Row className="welcome-segment">
                      <Col md="12" className="welcome-align">
                        <h1 className="welcome-text mb-0">Set password</h1>
                      </Col>
  
                      <Col md="12" className="signin-container">
                        <h2 className="signin-text">
                          Please set your password here...
                        </h2>
                      </Col>
                    </Row>
  
                    <Row className="exam-space pt-4">
                      <Col xs="12" md="6" className="flex-unset">
                        <div className="form-group fieldname-font-size">
                          <label htmlFor="newpassword" className="mb-2">
                            New password
                            <b className="ml-1 text-danger">*</b>
                          </label>
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
                        </div>
                      </Col>
                      <Col xs="12" md="6" className="flex-unset">
                        <div className="form-group fieldname-font-size">
                          <label htmlFor="rnewpassword">
                            Confirm password
                            <b className="ml-1 text-danger">*</b>
                          </label>
                          <MyInput
                            name="rpassword"
                            type="password"
                            value={this.state.rowData.rnewpassword}
                            validations="equalsField:npassword"
                            validationError={errors.confirmPassword}
                            className="form-control"
                            required
                            fieldName={dataList.confirm_pwd}
                            tooltip={tooltipMsg.settings_user_password}
                            isMandatory={true}
                          />
                        </div>
                      </Col>
                    </Row>
  
                    <Row>
                      <Col md="12" className="btn-segment">
                        <Row>
                          <Col md="7" className="no-account pt-2 mb-2">
                            <FontAwesomeIcon
                              icon={faChevronLeft}
                              color="#006EBD"
                              className="mr-2"
                            />
                            <Link
                              to={`/`}
                              style={{
                                color: "#006EBD",
                                cursor: "pointer"
                              }}
                              className="msedge-login-fs"
                            >
                              Back to login
                            </Link>
                          </Col>
                          <Col md="5" className="">
                            <Row>
                              <Col
                                md="12"
                                className="text-right msedge-questions-start msedge-login-btn msedge-submit-btn"
                              >
                                {!this.props.loading ? (
                                  <button
                                    type="submit"
                                    onClick={this.onSubmit}
                                    disabled={!this.state.canSubmit}
                                    style={{ cursor: this.state.cursorDisable }}
                                    className="btn btn-outline-primary recoverpassword-btn login-btn msedge-login-fs"
                                  >
                                    <li>
                                      <i
                                        className="pe-7s-angle-right-circle"
                                        aria-hidden="true"
                                      ></i>
                                    </li>
                                    <li>Submit</li>
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
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </CardBody>
                </Col>
              </Formsy>
            </div>
          </section>
  
          <section className="right-container">
          </section>
        </div>
 
      }
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
)(RecoverPassword);
