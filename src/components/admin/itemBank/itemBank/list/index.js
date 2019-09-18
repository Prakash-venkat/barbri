// //Authorization:
// //Designed : by Usha M
// //Purpose: Created for adding Item master List
// //Description: Table for displaying data Item

import React, { Component } from 'react'
import { Row, Col, Container, Progress, selectedOption, Card, CardBody, CardTitle, ListGroupItem, ListGroup,Button } from "reactstrap";
import { Table } from 'reactstrap';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faFileDownload, faDownload } from "@fortawesome/free-solid-svg-icons";
// import { examreports } from './examreports.json';
import { Link } from 'react-router-dom';
import swal from "sweetalert";
import JwPagination from 'jw-react-pagination';
import { faAngleLeft, faAngleRight, faAngleDoubleLeft, faAngleDoubleRight, } from '@fortawesome/free-solid-svg-icons';
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
            // examreports,
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
    }

    componentDidMount() {
        this.fetchData()
    }
    fetchData = () => {
        fetch('http://barbri.thinrootsoftware.com/barbriapi/item_bank.php')
            .then(response => response.json())
            .then(data =>
                this.setState({ filteredData: data, data })
            );
    };

    deleteUser=(id)=> {
        console.log(id)
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
                    element.item_bank_code.toLowerCase().includes(query.toLowerCase()) ||
                    //   element.student_expected_bar_exam_state
                    //     .toLowerCase()
                    //     .includes(query.toLowerCase()) ||
                    element.item_bank_code.toString().includes(query.toLowerCase())
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

        return (
            <div className="students-exam-reports">

             <div className="mb-2 heading-section admin-itembank-boxshadow">
               <Row className="page-title">
                 <Col xs="12" sm="12" md="7" lg="7" xl="7">
                   <h5 className="text-primary"> Item Master List</h5>
                   <p className="text-muted">
                     Lorem ipsum dolor sit amet, consectetur adipiscing elit
                   </p>
                 </Col>
                 <Col
                  xs="12"
                  sm="12"
                  md="5"
                  lg="5"
                  xl="5"
                  className="text-right"
                >
                  <div className="form-group">
                    <Link to="/admin/item-bank-add">
                      <button
                        type="submit"
                        className="btn btn-outline-primary pr-5 pl-5 mr-2"
                      >
                        Add
                      </button>
                    </Link>
                  </div>
                </Col>
              </Row>
            </div>

                <div>
                    <Row className="pt-3 pb-0">
                        <Col md="9">
                        </Col>
                        <Col md="3">
                            <div className="form-group ">
                                <input type="text" className="form-control" placeholder="Search Exam" onChange={this.handleChange} />
                                <span className="btn pe-7s-search search"></span>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="mt-2">
                    <Container>
                        <Col xs="12" sm="12" md="12" lg="12" xl="12">
                            <Row>
                                <Table responsive>
                                    <thead>
                                        <tr className="text-center">
                                            <th>Code</th>
                                            <th>Title</th>
                                            <th>Subject</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-center">
                                        {this.state.pageOfItems.map((subject, index) => (
                                            <tr className="examreport-table">
                                                <td>
                                                    <div className="students-exams-alignment" style={{ fontSize: `${14 + this.state.customFontSize}px` }}>
                                                        <span className="students-examreport-font" style={{ fontSize: `${14 + this.state.customFontSize}px` }}>{subject.item_bank_code}</span><br />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="studentsexam-report" style={{ fontSize: `${14 + this.state.customFontSize}px` }}>
                                                        <div className="total-question">
                                                            <span>{subject.item_bank_description}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="studentsexam-report" style={{ fontSize: `${14 + this.state.customFontSize}px` }}>
                                                        <div className="total-question">
                                                            <span>{subject.item_bank_topics}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                <div className="studentsexam-report" style={{ fontSize: `${14 + this.state.customFontSize}px` }}>
                                                        <div className="total-question">
                                                            <span>{subject.item_bank_status=== "y" ? "Active" : "InActive"}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                            <div className="text-center">
  
                                                <Link
                                                    to={{
                                                    pathname: "/admin/item-bank-add",
                                                    query: 
                                                        {
                                                            question: subject.item_bank_description,
                                                            option1: "hello",
                                                            autoScore: 'no',
                                                        }                                                 
                                                    }}
                                                >
                                                    <Button
                                                    className="mb-1 ml-3 btn-icon btn-icon-only"
                                                    color="primary"
                                                    // onClick={this.toggle}
                                                    >
                                                    <i className="pe-7s-pen btn-icon-wrapper"> </i>
                                                    </Button>
                                                </Link>
                                                <Button
                                                    className="mb-1 ml-3 btn-icon btn-icon-only"
                                                    color="primary"
                                                    onClick={this.deleteUser.bind(this, index)}
                                                >
                                                    <i className="pe-7s-trash btn-icon-wrapper"> </i>
                                                </Button>
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
                            pageSize={2}
                            items={this.state.filteredData}
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
