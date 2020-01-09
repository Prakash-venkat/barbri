import React, { Component } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { CardBody, Col, Row } from "reactstrap";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { login } from "../../actions/actionMain";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import SHABase64 from "../../components/admin/shaBase";
import CookieConsent from "react-cookie-consent";
import Background from "../../assets/utils/images/MultistateEdgePortal_Image.jpg";
import { errors as errorSet} from '../../utils/admin/ErrorMessages';
import { language } from '../../utils/locale/locale'
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: true,
      invalidEmail: "",
      type: "password"
    }
  }

  handleInputChange = () => {
    this.setState({
      checked: !this.state.checked
    });
  };

  showHide = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (this.state.type === "input") {
      this.setState({
        type: "password"
      });
    } else if (this.state.type === "password") {
      this.setState({
        type: "input"
      });
    }
  }
  render() {
    return (
      <div className="login-cntr" style={{backgroundImage:`url(${Background})`}}>
        <section>
          <div className="login-compo">
            <Formik
              initialValues={{
                email: "",
                password: ""
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string()
                  .email(errorSet.email_invalid)
                  .required(errorSet.email_required),
                password: Yup.string().required(errorSet.password_required)
              })}
              onSubmit={fields => {
                const encodedPassword = SHABase64.btoa(fields.password);
                const user = JSON.stringify({
                  username: fields.email,
                  password: encodedPassword
                });
                this.props.login(user, this.state.checked); //API call
              }}
              render={({ errors, touched }) => (
                <Col md="12 login-form-main">
                  <CardBody>
                    <Row className="welcome-segment">
                      <Col md="12" className="welcome-align">
                        <h1 className="welcome-text mb-0">Welcome!</h1>
                      </Col>
                      <Col md="12" className="signin-container">
                        <h2 className="signin-text ">
                         {language.signinAccount}
                        </h2>
                      </Col>
                      <Col md="12">
                        {this.props.invalidCredentials ? (
                          <h6 className="invalid-email">
                            <FontAwesomeIcon
                              icon={faExclamation}
                              color="#ff000078"
                            />
                            &nbsp;&nbsp;{errorSet.wrong_credentials}
                          </h6>
                        ) : (
                            ""
                          )}
                      </Col>
                    </Row>
                    <Form className="pt-2 msedge-login-fs">
                      <Row>
                        <Col className="flex-unset">
                          <div className="form-group">
                            <label
                              className="fieldname-font-size"
                              htmlFor="email"
                            >
                              Email
                            </label>
                            <span className="text-danger">*</span>
                            <Field
                              name="email"
                              id="email"
                              type="text"
                              placeholder="Enter your email"
                              autoComplete ="off"
                              className={
                                "form-control" +
                                (errors.email && touched.email
                                  ? " is-invalid"
                                  : "")
                              }
                            />
                            <ErrorMessage
                              name="email"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                        </Col>
                        <Col className="flex-unset">
                          <div className="form-group">
                            <label
                              className="fieldname-font-size"
                              htmlFor="password"
                            >
                              Password
                            </label>
                            <span className="text-danger">*</span>
                            <Field
                              name="password"
                              id="password"
                              type={this.state.type}
                              placeholder="Enter your password"
                              autoComplete="off"
                              className={
                                "form-control" +
                                (errors.password && touched.password
                                  ? " is-invalid"
                                  : "")
                              }
                            />
                            <span
                              className="btn pe-7s-look msedge-login-password-eye"
                              onClick={this.showHide}
                            ></span>
                            <ErrorMessage
                              name="password"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                        </Col>
                      </Row>
                      <Row className="msedge-sm-mb-5">
                        <Col md="12 logged-in">
                          <label className="fieldname-font-size">
                            <input
                              name="isGoing"
                              type="checkbox"
                              checked={this.state.checked}
                              onChange={this.handleInputChange}
                              tabIndex = "0"
                            />
                            {language.keep_logged}
                          </label>
                        </Col>
                        <Col md="12" className="btn-segment">
                          <Row>
                            <Col md="7" className="pt-4 accountyet">
                            </Col>
                            <Col md="5" className="pt-3">
                              <Row>
                                <Col
                                  md="12"
                                  className="text-right mobile-view msedge-questions-start msedge-login-btn pl-0"
                                >
                                  {!this.props.isLoading ? (
                                    <button
                                      type="submit"
                                      className="btn btn-primary login-btn msedge-login-fs"
                                      id="load"
                                      data-loading-text="Processing Order"
                                      tabIndex = "0"
                                    >
                                      <li>
                                        <i
                                          className="pe-7s-key"
                                          aria-hidden="true"
                                        ></i>
                                      </li>
                                      <li>Login</li>
                                    </button>
                                  ) : (
                                      <span className="msedge-right-br">
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
                                          <li className="text-uppercase loading-btn">
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
                        <Col md="12" className="btn-segment">
                          <Row>
                            <Col md="7" className="pt-2 no-account">
                              <span
                                style={{
                                  color: "#006EBD",
                                  cursor: "pointer"
                                }}
                                className="pt-2 c-pointer text-primary"
                              >
                                <Link
                                  to={`/need-account`}
                                  style={{
                                    color: "#006EBD",
                                    cursor: "pointer"
                                  }}
                                  tabIndex="0"
                                >
                                  {language.need_account}
                                </Link>
                              </span>
                            </Col>
                            <Col md="5" className="pt-0">
                              <Row>
                                <Col
                                  md="12 pt-2 text-right"
                                  className="recover-link-text"
                                >
                                  <Link
                                    to={`/recover-password`}
                                    style={{
                                      color: "#006EBD",
                                      cursor: "pointer"
                                    }}
                                    tabIndex="0"
                                  >
                                    {language.recover_password}
                                  </Link>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Col>
              )}
            />
          </div>
        </section>
        <section className="right-container">
        </section>
        <CookieConsent
          location="bottom"
          buttonText="I understand !!"
          cookieName="myAwesomeCookieName2"
          style={{ background: "#2B373B" }}
          buttonStyle={{ color: "#fff", background: "#006ebd", fontSize: "13px" }}
          expires={150}
        >
          {language.cookie_content}
        </CookieConsent>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    isLoading: state.main.isLoading,
    invalidCredentials: state.main.invalidLogin
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      login
    },
    dispatch
  );
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
