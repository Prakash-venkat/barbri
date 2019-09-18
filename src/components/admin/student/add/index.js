//Authorization:
//Designed : by Ajay
//Purpose: Created for add student
//Description: Table for adding student

import { Component } from 'react'
import { UncontrolledTooltip, Col, Row, Form, Input } from 'reactstrap';

import React, { Fragment } from 'react'
import Select from 'react-select';
import { Link } from 'react-router-dom'
import swal from 'sweetalert';
import DatePicker from 'react-datepicker';
import Loader from 'react-loaders'
import moment from 'moment'



import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

const initialRow = {
    student_code: "",
    student_barbri_id: "",
    student_first_name: "",
    student_middle_name: "",
    student_last_name: "",
    student_primary_email: "",
    student_law_school: "",
    student_law_school_GPA: "",
    student_LSAT: "",
    student_expected_bar_exam: "",
    student_expected_bar_exam_state: "",
    student_expected_bar_exam_taken: "",
    student_full_time: "",
    student_transfer: "",
    student_active: "y",
    student_phone: "",
    student_username: "",
    student_password: ""
};

const options = [
    { value: 'School1', label: 'School1' },
    { value: 'School2', label: 'School2' },
    { value: 'School3', label: 'School3' },
]
const option = [
    { value: 'state1', label: 'state1' },
    { value: 'state2', label: 'state2' },
    { value: 'state3', label: 'state3' },
]


export class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {

            isChecked: true,
            isTransferChecked: true,
            isCheckedRadio: false,
            // active: 'Yes',
            // rowData: "",
            selectedOption: options[0],
            selectedStateOption: option[0],
            profileStatus: 'y',
            // validateAll: [],
            rowData: initialRow,
            addORedit: 'add',
            editId: '',
            loading: true,
            errorMsg: [],
            startDate: new Date(),
            showMsg: false,
            type: 'password',

        }
        this.fieldHandler.bind(this);
        // this.validation.bind(this);
        this.dateChange = this.dateChange.bind(this);
        this.showHide = this.showHide.bind(this);


    };
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

    handleChange = selectedOption => {
        this.setState({ selectedOption });
    };

    statusHandler = (e) => {
        this.setState({ profileStatus: e.target.value })
        console.log(e.target.value);
    }

    handleStateChange = selectedStateOption => {
        this.setState({ selectedStateOption });
    };
    dateChange(date) {
        this.setState({
            startDate: date
        });
        console.log(date);
    }

    showHide(e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            type: this.state.type === 'input' ? 'password' : 'input'
        })
    }

    componentDidMount() {

        setTimeout(() => {
            this.setState({ loading: false })
        }, 1000);
        if (this.props.location.query) {
            let school_option = this.props.location.query.original.student_law_school
            options.forEach(function (element) {
                element.value == school_option ? school_option = element : null
            });
            let state_option = this.props.location.query.original.student_expected_bar_exam_state
            option.forEach(function (element) {
                element.value == state_option ? state_option = element : null

            });

            let propsRow = this.props.location.query.original
            let databaseDate = propsRow.student_expected_bar_exam.date.split(" ")[0]
            let datepickerDate = databaseDate.split("-")[1] + "-" + databaseDate.split("-")[2] + "-" + databaseDate.split("-")[0]
            console.log(new Date(datepickerDate), "date object")
            console.log((datepickerDate, "just date from database"))
            this.setState(
                {
                    rowData: propsRow || null, addORedit: 'edit', editId:
                        this.props.location.query.original.student_id,
                    profileStatus: this.props.location.query.original.student_active,
                    selectedOption: school_option,
                    selectedStateOption: state_option,

                    isTransferChecked: propsRow.student_transfer === 'y' ? true : false,
                    isChecked: propsRow.student_full_time === 'y' ? true : false,
                    startDate: new Date(datepickerDate)
                }
            );
        }

    }

    fieldHandler(field, event) {
        let row = this.state.rowData;
        let errorMsg = this.state.errorMsg
        let letterReg = /([A-Za-z])/;
        let phoneReg = /^\(?(\d{3})\)?[-\. ]?(\d{3})[-\. ]?(\d{4})( x\d{4})?$/;
        let emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        let passReg = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/

        switch (field) {
            case "studentcode":
                row.student_code = event.target.value;
                event.target.value.trim() == '' ? errorMsg[0] = 'Student Code is required' : errorMsg[0] = ''
                this.setState({ rowData: row, errorMsg: errorMsg });
                break;
            case "studentbarbriId":
                row.student_barbri_id = event.target.value;
                event.target.value.trim() == '' ? errorMsg[1] = 'Student Id is required' : errorMsg[1] = ''
                this.setState({ rowData: row });
                break;
            case "firstname":
                row.student_first_name = event.target.value;
                event.target.value.trim() == ""
                    ? (errorMsg[2] = "First Name is required")
                    : letterReg.test(event.target.value) === false
                        ? (errorMsg[2] = "Enter valid Name")
                        : (errorMsg[2] = "");
                this.setState({ rowData: row });
                break;
            case "middlename":
                row.student_middle_name = event.target.value;
                this.setState({ rowData: row });
                break;
            case "lastname":
                row.student_last_name = event.target.value;
                event.target.value.trim() == ""
                    ? (errorMsg[3] = "Last Name is required")
                    : letterReg.test(event.target.value) === false
                        ? (errorMsg[3] = "Enter valid Name")
                        : (errorMsg[3] = "");
                this.setState({ rowData: row });
                break;
            case "email":
                row.student_primary_email = event.target.value;
                event.target.value.trim() == ""
                    ? (errorMsg[4] = "Email is required")
                    : emailReg.test(event.target.value) === false
                        ? (errorMsg[4] = "Enter valid Email")
                        : (errorMsg[4] = "");
                this.setState({ rowData: row });
                break;
            case "lawschool":
                row.student_law_school = event.target.value;
                event.target.value.trim() == '' ? errorMsg[5] = 'Law School is required' : errorMsg[5] = ''
                this.setState({ rowData: row });
                break;

            case "schoolgpa":
                row.student_law_school_GPA = event.target.value;
                this.setState({ rowData: row });
                break;
            case "admissiontest":
                row.student_LSAT = event.target.value;
                this.setState({ rowData: row });
                break;

            case "expectedbarexam":
                row.student_expected_bar_exam = event.target.value;
                event.target.value.trim() == '' ? errorMsg[6] = 'Expected bar exam is required' : errorMsg[6] = ''
                this.setState({ rowData: row });
                break;

            case "expectedbarexamstate":
                row.student_expected_bar_exam_state = event.target.value;
                event.target.value.trim() == '' ? errorMsg[7] = 'Expected bar exam state is required' : errorMsg[7] = ''
                this.setState({ rowData: row });
                break;
            case "examtaken":
                row.student_expected_bar_exam_taken = event.target.value;
                this.setState({ rowData: row });
                break;

            case "phonenumber":
                row.student_phone = event.target.value;
                event.target.value.trim() == ""
                    ? (errorMsg[8] = "Phone Number is required")
                    : phoneReg.test(event.target.value) === false
                        ? (errorMsg[8] = "Enter valid Phone Number")
                        : (errorMsg[8] = "");
                this.setState({ rowData: row });
                break;
            case "profile":
                row.student_active = event.target.value;
                this.setState({ rowData: row });
                break;
            case "username":
                row.student_username = event.target.value;
                event.target.value.trim() == '' ? errorMsg[9] = 'User Name is required' : errorMsg[9] = ''
                this.setState({ rowData: row, errorMsg: errorMsg });
                break;
            case "studentpassword":
                row.student_password = event.target.value;
                event.target.value.trim() == ""
                    ? (errorMsg[10] = "Password is required")
                    : passReg.test(event.target.value) === false
                        ? (errorMsg[10] = "Password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters")
                        : (errorMsg[10] = "");
                this.setState({ rowData: row });
                break;
        }
    }


    onSubmitField = (e) => {
        e.preventDefault();
        try {
            console.log(this.state.startDate, "datepickdate")
            let validateAll = false;
            let obj = this.state.rowData
            validateAll = this.state.errorMsg.every((val, i, arr) => val === "" ? true : false);
            if (validateAll === true) {
                if (
                    obj['student_code'] == '' ||
                    obj['student_barbri_id'] == '' ||
                    obj['student_first_name'] == '' ||
                    obj['student_last_name'] == '' ||
                    obj['student_primary_email'] == '' ||
                    obj['student_phone'] == '' ||
                    obj['student_username'] == '' ||
                    obj['student_password'] == ''
                )
                    validateAll = false
            }


            if (validateAll === true) {
                console.log(validateAll)

                let student_full_time = this.state.isChecked == true ? 'y' : 'n'
                let student_transfer = this.state.isTransferChecked == true ? 'y' : 'n'
                console.log(this.state.rowData.student_expected_bar_exam, "date")

                this.state.addORedit === 'add' ?
                    fetch("http://barbri.thinrootsoftware.com/barbriapi/student.php", {
                        method: 'post',
                        body: JSON.stringify({
                            "student_code": this.state.rowData.student_code,
                            "student_barbri_id": this.state.rowData.student_barbri_id,
                            "student_first_name": this.state.rowData.student_first_name,
                            "student_middle_name": this.state.rowData.student_middle_name,
                            "student_last_name": this.state.rowData.student_last_name,
                            "student_email": this.state.rowData.student_primary_email,
                            "student_law_school": this.state.selectedOption.value,
                            "student_school_GPA": this.state.rowData.student_law_school_GPA,
                            "student_LSAT": this.state.rowData.student_LSAT,
                            "student_expected_bar_exam": this.state.startDate,
                            "student_expected_bar_exam_state": this.state.selectedStateOption.value,
                            "student_expected_bar_exam_taken": this.state.rowData.student_expected_bar_exam_taken,
                            "student_full_time": student_full_time,
                            "student_transfer": student_transfer,
                            "student_active": this.state.profileStatus,
                            "student_phone": this.state.rowData.student_phone,
                            "student_username": this.state.rowData.student_username,
                            "student_password": this.state.rowData.student_password
                        })
                    }).then(

                        res => {
                            console.log("dataaaaaaaa" + res);
                            swal("Data Added!", "Successfully!", "success");
                            this.state.rowData.student_code = "";
                            this.state.rowData.student_barbri_id = "";
                            this.state.rowData.student_first_name = "";
                            this.state.rowData.student_middle_name = "";
                            this.state.rowData.student_last_name = "";
                            this.state.rowData.student_primary_email = "";
                            this.state.rowData.student_law_school_GPA = "";
                            this.state.rowData.student_LSAT = "";
                            this.state.rowData.student_expected_bar_exam = "";
                            this.state.rowData.student_expected_bar_exam_taken = "";
                            this.state.rowData.student_phone = "";
                            this.state.rowData.student_username = "";
                            this.state.rowData.student_password = "";
                            this.props.history.push('/admin/student-list');
                        },

                    ) : fetch(`http://barbri.thinrootsoftware.com/barbriapi/updatestudent.php?id=${this.state.editId}`, {
                        method: 'post',
                        body: JSON.stringify({
                            "student_code": this.state.rowData.student_code,
                            "student_barbri_id": this.state.rowData.student_barbri_id,
                            "student_first_name": this.state.rowData.student_first_name,
                            "student_middle_name": this.state.rowData.student_middle_name,
                            "student_last_name": this.state.rowData.student_last_name,
                            "student_email": this.state.rowData.student_primary_email,
                            "student_law_school": this.state.selectedOption.value,
                            "student_school_GPA": this.state.rowData.student_law_school_GPA,
                            "student_LSAT": this.state.rowData.student_LSAT,
                            "student_expected_bar_exam": moment(this.state.startDate).format("MM-DD-YYYY"),
                            "student_expected_bar_exam_state": this.state.selectedStateOption.value,
                            "student_expected_bar_exam_taken": this.state.rowData.student_expected_bar_exam_taken,
                            "student_full_time": student_full_time,
                            "student_transfer": student_transfer,
                            "student_active": this.state.profileStatus,
                            "student_phone": this.state.rowData.student_phone,
                            "student_username": this.state.rowData.student_username,
                            "student_password": this.state.rowData.student_password

                        })
                    }).then(
                        res => {
                            console.log("dataaaaaaaa" + res);
                            swal("Row updated!", "Successfully!", "success");
                            this.props.history.push('/admin/student-list');
                        },

                    )
            }
            else {
                window.scrollTo(0, 0)
                this.setState({
                    showMsg: true
                })
            }
        }
        catch (e) {
            console.log("Something went wrong", e, e.message);
            alert('Something went wrong please try again later');
        }
    }


    render() {

        const style = {
            paddingLeft: '5px',
            color: 'red'
        }
        const { selectedOption } = this.state;
        const { selectedStateOption } = this.state;

        return (
            <div>
                {this.state.loading ? <div className="loader-custom">
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
                    <div className="add-student">
                        <Fragment>
                            <ReactCSSTransitionGroup
                                component="div"
                                transitionName="TabsAnimation"
                                transitionAppear={true}
                                transitionAppearTimeout={0}
                                transitionEnter={false}
                                transitionLeave={false}>

                                <div >
                                    <div className="student-content">
                                        <Row >
                                            <Col md="12">
                                                <Form onSubmit={this.onSubmitField}>
                                                    <div className="mb-2 heading-section">
                                                        <Row className="page-title">
                                                            <Col xs="12" sm="12" md="7" lg="7" xl="7">
                                                                <h5 className="text-primary">
                                                                    {this.state.addORedit === "add"
                                                                        ? "Add Student"
                                                                        : "Edit Student"}                                                                </h5>
                                                                <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                                                            </Col>
                                                            <Col xs="12" sm="12" md="5" lg="5" xl="5" className="text-right">
                                                                <div className="form-group">
                                                                    <button type="submit" className="btn btn-outline-primary pr-5 pl-5 mr-2">Save</button>
                                                                    <Link to="/admin/student-list">
                                                                        <button className="btn btn-outline-primary pr-5 pl-5">Back</button>
                                                                    </Link>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                    <div className="border-bottom pt-3 pb-3">
                                                        <div className="custom-header">
                                                            <Row>
                                                                <Col md="11" className="ml-auto">
                                                                    {this.state.showMsg === false ? null : (
                                                                        <div className="error-txt d-block justify-content-center text-center">
                                                                            Please fill all mandatory fields correctly{" "}
                                                                        </div>
                                                                    )}
                                                                    <h6 className="text-primary">Basic Information</h6>
                                                                </Col>
                                                            </Row>
                                                            <Row>

                                                                <Col className="col-md-12 text-right">
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col md="10" className=" mx-auto">
                                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                        <div className="custom-fields">
                                                            <Row className="student-field pt-2">
                                                                <Col md="3">
                                                                    <label htmlFor="studentcode">Student Code <b style={style}>*</b>  </label>
                                                                </Col>
                                                                <Col md="6">
                                                                    <div className="form-group">
                                                                        <Input name="studentcode" type="text" id="studentcode" className={"form-control"}
                                                                            // pattern={0 - 9}
                                                                            // title="Enter valid number"
                                                                            value={this.state.rowData.student_code}
                                                                            onChange={this.fieldHandler.bind(
                                                                                this,
                                                                                "studentcode"
                                                                            )}
                                                                        />

                                                                        <span className="info-icon" id="studentcode"><FontAwesomeIcon id="studentCode" icon={faQuestionCircle} /></span>
                                                                        <UncontrolledTooltip placement="right" target="studentCode">Enter Student Code
                                                                    </UncontrolledTooltip>
                                                                        <span className="text-danger">{this.state.errorMsg[0]}</span>

                                                                    </div>
                                                                </Col>

                                                            </Row>
                                                            <Row className="student-field">
                                                                <Col md="3" >
                                                                    <label htmlFor="studentbarbriId">Barbri ID<b style={style}>*</b></label>

                                                                </Col>
                                                                <Col md="6">
                                                                    <div className="form-group">
                                                                        <Input name="studentbarbriId" type="text" id="studentbarbriId" className={"form-control"}
                                                                            // pattern="[0 - 9]"
                                                                            // title="Enter valid number"
                                                                            value={this.state.rowData.student_barbri_id}
                                                                            onChange={this.fieldHandler.bind(
                                                                                this,
                                                                                "studentbarbriId"
                                                                            )}

                                                                        />
                                                                        <span className="info-icon" id="studentbarbriId"><FontAwesomeIcon id="studentBarbriId" icon={faQuestionCircle} /></span>
                                                                        <UncontrolledTooltip placement="right" target="studentBarbriId">Enter Student ID
                                                                    </UncontrolledTooltip>
                                                                        <span className="text-danger">{this.state.errorMsg[1]}</span>

                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                            <Row className="student-field">
                                                                <Col md="3" >
                                                                    <label htmlFor="firstname">First Name<b style={style}>*</b></label>
                                                                </Col>
                                                                <Col md="6">
                                                                    <div className="form-group">
                                                                        <Input name="firstname" id="firstname" type="text" className={"form-control"}
                                                                            value={this.state.rowData.student_first_name}
                                                                            onChange={this.fieldHandler.bind(
                                                                                this,
                                                                                "firstname"
                                                                            )}

                                                                        />
                                                                        <span className="info-icon" id="firstName"><FontAwesomeIcon icon={faQuestionCircle} /></span><UncontrolledTooltip placement="right" target="firstName">Enter your First Name
                                                                    </UncontrolledTooltip>
                                                                        <span className="text-danger">{this.state.errorMsg[2]}</span>

                                                                    </div>

                                                                </Col>
                                                            </Row>
                                                            <Row className="student-field">
                                                                <Col md="3" >
                                                                    <label htmlFor="middlename">Middle Initial</label>
                                                                </Col>
                                                                <Col md="6">
                                                                    <div className="form-group">
                                                                        <Input name="middlename" type="text" className="{form-control}"

                                                                            value={this.state.rowData.student_middle_name}
                                                                            onChange={this.fieldHandler.bind(
                                                                                this,
                                                                                "middlename"
                                                                            )}

                                                                        />
                                                                        <span className="info-icon" id="middleName"><FontAwesomeIcon icon={faQuestionCircle} /></span>
                                                                        <UncontrolledTooltip placement="right" target="middleName">Enter your Middle Name
                                                                    </UncontrolledTooltip>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                            <Row className="student-field">
                                                                <Col md="3" >
                                                                    <label htmlFor="lastname">Last Name<b style={style}>*</b></label>

                                                                </Col>
                                                                <Col md="6">
                                                                    <div className="form-group">

                                                                        <Input name="lastname" type="text" className={"form-control"}
                                                                            value={this.state.rowData.student_last_name}
                                                                            onChange={this.fieldHandler.bind(
                                                                                this,
                                                                                "lastname"
                                                                            )}
                                                                        />
                                                                        <span className="info-icon" id="lastName"><FontAwesomeIcon icon={faQuestionCircle} /></span><UncontrolledTooltip placement="right" target="lastName">Enter your Last Name
                                                                    </UncontrolledTooltip>
                                                                        <span className="text-danger">{this.state.errorMsg[3]}</span>


                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                            <Row className="student-field">
                                                                <Col md="3" >
                                                                    <label htmlFor="phonenumber">Phone Number<b style={style}>*</b></label>

                                                                </Col>
                                                                <Col md="6">
                                                                    <div className="form-group">

                                                                        <Input name="phonenumber" id="phonenumber" type="text" className={"form-control"}
                                                                            placeholder="123-456-7890"
                                                                            // pattern="\d{3}[\-]\d{3}[\-]\d{4}"
                                                                            // title="Enter valid phone number"
                                                                            value={this.state.rowData.student_phone}
                                                                            onChange={this.fieldHandler.bind(
                                                                                this,
                                                                                "phonenumber"
                                                                            )}

                                                                        />
                                                                        <span className="info-icon" id="phonenumber"><FontAwesomeIcon id="phoneNumber" icon={faQuestionCircle} /></span>
                                                                        <UncontrolledTooltip placement="right" target="phoneNumber">Enter your  Phone Number
                                                                    </UncontrolledTooltip>
                                                                        <span className="text-danger">{this.state.errorMsg[8]}</span>

                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                            <Row className="student-field">
                                                                <Col md="3" >
                                                                    <label htmlFor="email">E-mail<b style={style}>*</b></label>

                                                                </Col>
                                                                <Col md="6">
                                                                    <div className="form-group">

                                                                        <Input name="email" type="text" title="Enter valid  E-mail Id" className={"form-control"}
                                                                            // pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}"
                                                                            value={this.state.rowData.student_primary_email}
                                                                            onChange={this.fieldHandler.bind(
                                                                                this,
                                                                                "email"
                                                                            )}

                                                                        />
                                                                        <span className="info-icon" id="Email"><FontAwesomeIcon icon={faQuestionCircle} /></span><UncontrolledTooltip placement="right" target="Email">Enter your  Mail ID
                                                                    </UncontrolledTooltip>
                                                                        <span className="text-danger">{this.state.errorMsg[4]}</span>

                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </div>
                                                    <div className="border-bottom pt-3 pb-3">
                                                        <div className="custom-header">
                                                            <Row>
                                                                <Col md="11" className="pt-3 ml-auto">
                                                                    <h6 className="text-primary"> Law School Information</h6>
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col md="10" className="pt-2 mx-auto">
                                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                        <div className="custom-fields">
                                                            <Row className="student-field pt-2">
                                                                <Col md="3" >
                                                                    <label htmlFor="lawschool">Law School<b style={style}>*</b></label>
                                                                </Col>
                                                                <Col md="6">
                                                                    <div className="form-group">
                                                                        <Select
                                                                            onChange={this.handleChange}
                                                                            value={selectedOption}
                                                                            // defaultInputValue={this.state.rowData.student_law_school}
                                                                            options={options}
                                                                        >

                                                                        </Select>
                                                                        <span className="info-icon" id="lawschool"><FontAwesomeIcon icon={faQuestionCircle} /></span><UncontrolledTooltip placement="right" target="lawschool">Select your Law School
                                                                    </UncontrolledTooltip>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                            <Row className="student-field">
                                                                <Col md="3">
                                                                    <label htmlFor="schoolgpa">Law School GPA</label>
                                                                </Col>
                                                                <Col md="6">
                                                                    <div className="form-group">

                                                                        <Input name="schoolgpa" type="text" className="form-control"
                                                                            value={this.state.rowData.student_law_school_GPA}
                                                                            onChange={this.fieldHandler.bind(
                                                                                this,
                                                                                "schoolgpa"
                                                                            )}
                                                                        />
                                                                        <span className="info-icon" id="schoolgpa"><FontAwesomeIcon icon={faQuestionCircle} /></span><UncontrolledTooltip placement="right" target="schoolgpa">Enter GPA(Grade Point Average)
                                                                    </UncontrolledTooltip>

                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                            <Row className="student-field">
                                                                <Col md="3 ">
                                                                    <label htmlFor="admissiontest">Law School Admission Test</label>
                                                                </Col>
                                                                <Col md="6">
                                                                    <div className="form-group">

                                                                        <Input name="admissiontest" type="text" className="form-control"
                                                                            value={this.state.rowData.student_LSAT}
                                                                            onChange={this.fieldHandler.bind(
                                                                                this,
                                                                                "admissiontest"
                                                                            )}
                                                                        />
                                                                        <span className="info-icon" id="admissiontest"><FontAwesomeIcon icon={faQuestionCircle} /></span><UncontrolledTooltip placement="right" target="admissiontest">Enter Law School Admission Test
                                                                    </UncontrolledTooltip>

                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </div>
                                                    <div className="border-bottom pt-3 pb-4">
                                                        <div className="custom-header">
                                                            <Row>
                                                                <Col md="11" className="pt-3 ml-auto">
                                                                    <h6 className="text-primary"> Study Information</h6>
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col md="10" className="pt-2 mx-auto">
                                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                        <div className="custom-fields">
                                                            <Row className="student-field pt-2">
                                                                <Col md="3">
                                                                    <label htmlFor="expectedbarexam">Expected Bar Exam<b style={style}>*</b></label>
                                                                </Col>
                                                                <Col md="6">
                                                                    <div className="form-group">
                                                                        <DatePicker className="form-control"
                                                                            name="expectedbarexam"
                                                                            selected={this.state.startDate}
                                                                            onChange={this.dateChange}

                                                                        // dateFormat="mm/dd/yyyy"
                                                                        // value={this.state.rowData.student_expected_bar_exam}
                                                                        />
                                                                        {/* <Input name="expectedbarexam" type="date" data-date-format="" id="expectedbarexam" className={"form-control"}
                                                                            // value='2019-09-19'
                                                                            value={this.state.rowData.student_expected_bar_exam}
                                                                            onChange={this.fieldHandler.bind(
                                                                                this,
                                                                                "expectedbarexam"
                                                                            )}
                                                                        /> */}
                                                                        <span className="info-icon" id="expectedbarexam"><FontAwesomeIcon id="expectedBarExam" icon={faQuestionCircle} /></span>
                                                                        <UncontrolledTooltip placement="right" target="expectedBarExam">Expected Bar Exam(dd-mm-yyyy)
                                                                    </UncontrolledTooltip>

                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                            <Row className="student-field">
                                                                <Col md="3">
                                                                    <label htmlFor="expectedbarexamstate">Expected Bar Exam State<b style={style}>*</b></label>
                                                                </Col>
                                                                <Col md="6">
                                                                    <div className="form-group">
                                                                        <Select
                                                                            value={selectedStateOption}
                                                                            onChange={this.handleStateChange}
                                                                            options={option}
                                                                        />
                                                                        <span className="info-icon" id="expectedbarexamstate"><FontAwesomeIcon icon={faQuestionCircle} /></span><UncontrolledTooltip placement="right" target="expectedbarexamstate">Expected Bar Exam Date
                                                                    </UncontrolledTooltip>

                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                            <Row className="student-field">
                                                                <Col md="3">
                                                                    <label htmlFor="examtaken">Number Of Previous Bar Exam Taken</label>
                                                                </Col>
                                                                <Col md="6">
                                                                    <div className="form-group">

                                                                        <Input name="examtaken" type="text" className={"form-control"}
                                                                            value={this.state.rowData.student_expected_bar_exam_taken}
                                                                            onChange={this.fieldHandler.bind(
                                                                                this,
                                                                                "examtaken"
                                                                            )}
                                                                        />
                                                                        <span className="info-icon" id="examTaken"><FontAwesomeIcon icon={faQuestionCircle} /></span><UncontrolledTooltip placement="right" target="examTaken">Number of  exam taken by the Student
                                                                    </UncontrolledTooltip>

                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                            <Row className="py-2">
                                                                <Col md="4">
                                                                    <label htmlFor="exampleCustomCheckbox">Student Full Time :</label>
                                                                </Col>
                                                                <Col>
                                                                    <div className="custom-checkbox custom-control">
                                                                        <input name="status" type="checkbox" id="exampleCustomCheckbox" className="custom-control-input" checked={this.state.isChecked} onChange={this.toggleChecked} />
                                                                        <label className="custom-control-label" for="exampleCustomCheckbox">{this.state.isChecked === true ? 'Yes' : 'No'}</label>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                            <Row className="py-2">
                                                                <Col md="4">
                                                                    <label htmlFor="transferCheckbox">Student Transfer :</label>
                                                                </Col>
                                                                <Col>
                                                                    <div className="custom-checkbox custom-control">
                                                                        <input name="transfer" type="checkbox" id="transferCheckbox" className="custom-control-input" checked={this.state.isTransferChecked} onChange={this.toggleTransferChecked} />
                                                                        <label className="custom-control-label" for="transferCheckbox">{this.state.isTransferChecked === true ? 'Yes' : 'No'}</label>
                                                                    </div>
                                                                </Col>
                                                            </Row>

                                                        </div>
                                                    </div>

                                                    <div className="border-bottom pt-3 pb-3">
                                                        <div className="custom-header">
                                                            <Row>
                                                                <Col md="11" className="pt-3 ml-auto">
                                                                    <h6 className="text-primary"> Profile Information</h6>
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col md="10" className="pt-2 mx-auto">
                                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                        <div className="custom-fields">
                                                            <Row className="pt-2 pb-4">
                                                                <Col md="3">
                                                                    <label htmlFor="lastname">Profile Active :</label>
                                                                </Col>
                                                                <Col md="3">
                                                                    <div className="custom-radio custom-control">
                                                                        <input name="profile" type="radio" id="radioYes" className="custom-control-input" value='y'
                                                                            onChange={this.statusHandler}
                                                                            checked={

                                                                                this.state.profileStatus === "y"
                                                                                    ? true
                                                                                    : false
                                                                            }
                                                                        />
                                                                        <label className="custom-control-label" for="radioYes" >Active</label>
                                                                    </div>
                                                                </Col>
                                                                <Col md="3">
                                                                    <div className="custom-radio custom-control">
                                                                        <input name="profile" type="radio" id="radioNo" className="custom-control-input" value='n'
                                                                            onChange={this.statusHandler}
                                                                            checked={
                                                                                this.state.profileStatus === "n"
                                                                                    ? true
                                                                                    : false
                                                                            }
                                                                        />
                                                                        <label className="custom-control-label" for="radioNo">In Active</label>
                                                                    </div>
                                                                </Col>
                                                                <Col md="3">
                                                                    <div className="custom-radio custom-control">
                                                                        <input name="profile" type="radio" id="radioDeleted" className="custom-control-input" value='d'
                                                                            onChange={this.statusHandler}
                                                                            checked={
                                                                                this.state.profileStatus === "d"
                                                                                    ? true
                                                                                    : false
                                                                            }
                                                                        />
                                                                        <label className="custom-control-label" for="radioDeleted">Deleted</label>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </div>

                                                    <div className="border-bottom pt-3 pb-3">
                                                        <div className="custom-header">
                                                            <Row>
                                                                <Col md="11" className="pt-3 ml-auto">
                                                                    <h6 className="text-primary">Access Information</h6>
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col md="10" className="pt-2 mx-auto">
                                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                        <div className="custom-fields">
                                                            <Row className="student-field">
                                                                <Col md="3">
                                                                    <label htmlFor="username">User Name</label>
                                                                </Col>
                                                                <Col md="6">
                                                                    <div className="form-group">

                                                                        <Input name="username" type="text" className="form-control"
                                                                            value={this.state.rowData.student_username}
                                                                            onChange={this.fieldHandler.bind(
                                                                                this,
                                                                                "username"
                                                                            )}
                                                                        />
                                                                        <span className="info-icon" id="username"><FontAwesomeIcon icon={faQuestionCircle} /></span><UncontrolledTooltip placement="right" target="username">Enter User Name
                                                                    </UncontrolledTooltip>
                                                                        <span className="text-danger">{this.state.errorMsg[9]}</span>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                            <Row className="student-field">
                                                                <Col md="3 ">
                                                                    <label htmlFor="studentpassword">Password</label>
                                                                </Col>
                                                                <Col md="6">
                                                                    <div className="form-group">

                                                                        <Input name="studentpassword" className="form-control"
                                                                            type={this.state.type}

                                                                            value={this.state.rowData.student_password}
                                                                            onChange={this.fieldHandler.bind(
                                                                                this,
                                                                                "studentpassword"
                                                                            )}
                                                                        />
                                                                        <span className="info-icon" id="studentpassword"><FontAwesomeIcon icon={faQuestionCircle} /></span>
                                                                        <span className="btn pe-7s-look password-eye" onClick={this.showHide}></span>

                                                                        <UncontrolledTooltip placement="right" target="admissiontest">Enter Password
                                                                    </UncontrolledTooltip>
                                                                        <span className="text-danger">{this.state.errorMsg[10]}</span>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <Row>
                                                            <Col className="col-md-12 mt-3 pt-3 text-right">
                                                                <div className="form-group">
                                                                    <button type="submit" className="btn btn-outline-primary pr-5 pl-5 mr-2">Save</button>
                                                                    <Link to="/admin/student-list">
                                                                        <button className="btn btn-outline-primary pr-5 pl-5">Back</button>
                                                                    </Link>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </Form>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>

                            </ReactCSSTransitionGroup>
                        </Fragment >
                    </div >
                }
            </div>
        )
    }
}

export default Add
