import React, { Component } from 'react'
import {
    Row, Col, Container, Progress, selectedOption, Card, CardBody,
    CardTitle, ListGroupItem, ListGroup,
} from "reactstrap";
import { Table } from 'reactstrap';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faFileDownload, faDownload } from "@fortawesome/free-solid-svg-icons";
import { examreports } from './examreports.json';
import { Link } from 'react-router-dom';
import swal from "sweetalert";
import JwPagination from 'jw-react-pagination';

import {
    faAngleLeft,
    faAngleRight,
    faAngleDoubleLeft,
    faAngleDoubleRight,

} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const customLabels = {
    first: <FontAwesomeIcon icon={faAngleDoubleLeft} />,
    last: <FontAwesomeIcon icon={faAngleDoubleRight} />,
    previous: <FontAwesomeIcon icon={faAngleLeft} />,
    next: <FontAwesomeIcon icon={faAngleRight} />
}
const options = [
    { value: 'Filter', label: 'Filter' },
    { value: 'Catagory two', label: 'Catagory two' },
    { value: 'Catagory three', label: 'Catagory three' },
];

export class report extends Component {
    constructor() {
        super();
        var exampleItems = [...Array(150).keys()].map(i => ({ id: (i + 1), name: 'Item ' + (i + 1) }));//pagination
        this.onChangePage = this.onChangePage.bind(this);//pagination
        this.state = {
            //  this.onChangePage(examreports);
            examreports,
            exampleItems,
            pageOfItems: [],
            // data: examreports,
            query: '',
            // filteredData: examreports,
            data: [],
            exam_report: [],
            filteredData: []

        };
        this.state.filterText = "";
        this.disable.bind(this)
    }

    componentDidMount() {
        this.fetchData()
    }
    fetchData = () => {
        fetch('http://barbri.thinrootsoftware.com/barbriapi/get_student_exam_report.php')
            .then(response => response.json())
            .then(data =>
                this.setState({ filteredData: data, data })
            );
    };
    disable(id) {
        console.log(id)
        // fetch(`http://barbri.thinrootsoftware.com/barbriapi/delete_student_exam_report.php?id=${id}`)
        //     .then(response => console.log(response))
        swal({
            title: "Are you sure?",
            text:
                "Once disabled, You will not able to recover!",
            icon: "warning",
            buttons: true,
            dangerMode: true
        }).then(willDelete => {
            if (willDelete) {
                let url = `http://barbri.thinrootsoftware.com/barbriapi/delete_student_exam_report.php?id=${id}`;
                console.log(url);
                fetch(url, { method: "post" }).then(resp => console.log(resp));
                swal("Report disabled successfully!", {
                    icon: "success"
                });
                this.fetchData();
            } else {
                swal("Cancelled!");
            }
        });
    }
    onChangePage(pageOfItems) {
        // console.log(pageOfItems)
        this.setState({ pageOfItems });
    }
    getTextSizeValue = range => {
        this.setState({ customFontSize: Number.parseInt(range) });
    };

    handleUserInput(filterText) {
        this.setState({ filterText: filterText });
    };

    handleChange = event => {
        const query = event.target.value;
        this.setState({ query: event.target.value });

        this.setState(prevState => {
            const filteredData = this.state.data.filter(element => {
                return (

                    //   element.student_first_name.concat(" " + element.student_last_name).toLowerCase().includes(query.toLowerCase()) ||
                    element.practice_exam_name.toLowerCase().includes(query.toLowerCase()) ||
                    //   element.student_expected_bar_exam_state
                    //     .toLowerCase()
                    //     .includes(query.toLowerCase()) ||
                    element.practice_exam_total_questions.toString().includes(query.toLowerCase())
                    //   element.student_code.toString().includes(query.toLowerCase()) ||
                    //   element.student_barbri_id.toString().includes(query.toLowerCase()) ||
                    //   element.student_expected_bar_exam.toString().includes(query.toString()) ||
                    //   element.student_active.toString().includes(query.toLowerCase())
                );
            });

            return {
                query,
                filteredData
            };
        });
    };
    render() {
        console.log("from api", this.state.filteredData)

        return (
            <div className="students-exam-reports">
                <div className="mt-4">
                    <Row className="pt-3 pb-0">
                        <Col md="8">
                        </Col>
                        <Col md="3">
                            <div className="form-group ">
                                <input type="text" className="form-control" placeholder="Search Exam" onChange={this.handleChange} />
                                <span className="btn pe-7s-search search"></span>
                            </div>
                        </Col>
                        {/* <Col md="2">
                            <div className="form-group">
                                <Select
                                    value={selectedOption}
                                    // onChange={this.handleChange}
                                    options={options}
                                    defaultValue={options[0]}
                                />
                            </div>
                        </Col> */}
                    </Row>
                </div>
                <div className="mt-2">
                    <Container>
                        <Col xs="12" sm="12" md="12" lg="12" xl="12">
                            <Row>
                                <Table responsive>
                                    <tbody>
                                        {this.state.filteredData.map((subject, index) => (
                                            <tr className="examreport-table">
                                                <td>
                                                    <div className="students-exams-alignment" style={{ fontSize: `${14 + this.state.customFontSize}px` }}>
                                                        <span className="students-examreport-font" style={{ fontSize: `${14 + this.state.customFontSize}px` }}><Link>{subject.practice_exam_name}</Link></span><br />
                                                        <div className="exam-date">
                                                            <span>{subject.practice_exam_created_date.date.split(' ')[0]}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="studentsexam-report" style={{ fontSize: `${14 + this.state.customFontSize}px` }}>
                                                        <span className="exam-report-fontweight students-examreport-font" style={{ fontSize: `${14 + this.state.customFontSize}px` }}># no of question</span><br />
                                                        <div className="total-question">
                                                            <span>{subject.practice_exam_total_questions} out of {100}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="studentsexam-report-score">
                                                        <span className="exam-report-fontweight students-examreport-font" style={{ fontSize: `${14 + this.state.customFontSize}px` }}>Score</span>
                                                        <Row style={{ fontSize: `${14 + this.state.customFontSize}px` }}>

                                                            <div className="text-center mt-2" style={{ width: "175px" }}>
                                                                <div className="widget-content p-0">
                                                                    <div className="widget-content-outer">
                                                                        <div className="widget-content-wrapper">
                                                                            <div className="widget-content-left w-100 px-2">
                                                                                {/* {subject.practice_exam_created_date.date.split(' ')[0]} */}
                                                                                <Progress
                                                                                    className="progress-bar-sm"
                                                                                    color={
                                                                                        subject.practice_exam_total_questions * 100 / 100 > 66
                                                                                            ? "success"
                                                                                            : subject.practice_exam_total_questions * 100 / 100 > 33
                                                                                                ? "warning"
                                                                                                : "danger"
                                                                                    }
                                                                                    value={subject.practice_exam_total_questions * 100 / 100}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <span className="text-grey">{subject.practice_exam_total_questions * 100 / 100}%</span>

                                                        </Row>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="studentsexams-report-icon student-icon-report">
                                                        <Row>
                                                            <div className="">
                                                                <span className="students-examreport-font exam-report-fontweight" style={{ fontSize: `${14 + this.state.customFontSize}px` }}>Download</span><br />
                                                                <FontAwesomeIcon
                                                                    style={{ fontSize: `${14 + this.state.customFontSize}px` }}
                                                                    icon={faDownload}
                                                                    size="1x"
                                                                    className="btn-font"
                                                                />
                                                            </div>
                                                            <div className="ml-3"
                                                                onClick={this.disable.bind(this, subject.practice_exam_code)}
                                                            >
                                                                <span className="students-examreport-font exam-report-fontweight" style={{ fontSize: `${14 + this.state.customFontSize}px` }}>Disable</span><br />
                                                                <FontAwesomeIcon
                                                                    style={{ fontSize: `${14 + this.state.customFontSize}px` }}
                                                                    icon={faTrashAlt}
                                                                    size="1x"
                                                                    className="btn-font mt-1"
                                                                />
                                                            </div>
                                                        </Row>
                                                    </div>

                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>

                                </Table>

                            </Row>
                        </Col>
                    </Container>
                    <div className="text-center mb-5 mt-0">
                        <JwPagination
                            pageSize={5}
                            items={examreports}
                            onChangePage={this.onChangePage}
                            labels={customLabels}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default report
