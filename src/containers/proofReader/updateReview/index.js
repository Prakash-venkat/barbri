import React, { Component } from "react";
import { Row, Col, Card, CardBody, UncontrolledTooltip } from "reactstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentAlt, faQuestion } from "@fortawesome/free-solid-svg-icons";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Formsy from "formsy-react";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { currentState } from "../../../actions/actionMain";

import { instance,HASH_HISTORY } from "../../../actions/constants"
import { getSession } from "../../routes/routePaths"
import {language} from "../../../utils/locale/locale"



class ItemUpdate extends Component {
  constructor() {
    super();
    this.state = {
      itemBankQuestion: "",
      itemBankOption1: "",
      itemBankOption2: "",
      itemBankOption3: "",
      itemBankOption4: "",
      itemBankOption5: "",
      itemBankCode: "",
      itemBankAssignedTo: "",
      itemBankRevisionBy: "",
      itemBankRevision: "",
      itemBankSubject: "",
      itemBankTopic: "",
      cursorDisable: "",
      isTransferChecked: false,
      editorState: EditorState.createEmpty(),
      contentState: "",
      itemBankDistractorRationale: "",
      revisionDataChange: [],
      errorMsg: [""],
      isLoading: false,
      ProofReaderSession: getSession("ProofReaderSession")
    };
  }

  disableButton = () => {
    this.setState({ canSubmit: false, cursorDisable: "not-allowed" });
  }

  enableButton = () => {
    if (this.removeHTMLTags(draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))).trim() != ""
      && this.removeHTMLTags(draftToHtml(convertToRaw(this.state.itemBankOption1.getCurrentContent()))).trim() != ""
      && this.removeHTMLTags(draftToHtml(convertToRaw(this.state.itemBankOption2.getCurrentContent()))).trim() != ""
      && this.removeHTMLTags(draftToHtml(convertToRaw(this.state.itemBankOption3.getCurrentContent()))).trim() != ""
      && this.removeHTMLTags(draftToHtml(convertToRaw(this.state.itemBankOption4.getCurrentContent()))).trim() != ""
      && this.removeHTMLTags(draftToHtml(convertToRaw(this.state.distractor.getCurrentContent()))).trim() != "") {
      this.setState({ canSubmit: true, cursorDisable: "" });
    } else {
      this.disableButton()
    }
  }

  toggleTransferChecked = () => { //Toggle the status of itembank question

    if (this.state.isTransferChecked === false)
      this.enableButton()
    else if (this.state.isTransferChecked === true)
      this.disableButton()

    this.setState({
      isTransferChecked: !this.state.isTransferChecked
    });
  };

  onEditorStateChange = (editorState) => { //Onchange event for html editor
    let valid = this.removeHTMLTags(draftToHtml(convertToRaw(editorState.getCurrentContent())))
    if (valid.trim() === "") {
      let copyArray = this.state.errorMsg
      copyArray[0] = "Question is required!"
      this.setState({
        editorState, errorMsg: copyArray
      }, () => this.disableButton())
    }

    if (valid.trim() != "") {
      let copyArray = this.state.errorMsg
      copyArray[0] = ""
      this.setState({
        editorState,
        errorMsg: copyArray
      }, () => this.trackChanges());
    }
  };

  onEditorStateChangeChoice1 = (editorState) => { //Onchange event for html editor

    let valid = this.removeHTMLTags(draftToHtml(convertToRaw(editorState.getCurrentContent())))
    if (valid.trim() === "") {
      let copyArray = this.state.errorMsg
      copyArray[1] = "Option 1 is required!"
      this.setState({
        itemBankOption1: editorState, errorMsg: copyArray
      },()=>this.disableButton())
    }

    if (valid.trim() != "") {
      let copyArray = this.state.errorMsg
      copyArray[1] = ""
      this.setState({
        itemBankOption1: editorState,
        errorMsg: copyArray
      }, () => this.trackChanges());
    }

  };

  onEditorStateChangeChoice2 = (editorState) => { //Onchange event for html editor

    let valid = this.removeHTMLTags(draftToHtml(convertToRaw(editorState.getCurrentContent())))
    if (valid.trim() === "") {
      let copyArray = this.state.errorMsg
      copyArray[2] = "Option 2 is required!"
      this.setState({
        itemBankOption2: editorState, errorMsg: copyArray
      },()=>this.disableButton())
    }

    if (valid.trim() != "") {
      let copyArray = this.state.errorMsg
      copyArray[2] = ""
      this.setState({
        itemBankOption2: editorState,
        errorMsg: copyArray
      }, () => this.trackChanges());
    }
  };

  onEditorStateChangeChoice3 = (editorState) => { //Onchange event for html editor
    let valid = this.removeHTMLTags(draftToHtml(convertToRaw(editorState.getCurrentContent())))
    if (valid.trim() === "") {
      let copyArray = this.state.errorMsg
      copyArray[3] = "Option 3 is required!"
      this.setState({
        itemBankOption3: editorState, errorMsg: copyArray
      },()=>this.disableButton())
    }

    if (valid.trim() != "") {
      let copyArray = this.state.errorMsg
      copyArray[3] = ""
      this.setState({
        itemBankOption3: editorState,
        errorMsg: copyArray
      }, () => this.trackChanges());
    }
  };

  onEditorStateChangeChoice4 = (editorState) => { //Onchange event for html editor
    let valid = this.removeHTMLTags(draftToHtml(convertToRaw(editorState.getCurrentContent())))
    if (valid.trim() === "") {
      let copyArray = this.state.errorMsg
      copyArray[4] = "Option 4 is required!"
      this.setState({
        itemBankOption4: editorState, errorMsg: copyArray
      },()=>this.disableButton())
    }

    if (valid.trim() != "") {
      let copyArray = this.state.errorMsg
      copyArray[4] = ""
      this.setState({
        itemBankOption4: editorState,
        errorMsg: copyArray
      }, () => this.trackChanges());
    }
  };

  onEditorStateChangeChoice5 = (editorState) => { //Onchange event for html editor
    this.setState({
      itemBankOption5: editorState
    }, () => this.trackChanges());
  };

  onEditorStateDistractorChange = (editorState) => { //Onchange event for html editor

    let valid = this.removeHTMLTags(draftToHtml(convertToRaw(editorState.getCurrentContent())))
    if (valid.trim() === "") {
      let copyArray = this.state.errorMsg
      copyArray[6] = "Distractor rationale is required!"
      this.setState({
        distractor: editorState, errorMsg: copyArray
      }, () => this.disableButton())
    }

    if (valid.trim() != "") {
      let copyArray = this.state.errorMsg
      copyArray[6] = ""
      this.setState({
        distractor: editorState,
        errorMsg: copyArray
      }, () => this.trackChanges());
    }

  };


  trackChanges = () => { //Enable and disable save option depends on the changes made

    if (this.props.location.query.itemBankQuestion != draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
      || this.props.location.query.itemBankOption1 != draftToHtml(convertToRaw(this.state.itemBankOption1.getCurrentContent()))
      || this.props.location.query.itemBankOption2 != draftToHtml(convertToRaw(this.state.itemBankOption2.getCurrentContent()))
      || this.props.location.query.itemBankOption3 != draftToHtml(convertToRaw(this.state.itemBankOption3.getCurrentContent()))
      || this.props.location.query.itemBankOption4 != draftToHtml(convertToRaw(this.state.itemBankOption4.getCurrentContent()))
      || this.props.location.query.itemBankOption5 != draftToHtml(convertToRaw(this.state.itemBankOption5.getCurrentContent()))
      || this.props.location.query.itemBankDistractorRationale != draftToHtml(convertToRaw(this.state.distractor.getCurrentContent()))) {

      this.enableButton();
    } else {
      this.disableButton()
    }
  }

  removeHTMLTags = (str) => {
    let a = str === null || str === undefined ? "<p></p>" : str.replace(/<[^>]*>?|&nbsp;/gm, "")
    return a;
  };

  componentDidMount() {
    this.props.currentState("proofreader");
    let ProofReaderSession = this.state.ProofReaderSession
    let UserId = ProofReaderSession.userId;
    this.setState({ UserId: UserId });

    if (this.props.location.query) {

      const html = this.props.location.query.itemBankQuestion === null ||
        this.props.location.query.itemBankQuestion === ""
        ? "<p></p>"
        : this.props.location.query.itemBankQuestion;

      const choice1 = this.props.location.query.itemBankOption1;
      const contentChoice1 = htmlToDraft(choice1 === null || choice1 === "" ? "<p><p>" : choice1);

      const choice2 = this.props.location.query.itemBankOption2;
      const contentChoice2 = htmlToDraft(choice2 === null || choice2 === "" ? "<p><p>" : choice2);

      const choice3 = this.props.location.query.itemBankOption3;
      const contentChoice3 = htmlToDraft(choice3 === null || choice3 === "" ? "<p><p>" : choice3);

      const choice4 = this.props.location.query.itemBankOption4;
      const contentChoice4 = htmlToDraft(choice4 === null || choice4 === "" ? "<p><p>" : choice4);

      const choice5 = this.props.location.query.itemBankOption5;
      const contentChoice5 = htmlToDraft(choice5 === null || choice5 === "" ? "<p><p>" : choice5);

      const distractor =
        this.props.location.query.itemBankDistractorRationale === null ||
          this.props.location.query.itemBankDistractorRationale === ""
          ? "<p></p>"
          : this.props.location.query.itemBankDistractorRationale;
      const contentBlock = htmlToDraft(html);
      const contentDistractor = htmlToDraft(distractor);

      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(
          contentBlock.contentBlocks
        );
        const editorState = EditorState.createWithContent(contentState);
        this.setState({
          editorState: editorState
        });
      }

      if (contentChoice1) {
        const contentState = ContentState.createFromBlockArray(contentChoice1.contentBlocks);
        const editorState = EditorState.createWithContent(contentState);
        this.setState({
          itemBankOption1: editorState
        })
      }

      if (contentChoice2) {
        const contentState = ContentState.createFromBlockArray(contentChoice2.contentBlocks);
        const editorState = EditorState.createWithContent(contentState);
        this.setState({
          itemBankOption2: editorState
        })
      }

      if (contentChoice3) {
        const contentState = ContentState.createFromBlockArray(contentChoice3.contentBlocks);
        const editorState = EditorState.createWithContent(contentState);
        this.setState({
          itemBankOption3: editorState
        })
      }

      if (contentChoice4) {
        const contentState = ContentState.createFromBlockArray(contentChoice4.contentBlocks);
        const editorState = EditorState.createWithContent(contentState);
        this.setState({
          itemBankOption4: editorState
        })
      }

      if (contentChoice5) {
        const contentState = ContentState.createFromBlockArray(contentChoice5.contentBlocks);
        const editorState = EditorState.createWithContent(contentState);
        this.setState({
          itemBankOption5: editorState
        })
      }

      if (contentDistractor) {
        const contentState = ContentState.createFromBlockArray(
          contentDistractor.contentBlocks
        );
        const editorState = EditorState.createWithContent(contentState);
        this.setState({
          distractor: editorState
        });
      }
      this.setState({
        itemBankCode:
          this.props.location.query.itemBankCode === null
            ? ""
            : this.props.location.query.itemBankCode,
        itemBankQuestion:
          this.props.location.query.itemBankQuestion === null
            ? ""
            : this.props.location.query.itemBankQuestion,
        itemBankDistractorRationale: this.props.location.query
          .itemBankDistractorRationale,
        isTransferChecked:
          this.props.location.query.itemBankStatus === "3" ? true : false,
        itemBankAssignedTo:
          this.props.location.query.itemBankAssignedTo === null
            ? ""
            : this.props.location.query.itemBankAssignedTo,
        itemBankRevisionBy:
          this.props.location.query.itemBankRevisionBy === null
            ? ""
            : this.props.location.query.itemBankRevisionBy,
        itemBankRevision:
          this.props.location.query.itemBankRevision === null
            ? ""
            : this.props.location.query.itemBankRevision,
        itemBankId:
          this.props.location.query.itemBankId === null
            ? ""
            : this.props.location.query.itemBankId,
        itemBankSubject:
          this.props.location.query.itemBankSubject === null
            ? ""
            : this.props.location.query.itemBankSubject,
        itemBankTopic:
          this.props.location.query.itemBankTopic === null
            ? ""
            : this.props.location.query.itemBankTopic,
        itemBankValue:
          this.props.location.query.itemBankValue === null
            ? ""
            : this.props.location.query.itemBankValue,
        // itemBankPublicRefrence: this.props.location.query
        //   .itemBankPublicRefrence,
        // itemBankSampleAnswer: this.props.location.query.itemBankSampleAnswer,
        // itemBankAcknowledgement: this.props.location.query
        //   .itemBankAcknowledgement,
        // itemBankPreferenceNote: this.props.location.query
        //   .itemBankPreferenceNote,
        itemBankContentType: this.props.location.query.itemBankContentType
      });
    } else if (this.props.location.query === undefined || null || "") {
      HASH_HISTORY.push("/proof-reader");
    }

  }

  submit = (model) => {
   


    if (
      this.state.itemBankOption1 != model.option1 ||
      this.state.itemBankOption2 != model.option2 ||
      this.state.itemBankOption3 != model.option3 ||
      this.state.itemBankOption4 != model.option4 ||
      this.state.itemBankOption5 != model.option5
    ) {
      this.state.revisionDataChange.push("Multiple choice");
    }
    if (
      this.props.location.query.itemBankDistractorRationale !=
      draftToHtml(convertToRaw(this.state.distractor.getCurrentContent()))
    ) {
      this.state.revisionDataChange.push("Answer");
    }
    if (
      this.props.location.query.itemBankQuestion !=
      draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
    ) {
      this.state.revisionDataChange.push("Question");
    }
    var itembankchange = this.state.revisionDataChange.join(",");

    let itemBankStatus = this.state.isTransferChecked === true ? "3" : "2";
    let editItemDetail = JSON.stringify({

      itemBankCode: this.state.itemBankCode,
      itemBankQuestion: draftToHtml(
        convertToRaw(this.state.editorState.getCurrentContent())
      ),
      // itemBankOrganisationId: "1",
      itemBankOption1: draftToHtml(convertToRaw(this.state.itemBankOption1.getCurrentContent())),
      itemBankOption2: draftToHtml(convertToRaw(this.state.itemBankOption2.getCurrentContent())),
      itemBankOption3: draftToHtml(convertToRaw(this.state.itemBankOption3.getCurrentContent())),
      itemBankOption4: draftToHtml(convertToRaw(this.state.itemBankOption4.getCurrentContent())),
      itemBankOption5: this.removeHTMLTags(draftToHtml(convertToRaw(this.state.itemBankOption5.getCurrentContent()))).trim() === "" ? "" : draftToHtml(convertToRaw(this.state.itemBankOption5.getCurrentContent())),
      itemBankDistractorRationale: draftToHtml(
        convertToRaw(this.state.distractor.getCurrentContent())
      ),
      itemBankAssignedTo: this.state.litemBankAssignedTo,
      itemBankRevisionBy: this.state.itemBankRevisionBy,
      itemBankRevision: parseInt(this.state.itemBankRevision) + 1,
      itemBankSubject: this.state.itemBankSubject,
      itemBankTopic: this.state.itemBankTopic,
      itemBankSubjectId: this.props.location.query.itemBankSubjectId,
      itemBankTopicId: this.props.location.query.itemBankTopicId,
      itemBankTag: this.state.itemBankTag,
      itemBankValue: this.state.itemBankValue,
      itemBankStatus: itemBankStatus,
      // itemBankPublicRefrence: this.state.itemBankPublicRefrence,
      // itemBankSampleAnswer: this.state.itemBankSampleAnswer,
      // itemBankAcknowledgement: this.state.itemBankAcknowledgement,
      // itemBankPreferenceNote: this.state.itemBankPreferenceNote,
      itemBankContentType: this.state.itemBankContentType,
      itemBankProofReader: this.state.UserId,
      itemBankChange: itembankchange
    });

    var a =this.removeHTMLTags(draftToHtml(convertToRaw(this.state.itemBankOption1.getCurrentContent()))).trim();
    var b = this.removeHTMLTags(draftToHtml(convertToRaw(this.state.itemBankOption2.getCurrentContent()))).trim();
    var c = this.removeHTMLTags(draftToHtml(convertToRaw(this.state.itemBankOption3.getCurrentContent()))).trim();
    var d = this.removeHTMLTags(draftToHtml(convertToRaw(this.state.itemBankOption4.getCurrentContent()))).trim();
    var e = this.removeHTMLTags(draftToHtml(convertToRaw(this.state.itemBankOption5.getCurrentContent()))).trim();
   

if( a ==  b || a ==  c || a ==  d || a == e || b == c || b == d || b == e || c ==  d || c ==  e || d == e ) {
swal(language.invalid, language.itemBankDifferentOptions,"error");
return false;
}
else{

    instance.put(`admin/itembanks/${this.state.itemBankId}`, editItemDetail, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,        
      }
    })
      .then(res => {
        if (res.data.status === "Success" || res.data === true) {
          swal(language.updated, language.updatedMsg, "success");
          this.setState({ isLoading: false })
          HASH_HISTORY.push("/proof-reader");
        } else if (res.data.status === "Failure" || res.data === false) {
          swal(language.oops, `${response.data.errorMessage}`, "error");
          this.setState({ isLoading: false })
        }
      })
      .catch(e => {
        this.setState({ isLoading: false })
        swal(language.oops, language.tryAgain, "error");
      })
    }


  };
  
  render() {
    const { editorState } = this.state;

    return (
      <div>
        <ReactCSSTransitionGroup
          component="div"
          transitionName="TabsAnimation"
          transitionAppear={true}
          transitionAppearTimeout={0}
          transitionEnter={false}
          transitionLeave={false}>
          <div className="msedge-proof-reader-update">
            <Formsy
              onValidSubmit={this.submit}
              onValid={this.enableButton}
              onInvalid={this.disableButton}
            >
              <div className="mb-1 container-fluid mt-1">
                <Row>
                  <Col
                    xs="12"
                    sm="12"
                    md="5"
                    lg="5"
                    xl="5"
                    className="msedge-admin-title"
                  >
  <h1 className="msedge-overview-text">{language.items_for_review}</h1>
                  </Col>
                  <Col
                    xs="12"
                    sm="12"
                    md="7"
                    lg="7"
                    xl="7"
                    className="text-right msedge-btn-sm-center"
                  >
                    <div className="form-group">

                      {!this.state.isLoading ?
                        <span class="msedge-questions-start msedge-right-br mr-2">
                          <button
                            type="submit"
                            className="btn btn-outline-primary"
                            disabled={!this.state.canSubmit}
                            style={{ cursor: this.state.cursorDisable }}
                          >
                            <li>
                              <i class="pe-7s-note" aria-hidden="true"></i>
                            </li>
                      <li class="text-uppercase">{language.update}</li>
                          </button>
                        </span>
                        :
                        <span class="msedge-questions-start msedge-right-br mr-2">
                          <button
                            class="btn btn-primary mr-2"
                            type="button"
                            disabled
                          >
                            <li>
                              <span
                                class="spinner-border spinner-border-sm mr-2"
                                role="status"
                                aria-hidden="true"
                              ></span>
                            </li>
                            <li className="text-uppercase">
                              {language.buttonLoading}
                            </li>
                          </button>
                        </span>

                      }

                      <span class="msedge-questions-start msedge-right-br">
                        <Link to="/proof-reader">
                          <button type="button" className="btn btn-outline-primary">
                            <li>
                              <i class="pe-7s-back" aria-hidden="true"></i>
                            </li>
                    <li class="text-uppercase">{language.back}</li>
                          </button>
                        </Link>
                      </span>
                    </div>
                  </Col>
                </Row>
              </div>
              <Row>
                <div className="container-fluid bg-grey p-30">
                  <Card>
                    <CardBody>
                      <div>
                        <div>
                          <h2 className="text-primary pb-3 border-bottom">
                            {language.item_code} : {""}
                            <span className="text-grey">
                              {this.state.itemBankCode}
                            </span>
                          </h2>
                        </div>
                        <div className="row">
                          <div className="col-md-4 px-4">
                            <p>
                              {language.question} <abbr className="text-danger"> *</abbr>
                            </p>
                            <span id="question">
                              <FontAwesomeIcon
                                className="tooltip-info"
                                icon={faCommentAlt}
                              />
                              <FontAwesomeIcon
                                className="question-icon"
                                icon={faQuestion}
                              />
                            </span>
                            <UncontrolledTooltip
                              placement="right"
                              target="question"
                            >
                              {language.question}
                        </UncontrolledTooltip>
                          </div>
                          <div className="col-md-12">
                            <div className="textarea-size pb-4">
                              <Editor
                                editorState={editorState}
                                wrapperClassName="demo-wrapper"
                                editorClassName="demo-editor"
                                onEditorStateChange={this.onEditorStateChange}
                                toolbar={{
                                  options: ['inline', 'blockType'],
                                  inline: { options: ['bold', 'italic', 'underline'] }
                                }}
                              />
                            </div>
                            <span className="text-danger pl-2">
                              {this.state.errorMsg[0]}
                            </span>
                          </div>
                        </div>

                        <div>
                          <div className="d-flex border-top">
                            <div className="msedge-answer-choices pb-1">
                                 <h2 className="text-primary">{language.answer_choices}</h2>
                            </div>
                          </div>
                          <div className="border-bottom pb-3">
                            <div className="row">
                              <div className="col-md-5  px-4">
                                <p>
                                  {language.option} 1 <abbr className="text-danger"> *</abbr>
                                </p>
                                <span id="option1">
                                  <FontAwesomeIcon
                                    className="tooltip-info"
                                    icon={faCommentAlt}
                                  />
                                  <FontAwesomeIcon
                                    className="question-icon"
                                    icon={faQuestion}
                                  />
                                </span>
                                <UncontrolledTooltip
                                  placement="right"
                                  target="option1"
                                >
                                   {language.option}1
                            </UncontrolledTooltip>
                              </div>

                              <div className="col-md-12">
                                <div className="textarea-size">
                                  <Editor
                                    editorState={this.state.itemBankOption1}
                                    wrapperClassName="demo-wrapper"
                                    editorClassName="demo-editor"
                                    onEditorStateChange={this.onEditorStateChangeChoice1}
                                    toolbar={{
                                      options: ['inline', 'blockType'],
                                      inline: { options: ['bold', 'italic', 'underline'] }
                                    }}
                                  />
                                </div>
                                <span className="text-danger pl-2">
                                  {this.state.errorMsg[1]}
                                </span>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-md-5  px-4">
                                <p className="text-muted">
                                {language.option} 2<abbr className="text-danger"> *</abbr>
                                </p>
                                <span id="option2">
                                  <FontAwesomeIcon
                                    className="tooltip-info"
                                    icon={faCommentAlt}
                                  />
                                  <FontAwesomeIcon
                                    className="question-icon"
                                    icon={faQuestion}
                                  />
                                </span>
                                <UncontrolledTooltip
                                  placement="right"
                                  target="option2"
                                >
                                   {language.option}2
                            </UncontrolledTooltip>
                              </div>
                              <div className="col-md-12">
                                <div className="textarea-size">
                                  <Editor
                                    editorState={this.state.itemBankOption2}
                                    wrapperClassName="demo-wrapper"
                                    editorClassName="demo-editor"
                                    onEditorStateChange={this.onEditorStateChangeChoice2}
                                    toolbar={{
                                      options: ['inline', 'blockType'],
                                      inline: { options: ['bold', 'italic', 'underline'] }
                                    }}
                                  />
                                </div>
                                <span className="text-danger pl-2">
                                  {this.state.errorMsg[2]}
                                </span>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-md-5  px-4">
                                <p className="text-muted">
                                {language.option} 3 <abbr className="text-danger"> *</abbr>
                                </p>
                                <span id="option3">
                                  <FontAwesomeIcon
                                    className="tooltip-info"
                                    icon={faCommentAlt}
                                  />
                                  <FontAwesomeIcon
                                    className="question-icon"
                                    icon={faQuestion}
                                  />
                                </span>
                                <UncontrolledTooltip
                                  placement="right"
                                  target="option3"
                                >
                                   {language.option}3
                            </UncontrolledTooltip>
                              </div>
                              <div className="col-md-12">
                                <div className="textarea-size">
                                  <Editor
                                    editorState={this.state.itemBankOption3}
                                    wrapperClassName="demo-wrapper"
                                    editorClassName="demo-editor"
                                    onEditorStateChange={this.onEditorStateChangeChoice3}
                                    toolbar={{
                                      options: ['inline', 'blockType'],
                                      inline: { options: ['bold', 'italic', 'underline'] }
                                    }}
                                  />
                                </div>
                                <span className="text-danger pl-2">
                                  {this.state.errorMsg[3]}
                                </span>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-5  px-4">
                                <p className="text-muted">
                                {language.option} 4 <abbr className="text-danger"> *</abbr>
                                </p>
                                <span id="option4">
                                  <FontAwesomeIcon
                                    className="tooltip-info"
                                    icon={faCommentAlt}
                                  />
                                  <FontAwesomeIcon
                                    className="question-icon"
                                    icon={faQuestion}
                                  />
                                </span>
                                <UncontrolledTooltip
                                  placement="right"
                                  target="option4"
                                >
                                  {language.option}4
                            </UncontrolledTooltip>
                              </div>
                              <div className="col-md-12">
                                <div className="textarea-size">
                                  <Editor
                                    editorState={this.state.itemBankOption4}
                                    wrapperClassName="demo-wrapper"
                                    editorClassName="demo-editor"
                                    onEditorStateChange={this.onEditorStateChangeChoice4}
                                    toolbar={{
                                      options: ['inline', 'blockType'],
                                      inline: { options: ['bold', 'italic', 'underline'] }
                                    }}
                                  />
                                </div>
                                <span className="text-danger pl-2">
                                  {this.state.errorMsg[4]}
                                </span>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-md-5  px-4">
                                <p className="text-muted"> {language.option} 5</p>
                                <span id="option5">
                                  <FontAwesomeIcon
                                    className="tooltip-info"
                                    icon={faCommentAlt}
                                  />
                                  <FontAwesomeIcon
                                    className="question-icon"
                                    icon={faQuestion}
                                  />
                                </span>
                                <UncontrolledTooltip
                                  placement="right"
                                  target="option5"
                                >
                                   {language.option}5
                            </UncontrolledTooltip>
                              </div>
                              <div className="col-md-12">
                                <div className="textarea-size">
                                  <Editor
                                    editorState={this.state.itemBankOption5}
                                    wrapperClassName="demo-wrapper"
                                    editorClassName="demo-editor"
                                    onEditorStateChange={this.onEditorStateChangeChoice5}
                                    toolbar={{
                                      options: ['inline', 'blockType'],
                                      inline: { options: ['bold', 'italic', 'underline'] }
                                    }}
                                  />

                                </div>
                                <span className="text-danger pl-2">
                                  {this.state.errorMsg[5]}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="row answer-explanation">
                            <div className="col-md-6  px-4">
                              <p>
                                  {language.distractor_rationale}{" "}
                                <abbr className="text-danger"> *</abbr>
                              </p>
                              <span id="explanation">
                                <FontAwesomeIcon
                                  className="tooltip-info"
                                  icon={faCommentAlt}
                                />
                                <FontAwesomeIcon
                                  className="question-icon"
                                  icon={faQuestion}
                                />
                              </span>
                              <UncontrolledTooltip
                                placement="right"
                                target="explanation"
                              >
                                {language.explanation}
                          </UncontrolledTooltip>
                            </div>
                            <div className="col-md-12">
                              <Editor
                                editorState={this.state.distractor}
                                wrapperClassName="demo-wrapper"
                                editorClassName="demo-editor"
                                onEditorStateChange={this.onEditorStateDistractorChange}
                                toolbar={{
                                  options: ['inline', 'blockType'],
                                  inline: { options: ['bold', 'italic', 'underline'] }
                                }}
                              />
                            </div>
                            <span className="text-danger pl-2">
                              {this.state.errorMsg[6]}
                            </span>
                          </div>
                          <div className="textarea-size">
                            <Row className="py-2 pt-3 row border-top">
                              <Col md="3" className="">
                                <p
                                  className="reviewed-checkbox"
                                  htmlFor="transferCheckbox"
                                >
                                  {language.have_you_reviewed}
                            </p>
                              </Col>
                              <Col>
                                <div className="custom-checkbox custom-control mt-1">
                                  <input
                                    name="transfer"
                                    type="checkbox"
                                    id="transferCheckbox"
                                    className="custom-control-input"
                                    checked={this.state.isTransferChecked}
                                    onChange={this.toggleTransferChecked}
                                  />
                                  <label
                                    className="custom-control-label ada-font-size"
                                    for="transferCheckbox"
                                  >
                                  {language.yes}
                              </label>
                                </div>
                              </Col>
                            </Row>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                    <div className="container-fluid">
                      <Row>
                        <Col xs="12" sm="12" md="5" lg="5" xl="5"></Col>
                        <Col
                          xs="12"
                          sm="12"
                          md="7"
                          lg="7"
                          xl="7"
                          className="text-right msedge-btn-sm-center"
                        >
                          <div className="form-group">
                            {!this.state.isLoading ? (
                              <span class="msedge-questions-start msedge-right-br mr-2">
                                <button
                                  type="submit"
                                  className="btn btn-outline-primary"
                                  disabled={!this.state.canSubmit}
                                  style={{ cursor: this.state.cursorDisable }}
                                >
                                  <li>
                                    <i class="pe-7s-note" aria-hidden="true"></i>
                                  </li>
                            <li class="text-uppercase">{language.update}</li>
                                </button>
                              </span>
                            ) : (
                                <span class="msedge-questions-start msedge-right-br mr-2">
                                  <button
                                    class="btn btn-primary mr-2"
                                    type="button"
                                    disabled
                                  >
                                    <li>
                                      <span
                                        class="spinner-border spinner-border-sm mr-2"
                                        role="status"
                                        aria-hidden="true"
                                      ></span>
                                    </li>
                                    <li className="text-uppercase">
                                      {language.buttonLoading}
                                    </li>
                                  </button>
                                </span>
                              )}
                            <span class="msedge-questions-start msedge-right-br">
                              <Link to="/proof-reader">
                                <button
                                  type="button"
                                  className="btn btn-outline-primary"
                                >
                                  <li>
                                    <i class="pe-7s-back" aria-hidden="true"></i>
                                  </li>
                            <li class="text-uppercase">{language.back}</li>
                                </button>
                              </Link>
                            </span>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </Card>
                </div>
              </Row>
            </Formsy>
          </div>
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    listData: state.main.data,
    isLoading: state.main.load
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { currentState },
    dispatch
  );
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemUpdate);