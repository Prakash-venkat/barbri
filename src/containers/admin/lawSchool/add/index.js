import React, { Component } from "react";
import { Row, Col, UncontrolledTooltip } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import swal from "sweetalert";
import moment from "moment";
import Dropzone from 'react-dropzone';
import Formsy from 'formsy-react';
import MyInput from '../../../../components/admin/inputs/MyInput';
import NumberInput from '../../../../components/admin/inputs/NumberInput';
import TextAreaInput from '../../../../components/admin/inputs/TextAreaInput'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
  uploadData,
  currentState,
  updateData,
  redirectPath
} from "../../../../actions/actionMain";
import { regx } from '../../../../utils/admin/Regx'
import { errors } from '../../../../utils/admin/ErrorMessages';
import Error from '../../../../components/admin/error';
import { tooltipMsg } from '../../../../components/admin/tooltipMsg';
import CreatableSelect from 'react-select';
import { countries } from '../../../../utils/countries';
import AppButtonTop from '../../../../components/commonComponents/appButtonTop';
import AppButtonBottom from '../../../../components/commonComponents/appButtonTop';
import { getSession } from '../../../routes/routePaths';
import { customPageTitle } from '../../../../components/commonComponents/customPageTitle';
import {language} from '../../../../utils/locale/locale';

const components = {
  DropdownIndicator: null,
};

const createOption = (label) => ({
  label,
  value: label,
});

const initialRow = {
  lawSchoolCode: "",
  lawSchoolName: "",
  lawSchoolPhoneNumber: "",
  lawSchoolPrimaryEmail: "",
  lawSchoolWebsiteLink: "",
  lawschool_category: "",
  lawSchoolAddress: "",
  lawSchoolContactFirstName: "",
  lawSchoolContactPersonPhoneNumber: "",
  lawSchoolContactPersonEmail: "",
  lawSchoolUserName: "",
  lawSchoolProfileActive: 'y',
  profileStatus: 'y',
  

};

class AddLawSchool extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adminSession: getSession("AdminSession"),
      selectedCountryOption: "",
      selectedCategoryOption: "",
      isTransferChecked: true,
      rowData: initialRow,
      addORedit: "add",

      editId: "",
      lawSchoolProfileActive: 'y',
      file: [],
      data: [],
      files: [],
      selectedFile: { name: ' Select files to upload.', size: '' },
      fileforUpload: null,
      canSubmit: false,
      cursorDisable: '',
      inputValue: '',
      value: [],
      userRole: "",
      isCountry: false,
      isMultiEmail: false,
      isempty: false,
      inputValue: "",
      fileSize : 0,
      isFileAvail : false,
      dropDownFilled: false,
    };
  }

  componentDidMount() {

    customPageTitle('Add LawSchool')

    let getSessionData = this.state.adminSession
    this.setState({ userRole: getSessionData.user_role })
    this.props.currentState("lawschool")
   

    if (this.props.location.query) {
      var school = this.props.location.query.original.lawSchoolCountry;
      var selectedCountry = school === null || school === undefined ? "" : school;
      var countryArray = countries.filter(function (el) {
        return el.value.toLowerCase() === selectedCountry.toLowerCase()
      });
      let isCountryEmpty;
      if(countryArray.length === 0) {
         isCountryEmpty= false;
      }else {
        isCountryEmpty = Object.keys(countryArray[0]).length === 0 && countryArray[0].constructor === Object ? false : true
      }

      var item = (this.props.location.query.original.lawSchoolUserName === null ? "" : this.props.location.query.original.lawSchoolUserName).split(',')

      let lawSchoolUserName = item.map(a => { return { value: a, label: a } })

      this.setState(
        {
          rowData: this.props.location.query.original || null,
          addORedit: "edit",
          editId: this.props.location.query.original.lawSchoolId,
          selectedCountryOption: countryArray[0],
          lawSchoolProfileActive: this.props.location.query.original.lawSchoolProfileActive,
          isCountry: isCountryEmpty,
          value: lawSchoolUserName,
          isMultiEmail: lawSchoolUserName === "" ? false : true,
          isempty: true,
        }, () => { this.enableButton2(); }
      );
    }
  }

  disableButton = () => {
    this.setState({ canSubmit: false, cursorDisable: "not-allowed" });
  }

  enableButton = () => {
    this.setState({ canSubmit: true, cursorDisable: "" });
  }

  enableButton2 = () => {
    const { isCountry, isempty, value } = this.state;
    if (isCountry === true && isempty === true && typeof value !== 'undefined' && value.length > 0) {
      this.setState({ dropDownFilled: true, cursorDisable: "" });
    } else {
      this.setState({ dropDownFilled: false,  cursorDisable: "not-allowed" })
    }
  }

  handleCountryChange = selectedCountryOption => {
    this.setState({ selectedCountryOption, isCountry: true }, () => this.enableButton2());
  };


  statusHandler = (e) => {
    this.setState({ lawSchoolProfileActive: e.target.value })
  }

  userNamehandleChange = (value, actionMeta) => {
    this.setState({ value });
  };

  handleInputChange = (inputValue) => {
      let a;
      if(this.state.value.length === 0 && inputValue === ""){
        a = "username is required"
      }
      else{
        if(regx.email.test(inputValue) === false && inputValue != ""){
          a = "please enter valid email"
          this.disableButton()
        }
        if(inputValue== ''){
          this.enableButton()
        }
      }
    this.setState({ inputValue, multiemail: a });
  };

  requiredMultiValue = () => {
    let a = this.state.value.length === 0 ? "username is required" : ""
    this.setState({ multiemail: a });
  }

  handleKeyDown = (event) => {
    const { inputValue, value } = this.state;
    let a = regx.email.test(inputValue) === false ? 1 : 2

    if (!inputValue) return;
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        if (a === 2) {
          this.setState({
            inputValue: '',
            value: [...value, createOption(inputValue)],
            isMultiEmail: true,
          }, () => {
            this.requiredMultiValue()
            this.enableButton2()
            this.enableButton()
          });
          event.preventDefault();
        }
      default: return null
    }
  };

  filehandleChange = (e) => {
    try {
      const files = e.target.files;
      const extension = files[0].name.split('.')
      if (extension[extension.length - 1] === 'xlsx' || extension[extension.length - 1] === 'csv') {

        if (files && files[0]) this.setState({ file: files[0] });
        this.setState({ selectedFile: { name: e.target.files[0].name, size: e.target.files[0].size + 'bytes' }, fileforUpload: e.target.files[0], isempty: true, fileSize : e.target.files[0].size }, () => { this.enableButton2() })

      } else {
        this.setState({
          canSubmit : false
        })
        swal("Invalid File !", "Excel or CSV file only acceptable");
      }

    }
    catch (e) {
      console.log(e)
    }

  };

  pushAddDataToApi = (value) => {
    if (this.state.fileforUpload === null) {
      this.setState({
        isempty: true,
      });
    } else {
      this.setState({
        isempty: false
      });
    }
    this.props.currentState("admin/school")
    this.props.redirectPath("lawschool")
    let date = Date.now()
    let dateFormat = moment(date).format("MM-DD-YYYY");

    let list = this.state.value.map(a => { return a.value })
    var concatedUsername = list.join(',');

    let bodyFormData = new FormData();

    bodyFormData.set('lawSchoolName', value.lawSchoolName);
    bodyFormData.set('lawSchoolCode', value.lawSchoolCode);
    bodyFormData.set('lawSchoolPrimaryEmail', value.email);
    bodyFormData.set('lawSchoolPhoneNumber', value.lawSchoolPhoneNumber);
    bodyFormData.set('lawSchoolWebsiteLink', value.weblink);
    bodyFormData.set('lawSchoolCountry', this.state.selectedCountryOption.value);
    bodyFormData.set('lawSchoolAddress', value.address);
    bodyFormData.set('lawSchoolZipcode', value.zip_code);
    bodyFormData.set('lawSchoolContactLastName', value.lname);
    bodyFormData.set('lawSchoolContactFirstName', value.pname);
    bodyFormData.set('lawSchoolExpectedBarExamDate', dateFormat);
    bodyFormData.set('lawSchoolContactPersonPhoneNumber', value.personphone);
    bodyFormData.set('lawSchoolContactPersonEmail', value.personemail);
    bodyFormData.set('lawSchoolProfileActive', this.state.lawSchoolProfileActive);
    bodyFormData.set('lawSchoolUserName', concatedUsername);
    bodyFormData.append('studentFile', this.state.fileforUpload);

    if (value.email == value.personemail) {
      swal(language.emailRepeating, language.emailRepeatingMsg, "error");
    // } else if (this.state.isempty === false) {
    } else {
      this.props.uploadData(bodyFormData)
    }
  }

  pushEditDataApi = (value) => {
    this.props.redirectPath("lawschool")
    this.props.currentState("admin/schools")
    const list = this.state.value.map(a => { return a.value })
    var string = list.join(',');
    const data = this.props.location.query.original;

    let body = JSON.stringify({
      "lawSchoolName": value.lawSchoolName,
      "lawSchoolCode": value.lawSchoolCode,
      "lawSchoolAddress": value.address,
      "lawSchoolContactLastName": value.lname,
      "lawSchoolContactFirstName": value.pname,
      "lawSchoolPrimaryEmail": value.email,
      "lawSchoolCountry": this.state.selectedCountryOption.value,
      "lawSchoolZIP": value.zip_code,
      "lawSchoolPhoneNumber": value.lawSchoolPhoneNumber,
      "lawSchoolProfileActive": this.state.lawSchoolProfileActive,
      "lawSchoolWebsiteLink": value.weblink,
      "lawSchoolContactPersonPhoneNumber": value.personphone,
      "lawSchoolUserName": string,
      "lawSchoolContactPersonEmail": value.personemail,
      "userId": data.userId
    })
    this.props.updateData({
      data: body,
      id: this.state.editId,
      path: 'admin/schools'
    });
  }

  onSubmitForm = (model) => {
    try {
      if (this.state.addORedit === "add") {
        if (this.state.file.length != 0) {
          this.pushAddDataToApi(model)
        }
        else {
          this.setState({ isempty: true })
        }
      }
      else {
        this.pushEditDataApi(model)
      }
    }

    catch (e) {
      console.log(e);
    }
  };

  onDrop = (files) => {
    this.setState({ files });
  }

  onCancel = () => {
    this.setState({
      files: []
    });
  }

  render() {
    const { inputValue, value } = this.state;

    var userNameEmpty  = typeof value !== 'undefined' && value.length > 0 ? true : false

    if (this.state.userRole === "3") {
      this.props.history.push('/admin/not_allowed')
    }
    return (
      <div>
        <ReactCSSTransitionGroup
          component="div"
          transitionName="TabsAnimation"
          transitionAppear={true}
          transitionAppearTimeout={0}
          transitionEnter={false}
          transitionLeave={false}>

          <div className="msedge-law-school bg-white">
            <div>
              <div>
                <Formsy onValidSubmit={this.onSubmitForm} onValid={this.enableButton} onInvalid={this.disableButton}>

                  <AppButtonTop
                    disabled={this.state.canSubmit === false || this.state.dropDownFilled === false || userNameEmpty === false ? true : false}
                    style={{ cursor: this.state.cursorDisable }}
                    isLoading={this.props.isLoading}
                    addORedit={this.state.addORedit}
                    addTitle={language.add_lawschool}
                    editTitle={language.edit_lawschool}
                    redirectToList={"/admin/list_lawschool"}
                  />

                  <Row>
                    <div className="container-fluid bg-grey msedge-admin-add">
                      <div className="col-md-12 bg-white pl-3 pr-3 rounded">
                        <div className="border-bottom">
                          <Col md="12" className="pt-1">
                            <Error />
                          </Col>

                          <Col md="12" lg="12" xl="12" sm="12" xs="12" className="msedge-admin-form-title">
                            <Row>
                              <Col md="12" className="pt-3">
                                <h2 className="text-primary mb-0">{language.school_information}</h2>
                              </Col>
                            </Row>
                            <Row>
                              <Col className="pt-2">
                                <p>
                                  {language.enterSchoolInformation}
                                </p>
                              </Col>
                            </Row>
                          </Col>
                          <div>
                            <Row>
                              <Col md={{ size: 8, offset: 2 }} className="pb-3">
                                <MyInput
                                  name="lawSchoolCode"
                                  id="law_school_code"
                                  type="text"
                                  value={this.state.rowData.lawSchoolCode}
                                  validations={{
                                    matchRegexp: regx.code,
                                    maxLength: "10"

                                  }}
                                  validationErrors={{
                                    matchRegexp: errors.code,
                                    maxLength: errors.schoolCodeLength
                                  }}
                                  className="form-control"
                                  ref="lscode"
                                  required
                                  fieldName="School code"
                                  tooltip={tooltipMsg.law_school_address}
                                  isMandatory={true}
                                />
                                <MyInput
                                  name="lawSchoolName"
                                  id="lawschool_name"
                                  type="text"
                                  value={this.state.rowData.lawSchoolName}
                                  validations={{
                                    matchRegexp: regx.code,
                                    maxLength: "100"

                                  }}
                                  validationErrors={{
                                    matchRegexp: errors.code,
                                    maxLength: errors.schoolNameLength
                                  }}
                                  className="form-control"
                                  required
                                  fieldName="School name"
                                  tooltip={tooltipMsg.law_school_address}
                                  isMandatory={true}
                                />

                                <NumberInput
                                  name="lawSchoolPhoneNumber"
                                  id="lsphno"
                                  type="phone"
                                  value={this.state.rowData.lawSchoolPhoneNumber}
                                  validations={{
                                    matchRegexp: regx.phone,
                                  }}
                                  validationErrors={{
                                    matchRegexp: errors.number,
                                  }}
                                  className="form-control"
                                  fieldName="Phone number"
                                  tooltip={tooltipMsg.phone_no}
                                  isMandatory={true}
                                />
                                <MyInput
                                  name="email"
                                  id="law_school_primary_email"
                                  type="text"
                                  value={this.state.rowData.lawSchoolPrimaryEmail}
                                  validations={{
                                    matchRegexp: regx.email,
                                  }}
                                  validationErrors={{
                                    matchRegexp: errors.email,
                                  }}
                                  className="form-control"
                                  required
                                  fieldName="Email"
                                  tooltip={tooltipMsg.law_school_email}
                                  isMandatory={true}
                                  isDisable={
                                    this.props.location.query ? true : false
                                } 
                                />
                                <MyInput
                                  name="weblink"
                                  id="law_school_weblink"
                                  type="text"
                                  value={this.state.rowData.lawSchoolWebsiteLink}
                                  validations={{
                                    matchRegexp: regx.link
                                  }}
                                  validationError={errors.url}
                                  className="form-control"

                                  fieldName="Website link"
                                  tooltip={tooltipMsg.law_school_weblink}
                                />
                                <TextAreaInput

                                  type="textarea"
                                  rows="7"
                                  name="address"
                                  id="law_school_address"
                                  fieldName="Address"
                                  value={this.state.rowData.lawSchoolAddress}
                                  tooltip={tooltipMsg.law_school_address}
                                  className="form-control"

                                  isMandatory={true}
                                  validations={{
                                    minLength: "20"

                                  }}
                                  validationErrors={{
                                    minLength: errors.address
                                  }}
                                  required

                                />
                                <Row className="msedge-student-field pt-2">
                                  <Col md="4">
                                    <label htmlFor="lawschoolcity">{language.country}<b className="text-danger">*</b></label>
                                  </Col>
                                  <Col md="7">
                                    <div className="form-group">
                                      <Select
                                        aria-label="Country"
                                        value={this.state.selectedCountryOption}
                                        onChange={this.handleCountryChange}
                                        options={countries}
                                      />
                                      <span className="msedge-info-icon" id="lawschoolcountry"><FontAwesomeIcon icon={faQuestionCircle} /></span>
                                      <UncontrolledTooltip placement="right" target="lawschoolcountry">
                                        {language.selectSchoolCountry}
                              </UncontrolledTooltip>

                                    </div>
                                  </Col>
                                </Row>
                                <MyInput
                                  id="zip_code"
                                  name="zip_code"
                                  type="text"
                                  value={this.state.rowData.lawSchoolZIP}
                                  validations={{
                                    matchRegexp: regx.zipCode
                                  }}
                                  tooltip={tooltipMsg.zip_code}
                                  validationErrors={{
                                    matchRegexp: "please enter a valid zip code"
                                  }}
                                  className="form-control"
                                  required
                                  fieldName="Zip code"
                                  isMandatory={true}
                                />
                              </Col>
                            </Row>
                          </div>
                        </div>

                        <div className="border-bottom">
                          <div className="msedge-contact-person-details">
                            <Col md="12" lg="12" xl="12" sm="12" xs="12" className="msedge-admin-form-title pt-4">
                              <Row>
                                <Col md="12" className="pt-2">
                                <h2 className="text-primary mb-0">{language.contactPersonInformation}</h2>
                                </Col>
                              </Row>
                              <Row>
                                <Col md="12" className="pt-2">
                                  <p>
                                    {language.enterContactInformation}
                                </p>
                                </Col>
                              </Row>
                            </Col>
                            <Row>
                              <Col sm="12" md={{ size: 8, offset: 2 }} className="justify-content-center">
                                <MyInput
                                  name="pname"
                                  id="contact_person_name"
                                  type="text"
                                  value={this.state.rowData.lawSchoolContactFirstName}
                                  validations={{
                                    isWords: true,
                                  }}
                                  validationErrors={{
                                    isWords: errors.name,
                                  }}
                                  className="form-control"
                                  required
                                  fieldName="First name"
                                  tooltip={tooltipMsg.contact_name}
                                  isMandatory={true}
                                />
                                <MyInput
                                  name="lname"
                                  id="contact_name"
                                  type="text"
                                  value={this.state.rowData.lawSchoolContactLastName}
                                  validations={{
                                    isWords: true,
                                  }}
                                  validationErrors={{
                                    isWords: errors.name,
                                  }}
                                  className="form-control"
                                  required
                                  fieldName="Last name"
                                  tooltip={tooltipMsg.contact_name}
                                  isMandatory={true}
                                />
                                <NumberInput
                                  name="personphone"
                                  id="phone_no"
                                  type="text"
                                  value={this.state.rowData.lawSchoolContactPersonPhoneNumber}
                                  validations={{
                                    matchRegexp: regx.phone,
                                  }}
                                  validationErrors={{
                                    matchRegexp: errors.number,
                                  }}
                                  className="form-control"
                                  fieldName="Phone number"
                                  tooltip={tooltipMsg.phone_no}
                                  isMandatory={true}
                                />
                                <MyInput
                                  name="personemail"
                                  id="law_school_email"
                                  type="email"
                                  value={this.state.rowData.lawSchoolContactPersonEmail}
                                  validations={{
                                    matchRegexp: regx.email,
                                  }}
                                  validationErrors={{
                                    matchRegexp: errors.email,
                                  }}
                                  className="form-control"
                                  required
                                  fieldName="Email"
                                  tooltip={tooltipMsg.law_school_email}
                                  isMandatory={true}
                                />
                                <Row className="student-field pt-2">
                                  <Col md="4">
                                    <label htmlFor="lawschool-multi-username" className="fieldname-font-size">
                                      {language.user_name}
                                      <span className="text-danger"> *</span>
                                <p className="multi-emails">{language.enterTenEmails}</p>
                                    </label>
                                  </Col>
                                  <Col md="7"
                                  >

                                    <CreatableSelect
                                      aria-label="Usernames"
                                      components={components}
                                      inputValue={inputValue}
                                      isClearable
                                      isMulti
                                      menuIsOpen={false}
                                      onChange={this.userNamehandleChange}
                                      onInputChange={this.handleInputChange}
                                      onKeyDown={this.handleKeyDown}
                                      placeholder="For more value press enter"
                                      value={value}
                                    />
                                    <span className="error-color">{this.state.multiemail}</span>
                                    <span className="msedge-info-icon" id="auto_complete">
                                      <FontAwesomeIcon icon={faQuestionCircle} />
                                    </span>
                                    <UncontrolledTooltip placement="right" target="auto_complete" >
                                      {language.user_name}
                                    </UncontrolledTooltip>
                                  </Col>
                                </Row>
                                <Col md="12" className="p-0">
                                  <Row className="pt-2 pb-4">
                                    <Col md="4">
                                      <label htmlFor="lastname" className="fieldname-font-size">
                                        Profile status
                                      </label>
                                    </Col>
                                    <Col md="8">
                                      <Row>
                                        <Col md="4">
                                          <div className="custom-radio custom-control">
                                            <input name="profile" type="radio" id="radioYes" className="custom-control-input" value='y'
                                              onChange={this.statusHandler}
                                              checked={

                                                this.state.lawSchoolProfileActive === "y"
                                                  ? true
                                                  : false
                                              }
                                            />
  <label className="custom-control-label fieldname-font-size" htmlFor="radioYes" >{language.active}</label>
                                          </div>
                                        </Col>
                                        <Col md="4">
                                          <div className="custom-radio custom-control">
                                            <input name="profile" type="radio" id="radioNo" className="custom-control-input" value='n'
                                              onChange={this.statusHandler}
                                              checked={
                                                this.state.lawSchoolProfileActive === "n"
                                                  ? true
                                                  : false
                                              }
                                            />
  <label className="custom-control-label fieldname-font-size" htmlFor="radioNo">{language.in_active}</label>
                                          </div>
                                        </Col>
                                        {this.state.addORedit === "add" ?
                                          <div></div> :
                                          <Col md="4">
                                            <div className="custom-radio custom-control">
                                              <input name="profile" type="radio" id="radioDeleted" className="custom-control-input" value='d'
                                                onChange={this.statusHandler}
                                                checked={
                                                  this.state.lawSchoolProfileActive === "d"
                                                    ? true
                                                    : false
                                                }
                                                disabled={this.state.userRole === "1" ? false : true}
                                              />
                          <label className="custom-control-label fieldname-font-size" htmlFor="radioDeleted">{language.delete}</label>
                                            </div>
                                          </Col>
                                        }
                                      </Row>
                                    </Col>
                                  </Row>
                                </Col>
                              </Col>
                            </Row>
                          </div>
                        </div>

                        {this.state.addORedit === "add" ?
                          <div className="border-bottom">
                            <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12 pt-4 pb-4 msedge-admin-form-title">
                              <Row>
                                <Col xs="12" sm="12" md="12" lg="12" xl="12" >
                                  <h5 className="text-primary mb-0">{language.upload_student}</h5>
                                  <p className="pt-1">{language.upload_file}<b className="text-danger">*</b></p>
                                </Col>
                                <Col md="1"></Col>
                                <Col xs="12" md="4" sm="5" lg="4" xl="4" className="pt-1 ml-4">
                                  <Row>
                                    <Col md="10">
                                      <div className="msedge-dropzone-wrapper dropzone_file" >
                                        <Dropzone

                                          onDrop={this.onDrop.bind(this)}
                                          onFileDialogCancel={this.onCancel.bind(this)}
                                        >
                                          {({ getRootProps, getInputProps }) => (
                                            <div {...getRootProps()}>
                                              <input {...getInputProps()} onChange={this.filehandleChange} aria-label="upload student" />
                                              <div className="msedge-dropzone-content">
                                                <p className='m-0 fieldname-font-size'>
                                                  <span>
                                                    {this.state.selectedFile.name.length >= 26 ? this.state.selectedFile.name.substring(0, 7) + '...' : this.state.selectedFile.name}  {'  '}{this.state.selectedFile.size}
                                                  </span>
                                                </p>
                                              </div>
                                            </div>
                                          )}
                                        </Dropzone>
                                      </div>
                                    </Col>
                                  </Row>
                                </Col>
                              </Row>
                            </div>
                          </div>
                          : ""}

                        <AppButtonBottom
                          disabled={this.state.canSubmit === false || this.state.dropDownFilled === false || userNameEmpty === false ? true : false}
                          style={{ cursor: this.state.cursorDisable }}
                          isLoading={this.props.isLoading}
                          redirectToList={"/admin/list_lawschool"}
                        />

                      </div>
                    </div>

                  </Row>
                </Formsy >
              </div>
            </div>
          </div>
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isLoading: state.main.isDataAdding
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    currentState,
    updateData,
    uploadData,
    redirectPath
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(AddLawSchool)