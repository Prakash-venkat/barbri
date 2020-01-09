import React, { Component } from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip'
import Slider from "rc-slider";
import Tooltip from 'rc-tooltip';
import {
    DropdownToggle, DropdownMenu,
    Nav, Button, NavItem, NavLink, UncontrolledButtonDropdown, Row, Col, Dropdown
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
    faAngleDown,
} from '@fortawesome/free-solid-svg-icons';
import { bindActionCreators } from "redux";


import avatar1 from '../../../assets/utils/images/avatars/13.png';
import AppDrawer from '../logo/lawschoolWrapper'

//Actions
import { setFontSize } from '../../../actions/actionMain'
import { instance, HASH_HISTORY } from '../../../actions/constants'
import { getSession } from '../../routes/routePaths'

const Handle = Slider.Handle;

const handle = (props) => {
    const { value, dragging, index, ...restProps } = props;
    return (
        <Tooltip
            prefixCls="rc-slider-tooltip"
            overlay={value}
            visible={dragging}
            placement="top"
            key={index}
        >
            <Handle value={value} {...restProps} />
        </Tooltip>
    );
};




export class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeSearch: false,
            active: false,
            mobile: false,
            dropdownOpen: false,
            activeSecondaryMenuMobile: false,
            LawSchoolSession: getSession("LawSchoolSession"),
            windowWith: window.innerWidth
            // totalMessages:""
        };
    }
        handleResize = (event) => {
        this.setState({ windowWith: window.innerWidth })
      }
    
      componentDidUnmount() {
        window.removeEventListener('resize', this.handleResize)
      }
    componentDidMount() {
        window.addEventListener('resize', this.handleResize)

        let getSessionData = this.state.LawSchoolSession

        let userName = getSessionData.name;
        this.setState({
            userName: userName,

        }, () => this.fetchData());
    }

    fetchData = () => {
        let getSessionData = this.state.LawSchoolSession
        let userId = getSessionData.userId;
        let userType = getSessionData.user_type
        let lawschoolId = ""
        instance.get(`/users/messages/?publishTo=${userType}&lawschoolID=${lawschoolId}&userId=${userId}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,        
            }
          })
            .then(res => {
                this.setState({
                    filteredData: res.data.data,
                }, () => this.totalMessages())
            }).catch(e => {
                console.log(e);
            })
    }

    totalMessages = () => {

        if (this.state.filteredData != null) {
            var t = 0;
            for (var i = 0; i < this.state.filteredData.length; i++) {
                if (this.state.filteredData[i].messageRead === "0" || this.state.filteredData[i].messageRead === null) {
                    t = t + 1;
                }
                this.setState({
                    totalMessages: t
                });
            }
        }
        else {
            this.setState({ totalMessages: 0 })
        }
    }



    toggleEnableClosedSidebar = () => {
        let { enableClosedSidebar, setEnableClosedSidebar } = this.props;
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

    logout = () => {
        
        
        sessionStorage.removeItem("LawSchoolSession")
        localStorage.removeItem("LawSchoolSession")
        HASH_HISTORY.push('/')
        
        
    }
    changePassword = () => {
        HASH_HISTORY.push('/law-school/settings')
        this.setState({ dropdownOpen: false })
    }
    dropdownToggle = () => {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }
    message = () => {
        HASH_HISTORY.push('/law-school/messages')
        this.setState({ dropdownOpen: false })
    }

    render() {

        let {
            enableMobileMenuSmall,

        } = this.props;

        return (
            <Row>
                <Col sm="12" md="12" lg="12" className="msedge-top-head mb-3">
                    <div className="msedge-header-segment">
                        {this.state.windowWith < 1024 ? <div className={cx(
                            "msedge-header-content msedge-lawschool-header",
                            { 'header-mobile-open': enableMobileMenuSmall },
                        )}>
                            <Col sm="6" md="4" lg="3" xl="4" className="msedge-header-left">

                                <UncontrolledButtonDropdown>
                                    <Dropdown isOpen={this.state.dropdownOpen} toggle={this.dropdownToggle}>
                                        <DropdownToggle color="link" className="p-0">
                                            <h6 className="msedge-header-username">{this.state.userName}<FontAwesomeIcon className="ml-2 opacity-8" icon={faAngleDown} /></h6>

                                        </DropdownToggle>
                                        <DropdownMenu right className="msedge-dropdown-menu-lg msedge-user-detail-header">
                                            <div className="msedge-dropdown-menu-header">
                                                <div className="msedge-dropdown-menu-header-inner bg-info">
                                                    <div className="msedge-menu-header-image opacity-2 bg-primary"

                                                        aria-label="User_Background_Image"
                                                    />
                                                    <div className="msedge-menu-header-content text-left">
                                                        <div className="widget-content p-0">
                                                            <div className="widget-content-wrapper">
                                                                <div className="widget-content-left mr-3">
                                                                    <img width={42} className="rounded-circle" src={avatar1}
                                                                        alt="User_image" />
                                                                </div>
                                                                <div className="widget-content-left">
                                                                    <div className="font-weight-bold">
                                                                        {this.state.userName}
                                                                    </div>
                                                                </div>
                                                                <div className="widget-content-right mr-2">
                                                                <Button 
                                                                        tabIndex={0}
                                                                        role="menuitem"
                                                                        color="light"
                                                                        onClick={()=> this.logout()}
                                                                        className="btn-pill btn-shadow btn-shine"
                                                                        >
                                                                        Logout
                                                                  </Button>
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
                                                            <NavLink onClick={this.message} className="text-primary">
                                                                Inbox
                                                                <div className="ml-auto badge badge-pill badge-info">{this.state.totalMessages}</div>
                                                            </NavLink>
                                                        </NavItem>
                                                        <NavItem>
                                                            <NavLink onClick={this.changePassword} className="text-primary">Change password</NavLink>
                                                        </NavItem>

                                                    </Nav>
                                                </PerfectScrollbar>
                                            </div>
                                        </DropdownMenu>
                                    </Dropdown>
                                </UncontrolledButtonDropdown>
                            </Col>
                            <div className="msedge-header-right">

                                <AppDrawer />

                            </div>
                        </div> :
                            <div className={cx(
                                "msedge-header-content msedge-lawschool-header",
                                { 'header-mobile-open': enableMobileMenuSmall },
                            )}>
                                <Col sm="6" md="3" lg="3" xl="4" className="msedge-header-left">
                                    <UncontrolledButtonDropdown>
                                        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.dropdownToggle}>
                                            <DropdownToggle color="link" className="p-0">
                                                <h6 className="msedge-header-username">{this.state.userName}<FontAwesomeIcon className="ml-2 opacity-8" icon={faAngleDown} /></h6>


                                            </DropdownToggle>
                                            <DropdownMenu right className="msedge-dropdown-menu-lg msedge-user-detail-header">
                                                <div className="msedge-dropdown-menu-header">
                                                    <div className="msedge-dropdown-menu-header-inner bg-info">
                                                        <div className="msedge-menu-header-image opacity-2 bg-primary"

                                                            aria-label="User_Background_Image"
                                                        />
                                                        <div className="msedge-menu-header-content text-left">
                                                            <div className="widget-content p-0">
                                                                <div className="widget-content-wrapper">
                                                                    <div className="widget-content-left mr-3">
                                                                        <img width={42} className="rounded-circle" src={avatar1}
                                                                            alt="User_image" />
                                                                    </div>
                                                                    <div className="widget-content-left">
                                                                        <div className="font-weight-bold">
                                                                            {this.state.userName}
                                                                        </div>
                                                                    </div>
                                                                    <div className="widget-content-right mr-2">
                                                                    <Button 
                                                                        tabIndex={0}
                                                                        role="menuitem"
                                                                        color="light"
                                                                        onClick={()=> this.logout()}
                                                                        className="btn-pill btn-shadow btn-shine"
                                                                        >
                                                                        Logout
                                                                  </Button>
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
                                                                <NavLink onClick={this.message} className="text-primary">
                                                                    {/* <NavLink onChange={this.message} href="/#/law-school/messages"> */}
                                                                    Inbox
                                                                <div className="ml-auto badge badge-pill badge-info">{this.state.totalMessages}</div>
                                                                </NavLink>
                                                            </NavItem>
                                                            <NavItem>
                                                                <NavLink onClick={this.changePassword} className="text-primary">Change password</NavLink>
                                                            </NavItem>

                                                        </Nav>
                                                    </PerfectScrollbar>
                                                </div>
                                            </DropdownMenu>
                                        </Dropdown>
                                    </UncontrolledButtonDropdown>
                                </Col>


                                <Col sm="6" md="9" lg="9" xl="8" className="msedge-header-right">
                                    <ul className="msedge-header-right-list">

                                        <li className="msedge-font-resize">
                                            <UncontrolledButtonDropdown>
                                                <DropdownToggle color="link" className="p-0">
                                                    <h6 className="resize-fonts">
                                                        <span className="msedge-resize-fonts">A</span>A
                                                    </h6>
                                                    <div className="msedge-font-normal msedge-right-header-text">Resize</div>
                                                </DropdownToggle>
                                                <DropdownMenu right className="msedge-dropdown-menu-lg">
                                                    <div className="msedge-dropdown-menu-header">
                                                        <div className="msedge-dropdown-menu-header-inner ">
                                                            <div className="msedge-menu-header-image opacity-2"
                                                            />

                                                        </div>
                                                    </div>
                                                    <div className="scroll-area-xs" style={{
                                                        height: '58px'
                                                    }}>

                                                        <div className="text-center ">

                                                            <div className="px-3">
                                                                <Row>
                                                                    <Col md="2"><span>Min</span></Col>
                                                                    <Col md="8 p-0 m-0">
                                                                        <Slider
                                                                            className="mb-1"
                                                                            step={5}
                                                                            min={80}
                                                                            max={130}
                                                                            defaultValue={100}
                                                                            value={parseInt(this.props.lawSchoolStyles.fontSize)}
                                                                            handle={handle}
                                                                            onChange={value => this.props.setFontSize(value)}
                                                                        />
                                                                    </Col>
                                                                    <Col md="2"> <span>Max</span></Col>

                                                                </Row>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </DropdownMenu>
                                            </UncontrolledButtonDropdown>
                                        </li>
                                        <li className="text-center">
                                            <Link to='/law-school/settings' aria-label="settings">
                                                <i className="pe-7s-settings" data-for="settings"></i>
                                                <div className="msedge-right-header-text">Settings</div>
                                            </Link>
                                        </li>

                                        <li className="text-center">
                                            <Link to='/law-school/messages' aria-label="settings">
                                                <i className="pe-7s-bell" data-tip data-for="messages"></i>
                                                <div className="msedge-right-header-text">Inbox</div>
                                            </Link>
                                        </li>

                                        <li className="text-center">
                                            <Link to='/law-school/get-help' aria-label="get help">
                                                <div className="msedge-get-help">
                                                    <i className="pe-7s-help1" />
                                                    <div className="msedge-right-header-text">Help</div>
                                                </div>
                                            </Link>
                                        </li>

                                        <li className="msedge-logout-btn text-center">
                                            <Link aria-label="logout" tabIndex="0" role="button" aria-pressed="false" onClick={this.logout}>
                                                <i className="pe-7s-power" />
                                                <div className="msedge-right-header-text">Logout</div>
                                            </Link>
                                        </li>
                                    </ul>
                                </Col> </div>}
                    </div>
                </Col>
                <ReactTooltip />
            </Row>
        )
    }
}

const mapStateToProps = state => ({
    enableHeaderShadow: state.options.enableHeaderShadow,
    closedSmallerSidebar: state.options.closedSmallerSidebar,
    headerBackgroundColor: state.options.headerBackgroundColor,
    enableMobileMenuSmall: state.options.enableMobileMenuSmall,
    enableClosedSidebar: state.options.enableClosedSidebar,
    enableMobileMenu: state.options.enableMobileMenu,
    lawSchoolStyles: state.main,
});
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            setFontSize
        },
        dispatch
    );
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);