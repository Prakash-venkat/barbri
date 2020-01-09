import React, { Component } from 'react';
import SupportGetHelp from "../../../components/commonComponents/support";
import PageTitle from "../../layout/AppMain/PageTitle";
import {language} from "../../../utils/locale/locale"
class Support extends Component {
    render() {
        return (
            <div className="msedge-support-sec">
                <PageTitle
                    heading={language.get_help}
                    brdcrumptwo={language.support}
                    brdcrumptwolink="/law-school/videolecture"
                    brdcrumpthree="Get help"
                    linkToHome="/law-school"
                />
                <SupportGetHelp />
            </div>
        )
    }
}

export default Support