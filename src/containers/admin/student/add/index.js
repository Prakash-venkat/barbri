import { Component } from 'react'
import { UncontrolledTooltip, Col, Row } from 'reactstrap';
import React, { Fragment } from 'react'
import Select from 'react-select';
import moment from "moment";
import Formsy from 'formsy-react';
import DatePicker from 'react-datepicker'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { postData, currentState, updateData, redirectPath } from '../../../../actions/actionMain';
import MyInput from '../../../../components/admin/inputs/MyInput'
import NumberInput from '../../../../components/admin/inputs/NumberInput'
import { regx } from '../../../../utils/admin/Regx'
import { errors } from '../../../../utils/admin/ErrorMessages'
import Error from '../../../../components/admin/error';
import { tooltipMsg } from '../../../../components/admin/tooltipMsg';
import { lawSchool_InitialRow, selectLawSchool } from "../../../../components/admin/initialRows";
import ExamBatch from '../../../../components/commonComponents/lawSchoolBatch.json'
import { states } from '../../../../utils/states';
 
import AppButtonTop from '../../../../components/commonComponents/appButtonTop'
import AppButtonBottom from '../../../../components/commonComponents/appButtonTop'
import { instance } from "../../../../actions/constants";
import { getSession } from "../../../routes/routePaths";
import {language} from '../../../../utils/locale/locale';
 
export class AddStudent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            adminSession: getSession("AdminSession"),
            startDate: new Date(),
            datePicker: new Date(),
            examDate: "",
            isChecked: true,
            isTransferChecked: true,
            selectedState: "",
            selectedBatch: "",
            profileStatus: 'y',
            rowData: lawSchool_InitialRow,
            addORedit: 'add',
            editId: '',
            canSubmit: false,
            cursorDisable: '',
            lawschoolList: [],
            selectedSchool: "",
            LawschoolListData: [],
            isLawSchoolSelected: false,
            isExamSelected: false,
            isStateSelected: false,
            enablingbuttonForBatch : false,
            dropDownFilled: false
        }
    };
 
    componentDidMount() {
 
        window.scroll({ top: 0, left: 0, behavior: 'smooth' })
        let title = document.querySelector('title');
        let titleText = "Add Student | Multistate Edge";
        title.innerText = titleText;
 
        this.props.currentState("admin/student")
        instance.get(`admin/schools`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,        
            }
          })
            .then(res => {
                this.setState({
                    lawschoolList: res.data.data === null || res.data.data === "" ? [] : res.data.data
                }, () => this.selectLawschoolFunction())
            })
        if (this.props.location.query) {
            let examState = this.props.location.query.original.studentExpectedBarExamState === null ? "" : this.props.location.query.original.studentExpectedBarExamState.toLowerCase()
            var statesArray = states.filter(function (el) {
                return el.value.toLowerCase() == examState || el.label.toLowerCase() == examState
              });
            let examBatch = this.props.location.query.original.studentBarExamBatch === null ? "" : this.props.location.query.original.studentBarExamBatch.toLowerCase()
            var batchArray = ExamBatch.ExamBatch.filter(function (el) {
                return el.value.toLowerCase() == examBatch || el.label.toLowerCase() == examBatch
              });              

             const dataformat = (this.props.location.query.original.studentExpectedBarExamDate).split('-')

            let month= dataformat[0]
            let date = dataformat[1]
            let year = dataformat[2]
            let convertedDate = year +'-'+month+'-'+date

             const removeZero = dataformat.map(s => s.replace(/^0+/, ''))
             const nums = removeZero.map(i=>Number(i))

            const updateDate = new Date(nums[2], nums[0], nums[1])

            let propsRow = this.props.location.query.original
 
            let isBatchEmpty,isStateEmpty;
             if(batchArray.length === 0 || statesArray.length === 0) {
                isStateEmpty= false;
                isBatchEmpty= false;
             }else {
                isBatchEmpty = Object.keys(batchArray[0]).length === 0 && batchArray[0].constructor === Object ? false : true
                isStateEmpty = Object.keys(statesArray[0]).length === 0 && statesArray[0].constructor === Object ? false : true   
             }
 
            this.setState(
                {
                    rowData: propsRow || null,
                    addORedit: "edit",
                    isExamSelected: isBatchEmpty, 
                    isStateSelected : isStateEmpty,
                    selectedState: statesArray[0],
                    selectedBatch: batchArray[0],
                    isTransferChecked: this.props.location.query.original.studentTransfer === 1 ? true : false,
                    isChecked: this.props.location.query.original.studentFullTime === 1 ? true : false,
                    profileStatus: propsRow.studentProfileActive,
                    editId: propsRow.studentId,
                    startDate:new Date(convertedDate),
                },()=>{this.enableButton2()}
            );
        }
    }
 
    toggleChecked = () => {
        this.setState({
            isChecked: !this.state.isChecked,
 
        });
    }
    toggleTransferChecked = () => {
        this.setState({
            isTransferChecked: !this.state.isTransferChecked,
        });
 
    }
 
    selectLawschoolFunction = () => {
        let result = this.state.lawschoolList.map((value, index) => {
            return (
                { value: value.lawSchoolId, label: value.lawSchoolName }
            )
        })
        this.setState({ LawschoolListData: result })
        if (this.props.location.query) {
            let lawSchool = this.props.location.query.original.studentLawSchoolName === null ? "" : this.props.location.query.original.studentLawSchoolName
                      
            var lawschoolArray = result.filter(function (el) {
                return el.label.toLowerCase() === lawSchool.toLowerCase() 
              });
            let isSchoolEmpty;
              if(lawschoolArray.length === 0) {
                isSchoolEmpty= false;
             }else {
                isSchoolEmpty = Object.keys(lawschoolArray[0]).length === 0 && lawschoolArray[0].constructor === Object ? false : true
             }
            this.setState({
                selectedSchool: lawschoolArray[0], isLawSchoolSelected: isSchoolEmpty
            }, () => { this.enableButton2() })
        }
    }
 
    statusHandler = (e) => {
        this.setState({ profileStatus: e.target.value })
    }
 
    disableButton = () => {
        this.setState({ canSubmit: false, cursorDisable: "not-allowed" });
    }
    enableButton2 = () => {
        if (this.state.isExamSelected === true && this.state.isLawSchoolSelected === true && this.state.isStateSelected === true) {
            this.setState({ dropDownFilled: this.state.examDate == null ? false : true });
        }
    }
    enableButton = () => {
        this.setState({ canSubmit: true, cursorDisable: "" });
    }
 
    submit = (model) => {
        let student_full_time = this.state.isChecked === true ? 1 : 0
        let student_transfer = this.state.isTransferChecked === true ? 1 : 0
        let date = this.state.examDate === "" ? this.state.startDate : this.state.examDate
        const dateData = moment.utc(date).format("ddd MMM DD YYYY HH:mm:ss +0000")
        this.props.redirectPath('student');
 
        let addStudentDetails = JSON.stringify({
            "studentFirstName": model.student_first_name,
            "studentCode": model.student_code,
            "studentLastName": model.student_last_name,
            "studentLawSchoolId": this.state.selectedSchool.value,
            "studentExpectedBarExamDate": dateData,
            "studentMiddleInitial": model.student_middle_name,
            "studentPrimaryEmail": model.student_email,
            "studentExpectedBarExamState": this.state.selectedState.value,
            "studentFullTime": student_full_time,
            "studentTransfer": student_transfer,
            "studentProfileActive": this.state.profileStatus,
            "studentBarExamBatch": this.state.selectedBatch.value,
            "studentLawschoolName": this.state.selectedSchool.label,
            "studentNoPrevBarExamsTaken": model.student_expected_bar_exam_taken,
            "studentLawSchoolGPA": model.student_law_school_GPA,
            "studentLSAT": model.student_LSAT,
            "studentBarbriId": model.student_barbri_id,
            "studentPhoneNumber": model.student_phone,
            "userType": 3
        })
 
        try {
            if (this.state.addORedit === "add") {
                this.props.postData(addStudentDetails)
 
            }
            else {
                this.props.updateData({
                    data: addStudentDetails,
                    id: this.state.editId,
                    path: "admin/students"
                })
            }
 
        }
        catch (e) {
            alert('Something went wrong please try again later');
        }
    }
    handleSchoolChange = selectedSchool => {
        this.setState({ selectedSchool, isLawSchoolSelected: true }, () => this.enableButton2());
    };
    handleExamChange = selectedBatch => {
        this.setState({ selectedBatch, isExamSelected: true }, () => this.enableButton2());
    };
    handleStateChange = selectedState => {
        this.setState({ selectedState, isStateSelected: true }, () => this.enableButton2());
    };
 
    myStartDate = date => {
        this.setState({
            examDate: date,
            startDate: date
        }, () => { this.enableButton2() });
    };
    render() {
        if (this.state.adminSession.user_role === "3") {
            this.props.history.push('/admin/not_allowed')
        }
 
        return (
            <div>
 
                <div className="msedge-add-student bg-white">
                    <Formsy onValidSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton}>
                        <Fragment>
                            <ReactCSSTransitionGroup
                                component="div"
                                transitionName="TabsAnimation"
                                transitionAppear={true}
                                transitionAppearTimeout={0}
                                transitionEnter={false}
                                transitionLeave={false}>
 
                                <div >
                                    <div className="msedge-student-content">
                                        <AppButtonTop
                                            disabled={this.state.canSubmit === false || this.state.dropDownFilled === false ? true : false}
                                            style={{ cursor: this.state.cursorDisable }}
                                            isLoading={this.props.isLoading}
                                            addORedit={this.state.addORedit}
                                            addTitle={"Add Student"}
                                            editTitle={"Edit Student"}
                                            redirectToList={"/admin/list_student"}
                                        />
 
                                        <Row>
                                            <div className="container-fluid bg-grey msedge-admin-add">
                                                <div className="col-md-12 bg-white pl-3 pr-3 rounded">
                                                    <div className="border-bottom">
                                                        <div className="col-md-12 col-lg-12 col-xl-12 col-sm-12">
                                                            <Error />
                                                        </div>
                                                        <Col md="12" lg="12" xl="12" sm="12" xs="12" className="msedge-admin-form-title">
                                                            <Row>
                                                                <Col md="12" className="pt-3">
                                                                    <h2 className="text-primary mb-0">{language.user_title}</h2>
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col sm="12" md="12" lg="12" className="pt-2">
                                                                    <p>{language.student_info}</p>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                        <Row>
                                                            <Col md={{ size: 8, offset: 2 }}>
 
                                                                <MyInput
                                                                    name="student_code"
                                                                    type="text"
                                                                    value={this.state.rowData.studentCode}
                                                                    validations={{
                                                                        matchRegexp: regx.code,
                                                                        maxLength: "10"
                                                                    }}
                                                                    validationErrors={{
                                                                        matchRegexp: errors.code,
                                                                        maxLength: errors.maxLength10
                                                                    }}
                                                                    className="form-control"
                                                                    required
                                                                    fieldName={language.student_code}
                                                                    tooltip={tooltipMsg.law_school_address}
                                                                    isMandatory={true}
                                                                />
 
                                                                <MyInput
                                                                    name="student_barbri_id"
                                                                    type="text"
                                                                    value={this.state.rowData.studentBarbriId}
                                                                    validations={{
                                                                        matchRegexp: regx.nos,
                                                                        maxLength: "10"
                                                                    }}
 
                                                                    validationErrors={{
                                                                        matchRegexp: errors.numberOnly,
                                                                        maxLength: errors.maxLength10
                                                                    }}
                                                                    className="form-control"
                                                                    fieldName={language.barbri_id}
                                                                    tooltip={tooltipMsg.student_id}
                                                                />
 
                                                                <MyInput
                                                                    name="student_first_name"
                                                                    type="text"
                                                                    value={this.state.rowData.studentFirstName}
                                                                    validations={{
                                                                        matchRegexp: regx.letter,
                                                                        maxLength: "50"
                                                                    }}
 
                                                                    validationErrors={{
                                                                        matchRegexp: errors.name,
                                                                        maxLength: errors.maxLength50
                                                                    }}
 
                                                                    className="form-control"
                                                                    required
                                                                    fieldName={language.user_firstname}
                                                                    tooltip={tooltipMsg.student_name}
                                                                    isMandatory={true}
                                                                />
 
                                                                <MyInput
                                                                    name="student_middle_name"
                                                                    type="text"
                                                                    value={this.state.rowData.studentMiddleInitial}
                                                                    validationError={errors.name}
                                                                    validations={{
                                                                        matchRegexp: regx.letter,
                                                                        maxLength: "50"
                                                                    }}
 
                                                                    validationErrors={{
                                                                        matchRegexp: errors.name,
                                                                        maxLength: errors.maxLength50
                                                                    }}
                                                                    className="form-control"
                                                                    fieldName={language.middle_name}
                                                                    tooltip={tooltipMsg.student_name}
                                                                />
 
                                                                <MyInput
                                                                    name="student_last_name"
                                                                    type="text"
                                                                    value={this.state.rowData.studentLastName}
                                                                    validationError={errors.name}
                                                                    validations={{
                                                                        matchRegexp: regx.letter,
                                                                        maxLength: "50"
                                                                    }}
 
                                                                    validationErrors={{
                                                                        matchRegexp: errors.name,
                                                                        maxLength: errors.maxLength50
                                                                    }}
                                                                    className="form-control"
                                                                    required
                                                                    fieldName={language.last_name}
                                                                    tooltip={tooltipMsg.student_name}
                                                                    isMandatory={true}
                                                                />
 
                                                                <NumberInput
                                                                    name="student_phone"
                                                                    type="number"
                                                                    value={this.state.rowData.studentPhoneNumber}
                                                                    validations={{
                                                                        matchRegexp: regx.phone,
                                                                    }}
                                                                    validationErrors={{
                                                                        matchRegexp: errors.number,
                                                                    }}
                                                                    className="form-control"
                                                                    fieldName={language.phone_number}
                                                                    tooltip={tooltipMsg.phone_no}
                                                                />
 
                                                                <MyInput
                                                                    name="student_email"
                                                                    type="email"
                                                                    value={this.state.rowData.studentPrimaryEmail}
                                                                    validations={{
                                                                        matchRegexp: regx.email,
                                                                    }}
                                                                    validationErrors={{
                                                                        matchRegexp: errors.email,
                                                                    }}
                                                                    className="form-control"
                                                                    required
                                                                    fieldName={language.email}
                                                                    tooltip={tooltipMsg.email}
                                                                    isMandatory={true}
                                                                    isDisable={
                                                                        this.props.location.query ? true : false
                                                                    } />
 
                                                            </Col>
                                                        </Row>
                                                    </div>
 
                                                    <div className="border-bottom pt-3 pb-3">
                                                        <div className="msedge-admin-form-title pt-2 col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                                            <Row>
                                                                <Col md="6" className="pt-1">
                                                                    <h5 className="text-primary mb-0">{language.law_schools_information}</h5>
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col sm="12" md="12" className="pt-2">
                                                                    <p>{language.law_school_info}</p>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                        <Row>
                                                            <Col md={{ size: 8, offset: 2 }}>
 
                                                                <Row className="msedge-student-field pt-2">
                                                                    <Col md="4" >
                                                                        <label htmlFor="lawschool">{language.law_school}<span className="text-danger ml-1">*</span></label>
                                                                    </Col>
                                                                    <Col md="7">
                                                                        <div className="form-group">
                                                                            <Select
                                                                                aria-label="select law school"
                                                                                onChange={this.handleSchoolChange}
                                                                                value={this.state.selectedSchool}
                                                                                options={this.state.LawschoolListData}
                                                                            >
 
                                                                            </Select>
                                                                            <span className="msedge-info-icon" id="lawschool"><FontAwesomeIcon icon={faQuestionCircle} /></span><UncontrolledTooltip placement="right" target="lawschool">{tooltipMsg.select_law_school}
                                                                            </UncontrolledTooltip>
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                                <MyInput
                                                                    name="student_law_school_GPA"
                                                                    type="text"
                                                                    value={this.state.rowData.studentLawSchoolGPA}
                                                                    validationError={errors.gpa}
                                                                    validations="isFloat"
                                                                    className="form-control"
                                                                    fieldName={language.law_school_GPA}
                                                                    tooltip={tooltipMsg.enter_law_school_GPA}
                                                                />
                                                                <MyInput
                                                                    name="student_LSAT"
                                                                    type="text"
                                                                    value={this.state.rowData.studentLSAT}
                                                                    validationError={errors.admission}
                                                                    validations="isFloat"
                                                                    className="form-control"
                                                                    fieldName={language.student_last}
                                                                    tooltip={tooltipMsg.enter_law_school_LAST}
                                                                />
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                    <div className="border-bottom pt-3 pb-4">
                                                        <div className="msedge-admin-form-title pt-2 col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                                            <Row>
                                                                <Col md="6" className="pt-1">
                                                                    <h5 className="text-primary mb-0"> {language.study_information}</h5>
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col md="12" className="pt-2">
                                                                    <p>{language.study_info}</p>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                        <Row>
                                                            <Col md={{ size: 8, offset: 2 }}>
                                                                <Row className="msedge-student-field pt-2">
                                                                    <Col md="4" >
                                                                        <label htmlFor="lawschool">{language.bar_exam_batch} <span className="text-danger">*</span></label>
                                                                    </Col>
                                                                    <Col md="7">
                                                                        <div className="form-group">
                                                                            <Select
                                                                                aria-label="Bar exam batch"
                                                                                onChange={this.handleExamChange}
                                                                                value={this.state.selectedBatch}
                                                                                options={ExamBatch.ExamBatch}
                                                                            >
 
                                                                            </Select>
                                                                            <span className="msedge-info-icon" id="batch"><FontAwesomeIcon icon={faQuestionCircle} /></span><UncontrolledTooltip placement="right" target="batch">{tooltipMsg.bar_exam_batch}
                                                                            </UncontrolledTooltip>
                                                                        </div>
                                                                    </Col>
                                                                </Row>
 
                                                                <Row className="msedge-student-field pt-2">
                                                                    <Col md="4" >
                                                                        <label htmlFor="lawschool">{language.expected_bar_exam_state} <span className="text-danger">*</span></label>
                                                                    </Col>
                                                                    <Col md="7">
                                                                        <div className="form-group">
                                                                            <Select
                                                                                aria-label="Expected bar exam state"
                                                                                onChange={this.handleStateChange}
                                                                                value={this.state.selectedState}
                                                                                options={states}
                                                                            >
                                                                            </Select>
                                                                            <span className="msedge-info-icon" id="state"><FontAwesomeIcon icon={faQuestionCircle} /></span>
                                                                            <UncontrolledTooltip placement="right" target="state">
                                                                                {tooltipMsg.enter_expected_bar_exam_state}
                                                                            </UncontrolledTooltip>
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                                <Row className="msedge-student-field pt-2">
                                                                    <Col md="4">
                                                                        <label htmlFor="tagCode">
                                                                            {language.expected_bar_exam_date}
                                                                            <span className="text-danger">*</span>
                                                                        </label>
                                                                    </Col>
                                                                    <Col md="7">
                                                                        <div className="form-group">
                                                                            <DatePicker
                                                                                label="Expected bar exam date"
                                                                                aria-label="Expected bar exam date"
                                                                                selected={this.state.startDate}
                                                                                onChange={this.myStartDate}
                                                                                minDate={this.state.datePicker}
                                                                                maxDate={moment().subtract(5, "days")}
                                                                                className="form-control"
                                                                                dateFormat="MM-dd-yyyy"
                                                                            />
                                                                            <span className="msedge-info-icon" id="date">
                                                                                <FontAwesomeIcon icon={faQuestionCircle} />
                                                                            </span>
                                                                            <UncontrolledTooltip placement="right" target="date">
                                                                                {tooltipMsg.selecte_bar_exam_date}
                                                                            </UncontrolledTooltip>
                                                                        </div>
                                                                    </Col>
                                                                </Row>
 
                                                                <MyInput
                                                                    name="student_expected_bar_exam_taken"
                                                                    type="text"
                                                                    value={this.state.rowData.studentNoPrevBarExamsTaken}
                                                                    validationError={errors.previousBarExam}
                                                                    validations="isInt"
                                                                    className="form-control"
                                                                    fieldName={language.no_of_bar_exam}
                                                                    tooltip={tooltipMsg.previous_bar_exam_taken}
                                                                />
                                                                <Row className="py-2">
                                                                    <Col md="4">
                                                                        <label htmlFor="exampleCustomCheckbox" className="fieldname-font-size">{language.student_full_time}</label>
                                                                    </Col>
                                                                    <Col>
                                                                        <div className="custom-checkbox custom-control">
                                                                            <input aria-label="student full time" name="status" type="checkbox" id="exampleCustomCheckbox" className="custom-control-input fieldname-font-size" checked={this.state.isChecked} onChange={this.toggleChecked} />
                                                                            <label className="custom-control-label admin-student-label fieldname-font-size" htmlFor="exampleCustomCheckbox">{this.state.isChecked === true ? 'Yes' : 'No'}</label>
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                                <Row className="py-2">
                                                                    <Col md="4">
                                                                        <label htmlFor="transferCheckbox" className="fieldname-font-size">{language.student_transfer} </label>
                                                                    </Col>
                                                                    <Col>
                                                                        <div className="custom-checkbox custom-control fieldname-font-size">
                                                                            <input aria-label="student transfer" name="transfer" type="checkbox" id="transferCheckbox" className="custom-control-input fieldname-font-size" checked={this.state.isTransferChecked} onChange={this.toggleTransferChecked} />
                                                                            <label className="custom-control-label admin-student-label fieldname-font-size" htmlFor="transferCheckbox">{this.state.isTransferChecked === true ? 'Yes' : 'No'}</label>
                                                                        </div>
                                                                    </Col>
                                                                </Row>
 
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                    <div className="border-bottom pt-3 pb-3">
                                                        <div className="msedge-admin-form-title pt-2 col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                                            <Row>
                                                                <Col md="6" className="pt-1">
                                                                    <h5 className="text-primary mb-0"> {language.profile_information}</h5>
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col md="12" className="pt-2">
                                                                    <p className="fieldname-font-size">{language.profile_info}</p>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                        <Row>
                                                            <Col md={{ size: 8, offset: 2 }}>
                                                                <Row className="pt-2 pb-4">
                                                                    <Col md="4">
                                                                        <label className="fieldname-font-size" htmlFor="lastname">{language.profile_status} </label>
                                                                    </Col>
                                                                    <Col md="3">
                                                                        <div className="custom-radio custom-control">
                                                                            <input name="profile" type="radio" id="radioYes" className="custom-control-input " value='y'
                                                                                onChange={this.statusHandler}
                                                                                checked={
 
                                                                                    this.state.profileStatus === "y" || this.state.profileStatus === "Y"
                                                                                        ? true
                                                                                        : false
                                                                                }
                                                                            />
                                                                            <label className="custom-control-label fieldname-font-size" htmlFor="radioYes" >{language.active}</label>
                                                                        </div>
                                                                    </Col>
                                                                    <Col md="3">
                                                                        <div className="custom-radio custom-control">
                                                                            <input name="profile" type="radio" id="radioNo" className="custom-control-input" value='n'
                                                                                onChange={this.statusHandler}
                                                                                checked={
                                                                                    this.state.profileStatus === "n" || this.state.profileStatus === "N"
                                                                                        ? true
                                                                                        : false
                                                                                }
                                                                            />
                                                                            <label className="custom-control-label fieldname-font-size" htmlFor="radioNo">{language.in_active}</label>
                                                                        </div>
                                                                    </Col>
                                                                    {this.state.addORedit === "add" ?
                                                                        <div></div> :
                                                                        <Col md="2">
                                                                            <div className="custom-radio custom-control">
                                                                                <input name="profile" type="radio" id="radioDeleted" className="custom-control-input" value='d'
                                                                                    onChange={this.statusHandler}
                                                                                    checked={
                                                                                        this.state.profileStatus === "d" || this.state.profileStatus === "D"
                                                                                            ? true
                                                                                            : false
                                                                                    }
                                                                                    // disabled={this.state.userRole === "1" ? false : true}
                                                                                />
                                                                                <label className="custom-control-label fieldname-font-size" htmlFor="radioDeleted">{language.deleted}</label>
                                                                            </div>
                                                                        </Col>
                                                                    }
 
                                                                </Row>
 
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                    <AppButtonBottom
                                                        disabled={this.state.canSubmit === false || this.state.dropDownFilled === false ? true : false}
                                                        style={{ cursor: this.state.cursorDisable }}
                                                        isLoading={this.props.isLoading}
                                                        redirectToList={"/admin/list_student"}
                                                    />
                                                </div>
                                            </div>
                                        </Row>
                                    </div>
 
                                </div>
                            </ReactCSSTransitionGroup>
                        </Fragment >
                    </Formsy>
                </div >
            </div>
        )
    }
}
 
const mapStateToProps = (state) => {
    return {
        isLoading: state.main.isDataAdding
    };
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        postData,
        currentState,
        updateData,
        redirectPath
    }, dispatch)
};
 
export default connect(mapStateToProps, mapDispatchToProps)(AddStudent)