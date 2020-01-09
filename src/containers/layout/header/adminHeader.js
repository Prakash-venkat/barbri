import React, { Component } from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';

import Slider from "rc-slider";
import Tooltip from 'rc-tooltip';
import {
    UncontrolledDropdown, DropdownToggle, DropdownMenu,
    Nav, Button, NavItem, NavLink, UncontrolledButtonDropdown,
    Modal, ModalHeader, ModalBody, Row, Col, Input, Dropdown
} from 'reactstrap';

import Tabs from 'react-responsive-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PerfectScrollbar from 'react-perfect-scrollbar';

import {
    faAngleDown
} from '@fortawesome/free-solid-svg-icons';


import avatar1 from '../../../assets/utils/images/avatars/13.png';

import AppDrawer from '../logo/adminWrapper'
import { getSession } from '../../routes/routePaths';
import { HASH_HISTORY } from '../../../actions/constants';

const Handle = Slider.Handle;

const handle = (props) => {
    const { value, dragging, index, ...restProps } = props;
    return (
        <Tooltip
            prefixCls="rc-slider-tooltip"
            overlay={`${value}%`}
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
            notifications: [],
            new_messages: 0,
            today: '',
            username: '',
            errorMsg: [],
            dropdownOpen: false,
            modal: false,
            fontSize: 100,
            adminSession: getSession("AdminSession"),
            windowWith: window.innerWidth
        };
    }


  handleResize = (event) => {
    this.setState({ windowWith: window.innerWidth })
  }
  componentDidMount() {
    window.addEventListener('resize', this.handleResize)
  }

  componentDidUnmount() {
    window.removeEventListener('resize', this.handleResize)
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

    dropdownToggle = () => {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    fieldHandler = (field, event) => {
        let row = this.state;
        switch (field) {
            case "recoverpassword":
                row.recover_email = event.target.value;
                this.setState({ recover_email: event.target.value });
                event.target.value.trim() === '' ? errorMsg[0] = 'Invalid Valid' : errorMsg[0] = ''
                break;
        }
    }
    onSubmitField = (e) => {
        e.preventDefault();
    }
    // popuptoggle

    toggleModal = () => {
        this.setState(prevState => ({
            modal: !prevState.modal,

        }))
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
        sessionStorage.removeItem("AdminSession")
        localStorage.removeItem("AdminSession")
        HASH_HISTORY.push('/')
    }

    changePassword = () => {
        HASH_HISTORY.push('/admin/settings')
        this.setState({ dropdownOpen: false })
    }


    render() {

        const style = {
            paddingLeft: '5px',
            color: 'red'
        }
        let adminSession = this.state.adminSession

        let { enableMobileMenuSmall, } = this.props;
        return (
            <Row>
                <Col sm="12" md="12" lg="12" xl="12" className="msedge-top-head">

                    <div className="msedge-header-segment">
                        {this.state.windowWith < 1024 ? <div className={cx(
                            "msedge-header-content msedge-common-header",
                            { 'header-mobile-open': enableMobileMenuSmall },
                        )}>
                            <Col sm="6" md="3" lg="3" xl="4" className="msedge-header-left">

                                <UncontrolledButtonDropdown>
                                    <Dropdown isOpen={this.state.dropdownOpen} toggle={this.dropdownToggle}>
                                        <DropdownToggle color="link" className="p-0">
                                            <h6 className="msedge-header-username">{adminSession.name}<FontAwesomeIcon className="ml-2 opacity-8" icon={faAngleDown} /></h6>
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
                                                                        alt="User profile" />
                                                                </div>
                                                                <div className="widget-content-left">
                                                                    <div className="font-weight-bold">
                                                                        {this.state.username}
                                                                    </div>
                                                                    <div className="widget-subheading opacity-8">
                                                                        {/* DATES: 7/1/21 - 11/1/21 */}

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
                                                            <NavLink onClick={this.changePassword} className="text-primary">Change password</NavLink>
                                                        </NavItem>
                                                    </Nav>
                                                </PerfectScrollbar>
                                            </div>
                                        </DropdownMenu>
                                    </Dropdown>
                                </UncontrolledButtonDropdown>

                                {/* <p className="mb-0">DATES: 7/1/21 - 11/1/21 </p> */}
                            </Col>
                            <Col className="msedge-header-right">

                                <AppDrawer />

                            </Col>
                        </div> :
                            <div className={cx(
                                "msedge-header-content msedge-common-header",
                                { 'header-mobile-open': enableMobileMenuSmall },
                            )}>
                                <Col sm="6" md="3" lg="3" xl="4" className="msedge-header-left">

                                    {/* <UncontrolledButtonDropdown> */}
                                    <Dropdown isOpen={this.state.dropdownOpen} toggle={this.dropdownToggle}>
                                        <DropdownToggle color="link" className="p-0">
                                            <h6 className="msedge-header-username">
                                                {adminSession.name}<FontAwesomeIcon className="ml-2 opacity-8" icon={faAngleDown} /></h6>
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
                                                                        alt="User profile" />
                                                                </div>
                                                                <div className="widget-content-left">
                                                                    <div className="font-weight-bold">

                                                                        {this.state.username}

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
                                                height: '120px'
                                            }}>
                                                <PerfectScrollbar>
                                                    <Nav vertical>
                                                        <NavItem className="nav-item-header">
                                                            Activity
                                                    </NavItem>
                                                        <NavItem onClick={this.changePassword}>
                                                            <NavLink onClick={this.changePassword} className="text-primary">Change password</NavLink>
                                                        </NavItem>
                                                    </Nav>
                                                </PerfectScrollbar>
                                            </div>
                                        </DropdownMenu>
                                    </Dropdown>
                                    {/* </UncontrolledButtonDropdown> */}

                                    {/* <p>DATES:9-19-2019 - 09-19-2019</p> */}



                                </Col>


                                <Col sm="6" md="9" lg="9" xl="8" className="msedge-header-right">
                                    <ul className="msedge-header-right-list">

                                        <li className="msedge-font-resize pr-2">
                                            <UncontrolledButtonDropdown>
                                                <DropdownToggle color="link" className="p-0">
                                                    <h6 className="resize-fonts text-center" aria-label="font resize" data-tip data-for="resize-font">
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

                                        <li className="msedge-admin-setting text-center">
                                            <Link to='/admin/settings' aria-label="settings">
                                                <i className="pe-7s-settings" data-tip data-for="settings"></i>
                                                <div className="msedge-right-header-text">Settings</div>
                                            </Link>
                                        </li>

                                        <li>
                                            <Link to='/admin/get_help' aria-label="get help">
                                                <div className="msedge-get-help text-center" data-tip data-for="get-help">
                                                    <i className="pe-7s-help1" />
                                                    <div className="msedge-right-header-text">Help</div>
                                                </div>
                                            </Link>
                                        </li>
                                        <li className="msedge-logout-btn text-center">
                                            <Link aria-label="logout" role="button" aria-pressed="false" onClick={this.logout}>
                                                <i className="pe-7s-power" data-tip data-for="logout" />
                                                <div className="msedge-right-header-text">Logout</div>
                                            </Link>
                                        </li>
                                    </ul>
                                </Col>

                            </div>}


                        <Modal isOpen={this.state.modal} toggle={this.toggleModal} className={this.props.className}>
                            <ModalHeader toggle={this.toggleModal}>

                                Recover Your Password
                            </ModalHeader>
                            <ModalBody>
                                <div>
                                    <Row className="justify-content-center">
                                        <Col md="12">
                                            <form onSubmit={this.onSubmitField}>

                                                <Row className="row-space">
                                                    <Col md="4" className="">
                                                        <label htmlFor="description">Enter Your Email<b style={style}>*</b> </label>
                                                    </Col>
                                                    <Col md="7" className="">

                                                        <div className="form-group">
                                                            <Input type="text"
                                                                value={this.state.recover_email}
                                                                onChange={this.fieldHandler.bind(this, "recoverpassword")}

                                                            />

                                                            <span className="text-danger ">{this.state.errorMsg[0]}</span>

                                                        </div>
                                                    </Col>
                                                </Row>
                                                <div className="row">
                                                    <div className="col-md-12 mt-3 pt-3">
                                                        <div className="form-group text-right">
                                                            <button type="submit" className="btn btn-outline-primary pr-5 pl-5 mr-2">Send</button>
                                                            <button type="button" className="btn btn-outline-primary pr-5 pl-5" onClick={this.toggleModal}>Back</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </Col>
                                    </Row>
                                </div>
                            </ModalBody>
                        </Modal>

                    </div>
                </Col>
            </Row >
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