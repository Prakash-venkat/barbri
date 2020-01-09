import React from "react";
import { faHome } from "@fortawesome/free-solid-svg-icons";
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
            to={"/law-school"}
            activeclassname="active"
            exact={true}
          >
            OVERVIEW
          </NavLink>
        </NavItem>

        <SubMenu
          title="Students"
          icon={faHome}
          items={submenus[0]}
          redirect={"/law-school/students"}
        />
        <SubMenu
          title="Inbox"
          icon={faHome}
          items={submenus[1]}
          redirect={"/law-school/messages"}
        />
        <SubMenu
          title="Support"
          icon={faHome}
          items={submenus[2]}
          redirect={"/law-school/videolecture"}
        />
      </Nav>
    </div>
  </div>
);

const submenus = [
  [
    {
      title: "List Students",
      target: "/law-school/students",
      icon: "pe-7s-display2",
    },
    {
      title: "Download Report",
      target: "/law-school/download",
      icon: "pe-7s-cloud-download"
    }
  ],

  [
    {
      title: "Inbox",
      target: "/law-school/messages",
      icon: "pe-7s-chat"
    },
    {
      title: "Compose",
      target: "/law-school/list-messages",
      icon: "pe-7s-display2",
    },
    // {
    //   title: "Add message",
    //   target: "/law-school/add-message",
    //   icon: "pe-7s-plus",
    // }
  ],
  [
    {
      title: "Video lectures",
      target: "/law-school/videolecture",
      icon: "pe-7s-video"
    },
    {
      title: "Settings",
      target: "/law-school/settings",
      icon: "pe-7s-settings"
    },

    {
      title: "Get help",
      target: "/law-school/get-help",
      icon: "pe-7s-help1"
    }
  ]
];

export default SideBar;
