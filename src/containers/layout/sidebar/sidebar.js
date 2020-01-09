import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import cx from "classnames";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import PerfectScrollbar from "react-perfect-scrollbar";
import HeaderLogo from "../logo/index";

import { setEnableMobileMenu } from "../../../reducers/options";

import Adminnav from '../nav/nav_admin';
import StudentNav from '../nav/nav_students';
import LawSchoolNav from '../nav/nav_law-school';
import ProofReader from '../nav/nav_proof-reader';

import ToggleStudent from './toggle_students';
import ToggleAdmin from './toggle_admin';
import ToggleLawSchool from './toggle_law-school';
import ToggleProofReader from './toggle_proof-reader';

class AppSidebar extends Component {
    constructor(props){
        super(props);
    }
  state = {};

  toggleMobileSidebar = () => {
    let { enableMobileMenu, setEnableMobileMenu } = this.props;
    setEnableMobileMenu(!enableMobileMenu);
  };

  render() {

    let {
      backgroundColor,
      enableBackgroundImage,
      enableSidebarShadow,
      backgroundImage,
      backgroundImageOpacity
    } = this.props;

    const nav = {
      "admin" : Adminnav,
      "law-school" : LawSchoolNav,
      "students": StudentNav,
      "proof-reader": ProofReader 
    }
    const toggle = {
      "admin" : ToggleAdmin,
      "law-school" : ToggleLawSchool,
      "students": ToggleStudent,
      "proof-reader": ToggleProofReader 
    }

    const NavBar = nav[(this.props.path).substr(1)]
    const ToggleStudentSidebar = toggle[(this.props.path).substr(1)]
    
    return (
      <Fragment>
        {!this.props.enableClosedSidebar ? 
        <div>
        <div
          className="msedge-sidebar-mobile-overlay"
          onClick={this.toggleMobileSidebar}
        />
        <ReactCSSTransitionGroup
          component="div"
          className={cx("msedge-sidebar", backgroundColor)}
          transitionName="SidebarAnimation"
          transitionAppear={true}
          transitionAppearTimeout={1500}
          transitionEnter={false}
          transitionLeave={false}
        >
          <PerfectScrollbar>
            <HeaderLogo homeUrl={this.props.path}/>

            <div className="msedge-sidebar-inner" role="navigation">
              <NavBar enableClosedSidebar={this.props.enableClosedSidebar} />
            </div>
          </PerfectScrollbar>
          <div
            className={cx("msedge-sidebar-bg", backgroundImageOpacity)}
            style={{
              backgroundImage: enableBackgroundImage
                ? "url(" + backgroundImage + ")"
                : null
            }}
          ></div>
        </ReactCSSTransitionGroup>
        </div>
        : <ToggleStudentSidebar ToggleStudentSidebar={this.props.ToggleStudentSidebar}/>}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  enableBackgroundImage: state.options.enableBackgroundImage,
  enableSidebarShadow: state.options.enableSidebarShadow,
  enableMobileMenu: state.options.enableMobileMenu,
  backgroundColor: state.options.backgroundColor,
  backgroundImage: state.options.backgroundImage,
  backgroundImageOpacity: state.options.backgroundImageOpacity,
  enableClosedSidebar:state.options.enableClosedSidebar
});

const mapDispatchToProps = dispatch => ({
  setEnableMobileMenu: enable => dispatch(setEnableMobileMenu(enable))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppSidebar);
