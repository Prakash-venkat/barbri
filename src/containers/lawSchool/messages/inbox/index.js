import React, { Component } from 'react'
import Messages from '../../../../components/commonComponents/messages'
import { Row } from 'antd';
import PageTitle from '../../../../containers/layout/AppMain/PageTitle';
import {getSession} from '../../../routes/routePaths'
class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: "",
      userType: "",
      lawschoolId: "",
      LawSchoolSession: getSession("LawSchoolSession")
    }
  }
  componentWillMount(props) {
    let getSessionData = this.state.LawSchoolSession
    let userId = getSessionData.userId;
    let userType = getSessionData.user_type

    this.setState({
      userId: userId,
      userType: userType
    })
  }

  render() {

    return (
      <div>
        <Row>
          <PageTitle
            heading="Inbox"
            brdcrumptwo="Inbox"
            brdcrumpthree="Messages"
            subheading="Messages from BARBRI."
            linkToHome="/law-school"
          />
        </Row>
        <div>
          <Messages
            messagesUserId={this.state.userId}
            messageUserType={this.state.userType}
            messagesUserLawschoolId={this.state.lawschoolId}
          />
        </div>
      </div>
    )
  }
}

export default Index
