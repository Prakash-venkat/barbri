import React, { Fragment, Component } from 'react'
import { Link } from "react-router-dom";
import Switch from "react-switch";
import moment from "moment";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import Formsy from "formsy-react";
import swal from "sweetalert";
import { Row, Col, UncontrolledTooltip } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { tooltipMsg } from '../../../../components/admin/tooltipMsg';
import { regx } from '../../../../utils/admin/Regx'
import { dataList } from '../../../../components/admin/dataList';
import { errors } from "../../../../utils/admin/ErrorMessages";
import { currentState } from '../../../../actions/actionMain';
import PageTitle from "../../../layout/AppMain/PageTitle";
import Error from '../../../../components/admin/error';
import TextAreaInput from "../../../../components/proofReader/input/TextAreaInput";
import MyInput from "../../../../components/proofReader/input/MyInput";
import { instance, HASH_HISTORY } from '../../../../../src/actions/constants'
import { getSession } from '../../../routes/routePaths'
import {customPageTitle} from '../../../../components/commonComponents/customPageTitle'
import {language} from '../../../../utils/locale/locale'


class AddMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            addOrEdit: 'add',
            editId: '',
            canSubmit: false,
            cursorDisable: '',
            messageSubject: "",
            messageDescription: "",
            messageStatus: false,
            lawschoolId: "",
            isLoading: false,
            userName: "All registered Multistate Edge students at your school",
            LawSchoolSession: getSession("LawSchoolSession")
        };
    }

    disableButton = () => {
        this.setState({ canSubmit: false, cursorDisable: "not-allowed" });
    }

    enableButton = () => {
        this.setState({ canSubmit: true, cursorDisable: "" });
    }

    handleClick = () => {
        this.setState({ messageStatus: !this.state.messageStatus })
    }

    componentDidMount() {
        this.props.currentState('messages')
        let LawSchoolSession = this.state.LawSchoolSession

        this.setState({
            lawschoolId: LawSchoolSession.userLawschoolID,
        });

        if (this.props.location.query) {
            this.setState(
                {
                    messageSubject: this.props.location.query.messageTitle,
                    messageDescription: this.props.location.query.messageContents,
                    messageStatus: this.props.location.query.messageStatus === "y" ? true : false,
                    addOrEdit: "edit",
                    editId: this.props.location.query.messageId,
                },
            );
        }
        if (this.props.location.query) {
            this.setState(
                { rowData: this.props.location.query.original || null },
            );
        }
        customPageTitle("Add Messages")
    }

    submit = (model) => {
        this.setState({isLoading: true})
        let LawSchoolSession = this.state.LawSchoolSession
        let date = Date.now()
        let dateFormate = moment(date).format("MM-DD-YYYY");
        let messageDetails = LawSchoolSession
        let messageType = 2
        let msgPublishedTo = 3
        var body = JSON.stringify({
            "messageTitle": model.messageSubject,
            "messageContents": model.messageDescription,
            "messageCreatedBy": messageDetails.name,
            "messageCreatedAt": dateFormate,
            "messagePublishedBy": messageDetails.name,
            "messagePublishedAt": dateFormate,
            "messageStatus": this.state.messageStatus === true ? "y" : "n",
            "messageType": messageType,
            "messagePublishedTo": msgPublishedTo,
            "messageLawschoolId": this.state.lawschoolId
        })
        if (this.state.addOrEdit === 'add') {

            instance.post("message", body, {
                headers: {
                  'Authorization': `Bearer ${localStorage.getItem('token')}`,        
                }
              })
                .then(response => {
                    this.setState({isLoading: false})
                    if (response.data.status === "Success") {
                        swal(language.added, language.addedMsg, "success")
                        HASH_HISTORY.push('/law-school/list-messages');
                    } else if (response.data.status === "Failure") {
                        swal(language.oops, `${response.data.errorMessage}`, "error");
                    }
                })
        } else if (this.state.addOrEdit === 'edit') {
            instance.put(`messages/${this.state.editId}`, body, {
                headers: {
                  'Authorization': `Bearer ${localStorage.getItem('token')}`,        
                }
              })
                .then(response => {
                    this.setState({isLoading: false})
                    if (response.data.status === "Success") {
                        swal(language.updated, language.updatedMsg, "success")
                        HASH_HISTORY.push('/law-school/list-messages');
                    } else {
                        swal(language.oops, `${language.tryAgain}`, "error");
                    }
                })
        }
    }

    render() {

        return (
            <div>
                <div className="msedge-lawschool-addmessage">
                    <Fragment>
                        <ReactCSSTransitionGroup
                            component="div"
                            transitionName="TabsAnimation"
                            transitionAppear={true}
                            transitionAppearTimeout={0}
                            transitionEnter={false}
                            transitionLeave={false}
                        >
                            <PageTitle
                                heading="Compose message"
                                brdcrumptwo="Add messages"
                                linkToHome="/law-school"
                                subheading="Compose your message to students here"
                            />

                            <div className="msedge-student-content">
                                <Formsy
                                    onValidSubmit={this.submit}
                                    onValid={this.enableButton}
                                    onInvalid={this.disableButton}
                                >
                                    <Row>
                                        <div className="container-fluid bg-grey p-30">

                                            <div className="col-md-12 bg-white pl-3 pr-3 rounded">
                                                <Error />
                                                <Col xs="12" sm="12" md="12" lg="12" xl="12" className="msedge-admin-form-title" >
                                                    <Row>
                                                        <div className="pt-2">
                                                            <h5 className="text-primary mb-0">
                                                                {dataList.lawschool_msg_title}
                                                            </h5>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className="pt-2">
                                                            <p>{dataList.lawschool_msg_heading} </p>
                                                        </div>
                                                    </Row>
                                                </Col>
                                                <Row className="">
                                                    <Col md={{ size: 10, offset: 2 }}>
                                                        <Row className="pt-4">
                                                            <Col md="3">
                                                                <label className="fieldname-font-size" htmlFor="msg_To">
                                                                    {dataList.lawschool_msg_to}
                                                                </label>

                                                            </Col>
                                                            <Col md="7" className="">
                                                                <MyInput
                                                                    name="messageTo"
                                                                    type="text"
                                                                    className="form-control"
                                                                    value={this.state.userName}
                                                                    validations={{
                                                                        matchRegexp: regx.alphNum100max
                                                                    }}
                                                                    validationError={errors.schoolNameLength}
                                                                    required
                                                                    id="msg_To"
                                                                    isDisable={true}
                                                                />
                                                                <span className="msedge-lawschool-msg-icon" id="lawschoolmsgTo">
                                                                    <FontAwesomeIcon icon={faQuestionCircle} />
                                                                </span>
                                                                <UncontrolledTooltip placement="right" target="lawschoolmsgTo">
                                                                    {tooltipMsg.lawschool_msg_to}
                                                                </UncontrolledTooltip>
                                                            </Col>

                                                            <Col md="3">
                                                                <label className="fieldname-font-size" htmlFor="msg_title">
                                                                    {dataList.message_subject}
                                                                </label>
                                                                <span className="mandatory text-danger">*</span>
                                                            </Col>
                                                            <Col md="7" className="">
                                                                <MyInput
                                                                    name="messageSubject"
                                                                    type="text"
                                                                    id="msg_title"
                                                                    className="form-control"
                                                                    isMandatory={true}
                                                                    fieldName={'Subject'}
                                                                    value={this.state.messageSubject}
                                                                    validations={{
                                                                        matchRegexp: regx.alphNum100max
                                                                    }}
                                                                    validationError={errors.schoolNameLength}
                                                                    required

                                                                />
                                                                <span className="msedge-lawschool-msg-icon" id="messageTitle">
                                                                    <FontAwesomeIcon icon={faQuestionCircle} />
                                                                </span>
                                                                <UncontrolledTooltip placement="right" target="messageTitle">
                                                                    {tooltipMsg.msg_title}
                                                                </UncontrolledTooltip>
                                                            </Col>

                                                            <Col md="3">
                                                                <label className="fieldname-font-size" htmlFor="lawschool_msg_des">
                                                                    {dataList.write_your_message}
                                                                </label>
                                                                <span className="mandatory text-danger">*</span>
                                                            </Col>
                                                            <Col md="7" className="">
                                                                <TextAreaInput
                                                                    name="messageDescription"
                                                                    type="textarea"
                                                                    rows="3"
                                                                    className="form-control"
                                                                    value={this.state.messageDescription}
                                                                    isMandatory={true}
                                                                    required
                                                                    id="lawschool_msg_des"
                                                                    fieldName={'Description'}
                                                                />
                                                                <span className="msedge-lawschool-subject-icon" id="messageDesc">
                                                                    <FontAwesomeIcon icon={faQuestionCircle} />
                                                                </span>
                                                                <UncontrolledTooltip placement="right" target="messageDesc">
                                                                    {tooltipMsg.lawschool_msg_des}
                                                                </UncontrolledTooltip>
                                                            </Col>

                                                            <Col md="3">
                                                                <label htmlFor="yesorno" className="fieldname-font-size" aria-label="publishedto">{dataList.lawschool_compose_to} </label>
                                                            </Col>
                                                            <Col md="2">
                                                                <Switch
                                                                    checked={this.state.messageStatus}
                                                                    onChange={this.handleClick}
                                                                    onColor="#86d3ff"
                                                                    onHandleColor="#2693e6"
                                                                    handleDiameter={23}
                                                                    uncheckedIcon={false}
                                                                    checkedIcon={false}
                                                                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                                                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                                                    height={15}
                                                                    width={42}
                                                                    aria-label="processed"
                                                                    onHandleColor="#006EBD"
                                                                    tabindex="0"
                                                                />
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>

                                                <div className="container-fluid mb-1 mt-2">
                                                    <Row>
                                                        <Col xs="12" sm="12" md="5" lg="5" xl="5">
                                                        </Col>
                                                        <Col xs="12" sm="12" md="7" lg="7" xl="7" className="text-right">
                                                            <div className="form-group">
                                                                <span className="msedge-questions-start msedge-right-br">
                                                                    {!this.state.isLoading ? (
                                                                        <button
                                                                            type="submit"
                                                                            className="btn btn-outline-primary mr-2"
                                                                            disabled={!this.state.canSubmit}
                                                                            style={{ cursor: this.state.cursorDisable }}
                                                                        >

                                                                            <li><i class="pe-7s-download" aria-hidden="true"></i></li>
                                                                            <li className="text-uppercase">{dataList.save}</li>
                                                                        </button>
                                                                    ) : (
                                                                            <span className="msedge-right-br">
                                                                                <button
                                                                                    className="btn btn-primary mr-2"
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
                                                                </span>
                                                                <span className="msedge-questions-start msedge-right-br">
                                                                    <Link to={"/law-school/list-messages"}>
                                                                        <button
                                                                            type="button"
                                                                            className="btn btn-outline-primary"
                                                                        >
                                                                            <li><i class="pe-7s-back" aria-hidden="true"></i></li>
                                                                            <li className="text-uppercase">{dataList.back}</li>
                                                                        </button>
                                                                    </Link>
                                                                </span>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </div>
                                        </div>
                                    </Row>
                                </Formsy>
                            </div>
                        </ReactCSSTransitionGroup>
                    </Fragment>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.main.load
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        currentState,
    }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(AddMessage)