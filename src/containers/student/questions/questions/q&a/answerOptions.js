import React, { Component } from "react";
import { Col, Row } from "reactstrap";

class AnswerOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOne: "",
      isStrike: false
    };
  }
  
  handleClick = () => { //Select a option
   if( this.props.isQuestionLoading){
     return null
   }else{
    this.props.onChoiceSelect(this.props.choice, this.props.index);
    if (this.props.choice) {
      this.setState({
        selectedOne: "selected-one"
      });
    }
   }
    
  };
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
          <label className={this.props.disable || this.props.disableWhileFlagged ? 'msedge-questions-disable-answered-options': ''} >
            <Col
              xs="12"
              sm="12"
              md="12"
              lg="12"
              xl="12"
              className="p-0"
              className="p-0 checkbox-content"
              id={this.props.index}
              value={this.props.choice}
              onClick={this.handleClick}
              disabled={disable}
            >
              <button tabIndex={this.props.isShortcuts  ? "0" : "-1"} className="msedge-button-for-choices">

              <Row className="m-0">
                <Col
                  xs="2"
                  sm="2"
                  md="1"
                  lg="1"
                  xl="1"
                  className={`letter-option  ${
                    this.props.choice === this.props.selection
                      ? "selected-one "
                      : ""
                    }`}
                >
                  <h4>
                    {this.props.index === 0
                      ? this.props.labels[0]
                      : this.props.index === 1
                        ? this.props.labels[1]
                        : this.props.index === 2
                          ? this.props.labels[2]
                          : this.props.index === 3
                            ? this.props.labels[3]
                            : this.props.labels[4]}
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

                  {this.props.isToggleOnHighlight ?

                      <p style={{fontSize : `${this.props.customFontSize}px`}} onMouseUpCapture={this.props.highlightSelection}>{this.props.stripHtml(this.props.choice)}</p>
                    :
                    <p style={{fontSize : `${this.props.customFontSize}px`}} >{this.props.stripHtml(this.props.choice)}</p>

                  }
                </Col>
                <Col
                  xs="2"
                  sm="2"
                  md="1"
                  lg="1"
                  xl="1"
                  className="msedge-qp-closebtn"
                  onClick={this.strikeContent}
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

export default AnswerOptions;