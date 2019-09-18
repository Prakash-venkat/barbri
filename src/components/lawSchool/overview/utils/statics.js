import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export class Statics extends Component {
    render() {
        return (
            <div className="row statics-wrapper">
                <div className="col-md-12 col-lg-12 col-sm-12">

                    {/* Law School */}
                    <div className="row">
                        <div className="col-lg-12 count-field">
                            <div className="row">

                                <div className="col-lg-6 col-md-6 col-sm-3 first-sec">
                                    <p className="number">45</p>
                                    <p className="text">Total law school</p>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-3 second-sec">
                                    <div className="form-group">
                                        <label for="allBatch">Batch</label>
                                        <select class="form-control" id="allBatch" name="AllBatch" aria-label="select Batch">

                                            <option>All Batch</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>


                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Law School */}

                    {/* Card section */}
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="row">
                                <div className="col-lg-4 col-md-4 col-sm-12 block">
                                    <h5>{this.props.header[0]}</h5>
                                    <span className="rightArrow"><FontAwesomeIcon icon={faArrowRight} /></span>
                                    <div className="col-md-12 block-wrapper bg-white">
                                        <div className="col-md-12 section">
                                            <div className="col-md-8 no-padding first-section">
                                                <h5>{this.props.contentHeader[0]}</h5>
                                                <p>in last 3 months</p>
                                            </div>
                                            <div className="col-md-4 no-padding second-section">
                                                <span>{this.props.data[0].average}</span>
                                            </div>
                                        </div>
                                        <div className="col-md-12 section">
                                            <div className="col-md-8 no-padding first-section">
                                                <h5>{this.props.contentHeader[1]}</h5>
                                                <p>in last 33 months</p>
                                            </div>
                                            <div className="col-md-4 no-padding second-section">
                                                <span className="ques-ans">{this.props.data[0].questionsAnswered}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-12 block">
                                    <h5>{this.props.header[1]}</h5>
                                    <span className="rightArrow"><FontAwesomeIcon icon={faArrowRight} /></span>
                                    <div className="col-md-12 block-wrapper bg-white">
                                        <div className="col-md-12 section">
                                            <div className="col-md-8 no-padding first-section">
                                                <h5>{this.props.contentHeader[2]}</h5>
                                                <p>{this.props.message}</p>
                                            </div>
                                            <div className="col-md-4 no-padding second-section">
                                                <span>{this.props.data[0].overallAverage}</span>
                                            </div>
                                        </div>
                                        <div className="col-md-12 section">
                                            <div className="col-md-8 no-padding first-section">
                                                <h5>{this.props.contentHeader[3]}</h5>
                                                <p>{this.props.message}</p>
                                            </div>
                                            <div className="col-md-4 no-padding second-section">
                                                <span className="ques-ans">{this.props.data[0].overaAllquestionsAnswered}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-12 block">
                                    <h5>{this.props.header[2]}</h5>
                                    <span className="rightArrow"><FontAwesomeIcon icon={faArrowRight} /></span>
                                    <div className="col-md-12 block-wrapper bg-white">
                                        <div className="col-md-12 section">
                                            <div className="col-md-8 no-padding first-section">
                                                <h5>{this.props.contentHeader[4]}</h5>
                                                <p>{this.props.message}</p>
                                            </div>
                                            <div className="col-md-4 no-padding second-section">
                                                <span>{this.props.data[0].allstudentOverallAverage}</span>
                                            </div>
                                        </div>
                                        <div className="col-md-12 section">
                                            <div className="col-md-8 no-padding first-section">
                                                <h5>{this.props.contentHeader[5]}</h5>
                                                <p>{this.props.message}</p>
                                            </div>
                                            <div className="col-md-4 no-padding second-section">
                                                <span className="ques-ans">{this.props.data[0].allstudentQuestionsAnswered}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Card section */}
                </div>
            </div>
        )
    }
}

export default Statics
