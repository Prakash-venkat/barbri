import React, { Component } from "react";
import moment from "moment";
import Chart from "react-apexcharts";
import JwPagination from "jw-react-pagination";
import { Link } from 'react-router-dom';
import { Row, Col, UncontrolledTooltip } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight, faAngleDoubleLeft, faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getData, currentState, deleteData, timerChoosed, questionChoosed } from "../../../../actions/actionMain";
import Loading from '../../../../components/admin/loading';
import { instance } from '../../../../actions/constants';
import { getSession } from '../../../routes/routePaths';
import { language } from '../../../../utils/locale/locale'

const customLabels = {
    first: <FontAwesomeIcon icon={faAngleDoubleLeft} />,
    last: <FontAwesomeIcon icon={faAngleDoubleRight} />,
    previous: <FontAwesomeIcon icon={faAngleLeft} />,
    next: <FontAwesomeIcon icon={faAngleRight} />
};

class OngoingExam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            modal: false,
            status: "Active",
            filteredData: [],
            loading: true,
            studentID: "",
            pageOfItems: [],
            studentSession: getSession("StudentSession")
        };
    }

    componentDidMount() {
        this.props.currentState("incompleteExam")
        this.props.timerChoosed(true)
        this.props.questionChoosed(true)
        this.fetchData();
    }

    fetchData = () => {
        let studentSession = this.state.studentSession
        instance.get(`students/${studentSession.userStudentID}/exams/incomplete`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        })

            .then(res => {
                return res
            })
            .then(response => {
                const checkEmpty = typeof response.data.data != "undefined" && response.data.data != null && response.data.data.length != null
                    && response.data.data.length > 0
                this.setState({
                    data: checkEmpty ? response.data.data : [],
                    filteredData: checkEmpty ? response.data.data : [],
                    loading: false
                });
            })
            .catch(error => {
                this.setState({
                    filteredData: [],
                    data: [],
                    loading: false
                })
            });
    };

    deleteExam = (exam) => {
        const code = exam
        swal({
            title: language.confirmationPopupHeading,
            text:
                language.deleteConfirmation,
            icon: "warning",
            buttons: true,
            dangerMode: true
        }).then(willDelete => {
            if (willDelete) {
                this.setState({loading: true})
                let url = `exams/${code}`;
                instance.delete(url, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                })
                    .then(res => {
                        if (res.data.status === "Success") {
                            swal(language.deleted, language.deletedMsg, "success");
                            this.fetchData()
                        }
                    })
                    .catch(err => {
                        this.setState({loading: false})
                        swal(language.oops, language.tryAgain, "error");
                    })
            }
        });
    }

    componentDidUpdate() {

        var els = document.querySelectorAll('.page-link');

        for (var i = 0; i < els.length; i++) {
            // els[i].setAttribute("tabindex", "0") ;
            els[i].setAttribute("href", "javascript:void(0)");

        }
    }
    handleChange = event => {
        const query = event.target.value;
        this.setState({ query: event.target.value });
        this.setState(prevState => {
            const filteredData = this.state.data.filter(element => {
                return (
                    (element.examName != null &&
                        element.examName.toLowerCase().includes(query.toLowerCase())) ||
                    (element.examTotalQuestions != null &&
                        element.examTotalQuestions.toString().includes(query.toString())) ||
                    (element.examRightAnswersCount != null &&
                        element.examRightAnswersCount
                            .toString()
                            .includes(query.toString())) ||
                    (element.examTakenAt != null &&
                        element.examTakenAt.toString().includes(query.toString()))
                );
            });
            return {
                query,
                filteredData
            };
        });
    };

    onChangePage = (pageOfItems) => {
        this.setState({ pageOfItems });
    }

    render() {
        return (
            <div>
                {this.state.loading ? (
                    <Loading />
                ) : (
                        <div className="exam-report-chart-color">

                            <div className="card msedge-cardsec">
                                <div className="col-md-12">
                                    <div className="row">
                                        <div className="col-md-9 col-xs-12">
                                        </div>
                                        <div className="col-md-3 col-xs-12">
                                            <div className="exam-reports-search mt-0">
                                                <input type="text" className="form-control" placeholder="Search exam" onChange={this.handleChange} aria-label="exam report search" />
                                                <span className="btn pe-7s-search search ongoingexam-search"></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {this.state.filteredData && this.state.filteredData.length ? <div className="w-100 msedge-stud-exam-ongoing">
                                    <Row className="m-0 msedge-stud-ongoing-exam-size">
                                        {this.state.pageOfItems.map((item, index) => (
                                            <Col md="3" lg="3" xl="3" sm="12" xs="12" className="medge-ongoingcad-padding">
                                                <div className="msedge-ongoing-translate">
                                                    <div>
                                                        <div className="exams-details-with-date">

                                                            <Row>
                                                                <Col md="6" xs="6" sm="6" xl="8" lg="8">
                                                                    <div className=""> 
                                                                        <span className="content-date m-0">{Math.round((item.examAnsweredQuestionsCount / item.examTotalQuestions) * 100) > 100 ? 100 : Math.round((item.examAnsweredQuestionsCount / item.examTotalQuestions) * 100)}%</span>
                                                                    </div>
                                                                    <div>
                                                                        <span className="content-month m-0">{moment.utc(item.examTakenAt).format("MMM, DD, YYYY")}</span>
                                                                    </div>
                                                                </Col>

                                                                <Col md="4" lg="4" xl="4" sm="6" xs="6" className="msedge-score-img  msedge-cart-height">
                                                                    <Row>

                                                                        <Chart
                                                                            options={{
                                                                                plotOptions: {
                                                                                    radialBar: {
                                                                                        hollow: {
                                                                                            size: "60%",
                                                                                            color: "rgb(208, 208, 208)"
                                                                                        }
                                                                                    }
                                                                                },
                                                                                colors: [(item.examAnsweredQuestionsCount / item.examTotalQuestions) * 100 >= 60 ? "#3ac47d" : "#d92550"]
                                                                            }}
                                                                            series={[(item.examAnsweredQuestionsCount / item.examTotalQuestions) * 100]}
                                                                            type="radialBar"
                                                                            height="140"
                                                                        />

                                                                    </Row>
                                                                </Col>
                                                            </Row>

                                                            <Col md="12" lg="12" xl="12">
                                                                <Row>
                                                                    <div className="col-lg-3 pl-0">
                                                                        <Row>
                                                                            <Col md="3" xs="3" sm="3" xl="2" lg="2" onClick={() => this.deleteExam(item.examId)}>
                                                                                <Link role="button" tabIndex="0">

                                                                                    <i className="pe-7s-trash msedge-delete-icon link-color" id="Delete"></i>
                                                                                    <UncontrolledTooltip
                                                                                        placement="bottom"
                                                                                        target="Delete"
                                                                                    >
                                                                                        Delete
                                                                            </UncontrolledTooltip>
                                                                                </Link>
                                                                            </Col>

                                                                            <Col md="3" xs="3" sm="3" xl="2" lg="2">
                                                                                <div className="">
                                                                                    <Link
                                                                                        to={{
                                                                                            pathname: "/students/exam-question",
                                                                                            id: item.examId,
                                                                                            examName: item.examName,
                                                                                            examDuration: item.examDuration,
                                                                                            examTakenAt: item.examTakenAt
                                                                                        }}
                                                                                        className="msedge-exam-report-download"
                                                                                    >
                                                                                        <UncontrolledTooltip
                                                                                            placement="bottom"
                                                                                            target="continue"
                                                                                        >
                                                                                            Continue
                                                                                        </UncontrolledTooltip>
                                                                                        <i className="pe-7s-play msedge-download-icon link-color" id="continue"></i>

                                                                                    </Link>
                                                                                </div>
                                                                            </Col>
                                                                        </Row>
                                                                    </div>
                                                                    <div className="col-lg-9 text-right pr-0">
                                                                        <span className="content-year-bottom m-0">
                                                                            {item.examAnsweredQuestionsCount == null ? 0 +' of '+item.examTotalQuestions+ ' question ' : 
                                                                            item.examAnsweredQuestionsCount > item.examTotalQuestions ? item.examTotalQuestions +' of ' + item.examTotalQuestions + ' questions ' :
                                                                            item.examAnsweredQuestionsCount +' of ' + item.examTotalQuestions + 'questions' }</span>
                                                                    </div>
                                                                </Row>
                                                            </Col>

                                                        </div>

                                                        <div className="correct-answers-section">
                                                            <Row>
                                                                <Col md="12" className="text-center">
                                                                    <Link
                                                                        to={{
                                                                            pathname: "/students/exam-question",
                                                                            id: item.examId,
                                                                            examName: item.examName,
                                                                            examDuration: item.examDuration,
                                                                            examTakenAt: item.examTakenAt
                                                                        }}
                                                                    >
                                                                        <div className="msedge-examreport-examname">
                                                                            {item.examName.length > 20 ? item.examName.substring(0, 15) + '...' : item.examName}
                                                                        </div>
                                                                    </Link>
                                                                </Col>
                                                            </Row>

                                                        </div>
                                                        {/* <div className="exam-report-date">
                                                            <Row>
                                                                <Col md="7">

                                                                    <div className="questio-answer-exam">
                                                                        <span className="content-title">Exam date</span>
                                                                    </div>
                                                                </Col>
                                                                <Col md="5">

                                                                    <div className="exam-date-data text-right data-content">
                                                                        {item.examTakenAt}
                                                                    </div>
                                                                </Col>
                                                            </Row>

                                                        </div> */}

                                                    </div>
                                                </div>

                                            </Col>

                                        ))}
                                    </Row>
                                    <div className="mt-3 text-center w-100">
                                        <JwPagination
                                            pageSize={12}
                                            items={this.state.filteredData}
                                            onChangePage={this.onChangePage}
                                            labels={customLabels}
                                        />
                                    </div>

                                </div> : <div className="w-100 text-center pt-3 pb-3 bg-white">
                                        <h6>No ongoing exam(s)</h6>
                                    </div>}

                            </div>
                        </div>
                    )}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        listData: state.main.data,
        isLoading: state.main.load
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getData,
            deleteData,
            currentState,
            timerChoosed,
            questionChoosed
        },
        dispatch
    );
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OngoingExam);

