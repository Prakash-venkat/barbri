import React, { Fragment } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import _ from "lodash";
import {
    Row, Col,
    Card, CardBody, Button
} from 'reactstrap';

import ReactTable from "react-table";
import { makeData } from "./utils/utils";
import { makeDataExpand } from "./utils/utilsExpand";

import PageTitle from '../Layout/AppMain/PageTitle';

import TextSizeSelector from '../TextSizeSelector/TextSizeSelector';

const columns = [
    {
        columns: [

            {
                Header: "Student Name",
                accessor: "studentName",
                Cell: row => (
                    <div style={{ textAlign: "left", width: "100%" }}>{row.value}</div>
                )

            },

            {
                Header: "Exam Name",
                accessor: "examName",
                Cell: row => <div style={{ textAlign: "left", width: "100%" }}>{row.value}</div>

            },
            {
                Header: "Exam Date",
                accessor: "examDate",
                Cell: row => <div style={{ textAlign: "right", width: "100%" }}>{row.value}</div>

            },
            {
                Header: "Number of Question Attended",
                accessor: "numberOfQuestionAttended",
                Cell: row => <div style={{ textAlign: "right", width: "100%" }}>{row.value}</div>

            },
            {
                Header: "Score %",
                accessor: "score",
                Cell: row => <div style={{ textAlign: "right", width: "100%" }}>{row.value}</div>

            },
            {
                Header: "No of Questions Marked to Answer",
                accessor: "questionsmarkedtoAnswer",
                Cell: row => <div style={{ textAlign: "right", width: "100%" }}>{row.value}</div>

            },

        ]

    }
];
const columnsExpanded = [
    {
        Header: "Questions Analysis",
        columns: [

            {
                Header: "Question Right/Wrong",
                accessor: "questionRightWrong",
                Cell: row => <div style={{ textAlign: "left", width: "100%" }}>{row.value}</div>


            },

            {
                Header: "Question Title",
                accessor: "questionTitle",
                Cell: row => <div style={{ textAlign: "left", width: "100%" }}>{row.value}</div>

            },
            {
                Header: "Time Taken",
                accessor: "timeTaken",
                Cell: row => <div style={{ textAlign: "right", width: "100%" }}>{row.value}</div>

            },
            {
                Header: "Review",
                accessor: "review",
                Cell: row => <div style={{ textAlign: "left", width: "100%" }}>{row.value}</div>

            }

        ]

    }
];
export default class ExamReport extends React.Component {
    constructor() {
        super();
        this.state = {
            data: makeData(),
            dataExpanded: makeDataExpand(),
            customFontSize: 0,

        };
    }
    getTextSizeValue = range => {
        this.setState({ customFontSize: Number.parseInt(range) });
    };
    render() {
        const { data, dataExpanded } = this.state;
        return (
            <Fragment>
                <ReactCSSTransitionGroup
                    component="div"
                    transitionName="TabsAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <div>

                    </div>
                    <div className="exam-report">
                        <div className="container-fluid">
                            <PageTitle
                                //style={{fontSize:`${16+this.state.customFontSize}px`}}
                                heading="Exam Reports"
                                subheading="Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do."
                                brdcrumptwo="Exams"
                                brdcrumpthree="Exam Reports"

                            />
                        </div>
                        {/* <div>
                       <TextSizeSelector getTextSizeValue={this.getTextSizeValue} />
                       </div> */}
                        <div className="container-fluid">
                            <Row className="exam-report-table">
                                <Col md="12">
                                    <div className="main-card mb-3">
                                        <div>

                                            <ReactTable
                                                style={{ fontSize: `${16 + this.state.customFontSize}px` }}
                                                data={data}
                                                columns={columns}
                                                defaultPageSize={10}
                                                // pivotBy={["firstName", "lastName"]}
                                                filterable
                                                SubComponent={row => {
                                                    return (
                                                        <div style={{ padding: "40px" }}>

                                                            <ReactTable
                                                                data={dataExpanded}
                                                                columns={columnsExpanded}
                                                                defaultPageSize={3}
                                                                showPagination={false}

                                                            />
                                                        </div>
                                                    );
                                                }}
                                            />
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </ReactCSSTransitionGroup>
            </Fragment>
        )
    }
}
