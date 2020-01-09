import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Collapse, NavItem, NavLink, Row, Col, Button, UncontrolledTooltip } from "reactstrap";
import { connect } from 'react-redux';
import Hamburger from 'react-hamburgers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {
  faAngleDown, faDatabase, faAirFreshener, faChartLine, faQuestion, faBookReader, faBookOpen, faAddressBook, faTools, faHome, faUserGraduate, faChevronCircleRight, faInbox

} from '@fortawesome/free-solid-svg-icons';

import { setEnableClosedSidebar } from '../../../reducers/options'

const toggledLawSchoolSidebar =

  [{
    title: "Students",
    target: "/law-school/students",
    icon: "pe-7s-id",
    id: "students",
    subTitles: [
      {
        title: "List Students",
        target: "/law-school/students",
        icon: "pe-7s-display2",
        id: "liststudent"
      },
      {
        title: "Download Report",
        target: "/law-school/download",
        icon: "pe-7s-cloud-download",
        id: "downloadreport"
      }
    ]
  },
  {
    title: "Inbox",
    target: "/law-school/messages",
    icon: "pe-7s-chat",
    id: "inbox",
    subTitles: [
      {
        title: "Inbox",
        target: "/law-school/messages",
        icon: "pe-7s-chat",
        id: "inbox"
      },
      {
        title: "Compose",
        target: "/law-school/list-messages",
        icon: "pe-7s-display2",
        id: "compose"
      },

    ]
  },
  {
    title: "Support",
    target: "/law-school/videolecture",
    icon: "pe-7s-tools",
    id: "support",
    subTitles: [
      {
        title: " Video lectures",
        target: "/law-school/videolecture",
        icon: "pe-7s-video",
        id: "video"
      },
      {
        title: "Settings",
        target: "/law-school/settings",
        icon: "pe-7s-settings",
        id: "settings"
      },
      {
        title: "Get help",
        target: "/law-school/get-help",
        icon: "pe-7s-help1",
        id: "gethelp"
      }
    ]
  }]


class ToggledSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accordion: [false, false, false, false, false, false, false],
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
          <div className="msedge-students-toggledsidebar-segment">

            <div onClick={this.toggleEnableClosedSidebar} className="msedge-students-toggledsidebar-hamburger">
              <Hamburger
                active={this.props.enableClosedSidebar}
                type="elastic"
              // onClick={() => this.setState({active: !this.state.active})}
              />
            </div>
            <hr className="mb-2" />

            <div>
              <Link to={`/law-school`} id="overview">
                <span className="msedge-students-toggledsidebar-icons"><i className="pe-7s-home"></i></span></Link>
            </div>
            <span class="msedge-toggle-title-txt">Overview</span>
            <UncontrolledTooltip placement="right" target="overview">
              Overview
            </UncontrolledTooltip>

            <div>
              {toggledLawSchoolSidebar.map((mainmenu, index) => (
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
