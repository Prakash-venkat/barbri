import React, { Component } from "react";
import Messages from "../../../components/commonComponents/messages";
import PageTitle from "../../layout/AppMain/PageTitle";
import {getSession} from "../../routes/routePaths";
import {language} from "../../../../src/utils/locale/locale";

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: "",
      userType: "",
      lawschoolId: "",
      studentSession: getSession("StudentSession")
    };
  }

  render() {
    let studentSession = this.state.studentSession
    return (
      <div>
        <PageTitle
            heading={language.inbox}
            brdcrumptwo={language.support}
            brdcrumpthree={language.inbox}
            subheading={language.Messages_from_barbri}
            brdcrumptwolink="/students/video-lectures"
            linkToHome="/students"
          />

        <Messages
          messagesUserId={studentSession.userId}
          messageUserType={studentSession.user_type}
          messagesUserLawschoolId={studentSession.userLawschoolID}
        />
      </div>
    );
  }
}

export default Index;
