import React, {Component} from 'react';
import {connect} from 'react-redux';
import cx from 'classnames';

import {
    Breadcrumb, BreadcrumbItem
} from 'reactstrap';

import {
    faHome

} from '@fortawesome/free-solid-svg-icons';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import TitleComponent1 from './PageTitleExamples/Variation1'
import TitleComponent2 from './PageTitleExamples/Variation2'
import TitleComponent3 from './PageTitleExamples/Variation3'

class PageTitle extends Component {
    randomize(myArray) {
        return myArray[Math.floor(Math.random() * myArray.length)];
    }

    render() {
        let {
            enablePageTitleIcon,
            enablePageTitleSubheading,

            heading,
            icon,
            subheading,
            brdcrumptwo,
            brdcrumpthree,
            brdcrumpfour,
        } = this.props;

        var arr = [<TitleComponent1 />, <TitleComponent2 />, <TitleComponent3 />]

        return (

            <div className="app-page-title">
                <div className="page-title-wrapper">
                    <div className="page-title-heading">
                        {/* <div
                            className={cx("page-title-icon", {'d-none': !enablePageTitleIcon})}>
                            <i className={icon}/>
                        </div> */}
                        <div>
                            {heading}
                            <div
                                className={cx("page-title-subheading", {'d-none': !enablePageTitleSubheading})}>
                                {subheading}
                            </div>
                        </div>
                    </div>
                    <div className="page-title-actions">
                    <Breadcrumb>
                    <BreadcrumbItem><a href="javascript:void(0);">
                        <FontAwesomeIcon icon={faHome}/></a>
                    </BreadcrumbItem>
                    {/* <BreadcrumbItem>
                        <a href="javascript:void(0);">Admin</a>
                    </BreadcrumbItem> */}
                    <BreadcrumbItem active>{brdcrumptwo}</BreadcrumbItem>
                    <BreadcrumbItem active>{brdcrumpthree}</BreadcrumbItem>
                    <BreadcrumbItem active>{brdcrumpfour}</BreadcrumbItem>

                </Breadcrumb>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    enablePageTitleIcon: state.ThemeOptions.enablePageTitleIcon,
    enablePageTitleSubheading: state.ThemeOptions.enablePageTitleSubheading,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PageTitle);