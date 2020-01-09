import React, { Component } from "react";
import { Row, Col, Modal, ModalBody, ModalFooter } from "reactstrap";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { bindActionCreators } from "redux";
import { getData, currentState } from "../../actions/actionMain";
import Loading from "../../components/admin/loading";
import {customPageTitle} from "../commonComponents/customPageTitle"
import defaultThumbnail from "../../assets/utils/images/videoLectures/play.png"
import image0 from "../../assets/utils/images/videoLectures/civil.png";
import image1 from "../../assets/utils/images/videoLectures/constitutional.png";
import image2 from "../../assets/utils/images/videoLectures/contracts.png";
import image3 from "../../assets/utils/images/videoLectures/criminal.png";
import image4 from "../../assets/utils/images/videoLectures/evidence.png";
import image5 from "../../assets/utils/images/videoLectures/realproperty.png";
import image6 from "../../assets/utils/images/videoLectures/torts.png";


var imageSet = [image0, image1, image2, image3, image4, image5, image6]

class VideoLectures extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      indexValue: "",
    };
  }

  componentDidMount() {
    this.props.currentState("/students/videolibrary");
    this.props.getData();
    customPageTitle("Video Lectures")
  }

  toggle = index => {
    this.setState(prevState => ({
      modal: !prevState.modal,
      indexValue: index
    }));
  };

  disableToggle = index => {
    this.setState(prevState => ({
      modal: !prevState.modal,
      indexValue: index
    }));
  };

  addDefaultSrc(ev) {
    ev.target.src = defaultThumbnail;
  }

  render() {
    return (
      <div>
        <div className="row msedge-student-video-lecture">
          <div className="container-fluid bg-grey msedge-video-heading">
            {this.props.isLoading ? (
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
                  <Row>
                    {this.props.listData === null || this.props.listData === ""
                      ? 
                      <div className="msedge-no-video">
                      <div className="text-center">
                        <i className="pe-7s-video" id="Delete"></i>
                        <h2>No videos available</h2>
                     </div>
                     </div>
                      : this.props.listData.map((video, index) => (
                        <>
                          <Col
                            xs="12"
                            sm="12"
                            md="6"
                            lg="4"
                            xl="4"
                            className="msedge-video-lecture-seg"
                            key={index}
                            onClick={() => this.toggle(index)}
                          >
                            <div className="card msedge-video-inner" >
                              <div
                                className="card "

                              >
                                <div className="msedge-videolibrary-overlay"></div>
                                <div>
                                  <div>
                                    <img
                                      src={index <= 6 ? imageSet[index] : defaultThumbnail}
                                      onError={this.addDefaultSrc}
                                      className="msedge-video-lecture-img"
                                      alt="subject thumbnail"
                                    />

                                  </div>
                                </div>
                              </div>
                              <div className="card">
                                <h2 className="msedge-video-title msedge-video-lecture-border">
                                  {video.videoLibraryTitle}
                                </h2>
                              </div>
                            </div>
                          </Col>
                          {this.state.indexValue === index ? (
                            <Modal
                              isOpen={this.state.modal}
                              toggle={() => this.toggle(index)}
                              className={`${this.props.className} msedge-student-video-lectures-modal`}
                            >
                              <ModalBody>
                                <Col md="12">
                                  <Row>
                                    <ReactPlayer
                                      className="react-player"
                                      url={video.videoLibraryFileName}
                                      playing
                                      controls
                                      autoPlay
                                    />
                                  </Row>
                                </Col>
                                <div></div>
                              </ModalBody>
                              <ModalFooter className="msedge-close-btn">
                                <button
                                  className="btn btn-outline-primary mr-2"
                                  onClick={this.disableToggle}
                                >
                                  <li>
                                    <i class="pe-7s-close" data-for="close"></i>
                                  </li>
                                  <li className="text-uppercase">Close</li>
                                </button>
                              </ModalFooter>
                            </Modal>
                          ) : (
                              ""
                            )}
                        </>
                      ))}
                  </Row>
                </ReactCSSTransitionGroup>
              )}
          </div>
        </div>
      </div>
    );
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
      currentState
    },
    dispatch
  );
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoLectures);
