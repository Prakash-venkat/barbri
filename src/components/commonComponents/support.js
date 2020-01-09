import React, { Component } from "react";
import { Row, Col, Collapse, Button } from "reactstrap";
import img from "../../assets/utils/images/support/hand-mobile-img.png";
import { Link } from "react-router-dom";
import { dataList } from "../../components/admin/dataList";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {customPageTitle} from "../commonComponents/customPageTitle"

const question = [
    "How can I download my completed exam report?",
    "How can I delete my incomplete exams?",
    "How can I find my ongoing exams?",
    "How can I find information/notifications shared by my school and Barbri?",
    "How can I turn off the email notifications?",
    "How can I change my password?",
    "Can I change the default amount of time provided to answer questions if I will receive an accommodation on the exam?"


];
const answers = [
    "Locate the exam on the Exam Reports page in the Statistics section. Click the exam and then click “Download.” ",
    "Locate the exam on the Exam Reports page in the Statistics section, and click the trashcan icon.",
    "These can be found on the Ongoing Exam page in the Exams section. Click the triangular icon to continue the exam.",
    "Messages from both your law school or from Barbri can be found in your Inbox, which is in the Support section.",
    "Notifications can be turned off on the Settings page in the Support section.",
    "You can change your password on the Settings page, in the Support section.",
    "Yes, the default timing can be changed on the Settings page, in the Support section. Please note that we recommend changing the default timing only if you will receive an accommodation on your actual exam."


]

class support extends Component {
    constructor() {
        super();
        modal: false,
            (this.state = {
                checked: false,
                collapse: false,
                accordion: [false, false, false, false, false, false, false],
                support: true,
                query: "",
                data: question,
                filteredData: question,
                isLoading: true
            });
        this.handleChange = this.handleChange.bind(this);
    }
    handleInputChange = event => {
        const query = event.target.value;
        this.setState({ query: event.target.value });
        this.setState(prevState => {
            const filteredData = prevState.data.filter(element => {
                return element.toLowerCase().includes(query.toLowerCase());
            });
            return {
                query,
                filteredData
            };
        });
    };

    handleChange(checked) {
        this.setState({ checked });
    }
    toggleAccordion(tab) {
        const prevState = this.state.accordion;
        const state = prevState.map((x, index) => (tab === index ? !x : false));

        this.setState({
            accordion: state
        });
    }
    enableSupportNext = () => {
        this.setState({
            support: false
        });
    };
    componentDidMount() {
        this.setState({
            isLoading: false
        });
        customPageTitle("Get Help")  
      }
    render() {
        return (
            <ReactCSSTransitionGroup
                component="div"
                transitionName="TabsAnimation"
                transitionAppear={true}
                transitionAppearTimeout={0}
                transitionEnter={false}
                transitionLeave={false}
            >
                <div className="msedge-support-sec">

                    {this.state.support === true ? (
                        <div>
                            <Row>
                                <div className="container-fluid ptb-30 bg-grey">
                                    <Col md="12" lg="12" sm="12" xl="12">
                                        <Row>
                                            <div className="container-fluid">
                                                <Col
                                                    xs="12"
                                                    sm="12"
                                                    md="12"
                                                    lg="12"
                                                    xl="12"
                                                    className="bg-white"
                                                >
                                                    <Row>
                                                        <Col
                                                            md="6"
                                                            lg="6"
                                                            sm="12"
                                                            xl="6"
                                                            className="pt-5 pb-5 pl-4"
                                                        >
                                                            <h1 className="msedge-support-head">
                                                                {dataList.we_are_here_to_help_you}
                                                            </h1>
                                                            <p className="msedge-subtext">
                                                                {dataList.have_questions}
                                                            </p>
                                                            <p className="msedge-help-arrow">
                                                                <Link onClick={this.enableSupportNext}>
                                                                    {" "}
                                                                    {dataList.view_help} &nbsp;&nbsp;&nbsp;&nbsp;
                                                                 <i className="lnr-arrow-right"> </i>
                                                                </Link>
                                                            </p>
                                                        </Col>
                                                        <Col
                                                            md="6"
                                                            lg="6"
                                                            sm="12"
                                                            xl="6"
                                                            className="text-center"
                                                        >
                                                            <img
                                                                src={img}
                                                                alt="Get_help"
                                                                title="Get Help"
                                                                className="pt-4"
                                                            ></img>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </div>
                                        </Row>
                                    </Col>
                                </div>
                            </Row>
                        </div>
                    ) : (
                            <Row>
                                <div className="container-fluid law-school-dashboard ptb-30 bg-grey">
                                    <div className="container-fluid">
                                        <Col
                                            lg="12"
                                            md="12"
                                            xl="12"
                                            sm="12"
                                            className="msedge-support-container bg-white pl-4 pr-4"
                                        >
                                            <h1 className="msedge-support-head">
                                                {dataList.we_are_here_to_help_you}
                                            </h1>
                                            <div>
                                                <Row>
                                                    <Col md="10" lg="10" xl="10" sm="6">
                                                        <input
                                                            type="text"
                                                            value={this.state.query}
                                                            onChange={this.handleInputChange}
                                                            name="search"
                                                            className="msedge-search-btn pt-3"
                                                            placeholder="What are you looking for ?"
                                                        />
                                                    </Col>
                                                    <Col md="2" lg="2" xl="2" sm="6">
                                                        <Link>
                                                            <p className="msedge-search-option p-0 m-0">
                                                                {dataList.search}
                                                                <i className="lnr-arrow-right"> </i>
                                                            </p>
                                                        </Link>
                                                    </Col>
                                                </Row>
                                            </div>
                                            <Row>
                                                <Col md="12" lg="12" xl="12" sm="12" className="pt-5">
                                                    <Row>
                                                        <Col md="4" lg="4" xl="4" sm="6">
                                                            <h3 className="msedge-popular-search">
                                                                {dataList.popular_search}
                                                            </h3>
                                                        </Col>
                                                        <Col
                                                            md="8"
                                                            lg="8"
                                                            xl="8"
                                                            sm="6"
                                                            className="msedge-collapse-sec"
                                                        >
                                                            {this.state.filteredData.map((heading, index) => (
                                                                <div>
                                                                    <div id="headingOne">
                                                                        <Button
                                                                            block
                                                                            color="link"
                                                                            className="text-left m-0 p-0 text-decoration-none"
                                                                            onClick={() => this.toggleAccordion(index)}
                                                                            aria-expanded={this.state.accordion[index]}
                                                                            aria-controls="collapseOne"
                                                                        >
                                                                            <h5 className="collaps pb-3">{heading}</h5>
                                                                        </Button>
                                                                    </div>
                                                                    <Collapse
                                                                        isOpen={this.state.accordion[index]}
                                                                        data-parent="#accordion"
                                                                        id="collapseOne"
                                                                        aria-labelledby="headingOne"
                                                                    >
                                                                        <p className="text-grey">{answers[index]}</p>
                                                                    </Collapse>
                                                                </div>
                                                            ))}
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </div>
                                </div>
                            </Row>
                        )}
                </div>
            </ReactCSSTransitionGroup>
        );
    }
}

export default support;

