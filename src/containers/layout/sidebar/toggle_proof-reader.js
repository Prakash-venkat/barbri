import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Collapse, UncontrolledTooltip } from "reactstrap";
import { connect } from 'react-redux';
import Hamburger from 'react-hamburgers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {
    faBookReader, faTools, faHome,

} from '@fortawesome/free-solid-svg-icons';

import { setEnableClosedSidebar } from '../../../reducers/options'

const toggleProofReaderSidebar =

    [
        {
            title: "Support",
            target: "/proof-reader/inbox",
            icon: "pe-7s-tools",
            id: "support",
            subTitles: [
                {
                    title: "Inbox",
                    target: "/proof-reader/inbox",
                    icon: "pe-7s-chat",
                    id: "inbox"
                },
                {
                    title: "Settings",
                    target: "/proof-reader/change-password",
                    icon: "pe-7s-settings",
                    id: "settings"
                }
            ]
        }]


class ToggledSidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accordion: [false, false, false],
        }

    }

    toggleAccordion = (tab) => {
        const prevState = this.state.accordion;
        const state = prevState.map((x, index) => (tab === index ? !x : false));
        this.setState({
            accordion: state
        })
    }

    toggleEnableClosedSidebar = () => {
        let { enableClosedSidebar, setEnableClosedSidebar } = this.props;
        setEnableClosedSidebar(!enableClosedSidebar);
    }

    render() {
        return (
            <div className="msedge-students-toggledsidebar-main proof-reder-toggle" id="accordion">
                <ReactCSSTransitionGroup
                    transitionName="SidebarAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={1500}
                    transitionEnter={false}
                    transitionLeave={false}
                >
                    <div className="msedge-students-toggledsidebar-segment">

                        <div onClick={this.toggleEnableClosedSidebar} className="msedge-students-toggledsidebar-hamburger">
                            <Hamburger
                                active={this.props.enableClosedSidebar}
                                type="elastic"
                            />
                        </div>
                        <hr className="mb-2" />

                        <div>
                            <Link to={`/proof-reader`} id="itemsforreview">
                                <span className="msedge-students-toggledsidebar-icons"><i className="pe-7s-home"></i></span></Link>
                        </div>
                        <span class="msedge-toggle-title-txt">Items for review</span>
                        <UncontrolledTooltip placement="right" target="itemsforreview">
                            Items For Review
                        </UncontrolledTooltip>

                        <div>
                            {toggleProofReaderSidebar.map((mainmenu, index) => (
                                <div>
                                    <div className="msedge-students-toggledsidebar-icons-main">
                                        <Link to={`${mainmenu.target}`} id={`${mainmenu.id}`} onClick={() => this.toggleAccordion(index)} aria-expanded={this.state.accordion[index]} aria-controls="collapseOne">
                                        <span className="msedge-students-toggledsidebar-icons"><i className={`${mainmenu.icon}`}></i></span></Link></div>
                                        <span class="msedge-toggle-title-txt">{`${mainmenu.title}`}</span>
                                    <UncontrolledTooltip placement="right" target={`${mainmenu.id}`}>
                                        {mainmenu.title}
                                    </UncontrolledTooltip>

                                    <Collapse
                                        isOpen={this.state.accordion[index]}
                                        data-parent="#accordion"
                                        id="collapseOne"
                                        aria-labelledby="headingOne"
                                        className="msedge-timing-performance-accordian-background"
                                    >
                                        <div>
                                            {mainmenu.subTitles.map((nextmenu, i) => (
                                                <div>
                                                    <div>
                                                    <Link to={nextmenu.target} id={nextmenu.id} className="msedge-students-toggledsidebar-nextmenu-icons"><i className={`${nextmenu.icon}`}></i></Link>

                                                    <UncontrolledTooltip placement="right" target={nextmenu.id}>
                                                        {nextmenu.title}
                                                    </UncontrolledTooltip>

                                                </div>
                                                <span className="msedge-togglecollapse-submenu">{`${nextmenu.title}`}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </Collapse>

                                </div>
                            ))}
                        </div>
                    </div>
                </ReactCSSTransitionGroup>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    enableClosedSidebar: state.options.enableClosedSidebar,
});

const mapDispatchToProps = dispatch => ({
    setEnableClosedSidebar: enable => dispatch(setEnableClosedSidebar(enable)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ToggledSidebar);             