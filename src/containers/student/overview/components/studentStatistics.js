import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Container, Row, Col, UncontrolledTooltip } from "reactstrap";
import { Link } from "react-router-dom";


const contentHeader = [
    "Today",
    "Your Overall Statistics",
    "All Students' Statistics"
];

const contentHeaderData = [
    "Average",
    "Questions answered",
    "Percent correct",
    "Questions answered",
    "Percent correct",
    "Average questions answered"
];

class Statics extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <div className="msedge-statics-wrapper pt-0">
                {this.props.data.map((data, index) => {
                    return <div>
                        <Row key={index}>
                            <Col xs="12" sm="12" md="12" lg="12" xl="12">
                                <Col xs="12" sm="12" md="12" lg="12" xl="12">
                                    <Row>
                                        <Col
                                            xs="12"
                                            sm="12"
                                            md="4"
                                            lg="4"
                                            xl="4"
                                            className="msedge-card-layout"
                                        >
                                            {/* <Link
                                                to={{
                                                    pathname: "/students/performance"
                                                }}
                                                aria-label="students exam reports"
                                            > */}
                                            <Row>
                                                <Col
                                                    xs="10"
                                                    sm="10"
                                                    md="10"
                                                    lg="10"
                                                    xl="10"
                                                >
                                                    <h2 className="pb-3 pt-4">
                                                        {contentHeader[0]}
                                                    </h2>
                                                </Col>

                                                <Col
                                                    xs="2"
                                                    sm="2"
                                                    md="2"
                                                    lg="2"
                                                    xl="2"
                                                    className="text-right"
                                                >
                                                    {/* <span className="msedge-right-arrow align-middle pt-4">
                                                            <FontAwesomeIcon
                                                                id="Today"
                                                                icon={faArrowRight}
                                                            />
                                                        </span>

                                                        <UncontrolledTooltip
                                                            placement="right"
                                                            target="Today">
                                                            This link will redirect you to the question progress page
                                                        </UncontrolledTooltip> */}
                                                </Col>
                                            </Row>
                                            <Container>
                                                <Row>
                                                    <Col
                                                        sm="12"
                                                        md="12"
                                                        lg="12"
                                                        xl="12"
                                                        className="bg-white msedge-block-wrapper"
                                                    >
                                                        <Row>
                                                            <Col
                                                                xs="7"
                                                                sm="6"
                                                                md="7"
                                                                lg="8"
                                                                xl="8"
                                                                className="msedge-first-section mt-1"
                                                            >
                                                                <h3 className="my-2">
                                                                    {contentHeaderData[2]}
                                                                </h3>
                                                            </Col>
                                                            <Col
                                                                xs="5"
                                                                sm="6"
                                                                md="5"
                                                                lg="4"
                                                                xl="4"
                                                                className="msedge-second-section"
                                                            >
                                                                <span>
                                                                    {Math.round(data.studentOverviewTodayQuestionAverage) > 100 ? 100 : Math.round(data.studentOverviewTodayQuestionAverage)}%
                                                            </span>
                                                            </Col>
                                                        </Row>
                                                        <div className="msedge-card-border "></div>
                                                        <Row>
                                                            <Col
                                                                xs="7"
                                                                sm="6"
                                                                md="9"
                                                                lg="9"
                                                                xl="9"
                                                                className="msedge-first-section mt-2"
                                                            >
                                                                <h3 className="my-2">
                                                                    {contentHeaderData[1]}
                                                                </h3>

                                                            </Col>
                                                            <Col
                                                                xs="5"
                                                                sm="6"
                                                                md="3"
                                                                lg="3"
                                                                xl="3"
                                                                className="msedge-second-section msedge-scroll-sec"
                                                            >
                                                                <span className="align-middle">
                                                                    {data.studentOverviewTodayQuestionsAnswered}
                                                                </span>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </Container>
                                            {/* </Link> */}
                                        </Col>
                                        <Col
                                            sm="12"
                                            md="4"
                                            lg="4"
                                            xl="4"
                                            className="msedge-card-layout"
                                        >
                                            {/* <Link
                                                to={{
                                                    pathname: "/students/performance"
                                                }}
                                                aria-label="students exam reports"
                                            > */}
                                            <Row>
                                                <Col
                                                    xs="10"
                                                    sm="10"
                                                    md="10"
                                                    lg="10"
                                                    xl="10"
                                                >
                                                    <h2 className="pb-3 pt-4">
                                                        {contentHeader[1]}
                                                    </h2>

                                                </Col>
                                                <Col
                                                    xs="2"
                                                    sm="2"
                                                    md="2"
                                                    lg="2"
                                                    xl="2"
                                                    className="text-right"
                                                >
                                                </Col>
                                            </Row>
                                            <Container>
                                                <Row>
                                                    <Col
                                                        md="12"
                                                        lg="12"
                                                        xl="12"
                                                        className="bg-white msedge-block-wrapper pb-2"
                                                    >
                                                        <Row>
                                                            <Col
                                                                xs="7"
                                                                sm="6"
                                                                md="7"
                                                                lg="8"
                                                                xl="8"
                                                                className="msedge-first-section mt-1"
                                                            >
                                                                <h3 className="my-2">
                                                                    {contentHeaderData[2]
                                                                    }
                                                                </h3>
                                                            </Col>
                                                            <Col
                                                                xs="5"
                                                                sm="6"
                                                                md="5"
                                                                lg="4"
                                                                xl="4"
                                                                className="msedge-second-section"
                                                            >
                                                                <span>
                                                                    {Math.round(data.studentOverviewQuestionsAverage) > 100 ? 100 : Math.round(data.studentOverviewQuestionsAverage)}%
                                                            </span>
                                                            </Col>
                                                        </Row>
                                                        <div className="msedge-card-border"></div>
                                                        <Row>
                                                            <Col
                                                                xs="7"
                                                                sm="6"
                                                                md="9"
                                                                lg="9"
                                                                xl="9"
                                                                className="msedge-first-section mt-2"
                                                            >
                                                                <h3 className="my-2">
                                                                    {contentHeaderData[3]}
                                                                </h3>
                                                            </Col>
                                                            <Col
                                                                xs="5"
                                                                sm="6"
                                                                md="3"
                                                                lg="3"
                                                                xl="3"
                                                                className="msedge-second-section msedge-scroll-sec"
                                                            >
                                                                <span className="align-middle">
                                                                    {
                                                                        data.studentOverviewQuestionsAnswered
                                                                    }
                                                                </span>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </Container>
                                            {/* </Link> */}
                                        </Col>

                                        {this.props.isAllStudentsDataEnabled ?
                                            <Col
                                                sm="12"
                                                md="4"
                                                lg="4"
                                                xl="4"
                                                className="msedge-card-layout"

                                                aria-label="All students statistics"
                                            >
                                                <Row>
                                                    <Col
                                                        xs="10"
                                                        sm="10"
                                                        md="10"
                                                        lg="10"
                                                        xl="10"
                                                    >
                                                        <h2 className="pb-3 pt-4">
                                                            {contentHeader[2]}
                                                        </h2>
                                                    </Col>
                                                    <Col
                                                        xs="2"
                                                        sm="2"
                                                        md="2"
                                                        lg="2"
                                                        xl="2"
                                                        className="text-right"
                                                    ></Col>
                                                </Row>
                                                <Container>
                                                    <Row>
                                                        <Col
                                                            md="12"
                                                            lg="12"
                                                            xl="12"
                                                            className="bg-white msedge-block-wrapper pb-2"
                                                        >
                                                            <Row>
                                                                <Col
                                                                    xs="7"
                                                                    sm="6"
                                                                    md="7"
                                                                    lg="8"
                                                                    xl="8"
                                                                    className="msedge-first-section mt-1"
                                                                >
                                                                    <h3 className="my-2">
                                                                        {contentHeaderData[4]}
                                                                    </h3>
                                                                </Col>
                                                                <Col
                                                                    xs="5"
                                                                    sm="6"
                                                                    md="5"
                                                                    lg="4"
                                                                    xl="4"
                                                                    className="msedge-second-section"
                                                                >
                                                                    <span>
                                                                        {Math.round(data.allStudentQuestionsAverage) > 100 ? 100 : Math.round(data.allStudentQuestionsAverage)}%
                                                        </span>
                                                                </Col>
                                                            </Row>
                                                            <div className="msedge-card-border"></div>
                                                            <Row>
                                                                <Col
                                                                    xs="7"
                                                                    sm="6"
                                                                    md="9"
                                                                    lg="9"
                                                                    xl="9"
                                                                    className="msedge-first-section mt-2"
                                                                >
                                                                    <h3 className="my-2">
                                                                        {contentHeaderData[5]}
                                                                    </h3>
                                                                </Col>
                                                                <Col
                                                                    xs="5"
                                                                    sm="6"
                                                                    md="3"
                                                                    lg="3"
                                                                    xl="3"
                                                                    className="msedge-second-section msedge-scroll-sec"
                                                                >
                                                                    <span className="align-middle">
                                                                        {
                                                                            data.allStudentQuestionsAnswered
                                                                        }
                                                                    </span>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                </Container>
                                            </Col> : null}

                                    </Row>
                                </Col>
                            </Col>
                        </Row>
                    </div>
                })}

            </div>
        );
    }
}

export default Statics;