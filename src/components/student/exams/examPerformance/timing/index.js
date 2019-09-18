//Authorization:
//Designed : by Ajay
//Purpose: Created for timing
//Description: Setting page 

import React, { Component, Fragment } from 'react';
import PageTitle from '../../../Layout/AppMain/PageTitle';
import { PerformanceOverTime } from './utils/performanceOverTime'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { subjects, contents } from './utils/timing.json'
import {
    Progress, Collapse, Row, Col, Card, CardHeader, CardBody, Button
} from 'reactstrap';
import { Loader } from '../../../Loader/loader'
import Select from 'react-select'



const options = [
    { value: 'subject1', label: 'subject1' },
    { value: 'subject2', label: 'subject2' },
    { value: 'subject3', label: 'subject3' }
]
const sessions = [
    { value: 'sessions1', label: 'sessions1' },
    { value: 'sessions2', label: 'sessions2' },
    { value: 'sessions3', label: 'sessions3' }
]

export class Timing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false,
            accordion: [false, false, false, false, false, false, false],
            toggleAlertAccordian: false,
            tooltipOpen: false,
            filteredData: []
        };
        this.toggleAccordion = this.toggleAccordion.bind(this);

    }
    componentDidMount() {
        this.fetchData();
    }
    fetchData = () => {
        fetch("http://barbri.thinrootsoftware.com/barbriapi/past_performance.php")
            .then(response => response.json())
            .then(data =>
                this.setState({ filteredData: data }));
    };
    toggleAccordion(tab) {
        const prevState = this.state.accordion;
        const state = prevState.map((x, index) => (tab === index ? !x : false));
        this.setState({
            accordion: state
        });
    }

    render() {
        console.log(this.state.filteredData);
        if (this.state.filteredData.length === 0) {
            return <Loader />
        }
        return (
            <div className="timing">
                <Fragment>
                    <ReactCSSTransitionGroup
                        component="div"
                        transitionName="TabsAnimation"
                        transitionAppear={true}
                        transitionAppearTimeout={0}
                        transitionEnter={false}
                        transitionLeave={false}>
                        <PageTitle
                            heading="Timing Performance"
                            brdcrumptwo="Exams"
                            brdcrumpthree="ExamPerformance"
                            brdcrumpfour="Timing"
                            subheading="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do."

                        />
                        <div className="main-inner-sub">
                            <div>
                                <Row className="py-3">
                                    <Col md="12" xs="12" sm="12" className="">
                                        <Row>
                                            <Col md="9" xs="6" sm="6" className="text-grey text-lg-right pr-0 mt-1">
                                                <label>Performance settings</label>
                                            </Col>
                                            <Col md="3" xs="6" sm="6">
                                                <div>
                                                    <Select
                                                        defaultValue={sessions[0]}
                                                        options={sessions} />
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row className="pr-3">
                                    {contents.map((content, index) => (
                                        <Col md="4" sm="12" xs="12" className="pr-0">
                                            <h6 className="text-primary font-weight-600 content-header pb-2 pt-2 pl-3">{content.name}</h6>
                                            <div className="timing-content bg-white">
                                                {content.topics.map((topic, index) => (
                                                    <div className="px-3">
                                                        <Row className="border-bottom pt-3 pb-2">
                                                            <Col md="6" xs="12" sm="12" className="timing-header pr-0 pl-0">
                                                                <h6>{topic.topicname}</h6>
                                                            </Col>
                                                            <Col md="6" xs="12" sm="12" className="timing-minute text-lg-right text-md-right pr-0 pl-0">
                                                                <h6 className={topic.minutes > 103 ? "text-success" : "text-primary"}>{topic.minutes}</h6><span className="min-time">Min</span>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                ))}
                                            </div>
                                        </Col>
                                    ))}

                                </Row>
                            </div>
                            <Row className="px-3 pt-4">
                                <Col md="12" xs="12" sm="12" className="performanetime-chart bg-white">
                                    <Row>
                                        <Col md="7" xs="12" sm="12">
                                            <h6 className="font-weight-600">Performance over time</h6>
                                        </Col>
                                        <Col md="2" xs="6" sm="6" className="text-lg-right text-grey text-xs-right pr-0 mt-2">
                                            <label>Subject</label>
                                        </Col>
                                        <Col md="3" xs="6" sm="6">
                                            <div>
                                                <Select
                                                    defaultValue={options[0]}
                                                    options={options} />
                                            </div>
                                        </Col>
                                    </Row>
                                    <PerformanceOverTime />
                                    <div className="bottom-value py-xs-1">Answer time(seconds)</div>
                                    <div className="perser-symbol">Performance in %</div>
                                </Col>
                            </Row>
                            < Row >
                                <Col className="py-4">
                                    <div id="accordion" className="">
                                        {this.state.filteredData.Subjects.map((subject, index) => (
                                            <div className="timing-box mb-2">
                                                <CardHeader id="headingOne" className="subject-accordian">
                                                    <Button
                                                        block
                                                        color="link"
                                                        className="text-left m-0 p-0 under"
                                                        onClick={() => this.toggleAccordion(index)}
                                                        aria-expanded={this.state.accordion[index]}
                                                        aria-controls="collapseOne"
                                                    >
                                                        <h6 className="m-0 py-1 text-body">
                                                            <Row>
                                                                <Col md="4" lg="4">
                                                                    <h6 className='under card-head p-3'>
                                                                        {subject.subject_name}
                                                                    </h6>

                                                                </Col>
                                                                <Col md="4" lg="4">
                                                                    <div
                                                                        className="text-center"
                                                                        style={{ width: "100%" }}
                                                                    >
                                                                        <div className="widget-content p-0">
                                                                            <div className="widget-content-outer">
                                                                                <div className="widget-content-wrapper">
                                                                                    <div className="widget-content-left w-100  p-2">
                                                                                        <Progress
                                                                                            className="progress-bar-sm mt-3"
                                                                                            color={
                                                                                                subject.score > 66
                                                                                                    ? "success"
                                                                                                    : subject.score > 33
                                                                                                        ? "warning"
                                                                                                        : "danger"
                                                                                            }
                                                                                            value={subject.score}
                                                                                        />
                                                                                    </div>

                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </Col>
                                                                <Col md="4" lg="4" className="p-2  d-flex">
                                                                    <small className="text-grey px-3 pt-2">( {28} answered of {36} )</small>
                                                                    <div className="pl-3">
                                                                        <h4 className={this.state.filteredData.stages.stage1 > 66
                                                                            ? "text-success"
                                                                            : this.state.filteredData.stages.stage2 > 33
                                                                                ? "text-warning"
                                                                                : "text-danger"}> {this.state.filteredData.stages.stage3}</h4>
                                                                    </div>
                                                                    <div className="pl-lg-4">
                                                                        <i className="text-grey pe-7s-angle-down down-arrow-size  px-1"> </i>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </h6>
                                                    </Button>
                                                </CardHeader>
                                                <Collapse
                                                    isOpen={this.state.accordion[index]}
                                                    data-parent="#accordion"
                                                    id="collapseOne"
                                                    aria-labelledby="headingOne"
                                                >
                                                    <CardBody className="bg-white">
                                                        {this.state.filteredData.Topics.map(topic => (

                                                            <div className="row ">
                                                                <div className="col-md-4 col-xs-12 py-1 pl-4 minute-content">{topic.topic_name}</div>
                                                                <div className="col-md-4 col-xs-6 py-1">
                                                                    <div
                                                                        className="text-center"
                                                                        style={{ width: "100%" }}
                                                                    >
                                                                        <div className="widget-content p-0">
                                                                            <div className="widget-content-outer">
                                                                                <div className="widget-content-wrapper">
                                                                                    <div className="widget-content-left w-100 px-2">
                                                                                        <Progress
                                                                                            className="progress-bar-sm"
                                                                                            color={
                                                                                                this.state.filteredData.stages.stage1 > 66
                                                                                                    ? "success"
                                                                                                    : this.state.filteredData.stages.stage1 > 33
                                                                                                        ? "warning"
                                                                                                        : "danger"
                                                                                            }
                                                                                            value={this.state.filteredData.stages.stage1}
                                                                                        />
                                                                                    </div>

                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-4 col-xs-6">
                                                                    <div className='pl-2 d-flex'>
                                                                        <div className="text-grey pl-1"> (28 answered of 36)</div> <p className="font-weight-700 px-2">{this.state.filteredData.stages.stage1}</p>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        ))}
                                                    </CardBody>
                                                </Collapse>
                                            </div>
                                        ))}
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </ReactCSSTransitionGroup>
                </Fragment>
            </div>
        )
    }
}

export default Timing
