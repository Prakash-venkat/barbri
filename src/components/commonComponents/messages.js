import React, { Fragment } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import classnames from "classnames";
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, CardHeader, Button, Card, CardBody, Container, Modal, ModalBody, ModalFooter, ModalHeader, UncontrolledTooltip } from
  "reactstrap";
import JwPagination from "jw-react-pagination";
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { faAngleLeft, faAngleRight, faAngleDoubleLeft, faAngleDoubleRight, faEnvelope, faEnvelopeOpen, faArchive } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getData, deleteData, postData, updateMessage, currentState } from '../../actions/actionMain';
import Loading from '../admin/loading';
import ContentLoader from '../loaders/contentLoader';
import { instance } from "../../actions/constants";
import {customPageTitle} from "../commonComponents/customPageTitle"

const customLabels = {
  first: <FontAwesomeIcon icon={faAngleDoubleLeft} />,
  last: <FontAwesomeIcon icon={faAngleDoubleRight} />,
  previous: <FontAwesomeIcon icon={faAngleLeft} />,
  next: <FontAwesomeIcon icon={faAngleRight} />
  
};


class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredData: [],
      pageOfItems1: [], //pagination
      pageOfItems2: [], //pagination
      activeTab: "1",
      userID: "",
      userType: "",
      lawschoolId: "",
      totalMessages: 0,
      modal: false,
      indexValue: "",
      totallength: 0,
      archivedMessages: 0,
      cart: [{}],
      checkedTab1: false,
      checkedTab2: false,
      isLoading: true,
      customFontSize: 0,
      items: [],
      archivedData: [],
      unArchiveData:[],
      showTab1: false,
      showTab2:false,
      isMessageRead: false,
      msgIds1:[],
      msgIds2: [],
      unArchiveSelectAll:false,
      isContentLoader: false
    };
  }

  disableToggle = index => {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
  };

  componentDidMount() {
    let messageuserid = this.props.messagesUserId;
    let messageusertype = this.props.messageUserType;
    let messagesUserLawschoolId = this.props.messagesUserLawschoolId;

    this.setState({ userID: messageuserid, userType: messageusertype, lawschoolId: messagesUserLawschoolId }, () => this.fetchData())
    customPageTitle("Messages")


  }

  fetchData = () => {

    instance.get(`users/messages/?publishTo=${this.state.userType}&lawschoolID=${this.state.lawschoolId}&userId=${this.state.userID}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,        
      }
    })

      .then(res => {

        if (res.data.data === null || "") {
          this.setState({ isLoading: false,isContentLoader:false });
        }
        const a = res.data.data.filter(item => { return item.messageArchive != "1" ? item : "" })
        const b = res.data.data.filter(item => { return item.messageArchive === "1" ? item : "" })

        
        this.setState({
          filteredData: res.data.data,
          unArchiveData:a,
          archivedData:b,
          isLoading: false,
          isContentLoader:false
        }, () => this.totalMessages())
      }).catch(e => {
        this.setState({ isLoading: false,isContentLoader:false });
        console.log(e);
      })
  }


  totalMessages = () => {
    if (this.state.filteredData != null) {
      var totMessages = this.state.filteredData.length;
      var nomsg = 0;
      var t = 0;
      for (var i = 0; i < this.state.filteredData.length; i++) {
        if (this.state.filteredData[i].messageRead != "1") {
          t = t + 1;
        }
        if (this.state.filteredData[i].messageArchive === "1") {
          nomsg = nomsg + 1;
        }
        this.setState({
          totalMessages: t,
          archivedMessages: nomsg,
          totallength: totMessages

        });
      }
    }
    else {
      this.setState({
        totalMessages: 0
      })
    }

  }

  toggleMessage = (value, index) => {
    this.setState(prevState => ({
      modal: !prevState.modal,
      [index]: index,
      indexValue: index,
      totalMessages: value.messageRead != 1 ? this.state.totalMessages -1 : this.state.totalMessages
    }));
    if (value.messageRead === "0" || value.messageRead == null) {
      var msgStatus = JSON.stringify({
        "messageId": value.messageId,
        "messageArchive": "0",
        "messageRead": "1",
        "messageUserId": this.props.messagesUserId,
      })
      instance.post("messages/status", msgStatus,{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,        
        }
      })
        .catch(e => {
          console.log(e)
        })
    }
  };

  onChangePage1 = (pageOfItems1) => { 
    this.setState({pageOfItems1 });
  }

  onChangePage2=(pageOfItems2) =>{
    this.setState({ pageOfItems2}); 
  }

  markAsRead = () => {

      for (var i in this.state.msgIds1) {
          var msgStatus = JSON.stringify({
            "messageId": this.state.msgIds1[i],
            "messageArchive": "0",
            "messageRead": "1",
            "messageUserId": this.props.messagesUserId,
          })
          
          instance.post("messages/status", msgStatus,{
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,        
            }
          })
            .then(res => {
              this.fetchData();
            })
            .catch(e => {
              console.log(e)
            }) 
    }
    this.setState({ checkedTab1: false,showTab1:false,msgIds1:[] })
  }

  toggle=(tab)=> {
    if (this.state.activeTab != tab) {
      if(tab == "1"){
        this.fetchData();
      }
      this.setState({
        activeTab: tab //tabs Message and Archive
      });
    }
  }

  handleSelectAllClick = () => {

    this.setState({checkedTab1:!this.state.checkedTab1,showTab1:!this.state.showTab1})
        
        if (this.state.checkedTab1 == false && this.state.msgIds1.length >= 0) { 

      this.state.unArchiveData.filter(data => {
        return this.state.msgIds1.includes(data.messageId) ? "" : this.state.msgIds1.push(data.messageId)})
      this.setState({ checkedTab1: true, showTab1: true })
    } else if (this.state.checkedTab1 == true){
        this.setState({msgIds1:[]})
    } 
  };

  tab2SelectAllClick = () => {    
  
    this.setState({ checkedTab2: !this.state.checkedTab2, showTab2: !this.state.showTab2 })

    if (this.state.checkedTab2 == false && this.state.msgIds2.length >= 0) {

      this.state.archivedData.filter(data => {
        return this.state.msgIds2.includes(data.messageId) ? "" : this.state.msgIds2.push(data.messageId)
      })
      this.setState({ checkedTab2: true, showTab2: true })
    } else if (this.state.checkedTab2 == true) {
      this.setState({ msgIds2: [] })
    }
  };


  archiveOne = (value, toggleModal) => {
    this.setState({isContentLoader:true})

    var msgStatus = JSON.stringify({
      "messageId": value.messageId,
      "messageArchive": "1",
      "messageRead": "1",
      "messageUserId": this.props.messagesUserId
    })

    instance.post("messages/status", msgStatus, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,        
      }
    })
      .then(res => {
        this.fetchData();
        if (!toggleModal) {
          this.setState(prevState => ({
            modal: !prevState.modal,
          }));
        }

      })
      .catch(e => {
        console.log(e)
      })
  }

  componentDidUpdate(){

    var els = document.querySelectorAll('.page-link');

            for (var i=0; i < els.length; i++) {
                    // els[i].setAttribute("tabindex", "0") ;
                    els[i].setAttribute("href", "javascript:void(0)") ;

        }
      }

  messageOne = (value) => {
    
    var msgStatus = JSON.stringify({
      "messageId": value.messageId,
      "messageArchive": "0",
      "messageRead": "1",
      "messageUserId": this.props.messagesUserId
    })

    instance.post("messages/status", msgStatus,{
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,        
      }
    })
      .then(res => {
        this.fetchData();
      })
      .catch(e => {
        console.log(e)
      })
  }

  archiveSelectedAll() {  
    this.setState({isContentLoader:true})
      for (var i in this.state.msgIds1) {
          var msgStatus = JSON.stringify({
            "messageId":this.state.msgIds1[i],
            "messageArchive": "1",
            "messageRead": "1",
            "messageUserId": this.props.messagesUserId,
          })          
          instance.post("messages/status", msgStatus, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,        
            }
          })
            .then(res => {
              this.fetchData();
            })
            .catch(e => {
              console.log(e)
            })    
    }
    this.setState({ checkedTab1: false,showTab1:false,msgIds1:[] });
  }

  messageSelectedAll() {
    this.setState({isContentLoader:true})

      for (var i in this.state.msgIds2) {
          
          var msgStatus = JSON.stringify({
            "messageId": this.state.msgIds2[i],
            "messageArchive": "0",
            "messageRead": "1",
            "messageUserId": this.props.messagesUserId,
          })

          instance.post("messages/status", msgStatus, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,        
            }
          })
            .then(res => {
              this.fetchData();
            })
            .catch(e => {
              console.log(e)
            })      
    }
    this.setState({ checkedTab2: false,showTab2:false,msgIds2:[] });
  }

  
  handleToggleClick=(tab,id)=> {  

    if(tab===1) {  

        if(this.state.checkedTab1===true)
            this.setState({checkedTab1:false})     

      if(this.state.msgIds1.includes(id)){

        let selectedId = this.state.msgIds1;
        selectedId = selectedId.filter((items) => {
          return items !== id
        })
        this.setState({ msgIds1: selectedId },
           () => {{this.state.msgIds1===[] ? this.state.showTab1 ===false : this.state.showTab1}})

      }else{
        let a = this.state.msgIds1;
        a.push(id)
        this.setState({ showTab1: true, msgIds1: a }, () => {

          if (this.state.unArchiveData.length === this.state.msgIds1.length)
            this.setState({checkedTab1: true})    
        });
      }
  }
  if(tab===2){

    if (this.state.checkedTab2 === true)
      this.setState({ checkedTab2: false })

    if (this.state.msgIds2.includes(id)) {

      let selectedId = this.state.msgIds2;
      selectedId = selectedId.filter((items) => {
        return items !== id
      })
      this.setState({ msgIds2: selectedId },
        () => { { this.state.msgIds2 === [] ? this.state.showTab2 === false : this.state.showTab2 } })

    } else {
      let a = this.state.msgIds2;
      a.push(id)
      this.setState({ showTab2: true, msgIds2: a }, () => {

        if (this.state.archivedData.length === this.state.msgIds2.length)
          this.setState({ checkedTab2: true })
      });
    }
  }
  };

  handleAddToCart = (book) => {
    const data = this.state.filteredData.filter(i => i.id === book.id);
    this.setState({ cart: data });
  }

  getStyle(status) {
    if (status === null || status === " ")
      return ({ fontWeight: '400' })
  }

  render() {
  
    return (

      <div>
        {this.state.isLoading ? (
          <Loading />
        ) : (
            <div className="msedge-message-head">

              <Fragment>
                <ReactCSSTransitionGroup
                  component="div"
                  transitionName="TabsAnimation"
                  transitionAppear={true}
                  transitionAppearTimeout={0}
                  transitionEnter={false}
                  transitionLeave={false}
                >
                  <Row>
                    <Col lg="12" md="12" sm="12" xl="12">
                      <Row>
                        <div className="container-fluid bg-grey ptb-30">
                          <Col lg="12" md="12" sm="12" xs="12">
                            <Card tabs="true">
                              <CardHeader>
                                <Nav justified>
                                  <NavItem >
                                    <NavLink className={classnames({ active: this.state.activeTab === "1" })}
                                      onClick={() => { this.toggle("1"); }}
                                    >
                                      {this.state.totalMessages === 0 ? <FontAwesomeIcon className="message-icon" icon={faEnvelope} /> : <FontAwesomeIcon className="message-icon" icon={faEnvelopeOpen} />}
                                      Messages{" "}
                                      {this.state.totalMessages === 0 ? "" :

                                        <span className="badge badge-pill badge-danger">
                                          {this.state.totalMessages} New
                                       </span>
                                      }
                                    </NavLink>
                                  </NavItem>
                                  <NavItem>
                                    <NavLink className={classnames({ active: this.state.activeTab === "2" })}
                                      onClick={() => { this.toggle("2"); }}>
                                      <FontAwesomeIcon className="" icon={faArchive} />{" "}
                                      Archive
                                       </NavLink>
                                  </NavItem>
                                </Nav>
                              </CardHeader>
                              <CardBody className="p-0">
                                <TabContent className=" mt-0" activeTab={this.state.activeTab} >
                                  <TabPane tabId="1">
                                    {(this.state.totallength - this.state.archivedMessages) > 0 ? <div>
                                      <Container fluid>
                                        <Row>
                                          <Col xs="6" lg="6" md="6" sm="6">
                                            <div className="custom-checkbox custom-control mt-4 mb-4 ml-3">
                                              <input type="checkbox" id="selectAll"
                                                aria-label="select messages"
                                                className="custom-control-input" name="SelectAll"
                                                checked={this.state.checkedTab1}
                                                 onClick={this.handleSelectAllClick}
                                              />
                                              <label className="custom-control-label msedge-no-of-questions-answered" htmlFor="selectAll"> &nbsp; Select All </label>
                                            </div>
                                          </Col>
                                          <Col xs="6" lg="6" md="6" sm="6">
                                            {this.state.showTab1 && (
                                              <div className="text-right">
                                                <Button className="mt-3 mb-3 mr-1 btn-icon markAsUnread" id="mySelect" onClick={this.markAsRead}>
                                                  <FontAwesomeIcon className="opacity-4 markAsUnread-icon" icon={faEnvelope} />
                                                  Mark as read
                                               </Button>
                                                <Button className="mt-3 mb-3 mr-2  btn-icon archive" id="mySelect"
                                                  onClick={() => { this.archiveSelectedAll(); this.toggle("2"); }}>
                                                  <FontAwesomeIcon className="opacity-4 archive-icon" icon={faArchive} />
                                                  Move to archive
                                              </Button>
                                              </div>
                                            )}
                                          </Col>
                                        </Row>
                                      </Container>
                                      { this.state.pageOfItems1.map((foreachitem, index) => ( 
                                        <>
                                          <Col className="msedge-message-border" key={index} style={this.getStyle(foreachitem.messageRead)}>
                                            {(foreachitem.messageArchive != "1" || foreachitem.messageArchive === null) ? (
                                              <Row>
                                                <Col md="4" lg="3" sm="12">
                                                  <div className="p-3 mt-3 mb-3">
                                                    <div className="custom-checkbox custom-control">
                                                      <input type="checkbox" aria-label="select messages" id={foreachitem.messageId} checked={this.state.msgIds1.includes(foreachitem.messageId)}  className="custom-control-input" onClick=
                                                        {() => this.handleToggleClick(1, foreachitem.messageId)} name="checkboxsTab1"
                                                      />
                                                      <label className="custom-control-label" htmlFor={foreachitem.messageId}>
                                                        &nbsp;
                                                    </label>
                                                    {foreachitem.messageRead === "1" ?<FontAwesomeIcon className="mr-2" icon={faEnvelope}/> :<FontAwesomeIcon className="mr-2" icon={faEnvelopeOpen}/>}
                                                      <a onClick={() => {
                                                        this.archiveOne(foreachitem, "fromIcon"); this.toggle("2");
                                                      }}
                                                      >
                                                        <UncontrolledTooltip placement="top" target="archive">
                                                          Move to archive
                                                        </UncontrolledTooltip>
                                                        <FontAwesomeIcon className="ml-1 c-pointer"  id="archive" icon={faArchive} onClick={() => this.handleAddToCart(foreachitem)} />
                                                      </a>
                                                      <span className="ml-3 name ada-font" style={{
                                                        fontWeight: foreachitem.messageRead === "1" ? "400" : "700", cursor: "pointer"
                                                      }}
                                                      
                                                        onClick={() => this.toggleMessage(
                                                          foreachitem,
                                                          index)
                                                        }
                                                      >
                                                        {foreachitem.message_title.length > 15 ? `${foreachitem.message_title.substring(
                                                          0,
                                                          15
                                                        )}.....` :
                                                          foreachitem.message_title}

                                                        <span className="ml-3 date msedge-no-of-questions-answered">
                                                          {moment(foreachitem.message_created_at).format("MM-DD-YYYY")}
                                                        </span>
                                                      </span>
                                                    </div>
                                                  </div>
                                                </Col>
                                                <Col md="8" lg="9" sm="12">
                                                  <div
                                                    style={{
                                                      fontWeight: foreachitem.messageRead === "1" || this.state[index] == index ? "400" : "700", cursor:
                                                        "pointer"
                                                    }}
                                                    className="p-3 mt-3 mb-3 msedge-message-fontsize"
                                                    onClick={() => this.toggleMessage(
                                                      foreachitem,

                                                      index)
                                                    }
                                                  >
                                                    {foreachitem.message_contents.substring(0, 200) + '... ' }

                                                  </div>
                                                </Col>
                                                <Col md="2" sm="12">
                                                  <div>
                                                  </div>
                                                </Col>
                                              </Row>) : (null)}
                                          </Col>

                                          {this.state.indexValue === index ? (
                                           
                                            <Modal
                                              isOpen={this.state.modal}
                                              className={`${this.props.className}
                                              modal-center messages-modal msedge-message-position`}
                                            >
                                              <ModalHeader>
                                                <h5 className="text-primary mb-0">{foreachitem.message_title}</h5>
                                              </ModalHeader>
                                              <ModalBody className="pt-4 pb-4 msedge-message-modal">
                                                <Row>
                                                  <Col md="12">
                                                    <p className="mb-0 msedge-no-of-questions-answered">{foreachitem.message_contents}</p>

                                                  </Col>
                                                </Row>
                                              </ModalBody>
                                              <ModalFooter className="d-unset msedge-close-btn">
                                                <Row>
                                                  <Col md="12">
                                                <div className="pull-left d-inline-flex">
                                                  <p className="mt-1 mb-0 mr-2 msedge-no-of-questions-answered
                                                  ">by {foreachitem.message_published_by}</p>
                                                  <p className="mt-1 mb-0 msedge-no-of-questions-answered">{moment(foreachitem.message_published_at).format("MM-DD-YYYY")}</p>
                                                </div>
                                                <div className="pull-right">
                                                {foreachitem.messageArchive === "0" || foreachitem.messageArchive === null ? 
                                                <button
                                                    className="btn btn-outline-primary mr-2"
                                                    onClick={() => {
                                                      this.archiveOne(foreachitem); this.toggle("2");
                                                     
                                                    }}
                                                  >
                                                    <li className="msedge-inbox-archive">
                                                    <FontAwesomeIcon className="" icon={faArchive} onClick={() => this.handleAddToCart(foreachitem)} />
                                                    </li>
                                                    <li className="text-uppercase" onClick={this.disableToggle}>Move to archive</li>
                                                  </button>
                                            :
                                            <button
                                            className="btn btn-outline-primary mr-2"
                                            onClick={() => {
                                              this.messageOne(foreachitem); this.toggle("1");
                                              
                                            }}
                                          >
                                            <li className="msedge-inbox-archive">
                                            <FontAwesomeIcon className="" icon={faEnvelope} onClick={() =>{ this.handleAddToCart(foreachitem) ;this.toggle("1")}} />
                                            </li>
                                            <li className="text-uppercase" onClick={this.disableToggle}>Move to messages</li>
                                          </button>            
                                            } <button
                                                    className="btn btn-outline-primary mr-2"
                                                    onClick={this.disableToggle}
                                                  >
                                                    <li>
                                                    <i className="pe-7s-close" data-for="close"></i>
                                                    </li>
                                                    <li className="text-uppercase">Close</li>
                                                  </button>
                                                </div>
                                                </Col>
                                                </Row>
                                              </ModalFooter>
                                            </Modal>
                                          ) : (
                                              ""
                                            )}
                                        </>
                                      ))}
                                    </div> :
                                      <div className="msedge-no-data">
                                        <h6>No message found</h6>
                                      </div>
                                    }
                                  </TabPane>
                                  <TabPane tabId="2">
                                    <div>
                                      {this.state.isContentLoader ? <ContentLoader /> :
                                        <div>
                                          {(this.state.archivedMessages) > 0 ?
                                            <div>
                                              <Container fluid>
                                                <Row>
                                                  <Col xs="6" lg="6" md="6" sm="6">
                                                    <div className="custom-checkbox custom-control mt-4 mb-4 ml-3">
                                                      <input type="checkbox" id="selectAll2"
                                                        aria-label="select messages"
                                                        className="custom-control-input" name="SelectAll2"
                                                        checked={this.state.checkedTab2}
                                                         onClick={this.tab2SelectAllClick}
                                                      />
                                                      <label className="custom-control-label msedge-no-of-questions-answered" htmlFor="selectAll2"> &nbsp; Select All </label>
                                                    </div>
                                                  </Col>
                                                  <Col xs="6" lg="6" md="6" sm="6">
                                                    {this.state.showTab2 && (
                                                      <div className="text-right">
                                                        <Button className="mt-3 mb-3 mr-1 btn-icon markAsUnread" id="mySelect"
                                                          onClick={() => { this.messageSelectedAll(); this.toggle("1"); }}>
                                                          <FontAwesomeIcon className="opacity-4 markAsUnread-icon" icon={faEnvelope} />
                                                          Move to messages
                                               </Button>
                                                      </div>
                                                    )}
                                                  </Col>
                                                </Row>
                                              </Container>
                                              {this.state.pageOfItems2.map((foreachitem, indexes) => (

                                                <Col className="msedge-message-border msedge-archive-parent" key={indexes} style={this.getStyle(foreachitem.messageRead)}>
                                                  {foreachitem.messageArchive === "1" ? (
                                                    <Row>

                                                      <Col md="4" lg="3" sm="12">
                                                        <div className="p-3 mt-3 mb-3">
                                                          <div className="custom-checkbox custom-control">
                                                            <input type="checkbox" className="custom-control-input" 
                                                              checked={this.state.msgIds2.includes(foreachitem.messageId)} 
                                                            onClick={() => this.handleToggleClick(2, foreachitem.messageId)} name="checkboxsTab2" id={foreachitem.messageId}
                                                            />
                                                            <label className="custom-control-label" htmlFor={foreachitem.messageId}>
                                                              &nbsp;
                                                    </label>
                                                            <a onClick={() => {
                                                              this.messageOne(foreachitem); this.toggle("1");
                                                            }}
                                                            >
                                                              <UncontrolledTooltip placement="top" target="messages">
                                                                Move to messages
                                                        </UncontrolledTooltip>
                                                              <FontAwesomeIcon className="ml-3 c-pointer" id="messages" icon={faEnvelope} />
                                                            </a>
                                                            <span className="ml-3 name ada-font" style={{
                                                              fontWeight: foreachitem.messageRead === "1" ? "400" : "700"
                                                            }}>

                                                              {foreachitem.message_title.length > 15 ? `${foreachitem.message_title.substring(
                                                                0,
                                                                15
                                                              )}.....` :
                                                                foreachitem.message_title}

                                                              <span className="ml-3 date msedge-no-of-questions-answered">
                                                                {moment(foreachitem.message_created_at).format("MM-DD-YYYY")}
                                                              </span>
                                                            </span>
                                                          </div>
                                                        </div>
                                                      </Col>
                                                      <Col md="8" sm="12">
                                                        <div className="p-3 mt-2 mb-2  msedge-archive-message msedge-no-of-questions-answered" style={{
                                                          fontWeight: foreachitem.messageRead === "1" ? "400" : "700", cursor: "pointer"
                                                        }} onClick={() => this.toggleMessage(foreachitem, indexes

                                                        )}>

                                                          {foreachitem.message_contents.substring(0, 200) + '... '}
                                                        </div>
                                                      </Col>
                                                      <Col md="2" sm="12">
                                                        <div>
                                                        </div>
                                                      </Col>
                                                    </Row>) : (null)}
                                                </Col>
                                              ))
                                              }
                                            </div> :

                                            <div className="msedge-no-data">
                                              <h6>No archived message found</h6>
                                            </div>
                                          }
                                        </div>
                                      }
                                    </div>
                                  </TabPane>
                                </TabContent>
                              </CardBody>
                            </Card>
                            {this.state.activeTab === "1" ? (
                            <div className="msedge-bottom-pane d-block text-center mb-0">
                              <JwPagination
                                pageSize={15}
                                items={this.state.unArchiveData}
                                onChangePage={this.onChangePage1}
                                labels={customLabels}
                                  initialPage ={1}
                              />
                            </div>
                            ) : (
                            <div className="msedge-bottom-pane d-block text-center mb-0">
                              <JwPagination
                                pageSize={15}
                                items={this.state.archivedData}
                                onChangePage={this.onChangePage2}
                                labels={customLabels}
                              />
                            </div>
                            )}
                          </Col>
                        </div>
                      </Row>
                    </Col>
                  </Row>
                </ReactCSSTransitionGroup>
              </Fragment>
            </div>
          )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    msgData: state.main.data,
    isLoading: state.main.load
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getData,
    postData,
    deleteData,
    updateMessage,
    currentState
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Messages)