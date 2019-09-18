import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBriefcase,
  faPaperPlane,
  faQuestion,
  faImage,
  faCopy
} from "@fortawesome/free-solid-svg-icons";
import SubMenu from "./NavItems";
import { NavItem, NavLink, Nav } from "reactstrap";
import classNames from "classnames";
import { NavLink as RouterLink } from "react-router-dom";

const SideBar = props => (
  <div className="custom-sidebar">
    <div className="sidebar-header"></div>
    <div className="side-menu">
      <Nav vertical className="list-unstyled pb-3">

        <div>
          <NavItem>
            <NavLink tag={RouterLink} activeStyle={{ color: '#0e6aae', textDecoration: 'none', boxShadow: 'inset -4px 0 0 #0e6aae', background: '#eee' }} to={"/students"} activeClassName="active" exact={true}>
              OVERVIEW
            </NavLink>
          </NavItem>
        </div>
        <div>
          {" "}
          <SubMenu title="Questions" icon={faHome} items={submenus[0]} redirect={'/students/questions'} />
        </div>
        <div>
          <SubMenu title="Exams" icon={faCopy} items={submenus[1]} redirect={'/students/exam-practice'} />
        </div>
        <div>
          <NavItem>
            <NavLink tag={RouterLink} to={"/students/inbox"} activeStyle={{ color: '#0e6aae', textDecoration: 'none', boxShadow: 'inset -4px 0 0 #0e6aae', background: '#eee' }} exact={true}>
              INBOX
            </NavLink>
          </NavItem>
        </div>
        <div>
          <NavItem>
            <NavLink tag={RouterLink} activeStyle={{ color: '#0e6aae', textDecoration: 'none', boxShadow: 'inset -4px 0 0 #0e6aae', background: '#eee' }} to={"/students/get-help"} activeClassName="active" exact={true}>
              GET HELP
            </NavLink>
          </NavItem>
        </div>
        <div>
          <NavItem>
            <NavLink tag={RouterLink} activeStyle={{ color: '#0e6aae', textDecoration: 'none', boxShadow: 'inset -4px 0 0 #0e6aae', background: '#eee' }} to={"/students/video-lectures"} activeClassName="active" exact={true}>
              VIDEO LECTURES
            </NavLink>
          </NavItem>
        </div>


      </Nav>
    </div>
  </div>
);

const submenus = [
  [
    {
      title: 'Questions',
      target: '/students/questions',
      icon: 'pe-7s-display2',
    },
    {
      title: 'Questions Progress',
      target: '/students/questions-progress',
      icon: 'pe-7s-display1',
    },

  ],
  [
    {
      title: "Practice Exam",
      target: "/students/exam-practice",
      icon: "pe-7s-note"

    },
    {
      title: "Exam Performance",
      icon: "pe-7s-medal",
      submenu: [
        {
          title: "Subject",
          target: "/students/exam-performance-subject",
          icon: ""

        },
        {
          title: "Timing",
          target: "/students/exam-performance-timing",
          icon: ""

        },
        {
          title: "Past Performance",
          target: "/students/exam-performance-past",
          icon: ""

        },
      ]

    },
    {
      title: "Exam Reports",
      target: "/students/exam-reports",
      icon: "pe-7s-note2"

    },
  ],

];

export default SideBar;
