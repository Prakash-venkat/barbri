import React from "react";
import { faHome, faCopy,faTools } from "@fortawesome/free-solid-svg-icons";
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
            to={"/admin"}
            activeclassname="active"
            exact={true}
          >
            Overview
          </NavLink>
        </NavItem>{" "}
        <SubMenu
          title="Law schools"
          icon={faHome}
          items={submenus[0]}
          redirect={"/admin/list_lawschool"}
        />
        <SubMenu
          title="Students"
          icon={faCopy}
          items={submenus[1]}
          redirect={"/admin/list_student"}
        />
        <SubMenu
          title="Item Bank"
          icon={faCopy}
          items={submenus[2]}
          redirect={"/admin/list_itembank"}
        />
        <SubMenu
          title="Item Tag"
          icon={faCopy}
          items={submenus[3]}
          redirect={"/admin/list_itemtag"}
        />
        <NavItem>
          <NavLink
            tag={RouterLink}
            activeStyle={{
              color: "#006EBD",
              textDecoration: "none",
              boxShadow: "inset -4px 0 0 #006EBD",
              background: "#eee"
            }}
            to={"/admin/itemerror"}
            activeclassname="active"
            exact={true}
          >
            Item Error
          </NavLink>
        </NavItem>
        <SubMenu
          title="Pre-Created Exam"
          icon={faCopy}
          items={submenus[4]}
          redirect={"/admin/list_precreatedexam"}
        />
        <SubMenu
          title="Users"
          icon={faCopy}
          items={submenus[5]}
          redirect={"/admin/list_user"}
        />
        <SubMenu
          title="Video library"
          icon={faCopy}
          items={submenus[6]}
          redirect={"/admin/list_videolibrary"}
        />
        <SubMenu
          title="Messages"
          icon={faCopy}
          items={submenus[7]}
          redirect={"/admin/list_messagenotify"}
        />
        <SubMenu
          title="Troubleshooting"
          icon={faTools}
          items={submenus[8]}
          redirect={"/admin/audit_log"}
        />
        <NavItem>
          <NavLink
            tag={RouterLink}
            activeStyle={{
              color: "#006EBD",
              textDecoration: "none",
              boxShadow: "inset -4px 0 0 #006EBD",
              background: "#eee"
            }}
            to={"/admin/settings"}
            activeclassname="active"
            exact={true}
          >
            Settings
          </NavLink>
        </NavItem>
      </Nav>
    </div>
  </div>
);

const submenus = [
  [
    {
      title: "List Law schools",
      target: "/admin/list_lawschool",
      icon: "pe-7s-display2",
      key: 1
    },
    {
      title: "Add law school",
      target: "/admin/add_lawschool",
      icon: "pe-7s-plus",
      key: 2
    },
    {
      title: "Enquiries",
      target: "/admin/list_lawschool_enquiry",
      icon: "pe-7s-info",
      key: 3
    }
  ],
  [
    {
      title: "List Students",
      target: "/admin/list_student",
      icon: "pe-7s-display2",
      key: 4
    },
    {
      title: "Add Student",
      target: "/admin/add_student",
      icon: "pe-7s-plus",
      key: 5
    },
    {
      title: "Upload Students",
      target: "/admin/upload_student",
      icon: "pe-7s-upload",
      key: 6
    },
    {
      title: "Invite Students",
      target: "/admin/invite_student",
      icon: "pe-7s-mail-open",
      key: 7
    }
  ],
  [
    {
      title: "List Item bank",
      class: "submenu-style",
      target: "/admin/list_itembank",
      icon: "pe-7s-display2",
      key: 9
    },
    {
      title: "Add Item bank",
      class: "submenu-style",
      target: "/admin/add_itembank",
      icon: "pe-7s-plus",
      key: 10
    }
  ],
  [
    {
      title: "List Item Tags",
      target: "/admin/list_itemtag",
      class: "submenu-style",
      icon: "pe-7s-display2",
      key: 12
    },
    {
      title: "Add Item tag",
      class: "submenu-style",
      target: "/admin/add_itemtag",
      icon: "pe-7s-plus",
      key: 13
    }
  ],
  [
    {
      title: "list Pre-created exams",
      target: "/admin/list_precreatedexam",
      icon: "pe-7s-display2",
      key: 14
    },
    {
      title: "Add Pre-created exam",
      target: "/admin/add_precreatedexam",
      icon: "pe-7s-plus",
      key: 15
    }
  ],
  [
    {
      title: "List users",
      target: "/admin/list_user",
      icon: "pe-7s-display2",
      key: 16
    },
    {
      title: "Add user",
      target: "/admin/add_user",
      icon: "pe-7s-plus",
      key: 17
    }
  ],
  [
    {
      title: "List videos",
      target: "/admin/list_videolibrary",
      icon: "pe-7s-display2",
      key: 18
    },
    {
      title: "Add video",
      target: "/admin/add_videolibrary",
      icon: "pe-7s-plus",
      key: 19
    }
  ],

  [
    {
      title: "List Messages",
      target: "/admin/list_messagenotify",
      icon: "pe-7s-display2",
      key: 19
    },
    {
      title: "Add Message",
      target: "/admin/add_messagenotify",
      icon: "pe-7s-plus",
      key: 20
    }
  ],

  [
    {
      title: "Audit Log",
      target: "/admin/audit_log",
      icon: "pe-7s-display2",
      key: 19
    },
    {
      title: "Error Log",
      target: "/admin/ui_log",
      icon: "pe-7s-display2",
      key: 20
    }
  ]
];

export default SideBar;
