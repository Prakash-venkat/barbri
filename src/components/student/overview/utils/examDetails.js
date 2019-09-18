import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export class ExamDetails extends Component {
    render() {
        return (
            <div className="row exam-details">
                <div className="col-md-12 col-xs-12 block">
                    <div className="wrapper col-md-12  bg-white">
                        <span className="rightArrow"><FontAwesomeIcon icon={faArrowRight} /></span>
                        {/* <div className="col-md-12 icon">
                            <i class="pe-7s-note"> </i>
                        </div> */}
                        <div className="col-md-12 text">
                            <span className="num">{this.props.examDetailsData[0].incompleteExam}</span><br />
                            <span className="heading">{this.props.examDetailsHeader[0]}</span><br />
                            <span className="msg">{this.props.message}</span>
                        </div>
                    </div>
                </div>
                <div className="col-md-12 col-xs-12 block">
                    <div className="wrapper col-md-12  bg-white">
                        <span className="rightArrow"><FontAwesomeIcon icon={faArrowRight} /></span>
                        {/* <div className="col-md-12 icon">
                            <i class="pe-7s-mail"> </i>
                        </div> */}
                        <div className="col-md-12 text">
                            <span className="num">{this.props.examDetailsData[0].newMessages}</span><br />
                            <span className="heading">{this.props.examDetailsHeader[1]}</span><br />
                            <span className="msg">{this.props.message}</span>
                        </div>
                    </div>
                </div>
                {/* <div className="col-md-3 col-xs-12 block">
                    <div className="wrapper col-md-12">
                        <div className="col-md-12 icon">
                            <i class="pe-7s-video"> </i>
                        </div>
                        <div className="col-md-12 text">
                            <span className="num">{this.props.examDetailsData[0].newlyAddedVideo}</span><br/>
                            <span className="heading">{this.props.examDetailsHeader[2]}</span><br/>
                            <span className="msg">{this.props.message}</span>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 col-xs-12 block">
                    <div className="wrapper col-md-12">
                        <div className="col-md-12 icon">
                            <i class="pe-7s-tools"> </i>
                        </div>
                        <div className="col-md-12 text">
                            <span className="num">{this.props.examDetailsData[0].supportEmail}</span><br/>
                            <span className="heading">{this.props.examDetailsHeader[3]}</span><br/>
                            <span className="msg">{this.props.message}</span>
                        </div>
                    </div>
                </div> */}
            </div>
        )
    }
}

export default ExamDetails
