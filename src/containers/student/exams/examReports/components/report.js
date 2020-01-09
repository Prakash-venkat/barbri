import React, { Component } from 'react'
import { Row, Col, UncontrolledTooltip } from "reactstrap";
import { Link } from 'react-router-dom';
import moment from "moment"; import Chart from "react-apexcharts";
import swal from "sweetalert";
import JwPagination from 'jw-react-pagination';
import { faAngleLeft, faAngleRight, faAngleDoubleLeft, faAngleDoubleRight, } from '@fortawesome/free-solid-svg-icons';
import Loading from '../../../../../components/admin/loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { instance } from '../../../../../actions/constants';
import { getSession } from '../../../../routes/routePaths';
import { language } from '../../../../../utils/locale/locale'

const customLabels = {
    first: <FontAwesomeIcon icon={faAngleDoubleLeft} />,
    last: <FontAwesomeIcon icon={faAngleDoubleRight} />,
    previous: <FontAwesomeIcon icon={faAngleLeft} />,
    next: <FontAwesomeIcon icon={faAngleRight} />
}

class ExamReports extends Component {
    constructor(props) {
        super(props);

        this.state = {

            pageOfItems: [],
            query: '',
            data: [],
            filteredData: [],
            loading: true,
            studentSession: getSession("StudentSession")
        };
    }

    componentDidMount() {
        this.fetchData()
    }
    fetchData = () => {
        let studentSession = this.state.studentSession
        instance
            .get(`students/${studentSession.userStudentID}/exams`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            })
            .then(res => {
                this.setState({
                    filteredData: res.data.data.exam,
                    data: res.data.data.exam,
                });
            })
            .then(() => {
                this.setState({ loading: false });
            })
            .catch(e => {
                console.log(e);
            });
    };
    componentDidUpdate() {

        var els = document.querySelectorAll('.page-link');

        for (var i = 0; i < els.length; i++) {
            // els[i].setAttribute("tabindex", "1") ;
            els[i].setAttribute("href", "javascript:void(0)");

        }
    }



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
                        swal(language.oops, language.tryAgain, "error");
                    })
            }
        });
    }

    handleChange = event => {
        const query = event.target.value;
        this.setState({ query: event.target.value });
        this.setState(prevState => {
            const filteredData = this.state.data.filter(element => {
                return (
                    element.examName != null && element.examName.toLowerCase().includes(query.toLowerCase()) ||
                    element.examTotalQuestions != null && element.examTotalQuestions.toString().includes(query.toString()) ||
                    element.examRightAnswersCount != null && element.examRightAnswersCount.toString().includes(query.toString()) ||
                    element.examTakenAt != null && element.examTakenAt.toString().includes(query.toString()) ||
                    element.examScore != null && element.examScore.toString().includes(query.toString())

                );
            });
            return {
                query,
                filteredData
            };
        });
    };

    onChangePage = (pageOfItems) => {
        this.setState({ pageOfItems }); //pagination
    }

    render() {
        return (
            <div>
                {this.state.loading ? (
                    <Loading />
                ) : (
                        <ReactCSSTransitionGroup
                            component="div"
                            transitionName="TabsAnimation"
                            transitionAppear={true}
                            transitionAppearTimeout={0}
                            transitionEnter={false}
                            transitionLeave={false}
                        >
                            <div className="msedge-student-exam-reports exam-report-chart-color">

                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="">
                                            <div className="msedge-table-content">
                                                <div className="card msedge-cardsec">
                                                    <div className="col-md-12">
                                                        <div className="row m-0">
                                                            <div className="col-md-9 col-xs-12">
                                                            </div>
                                                            <div className="col-md-3 col-xs-12 p-0">
                                                                <div className="exam-reports-search mt-0">
                                                                    <input type="text" className="form-control" placeholder="Search exam" onChange={this.handleChange} aria-label="exam report search" />
                                                                    <span className="btn pe-7s-search search"></span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        {this.state.filteredData == [] || this.state.filteredData == "" || this.state.filteredData == null ?
                                                            <h6 className="text-center msedge-setting-time-information py-3 bg-white mt-3">{language.no_exams_taken}</h6>
                                                            :
                                                            <Row className="m-0 msedge-stud-ongoing-exam-size">
                                                                {this.state.pageOfItems.map((item, index) => (

                                                                    <Col md="3" lg="3" xl="3" sm="12" xs="12" className="medge-ongoingcad-padding">
                                                                        <div className="msedge-ongoing-translate">
                                                                            <div className="">
                                                                                <div className="exams-details-with-date">

                                                                                    <Row>
                                                                                        <Col md="6" xs="6" sm="6" xl="8" lg="8" className="content-sections">
                                                                                            <div className="">
                                                                                                <span className="content-date m-0">{item.examScore > 100 ? 100 : item.examScore}%</span>
                                                                                            </div>
                                                                                            <div className="">
                                                                                                <span className="content-month m-0">{moment.utc(item.examTakenAt).format("MMM, DD, YYYY")}</span>
                                                                                            </div>

                                                                                        </Col>
                                                                                        <Col md="4" lg="4" xl="4" sm="6" xs="6" className="msedge-score-img msedge-cart-height">
                                                                                            <Row>


                                                                                                <Chart
                                                                                                    options={{
                                                                                                        plotOptions: {
                                                                                                            radialBar: {
                                                                                                                hollow: {
                                                                                                                    size: "60%"
                                                                                                                }
                                                                                                            }
                                                                                                        },

                                                                                                        colors: [item.examScore >= 60 ? "#3ac47d" : "#d92550"]
                                                                                                    }}
                                                                                                    series={[item.examScore]}
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
                                                                                                                {language.delete}
                                                                                                            </UncontrolledTooltip>
                                                                                                        </Link>
                                                                                                    </Col>

                                                                                                    <Col md="3" xs="3" sm="3" xl="2" lg="2">

                                                                                                        <Link
                                                                                                            to={{
                                                                                                                pathname: 'exam-review',
                                                                                                                state: {
                                                                                                                    examId: item.examId,
                                                                                                                    examName: item.examName,
                                                                                                                    examDate: item.examTakenAt,
                                                                                                                    examTotalQuestions: item.examTotalQuestions,
                                                                                                                    examRightAnswersCount: item.examRightAnswersCount,
                                                                                                                    examScore: item.examScore
                                                                                                                }
                                                                                                            }}
                                                                                                            className="msedge-exam-report-download"
                                                                                                        >
                                                                                                            <UncontrolledTooltip
                                                                                                                placement="bottom"
                                                                                                                target="Download"
                                                                                                            >
                                                                                                                {language.view}
                                                                                                            </UncontrolledTooltip>
                                                                                                            <i className="pe-7s-notebook msedge-download-icon" id="Download"></i>

                                                                                                        </Link>
                                                                                                    </Col>

                                                                                                </Row>
                                                                                            </div>
                                                                                            <div className="col-lg-9 text-right pr-0">
                                                                                                <span className="content-year-bottom m-0">{item.examRightAnswersCount > item.examTotalQuestions ? item.examTotalQuestions : item.examRightAnswersCount} of {item.examTotalQuestions} question</span>
                                                                                            </div>
                                                                                        </Row>
                                                                                    </Col>
                                                                                </div>

                                                                                <div className="correct-answers-section">
                                                                                    <Row>
                                                                                        <Col md="12" className="text-center">

                                                                                            <Link
                                                                                                to={{
                                                                                                    pathname: 'exam-review',
                                                                                                    state: {
                                                                                                        examId: item.examId,
                                                                                                        examName: item.examName,
                                                                                                        examDate: item.examTakenAt,
                                                                                                        examTotalQuestions: item.examTotalQuestions,
                                                                                                        examRightAnswersCount: item.examRightAnswersCount,
                                                                                                        examScore: item.examScore
                                                                                                    }
                                                                                                }}
                                                                                                tabIndex="0"
                                                                                                className="msedge-exam-report-download"
                                                                                            >
                                                                                                <div className="msedge-examreport-examname">
                                                                                                    {item.examName.length > 20 ? item.examName.substring(0, 15) + '...' : item.examName}
                                                                                                </div>
                                                                                            </Link>


                                                                                        </Col>


                                                                                    </Row>

                                                                                </div>


                                                                            </div>
                                                                        </div>

                                                                    </Col>
                                                                ))}
                                                                <div className="mt-3 text-center w-100">
                                                                    <JwPagination
                                                                        pageSize={12}
                                                                        items={this.state.filteredData}
                                                                        onChangePage={this.onChangePage}
                                                                        labels={customLabels}
                                                                    />
                                                                </div>

                                                            </Row>}
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ReactCSSTransitionGroup>
                    )}
            </div>
        )
    }
}

export default ExamReports
