//Authorization:prakash
//Designed:Muthuraja r.
//purpose:created for adding student list user table.
//description: To create the list user table and view the admin only. Admin see all the students list. admin edit and delete the student list.

import React, { Fragment } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { Button, Modal, ModalHeader, ModalBody, Col, Row } from "reactstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import {
    faCaretDown,
    faCaretUp,
    faSort
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import ReactTable from "react-table";

// import { makeData } from "./utils"; //dummy data taken from utils.js

const makeData = [
    {examName: 'Exam Name1', examDate: '07-23-2019', numberOfQuestions: '23', questionAnswered: '9', action: 'delete'},
    {examName: 'Exam Name2', examDate: '12-03-2019', numberOfQuestions: '12', questionAnswered: '10', action: 'delete'},
    {examName: 'Exam Name3', examDate: '13-01-2019', numberOfQuestions: '34', questionAnswered: '23', action: 'delete'},
    {examName: 'Exam Name4', examDate: '05-03-2019', numberOfQuestions: '13', questionAnswered: '5', action: 'delete'},
    {examName: 'Exam Name5', examDate: '01-8-2019', numberOfQuestions: '43', questionAnswered: '41', action: 'delete'},
    {examName: 'Exam Name2', examDate: '12-03-2019', numberOfQuestions: '12', questionAnswered: '10', action: 'delete'},
    {examName: 'Exam Name3', examDate: '13-01-2019', numberOfQuestions: '34', questionAnswered: '23', action: 'delete'},
    {examName: 'Exam Name4', examDate: '05-03-2019', numberOfQuestions: '13', questionAnswered: '5', action: 'delete'},
    {examName: 'Exam Name5', examDate: '01-8-2019', numberOfQuestions: '43', questionAnswered: '41', action: 'delete'},
    {examName: 'Exam Name1', examDate: '07-23-2019', numberOfQuestions: '23', questionAnswered: '9', action: 'delete'},
    {examName: 'Exam Name2', examDate: '12-03-2019', numberOfQuestions: '12', questionAnswered: '10', action: 'delete'},
    {examName: 'Exam Name3', examDate: '13-01-2019', numberOfQuestions: '34', questionAnswered: '23', action: 'delete'},
    {examName: 'Exam Name4', examDate: '05-03-2019', numberOfQuestions: '13', questionAnswered: '5', action: 'delete'},
    {examName: 'Exam Name5', examDate: '01-8-2019', numberOfQuestions: '43', questionAnswered: '41', action: 'delete'},
    {examName: 'Exam Name2', examDate: '12-03-2019', numberOfQuestions: '12', questionAnswered: '10', action: 'delete'},
    {examName: 'Exam Name3', examDate: '13-01-2019', numberOfQuestions: '34', questionAnswered: '23', action: 'delete'},
    {examName: 'Exam Name4', examDate: '05-03-2019', numberOfQuestions: '13', questionAnswered: '5', action: 'delete'},
    {examName: 'Exam Name1', examDate: '07-23-2019', numberOfQuestions: '23', questionAnswered: '9', action: 'delete'},
    {examName: 'Exam Name2', examDate: '12-03-2019', numberOfQuestions: '12', questionAnswered: '10', action: 'delete'},
    {examName: 'Exam Name3', examDate: '13-01-2019', numberOfQuestions: '34', questionAnswered: '23', action: 'delete'},
    {examName: 'Exam Name4', examDate: '05-03-2019', numberOfQuestions: '13', questionAnswered: '5', action: 'delete'},
    {examName: 'Exam Name5', examDate: '01-8-2019', numberOfQuestions: '43', questionAnswered: '41', action: 'delete'},
    {examName: 'Exam Name2', examDate: '12-03-2019', numberOfQuestions: '12', questionAnswered: '10', action: 'delete'},
    {examName: 'Exam Name3', examDate: '13-01-2019', numberOfQuestions: '34', questionAnswered: '23', action: 'delete'},
    {examName: 'Exam Name4', examDate: '05-03-2019', numberOfQuestions: '13', questionAnswered: '5', action: 'delete'},
    {examName: 'Exam Name1', examDate: '07-23-2019', numberOfQuestions: '23', questionAnswered: '9', action: 'delete'},
    {examName: 'Exam Name2', examDate: '12-03-2019', numberOfQuestions: '12', questionAnswered: '10', action: 'delete'},
    {examName: 'Exam Name3', examDate: '13-01-2019', numberOfQuestions: '34', questionAnswered: '23', action: 'delete'},
    {examName: 'Exam Name4', examDate: '05-03-2019', numberOfQuestions: '13', questionAnswered: '5', action: 'delete'},
    {examName: 'Exam Name5', examDate: '01-8-2019', numberOfQuestions: '43', questionAnswered: '41', action: 'delete'},
    {examName: 'Exam Name2', examDate: '12-03-2019', numberOfQuestions: '12', questionAnswered: '10', action: 'delete'},
    {examName: 'Exam Name3', examDate: '13-01-2019', numberOfQuestions: '34', questionAnswered: '23', action: 'delete'},
    {examName: 'Exam Name4', examDate: '05-03-2019', numberOfQuestions: '13', questionAnswered: '5', action: 'delete'},
];
export class Incomplete extends React.Component {
  constructor() {
    super();
    this.state = {
      data: makeData,
      modal: false,
      status: "Active"
    };
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }
      columns = [
        {
          Header: props => (
            <div className="table-header">
                <span style={{color:'#0e6aae'}}>Exam name</span>
                <FontAwesomeIcon icon={faSort} className=" sortIcon" size="1x"/>
            </div>
          ),
          accessor: "examName",
          Cell: row => (
            <div style={{ textAlign: "center", width: "100%" }}>
              <a href="" style={{textDecoration: 'underline', color:'#0e6aae'}}>{row.value}</a>
            </div>
          )
        },
        {
          Header: props => (
            <div className="table-header">
              <span style={{color:'#0e6aae'}}>Exam date</span>
                    <FontAwesomeIcon icon={faSort} className=" sortIcon" size="1x"/>
            </div>
          ),
          accessor: "examDate",
          Cell: row => (
            <div style={{ textAlign: "center", width: "100%", color: '#666' }}>
              {row.value}
            </div>
          )
        },
        {
          Header: props => (
            <div className="table-header">
              <span style={{color:'#0e6aae'}}>Number of questions</span>
                    <FontAwesomeIcon icon={faSort} className=" sortIcon" size="1x"/>
            </div>
          ),
          accessor: "numberOfQuestions",
          Cell: row => (
            <div style={{ textAlign: "center", width: "100%", color: '#666' }}>
              {row.value}
            </div>
          )
        },
        {
          Header: props => (
            <div className="table-header">
              <span style={{color:'#0e6aae'}}>Questions Answered</span>
                    <FontAwesomeIcon icon={faSort} className=" sortIcon" size="1x"/>
            </div>
          ),
          accessor: "questionAnswered",
          Cell: row => (
            <div style={{ textAlign: "center", width: "100%", color: '#666' }}>
              {row.value}
            </div>
          )
        },
        {
        //   Header: "Action",
          Header: props => (
            <div className="table-header">
              <span style={{color:'#0e6aae'}}>Action</span>
            </div>
          ),
          accessor: "action",
          filterable: false,
          sortable: false,
          width: 150,
          Cell: row => (
            <div className="table-header">
              <Button
                className="mb-1 ml-5 btn-icon btn-icon-only delete-btn"
              >
                <i className="pe-7s-trash btn-icon-wrapper"> </i>
              </Button>
            </div>
          )
        }
      ];

  render() {
    const { data } = this.state;
    const style = {
      paddingLeft: "5px",
      color: "red"
    };
    return (
      <div className="incomplete">
        <Fragment>
          <ReactCSSTransitionGroup
            component="div"
            transitionName="TabsAnimation"
            transitionAppear={true}
            transitionAppearTimeout={0}
            transitionEnter={false}
            transitionLeave={false}
          >
            <div />

            <Row>
              <Col md="12">
                <div className="main-card mb-3">
                  <div>
                    <ReactTable
                      data={data}
                      columns={this.columns}
                      defaultPageSize={10}
                      defaultFilterMethod={(filter, row) =>
                        String(row[filter.id]) === filter.value
                      }
                    />
                  </div>
                </div>
              </Col>
            </Row>
          </ReactCSSTransitionGroup>
        </Fragment>
      </div>
    );
  }
}
export default Incomplete