import React, { Component } from "react";
import { Card, CardBody } from "reactstrap";
import { UncontrolledTooltip } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentAlt, faQuestion } from "@fortawesome/free-solid-svg-icons";
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { tooltipMsg } from '../../../../../components/admin/tooltipMsg';
import { language } from '../../../../../utils/locale/locale'

export default class BasicInfo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="msedge-basicinfo">
          <Card>
            <CardBody>

              <div>
                <div className="row">
                  <div className="col-sm-12 ml-2">
                    <div className="d-flex msedge-basicinfo-content">
                      <label className="fieldname-font-size" >
                        {language.reference} <abbr className="text-danger">*</abbr>
                      </label>
                      <div className="info-icons pl-2" id="referance">
                        <FontAwesomeIcon className="tooltip-info" icon={faCommentAlt} />
                        <FontAwesomeIcon
                          className="question-icon"
                          icon={faQuestion}
                        />
                      </div>
                    </div>
                    <UncontrolledTooltip placement="right" target="referance">
                      {tooltipMsg.alphanumeric}
                  </UncontrolledTooltip>
                  </div>

                  <div className="col-md-10 pb-1">
                    <input
                      aria-label="item code"
                      type="text"
                      className="form-control"
                      placeholder=""
                      value={this.props.fields.rowData.itemBankCode}
                      onChange={(e) => this.props.fieldHandler("itemBankCode", e)}
                    />
                  </div>
                </div>
                <span className="text-danger">
                  {this.props.fields.errorMsg[0]}
                </span>
                <span className="text-danger">
                  {this.props.fields.errorMsg[17]}
                </span>
                <div className="row">
                  <div className="col-sm-12 ml-2">
                    <div className="d-flex msedge-basicinfo-content">
                      <label className="fieldname-font-size" >
                        {language.stimulus} <abbr className="text-danger">*</abbr>
                      </label>
                      <div className="info-icons pl-2" id="stimulus">
                        <FontAwesomeIcon className="tooltip-info" icon={faCommentAlt} />
                        <FontAwesomeIcon
                          className="question-icon text-white"
                          icon={faQuestion}
                        />
                      </div>
                    </div>
                    <UncontrolledTooltip placement="right" target="stimulus">
                    {language.stimulus}
                          </UncontrolledTooltip>
                  </div>
                  <div className="col-md-10 pb-1">

                    <Editor
                      wrapperClassName="demo-wrapper"
                      editorClassName="demo-editor"
                      editorState={this.props.fields.editorState}
                      onEditorStateChange={this.props.onEditorStateChange}
                      toolbar={{
                        options: ['inline', 'blockType'],
                        inline: { options: ['bold', 'italic', 'underline'] }
                      }}
                    />
                  </div>
                </div>
                <span className="text-danger">
                  {this.props.fields.errorMsg[1]}
                </span>
                <div >
                  <div className="row">
                    <div className="col-sm-12 ml-2">
                      <div className="d-flex msedeg-mcoption">
                        <label className="" id="" >
                          {language.multiple_choice_option}
                         </label>
                        <div className="info-icons pl-2" id="multiplechoicequestion">
                          <FontAwesomeIcon className="tooltip-info" icon={faCommentAlt} />
                          <FontAwesomeIcon
                            className="question-icon text-white"
                            icon={faQuestion}
                          />
                        </div>
                        <UncontrolledTooltip placement="right" target="multiplechoicequestion">
                        {language.multiple_choice_option}
                    </UncontrolledTooltip>
                      </div>
                      <div className="d-flex msedge-basicinfo-content">
                        <label className="fieldname-font-size" >
                          {language.option} 1 <abbr className="text-danger">*</abbr>
                        </label>
                        <div className="info-icons pl-2" id="option1">
                          <FontAwesomeIcon className="tooltip-info" icon={faCommentAlt} />
                          <FontAwesomeIcon
                            className="question-icon text-white"
                            icon={faQuestion}
                          />
                        </div>
                      </div>
                      <UncontrolledTooltip placement="right" target="option1">
                      {language.option} 1
                    </UncontrolledTooltip>
                    </div>
                    <div className="col-md-10 pb-1">
                      <Editor
                        wrapperClassName="demo-wrapper"
                        editorClassName="demo-editor"
                        editorState={this.props.fields.editorStateChoice1}
                        onEditorStateChange={this.props.onEditorStateChangeChoice1}
                        toolbar={{
                          options: ['inline', 'blockType'],
                          inline: { options: ['bold', 'italic', 'underline'] }
                        }}
                      />
                    </div>
                  </div>
                  <span className="text-danger">
                    {this.props.fields.errorMsg[2]}
                  </span>

                  <div className="row">
                    <div className="col-sm-12 ml-2">
                      <div className="d-flex msedge-basicinfo-content">
                        <label className="fieldname-font-size" >
                        {language.option} 2 <abbr className="text-danger">*</abbr>
                        </label>
                        <div className="info-icons pl-2" id="option2">
                          <FontAwesomeIcon className="tooltip-info" icon={faCommentAlt} />
                          <FontAwesomeIcon
                            className="question-icon text-white"
                            icon={faQuestion}
                          />
                        </div>
                      </div>
                      <UncontrolledTooltip placement="right" target="option2">
                      {language.option} 2
                    </UncontrolledTooltip>
                    </div>
                    <div className="col-md-10 pb-1">
                      <Editor
                        wrapperClassName="demo-wrapper"
                        editorClassName="demo-editor"
                        editorState={this.props.fields.editorStateChoice2}
                        onEditorStateChange={this.props.onEditorStateChangeChoice2}
                        toolbar={{
                          options: ['inline', 'blockType'],
                          inline: { options: ['bold', 'italic', 'underline'] }
                        }}
                      />
                    </div>
                  </div>
                  <span className="text-danger">
                    {this.props.fields.errorMsg[3]}
                  </span>

                  <div className="row">
                    <div className="col-sm-12 ml-2">
                      <div className="d-flex msedge-basicinfo-content">
                        <label className="fieldname-font-size" >
                        {language.option} 3 <abbr className="text-danger">*</abbr>
                        </label>
                        <div className="info-icons pl-2" id="option3">
                          <FontAwesomeIcon className="tooltip-info" icon={faCommentAlt} />
                          <FontAwesomeIcon
                            className="question-icon text-white"
                            icon={faQuestion}
                          />
                        </div>
                      </div>
                      <UncontrolledTooltip placement="right" target="option3">
                      {language.option} 3
                    </UncontrolledTooltip>
                    </div>
                    <div className="col-md-10 pb-1">
                      <Editor
                        wrapperClassName="demo-wrapper"
                        editorClassName="demo-editor"
                        editorState={this.props.fields.editorStateChoice3}
                        onEditorStateChange={this.props.onEditorStateChangeChoice3}
                        toolbar={{
                          options: ['inline', 'blockType'],
                          inline: { options: ['bold', 'italic', 'underline'] }
                        }}
                      />
                    </div>
                  </div>
                  <span className="text-danger">
                    {this.props.fields.errorMsg[4]}
                  </span>

                  <div className="row">
                    <div className="col-sm-12 ml-2">
                      <div className="d-flex msedge-basicinfo-content">
                        <label className="fieldname-font-size" >
                        {language.option} 4 <abbr className="text-danger">*</abbr>
                        </label>
                        <div className="info-icons pl-2" id="option4">
                          <FontAwesomeIcon className="tooltip-info" icon={faCommentAlt} />
                          <FontAwesomeIcon
                            className="question-icon text-white"
                            icon={faQuestion}
                          />
                        </div>
                      </div>
                      <UncontrolledTooltip placement="right" target="option4">
                      {language.option} 4
                    </UncontrolledTooltip>
                    </div>
                    <div className="col-md-10 pb-1">
                      <Editor
                        wrapperClassName="demo-wrapper"
                        editorClassName="demo-editor"
                        editorState={this.props.fields.editorStateChoice4}
                        onEditorStateChange={this.props.onEditorStateChangeChoice4}
                        toolbar={{
                          options: ['inline', 'blockType'],
                          inline: { options: ['bold', 'italic', 'underline'] }
                        }}
                      />
                    </div>
                  </div>
                  <span className="text-danger">
                    {this.props.fields.errorMsg[5]}
                  </span>

                  <div className="row">
                    <div className="col-sm-12 ml-2">
                      <div className="d-flex msedge-basicinfo-content">
                        <label className="fieldname-font-size" >
                        {language.option} 5
                        </label>
                        <div className="info-icons pl-2" id="option5">
                          <FontAwesomeIcon className="tooltip-info" icon={faCommentAlt} />
                          <FontAwesomeIcon
                            className="question-icon text-white"
                            icon={faQuestion}
                          />
                        </div>
                      </div>
                      <UncontrolledTooltip placement="right" target="option5">
                      {language.option} 5
                    </UncontrolledTooltip>
                    </div>
                    <div className="col-md-10 pb-1">
                      <Editor
                        wrapperClassName="demo-wrapper"
                        editorClassName="demo-editor"
                        editorState={this.props.fields.editorStateChoice5}
                        onEditorStateChange={this.props.onEditorStateChangeChoice5}
                        toolbar={{
                          options: ['inline', 'blockType'],
                          inline: { options: ['bold', 'italic', 'underline'] }
                        }}
                      />
                    </div>
                  </div>
                  <span className="text-danger">
                    {this.props.fields.errorMsg[6]}
                  </span>

                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
}