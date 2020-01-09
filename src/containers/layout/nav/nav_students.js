import React from "react";
import {
  faHome,
  faCopy
} from "@fortawesome/free-solid-svg-icons";
import SubMenu from "./NavItems";
import { NavItem, NavLink, Nav } from "reactstrap";
import { NavLink as RouterLink } from "react-router-dom";

const SideBar = props => (
  <div className="msedge-custom-sidebar">
    <div className="msedge-sidebar-header"></div>
    <div className="msedge-side-menu">
      <Nav vertical className="pb-3">
        <NavItem>
          <NavLink
            tag={RouterLink}
            activeStyle={{
              color: "#006EBD",
              textDecoration: "none",
              boxShadow: "inset -4px 0 0 #006EBD",
              background: "#eee"
            }}
            to={"/students"}
            activeclassname="active"
            exact={true}
          >
            OVERVIEW
          </NavLink>
        </NavItem>

        {/* <SubMenu
          title="Questions"
          icon={faHome}
          items={submenus[0]}
          redirect={"/students/questions"}
        /> */}

     <NavItem>
          <NavLink
            tag={RouterLink}
            activeStyle={{
              color: "#006EBD",
              textDecoration: "none",
              boxShadow: "inset -4px 0 0 #006EBD",
              background: "#eee"
            }}
            to={"/students/questions"}
            activeclassname="active"
            exact={true}
          >
            Questions
          </NavLink>
        </NavItem>

        <SubMenu
          title="Exams"
          icon={faCopy}
          items={submenus[0]}
          redirect={"/students/exam-practice"}
        />

           <SubMenu
          title="Statistics"
          icon={faHome}
          items={submenus[1]}
          redirect={"/students/performance"}
        /> 

        <SubMenu
          title="Support"
          icon={faCopy}
          items={submenus[2]}
          redirect={"/students/video-lectures"}
        />
        {/* <div>
          <NavItem>
            <NavLink tag={RouterLink} activeStyle={{ color: '#0070c0', textDecoration: 'none', boxShadow: 'inset -4px 0 0 #0070c0', background: '#eee' }} to={"/students/video-lectures"} activeclassname="active" exact={true}>
              VIDEO LECTURES
            </NavLink>
          </NavItem>
        </div> */}
        {/* <div>
          <NavItem>
            <NavLink tag={RouterLink} to={"/students/settings"} activeStyle={{ color: '#0070c0', textDecoration: 'none', boxShadow: 'inset -4px 0 0 #0070c0', background: '#eee' }} exact={true}>
              SETTINGS
            </NavLink>
          </NavItem>
        </div> */}
        {/* <div>
          <NavItem>
            <NavLink tag={RouterLink} to={"/students/inbox"} activeStyle={{ color: '#0070c0', textDecoration: 'none', boxShadow: 'inset -4px 0 0 #0070c0', background: '#eee' }} exact={true}>
              INBOX
            </NavLink>
          </NavItem>
        </div>
        <div>
          <NavItem>
            <NavLink tag={RouterLink} activeStyle={{ color: '#0070c0', textDecoration: 'none', boxShadow: 'inset -4px 0 0 #0070c0', background: '#eee' }} to={"/students/get-help"} activeclassname="active" exact={true}>
              GET HELP
            </NavLink>
          </NavItem>
        </div> */}
      </Nav>
    </div>
  </div>
);

const submenus = [
 
  [
    {
      title: "Custom Exam",
      target: "/students/exam-practice",
      icon: "pe-7s-note"
    },
    {
      title: "Pre-created Exam",
      target: "/students/pre-created-exam",
      icon: "pe-7s-note"
    },
    {
      title: "Ongoing Exam",
      target: "/students/ongoing-exam",
      icon: "pe-7s-diskette"
    },
    // {
    //   title: "Exam History",
    //   target: "/students/exam-history",
    //   icon: "pe-7s-note2"
    // },
    // {
    //   title: "Timing Performance",
    //   target: "/students/exam-performance-timing",
    //   icon: "pe-7s-clock"
    // }

  ],
  [
    
    {
      title: "Performance",
      target: "/students/performance",
      icon: "pe-7s-graph2"
    },
    {
      title: "Timing",
      target: "/students/timing",
      icon: "pe-7s-clock"
    },
    {
      title: "Exam Reports",
      target: "/students/exam-reports",
      icon: "pe-7s-note2"
    }
  ],
  [
    {
      title: " Video lectures",
      target: "/students/video-lectures",
      icon: "pe-7s-video"
    },
    {
      title: "Settings",
      target: "/students/settings",
      icon: "pe-7s-settings"
    },
    {
      title: "Inbox",
      target: "/students/inbox",
      icon: "pe-7s-chat"
    },
    {
      title: "Get help",
      target: "/students/get-help",
      icon: "pe-7s-help1"
    }
  ]
];

export default SideBar;
