import React, { useState } from 'react';
import { Collapse, NavItem, NavLink, Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { NavLink as RouterLink, Link } from 'react-router-dom';
import {
  faAngleDown,
  faAngleRight
} from "@fortawesome/free-solid-svg-icons";

const SubMenu = props => {

  const [collapsed, setCollapsed] = useState(true)
  const [subCollapsed, subSetCollapsed] = useState(true)

  const toggleNavbar = () => setCollapsed(!collapsed)
  const subToggleNavbar = () => subSetCollapsed(!subCollapsed)
  const { icon, title, items, redirect } = props;

  return (
    <div>
      <NavItem onClick={toggleNavbar} className={classNames({ 'menu-open': !collapsed })} style={{ padding: !collapsed ? '1% 1%' : '0% 1%' }}>
        <Link to={redirect}>
          <NavLink className="dropdown-toggle" activeClassName="active" exact={true}>
            <Col xs='12' sm='12' md='12' lg='12' xl='12' className="p-0">
              <Row className="m-0">
                <Col xs='10' sm='10' md='10' lg='10' xl='10' className="p-0">
                  {title}
                </Col>
                <Col xs='2' sm='2' md='2' lg='2' xl='2' className="p-0 text-right">
                  {!collapsed ? <i class="pe-7s-angle-down"></i> :
                    <i class="pe-7s-angle-right"></i>}
                </Col>

              </Row>
            </Col>
          </NavLink>
        </Link>
      </NavItem>
      <Collapse isOpen={!collapsed} navbar className={classNames('items-menu', { 'mb-1': !collapsed })}>
        {items.map((item, index) => (
          <NavItem key={index} className="pl-4">
            <NavLink tag={RouterLink} activeStyle={{ color: '#0e6aae', textDecoration: 'none', boxShadow: 'inset -4px 0 0 #0e6aae', background: '#eee' }} to={item.target} activeClassName="active" exact={true}>
              {item.submenu ?

                <div>
                  <NavItem style={{ padding: '0%' }} onClick={subToggleNavbar} className={classNames({ 'menu-open': !subCollapsed })} style={{ padding: !collapsed ? '1% 1%' : '4% 1%' }}>
                    <NavLink className="dropdown-toggle" style={{ padding: '0%' }} activeClassName="active" exact={true}>
                      <Col xs='12' sm='12' md='12' lg='12' xl='12' className="p-0">
                        <Row className="m-0">
                          <Col xs='10' sm='10' md='10' lg='10' xl='10' className="p-0">
                            <div className="icon-side"><i className={item.icon}></i> {item.title}</div>
                          </Col>
                          <Col xs='2' sm='2' md='2' lg='2' xl='2' className="p-0 text-right">
                            {!subCollapsed ? <i class="pe-7s-angle-down"></i> :
                              <i class="pe-7s-angle-right"></i>}
                          </Col>

                        </Row>
                      </Col>

                    </NavLink>
                  </NavItem>
                  <Collapse isOpen={!subCollapsed} navbar className={classNames('items-menu', { 'mb-1': !subCollapsed })}>
                    {item.submenu.map((submenu, index) => (
                      <NavItem key={index} className="pl-4">
                        <NavLink tag={RouterLink} activeStyle={{ color: '#0e6aae', textDecoration: 'none', boxShadow: 'inset -4px 0 0 #0e6aae', background: '#eee' }} to={submenu.target} activeClassName="active" exact={true}>
                          {submenu.title}
                        </NavLink>
                      </NavItem>
                    ))}
                  </Collapse>
                </div>

                : <div className="icon-side"><i className={item.icon}></i> <span class="tittle-txt">{item.title}</span></div>}
            </NavLink>
          </NavItem>
        ))}
      </Collapse>
    </div>
  );
}

export default SubMenu;