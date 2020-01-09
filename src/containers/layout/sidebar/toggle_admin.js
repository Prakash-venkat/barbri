import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Collapse, NavItem, NavLink, Row, Col, Button, UncontrolledTooltip } from "reactstrap";
import { connect } from 'react-redux';
import Hamburger from 'react-hamburgers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {
  faAngleDown, faDatabase, faInbox, faTag, faChartLine, faMoneyCheck, faQuestion, faEdit, faUsers, faBookReader, faBookOpen, faAddressBook, faTools, faHome, faUserGraduate, faChevronCircleRight, faVideo

} from '@fortawesome/free-solid-svg-icons';

import { setEnableClosedSidebar } from '../../../reducers/options'

const toggledAdminSidebar =

  [
    {
      title: "Law Schools",
      target: "/admin/list_lawschool",
      icon: "pe-7s-notebook",
      id: "lawschool",
      subTitles: [
        {
          title: "List Law Schools",
          target: "/admin/list_lawschool",
          icon: "pe-7s-display2",
          id: "listlawschools"
        },
        {
          title: "Add Law School",
          target: "/admin/add_lawschool",
          icon: "pe-7s-plus",
          id: "addlawschool"
        },
        {
          title: "List Law Schools",
          target: "/admin/list_lawschool_enquiry",
          icon: "pe-7s-info",
          id: "lawschoolenquiry"
        }
      ]
    },
    {
      title: "Students",
      target: "/admin/list_student",
      icon: "pe-7s-id",
      id: "students",
      subTitles: [
        {
          title: "List Students",
          target: "/admin/list_student",
          icon: "pe-7s-display2",
          id: "liststudents"
        },
        {
          title: "Add Student",
          target: "/admin/add_student",
          icon: "pe-7s-plus",
          id: "addstudent"
        },
        {
          title: "Upload Student",
          target: "/admin/upload_student",
          icon: "pe-7s-upload",
          id: "uploadstudnet"
        },
        {
          title: "Invite Students",
          target: "/admin/invite_student",
          icon: "pe-7s-mail-open",
          id: "invitestudents"
        }
      ]
    },
    // {
    //     title: "Item Error",
    //     target: "/admin/itemerror",
    //     icon: faTools,
    // },
    {
      title: "Pre-Created Exam",
      target: "/admin/list_precreatedexam",
      icon: "pe-7s-note",
      id: "precreatedexam",
      subTitles: [
        {
          title: "List Pre-Created Exam",
          target: "/admin/list_precreatedexam",
          icon: "pe-7s-display2",
          id: "listprecreatedexam"
        },
        {
          title: "Add Pre-Created Exam",
          target: "/admin/add_precreatedexam",
          icon: "pe-7s-plus",
          id: "addprecreatedexam"
        }
      ]
    },
    {
      title: "Users",
      target: "/admin/list_user",
      icon: "pe-7s-users",
      id: "users",
      subTitles: [
        {
          title: "List Users",
          target: "/admin/list_user",
          icon: "pe-7s-display2",
          id: "listusers"
        },
        {
          title: "Add User",
          target: "/admin/add_user",
          icon: "pe-7s-plus",
          id: "adduser"
        }
      ]
    },
    {
      title: "Video Library",
      target: "/admin/list_videolibrary",
      icon: "pe-7s-video",
      id: "videolibrary",
      subTitles: [
        {
          title: "List VIdeo",
          target: "/admin/list_videolibrary",
          icon: "pe-7s-display2",
          id: "listvideo"
        },
        {
          title: "Add Video",
          target: "/admin/add_videolibrary",
          icon: "pe-7s-plus",
          id: "addvideo"
        }
      ]
    },
    {
      title: "Messages",
      target: "/admin/list_messagenotify",
      icon: "pe-7s-chat",
      id: "messaged",
      subTitles: [
        {
          title: "List Messages",
          target: "/admin/list_videolibrary",
          icon: "pe-7s-display2",
          id: "listmessages"
        },
        {
          title: "Add Messages",
          target: "/admin/add_videolibrary",
          icon: "pe-7s-plus",
          id: "addmessages"
        }
      ]
    },
    {
      title: "Item Bank",
      target: "/admin/list_itembank",
      icon: "pe-7s-folder",
      id: "itembank",
      subTitles: [
        {
          title: "List Item Bank",
          target: "/admin/list_itembank",
          icon: "pe-7s-display2",
          id: "listitembank"
        },
        {
          title: "Add Item Bank",
          target: "/admin/add_itembank",
          icon: "pe-7s-plus",
          id: "additembank"
        }
      ]
    },
    {
      title: "Item Tag",
      target: "/admin/list_itemtag",
      icon: "pe-7s-ticket",
      id: "itemtag",
      subTitles: [
        {
          title: "List Item Tags",
          target: "/admin/list_itemtag",
          icon: "pe-7s-display2",
          id: "listitemtags"
        },
        {
          title: "Add Item Tag",
          target: "/admin/add_itemtag",
          icon: "pe-7s-plus",
          id: "additemtag"
        }
      ]
    },
    // {
    //     title: "Settings",
    //     target: "/admin/settings",
    //     icon: faTools,
    // },
  ]


class ToggledSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accordion: [false, false, false, false, false, false, false, false, false],
    }

  }

  toggleAccordion = (tab) => {
    const prevState = this.state.accordion;
    const state = prevState.map((x, index) => (tab === index ? !x : false));
    this.setState({
      accordion: state
    })
  }

  toggleEnableClosedSidebar = () => {
    let { enableClosedSidebar, setEnableClosedSidebar } = this.props;
    setEnableClosedSidebar(!enableClosedSidebar);
  }

  render() {
    return (
      <div className="msedge-students-toggledsidebar-main" id="accordion">
        <ReactCSSTransitionGroup
          //   component="div"
          transitionName="SidebarAnimation"
          transitionAppear={true}
          transitionAppearTimeout={1500}
          transitionEnter={false}
          transitionLeave={false}
        >
          <div className="msedge-students-toggledsidebar-segment admin-sidescroll-bar">

            <div onClick={this.toggleEnableClosedSidebar} className="msedge-students-toggledsidebar-hamburger">
              <Hamburger
                active={this.props.enableClosedSidebar}
                type="elastic"
              // onClick={() => this.setState({active: !this.state.active})}
              />
            </div>
            <hr className="mb-2" />

            <div>
              <Link to={`/admin`} id="overview">
                <span className="msedge-students-toggledsidebar-icons"><i className="pe-7s-home"></i></span></Link>
            </div>
            <span class="msedge-toggle-title-txt">Overview</span>
            <UncontrolledTooltip placement="right" target="overview">
              Overview
                                                        </UncontrolledTooltip>

            <div>
              {toggledAdminSidebar.map((mainmenu, index) => (
                <div>
                  <div className="msedge-students-toggledsidebar-icons-main">

                    <Link to={`${mainmenu.target}`} id={`${mainmenu.id}`} onClick={() => this.toggleAccordion(index)} aria-expanded={this.state.accordion[index]} aria-controls="collapseOne">
                      <span className="msedge-students-toggledsidebar-icons"><i className={`${mainmenu.icon}`}></i></span></Link></div>
                  <span class="msedge-toggle-title-txt">{`${mainmenu.title}`}</span>
                  <UncontrolledTooltip placement="right" target={`${mainmenu.id}`}>
                    {mainmenu.title}
                  </UncontrolledTooltip>
                  {/* {!this.state.accordion[index] ? <i className="pe-7s-angle-right msedge-students-toggledsidebar-arrow-down"></i> : <i className="pe-7s-angle-up msedge-students-toggledsidebar-arrow-right"></i>} */}

                  <Collapse
                    isOpen={
                      this.state.accordion[
                      index
                      ]
                    }
                    data-parent="#accordion"
                    id="collapseOne"
                    aria-labelledby="headingOne"
                    className="msedge-timing-performance-accordian-background"
                  >
                    <div>
                      {mainmenu.subTitles.map((nextmenu, i) => (
                        <div>
                          <div>
                          <Link to={nextmenu.target} id={nextmenu.id} className="msedge-students-toggledsidebar-nextmenu-icons"><i className={`${nextmenu.icon}`}></i></Link>

                          <UncontrolledTooltip placement="right" target={nextmenu.id}>
                            {nextmenu.title}
                          </UncontrolledTooltip>

                        </div>
                        <span className="msedge-togglecollapse-submenu">{`${nextmenu.title}`}</span>
                        </div>
                      ))}
                    </div>
                  </Collapse>

                </div>
              ))}
              <div className="msedge-students-toggledsidebar-icons-main">
                <Link to={`/admin/itemerror`}>
                  <span className="msedge-students-toggledsidebar-icons"><i className="pe-7s-display2"></i></span></Link>
              </div>
              <span class="msedge-toggle-title-txt">Item error</span>
              <div className="msedge-students-toggledsidebar-icons-main">
                <Link to={`/admin/settings`}>
                  <span className="msedge-students-toggledsidebar-icons"><i className="pe-7s-tools"></i></span></Link>
              </div>
              <span class="msedge-toggle-title-txt">Settings</span>

            </div>

          </div>
        </ReactCSSTransitionGroup>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  enableClosedSidebar: state.options.enableClosedSidebar,
});

const mapDispatchToProps = dispatch => ({
  setEnableClosedSidebar: enable => dispatch(setEnableClosedSidebar(enable)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ToggledSidebar);
