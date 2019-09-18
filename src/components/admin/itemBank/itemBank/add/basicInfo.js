import React, { Component } from "react";
import { Card, CardBody } from "reactstrap";
import { UncontrolledTooltip } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentAlt, faQuestion } from "@fortawesome/free-solid-svg-icons";
const options = ['option 1', 'option 2', 'option 3', 'option 4', 'option 5']
export default class BasicInfo extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      tooltipOpen: false
    };
  }
  toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }
  render() {
    return (
      <div>
                {console.log("dataa hereee", this.props)}

        <h6>
          <strong className="text-primary">
            <div className="d-flex">
              <div className="pl-2 pt-4">
                <h6 className="sub-heading">AAQ056</h6>
              </div>
              <div className="pt-4 pl-2" id="subHeading">
                <FontAwesomeIcon className="tooltip-info" icon={faCommentAlt} />
                <FontAwesomeIcon
                  className="question-icon text-white"
                  icon={faQuestion}
                />
                <UncontrolledTooltip placement="right" target="subHeading">
                  Sub heading!
                                </UncontrolledTooltip>
              </div>
            </div>
          </strong>
        </h6>
        <Card>
          <CardBody>
            <div className="border-bottom ">
              <h6 className="text-primary pl-2 pb-2">
                {" "}
                <strong>Item</strong>
              </h6>
            </div>
            <div>
              <p className="text-primary pt-3 pl-2">
                <strong>Question</strong>
              </p>
              <textarea rows="6" className="col-md-12" value={this.props.fields.rowData.question} onChange={(e)=>this.props.fieldHandler("question",e)}>
              </textarea>
              <span className="text-danger">
                            {this.props.fields.errorMsg[0]}
                          </span>
              <div>
                <h6>
                  <strong className="text-primary">
                    <div className="d-flex border-bottom border-top">
                      <div className="pl-2 py-3">
                        <h6 className="font-weight-bold">Multiple Choice Questions</h6>
                      </div>
                      <div className="pt-3 pl-2" id="multipleChoice">
                        <FontAwesomeIcon className="tooltip-info" icon={faCommentAlt} />
                        <FontAwesomeIcon
                          className="question-icon text-white"
                          icon={faQuestion}
                        />
                      </div>
                    </div>
                    <UncontrolledTooltip placement="right" target="multipleChoice">
                      multiple Choice!
                                        </UncontrolledTooltip>
                  </strong>
                </h6>
                <div>

                      <div class="row">
                        <div class="col-sm-12 ml-2">
                          <div className="d-flex">
                            <h6 className="text-muter pt-3">Option 1</h6>
                            <div className="pt-3 pl-2 mt-0" id={`index${1}one`}>
                              <FontAwesomeIcon className="tooltip-info" icon={faCommentAlt} />
                              <FontAwesomeIcon
                                className="question-icon text-white"
                                icon={faQuestion}
                              />
                            </div>
                          </div>
                          <UncontrolledTooltip placement="right" target={`index${1}one`}>
                            Sub heading!
                          </UncontrolledTooltip>
                        </div>
                        <div className="col-md-10 pb-1">
                          <input
                            type="text"
                            class="form-control"
                            id="option1"
                            placeholder=""
                            value={this.props.fields.rowData.option1}
                            onChange={(e)=>this.props.fieldHandler("option1", e)}
                          />
                        </div>
                      </div>
                      <span className="text-danger">
                            {this.props.fields.errorMsg[1]}
                          </span>

                      <div class="row">
                        <div class="col-sm-12 ml-2">
                          <div className="d-flex">
                            <h6 className="text-muter pt-3">Option 2</h6>
                            <div className="pt-3 pl-2 mt-0" id={`index${2}one`}>
                              <FontAwesomeIcon className="tooltip-info" icon={faCommentAlt} />
                              <FontAwesomeIcon
                                className="question-icon text-white"
                                icon={faQuestion}
                              />
                            </div>
                          </div>
                          <UncontrolledTooltip placement="right" target={`index${2}one`}>
                            Sub heading!
                          </UncontrolledTooltip>
                        </div>
                        <div className="col-md-10 pb-1">
                          <input
                            type="text"
                            class="form-control"
                            id="option1"
                            placeholder=""
                            value={this.props.fields.rowData.option2}
                            onChange={(e)=>this.props.fieldHandler("option2",e)}
                          />
                        </div>
                      </div>
                      <span className="text-danger">
                            {this.props.fields.errorMsg[2]}
                          </span>

                      <div class="row">
                        <div class="col-sm-12 ml-2">
                          <div className="d-flex">
                            <h6 className="text-muter pt-3">Option 3</h6>
                            <div className="pt-3 pl-2 mt-0" id={`index${3}one`}>
                              <FontAwesomeIcon className="tooltip-info" icon={faCommentAlt} />
                              <FontAwesomeIcon
                                className="question-icon text-white"
                                icon={faQuestion}
                              />
                            </div>
                          </div>
                          <UncontrolledTooltip placement="right" target={`index${3}one`}>
                            Sub heading!
                          </UncontrolledTooltip>
                        </div>
                        <div className="col-md-10 pb-1">
                          <input
                            type="text"
                            class="form-control"
                            id="option1"
                            placeholder=""
                            value={this.props.fields.rowData.option3}
                            onChange={(e)=>this.props.fieldHandler("option3",e)}
                          />
                        </div>
                      </div>
                      <span className="text-danger">
                            {this.props.fields.errorMsg[3]}
                          </span>

                      <div class="row">
                        <div class="col-sm-12 ml-2">
                          <div className="d-flex">
                            <h6 className="text-muter pt-3">Option 4</h6>
                            <div className="pt-3 pl-2 mt-0" id={`index${4}one`}>
                              <FontAwesomeIcon className="tooltip-info" icon={faCommentAlt} />
                              <FontAwesomeIcon
                                className="question-icon text-white"
                                icon={faQuestion}
                              />
                            </div>
                          </div>
                          <UncontrolledTooltip placement="right" target={`index${4}one`}>
                            Sub heading!
                          </UncontrolledTooltip>
                        </div>
                        <div className="col-md-10 pb-1">
                          <input
                            type="text"
                            class="form-control"
                            id="option1"
                            placeholder=""
                            value={this.props.fields.rowData.option4}
                            onChange={(e)=>this.props.fieldHandler("option4",e)}
                          />
                        </div>
                      </div>
                      <span className="text-danger">
                            {this.props.fields.errorMsg[4]}
                          </span>

                      <div class="row">
                        <div class="col-sm-12 ml-2">
                          <div className="d-flex">
                            <h6 className="text-muter pt-3">Option 5</h6>
                            <div className="pt-3 pl-2 mt-0" id={`index${5}one`}>
                              <FontAwesomeIcon className="tooltip-info" icon={faCommentAlt} />
                              <FontAwesomeIcon
                                className="question-icon text-white"
                                icon={faQuestion}
                              />
                            </div>
                          </div>
                          <UncontrolledTooltip placement="right" target={`index${5}one`}>
                            Sub heading!
                          </UncontrolledTooltip>
                        </div>
                        <div className="col-md-10 pb-1">
                          <input
                            type="text"
                            class="form-control"
                            id="option1"
                            placeholder=""
                            value={this.props.fields.rowData.option5}
                            onChange={(e)=>this.props.fieldHandler("option5",e)}
                          />
                        </div>
                      </div>
                      <span className="text-danger">
                            {this.props.fields.errorMsg[5]}
                          </span>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }
}