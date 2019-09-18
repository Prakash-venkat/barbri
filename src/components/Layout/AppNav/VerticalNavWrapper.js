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
              to={"/admin"}
              activeClassName="active"
              exact={true}
            >
              Dashboard
            </NavLink>
          </NavItem>
        </div>

        <div>
          {" "}
          <SubMenu title="Law school" icon={faHome} items={submenus[0]} redirect={'/admin/law-school-list'} />
        </div>
        <div>
          <SubMenu title="Student" icon={faCopy} items={submenus[1]} redirect={'/admin/student-list'} />
        </div>
        <div>
          <SubMenu title="Item Bank" icon={faCopy} items={submenus[2]} />
        </div>

        <div>
          <SubMenu title="Practice Exam" icon={faCopy} items={submenus[3]} redirect={'/admin/practice-list'} />
        </div>
        <div>
          <SubMenu title="User" icon={faCopy} items={submenus[4]} redirect={'/admin/user-list'} />
        </div>

        <div>
          <NavItem>
            <NavLink
              tag={RouterLink}
              to={"/admin/notification"}
              activeStyle={{ color: "#0e6aae", textDecoration: "none", boxShadow: "inset -4px 0 0 #0e6aae", background: "#eee" }}
              exact={true}
            >
              Notification
            </NavLink>
          </NavItem>
        </div>
        <div>
          <NavItem>
            <NavLink
              tag={RouterLink}
              activeStyle={{ color: "#0e6aae", textDecoration: "none", boxShadow: "inset -4px 0 0 #0e6aae", background: "#eee" }}
              to={"/admin/video-library"}
              activeClassName="active"
              exact={true}
            >
              Video library
            </NavLink>
          </NavItem>
        </div>
        <div>
          <NavItem>
            <NavLink
              tag={RouterLink}
              activeStyle={{ color: "#0e6aae", textDecoration: "none", boxShadow: "inset -4px 0 0 #0e6aae", background: "#eee" }}
              to={"/admin/settings"}
              activeClassName="active"
              exact={true}
            >
              Settings
            </NavLink>
          </NavItem>
        </div>
        <div>
          <NavItem>
            <NavLink
              tag={RouterLink}
              activeStyle={{ color: "#0e6aae", textDecoration: "none", boxShadow: "inset -4px 0 0 #0e6aae", background: "#eee" }}
              to={"/admin/messages"}
              activeClassName="active"
              exact={true}
            >
              Messages
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
      title: "List Law school",
      target: "/admin/law-school-list",
      icon: "pe-7s-display2",
      key: 1
    },
    {
      title: "Add law school",
      target: "/admin/law-school-add",
      icon: "pe-7s-display1",
      key: 2
    }
  ],
  [
    {
      title: "List Students",
      target: "/admin/student-list",
      icon: "pe-7s-display2",
      key: 3
    },
    {
      title: "Add Students",
      target: "/admin/student-add",
      icon: "pe-7s-display1",
      key: 4
    },
    {
      title: "Upload Students",
      target: "/admin/student-upload",
      icon: "pe-7s-display2",
      key: 5
    },
    {
      title: "Invite Students",
      target: "/admin/student-invite",
      icon: "pe-7s-display1",
      key: 6
    }
  ],
  [
    {
      title: "Item tags",
      icon: "pe-7s-note",
      key: 7,
      submenu: [
        {
          title: "Tag List",
          target: "/admin/item-tag-list",
          icon: "",
          key: 8
        },
        {
          title: "Tag Add",
          target: "/admin/item-tag-add",
          icon: "",
          key: 9
        }
      ]
    },
    {
      title: "Item bank",
      icon: "pe-7s-medal",
      key: 10,
      submenu: [
        {
          title: "List",
          target: "/admin/item-bank-list",
          icon: "",
          key: 11
        },
        {
          title: "Add",
          target: "/admin/item-bank-add",
          icon: "",
          key: 12
        }
      ]
    },
    {
      title: "Item error",
      icon: "pe-7s-note2",
      key: 13,
      submenu: [
        {
          title: "List",
          target: "/admin/item-error",
          icon: "",
          key: 14
        }
      ]
    },
  ],
  [
    {
      title: "Practice exams list",
      target: "/admin/practice-list",
      icon: "pe-7s-display2",
      key: 15
    },
    {
      title: "Add Practice exam",
      target: "/admin/practice-add",
      icon: "pe-7s-display1",
      key: 16
    }
  ],
  [
    {
      title: "List user",
      target: "/admin/user-list",
      icon: "pe-7s-display2",
      key: 17
    },
    {
      title: "Add user",
      target: "/admin/user-add",
      icon: "pe-7s-display1",
      key: 18
    }
  ]
];

export default SideBar;
