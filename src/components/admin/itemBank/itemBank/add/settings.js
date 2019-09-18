import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Collapse,
  Container,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";
import { Table } from "reactstrap";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentAlt,
  faQuestion,
  faQuestionSquare
} from "@fortawesome/free-solid-svg-icons";
import "../../../../../assets/custom/admin/_admin_item_bank.scss";
import { faBluetooth } from "@fortawesome/free-brands-svg-icons";
import cx from 'classnames';

const fontSelection = [
  { value: "normal", label: "Normal" },
  { value: "small", label: "Small" },
];

const labelType = [
  { value: "alphabets-upper", label: "Alphabets-UpperCase" },
  { value: "alphabets-lower", label: "Alphabets-LowerCase" },
];
const style = [
  { value: "block", label: "Block" },
  { value: "light", label: "Light" },
];
const answerAttempts = [
  { value: "0", label: "0" },
  { value: "1", label: "1" },
];
const minScore = [
  { value: "0", label: "0" },
  { value: "1", label: "1" },
];
const scoreType = [
  { value: "exact-match", label: "Exact Match" },
];
const score = [
  { value: "0", label: "0" },
  { value: "1", label: "1" },
];

const valueOptions=[
  { value: "0", optionLabel:"A", answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry" },
  { value: "1", optionLabel:"B", answer: "Lorem Ipsum is simply dummy text of the printing" },
  { value: "2", optionLabel:"C", answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text" },
  { value: "3", optionLabel:"D", answer: "Lorem Ipsum is simply dummy text of the printings" }

];

const answerStyle={
  backgroundColor:"green"
}

export class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accordion: [true, true, true],
      selectsubheading: "",
      checked:[false],
      selectStyle:"",
      selectedAnswer:"",
      selectAnswerIndex:"",
      yesColor:'',
      ispublished: "Published",
      isToggleOn: true,
      // checkeds: [false, false, false],
    };
    this.toggleAccordion = this.toggleAccordion.bind(this);
  }

  componentDidMount(){
  }
  
  toggleAccordion(tab) {
    const prevState = this.state.accordion;
    const state = prevState.map((x, index) => (tab === index ? !x : false));

    this.setState({
      accordion: state
    });
  }

  // selectAnswer = (index, e) => {
  //   let checked = this.state.selectAnswer ;
  //   checked[index] = !checked[index];
  //   this.setState({
  //     checkeds: checked
  //   });
  // };

  selectAnswer = (index,answer, e) => {
    this.setState({
      selectedAnswer: e.target.value,
      selectAnswerIndex: index
    });
    console.log("answer", answer)
  };

  checkHandler=(index)=>{
      var id = document.getElementById("yess")
      if(index==="yes"){
        const value= answerStyle.backgroundColor
        this.setState({yesColor: value})
        console.log("yes")
      }
      else{
        console.log("no")
      }
  }

  // selectAnswer=(index, answer)=>{
  //   const value= answerStyle.backgroundColor
  //     this.setState({selectStyle:value, yesColor: index})
  //     console.log("index", index)
  // }

  render() {

    const { selectsubheading } = this.state;
    console.log("setting props", this.props)
    return (
      <div className="mt-4 p-3">
        <div id="accordion" className="accordion-wrapper mb-3">
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
                <h6 className="m-0 text-primary p-0 font-weight-500">
                  Formatting
                </h6>
                <i className="pe-7s-angle-down down-arrow text-muted float-right "></i>
              </Button>
            </CardHeader>
            <Collapse
              isOpen={this.state.accordion[0]}
              data-parent="#accordion"
              id="collapseOne"
              aria-labelledby="headingOne"
            >
              <CardBody>
                <div className="row">
                  <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    <div className="d-flex">
                      <p className="text-light-grey">Font Size</p>
                      <FontAwesomeIcon
                        className="tooltip-info ml-2"
                        icon={faCommentAlt}
                        id="fontSize"
                      />
                      <FontAwesomeIcon
                        className="question-icon text-white"
                        icon={faQuestion}
                      />
                    </div>

                    <UncontrolledTooltip placement="right" target="fontSize">
                      Sub heading!
                    </UncontrolledTooltip>
                    <Select
                      classame="py-3"
                      onChange={this.props.fontSetting}
                      options={fontSelection}
                      defaultValue={this.props.fields.rowData.fontSetting}
                      value={this.props.fields.rowData.fontSelection}
                    />

                    <div className="d-flex mt-3">
                      <p className=" text-light-grey">Label Type</p>
                      <FontAwesomeIcon
                        className="tooltip-info ml-2"
                        icon={faCommentAlt}
                        id="labelType"
                      />
                      <FontAwesomeIcon
                        className="question-icon text-white"
                        icon={faQuestion}
                      />
                    </div>

                    <UncontrolledTooltip placement="right" target="labelType">
                      Sub heading!
                    </UncontrolledTooltip>
                    <Select
                      classame="py-3"
                      options={labelType}
                      onChange={this.props.labelType}
                      defaultValue={this.props.fields.rowData.labelType}
                      value={this.props.fields.rowData.labelType}
                    />
                  </div>

                  <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    <p className=" text-light-grey">Style</p>
                    <Select
                      classame="py-3"
                      options={style}
                      onChange={this.props.style}
                      defaultValue={this.props.fields.rowData.style}
                      value={this.props.fields.rowData.style}
                    />
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
                <h6 className="m-0 p-0 font-weight-500">Validation</h6>
                <i className="pe-7s-angle-down down-arrow text-muted float-right "></i>
              </Button>
            </CardHeader>
            <Collapse
              isOpen={this.state.accordion[1]}
              data-parent="#accordion"
              id="collapseTwo"
            >
              <CardBody>
                <div className="row">
                  <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    <div className="d-flex">
                      <p className=" text-light-grey">Check answer attempts</p>
                      <FontAwesomeIcon
                        className="tooltip-info ml-2"
                        icon={faCommentAlt}
                        id="answerAttempts"
                      />
                      <FontAwesomeIcon
                        className="question-icon text-white"
                        icon={faQuestion}
                      />
                    </div>

                    <UncontrolledTooltip
                      placement="right"
                      target="answerAttempts"
                    >
                      Sub heading!
                    </UncontrolledTooltip>
                    <Select
                      classame="py-3"
                      options={answerAttempts}
                      onChange={this.props.answerAttempts}
                      defaultValue={this.props.fields.rowData.answerAttempts}
                    />
                  </div>
                </div>
                <div className="mt-5 row border-top">
                  <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    <div className="d-flex mt-5">
                      <p className=" text-primary font-weight-500 font-weight-normal">
                        Select correct answers
                      </p>
                      <FontAwesomeIcon
                        className="tooltip-info ml-2"
                        icon={faCommentAlt}
                        id="correctAnswers"
                      />
                      <FontAwesomeIcon
                        className="question-icon text-white"
                        icon={faQuestion}
                      />
                    </div>

                    <UncontrolledTooltip
                      placement="right"
                      target="correctAnswers"
                    >
                      Sub heading!
                    </UncontrolledTooltip>
                    <div className="d-flex">
                      <p className=" text-light-grey">
                        Minimun score if attempted
                      </p>
                      <FontAwesomeIcon
                        className="ml-2 tooltip-info"
                        icon={faCommentAlt}
                        id="minimumScore"
                      />
                      <FontAwesomeIcon
                        className="question-icon text-white"
                        icon={faQuestion}
                      />
                    </div>

                    <UncontrolledTooltip
                      placement="right"
                      target="minimumScore"
                    >
                      Sub heading!
                    </UncontrolledTooltip>
                    <Select
                      classame="py-3"
                      options={minScore}
                      onChange={this.props.minScore}
                      defaultValue={this.props.fields.rowData.minScore}
                    />
                    <div className="d-flex mt-3">
                      <p className=" text-light-grey">Scoring type</p>
                      <FontAwesomeIcon
                        className="tooltip-info ml-2"
                        icon={faCommentAlt}
                        id="scoringType"
                      />
                      <FontAwesomeIcon
                        className="question-icon text-white"
                        icon={faQuestion}
                      />
                    </div>

                    <UncontrolledTooltip placement="right" target="scoringType">
                      Sub heading!
                    </UncontrolledTooltip>
                    <Select
                      classame="py-3"
                      options={scoreType}
                      onChange={this.props.scoreType}
                      defaultValue={this.props.fields.rowData.scoreType}
                    />
                    <div className="d-flex mt-3">
                      <p className=" text-light-grey">Unscore/Practice Usage</p>
                      <FontAwesomeIcon
                        className="tooltip-info ml-2"
                        icon={faCommentAlt}
                        id="unscore"
                      />
                      <FontAwesomeIcon
                        className="question-icon text-white"
                        icon={faQuestion}
                      />
                      <UncontrolledTooltip placement="right" target="unscore">
                        Sub heading!
                      </UncontrolledTooltip>
                    </div>
                    <div>
                    <Col md="7 pl-0">
                          <div className="switch has-switch mr-2 mb-2 mr-2" data-on-label="ON"
                              data-off-label="OFF"
                              onClick={this.props.practiceUsageSwitch}>

                              <div className={cx("switch-animate", {
                                  'switch-on': this.props.fields.practiceUsageSwitch,
                                  'switch-off': !this.props.fields.practiceUsageSwitch
                              })}>
                                  <input type="checkbox" id="yesorno" />
                                  <span className="switch-left bg-primary">Yes
                                      </span>
                                  <label>&nbsp;</label>
                                  <span className="switch-right bg-primary">No</span>
                              </div>

                          </div>
                      </Col>
                    </div>
                  </div>
                  <div className="border-left col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    <div className="d-flex mt-5 ">
                      <p className=" text-primary">Valid response</p>
                      <FontAwesomeIcon
                        className="tooltip-info ml-2"
                        icon={faCommentAlt}
                        id="validResponse"
                      />
                      <FontAwesomeIcon
                        className="question-icon text-white"
                        icon={faQuestion}
                      />
                    </div>

                    <UncontrolledTooltip
                      placement="right"
                      target="validResponse"
                    >
                      Sub heading!
                    </UncontrolledTooltip>
                    <div className="d-flex">
                      <p className=" text-light-grey">Score</p>
                      <FontAwesomeIcon
                        className="tooltip-info ml-2"
                        icon={faCommentAlt}
                        id="score"
                      />
                      <FontAwesomeIcon
                        className="question-icon text-white"
                        icon={faQuestion}
                      />
                    </div>

                    <UncontrolledTooltip placement="right" target="score">
                      Sub heading!
                    </UncontrolledTooltip>
                    <Select
                      classame="py-3"
                      onChange={this.props.score}
                      options={score}
                      defaultValue={this.props.fields.rowData.score}
                    />
                    <div>
                      <div className="mt-3 mb-3">
                        <span>Value</span>
                      </div>
                      {/* <Table bordered>
                        <tbody>
                          {valueOptions.map((options,index)=>
                                                   <tr className="admin-itembank-table" style={{color : this.state.yesColor === index ? '#0e6aae' :'', cursor:"pointer"}} onClick={()=>this.selectAnswer(index, options.answer)}>
                                                   <td style={{color : this.state.yesColor === index ? '#0e6aae' :'', cursor:"pointer"}} className="admin-itembank-color text-center text-light-grey" >
                                                     {options.optionLabel}
                                                   </td>
                                                   <td className="itembank-font-weight ">
                                                     {options.answer}
                                                   </td>
                                                 </tr>
                          )}
 
                        </tbody>
                      </Table> */}

              <div className="py-3" >
                {valueOptions.map((option, index) => (
                    <Row className={
                    this.state.selectedAnswer === option.answer
                      ? "item-bank-value-list-selected"
                      : "item-bank-value-list-not-selected" 
                  }>
                      <Col md="1 option-label">
                      <span>{option.optionLabel}</span>
                      </Col>

                      <Col md="11">
                      <label>
                    <input
                      type="radio"
                      name={option.value}
                      value={option.answer}
                      autocomplete="off"
                      // checked={this.state.selectedAnswer === option.answer} 
                      onChange={(e)=>this.selectAnswer(index,option.answer, e)} 
                      checked={this.state.selectedAnswer === option.answer ? true : false}
                      style={{display:"none"}}
                    />
                    {option.answer}
                  </label>
                      </Col>
                    </Row>
                  ))}
            
              </div>

                    </div>

                    <div className="d-flex mt-4">
                      <p className=" text-light-grey">Enable auto score</p>
                      <FontAwesomeIcon
                        className="tooltip-info ml-2"
                        icon={faCommentAlt}
                        id="autoScore"
                      />
                      <FontAwesomeIcon
                        className="question-icon text-white"
                        icon={faQuestion}
                      />
                      <UncontrolledTooltip placement="right" target="autoScore">
                        Sub heading!
                      </UncontrolledTooltip>
                    </div>
                    <div className="btn-group">
                    <Col md="7 pl-0">
                          <div className="switch has-switch mr-2 mb-2 mr-2" data-on-label="ON"
                              data-off-label="OFF"
                              onClick={this.props.autoScore}>

                              <div className={cx("switch-animate", {
                                  'switch-on': this.props.fields.autoScore,
                                  'switch-off': !this.props.fields.autoScore
                              })}>
                                  <input type="checkbox" id="yesorno" />
                                  <span className="switch-left bg-primary">Yes
                                      </span>
                                  <label>&nbsp;</label>
                                  <span className="switch-right bg-primary">No</span>
                              </div>

                          </div>
                      </Col>
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
                <h6 className="m-0 p-0 font-weight-500">MetaData</h6>
                <i className="pe-7s-angle-down down-arrow text-muted float-right "></i>
              </Button>
            </CardHeader>
            <Collapse
              isOpen={this.state.accordion[2]}
              data-parent="#accordion"
              id="collapseThree"
            >
              <CardBody>
                <div className="d-flex">
                  <p className=" text-light-grey">Distractor rationale</p>
                  <FontAwesomeIcon
                    className="tooltip-info ml-2"
                    icon={faCommentAlt}
                    id="distractorRationale"
                  />
                  <FontAwesomeIcon
                    className="question-icon text-white"
                    icon={faQuestion}
                  />
                </div>
                <UncontrolledTooltip
                  placement="right"
                  target="distractorRationale"
                >
                  Sub heading!
                </UncontrolledTooltip>
                <textarea rows="6" className="col-md-12 text-light-grey" value={this.props.fields.rowData.distractorRationale} onChange={(e)=>this.props.fieldHandler("distractorRationale", e)}>
                </textarea>
                <span className="text-danger">
                            {this.props.fields.errorMsg[6]}
                          </span>
                <div className="row">
                  <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <div className="d-flex mt-3">
                      <p className=" text-light-grey">Rubic reference</p>
                      <FontAwesomeIcon
                        className="tooltip-info ml-2"
                        icon={faCommentAlt}
                        id="reference"
                      />
                      <FontAwesomeIcon
                        className="question-icon text-white"
                        icon={faQuestion}
                      />
                    </div>
                    <UncontrolledTooltip placement="right" target="reference">
                      Sub heading!
                    </UncontrolledTooltip>
                    <input type="text" className="form-control" name="" value={this.props.fields.rowData.rubicReference} onChange={(e)=>this.props.fieldHandler("rubicReference", e)} />
                    <span className="text-danger">
                            {this.props.fields.errorMsg[7]}
                          </span>
                    <div className="d-flex mt-3">
                      <p className=" text-light-grey">Acknowledgements</p>
                      <FontAwesomeIcon
                        className="tooltip-info ml-2"
                        icon={faCommentAlt}
                        id="acknowledgements"
                      />
                      <FontAwesomeIcon
                        className="question-icon text-white"
                        icon={faQuestion}
                      />
                    </div>
                    <UncontrolledTooltip
                      placement="right"
                      target="acknowledgements"
                    >
                      Sub heading!
                    </UncontrolledTooltip>
                    <input type="text" className="form-control" name="" value={this.props.fields.rowData.acknowledgement} onChange={(e)=>this.props.fieldHandler("acknowledgement", e)}/>
                    <span className="text-danger">
                            {this.props.fields.errorMsg[8]}
                          </span>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <p className=" mt-3 text-light-grey">Sample answer</p>
                    <input type="text" className="form-control" name="" value={this.props.fields.rowData.sampleAnswer} onChange={(e)=>this.props.fieldHandler("sampleAnswer", e)}/>
                    <span className="text-danger">
                            {this.props.fields.errorMsg[9]}
                          </span>
                  </div>
                </div>
              </CardBody>
            </Collapse>
          </Card>
        </div>
      </div>
    );
  }
}

export default Settings;
