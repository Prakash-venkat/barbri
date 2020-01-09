import React, { Component } from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip'
import {
    DropdownToggle, DropdownMenu,
    Nav, Button, NavItem, NavLink, UncontrolledButtonDropdown, Row, Col, Dropdown
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Slider from "rc-slider";
import Tooltip from 'rc-tooltip';

import {
    faAngleDown,
} from '@fortawesome/free-solid-svg-icons';
import avatar1 from '../../../assets/utils/images/avatars/13.png';
import AppDrawer from '../logo/proofWrapper'
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
            activeSecondaryMenuMobile: false,
            fontSize: 100,
            dropdownOpen: false,
            ProofReaderSession: getSession("ProofReaderSession"),
            windowWith: window.innerWidth

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

        let ProofReaderSession=this.state.ProofReaderSession;
        let userName = ProofReaderSession.name;
        let userID = ProofReaderSession.userId;
        let userType = ProofReaderSession.user_type
        this.setState({
            userName: userName,
        }, () => this.fetchData(userID, userType));

    }

    fetchData = (userID, userType) => {
        let lawschoolId = ""

        instance.get(`users/messages/?publishTo=${userType}&lawschoolID=${lawschoolId}&userId=${userID}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,        
            }
          })
            .then(res => {

                this.setState({
                    filteredData: res.data.data,
                }, () => this.totalMessages())
            }).catch(e => {
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
        sessionStorage.removeItem("ProofReaderSession")
        localStorage.removeItem("ProofReaderSession")
        HASH_HISTORY.push('/')
    }
    onSliderChange = value => {
        this.setState({ fontSize: value }, () => {
            document.querySelector(
                "html"
            ).style.fontSize = `${this.state.fontSize}%`;
        })
    }

    onSliderChange = value => {
        this.setState({ fontSize: value }, () => {
            document.querySelector(
                "html"
            ).style.fontSize = `${this.state.fontSize}%`;
        })
    }
    changePassword = () => {
        HASH_HISTORY.push('/proof-reader/change-password')
        this.setState({ dropdownOpen: false })
    }
    dropdownToggle = () => {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }
    message = () => {
        HASH_HISTORY.push('/proof-reader/inbox')
        this.setState({ dropdownOpen: false })
    }

    render() {
        let {
            enableMobileMenuSmall,

        } = this.props;

        return (
            <Row>
                <Col sm="12" md="12" lg="12" className="msedge-top-head">
                    <div className="msedge-header-segment">
                        {this.state.windowWith < 1024 ? <div className={cx(
                            "msedge-header-content msedge-pr-header",
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
                                                                    {/* <div className="widget-subheading opacity-8">
                                                                        DATES: 7/1/21 - 11/1/21
                                                                    </div> */}
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
                                                            {/* <NavLink href="/#/proof-reader/inbox"> */}
                                                            <NavLink onClick={this.message} className="text-primary">
                                                                Inbox
                                                                <div className="ml-auto badge badge-pill badge-info">{this.state.totalMessages}</div>
                                                            </NavLink>
                                                        </NavItem>
                                                        <NavItem>
                                                            {/* <NavLink href="/#/proof-reader/change-password"> */}
                                                            <NavLink onClick={this.changePassword} className="text-primary">Change password</NavLink>
                                                        </NavItem>

                                                    </Nav>
                                                </PerfectScrollbar>
                                            </div>
                                        </DropdownMenu>
                                    </Dropdown>
                                </UncontrolledButtonDropdown>

                                {/* <p>DATES: 7/1/21 - 11/1/21 </p> */}
                            </Col>
                            <div className="msedge-header-right">

                                <AppDrawer />

                            </div>
                        </div> :
                            <div className={cx(
                                "msedge-header-content msedge-pr-header",
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
                                                                        {/* <div className="widget-subheading opacity-8">
                                                                            DATES: 7/1/21 - 11/1/21
                                                                    </div> */}
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
                                                                {/* <NavLink href="/#/proof-reader/inbox"> */}
                                                                <NavLink onClick={this.message} className="text-primary">
                                                                    Inbox
                                                                <div className="ml-auto badge badge-pill badge-info">{this.state.totalMessages}</div>
                                                                </NavLink>
                                                            </NavItem>
                                                            <NavItem>
                                                                {/* <NavLink href="/#/proof-reader/change-password"> */}
                                                                <NavLink onClick={this.changePassword} className="text-primary">Change password</NavLink>
                                                            </NavItem>

                                                        </Nav>
                                                    </PerfectScrollbar>
                                                </div>
                                            </DropdownMenu>
                                        </Dropdown>
                                    </UncontrolledButtonDropdown>

                                    {/* <p>DATES: 7/1/21 - 11/1/21 </p> */}
                                </Col>


                                <Col sm="6" md="9" lg="9" xl="8" className="msedge-header-right">
                                    <ul className="msedge-header-right-list">
                                        <li className="msedge-font-resize pr-2 ml-3">
                                            <UncontrolledButtonDropdown>
                                                <DropdownToggle color="link" className="p-0">
                                                    <h6 className="resize-fonts" aria-label="font resize" data-tip data-for="resize-font">
                                                        <span className="msedge-resize-fonts">A</span>A
                                                    </h6>
                                                    <div className="msedge-right-header-text">Resize</div>
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
                                                                            value={parseInt(this.state.fontSize)}
                                                                            handle={handle}
                                                                            onChange={value => this.onSliderChange(value)}
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
                                        <li className="pl-2 text-center">
                                            <Link to='/proof-reader/change-password'>
                                                <i className="pe-7s-settings"></i>
                                                <div className="msedge-right-header-text">Settings</div>
                                            </Link>
                                        </li>

                                        {/* <li className="text-center">
                                            <Link to="/proof-reader/get-help">
                                                <div className="msedge-get-help">
                                                    <i className="pe-7s-help1" />
                                                    <div className="msedge-right-header-text">Help</div>
                                                </div>
                                            </Link>
                                        </li> */}

                                        <li className="msedge-logout-btn text-center">
                                            <Link aria-label="logout" role="button" aria-pressed="false" onClick={this.logout}>
                                                <i className="pe-7s-power" data-tip data-for="logout" />
                                                <div className="msedge-right-header-text">Logout</div>
                                            </Link>
                                        </li>

                                    </ul>
                                </Col>




                            </div>}
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
});

export default connect(mapStateToProps)(Header);