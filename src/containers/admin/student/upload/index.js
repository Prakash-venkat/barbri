import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Form } from "reactstrap";
import Dropzone from "react-dropzone";
import Select from "react-select";
import swal from "sweetalert";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {
  uploadStudent,
  currentState,
  redirectPath
} from "../../../../actions/actionMain";
import { instance } from "../../../../actions/constants";
import { getSession } from "../../../routes/routePaths";
import { customPageTitle } from '../../../../components/commonComponents/customPageTitle';
import {language} from '../../../../utils/locale/locale';
import { errors } from '../../../../utils/admin/ErrorMessages';


export class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adminSession: getSession("AdminSession"),
      file: {},
      data: [],
      files: [],
      options: [],
      selectedOption: null,
      fileforUpload: null,
      canSubmit: true,
      cursorDisable: '',
      isLawSchoolSelected: false,
      selectedFile: { name: " Select files to upload.", size: "" },
      isempty: false,
    };
  }
  handleChange = selectedOption => {
    this.setState({ selectedOption, isLawSchoolSelected: true }, () => { this.enableButton() });
  };
  componentDidMount() {
    customPageTitle('Upload Students')
    this.props.currentState("admin/students/upload/");
    instance.get(`admin/schools`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,        
      }
    })
      .then(res => {
        const dataContains = res.data.data == null || res.data.data == "" ? [] : res.data.data;
        const optionData = dataContains.map((data, index) => {
          return { value: data.lawSchoolId, label: data.lawSchoolName };
        });

        this.setState({
          options: optionData
        });
      })
      .catch(error => console.log(error));
  }

  filehandleChange = e => {
    try {
      const files = e.target.files;
      const extension = files[0].name.split(".");
      if (
        extension[extension.length - 1] === "xlsx" ||
        extension[extension.length - 1] === "csv"
      ) {
        if (files && files[0]) this.setState({ file: files[0] });
        this.setState({
          selectedFile: {
            name: e.target.files[0].name,
            size: e.target.files[0].size + "bytes"
          },
          fileforUpload: e.target.files[0]
        });
      } else {
        swal(language.invalidFile, language.fileFormat);
      }
    } catch (e) {
      console.log(e);
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.fileforUpload === null) {
      this.setState({
        isempty: true
      });
    } else {
      this.props.redirectPath("student");
      var bodyFormData = new FormData();
      bodyFormData.set("lawSchoolId", this.state.selectedOption.value);
      bodyFormData.append("studentFile", this.state.fileforUpload);
      this.props.uploadStudent(bodyFormData);
    }
  };

  onDrop(files) {
    this.setState({ files });
  }

  onCancel() {
    this.setState({
      files: []
    });
  }

  disableButton = () => {
    this.setState({ canSubmit: false, cursorDisable: "not-allowed" });
  }
  enableButton = () => {
    if (this.state.isLawSchoolSelected === true) {
      this.setState({ canSubmit: false, cursorDisable: "" });
    }
  }

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
          <div className="msedge-upload-student">
            <div className="container-fluid mb-2">
              <Row>
                <Col xs="12" sm="12" md="5" lg="7" xl="7">
                  <h1 className="msedge-overview-text mb-3" tabIndex="-1">
                           {language.upload_students}{" "}
                  </h1>
                </Col>
              </Row>
            </div>

            <Row>
              <div className="container-fluid bg-grey msedge-admin-add">
                <div className="col-md-12 bg-white pl-3 pr-3 rounded">
                  <Form
                    onSubmit={this.handleSubmit}
                    id="uploadForm"
                    encType="multipart/form-data"
                  >
                    <div className="msedge-student-upload-section">
                      <div className="px-3">
                        <Row className="pb-3">
                          <Col md="4">
                            <h6 className="text-primary pt-2">
                                 {language.select_law_school}{" "}
                            </h6>
                          </Col>
                          <Col md="8">
                            <div className="form-group">
                              <Select
                                value={this.state.selectedOption}
                                onChange={this.handleChange}
                                options={this.state.options}
                              />
                            </div>
                          </Col>
                        </Row>

                        <Row className="">
                          <Col md="4">
                            <h6 className="text-primary pt-2">
                            {language.select_fileto_upload}{" "}
                            </h6>
                          </Col>
                          <Col md="8">
                            <div className="msedge-dropzone-wrapper dropzone_file">
                              <Dropzone
                                onDrop={this.onDrop.bind(this)}
                                onFileDialogCancel={this.onCancel.bind(this)}
                              >
                                {({ getRootProps, getInputProps }) => (
                                  <div {...getRootProps()}>
                                    <input
                                      {...getInputProps()}
                                      multiple
                                      onChange={this.filehandleChange}
                                      id="files"
                                      name="files"
                                    />
                                    <div className="msedge-dropzone-content">
                                      <p className="m-0">
                                        {this.state.selectedFile.name.length >=
                                          26
                                          ? this.state.selectedFile.name.substring(
                                            0,
                                            7
                                          ) + "..."
                                          : this.state.selectedFile.name}{" "}
                                        {"  "}
                                        {this.state.selectedFile.size}
                                      </p>
                                    </div>
                                  </div>
                                )}
                              </Dropzone>
                            </div>
                            {this.state.isempty === true ? (
                              <span className="error-color">
                                {errors.csv_xlsv_file_submit}
                              </span>
                            ) : (
                                ""
                              )}
                          </Col>
                        </Row>
                      </div>
                    </div>
                    <Row className="msedge-student-upload-section pt-0">
                      <Col className="col-md-12 col-xs-6 col-sm-6 mt-3 pt-3 text-right">
                        <div className="form-group">
                          {!this.props.loading ? (
                            <span className="msedge-questions-start msedge-right-br">
                              <button
                                type="submit"
                                className="btn btn-outline-primary mr-2"
                                disabled={this.state.canSubmit}
                                style={this.state.style}
                              >
                                <li>
                                  <i
                                    className="pe-7s-download"
                                    aria-hidden="true"
                                  ></i>
                                </li>
                          <li>{language.upload}</li>
                              </button>
                            </span>
                          ) : (
                              <span className="msedge-questions-start msedge-right-br mr-2">
                                <button
                                  className="btn btn-primary"
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
                                    Loading...
                              </li>
                                </button>
                              </span>
                            )}
                          <span className="msedge-questions-start msedge-right-br">
                            <Link to="/admin/add_student">
                              <button className="btn btn-outline-primary">
                                <li>
                                  <i className="pe-7s-back" aria-hidden="true"></i>
                                </li>
                          <li>{language.back}</li>
                              </button>
                            </Link>
                          </span>
                        </div>
                      </Col>
                    </Row>
                  </Form>
                </div>
              </div>
            </Row>
          </div>
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.main.isDataAdding
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      currentState,
      uploadStudent,
      redirectPath
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Upload);
