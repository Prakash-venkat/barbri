import React, { Component } from 'react'
import { Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {HASH_HISTORY} from "../../../actions/constants";
import {language} from '../../../utils/locale/locale'



class ItemPreview extends Component {
    constructor() {
        super();
        this.state = {
            editId: "",
            itemBankQuestion: "",
            itemBankOption1: "",
            itemBankOption2: "",
            itemBankOption3: "",
            itemBankOption4: "",
            itemBankOption5: "",
            itemBankCode: "",
            itemBankDistractorRationale: "",
        };
    }

    componentDidMount() {

        if (this.props.location.query) {
            this.setState(
                {
                    editId: this.props.location.query.itemBankId,
                    itemBankCode: this.props.location.query.itemBankCode,
                    itemBankQuestion: this.props.location.query.itemBankQuestion,
                    itemBankOption1: this.props.location.query.itemBankOption1,
                    itemBankOption2: this.props.location.query.itemBankOption2,
                    itemBankOption3: this.props.location.query.itemBankOption3,
                    itemBankOption4: this.props.location.query.itemBankOption4,
                    itemBankOption5: this.props.location.query.itemBankOption5,
                    itemBankDistractorRationale: this.props.location.query.itemBankDistractorRationale,
                    itemBankSubject: this.props.location.query.itemBankSubject,
                    itemBankValue: this.props.location.query.itemBankValue,
                    itemBankStatus: this.props.location.query.itemBankStatus
                },
            );
        } else if (this.props.location.query === undefined || null || "") {
            HASH_HISTORY.push("/proof-reader");
        }
    }

    render() {
        return (
            <div>
                <ReactCSSTransitionGroup
                    component="div"
                    transitionName="TabsAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}>

                    <div className="mb-4 container-fluid">
                        <Row>
                            <Col
                                xs="12"
                                sm="12"
                                md="5"
                                lg="5"
                                xl="5"
                                className="msedge-admin-title"
                            >
                                      <h1 className="msedge-overview-text pt-3">{language.items_for_review}</h1>
                            </Col>
                        </Row>
                    </div>
                    <div className="row">
                        <div className="container-fluid p-30 bg-grey">
                            <div className="msedge-item-preview mt-0 rounded">
                                <div className="question-section">
                                    <div className="border-bottom">
                                        <Row>
                                            <Col xs="12" sm="12" md="5" lg="5" xl="5">
                                                <h1 className="msedge-overview-text">{this.state.itemBankCode}
                                                    <abbr><button className="btn btn-success btn-published">
                                                        {this.state.itemBankStatus == '1'
                                                            ? "Draft" : this.state.itemBankStatus == '2'
                                                                ? 'Review Inprogress' : this.state.itemBankStatus == '3'
                                                                    ? 'Reviewed' : this.state.itemBankStatus == '4'
                                                                        ? 'Published' : this.state.itemBankStatus == '5' ? 'Inactive' : 'Deleted'}
                                                    </button></abbr></h1>
                                            </Col>
                                            <Col xs="12" sm="12" md="7" lg="7" xl="7" className="text-right msedge-btn-sm-center">
                                                <div className="form-group msedge-btn-top">
                                                    <span className="msedge-questions-start msedge-right-br mr-2">

                                                        {this.state.itemBankStatus == '3' ? <Link
                                                            to={{
                                                                pathname: "/proof-reader/item-preview",
                                                                query: this.props.location.query
                                                            }}

                                                        >
                                                            <button
                                                                type="button"
                                                                className="btn btn-outline-primary"
                                                                data-messge="Click here to edit"
                                                                disabled={this.state.itemBankStatus == '3' ? true : false}
                                                            >
                                                                <li><i className="pe-7s-note" aria-hidden="true"></i></li>
                                                        <li className="text-uppercase">{language.edit}</li>
                                                            </button>
                                                        </Link> : <Link
                                                            to={{
                                                                pathname: "/proof-reader/update-review",
                                                                query: this.props.location.query
                                                            }}

                                                        >
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-outline-primary"
                                                                    data-messge="Click here to edit"
                                                                    disabled={this.state.itemBankStatus == '3' ? true : false}
                                                                >
                                                                    <li><i className="pe-7s-note" aria-hidden="true"></i></li>
                                                        <li className="text-uppercase">{language.edit}</li>
                                                                </button>
                                                            </Link>}


                                                    </span>
                                                    <span className="msedge-questions-start msedge-right-br">
                                                        <Link to="/proof-reader">
                                                            <button
                                                                type="button"
                                                                className="btn btn-outline-primary"
                                                                data-messge="Click here to go back"
                                                            >
                                                                <li><i className="pe-7s-back" aria-hidden="true"></i></li>
                                                        <li className="text-uppercase">{language.back}</li>
                                                            </button>
                                                        </Link>
                                                    </span>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="question-content">
                                        <div className="question">
                                            <p className="text-option" dangerouslySetInnerHTML={{ __html: this.state.itemBankQuestion }}></p>
                                        </div>
                                    </div>
                                </div>

                                <div className="option-section">
                                    <div className="option-content">
                                        <div className="border">
                                            <div className="option border-bottom">
                                                <Row className="m-0">
                                                    <Col md="1" className={this.state.itemBankValue == "A" ? "correct_answer proof-options-center" : "proof-options-center"}>
                                                        <p className="letter-option">A</p>
                                                    </Col>
                                                    <Col md="11" className="view-bg-grey">
                                                        <p className="text-option mb-0" dangerouslySetInnerHTML={{ __html: this.state.itemBankOption1 }}></p>
                                                    </Col>
                                                </Row>
                                            </div>

                                            <div className="option  border-bottom ">
                                                <Row className="m-0">
                                                    <Col md="1" className={this.state.itemBankValue == "B" ? "correct_answer proof-options-center" : "proof-options-center"}>
                                                        <p className="letter-option">B</p>
                                                    </Col>
                                                    <Col md="11" className="view-bg-grey">
                                                        <p className="text-option" dangerouslySetInnerHTML={{ __html: this.state.itemBankOption2 }}></p>
                                                    </Col>
                                                </Row>
                                            </div>
                                            <div className="option  border-bottom">
                                                <Row className="m-0">
                                                    <Col md="1" className={this.state.itemBankValue == "C" ? "correct_answer proof-options-center" : "proof-options-center"}>
                                                        <p className="letter-option">C</p>
                                                    </Col>
                                                    <Col md="11" className="view-bg-grey">
                                                        <p className="text-option" dangerouslySetInnerHTML={{ __html: this.state.itemBankOption3 }}></p>
                                                    </Col>
                                                </Row>
                                            </div>
                                            <div className="option  border-bottom">
                                                <Row className="m-0">
                                                    <Col md="1" className={this.state.itemBankValue == "D" ? "correct_answer proof-options-center" : "proof-options-center"}>
                                                        <p className="letter-option">D</p>
                                                    </Col>
                                                    <Col md="11" className="view-bg-grey">
                                                        <p className="text-option" dangerouslySetInnerHTML={{ __html: this.state.itemBankOption4 }}></p>
                                                    </Col>
                                                </Row>
                                            </div>
                                            <div className="option  border-bottom">
                                                {this.state.itemBankOption5 == null || this.state.itemBankOption5 == "" || this.state.itemBankOption5 == "<p></p>\n<p></p>\n" ? '' :
                                                    <Row className="m-0">
                                                        <Col md="1" className={this.state.itemBankValue == "E" ? "correct_answer proof-options-center" : "proof-options-center "}>
                                                            <p className="letter-option">E</p>
                                                        </Col>
                                                        <Col md="11" className="view-bg-grey">
                                                            <p className="text-option" dangerouslySetInnerHTML={{ __html: this.state.itemBankOption5 }}></p>
                                                        </Col>
                                                    </Row>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                     <div className="answer-explanation-content">
                                           <h2 className="text-grey">{language.distractor_rationale}</h2>
                                        <p className="text-option" dangerouslySetInnerHTML={{ __html: this.state.itemBankDistractorRationale }}></p>
                                    </div>
                                </div>
                                <div className="container-fluid">
                                    <Row>
                                        <Col xs="12" sm="12" md="5" lg="5" xl="5"></Col>
                                        <Col xs="12" sm="12" md="7" lg="7" xl="7" className="text-right msedge-btn-sm-center">
                                            <div className="form-group">
                                                <span className="msedge-questions-start msedge-right-br mr-2">
                                                    {this.state.itemBankStatus == '3' ? <Link
                                                        to={{
                                                            pathname: "/proof-reader/item-preview",
                                                            query: this.props.location.query
                                                        }}

                                                    >
                                                        <button
                                                            type="button"
                                                            className="btn btn-outline-primary"
                                                            data-messge="Click here to edit"
                                                            disabled={this.state.itemBankStatus == '3' ? true : false}
                                                        >
                                                            <li><i className="pe-7s-note" aria-hidden="true"></i></li>
                                                    <li className="text-uppercase">{language.edit}</li>
                                                        </button>
                                                    </Link> : <Link
                                                        to={{
                                                            pathname: "/proof-reader/update-review",
                                                            query: this.props.location.query
                                                        }}>
                                                            <button
                                                                type="button"
                                                                className="btn btn-outline-primary"
                                                                data-messge="Click here to edit"
                                                                disabled={this.state.itemBankStatus == '3' ? true : false}
                                                            >
                                                                <li><i className="pe-7s-note" aria-hidden="true"></i></li>
                                                    <li className="text-uppercase">{language.edit}</li>
                                                            </button>
                                                        </Link>}
                                                </span>
                                                <span className="msedge-questions-start msedge-right-br">
                                                    <Link to="/proof-reader">
                                                        <button
                                                            type="button"
                                                            className="btn btn-outline-primary"
                                                            data-messge="Click here to go back"
                                                        >
                                                            <li><i className="pe-7s-back" aria-hidden="true"></i></li>
                                                    <li className="text-uppercase">{language.back}</li>
                                                        </button>
                                                    </Link>
                                                </span>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </div>
                    </div>
                </ReactCSSTransitionGroup>
            </div >
        )
    }
}

export default ItemPreview
