import React, { Component } from 'react'

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
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import PageTitle from "../../../Layout/AppMain/PageTitle";
import Questions from './Questions'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import {
    faPlay
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextSizeSelector from "../../../textsizeselector/TextSizeSelector";

library.add(
    faPlay
);
export class QuestionAnswer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            instruction: true,
            customFontSize: 0,
        }
    }

    InstructionOff = () => {
        this.setState({ instruction: false })
    }

    getTextSizeValue = range => {
        this.setState({ customFontSize: Number.parseInt(range) });
    };

    render() {
        return (
            <div className="question-and-answers">
                <PageTitle
                    heading="Questions"
                    subheading="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
                    brdcrumptwo="Questions"
                    brdcrumpthree="Practice Questions"
                />

                {/* <div>
                    <TextSizeSelector getTextSizeValue={this.getTextSizeValue} />
                </div> */}

                <div className="">
                    {this.state.instruction === true ? <div className="instructions">

                        <h6 style={{ fontSize: `${14 + this.state.customFontSize}px` }}>Instructions</h6>
                        <div className="instruction-content">
                            <p style={{ fontSize: `${14 + this.state.customFontSize}px` }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proidentut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris um dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                            <p style={{ fontSize: `${14 + this.state.customFontSize}px` }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum aecat cupidatat non proidentut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitati laborum.</p>
                        </div>


                        <div className="instruction-continue text-right">

                            <Button style={{ fontSize: `${14 + this.state.customFontSize}px` }} className="btn" onClick={this.InstructionOff}>

                                <li><FontAwesomeIcon icon={faPlay} size="1x" /></li>
                                <li>NEXT</li>


                            </Button>
                        </div>
                    </div> : <Questions />
                    }
                </div>
            </div>

        )
    }
}

export default QuestionAnswer
