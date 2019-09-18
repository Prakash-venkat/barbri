import React, { Component } from 'react'
import { Card, CardBody, CardTitle, CardFooter, CardGroup, Col, Container, Row, Input, FormGroup, Label, Button, CardHeader } from 'reactstrap';
import cx from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck, faLock, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Slider from 'rc-slider';
import Switch from "react-switch";
import Tooltip from 'rc-tooltip';
import TextSizeSelector from '../TextSizeSelector/TextSizeSelector';
const card = ['Message Center Notifications', 'MBE Countdown on Dashboard', 'All User Stats on Dashboard', 'KeyBoard ShortCuts']
//import Textsizeselector from './components/Textsizeselector'
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);
const Handle = Slider.Handle;
const handle = (props) => {
    const { value, dragging, index, ...restProps } = props;
    return (
        <Tooltip className=''
            prefixCls="rc-slider-tooltip"
            overlay={value}
            visible={dragging}
            placement="bottom"
            key={index}
            overlayClassName='toolTip'
        >
            <Handle value={value} {...restProps} />
        </Tooltip>
    );
};
export class Settings extends Component {
    constructor() {
        super();
        this.state = {
            checked: [false, false, false, false],
            isChecked: false,
            ispublished: false,
            timingValue: 70,
            customFontSize: 0,

        }
    }
    getTextSizeValue = range => {
        this.setState({ customFontSize: Number.parseInt(range) });
    };

    handleChange = (index) => {
        let checked = this.state.checked
        checked[index] = !checked[index];
        this.setState({ checked: checked });
    }

    handleReset = () => {
        this.setState({ timingValue: 0 })
    }

    render() {

        return (
            <div className="settings-admin">
                <div className="mb-2 heading-section box-shadow-settings">
                    <Row>
                        <Col xs="12" sm="12" md="12" lg="12" xl="12">
                            <h5 className="text-primary" style={{ fontSize: `${20 + this.state.customFontSize}px` }}>Settings</h5>
                            <p className="text-muted" style={{ fontSize: `${14 + this.state.customFontSize}px` }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                        </Col>
                    </Row>
                </div>
                {/* <div>
                       <TextSizeSelector getTextSizeValue={this.getTextSizeValue} />
                       </div> */}
                <div className="mt-4 text-primary">
                    <h6 className="text-primary" style={{ fontSize: `${16 + this.state.customFontSize}px` }}>General Settings</h6>
                </div>

                <div>
                    <Card className="main-card radius-setting border">
                        <Col xs="12" sm="12" md="12" lg="12" xl="12">
                            <Row>
                                {
                                    card.map((card, index) =>
                                        <Col md="3" className="text-center border-right settings-no-border">
                                            {/* <div className="settings-alignment"> */}
                                            <div className="settings-alignment">
                                                <h6 style={{ width: index === 3 ? '72%' : '', marginLeft: index === 3 ? '12%' : '' }} className={this.state.checked[index] === true ? 'text-primary card-height-38  ' : 'text-secondary card-height-38'} style={{ fontSize: `${16 + this.state.customFontSize}px` }} >{card}</h6>
                                                <Switch style={{ fontSize: `${16 + this.state.customFontSize}px` }}
                                                    checked={this.state.checked[index]}
                                                    onChange={this.handleChange.bind(this, index)}
                                                    className="mr-2  mb-2"
                                                    onColor="#0e6aae"
                                                />
                                            </div>
                                        </Col>
                                    )
                                }
                            </Row>
                        </Col>
                    </Card>
                </div>

                <div className="mt-4 text-primary">
                    <h6 className="text-primary" style={{ fontSize: `${16 + this.state.customFontSize}px` }}>Default date</h6>
                </div>

                <div className="">
                    <Card className="main-card radius-setting">
                        <Col xs="12" sm="12" md="12" lg="12" xl="12">
                            <Row className="settings-date">
                                <Col md="6" className="">
                                    <div className="mt-3">
                                        <h6 className="settings-font-weight" style={{ fontSize: `${16 + this.state.customFontSize}px` }}>Default dates for performance stats</h6>
                                    </div>
                                    <div>
                                        <div className="custom-radio custom-control mt-3">
                                            <input name="profile" type="radio" id="radioYes" className="custom-control-input" style={{ fontSize: `${16 + this.state.customFontSize}px` }} />
                                            <label className="custom-control-label" for="radioYes" checked style={{ fontSize: `${14 + this.state.customFontSize}px` }}>Today</label>
                                        </div>

                                        <div className="custom-radio custom-control mt-3">
                                            <input name="profile" type="radio" id="radioNo" className="custom-control-input" style={{ fontSize: `${16 + this.state.customFontSize}px` }} />
                                            <label className="custom-control-label" for="radioNo" style={{ fontSize: `${14 + this.state.customFontSize}px` }}>Session</label>
                                        </div>

                                        <div className="custom-radio custom-control mt-3 mb-4">
                                            <input name="profile" type="radio" id="radio" className="custom-control-input" style={{ fontSize: `${16 + this.state.customFontSize}px` }} />
                                            <label className="custom-control-label" for="radio" style={{ fontSize: `${14 + this.state.customFontSize}px` }}>Custom</label>
                                        </div>
                                    </div>
                                </Col>

                                <Col md="6" className="">
                                    <div className="mt-3">
                                        <h6 className="settings-font-weight" style={{ fontSize: `${16 + this.state.customFontSize}px` }}>Default dates for flashcards</h6>
                                    </div>
                                    <div className="mt-3 click-here-button">
                                        <h6 style={{ fontSize: `${16 + this.state.customFontSize}px` }}>You have trial access to smart online flashcards.<Link className="settings-link-color">Click here</Link> to add them to your account for only $95.</h6>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Card>
                </div>

                <div className="mt-4 text-primary">
                    <h6 className="text-primary" style={{ fontSize: `${16 + this.state.customFontSize}px` }}>Timing</h6>
                </div>
                <div className="">
                    <Card className="main-card radius-setting">
                        <Col xs="12" sm="12" md="12" lg="12" xl="12">
                            <Row className="settings-date">
                                <Col md="12" className="">
                                    <div className="mt-3">
                                        <h6 className="" style={{ fontSize: `${16 + this.state.customFontSize}px` }}>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                                        Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel
                                        </h6>
                                    </div>
                                </Col>
                                <Col md="8" xs="8">
                                    <div className="mt-5 mb-4">
                                        <Slider min={0} max={100} defaultValue={this.state.timingValue} handle={handle}
                                            className="rc-slider-primary rc-slider-line mb-2" />
                                    </div>
                                </Col>
                                <Col md="4" xs="4">
                                    <div className="mt-5 mb-4">
                                        <span onClick={this.handleReset} style={{ fontSize: `${16 + this.state.customFontSize}px` }}>Reset</span>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Card>
                </div>

                <div className="mt-4 text-primary">
                    <h6 className="text-primary" style={{ fontSize: `${16 + this.state.customFontSize}px` }}>Student information</h6>
                </div>
                <div className="">
                    <Card className="main-card radius-setting">
                        <Col xs="12" sm="12" md="12" lg="12" xl="12">
                            <Row className="settings-date">
                                <Col md="6" xs="12">
                                    <div className="mt-3 mb-4">
                                        <h6 className="settings-font-weight" style={{ fontSize: `${16 + this.state.customFontSize}px` }}>Law schools</h6>
                                        <h6 style={{ fontSize: `${16 + this.state.customFontSize}px` }}>others</h6>
                                    </div>
                                    <div>
                                        <h6 className="settings-font-weight" style={{ fontSize: `${16 + this.state.customFontSize}px` }}>Exam(s)</h6>
                                        <span style={{ fontSize: `${14 + this.state.customFontSize}px` }}>February 2020 in New York</span>
                                    </div>

                                </Col>
                                <Col md="6" xs="12">
                                    <div className="mt-3 mb-4 student-information-settings">
                                        <div>
                                            <Button className="mb-2 mr-2 btn-icon btn-shadow btn-outline-2x" outline
                                                color="primary" style={{ fontSize: `${16 + this.state.customFontSize}px` }}>
                                                <FontAwesomeIcon icon={faEdit} className="mr-2" style={{ fontSize: `${16 + this.state.customFontSize}px` }} />
                                                Edit bar information
                                    </Button>
                                        </div>
                                        <div>
                                            <Button className="mb-2 mt-2 mr-2 btn-icon btn-shadow btn-outline-2x" outline
                                                color="primary" style={{ fontSize: `${16 + this.state.customFontSize}px` }}>
                                                <FontAwesomeIcon icon={faLock} className="mr-2" style={{ fontSize: `${16 + this.state.customFontSize}px` }} />
                                                Change password
                                    </Button>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Card>
                </div>
            </div>
        )
    }
}

export default Settings
