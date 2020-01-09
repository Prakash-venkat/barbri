
import React, { Component } from 'react'
import {dataList} from "../../../components/admin/dataList";
import PageTitle from "../../layout/AppMain/PageTitle"
import VideoLectures from "../../../components/commonComponents/VideoLecture";
class Index extends Component {
    render() {
        return (
            <div>
         <PageTitle
          heading={dataList.video_lecture}
          brdcrumptwo={dataList.support}
          brdcrumpthree={dataList.video_lecture}
          linkToHome="/students"
          subheading="Brush up on your knowledge of the rules by watching the subject Mini Review. Each subject lecture
          provides a concise review of the highly tested topics in each subject."
        />
                <VideoLectures />
            </div>
        )
    }
}

export default Index


