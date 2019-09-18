import React, {Component, Fragment} from 'react';

import {
    Breadcrumb, BreadcrumbItem
} from 'reactstrap';

import {
    faHome

} from '@fortawesome/free-solid-svg-icons';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export default class TitleComponent3 extends Component {

    render() {
        return (
            <Fragment>
                <Breadcrumb>
                    <BreadcrumbItem><a href="javascript:void(0);">
                        <FontAwesomeIcon icon={faHome}/></a>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <a href="javascript:void(0);">Students</a>
                    </BreadcrumbItem>
                    <BreadcrumbItem>Exams</BreadcrumbItem>
                    <BreadcrumbItem active>Exam Reports</BreadcrumbItem>
                </Breadcrumb>
            </Fragment>
        );
    }
}