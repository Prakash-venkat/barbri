import React, { Component } from 'react'

export class Examtiming extends Component {
    render() {
        return (
            <div className="row statics-wrapper">
                <div className="col-md-4 block">
                    <h5>Examination Timing</h5>
                    <div className="col-md-12 block-wrapper">
                        <a className="col-md-12 section border-bottom">
                            <div className="col-md-7 no-padding first-section">
                                <h5>{this.props.contentHeaderData[0]}</h5>
                                {/* <p>{this.props.message}</p> */}
                            </div>
                            <div className="col-md-5 no-padding second-section">
                                <span>109<span className="min-time">Min</span></span>
                            </div>
                        </a>
                        <a className="col-md-12 section" href="#/admin/student-list">
                            <div className="col-md-7 no-padding first-section">
                                <h5>{this.props.contentHeaderData[1]}</h5>
                                {/* <p>{this.props.message}</p> */}
                            </div>
                            <div className="col-md-5 no-padding second-section">
                                <span className="ques-ans">71<span className="min-time">Min</span></span>
                            </div>
                        </a>
                    </div>
                </div>
                <div className="col-md-4 block">
                    <h5>{this.props.header[1]}</h5>
                    <div className="col-md-12 block-wrapper">
                        <div className="col-md-12 section border-bottom">
                            <div className="col-md-7 no-padding first-section">
                                <h5>{this.props.contentHeaderData[2]}</h5>
                                {/* <p>{this.props.message}</p> */}
                            </div>
                            <div className="col-md-5 no-padding second-section">
                                <span>65<span className="min-time">Min</span></span>

                            </div>
                        </div>
                        <div className="col-md-12 section border-bottom">
                            <div className="col-md-7 no-padding first-section">
                                <h5>{this.props.contentHeaderData[3]}</h5>
                                {/* <p>{this.props.message}</p> */}
                            </div>
                            <div className="col-md-5 no-padding second-section">
                                <span className="ques-ans">58<span className="min-time">Min</span></span>
                            </div>
                        </div>
                        <div className="col-md-12 section">
                            <div className="col-md-7 no-padding first-section">
                                <h5>{this.props.contentHeaderData[4]}</h5>
                                {/* <p>{this.props.message}</p> */}
                            </div>
                            <div className="col-md-5 no-padding second-section">
                                <span className="ques-ans">72<span className="min-time">Min</span></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 block">
                    <h5>{this.props.header[2]}</h5>
                    <div className="col-md-12 block-wrapper">
                        <div className="col-md-12 section border-bottom">
                            <div className="col-md-5 col-xs-6 no-padding first-section">
                                <h5>{this.props.contentHeaderData[5]}</h5>
                                {/* <p>{this.props.message}</p> */}
                            </div>
                            <div className="col-md-7  col-xs-6 no-padding second-section">
                                <span>50-60<span className="min-time">Min</span></span>
                            </div>
                        </div>
                        <div className="col-md-12 section border-bottom">
                            <div className="col-md-5 no-padding first-section">
                                <h5>{this.props.contentHeaderData[6]}</h5>
                                {/* <p>{this.props.message}</p> */}
                            </div>
                            <div className="col-md-7 no-padding second-section">
                                <span className="ques-ans">80-90<span className="min-time">Min</span></span>
                            </div>
                        </div>
                        <div className="col-md-12 section">
                            <div className="col-md-5 no-padding first-section">
                                <h5>{this.props.contentHeaderData[7]}</h5>
                                {/* <p>{this.props.message}</p> */}
                            </div>
                            <div className="col-md-7 no-padding second-section">
                                <span className="ques-ans">80-97<span className="min-time">Min early</span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Examtiming
