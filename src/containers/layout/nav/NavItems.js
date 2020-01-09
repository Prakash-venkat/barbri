import React from "react";
import { Collapse, NavItem, NavLink, Row, Col } from "reactstrap";
import classNames from "classnames";
import { NavLink as RouterLink, Link } from "react-router-dom";

class SubMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
      setCollapsed: true,
      subCollapsed: true,
      subSetCollapsed: true,
      IndexValue: "",
      isOpen: false
    };
    this.closeNavbar = this.closeNavbar.bind(this);
  }

  toggleNavbar = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  subToggleNavbar = index => {
    this.setState({
      subCollapsed: !this.state.subCollapsed,
      IndexValue: index
    });
  };
  closeNavbar() {
    this.setState({
      subCollapsed: !this.state.subCollapsed,
      IndexValue: index
    });
  }

  render() {
    return (
      <>
        <NavItem
          
          onClick={this.toggleNavbar}
          className={classNames({ "menu-open": !this.state.collapsed })}
          style={{ padding: !this.state.collapsed ? "" : "" }}
        >
          <Link to={this.props.redirect}>
            <NavLink
              className="dropdown-toggle"
              activeclassname="active"
              exact={true}
            >
              <Col xs="12" sm="12" md="12" lg="12" xl="12" className="p-0">
                <Row className="m-0">
                  <Col xs="10" sm="10" md="10" lg="10" xl="10" className="p-0">
                    {this.props.title}
                  </Col>
                  <Col
                    xs="2"
                    sm="2"
                    md="2"
                    lg="2"
                    xl="2"
                    className="p-0 text-right"
                  >
                    {!this.state.collapsed ? (
                      <i className="pe-7s-angle-down"></i>
                    ) : (
                      <i className="pe-7s-angle-right"></i>
                    )}
                  </Col>
                </Row>
              </Col>
            </NavLink>
          </Link>
        </NavItem>
        <Collapse
          isOpen={!this.state.collapsed}
          navbar
          className={classNames("items-menu", {
            "mb-1": !this.state.collapsed
          })}
        >
          {this.props.items.map((item, index) => (
            <NavItem key={item.key} className="pl-4 w-100" >
              <NavLink
                tag={RouterLink}
                activeStyle={{
                  color: "#006EBD",
                  textDecoration: "none",
                  boxShadow: "inset -4px 0 0 #006EBD",
                  background: "#eee"
                }}
                to={item.target}
                activeclassname="active"
                exact={true}
              >
                {item.submenu ? (
                  <div>
                    <NavItem
                      
                      style={{ padding: "0%" }}
                      onClick={() => this.subToggleNavbar(item.key)}
                      className={classNames({
                        "menu-open": !this.state.subCollapsed
                      })}
                      style={{
                        padding: !this.state.collapsed ? "1% 1%" : "4% 1%"
                      }}
                    >
                      <NavLink
                        className="dropdown-toggle"
                        style={{ padding: "0%" }}
                        activeclassname="active"
                        exact={true}
                      >
                        <Col
                          xs="12"
                          sm="12"
                          md="12"
                          lg="12"
                          xl="12"
                          className="p-0"
                        >
                          <Row className="m-0">
                            <Col
                              xs="10"
                              sm="10"
                              md="10"
                              lg="10"
                              xl="10"
                              className="p-0"
                            >
                              <div className="msedge-icon-side">
                                <i className={item.icon}></i> {item.title}
                              </div>
                            </Col>
                            <Col
                              xs="2"
                              sm="2"
                              md="2"
                              lg="2"
                              xl="2"
                              className="p-0 text-right"
                            >
                              {!this.state.subCollapsed ? (
                                <i className="pe-7s-angle-down"></i>
                              ) : (
                                <i className="pe-7s-angle-right"></i>
                              )}
                            </Col>
                          </Row>
                        </Col>
                      </NavLink>
                    </NavItem>
                    {this.state.IndexValue === item.key ? (
                      <Collapse
                        isOpen={!this.state.subCollapsed}
                        navbar
                        className={classNames("items-menu", {
                          "mb-1": !this.state.subCollapsed
                        })}
                      >
                        {item.submenu.map((submenu, index) => (
                          <NavItem
                            className="pl-4 w-100"
                            key={submenu.key}
                            
                          >
                            <NavLink
                              tag={RouterLink}
                              activeStyle={{
                                color: "#006EBD",
                                textDecoration: "none",
                                boxShadow: "inset -4px 0 0 #006EBD",
                                background: "#eee"
                              }}
                              to={submenu.target}
                              activeclassname="active"
                              exact={true}
                              style={{ fontSize: "12px", fontWeight: "300" }}
                            >
                              {submenu.title}
                            </NavLink>
                          </NavItem>
                        ))}
                      </Collapse>
                    ) : (
                      null
                    )}
                  </div>
                ) : (
                  <div className="msedge-icon-side">
                    <i className={item.icon}></i>{" "}
                    <span className="msedge-title-txt">{item.title}</span>
                  </div>
                )}
              </NavLink>
            </NavItem>
          ))}
        </Collapse>
      </>
    );
  }
}

export default SubMenu;
