import React, { Fragment } from "react";
import {Link} from "react-router-dom";
import { connect } from "react-redux";
import AppMobileMenu from "../mobileMenu";
import Hamburger from 'react-hamburgers';

import {
  setEnableClosedSidebar,
  setEnableMobileMenu,
  setEnableMobileMenuSmall
} from "../../../reducers/options";
import logo from "../../../assets/utils/images/logo-black.png";

class HeaderLogo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      mobile: false,
      activeSecondaryMenuMobile: false
    };
  }

  toggleEnableClosedSidebar = () => {
    let { enableClosedSidebar, setEnableClosedSidebar } = this.props;
    setEnableClosedSidebar(!enableClosedSidebar);
  };

  state = {
    openLeft: false,
    openRight: false,
    relativeWidth: false,
    width: 280,
    noTouchOpen: false,
    noTouchClose: false
  };

  render() {
    return (
      <Fragment>
        <div className="msedge-header-logo">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-10">
                <div className="row">
              <div className="msedge-logo">
              <Link to={this.props.homeUrl}>
            <img
              src={logo}
              className="msedge-sidebar-logo"
              alt="Multistage edge logo"
            /></Link>
          </div>
          </div>
              </div>

              <div className="col-md-2 mt-2">
                {/* {this.props.studentLogo ?  */}
              <div onClick={this.toggleEnableClosedSidebar} className="msedge-students-toggledsidebar-enable-hamburger">
                            <Hamburger
                                active={this.props.enableClosedSidebar}
                                type="elastic"
                                onClick={() => this.setState({active: !this.state.active})}
                            />
              </div> 
              {/* : "" } */}
            </div>
          </div>
  </div>
        </div> 

        <AppMobileMenu />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  enableClosedSidebar: state.options.enableClosedSidebar,
  enableMobileMenu: state.options.enableMobileMenu,
  enableMobileMenuSmall: state.options.enableMobileMenuSmall
});

const mapDispatchToProps = dispatch => ({
  setEnableClosedSidebar: enable => dispatch(setEnableClosedSidebar(enable)),
  setEnableMobileMenu: enable => dispatch(setEnableMobileMenu(enable)),
  setEnableMobileMenuSmall: enable => dispatch(setEnableMobileMenuSmall(enable))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderLogo);
