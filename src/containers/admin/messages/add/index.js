import React, { Fragment, Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import Formsy from "formsy-react";
import { Row, Col } from 'reactstrap';
import Switch from "react-switch";
import swal from "sweetalert";
import { errors } from "../../../../utils/admin/ErrorMessages";
import Error from '../../../../components/admin/error';
import MyInput from '../../../../components/admin/inputs/MyInput'
import TextAreaInput from '../../../../components/admin/inputs/TextAreaInput'
import { currentState, redirectPath } from '../../../../actions/actionMain';
import { tooltipMsg } from '../../../../components/admin/tooltipMsg';
import { regx } from '../../../../utils/admin/Regx'
import AppButtonTop from '../../../../components/commonComponents/appButtonTop'
import AppButtonBottom from '../../../../components/commonComponents/appButtonTop'
import { instance, HASH_HISTORY } from "../../../../actions/constants";
import { getSession } from "../../../routes/routePaths";
import { customPageTitle } from '../../../../components/commonComponents/customPageTitle';
import {language} from '../../../../utils/locale/locale'


class addMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            adminSession: getSession("AdminSession"),
            data: [],
            addOrEdit: 'add',
            editId: '',
            canSubmit: false,
            cursorDisable: '',
            messageSubject: "",
            messageDescription: "",
            messagePublishedTo: 1,
            messageStatus: false,
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

    statusHandler = (e) => {
        this.setState({ messagePublishedTo: parseInt(e.target.value) })
    }

    componentDidMount() {

        this.props.currentState('messages')
        if (this.props.location.query) {
            this.setState(
                {
                    messageSubject: this.props.location.query.messageTitle,
                    messageDescription: this.props.location.query.messageContents,
                    messageStatus: this.props.location.query.messageStatus === "y" ? true : false,
                    messagePublishedTo: this.props.location.query.messagePublishedTo,
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
        customPageTitle('Add Message');
        
    }


    submit = (model) => {
        this.props.redirectPath("messages")
        let messageDetails = this.state.adminSession
        let messageType = 1
        this.setState({ isLoading: true })

        if (this.state.addOrEdit === 'add') {
            var body = JSON.stringify({
                "messageTitle": model.messageSubject,
                "messageContents": model.messageDescription,
                "messageCreatedBy": messageDetails.name,
                "messagePublishedBy": messageDetails.name,
                "messagePublishedTo": this.state.messagePublishedTo,
                "messageStatus": this.state.messageStatus === true ? "y" : "n",
                "messageType": messageType,
                "messageLawschoolId": null,
            })
            instance.post("message", body, {
                headers: {
                  'Authorization': `Bearer ${localStorage.getItem('token')}`,        
                }
              })
                .then(response => {
                    this.setState({ isLoading: false })
                    if (response.data.status === "Success") {
                        swal(language.added, language.addedMsg, "success")
                        HASH_HISTORY.push('/admin/list_messagenotify');
                    } else if (response.data.status === "Failure") {
                        swal(language.oops, `${response.data.data.errorMessage}`, "error");
                    }
                })
                .catch(e => {
                    this.setState({ isLoading: false })
                    swal(
                        language.oops,
                        language.tryAgain,
                        "error"
                    );
                })
        } else if (this.state.addOrEdit === 'edit') {
            var EditMessage = JSON.stringify({
                "messageTitle": model.messageSubject,
                "messageContents": model.messageDescription,
                "messageCreatedBy": messageDetails.name,
                "messagePublishedBy": messageDetails.name,
                "messagePublishedTo": this.state.messagePublishedTo,
                "messageStatus": this.state.messageStatus === true ? "y" : "n",
                "messageType": messageType,
                "messageLawschoolId": null,
                "messageCreatedAt": this.props.location.query.messageCreatedAt
            })
            instance.put(`messages/${this.state.editId}`, EditMessage, {
                headers: {
                  'Authorization': `Bearer ${localStorage.getItem('token')}`,        
                }
              })
                .then(response => {
                    this.setState({ isLoading: false })
                    if (response.data.status === "Success") {
                        swal(language.updated, language.updatedMsg, "success")
                        HASH_HISTORY.push('/admin/list_messagenotify');
                    } else {
                        swal(language.oops, `${response.data.data.errorMessage}`, "error");
                    }
                })
                .catch(e => {
                    this.setState({ isLoading: false })
                    swal(
                        language.oops,
                        language.tryAgain,
                        "error"
                    );
                })
        }
    }

    render() {
        const style = {
            paddingLeft: '5px',
            color: 'red'
        }
        if (this.state.adminSession.user_role === "3") {
            this.props.history.push('/admin/not_allowed')
        }

        return (
            <div>
                <div className="msedge-add-student">
                    <Fragment>
                        <ReactCSSTransitionGroup
                            component="div"
                            transitionName="TabsAnimation"
                            transitionAppear={true}
                            transitionAppearTimeout={0}
                            transitionEnter={false}
                            transitionLeave={false}
                        >
                            <div className="msedge-student-content">
                                <Formsy
                                    onValidSubmit={this.submit}
                                    onValid={this.enableButton}
                                    onInvalid={this.disableButton}
                                >
                                    <AppButtonTop
                                        disabled={!this.state.canSubmit}
                                        style={{ cursor: this.state.cursorDisable }}
                                        isLoading={this.state.isLoading}
                                        addORedit={this.state.addOrEdit}
                                        addTitle={language.message_add}
                                        editTitle={language.message_edit}
                                        redirectToList={"/admin/list_messagenotify"}
                                    />

                                    <Row>
                                        <div className="container-fluid bg-grey msedge-admin-add">
                                            <div className="col-md-12 bg-white pl-3 pr-3 rounded">
                                                <Error />
                                                <Col xs="12" sm="12" md="12" lg="12" xl="12" className="msedge-admin-form-title" >
                                                    <Row>
                                                        <div className="pt-2">
                                                            <h5 className="text-primary mb-0">
                                                                {language.user_title}
                                                            </h5>
                                                        </div>
                                                    </Row>
                                                    <Row>
                                                        <div className="pt-2">
                                                            <p>{language.user_info} </p>
                                                        </div>
                                                    </Row>
                                                </Col>
                                                <div className="">
                                                    <Row className="">
                                                        <Col md={{ size: 8, offset: 2 }}>
                                                            <div className="pt-2 pb-3">
                                                                <MyInput
                                                                    name="messageSubject"
                                                                    type="text"
                                                                    id="msg_title"
                                                                    fieldName={language.message_subject}
                                                                    tooltip={tooltipMsg.msg_title}
                                                                    className="form-control"
                                                                    isMandatory={true}
                                                                    value={this.state.messageSubject}
                                                                    validations={{
                                                                        matchRegexp: regx.alphNum100max
                                                                    }}
                                                                    validationError={errors.schoolNameLength}
                                                                    required
                                                                    id="msg_title"
                                                                />
                                                                <TextAreaInput
                                                                    name="messageDescription"
                                                                    type="textarea"
                                                                    rows="7"
                                                                    fieldName={language.write_your_message}
                                                                    tooltip={tooltipMsg.mesg_des}
                                                                    className="form-control"
                                                                    value={this.state.messageDescription}
                                                                    isMandatory={true}
                                                                    required
                                                                    id="mesg_des"
                                                                />
                                                                <Row>
                                                                    <Col md="4">
                                                                        <label htmlFor="form-group" className="fieldname-font-size" aria-label="message published to">{language.message_published_to}<b style={style}>*</b></label>
                                                                    </Col>
                                                                    <Col md="8">
                                                                        <Row>
                                                                            <Col md="12">
                                                                                <Row>
                                                                                    <Col md="6" lg="6">
                                                                                        <div className="custom-radio custom-control pb-2">
                                                                                            <input name="profile" type="radio" id="radioYes" className="custom-control-input" value={1}
                                                                                                onChange={this.statusHandler}
                                                                                                checked={
                                                                                                    this.state.messagePublishedTo === 1
                                                                                                        ? true
                                                                                                        : false
                                                                                                }
                                                                                                tabIndex="0"

                                                                                            />
                                                                                            <label className="custom-control-label fieldname-font-size" htmlFor="radioYes" aria-label="all" aria-label="message published to all">{language.message_sendto_all}</label>
                                                                                        </div>
                                                                                    </Col>
                                                                                    <Col md="6" lg="6">
                                                                                        <div className="custom-radio custom-control pb-2">
                                                                                            <input name="profile" type="radio" id="radioNo" className="custom-control-input" value={2}
                                                                                                onChange={this.statusHandler}
                                                                                                checked={
                                                                                                    this.state.messagePublishedTo === 2
                                                                                                        ? true
                                                                                                        : false
                                                                                                }
                                                                                                tabIndex="0"
                                                                                            />
                                                                                            <label className="custom-control-label fieldname-font-size" htmlFor="radioNo" aria-label="lawschool" aria-label="message published to lawschool">{language.lawschool}</label>
                                                                                        </div>
                                                                                    </Col>
                                                                                </Row>
                                                                            </Col>
                                                                            <Col md="12">
                                                                                <Row>
                                                                                    <Col md="6" lg="6">
                                                                                        <div className="custom-radio custom-control pb-2">
                                                                                            <input name="profile" type="radio" id="radioDeleted" className="custom-control-input" value={3}
                                                                                                onChange={this.statusHandler}
                                                                                                checked={
                                                                                                    this.state.messagePublishedTo === 3
                                                                                                        ? true
                                                                                                        : false
                                                                                                }
                                                                                                tabIndex="0"
                                                                                            />
                                                                                            <label className="custom-control-label fieldname-font-size" htmlFor="radioDeleted" aria-label="students" aria-label="message published to students">{language.students}</label>
                                                                                        </div>
                                                                                    </Col>
                                                                                    <Col md="6" lg="6">
                                                                                        <div className="custom-radio custom-control pb-2">
                                                                                            <input name="profile" type="radio" id="proofreader" className="custom-control-input" value={4}
                                                                                                onChange={this.statusHandler}
                                                                                                checked={
                                                                                                    this.state.messagePublishedTo === 4
                                                                                                        ? true
                                                                                                        : false
                                                                                                }
                                                                                                tabIndex="0"
                                                                                            />
                                                                                            <label className="custom-control-label fieldname-font-size" htmlFor="proofreader" aria-label="proofreader" aria-label="message published to students">{language.proof_reader}</label>
                                                                                        </div>
                                                                                    </Col>
                                                                                </Row>
                                                                            </Col>
                                                                        </Row>
                                                                    </Col>

                                                                </Row>
                                                                <Row className="mt-3">
                                                                    <Col md="4">
                                                                        <label htmlFor="yesorno" className="fieldname-font-size" aria-label="publishedto">{language.message_publish}<b style={style}>*</b> </label>
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

                                                                        />

                                                                    </Col>
                                                                </Row>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </div>

                                                <AppButtonBottom
                                                    disabled={!this.state.canSubmit}
                                                    style={{ cursor: this.state.cursorDisable }}
                                                    isLoading={this.state.isLoading}
                                                    redirectToList={"/admin/list_messagenotify"}
                                                />
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
        isLoading: state.main.isDataAdding
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            currentState,
            redirectPath
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(addMessage)
