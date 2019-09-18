//Authorization:
//Designed : by muthuraja R
//Purpose: Created for Subject performance
//Description: students  past performance

import React, { Component } from "react";
import PageTitle from "../../../Layout/AppMain/PageTitle";
import { Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { subjects } from "./utils/subjects.json";
import { Row, Col } from 'reactstrap';
import TextSizeSelector from "../../../textsizeselector/TextSizeSelector";

export class PastPerformance extends Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            collapse: false,
            collapseIndex: null,
            filteredData: []
        };
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

    toggle = index => {
        this.setState(prevState => ({
            collapse: !prevState.collapse,
            collapseIndex: index
        }));
    }

    getTextSizeValue = range => {
        this.setState({ customFontSize: Number.parseInt(range) });
    };

    render() {
        console.log(this.state.filteredData);
        if (this.state.filteredData.length === 0) {
            return null
        }
        return (
            <div className="past-performance">
                <PageTitle
                    heading="Past Performance"
                    subheading="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do."
                    brdcrumptwo="Exams"
                    brdcrumpthree="Past Performance"
                />
                <div className="main-inner-sub">


                    {/* <div>
                    <TextSizeSelector getTextSizeValue={this.getTextSizeValue} />
                </div> */}

                    <div>
                        <div className="mt-5 mb-3 table-heading">
                            <Col xs="12" sm="12" md="12" lg="12" xl="12">
                                <Row className="heading-font-size" style={{ fontSize: `${13 + this.state.customFontSize}px` }}>
                                    <Col md="3" className=" text-center p-0">
                                        <span>1 stage = 150 Question</span>
                                    </Col>
                                    <Col md="3" className=" text-center p-0">
                                        <span>% = No change from last stage</span>
                                    </Col>
                                    <Col md="3" className=" text-center p-0">
                                        <div className="mt-1">%<FontAwesomeIcon icon={faArrowDown} className="pl-1 lowmark-color" />= Decrease from last stage</div>
                                    </Col>
                                    <Col md="3" className=" text-center p-0">
                                        <div className="mt-1">%<FontAwesomeIcon icon={faArrowUp} className="pl-1 highmark-color" />= Increase from last stage</div>
                                    </Col>
                                </Row>
                            </Col>
                        </div>

                        <Table className="bg-white" bordered responsive style={{ fontSize: `${14 + this.state.customFontSize}px` }}>
                            <thead>
                                <tr className="text-primary" >
                                    <th>Subjects</th>
                                    <th className="text-center">STAGE 1<br /><span className="font-size" style={{ fontSize: `${13 + this.state.customFontSize}px` }}>08/21/19-08/21/19</span></th>
                                    <th className="text-center">STAGE 2<br /><span className="font-size" style={{ fontSize: `${14 + this.state.customFontSize}px` }}>08/21/19-08/21/19</span></th>
                                    <th className="text-center">STAGE 3<br /><span className="font-size" style={{ fontSize: `${14 + this.state.customFontSize}px` }}>08/21/19-08/21/19</span></th>
                                </tr>
                            </thead>
                            <tr className="table-heading-color" >
                                <th className="table-heading-color" scope="row">Overall Average</th>
                                <td className="text-center">74.9% </td>
                                <td className="text-center lowmark-color">78.2%<FontAwesomeIcon icon={faArrowDown} className="pl-1 " /></td>
                                <td className="text-center highmark-color">73.2%<FontAwesomeIcon icon={faArrowUp} className="pl-1 " /></td>

                            </tr>

                            {this.state.filteredData["Subjects"].map((subject, index) => (<tbody>
                                <tr className="table-performance" onClick={() => this.toggle(index)} style={{ fontSize: `${14 + this.state.customFontSize}px` }}>
                                    <td className="table-heading-color" scope="row">{subject.subject_name}</td>
                                    <td className="text-center"> {this.state.filteredData.stages.stage1}%</td>
                                    <td className="text-center" style={{ fontSize: `${14 + this.state.customFontSize}px` }}>{this.state.filteredData.stages.stage2 >= 90 ?
                                        <h6 className="highmark-color mb-0" style={{ fontSize: `${14 + this.state.customFontSize}px` }}>{this.state.filteredData.stages.stage2}%
                                         <FontAwesomeIcon icon={faArrowUp} className="pl-1" style={{ fontSize: `${14 + this.state.customFontSize}px` }} />
                                        </h6> : <h6 className="lowmark-color mb-0" style={{ fontSize: `${14 + this.state.customFontSize}px` }}>{this.state.filteredData.stages.stage2}%
                                         <FontAwesomeIcon icon={faArrowDown} className="pl-1" style={{ fontSize: `${14 + this.state.customFontSize}px` }} />
                                        </h6>
                                    }</td>
                                    <td className="text-center" style={{ fontSize: `${14 + this.state.customFontSize}px` }}>{this.state.filteredData.stages.stage3 >= 90 ?
                                        <h6 className="highmark-color mb-0" style={{ fontSize: `${14 + this.state.customFontSize}px` }}>{this.state.filteredData.stages.stage3}%
                                         <FontAwesomeIcon icon={faArrowUp} className="pl-1" style={{ fontSize: `${14 + this.state.customFontSize}px` }} />
                                        </h6> : <h6 className=" lowmark-color mb-0" style={{ fontSize: `${14 + this.state.customFontSize}px` }}>{this.state.filteredData.stages.stage3}%
                                         <FontAwesomeIcon icon={faArrowDown} className="pl-1=" style={{ fontSize: `${14 + this.state.customFontSize}px` }} />
                                        </h6>
                                    }</td>

                                </tr>
                                {this.state.collapse && this.state.collapseIndex === index ?
                                    (
                                        <>
                                            {this.state.filteredData.Topics.map(topic => (
                                                <tr className="subject-subcontent">
                                                    <td> {topic.topic_name}</td>
                                                    <td className="text-center"> {this.state.filteredData.stages.stage1}%</td>
                                                    <td className="text-center" style={{ fontSize: `${14 + this.state.customFontSize}px` }}>{this.state.filteredData.stages.stage2 >= 90 ?
                                                        <h6 className="highmark-color mb-0" style={{ fontSize: `${14 + this.state.customFontSize}px` }}>{this.state.filteredData.stages.stage2}%
                                                             <FontAwesomeIcon icon={faArrowUp} className="pl-1" style={{ fontSize: `${14 + this.state.customFontSize}px` }} />
                                                        </h6> : <h6 className="lowmark-color mb-0" style={{ fontSize: `${14 + this.state.customFontSize}px` }}>{this.state.filteredData.stages.stage2}%
                                                              <FontAwesomeIcon icon={faArrowDown} className="pl-1" style={{ fontSize: `${14 + this.state.customFontSize}px` }} />
                                                        </h6>}</td>
                                                    <td className="text-center" style={{ fontSize: `${14 + this.state.customFontSize}px` }}>{this.state.filteredData.stages.stage3 >= 90 ?
                                                        <h6 className="highmark-color mb-0" style={{ fontSize: `${14 + this.state.customFontSize}px` }}>{this.state.filteredData.stages.stage3}%
                                                             <FontAwesomeIcon icon={faArrowUp} className="pl-1" style={{ fontSize: `${14 + this.state.customFontSize}px` }} />
                                                        </h6> : <h6 className="lowmark-color mb-0" style={{ fontSize: `${14 + this.state.customFontSize}px` }}>{this.state.filteredData.stages.stage3}%
                                                              <FontAwesomeIcon icon={faArrowDown} className="pl-1" style={{ fontSize: `${14 + this.state.customFontSize}px` }} />
                                                        </h6>}</td>
                                                </tr>
                                            ))}
                                        </>
                                    ) : null}

                            </tbody>

                            ))}

                        </Table>
                    </div>
                </div>
            </div>
        )
    }
}

export default PastPerformance

