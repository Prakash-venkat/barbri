import React, { Component } from 'react'
import VideoLectures from "../../../components/commonComponents/VideoLecture";
import PageTitle from "../../layout/AppMain/PageTitle";
import {language} from "../../../utils/locale/locale"
class Index extends Component {
    render() {
        return (
            <div>
         <PageTitle
          heading={language.video_lecture}
          brdcrumptwo={language.support}
          brdcrumpthree={language.video_lecture}
          subheading="Brush up on your knowledge of the rules by watching the subject Mini Review. Each subject lecture
          provides a concise review of the highly tested topics in each subject."
          linkToHome="/law-school"
        />
                <VideoLectures />
            </div>
        )
    }
}

export default Index