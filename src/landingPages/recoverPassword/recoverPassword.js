import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { CardBody, Col, Row } from "reactstrap";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { recoverPassword } from "../../actions/actionMain";
import {errors} from "../../utils/admin/ErrorMessages"
import Background from "../../assets/utils/images/MultistateEdgePortal_Image.jpg";
class RecoverPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invalidEmail: ""
    };
  }

  render() {
    return (
      <div className="login-cntr" style={{backgroundImage:`url(${Background})`}}>
        <section>
          <div className="login-compo">
            <Formik
              initialValues={{
                email: ""
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string()
                  .email(errors.email_invalid)
                  .required(errors.email_required)
              })}

              onSubmit={fields => {
                let data = JSON.stringify({
                  userPrimaryEmail: fields.email
                });
                this.props.recoverPassword(data); //API call
              }}
              render={({ errors, touched }) => (
                <Col md="12 recoverpassword-form-main">
                  <CardBody>
                    <Row className="welcome-segment">
                      <Col md="12" className="welcome-align">
                        <h1 className="welcome-text mb-0">Recover password</h1>
                      </Col>
                      <Col md="12" className="signin-container">
                        <h6 className="signin-text">
                          Enter your email below to receive your password reset
                          instructions
                        </h6>
                      </Col>
                      <Col md="12">{this.state.invalidEmail}</Col>
                    </Row>

                    <Form className="pt-3 msedge-login-fs">
                      <Row>
                        <Col>
                          <div className="form-group">
                            <label
                              className="fieldname-font-size"
                              htmlFor="email"
                            >
                              Email
                            </label>
                            <Field
                              name="email"
                              type="text"
                              placeholder="Email here..."
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
                      </Row>

                      <Row>
                        <Col md="12" className="btn-segment">
                          <Row>
                            <Col md="7" className="pt-4 no-account">
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
                              >
                                Back to login
                              </Link>
                            </Col>
                            <Col md="5" className="pt-3">
                              <Row>
                                <Col
                                  md="12"
                                  className="text-right msedge-questions-start msedge-login-btn msedge-submit-btn"
                                >
                                  {!this.props.isLoading ? (
                                    <button
                                      onClick={this.onSubmit}
                                      type="submit"
                                      className="btn btn-outline-primary login-btn recoverpassword-btn msedge-login-fs"
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
      recoverPassword
    },
    dispatch
  );
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecoverPassword);

