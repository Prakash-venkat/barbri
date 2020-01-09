import React, { Component } from "react";
import { Col, Row } from "reactstrap";

export class RadioInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOne: "",
      isStrike: false,
      currentQuestion: "",
      currentChoice: "",
      isSelected: false,
      accordion:false
    };
  }
  handleClick = () => {


    if(this.props.nextDisabled == false){

      localStorage.removeItem(this.props.question);

      this.props.onChoiceSelect(this.props.choice);
      this.props.onChoiceIndex(this.props.index);
  
      var storeQ = {
        questionCode: this.props.question,
        choosedAns: this.props.choice
      };
      localStorage.setItem(this.props.question, JSON.stringify(storeQ));
  
      if (this.props.choice) {
        this.setState({
          isSelected: !this.state.isSelected
        });
      }
    }

  };
  componentDidMount() {
    var retrievedObject = localStorage.getItem(this.props.question);
    var retrived = JSON.parse(retrievedObject);

    if (retrived != undefined || retrived != null) {
      if (retrived.questionCode === this.props.question) {
        if (retrived.choosedAns === this.props.choice) {
          this.props.onChoiceSelect(this.props.choice);
          this.props.onChoiceIndex(this.props.index);
          this.setState({
            isSelected: !this.state.isSelected
          });
        }
      }
    }
  }
  strikeContent = () => {
    if (this.state.isStrike === true) {
      this.setState({
        isStrike: false
      });
    }
    if (this.state.isStrike === false) {
      this.setState({
        isStrike: true
      });
    }
  };
  
  render() {
    var disable = this.props.disable;
    var classString = !disable ? "radio" : "radio disabled";
    return (
      <div className="question-choice">
        <div className={`${classString} ${this.props.classType} `}>
          <label className={this.props.disable || this.props.disableWhileFlagged ? 'msedge-questions-disable-answered-options': ''}>
            <Col
              xs="12"
              sm="12"
              md="12"
              lg="12"
              xl="12"
              className="p-0 checkbox-content"
              id={this.props.index}
              value={this.props.choice}
              
              disabled={disable}
              // tabIndex="0"
              // role="button"
              // type="button"
            >
              <button tabIndex={!this.props.isShortcuts  ? "0" : "-1"} className="msedge-button-for-choices" onClick={this.handleClick}>
              <Row className="m-0">
                <Col
                  xs="2"
                  sm="2"
                  md="1"
                  lg="1"
                  xl="1"
                  className={`letter-option ${
                    this.props.index === this.props.selection
                      ? "selected-one "
                      : ""
                  }`}
                >
                  <h4>
                    {this.props.index === 0
                      ? "A"
                      : this.props.index === 1
                      ? "B"
                      : this.props.index === 2
                      ? "C"
                      : this.props.index === 3
                      ? "D"
                      : "E"}
                  </h4>
                </Col>
                <Col
                  xs="8"
                  sm="8"
                  md="10"
                  lg="10"
                  xl="10"
                  className="options"
                  style={{
                    textDecoration:
                      this.state.isStrike === true ? "line-through" : ""
                  }}
                >
                  {this.props.isToggleOn?
                   <p style={{ fontSize: `${this.props.customFontSize}px` }} onMouseUpCapture={this.props.highlightSelection}>
                   {this.props.stripHtml(this.props.choice)}
                 </p>
                 :
                 <p style={{ fontSize: `${this.props.customFontSize}px` }}>
                 {this.props.stripHtml(this.props.choice)}
               </p>
                  }

                  {/* <p style={{color : this.props.choice === this.props.selection ? '#0e6aae' :'', fontSize:`${this.props.customFontSize}px`}} dangerouslySetInnerHTML={{ __html: this.props.choice }} /> */}
                </Col>
                <Col
                  xs="2"
                  sm="2"
                  md="1"
                  lg="1"
                  xl="1"
                  onClick={this.strikeContent}
                  className="text-right msedge-qp-closebtn"
                >
                  <i className="pe-7s-close" />
                </Col>
              </Row>
              </button>
            </Col>
          </label>
        </div>
      </div>
    );
  }
}

export default RadioInput;
