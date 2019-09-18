//Authorization:
//Designed : by Ajay
//Purpose: Creating for the video lectures
//Description: displaying the video content

import React, { Component, Fragment } from 'react';
import { CustomInput, Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardHeader, CardBody, CardGroup, Col, Container, Row, Input, FormGroup, Label } from 'reactstrap';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PageTitle from '../Layout/AppMain/PageTitle';
import { subjects } from "./subject.json";
import { Player, BigPlayButton, ControlBar, LoadingSpinner } from 'video-react';
import "../../../../node_modules/video-react/dist/video-react.css"
import TextSizeSelector from "../textsizeselector/TextSizeSelector";


export class VideoLectures extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: 0,
            currentVideo: subjects[0].subjectUrl,
            currentImage: subjects[0].subjectImage,
            modal: false,

        }
        this.getVideo.bind(this);

        //this.toggle = this.toggle.bind(this);

    }
    getVideo(index) {
        this.setState({ currentVideo: subjects[index].subjectUrl, active: index })
        this.setState({ currentImage: subjects[index].subjectImage, active: index })

        // console.log(this.state.currentVideo ,'current' ,subjects[index].subjectName)
    }

    getTextSizeValue = range => {
        this.setState({ customFontSize: Number.parseInt(range) });
    };

    render() {

        return (
            <div className="video-header">
                <Fragment>
                    <ReactCSSTransitionGroup
                        component="div"
                        transitionName="TabsAnimation"
                        transitionAppear={true}
                        transitionAppearTimeout={0}
                        transitionEnter={false}
                        transitionLeave={false}>
                        <PageTitle
                            heading="Video Lectures"
                            brdcrumptwo="Video Lectures"
                            brdcrumpthree={subjects[this.state.active].subjectName}
                        />
                        {/* <div>
                            <TextSizeSelector getTextSizeValue={this.getTextSizeValue} />
                        </div> */}
                        <Row>
                            <Col md="5" sm="6">
                                {subjects.map((subject, index) =>
                                    <div id="accordion" className="mb-1 video-lecture">
                                        <div id="headingOne" className="card-header">
                                            <Button block color="black" className="text-left pl-0" aria-controls=""
                                                onClick={this.getVideo.bind(this, index)}>
                                                <div className={this.state.active === index ? "m-0 p-0  text-primary" : "m-0 p-0 font-weight-bold"}>
                                                    <h6 style={{ fontSize: `${14 + this.state.customFontSize}px` }}>{subject.subjectName}</h6>
                                                </div>
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </Col>
                            <Col md="7" sm="6" >
                                <div className="video-player" onClick={this.fullScreen} style={{ fontSize: `${14 + this.state.customFontSize}px` }}>
                                    <Player
                                        fluid={false}
                                        width={'auto'}
                                        height={416}
                                        poster={this.state.currentImage}
                                        src={this.state.currentVideo} >
                                        <LoadingSpinner />
                                        <BigPlayButton position="center" />
                                    </Player>
                                </div>
                            </Col>
                        </Row>
                    </ReactCSSTransitionGroup>
                </Fragment>
            </div>
        )
    }
}

export default VideoLectures
