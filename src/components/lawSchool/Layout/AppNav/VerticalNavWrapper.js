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
            <NavLink
              tag={RouterLink}
              activeStyle={{ color: "#0e6aae", textDecoration: "none", boxShadow: "inset -4px 0 0 #0e6aae", background: "#eee" }}
              to={"/Law-School"}
              activeClassName="active"
              exact={true}
            >
              OVERVIEW
            </NavLink>
          </NavItem>
        </div>
        <div>
          {" "}
          <SubMenu title="Student" icon={faHome} items={submenus[0]} redirect={'/law-school/students'} />
        </div>

        <div>
          <NavItem>
            <NavLink
              tag={RouterLink}
              to={"/law-school/exam-reports"}
              activeStyle={{ color: "#0e6aae", textDecoration: "none", boxShadow: "inset -4px 0 0 #0e6aae", background: "#eee" }}
              exact={true}
            >
              Exam Report
            </NavLink>
          </NavItem>
        </div>
        <div>
          <NavItem>
            <NavLink
              tag={RouterLink}
              activeStyle={{ color: "#0e6aae", textDecoration: "none", boxShadow: "inset -4px 0 0 #0e6aae", background: "#eee" }}
              to={"/law-school/messages"}
              activeClassName="active"
              exact={true}
            >
              INBOX
            </NavLink>
          </NavItem>
        </div>
        <div>
          <NavItem>
            <NavLink
              tag={RouterLink}
              activeStyle={{ color: "#0e6aae", textDecoration: "none", boxShadow: "inset -4px 0 0 #0e6aae", background: "#eee" }}
              to={"/law-school/get-help"}
              activeClassName="active"
              exact={true}
            >
              GET HELP
            </NavLink>
          </NavItem>
        </div>
        <div>
          <NavItem>
            <NavLink
              tag={RouterLink}
              activeStyle={{ color: "#0e6aae", textDecoration: "none", boxShadow: "inset -4px 0 0 #0e6aae", background: "#eee" }}
              to={"/law-school/settings"}
              activeClassName="active"
              exact={true}
            >
              Settings
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
      title: "Student List",
      target: "/law-school/students",
      icon: "pe-7s-display2"
    },
    {
      title: "Download Report",
      target: "/law-school/download",
      icon: "pe-7s-display1"
    }
  ]
];

export default SideBar;
