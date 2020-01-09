
import React, { Component } from 'react'
import Messages from '../../../components/commonComponents/messages'
import PageTitle from "../../layout/AppMain/PageTitle";
import {getSession} from "../../routes/routePaths"
class Index extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userId: "",
      userType: "",
      lawschoolId: "",
      ProofReaderSession: getSession("ProofReaderSession")
    }
  }

  componentWillMount() {
    let ProofReaderSession = this.state.ProofReaderSession
    let userId = ProofReaderSession.userId;
    let userType = ProofReaderSession.user_type

    this.setState({
      userId: userId,
      userType: userType
    })
  }

  render() {
    return (
      <div>
         <PageTitle
            heading="Inbox"
            brdcrumptwo="Support"
            brdcrumpthree="Inbox"
            subheading="Messages from BARBRI."
            linkToHome="/proof-reader"
          />
        <Messages messagesUserId={this.state.userId} messageUserType={this.state.userType} messagesUserLawschoolId={this.state.lawschoolId} />
      </div>
    )
  }
}

export default Index