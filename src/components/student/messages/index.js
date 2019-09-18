//Authorization:prakash
//Designed:muthuraja r.
//purpose:created for students message.
//description:Student message

import React, { Fragment } from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import classnames from "classnames";
import PageTitle from "../Layout/AppMain/PageTitle";
import TextSizeSelector from '../textsizeselector/TextSizeSelector';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
  CardHeader,
  Button,
  Card,
  CardBody,
  Container,
  Collapse,
  ListGroupItem,
  ListGroup
} from "reactstrap";
import JwPagination from "jw-react-pagination";

import { products } from "./dummydata";

import {
  faAngleLeft,
  faAngleRight,
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faTags,
  faEnvelope
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Loader } from '../Loader/loader'

const customLabels = {
  first: <FontAwesomeIcon icon={faAngleDoubleLeft} />,
  last: <FontAwesomeIcon icon={faAngleDoubleRight} />,
  previous: <FontAwesomeIcon icon={faAngleLeft} />,
  next: <FontAwesomeIcon icon={faAngleRight} />
};
const archive = [];
var messageKeyIndex = 0;
export default class CardTabsExample extends React.Component {
  constructor(props) {
    super(props);
    var exampleItems = [...Array(10).keys()].map(i => ({
      id: i + 1,
      name: "Item " + (i + 1)
    })); //pagination
    this.onChangePage = this.onChangePage.bind(this); //pagination
    this.toggle = this.toggle.bind(this); //toggle
    this.state = { show: false }; //message button show and hide
    this.handleToggleClick = this.handleToggleClick.bind(this); //message button show and hide
    this.archiveOne = this.archiveOne.bind(this);
    this.state = {
      products,
      exampleItems, //pagination
      pageOfItems: [], //pagination
      activeTab: "1",
      showMore: true,
      transform: true,
      showInkBar: true,
      selectedTabKey: 0,
      transformWidth: 400,
      collapse: false, //toggle,
      selectedProduct: null, //toggle
      selectedCheckbox: null,
      totalMessages: "",
      cart: [{}],
      black: true, //text color change
      checked: false,
      messageDisplay: true,
      isLoading: true,
      customFontSize: 0,
    };
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleSelectAllClick = this.handleSelectAllClick.bind(this);
  }

  getTextSizeValue = range => {
    this.setState({ customFontSize: Number.parseInt(range) });
  };

  componentDidMount() {
    var total = products.length;
    this.setState({
      totalMessages: total,
      isLoading: false
    }); //count total message
  }
  toggleMessageArchive = index => {

    let massegeByIndex = document.getElementsByClassName('archive-parent');
    let fullMassegeByIndex = document.getElementsByClassName('archive-message');
    massegeByIndex[index].style.fontWeight = "400";
    if (messageKeyIndex == 0) {
      fullMassegeByIndex[index].style.overflow = "visible";
      fullMassegeByIndex[index].style.height = 'unset';
      messageKeyIndex = 1;
    }
    else {
      fullMassegeByIndex[index].style.overflow = "hidden";
      fullMassegeByIndex[index].style.height = "60px";
      messageKeyIndex = 0;
    }
  };

  toggleMessage = index => {
    // this.setState(prevState => ({
    //   collapse: !prevState.collapse,
    //   selectedProduct: index,
    //   messageDisplay: !prevState.messageDisplay
    // })); //toggle
    let massegeByIndex = document.getElementsByClassName('message-border');
    let fullMassegeByIndex = document.getElementsByClassName('message');
    massegeByIndex[index].style.fontWeight = "400";
    if (messageKeyIndex == 0) {
      fullMassegeByIndex[index].style.overflow = "visible";
      fullMassegeByIndex[index].style.height = "unset";
      messageKeyIndex = 1;
    }
    else {
      fullMassegeByIndex[index].style.overflow = "hidden";
      fullMassegeByIndex[index].style.height = "60px";
      messageKeyIndex = 0;
    }
  };

  onChangePage(pageOfItems) {
    this.setState({ pageOfItems }); //pagination
  }
  markAsRead = id => {
    let checkbox = document.getElementsByName('chackboxs');
    let massegeByIndex = document.getElementsByClassName('message-border');
    for (var i in checkbox) {
      if (checkbox[i].checked === true) {
        massegeByIndex[i].style.fontWeight = "400";
      }
    }
  }
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab //tabs Message and Archive
      });
    }
  }

  handleSelectAllClick() {
    let checkbox = document.getElementsByName('chackboxs');
    if (this.state.checked == false) {
      for (var i in checkbox) {
        if (checkbox[i].checked === false) {
          checkbox[i].checked = true;
        }
      }
    }
    else {
      for (var i in checkbox) {
        if (checkbox[i].checked === true) {
          checkbox[i].checked = false;
        }
      }
    }

    this.setState({ checked: !this.state.checked });
    this.handleToggleClick();
  };

  archiveOne = index => {
    var element = products[index];
    var j = 0;
    for (var i = 0; i < products.length; i++) {
      if (products[i] != element) {
        products[j] = products[i]
        j++;
      }
    }
    archive.push(element);
    products.pop();
    document.getElementsByName('chackboxs')[index].checked = false;
    this.onChangePage(products);
    this.setState({
      totalMessages: products.length
    });
  }
  archiveSelectedAll() {
    let checkbox = document.getElementsByName('chackboxs');
    for (var i in checkbox) {
      if (checkbox[i].checked === true) {
        this.archiveOne(0);
        checkbox[i].checked = false;
      }
    }
    this.setState({ checked: false });
    // handleToggleClick();
    // document.getElementsByName('SelectAll')[0].checked = false;
  }

  handleToggleClick() {
    let checkbox = document.getElementsByName('chackboxs');
    for (var i in checkbox) {
      if (checkbox[i].checked === true) {
        this.setState({ show: true });
      }
    }
    if (this.state.show === true) {
      var index = 0;
      for (var i in checkbox) {
        if (checkbox[i].checked === true) {
          index++;
        }
      }
      if (index == 0) {
        this.setState({ show: false });
      }
    }
    var index2 = 0;
    for (var i in checkbox) {
      if (checkbox[i].checked === false) {
        this.setState({ checked: false });
        index2 = index2 + 1;
      }
    }
    if (index2 === 0) {
      this.setState({ checked: true });
      index2 = 0;
    }
  }; //message button show and hide

  handleAddToCart(book) {
    const data = products.filter(i => i.id == book.id);
    this.setState({ cart: data });

    console.log("cart", this.state.cart);
    console.log("book", book);
  }

  render() {
    return (
      <div className="message-head">
        <div>
          {this.state.isLoading ? (<Loader />) : null}
        </div>
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
              <Col lg="12">
                <PageTitle
                  heading="Messages"
                  subheading="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do."
                  brdcrumptwo="Message Center"
                  brdcrumpthree="Messages"
                />
                {/* <div><TextSizeSelector getTextSizeValue={this.getTextSizeValue} /></div>  */}
                <Card tabs="true" className="mb-3">
                  <CardHeader style={{ height: `${60 + this.state.customFontSize}px` }}>
                    <Nav justified>
                      <NavItem style={{ fontSize: `${12 + this.state.customFontSize}px` }}>
                        <NavLink
                          href="javascript:void(0);"
                          className={classnames({
                            active: this.state.activeTab === "1"
                          })}
                          onClick={() => {
                            this.toggle("1");
                          }}
                        >
                          <FontAwesomeIcon
                            className="opacity-4 mr-4"
                            icon={faEnvelope}
                          />
                          Messages{" "}
                          <span className="badge badge-pill badge-danger">
                            {this.state.totalMessages} New
                          </span>
                        </NavLink>
                      </NavItem>
                      <NavItem style={{ fontSize: `${15 + this.state.customFontSize}px` }}>
                        <NavLink
                          href="javascript:void(0);"
                          className={classnames({
                            active: this.state.activeTab === "2"
                          })}
                          onClick={() => {
                            this.toggle("2");
                          }}
                        >
                          <FontAwesomeIcon
                            className="opacity-4 mr-4"
                            icon={faTags}
                          />{" "}
                          Archive
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </CardHeader>
                  <CardBody className="p-0">
                    <TabContent
                      className=" mt-0"
                      activeTab={this.state.activeTab}
                    >
                      <TabPane tabId="1">
                        <Container fluid>
                          <Row>
                            <Col xs="6">
                              <div class="custom-checkbox custom-control mt-4 mb-4 ml-3">
                                <input type="checkbox" id="selectAll"
                                  class="custom-control-input" name="SelectAll"
                                  checked={this.state.checked} onClick={this.handleSelectAllClick}
                                />
                                <label class="custom-control-label" for="selectAll" style={{ fontSize: `${15 + this.state.customFontSize}px` }}> &nbsp; Select All </label>
                              </div>
                            </Col>
                            <Col xs="6">
                              {this.state.show && (
                                <div className="text-right">
                                  <Button className="mt-3 mb-3 mr-1 btn-icon markAsUnread" id="mySelect" onClick={this.markAsRead} style={{ fontSize: `${15 + this.state.customFontSize}px` }}>
                                    <FontAwesomeIcon className="opacity-4" icon={faTags} />
                                    Mark as read
                                  </Button>
                                  <Button className="mt-3 mb-3 mr-2  btn-icon archive" id="mySelect"
                                    onClick={() => {
                                      this.archiveSelectedAll();
                                      this.toggle("2");
                                    }}
                                    style={{ fontSize: `${15 + this.state.customFontSize}px` }}
                                  >
                                    <FontAwesomeIcon className="opacity-4" icon={faTags} />
                                    Archive
                                  </Button>
                                </div>
                              )}
                            </Col>
                          </Row>
                        </Container>
                        {this.state.pageOfItems.map((foreachitem, index) => (
                          <Col className="message-border" key={index}>
                            <Row>
                              <Col md="3" sm="12">
                                <div className="p-3 mt-3 mb-3">
                                  <div class="custom-checkbox custom-control">
                                    <input type="checkbox" id={foreachitem.id} class="custom-control-input" onClick={this.handleToggleClick} name="chackboxs"
                                    // checked={this.state.checked}
                                    // onClick={() =>
                                    //   handleToggleClick(foreachitem.id)
                                    // }
                                    />

                                    <label class="custom-control-label" for={foreachitem.id}>
                                      &nbsp;
                                    </label>
                                    {/* {this.state.show && ( */}
                                    <a style={{ fontSize: `${15 + this.state.customFontSize}px` }} href="javascript:void(0);"
                                      onClick={() => {
                                        this.archiveOne(index);
                                        this.toggle("2");
                                      }}
                                    ><FontAwesomeIcon
                                        className="opacity-4 ml-3"
                                        icon={faTags}
                                        onClick={() =>
                                          this.handleAddToCart(foreachitem)
                                        }
                                      /></a>
                                    {/* )} */}
                                    <span className="ml-3 name" style={{ fontSize: `${15 + this.state.customFontSize}px` }}>
                                      {foreachitem.name}
                                      <span className="ml-3 date">
                                        {foreachitem.date}
                                      </span>
                                    </span>
                                  </div>
                                </div>
                              </Col>
                              <Col md="9" sm="12">
                                <div
                                  className="p-3 mt-2 mb-2 message" style={this.state.myStyle}
                                  onClick={this.toggleMessage.bind(this, index)
                                  }
                                >
                                  <a href="#/students/inbox" style={{ fontSize: `${15 + this.state.customFontSize}px` }}>{foreachitem.fullMessage}</a>
                                </div>
                                {/* {this.state.selectedProduct === index ? (
                                  <Collapse isOpen={this.state.collapse} className="p-3">
                                    <span>{foreachitem.fullMessage}</span>
                                  </Collapse>
                                ) : null} */}
                              </Col>
                              <Col md="2" sm="12">
                                <div>
                                  {/* <div className="p-3 mt-3 mb-3">
                                    {foreachitem.date}
                                  </div> */}
                                </div>
                              </Col>
                            </Row>
                          </Col>
                        ))}
                      </TabPane>
                      <TabPane tabId="2">
                        <div className="message-archive" />
                        {archive.map((foreachitem, index) => (
                          <Col className="message-border archive-parent" key={index}>
                            <Row>
                              <Col md="3" sm="12">
                                <div className="p-3 mt-3 mb-3">
                                  <div class="custom-checkbox custom-control">
                                    <input
                                      type="checkbox"
                                      id={foreachitem.id}
                                      class="custom-control-input"
                                      onClick={this.handleToggleClick}
                                      name="archiveChackboxs"
                                      disabled
                                    // checked={this.state.checked}
                                    // onClick={() =>
                                    //   handleToggleClick(foreachitem.id)
                                    // }
                                    />

                                    <label
                                      class="custom-control-label"
                                      for={foreachitem.id}
                                    >
                                      &nbsp;
                                  </label>
                                    {/* {this.state.show && ( */}
                                    <a href="javascript:void(0);"
                                    // onClick={() => {
                                    //   this.archiveOne(index);
                                    //   this.toggle("2");
                                    // }} 
                                    ><FontAwesomeIcon
                                        className="opacity-4 ml-3"
                                        icon={faTags}
                                      // onClick={() =>
                                      //   this.handleAddToCart(foreachitem)
                                      // }
                                      /></a>
                                    {/* )} */}
                                    <span className="ml-3 name">
                                      {foreachitem.name}
                                      <span className="ml-3 date">
                                        {foreachitem.date}
                                      </span>
                                    </span>
                                  </div>
                                </div>
                              </Col>
                              <Col md="9" sm="12">
                                <div className="p-3 mt-2 mb-2 message archive-message" style={this.state.myStyle} >
                                  <a href="#/students/messages" onClick={this.toggleMessageArchive.bind(this, index)} style={{ fontSize: `${15 + this.state.customFontSize}px` }}>{foreachitem.fullMessage}</a>
                                </div>
                                {/* {this.state.selectedProduct === index ? (
                                <Collapse isOpen={this.state.collapse} className="p-3">
                                  <span>{foreachitem.fullMessage}</span>
                                </Collapse>
                              ) : null} */}
                              </Col>
                              <Col md="2" sm="12">
                                <div>
                                  {/* <div className="p-3 mt-3 mb-3">
                                  {foreachitem.date}
                                </div> */}
                                </div>
                              </Col>
                            </Row>
                          </Col>
                        ))}
                        {/* <p>Like Aldus PageMaker including versions of Lorem. It has survived not
                                               only five centuries, but
                                               also the leap into electronic typesetting, remaining essentially
                                                    unchanged. </p> */}
                      </TabPane>
                    </TabContent>
                  </CardBody>
                </Card>
                <div className="app-inner-layout__bottom-pane d-block text-center mb-0" style={{ fontSize: `${15 + this.state.customFontSize}px` }}>
                  <JwPagination

                    pageSize={10}
                    items={this.state.products}
                    onChangePage={this.onChangePage}
                    labels={customLabels}
                  />
                  {/* <ListGroup className="mt-3">
                    {this.state.pageOfItems.map(item => (
                      <ListGroupItem key={item.id} className="text-center">
                        {item.name}
                      </ListGroupItem>
                    ))}
                  </ListGroup> */}
                </div>
              </Col>
            </Row>
          </ReactCSSTransitionGroup>
        </Fragment>
      </div>
    );
  }
}
