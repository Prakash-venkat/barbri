import React, { Component } from 'react'
import { Card, Col, Row, Button, } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Slider from 'rc-slider';
import Switch from "react-switch";
import Tooltip from 'rc-tooltip';
import Loader from 'react-loaders'


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
            timingValue: 25,
            error: null,
            isLoaded: false,
            items: [],
            loading:true

            // defaultDate: null
        }
        this.handleSliderChange = this.handleSliderChange.bind(this);
    }
    componentDidMount() {
        // if (this.state.items[0].settings_message_center_notify == "y") {
        //     let checked = this.state.checked
        //     checked[0] = !checked[0];
        //     this.setState({ checked: checked });
        // }
        fetch("http://barbri.thinrootsoftware.com/barbriapi/settings.php")
            .then(res => res.json())
            .then(res => {
                this.setState({ items: res })
                var data = this.state.items;
                if (data[0].settings_message_center_notify === "y") {
                    var checked = this.state.checked
                    checked[0] = !checked[0];
                    this.setState({ checked: checked });
                }
                if (data[0].settings_mbe_countdown_dashboard === "y") {
                    var checked = this.state.checked
                    checked[1] = !checked[1];
                    this.setState({ checked: checked });
                }
                if (data[0].settings_alluser_status_dashboard === "y") {
                    var checked = this.state.checked
                    checked[2] = !checked[2];
                    this.setState({ checked: checked });
                }
                if (data[0].settings_keyboard_shortcuts === "y") {
                    var checked = this.state.checked
                    checked[3] = !checked[3];
                    this.setState({ checked: checked });
                }
                if (data[0].settings_default_date === "today") {
                    document.getElementById("today").checked = true;
                }
                if (data[0].settings_default_date === "session") {
                    document.getElementById("session").checked = true;
                }
                if (data[0].settings_default_date === "custom") {
                    document.getElementById("custom").checked = true;
                }
                if (data[0].settings_default_timing) {
                    this.setState({
                        timingValue: data[0].settings_default_timing
                    })
                }
            })
            .catch(error => {

                this.setState({ error: error })
            })
            setTimeout(() => {
                this.setState({loading:false})
            }, 1000);
    }
    handleChange = (index) => {
        let checked = this.state.checked
        checked[index] = !checked[index];
        this.setState({ checked: checked });
        // data[0].settings_message_center_notify = false;
        let timing = this.state.timingValue;
        if (this.state.checked[0] === true) {
            var messageCenterNotification = "y";
        }
        if (this.state.checked[1] === true) {
            var mbeCountdownOnDashboard = "y";
        }
        if (this.state.checked[2] === true) {
            var allUserStatus = "y";
        }
        if (this.state.checked[3] === true) {
            var keyboardShortcuts = "y";
        }
        var defaultDateStat = "today";
        if (document.getElementById('today').checked === true) {
            defaultDateStat = "today";
        }
        if (document.getElementById('session').checked === true) {
            defaultDateStat = "session";
        }
        if (document.getElementById('custom').checked === true) {
            defaultDateStat = "custom";
        }
        fetch("http://barbri.thinrootsoftware.com/barbriapi/settings.php", {
            method: 'post',
            body: JSON.stringify({
                "message_center_notify": messageCenterNotification,
                "mbe_countdown_on_dashboard": mbeCountdownOnDashboard,
                "all_user_status": allUserStatus,
                "keyboard_shortcuts": keyboardShortcuts,
                "default_date": defaultDateStat,
                "timing": timing,
                "created_by": "adminname"
            })
        })
            .then(res => res.json())
            .then(res => this.setState({ items: res }))
            .catch(error => {
                this.setState({ error: error })
            })
    }

    handleReset = () => {
        this.setState({ timingValue: 0 })
    }

    defaultDate() {

        // document.getElementById("today").checked = false;
        // document.getElementById("session").checked = false;
        // document.getElementById("custom").checked = false;
        // if (!document.getElementById(id).checked) {
        //     document.getElementById(id).checked = true;
        // }
        this.handleChange();
    }
    handleSliderChange(val) {
        this.setState({ timingValue: val }, () => this.handleChange());

    }
    render() {
        // var data = this.state.items;
        // var primaryKey = [data[0].settings_message_center_notify, data[0].settings_mde_countdown_dashboard, data[0].settings_alluser_ststus_dashboard, data[0].settings_keyboard_shortcuts]
        console.log(this.state.items);
        return (
            <div>
            {this.state.loading ?           
            <div className="loader-custom">
            <div className="loader-container-inner">
                <div className="text-center">
                    <Loader type="line-scale-pulse-out-rapid"/>
                    <h6 className="mt-2">
                    Please Wait... Fetching Information
                </h6>
                </div>
            </div>
        </div>
        
            :
            <div className="settings-admin">
                <div className="mb-2 heading-section box-shadow-settings">
                    <Row className="page-title">
                        <Col xs="12" sm="12" md="7" lg="7" xl="7">
                            <h5 className="text-primary">Settings</h5>
                            <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                        </Col>
                    </Row>
                </div>

                <div className="mt-4 text-primary">
                    <h6>General Settings</h6>
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
                                                <h6 style={{ width: index === 3 ? '72%' : '', marginLeft: index === 3 ? '12%' : '' }} className={this.state.checked[index] === true ? 'text-primary card-height-38  ' : 'text-secondary card-height-38'}>{card}</h6>
                                                <Switch
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
                    <h6>Default date</h6>
                </div>

                <div className="">
                    <Card className="main-card radius-setting">
                        <Col xs="12" sm="12" md="12" lg="12" xl="12">
                            <Row className="settings-date">
                                <Col md="6" className="">
                                    <div className="mt-3">
                                        <h6 className="settings-font-weight">Default dates for performance stats</h6>
                                    </div>
                                    <div>
                                        <div className="custom-radio custom-control mt-3">
                                            <input name="dataStat" type="radio" id="today" className="custom-control-input" onChange={this.handleChange} />
                                            <label className="custom-control-label" for="today" checked>Today</label>
                                        </div>

                                        <div className="custom-radio custom-control mt-3">
                                            <input name="dataStat" type="radio" id="session" className="custom-control-input" onChange={this.handleChange} />
                                            <label className="custom-control-label" for="session">Session</label>
                                        </div>

                                        <div className="custom-radio custom-control mt-3 mb-4">
                                            <input name="dataStat" type="radio" id="custom" className="custom-control-input" onChange={this.handleChange} />
                                            <label className="custom-control-label" for="custom">Custom</label>
                                        </div>
                                    </div>
                                </Col>

                                <Col md="6" className="">
                                    <div className="mt-3">
                                        <h6 className="settings-font-weight">Default dates for flashcards</h6>
                                    </div>
                                    <div className="mt-3">
                                        <h6>You have trial access to smart online flashcards.<Link className="settings-link-color">Click here</Link> to add them to your account for only $95.</h6>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Card>
                </div>

                <div className="mt-4 text-primary">
                    <h6>Timing</h6>
                </div>
                <div className="">
                    <Card className="main-card radius-setting">
                        <Col xs="12" sm="12" md="12" lg="12" xl="12">
                            <Row className="settings-date">
                                <Col md="12" className="">
                                    <div className="mt-3">
                                        <h6 className="">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                                        Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel
                                        </h6>
                                    </div>
                                </Col>
                                <Col md="8" xs="8">
                                    <div className="mt-5 mb-4">
                                        <Slider min={0} max={100} value={this.state.timingValue} onChange={val => this.handleSliderChange(val)}
                                            className="rc-slider-primary rc-slider-line mb-2" />
                                    </div>
                                </Col>
                                <Col md="4" xs="4">
                                    <div className="mt-5 mb-4">
                                        <span onClick={this.handleReset}>Reset</span>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Card>
                </div>

                <div className="mt-4 text-primary">
                    <h6>Student information</h6>
                </div>
                <div className="">
                    <Card className="main-card radius-setting">
                        <Col xs="12" sm="12" md="12" lg="12" xl="12">
                            <Row className="settings-date">
                                <Col md="6" xs="12">
                                    <div className="mt-3 mb-4">
                                        <h6 className="settings-font-weight">Law schools</h6>
                                        <h6>others</h6>
                                    </div>
                                    <div>
                                        <h6 className="settings-font-weight">Exam(s)</h6>
                                        <span>February 2020 in New York</span>
                                    </div>

                                </Col>
                                <Col md="6" xs="12">
                                    <div className="mt-3 mb-4 student-information-settings">
                                        <div>
                                            <Button className="mb-2 mr-2 btn-icon btn-shadow btn-outline-2x" outline
                                                color="primary">
                                                <FontAwesomeIcon icon={faEdit} className="mr-2" />
                                                Edit bar information
                                    </Button>
                                        </div>
                                        <div>
                                            <Button className="mb-2 mt-2 mr-2 btn-icon btn-shadow btn-outline-2x" outline
                                                color="primary">
                                                <FontAwesomeIcon icon={faLock} className="mr-2" />
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
            }
            </div>
        )
    }
}

export default Settings
