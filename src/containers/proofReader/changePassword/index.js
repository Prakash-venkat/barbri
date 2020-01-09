import React, { Component } from "react";
import { Row } from "reactstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import ChangePassword from "../../../components/commonComponents/changepassword";
import PageTitle from "../../layout/AppMain/PageTitle";
import {getSession} from "../../routes/routePaths"
import {customPageTitle} from "../../../components/commonComponents/customPageTitle"
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: "",
      ProofReaderSession : getSession("ProofReaderSession")
    };
  }

  componentDidMount() {
    let ProofReaderSession= this.state.ProofReaderSession
    let userid = ProofReaderSession.userId;
    this.setState({ userid: userid });
    customPageTitle("Change Password")
  }

  render() {
    return (
      <div>
        <ReactCSSTransitionGroup
          component="div"
          transitionName="TabsAnimation"
          transitionAppear={true}
          transitionAppearTimeout={0}
          transitionEnter={false}
          transitionLeave={false}
        >
          <PageTitle
            heading="Change Password"
            brdcrumptwo="Support"
            brdcrumpthree="Change Password"
            brdcrumptwolink="/proof-reader/inbox"
            linkToHome="/proof-reader"
          />
          <div className="msedge-changepassword-proofreader">
            <Row>
              <div className="container-fluid bg-grey p-30">
                <ChangePassword passwordUserId={this.state.userid} moduleName={"ProofReaderSession"}/>
              </div>
            </Row>
          </div>
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

export default Index
