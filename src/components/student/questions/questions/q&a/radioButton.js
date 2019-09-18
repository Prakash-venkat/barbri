import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  CardTitle,
  Collapse,
  Fade,
  Row,
  CustomInput,
  Input
} from "reactstrap";
import style from "react-syntax-highlighter/dist/styles/prism/duotone-sea";

export class RadioInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOne: "",
      isStrike: false
    };
  }
  handleClick = () => {
    this.props.onChoiceSelect(this.props.choice);
    if (this.props.choice) {
      this.setState({
        selectedOne: "selected-one"
      });
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
        <div
          className={`${classString} ${this.props.classType} `}
        >
          <label>
                <Col xs="12" sm="12" md="12" lg="12" xl="12" className="p-0" className="p-0 checkbox-content"
                id={this.props.index}
                value={this.props.choice}
                onClick={this.handleClick}
                disabled={disable}>
                    <Row className="m-0">
                      <Col xs="2" sm="2" md="1" lg="1" xl="1" className={`letter-option  ${
            this.props.choice === this.props.selection ? "selected-one " : ""
          }`}>
                        <h4>{this.props.index === 0 ? 'A' : this.props.index === 1 ? 'B' :this.props.index === 2 ? 'C': this.props.index === 3 ? 'D' : 'E'}</h4>
                      </Col>
                      <Col xs="8" sm="8" md="10" lg="10" xl="10" className="options" style={{
                        textDecoration:
                          this.state.isStrike === true ? "line-through" : ""
                      }}>
                          <p style={{color : this.props.choice === this.props.selection ? '#0e6aae' :''}}>{this.props.choice}</p>
                      </Col>
                      <Col xs="2" sm="2" md="1" lg="1" xl="1"  onClick={this.strikeContent}>
                        <i class="pe-7s-look" />
                      </Col>

                    </Row>
                  </Col>
             
          </label>
        </div>
      </div>
    );
  }
}

export default RadioInput;
