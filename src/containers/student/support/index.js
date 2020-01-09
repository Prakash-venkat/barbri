import React, { Component } from "react";
import Supportgethelp from "../../../components/commonComponents/support";
import PageTitle from "../../layout/AppMain/PageTitle"

class Support extends Component {
  render() {
    return (
      <div className="msedge-support-sec">
        <PageTitle
          heading="Get help"
          brdcrumptwo="Support"
          brdcrumpthree="Get help"
          brdcrumptwolink="/students/video-lectures"
          linkToHome="/students"

        />
        <Supportgethelp />
      </div>
    );
  }
}

export default Support; 
