import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Collapse,
  Tooltip,
  Table,
  Col, Row,
  UncontrolledTooltip,
} from "reactstrap";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentAlt,
  faQuestion,
  faQuestionSquare
} from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import "../../../../../assets/custom/admin/_admin_item_bank.scss";

//import { Row } from "antd";
const preferenceStatus= [
  { value: "published", label: "Published" },
  { value: "unpublish", label: "unpublish" },
];
const questionScoreType = [
  { value: "per-question", label: "Per Question" },
  { value: "multiple-question", label: "Multiple Question" },
];
const questionScoreFeatures = [
  { value: "published", label: "Published" },
  { value: "unpublish", label: "Unpublish" },
];
const contentTypeTag=[
  { value: "qlts", label: "QLTS" },
  { value: "option2", label: "Option2" },
];
const questionTypeTag=[
  { value: "qlts-exam", label: "QLTS Exam" },
  { value: "option2", label: "Option2" },
];
const subjectTag=[
  { value: "exam-legal", label: "Exam legal system and EU law" },
  { value: "option2", label: "Option2" },
];
export class Perferences extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accordion: [true, true, true],
      tooltipOpen: false,
      selectedoptions: null,
      selectedscoring: null,
      selectedstatus: null,

    };
    this.toggleAccordion = this.toggleAccordion.bind(this);
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }
  toggleAccordion(tab) {
    const prevState = this.state.accordion;
    const state = prevState.map((x, index) => (tab === index ? !x : false));
    this.setState({
      accordion: state
    });
  }
  handleChange = selectedoptions => {
    this.setState({ selectedoptions });
  };
  changecoring = selectedscoring => {
    this.setState({ selectedscoring });
  }
  changestatus = selectedstatus => {
    this.setState({ selectedstatus });
  }
  render() {
    const { selectedoptions } = this.state;
    const { selectedscoring } = this.state;
    const { selectedstatus } = this.state;
    return (
      <div className='mt-4 p-3'>
        <div id="accordion" className="accordion-wrapper   mb-3">
          <Card className="">
            <CardHeader id="headingOne">
              <Button
                block
                color="link"
                className="text-left m-0 p-0"
                onClick={() => this.toggleAccordion(0)}
                aria-expanded={this.state.accordion[0]}
                aria-controls="collapseOne"
              >
                <h6 className="m-0 p-0 font-weight-500">Details</h6>
                <i className="pe-7s-angle-down down-arrow text-muted float-right ">
                  {" "}
                </i>
              </Button>
            </CardHeader>
            <Collapse
              isOpen={this.state.accordion[0]}
              data-parent="#accordion"
              id="collapseOne"
              aria-labelledby="headingOne"
            >
              <CardBody>
                <div className="row mt-1">
                  <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    <div className="d-flex">
                      <h6 >Status</h6>
                      <div id="status" className="pl-2"><FontAwesomeIcon className="tooltip-info" icon={faCommentAlt} />
                        <FontAwesomeIcon
                          className="question-icon text-white"

                          icon={faQuestion}
                        /></div>
                      <UncontrolledTooltip placement="right" target="status">
                        Select status
                      </UncontrolledTooltip>
                    </div>

                    <Select
                      onChange={this.props.preferenceStatus}
                      options={preferenceStatus}
                      defaultValue={this.props.fields.rowData.preferenceStatus}
                    />
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    <div className="d-flex">
                      <h6>Reference</h6>
                      <div id="status" className="pl-2"><FontAwesomeIcon className="tooltip-info" icon={faCommentAlt} />
                        <FontAwesomeIcon
                          className="question-icon text-white"
                          icon={faQuestion}
                        />
                        </div>
                        <UncontrolledTooltip placement="right" target="status">
                        Add Reference
                      </UncontrolledTooltip>
                    </div>
                    <input
                      type="text"
                      class="form-control"
                      id="option1"
                      placeholder="Enter reference"
                      value={this.props.fields.rowData.addReference}
                      onChange={(e)=>this.props.fieldHandler("addReference",e)}
                    />
                                      <span className="text-danger">
                            {this.props.fields.errorMsg[10]}
                          </span>
                  </div>

                </div>
                <div className="row mt-3">
                  <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    <div className="d-flex">
                      <h6>Description</h6>
                      <div id="description" className="pl-2"><FontAwesomeIcon className="tooltip-info" icon={faCommentAlt} />
                        <FontAwesomeIcon
                          className="question-icon text-white"
                          icon={faQuestion}
                        /></div>
                      <UncontrolledTooltip placement="right" target="description">
                        Add description
                      </UncontrolledTooltip>
                    </div>
                    <input
                      type="text"
                      class="form-control"
                      id="option1"
                      placeholder="Enter description"
                      value={this.props.fields.rowData.addDescription}
                      onChange={(e)=>this.props.fieldHandler("addDescription",e)}
                    />
                         <span className="text-danger">
                            {this.props.fields.errorMsg[11]}
                          </span>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    <div className="d-flex">
                      <h6>Source</h6>
                      <div id="source" className="pl-2"><FontAwesomeIcon className="tooltip-info" icon={faCommentAlt} />
                        <FontAwesomeIcon
                          className="question-icon text-white"
                          icon={faQuestion}
                        /></div>
                      <UncontrolledTooltip placement="right" target="source">
                        Add source
                      </UncontrolledTooltip>
                    </div>
                    <input
                      type="text"
                      class="form-control"
                      id="option1"
                      placeholder="Enter source here.."
                      value={this.props.fields.rowData.addSource}
                      onChange={(e)=>this.props.fieldHandler("addSource",e)}
                    />
                            <span className="text-danger">
                            {this.props.fields.errorMsg[12]}
                          </span>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    <div className="d-flex">
                      <h6>Note</h6>
                      <div id="note" className="pl-2"><FontAwesomeIcon className="tooltip-info" icon={faCommentAlt} />
                        <FontAwesomeIcon
                          className="question-icon text-white"
                          icon={faQuestion}
                        /></div>
                      <UncontrolledTooltip placement="right" target="note">
                        Add Note
                      </UncontrolledTooltip>
                    </div>
                    <input
                      type="text"
                      class="form-control"
                      id="option1"
                      placeholder="Add note here"
                      value={this.props.fields.rowData.addNote}
                      onChange={(e)=>this.props.fieldHandler("addNote",e)}
                    />
                           <span className="text-danger">
                            {this.props.fields.errorMsg[13]}
                          </span>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    <div className="d-flex">
                      <h6>Acknowledgements</h6>
                      <div id="Acknowledgements" className="pl-2"><FontAwesomeIcon className="tooltip-info" icon={faCommentAlt} />
                        <FontAwesomeIcon
                          className="question-icon text-white"
                          icon={faQuestion}
                        /></div>
                      <UncontrolledTooltip placement="right" target="Acknowledgements">
                        Add Acknowledgements
                      </UncontrolledTooltip>
                    </div>
                    <input
                      type="text"
                      class="form-control"
                      id="option1"
                      placeholder="Enter acknowledments here"
                      value={this.props.fields.rowData.addAcknowledgement}
                      onChange={(e)=>this.props.fieldHandler("addAcknowledgement",e)}
                    />
                          <span className="text-danger">
                            {this.props.fields.errorMsg[14]}
                          </span>
                  </div>
                </div>


              </CardBody>
            </Collapse>
          </Card>
          <Card>
            <CardHeader className="b-radius-0" id="headingTwo">
              <Button
                block
                color="link"
                className="text-left m-0 p-0"
                onClick={() => this.toggleAccordion(1)}
                aria-expanded={this.state.accordion[1]}
                aria-controls="collapseTwo"
              >
                <h6 className="m-0 p-0 font-weight-500">Question & Feature</h6>
                <i className="pe-7s-angle-down down-arrow text-muted float-right ">
                  {" "}
                </i>
              </Button>
            </CardHeader>
            <Collapse
              isOpen={this.state.accordion[1]}
              data-parent="#accordion"
              id="collapseTwo"
            >
              <CardBody>
                <div className="row">
                  <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 p-4 border-right">
                    <div className="d-flex">
                      <h6 className="mr-3">Question</h6>
                      <p className="Add-btn pr-2 pl-2"><Link className="Add-btn">Add</Link></p>
                    </div>
                    <div >
                      <div className="d-flex"><h6>Scoring type</h6>
                        <div id="Scoring" className="pl-2"><FontAwesomeIcon className="tooltip-info" icon={faCommentAlt} />
                          <FontAwesomeIcon
                            className="question-icon text-white"
                            icon={faQuestion}
                          /></div>
                        <UncontrolledTooltip placement="right" target="Scoring">
                          Select scoring type
                      </UncontrolledTooltip>
                      </div>
                      <div>
                        <Select
                          onChange={this.props.questionScoreType}
                          options={questionScoreType}
                          defaultValue={this.props.fields.rowData.questionScoreType}
                          />
                        <div className="pt-2">
                          <Table className="mb-0" bordered>
                            <thead>
                              <tr>
                                <th className="text-center">Type</th>
                                <th className="text-center">Tag</th>
                                <th className="text-center">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="text-center">AAQ0581</td>
                                <td className="text-center">MCQ</td>
                                <td className="text-center">
                                  <div className=" font-icon-sm">
                                    <i className="pe-7s-trash  trash-icon"> </i>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 p-4 col-md-6 col-lg-6">
                    <div className="d-flex">
                      <h6 className="mr-3">Feature</h6>
                      <p className="Add-btn pr-2 pl-2"><Link className="Add-btn">Add</Link></p>
                    </div>
                    <div>
                      <div className="d-flex"><h6>Status</h6>
                        <div id="Status" className="pl-2"><FontAwesomeIcon className="tooltip-info" icon={faCommentAlt} />
                          <FontAwesomeIcon
                            className="question-icon text-white"
                            icon={faQuestion}
                          /></div>
                        <UncontrolledTooltip placement="right" target="Status">
                          Select status
                      </UncontrolledTooltip>
                      </div>
                      <div>
                        <Select
                          onChange={this.props.questionScoreFeatures}
                          options={questionScoreFeatures}
                          defaultValue={this.props.fields.rowData.questionScoreFeatures}
                          />
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Collapse>
          </Card>
          <Card>
            <CardHeader id="headingThree">
              <Button
                block
                color="link"
                className="text-left m-0 p-0"
                onClick={() => this.toggleAccordion(2)}
                aria-expanded={this.state.accordion[2]}
                aria-controls="collapseThree"
              >
                <h6 className="m-0 p-0 font-weight-500">Tag</h6>
                <i className="pe-7s-angle-down down-arrow text-muted float-right "> </i>
              </Button>
            </CardHeader>
            <Collapse
              isOpen={this.state.accordion[2]}
              data-parent="#accordion"
              id="collapseThree"
            >
              <CardBody>
                <div className="d-flex">
                  <h6 className="mr-3">Tags</h6>
                  <p className="Add-btn pr-2 pl-2"><Link className="Add-btn">Add</Link></p>
                </div>
                <div>
                  <Row className="border">
                    <Col md="4" className="text-left"><p className="m-0 p-2">Type</p></Col>
                    <Col md="8" className="text-left"><p className="m-0 p-2">Tag</p></Col>
                  </Row>
                  <Row className="border">
                    <Col md="4" className="text-left"><p className="m-0 p-2">Content type</p></Col>
                    <Col md="8" className="text-left">
                      <div className="m-1 p-1">
                      <Select
                        closeMenuOnSelect={false}
                        defaultValue={[contentTypeTag[0], contentTypeTag[1]]}
                        isMulti
                        options={contentTypeTag}
                        onChange={this.props.contentTypeTag}
                      />
                      </div></Col>
                  </Row>
                  <Row className="border">
                    <Col md="4" className="text-left"><p className="m-0 p-2">Question type</p></Col>
                    <Col md="8" className="text-left">
                      <div className="m-1 p-1">
                      <Select
                        closeMenuOnSelect={false}
                        defaultValue={[questionTypeTag[0], questionTypeTag[1]]}
                        isMulti
                        options={questionTypeTag}
                        onChange={this.props.questionTypeTag}
                      />
                      </div></Col>
                  </Row>
                  <Row className="border">
                    <Col md="4" className="text-left"><p className="m-0 p-2">Subject</p></Col>
                    <Col md="8" className="text-left">
                      <div className="m-1 p-1">
                      <Select
                        closeMenuOnSelect={false}
                        // defaultValue={[subjectTag[0], subjectTag[1]]}
                        defaultValue={this.props.fields.rowData.subjectTag}
                        isMulti
                        options={subjectTag}
                        onChange={this.props.subjectTag}
                      />
                      </div></Col>
                  </Row>
                </div>
              </CardBody>
            </Collapse>
          </Card>
        </div>
      </div>
    );
  }
}
export default Perferences;
