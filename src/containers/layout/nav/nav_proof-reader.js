// import React from "react";
// import { NavItem, NavLink, Nav } from "reactstrap";
// import { NavLink as RouterLink } from "react-router-dom";

// const SideBar = props => (
//   <div className="msedge-custom-sidebar">
//     <div className="msedge-sidebar-header"></div>
//     <div className="msedge-side-menu">
//       <Nav vertical className="pb-3">
//         <NavItem>
//           <NavLink
//             tag={RouterLink}
//             activeStyle={{
//               color: "#0070c0",
//               textDecoration: "none",
//               boxShadow: "inset -4px 0 0 #0070c0",
//               background: "#eee"
//             }}
//             to={"/proof-reader"}
//             activeclassname="active"
//             exact={true}
//           >
//             Item Review
//           </NavLink>
//         </NavItem>
//       </Nav>
//     </div>
//   </div>
// );

// export default SideBar;

import React from "react";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import SubMenu from "./NavItems";
import { NavItem, NavLink, Nav } from "reactstrap";
import { NavLink as RouterLink } from "react-router-dom";

const SideBar = props => (
  <div className="msedge-custom-sidebar">
    <div className="msedge-sidebar-header"></div>
    <div className="msedge-side-menu">
      <Nav vertical className="pb-3">
        {/* <NavItem tabIndex="0">
          <NavLink
            tag={RouterLink}
            activeStyle={{
              color: "#006EBD",
              textDecoration: "none",
              boxShadow: "inset -4px 0 0 #006EBD",
              background: "#eee"
            }}
            to={"/proof-reader"}
            activeclassname="active"
            exact={true}
          >
            Overview
          </NavLink>
        </NavItem> */}

        <NavItem tabIndex="0">
          <NavLink
            tag={RouterLink}
            activeStyle={{
              color: "#006EBD",
              textDecoration: "none",
              boxShadow: "inset -4px 0 0 #006EBD",
              background: "#eee"
            }}
            to={"/proof-reader"}
            activeclassname="active"
            exact={true}
          >
            Items For review
          </NavLink>
        </NavItem>

        <SubMenu
          title="Support"
          icon={faCopy}
          items={submenus[0]}
          redirect={"/proof-reader/inbox"}
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
      title: "Inbox",
      target: "/proof-reader/inbox",
      icon: "pe-7s-chat"
    },
    {
      title: "Settings",
      target: "/proof-reader/change-password",
      icon: "pe-7s-settings"
    }
    // {
    //   title: "Get help",
    //   target: "/proof-reader/get-help",
    //   icon: "pe-7s-help1"
    // }
  ]
];

export default SideBar;
