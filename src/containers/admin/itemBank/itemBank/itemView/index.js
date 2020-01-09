import React, { Component } from 'react'
import { Row, Col } from "reactstrap";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from "react-router-dom";
import swal from "sweetalert";

import {
    currentState
} from "../../../../../actions/actionMain";
import { customPageTitle } from '../../../../../components/commonComponents/customPageTitle'
import { language } from '../../../../../utils/locale/locale'
import { HASH_HISTORY, instance } from '../../../../../actions/constants'

class ItemPreview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rowData: [],
            editData : [],
            disable : false
        };
    }

    componentDidMount() {
        customPageTitle('Items For Review ')
        this.props.currentState("itembanktemp");
        if (this.props.location.query === undefined || null) {
            HASH_HISTORY.push("/admin/list_itembank")
        } else if (this.props.location.query) {
            this.setState({ rowData: this.props.location.query || null });
            if (this.props.location.query.itemBankStatus == 1) {

                this.setState({
                    disable : true
                  })

                const params = new URLSearchParams();
                params.append('itemBankCode', this.props.location.query.itemBankCode)

                const body = {
                    method: 'POST',
                    headers: { 'content-type': 'application/x-www-form-urlencoded', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
                    params: params,
                    url: `admin/itembanks/`
                }

                instance(body)
                    .then(res => {
                        if(res.data.status == "Success"){
                            const objevtLength = Object.keys(res.data.data).length
                            if(objevtLength > 0){
                                this.setState({ editData: res.data.data || null , disable : false});
                            }else{
                                this.setState({
                                    disable : true
                                  })
                                swal(language.oops, `Something went wrong while viewing data. Kindly contact Administrator`, "error");
                            }
                            
                          }
                          else{
                              this.setState({
                                disable : true
                              })
                            swal(language.oops, `Something went wrong while viewing data. Kindly contact Administrator`, "error");
                          }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }else{
                this.setState({ editData: this.props.location.query || null });

            }

        }
    }

    render() {
        return (
            <div>
                <div className="mb-2 container-fluid mt-3">
                    <Row>
                        <Col xs="12" sm="12" md="5" lg="5" xl="5" className="msedge-admin-title">
                            <h1 className="msedge-overview-text">{language.items}</h1>
                        </Col>
                    </Row>
                </div>
                <div className="row">
                    <div className="container-fluid msedge-admin-add bg-grey">
                        <div className="msedge-item-preview mt-0 rounded">
                            <div className="question-section">
                                <div className="border-bottom">
                                    <Row>
                                        <Col xs="12" sm="12" md="5" lg="5" xl="5">
                                            <h1 className="text-grey">{this.state.rowData.itemBankCode}
                                                <abbr><button className="btn btn-success btn-published">
                                                    {this.state.rowData.itemBankStatus == 1
                                                        ? "Published" : this.state.rowData.itemBankStatus == 2 ? 'Review Inprogress' : this.state.rowData.itemBankStatus == 3 ? 'Reviewd' : this.state.rowData.itemBankStatus == 4 ? 'Draft' : this.state.rowData.itemBankStatus == 5 ? 'Inactive' : this.state.rowData.itemBankStatus == 6 ? 'Deleted' : ""}
                                                </button></abbr></h1>
                                        </Col>
                                        <Col xs="12" sm="12" md="7" lg="7" xl="7" className="text-right">
                                            <div className="form-group">
                                                <span className="msedge-questions-start msedge-right-br">
                                                    {!this.state.disable ? <Link
                                                        to={{
                                                            pathname: "/admin/edit_itembank",
                                                            query: this.state.editData
                                                        }} >
                                                        <button
                                                        
                                                            type="button"
                                                            className={`btn btn-outline-primary mr-2`}
                                                        >
                                                            <li>
                                                                <i className="pe-7s-note" aria-hidden="true"></i>
                                                            </li>
                                                            <li className="text-uppercase">{language.edit}</li>
                                                        </button>
                                                        
                                                    </Link> : <button
                                                        disabled
                                                            type="button"
                                                            className={`btn btn-outline-primary mr-2`}
                                                        >
                                                            <li>
                                                                <i className="pe-7s-note" aria-hidden="true"></i>
                                                            </li>
                                                            <li className="text-uppercase">{language.edit}</li>
                                                        </button>}
                                                    
                                                </span>
                                                <span className="msedge-questions-start msedge-right-br">
                                                    <Link to="/admin/list_itembank">
                                                        <button
                                                            type="button"
                                                            className="btn btn-outline-primary"
                                                        >
                                                            <li>
                                                                <i className="pe-7s-back" aria-hidden="true"></i>
                                                            </li>
                                                            <li className="text-uppercase">{language.back}</li>
                                                        </button>
                                                    </Link>
                                                </span>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                                <div className="question-content">
                                    <div>
                                        <h2 className="text-grey  py-3">{this.state.rowData.itemBankSubject} / {this.state.rowData.itemBankTopic}</h2>
                                    </div>
                                    <div className="question">
                                        <p dangerouslySetInnerHTML={{ __html: this.state.rowData.itemBankQuestion }}></p>
                                    </div>
                                </div>
                            </div>
                            <div className="option-section">
                                <div className="option-content">
                                    <div className="border">
                                        <div className="option border-bottom">
                                            <Row className="m-0">
                                                <Col md="1" className={this.state.rowData.itemBankValue === "A" ? "correct_answer msedge-flex-center" : "msedge-flex-center"}>
                                                    <p className="letter-option">A</p>
                                                </Col>
                                                <Col md="11" className="view-bg-grey">
                                                    <p className="text-option" dangerouslySetInnerHTML={{ __html: this.state.rowData.itemBankOption1 }}></p>
                                                </Col>
                                            </Row>
                                        </div>

                                        <div className="option  border-bottom ">
                                            <Row className="m-0">
                                                <Col md="1" className={this.state.rowData.itemBankValue === "B" ? "correct_answer msedge-flex-center" : "msedge-flex-center"}>
                                                    <p className="letter-option">B</p>
                                                </Col>
                                                <Col md="11" className="view-bg-grey">
                                                    <p className="text-option" dangerouslySetInnerHTML={{ __html: this.state.rowData.itemBankOption2 }}></p>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div className="option  border-bottom">
                                            <Row className="m-0">
                                                <Col md="1" className={this.state.rowData.itemBankValue === "C" ? "correct_answer msedge-flex-center" : "msedge-flex-center"}>
                                                    <p className="letter-option">C</p>
                                                </Col>
                                                <Col md="11" className="view-bg-grey">
                                                    <p className="text-option" dangerouslySetInnerHTML={{ __html: this.state.rowData.itemBankOption3 }}></p>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div className="option  border-bottom">
                                            <Row className="m-0">
                                                <Col md="1" className={this.state.rowData.itemBankValue === "D" ? "correct_answer msedge-flex-center" : "msedge-flex-center"}>
                                                    <p className="letter-option">D</p>
                                                </Col>
                                                <Col md="11" className="view-bg-grey">
                                                    <p className="text-option" dangerouslySetInnerHTML={{ __html: this.state.rowData.itemBankOption4 }}></p>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div className="option  border-bottom">
                                            <Row className="m-0">
                                                <Col md="1" className={this.state.rowData.itemBankValue === "E" ? "correct_answer msedge-flex-center" : "msedge-flex-center"}>
                                                    <p className="letter-option">E</p>
                                                </Col>
                                                <Col md="11" className="view-bg-grey">
                                                    <p className="text-option" dangerouslySetInnerHTML={{ __html: this.state.rowData.itemBankOption5 }}></p>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                </div>
                                <div className="answer-explanation-content">
                                    <h2 className="text-grey">{language.distractor_rationale}</h2>
                                    <p dangerouslySetInnerHTML={{ __html: this.state.rowData.itemBankDistractorRationale }}></p>
                                </div>
                            </div>
                            <div className="container-fluid">
                                <Row>
                                    <Col xs="12" sm="12" md="5" lg="5" xl="5"></Col>
                                    <Col xs="12" sm="12" md="7" lg="7" xl="7" className="text-right">
                                        <div className="form-group">
                                            <span className="msedge-questions-start msedge-right-br">
                                            {!this.state.disable ? <Link
                                                        to={{
                                                            pathname: "/admin/edit_itembank",
                                                            query: this.state.editData
                                                        }} >
                                                        <button
                                                        
                                                            type="button"
                                                            className={`btn btn-outline-primary mr-2`}
                                                        >
                                                            <li>
                                                                <i className="pe-7s-note" aria-hidden="true"></i>
                                                            </li>
                                                            <li className="text-uppercase">{language.edit}</li>
                                                        </button>
                                                        
                                                    </Link> : <button
                                                        disabled
                                                            type="button"
                                                            className={`btn btn-outline-primary mr-2`}
                                                        >
                                                            <li>
                                                                <i className="pe-7s-note" aria-hidden="true"></i>
                                                            </li>
                                                            <li className="text-uppercase">{language.edit}</li>
                                                        </button>}
                                            </span>
                                            <span className="msedge-questions-start msedge-right-br">
                                                <Link to="/admin/list_itembank">
                                                    <button
                                                        type="button"
                                                        className="btn btn-outline-primary"
                                                        data-messge="Click here to go back"
                                                    >
                                                        <li>
                                                            <i className="pe-7s-back" aria-hidden="true"></i>
                                                        </li>
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
            </div >
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        currentState

    }, dispatch)
};
export default connect(null, mapDispatchToProps)(ItemPreview)
