import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Collapse,
  Col,
  Row,
  UncontrolledTooltip
} from "reactstrap";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentAlt, faQuestion } from "@fortawesome/free-solid-svg-icons";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { subjectList, civilProcedure, constitutionalLaw, contracts, criminalLaw, evidence, realProperty, torts } from '../../../../../components/commonComponents/subjectTopics'
import { instance } from '../../../../../actions/constants';
import { language } from '../../../../../utils/locale/locale'

const preferenceStatus = [
  // { value: 1, label: "Published" },
  // { value: 2, label: "Review Inprogress" },
  // { value: 3, label: "Reviewed" },
  { value: 4, label: "Draft" },
  // { value: 5, label: "Inactive" },
  // { value: 6, label: "Deleted" },
];

class Perferences extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accordion: [true, true, true],
      options: [],
      contentTypeTag: [],
      contentTypeTagList: []
    };
  }

  toggleAccordion = (tab) => {
    const prevState = this.state.accordion;
    const state = prevState.map((x, index) => (tab === index ? !x : false));
    this.setState({
      accordion: state
    });
  }
  componentDidMount() {
    instance.get("admin/itemtags", {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,        
      }
    })
      .then(res => {
        if (res.data.data != false || res.data.data === []) {
          this.setState({
            contentTypeTagList: res.data.data
          });
          const data = res.data.data === null || res.data.data === "" ? [] : res.data.data.filter(value => {
            return value.itemTagStatus === "y" ? value.itemTagStatus : "";
          });
          let result = data.map((value) => {
            return { value: value.itemTagName, label: value.itemTagName };
          });
          this.setState({ contentTypeTag: result });
        }
      });
  }

  componentWillReceiveProps(options) {
    if (options) {
      const values = [
        { value: "A", optionLabel: "A", answer: this.props.options.itemBankOption1 },
        { value: "B", optionLabel: "B", answer: this.props.options.itemBankOption2 },
        { value: "C", optionLabel: "C", answer: this.props.options.itemBankOption3 },
        { value: "D", optionLabel: "D", answer: this.props.options.itemBankOption4 },
        { value: "E", optionLabel: "E", answer: this.props.options.itemBankOption5 }
      ];
      this.setState({
        options: values
      });
    }
  }

  render() {
    return (
      <div className="mt-4 p-3">
        <div className="msedge-preferences">
          <div id="accordion" className="msedge-accordion-wrapper mb-3">
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
                  <h6 className="m-0 p-0 font-weight-500 text-primary">
                    Details
                  </h6>
                  <i className="pe-7s-angle-down down-arrow text-muted float-right prefer-down-arrow">
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
                      <div className="pb-3">
                        <div className="d-flex">
                          <label className="fieldname-font-size">
                            {language.status} <abbr className="text-danger">*</abbr>
                          </label>
                          <div id="status" className="info-icons pl-2">
                            <FontAwesomeIcon
                              className="tooltip-info"
                              icon={faCommentAlt}
                            />
                            <FontAwesomeIcon
                              className="question-icon"
                              icon={faQuestion}
                            />
                          </div>
                          <UncontrolledTooltip
                            placement="right"
                            target="status"
                          >
                            {language.select_status}
                          </UncontrolledTooltip>
                        </div>

                        <Select
                          aria-label="status"
                          value={this.props.selectedStatus}
                          onChange={this.props.preferenceStatus}
                          labelKey="label"
                          valueKey="value"
                          options={preferenceStatus}
                        />
                      </div>
                    </div>
                    <div className="border-left col-xs-12 col-sm-12 col-md-6 col-lg-6">
                      <div className="d-flex">
                        <label className="fieldname-font-size">
                          {language.valid_response} <abbr className="text-danger">*</abbr>
                        </label>
                        <div className="info-icons" id="validResponse">
                          <FontAwesomeIcon
                            className="tooltip-info ml-2"
                            icon={faCommentAlt}
                            id="validResponse"
                          />
                          <FontAwesomeIcon
                            className="question-icon"
                            icon={faQuestion}
                          />
                        </div>
                      </div>
                      <UncontrolledTooltip
                        placement="right"
                        target="validResponse"
                      >
                        {language.select_resposnse}
                      </UncontrolledTooltip>
                      <div className="py-3">
                        {this.props.options.map((option, index) => (
                          <Col
                            md="2"
                            className={
                              this.props.fields.SelectedValuesforValuesIndex ===
                                index
                                ? "item-bank-value-list-selected float-left mr-2 py-3 text-center"
                                : "item-bank-value-list-not-selected float-left mr-2 py-3 text-center"
                            }
                            htmlFor={index}
                            onClick={e =>
                              this.props.selectedValueForValue(
                                index,
                                option.answer,
                                e
                              )
                            }
                          >
                            <span>{option.optionLabel}</span>
                          </Col>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6"></div>
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
                  onClick={() => this.toggleAccordion(1)}
                  aria-expanded={this.state.accordion[1]}
                  aria-controls="collapseThree"
                >
                  <h6 className="m-0 p-0 font-weight-500 text-primary">
                    {language.meta_data}
                  </h6>
                  <i className="pe-7s-angle-down down-arrow text-muted float-right prefer-down-arrow"></i>
                </Button>
              </CardHeader>
              <Collapse
                isOpen={this.state.accordion[1]}
                data-parent="#accordion"
                id="collapseThree"
              >
                <CardBody>
                  <div className="d-flex">
                    <p className="item-bank-add-ada">
                          {language.distractor_rationale}{" "}
                      <abbr className="text-danger">*</abbr>
                    </p>
                    <div className="info-icons" id="distractorRationale">
                      <FontAwesomeIcon
                        className="tooltip-info ml-2"
                        icon={faCommentAlt}
                      />
                      <FontAwesomeIcon
                        className="question-icon"
                        icon={faQuestion}
                      />
                    </div>
                  </div>
                  <UncontrolledTooltip
                    placement="right"
                    target="distractorRationale"
                  >
                    {language.enter_explanation}
                  </UncontrolledTooltip>
                  <Editor
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    editorState={this.props.fields.rationaleState}
                    onEditorStateChange={this.props.onEditorRationaleStateChange}
                    toolbar={{
                      options: ['inline', 'blockType'],
                      inline: { options: ['bold', 'italic', 'underline'] }
                    }}
                  />
                  <span className="text-danger">
                    {this.props.fields.errorMsg[6]}
                  </span>
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
  <h6 className="m-0 p-0 font-weight-500 text-primary">{language.tag}</h6>
                  <i className="pe-7s-angle-down down-arrow text-muted float-right prefer-down-arrow">
                    {" "}
                  </i>
                </Button>
              </CardHeader>
              <Collapse
                isOpen={this.state.accordion[2]}
                data-parent="#accordion"
                id="collapseThree"
              >
                <CardBody>
                  <div>
                    <Row className="">
                      <Col md="4" className="text-left">
                        <p className="m-0 p-2 add-item-dese">
                          {language.tags} 
                          {/* <abbr className="text-danger">*</abbr> */}
                        </p>
                      </Col>
                      <Col md="8" className="text-left">
                        <div className="m-1 p-1">
                          <Select
                            aria-label="content type"
                            closeMenuOnSelect={false}
                            isMulti
                            options={this.state.contentTypeTag}
                            onChange={this.props.contentTypeTag}
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row className="">
                      <Col md="4" className="text-left">
                        <p className="m-0 p-2 add-item-dese">
                          {language.subject_or} <abbr className="text-danger">*</abbr>
                        </p>
                      </Col>
                      <Col md="8" className="text-left">
                        <div className="m-1 p-1">
                          <Select
                            aria-label="select subject"
                            value={this.props.selectedSubjectValue}
                            onChange={this.props.selectedSubject}
                            labelKey="label"
                            valueKey="value"
                            options={subjectList}
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row className="">
                      <Col md="4" className="text-left">
                        <p className="m-0 p-2 add-item-dese">
                          {language.topic} <abbr className="text-danger">*</abbr>
                        </p>
                      </Col>
                      <Col md="8" className="text-left">
                        <div className="m-1 p-1">
                          <Select
                            aria-label="select subject"
                            value={this.props.selectedTopicValue}
                            onChange={this.props.selectedTopic}
                            labelKey="label"
                            valueKey="value"
                            options={this.props.toggleTopicOnValue === 1 ? civilProcedure :
                              this.props.toggleTopicOnValue === 2 ? constitutionalLaw :
                                this.props.toggleTopicOnValue === 3 ? contracts :
                                  this.props.toggleTopicOnValue === 4 ? criminalLaw :
                                    this.props.toggleTopicOnValue === 5 ? evidence :
                                      this.props.toggleTopicOnValue === 6 ? realProperty :
                                        this.props.toggleTopicOnValue === 7 ? torts : [{ value: '', label: 'No options' }]

                            }
                          />
                        </div>
                      </Col>
                    </Row>
                  </div>
                </CardBody>
              </Collapse>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}
export default Perferences;