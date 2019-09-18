import React, { Fragment } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {
    Row, Col,
    Card, CardBody,
    UncontrolledButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle
} from 'reactstrap';

import ReactTable from "react-table";


export class ExamReports extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [
                { examName: 'employment', examdate: '07-10-2019', score: '87' },
                { examName: 'stick', examdate: '08-11-2019', score: '54' },
                { examName: 'example', examdate: '08-11-2019', score: '23' },
                { examName: 'fact', examdate: '07-10-2019', score: '67' },
                { examName: 'jellyfish', examdate: '08-11-2019', score: '87' },
                { examName: 'psychology', examdate: '07-10-2019', score: '78' },
                { examName: 'politics', examdate: '08-11-2019', score: '87' },
                { examName: 'division', examdate: '07-10-2019', score: '87' },
                { examName: 'litreture', examdate: '07-10-2019', score: '54' },
                { examName: 'squirrel', examdate: '07-10-2019', score: '65' },
                { examName: 'employment', examdate: '07-10-2019', score: '87' },
                { examName: 'stick', examdate: '07-10-2019', score: '54' },
                { examName: 'example', examdate: '07-10-2019', score: '23' },
                { examName: 'psychology', examdate: '07-10-2019', score: '78' },
                { examName: 'politics', examdate: '07-10-2019', score: '87' },
                { examName: 'division', examdate: '07-10-2019', score: '87' },
                { examName: 'litreture', examdate: '07-10-2019', score: '54' },
                { examName: 'squirrel', examdate: '07-10-2019', score: '65' },
                { examName: 'employment', examdate: '07-10-2019', score: '87' },
                { examName: 'stick', examdate: '07-10-2019', score: '54' },
                { examName: 'example', examdate: '07-10-2019', score: '23' },
                { examName: 'fact', examdate: '07-10-2019', score: '67' },
                { examName: 'jellyfish', examdate: '07-10-2019', score: '87' },
                { examName: 'psychology', examdate: '07-10-2019', score: '78' },
                { examName: 'politics', examdate: '07-10-2019', score: '87' },
                { examName: 'division', examdate: '07-10-2019', score: '87' },
                { examName: 'litreture', examdate: '07-10-2019', score: '54' },
                { examName: 'squirrel', examdate: '07-10-2019', score: '65' },
                { examName: 'employment', examdate: '07-10-2019', score: '45' },
                { examName: 'employment', examdate: '07-10-2019', score: '90' },
                { examName: 'employment', examdate: '07-10-2019', score: '87' },
                { examName: 'employment', examdate: '07-10-2019', score: '87' },
                { examName: 'stick', examdate: '07-10-2019', score: '54' },
                { examName: 'example', examdate: '07-10-2019', score: '23' },
                { examName: 'fact', examdate: '07-10-2019', score: '67' },
                { examName: 'jellyfish', examdate: '07-10-2019', score: '87' },
                { examName: 'psychology', examdate: '07-10-2019', score: '78' },
                { examName: 'politics', examdate: '07-10-2019', score: '87' },
                { examName: 'division', examdate: '07-10-2019', score: '87' },
                { examName: 'litreture', examdate: '07-10-2019', score: '54' },
                { examName: 'squirrel', examdate: '07-10-2019', score: '65' },
                { examName: 'employment', examdate: '07-10-2019', score: '12' },
                { examName: 'employment', examdate: '07-10-2019', score: '87' },
                { examName: 'employment', examdate: '07-10-2019', score: '23' },
                { examName: 'employment', examdate: '07-10-2019', score: '34' },
                { examName: 'employment', examdate: '07-10-2019', score: '87' },
                { examName: 'employment', examdate: '07-10-2019', score: '45' },
                { examName: 'employment', examdate: '07-10-2019', score: '87' },
                { examName: 'employment', examdate: '07-10-2019', score: '87' },
                { examName: 'stick', examdate: '07-10-2019', score: '54' },
                { examName: 'example', examdate: '07-10-2019', score: '23' },
                { examName: 'fact', examdate: '07-10-2019', score: '67' },
                { examName: 'jellyfish', examdate: '07-10-2019', score: '87' },
                { examName: 'psychology', examdate: '07-10-2019', score: '78' },
                { examName: 'politics', examdate: '07-10-2019', score: '87' },
                { examName: 'division', examdate: '07-10-2019', score: '87' },
                { examName: 'litreture', examdate: '07-10-2019', score: '54' },
                { examName: 'squirrel', examdate: '07-10-2019', score: '65' },
                { examName: 'employment', examdate: '07-10-2019', score: '87' },
                { examName: 'employment', examdate: '07-10-2019', score: '87' },
                { examName: 'employment', examdate: '07-10-2019', score: '87' },
                { examName: 'employment', examdate: '07-10-2019', score: '87' },
                { examName: 'employment', examdate: '07-10-2019', score: '87' },
                { examName: 'employment', examdate: '07-10-2019', score: '87' },
                { examName: 'employment', examdate: '07-10-2019', score: '87' },
                { examName: 'stick', examdate: '07-10-2019', score: '54' },
                { examName: 'example', examdate: '07-10-2019', score: '23' },
                { examName: 'fact', examdate: '07-10-2019', score: '67' },
                { examName: 'jellyfish', examdate: '07-10-2019', score: '87' },
                { examName: 'psychology', examdate: '07-10-2019', score: '78' },
                { examName: 'politics', examdate: '07-10-2019', score: '87' },
                { examName: 'division', examdate: '07-10-2019', score: '87' },
                { examName: 'litreture', examdate: '07-10-2019', score: '54' },
                { examName: 'squirrel', examdate: '07-10-2019', score: '65' },
                { examName: 'employment', examdate: '07-10-2019', score: '87' }
            ]
        };
    }

    render() {
        const { data } = this.state;

        return (
            <Fragment>
                <ReactCSSTransitionGroup
                    component="div"
                    transitionName="TabsAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <Row className="exam-reports bg-white">
                        <div className="col-md-12">
                            <h5>Exam reports</h5>
                        </div>
                        <Col md="12">
                            <Card className="main-card mb-3">
                                <CardBody>
                                    <ReactTable
                                        data={data}
                                        minRows={0}
                                        columns={[{
                                            columns: [{
                                                Header: <div><span>Exam Name </span><i className="lnr-sort-alpha-asc"></i></div>,
                                                accessor: 'examName'
                                            }, {
                                                Header: <div><span>Exam Date </span><i className="lnr-sort-alpha-asc"></i></div>,
                                                accessor: 'examdate'
                                            }]
                                        }, {
                                            columns: [{
                                                Header: <div><span>Score </span><i className="lnr-sort-alpha-asc"></i></div>,
                                                accessor: 'score',
                                                Cell: row => (
                                                    <div style={{
                                                        width: '100%',
                                                        display: 'flex',
                                                        marginTop: '4px'
                                                    }}>


                                                        <div className="progress-bar-sm progress"
                                                            style={{
                                                                width: '85%',
                                                                marginRight: '10px',
                                                                backgroundColor: '#dadada',
                                                            }}
                                                        >
                                                            <div className="progress-bar"
                                                                style={{
                                                                    width: `${row.value}%`,
                                                                    backgroundColor: row.value > 66 ? '#3ac47d'
                                                                        : row.value > 33 ? '#fd7e14'
                                                                            : '#d92550',
                                                                    borderRadius: '2px',
                                                                    transition: 'all .2s ease-out'
                                                                }}
                                                            />
                                                        </div>
                                                        <span
                                                            style={{
                                                                // position: 'absolute',
                                                                right: '3px',
                                                                fontSize: '14px',
                                                                marginTop: '-8px'
                                                            }}
                                                        >{row.value}%</span></div>
                                                )
                                            }]
                                        }]}
                                        defaultPageSize={10}
                                        className="-striped -highlight"
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </ReactCSSTransitionGroup>
            </Fragment>
        )
    }
}
export default ExamReports