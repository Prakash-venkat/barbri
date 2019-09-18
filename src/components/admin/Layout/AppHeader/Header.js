import React, { Component } from 'react';
import cx from 'classnames';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';



import {
    UncontrolledDropdown, DropdownToggle, DropdownMenu,
    Nav, Button, NavItem,NavLink,UncontrolledButtonDropdown,
} from 'reactstrap';

import Tabs from 'react-responsive-tabs';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import PerfectScrollbar from 'react-perfect-scrollbar';

import {
    faAngleDown,

} from '@fortawesome/free-solid-svg-icons';





// Dropdown Tabs Content
import ChatExample from './Components/TabsContent/ChatExample';
import TimelineEx from './Components/TabsContent/TimelineExample';
import city3 from '../../../../assets/utils/images/dropdown-header/city3.jpg';

import avatar1 from '../../../../assets/utils/images/avatars/1.jpg';

import AppDrawer from '../AppLogo/AppDrawer'



const tabsContent = [
    {
        title: 'Messages',
        content: <ChatExample/>
    },
    {
        title: 'System Notifications',
        content: <TimelineEx/>
    },
];

function getTabs() {
    return tabsContent.map((tab, index) => ({
        title: tab.title,
        getContent: () => tab.content,
        key: index,
    }));
}

export class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            activeSearch: false,
            active: false,
            mobile: false,
            activeSecondaryMenuMobile: false
        };
    }
    componentWillMount(){
        console.log(window.innerWidth + "width")

    }
    toggleEnableClosedSidebar = () => {
        let {enableClosedSidebar, setEnableClosedSidebar} = this.props;
        setEnableClosedSidebar(!enableClosedSidebar);
    }
    state = {
        openLeft: false,
        openRight: false,
        relativeWidth: false,
        width: 280,
        noTouchOpen: false,
        noTouchClose: false,
    };

    render() {

        // if(!sessionStorage.getItem("userDetails-Admin")){
        //      window.location.href="/"
        // }

        let {
            enableMobileMenuSmall,
           
        } = this.props;
       
        return (

            <div className="app-header-segment">
                {window.innerWidth < 500 ? <div className={cx(
                        "app-header__content",
                        {'header-mobile-open': enableMobileMenuSmall},
                    )}> 
                    <div className="app-header-left">

                        <UncontrolledButtonDropdown>
                                    <DropdownToggle color="link" className="p-0">
                                            <h6 className="header-username">Alina Mcloughlin<FontAwesomeIcon className="ml-2 opacity-8" icon={faAngleDown}/></h6>

                                    </DropdownToggle>
                                    <DropdownMenu right className="rm-pointers dropdown-menu-lg user-detail-header-menu">
                                        <div className="dropdown-menu-header">
                                            <div className="dropdown-menu-header-inner bg-info">
                                                <div className="menu-header-image opacity-2"
                                                     style={{
                                                         backgroundImage: 'url(' + city3 + ')'
                                                     }}
                                                     aria-label="User_Background_Image"
                                                />
                                                <div className="menu-header-content text-left">
                                                    <div className="widget-content p-0">
                                                        <div className="widget-content-wrapper">
                                                            <div className="widget-content-left mr-3">
                                                                <img width={42} className="rounded-circle" src={avatar1}
                                                                     alt="User_image"/>
                                                            </div>
                                                            <div className="widget-content-left">
                                                                <div className="font-weight-bold">
                                                                    Alina Mcloughlin
                                                                </div>
                                                                <div className="widget-subheading opacity-8">
                                                                    DATES: 7/1/21 - 11/1/21
                                                                </div>
                                                            </div>
                                                            <div className="widget-content-right mr-2">
                                                                <Link to={`/`}><Button className="btn-pill btn-shadow btn-shine"
                                                                        color="light">
                                                                    Logout
                                                                </Button></Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="scroll-area-xs" style={{
                                            height: '150px'
                                        }}>
                                            <PerfectScrollbar>
                                                <Nav vertical>
                                                    <NavItem className="nav-item-header">
                                                        Activity
                                                    </NavItem>
                                                    <NavItem>
                                                        <NavLink href="/#/admin/inbox">
                                                            Chat
                                                            <div className="ml-auto badge badge-pill badge-info">8</div>
                                                        </NavLink>
                                                    </NavItem>
                                                    <NavItem>
                                                        <NavLink href="javascript:void(0);">Recover Password</NavLink>
                                                    </NavItem>

                                                </Nav>
                                            </PerfectScrollbar>
                                        </div>
                                    </DropdownMenu>
                                </UncontrolledButtonDropdown>

                                    <p>DATES: 7/1/21 - 11/1/21 </p>
                        </div>
                        <div className="app-header-right">
                        
                                    <AppDrawer />
               
                </div>
                </div> : 
                <div className={cx(
                        "app-header__content",
                        {'header-mobile-open': enableMobileMenuSmall},
                    )}>
                        <div className="app-header-left">

                        <UncontrolledButtonDropdown>
                                    <DropdownToggle color="link" className="p-0">
                                            <h6 className="header-username">Alina Mcloughlin<FontAwesomeIcon className="ml-2 opacity-8" icon={faAngleDown}/></h6>

                                    </DropdownToggle>
                                    <DropdownMenu right className="rm-pointers dropdown-menu-lg user-detail-header-menu">
                                        <div className="dropdown-menu-header">
                                            <div className="dropdown-menu-header-inner bg-info">
                                                <div className="menu-header-image opacity-2"
                                                     style={{
                                                         backgroundImage: 'url(' + city3 + ')'
                                                     }}
                                                     aria-label="User_Background_Image"
                                                />
                                                <div className="menu-header-content text-left">
                                                    <div className="widget-content p-0">
                                                        <div className="widget-content-wrapper">
                                                            <div className="widget-content-left mr-3">
                                                                <img width={42} className="rounded-circle" src={avatar1}
                                                                     alt="User_image"/>
                                                            </div>
                                                            <div className="widget-content-left">
                                                                <div className="font-weight-bold">
                                                                    Alina Mcloughlin
                                                                </div>
                                                                <div className="widget-subheading opacity-8">
                                                                    DATES: 7/1/21 - 11/1/21
                                                                </div>
                                                            </div>
                                                            <div className="widget-content-right mr-2">
                                                                <Link to={`/`}><Button className="btn-pill btn-shadow btn-shine"
                                                                        color="light">
                                                                    Logout
                                                                </Button></Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="scroll-area-xs" style={{
                                            height: '150px'
                                        }}>
                                            <PerfectScrollbar>
                                                <Nav vertical>
                                                    <NavItem className="nav-item-header">
                                                        Activity
                                                    </NavItem>
                                                    <NavItem>
                                                        <NavLink href="/#/admin/inbox">
                                                            Chat
                                                            <div className="ml-auto badge badge-pill badge-info">8</div>
                                                        </NavLink>
                                                    </NavItem>
                                                    <NavItem>
                                                        <NavLink href="javascript:void(0);">Recover Password</NavLink>
                                                    </NavItem>

                                                </Nav>
                                            </PerfectScrollbar>
                                        </div>
                                    </DropdownMenu>
                                </UncontrolledButtonDropdown>

                                    <p>DATES: 7/1/21 - 11/1/21 </p>
                        </div>


                        <div className="app-header-right">
                        <ul className="app-header-right-list">
                                        <li className="header-search-bar">
                                        <div className={cx("search-wrapper", {
                    'active': this.state.activeSearch
                })}>
                    <div className="input-holder">
                        <input type="text" className="search-input" placeholder="Type to search"/>
                        <button onClick={() => this.setState({activeSearch: !this.state.activeSearch})}
                                className="search-icon"><span/></button>
                    </div>
                    <button onClick={() => this.setState({activeSearch: !this.state.activeSearch})} className="close"/>
                </div>

                                        </li>
                                        {/* <li><i className="pe-7s-search"></i></li> */}
                                        <li className="lang-list">Aa</li>
                                        <li><Link to='/admin/settings'><i className="pe-7s-settings"></i></Link></li>
                                        <li>
                 <UncontrolledDropdown>
                        <DropdownToggle className="p-0 mr-2" color="link">
                            <div>
                            {/* <div className="icon-wrapper icon-wrapper-alt rounded-circle"> */}
                                <div className="icon-wrapper-bg bg-danger"/>
                                <i className="pe-7s-bell"></i>
                              <div className="badge badge-dot badge-dot-sm badge-primary">Notifications</div>
                            </div>
                        </DropdownToggle>
                        <DropdownMenu right className="dropdown-menu-xl rm-pointers">
                            <div className="dropdown-menu-header mb-0">
                                <div className="dropdown-menu-header-inner bg-deep-blue">
                                    <div className="menu-header-image opacity-1"
                                         style={{
                                             backgroundImage: 'url(' + city3 + ')',
                                         }}
                                         aria-label="Notification_Background_Image"
                                    />
                                    <div className="menu-header-content text-dark">
                                        <h5 className="menu-header-title">Notifications</h5>
                                        <h6 className="menu-header-subtitle">You have <b>21</b> unread messages</h6>
                                    </div>
                                </div>
                            </div>
                            <Tabs tabsWrapperClass="body-tabs body-tabs-alt" transform={false} showInkBar={true}
                                  items={getTabs()}/>
                            <Nav vertical>
                                <NavItem className="nav-item-divider"/>
                                <NavItem className="nav-item-btn text-center">
                                    <Button size="sm" className="btn-shadow btn-wide btn-pill" color="primary">
                                        View Latest Changes
                                    </Button>
                                </NavItem>
                            </Nav>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                                        </li>
                                        <li><Link to='/admin/get-help'><div className="get-help">GET HELP</div></Link></li>
                                        {/* <li><Link to='/'><div className="logout"><i className="pe-7s-power"></i></div></Link></li> */}
                                    </ul>
                        </div>

                        {/* <div className="top-header">
                            <Col xs='12' sm='12' md='12' lg='12' xl='12' className="name-section"> 
                                <Row className="m-0">
                                <Col xs='12' sm='12' md='7' lg='7' xl='7' className="p-0"> 
                                   
                                </Col>
                                <Col xs='12' sm='12' md='5' lg='5' xl='5' className="text-right  p-0 right-side-header">
                                   
                                   
                                    
                                </Col>
                                </Row>
                            </Col>
                        </div> */}
                  
                    </div>}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    enableHeaderShadow: state.ThemeOptions.enableHeaderShadow,
    closedSmallerSidebar: state.ThemeOptions.closedSmallerSidebar,
    headerBackgroundColor: state.ThemeOptions.headerBackgroundColor,
    enableMobileMenuSmall: state.ThemeOptions.enableMobileMenuSmall,
    enableClosedSidebar: state.ThemeOptions.enableClosedSidebar,
    enableMobileMenu: state.ThemeOptions.enableMobileMenu,
});

export default connect(mapStateToProps)(Header);