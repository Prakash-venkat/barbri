import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

// Componets

import Overview from './overview/index'
import LawSchoolList from './lawSchool/list/list'
import LawSchoolAdd from './lawSchool/add/index'

import StudentAdd from './student/add/index'
import StudentList from './student/list/index'
import StudentUpload from './student/upload/index'
import StudentInvite from './student/invite/index'

import ItemTagList from './itemBank/itemTag/list/index'
import ItemTagAdd from './itemBank/itemTag/add/index'
import ItemBankList from './itemBank/itemBank/list/index'
import ItemBankAdd from './itemBank/itemBank/add/index'
import ItemError from './itemBank/itemError/index'

import PracticeExamList from './practiceExam/list/index'
import PracticeExamAdd from './practiceExam/add/index'

import UserList from './user/list/index'
import UserAdd from './user/add/index'

import Notification from './notification/index'

import VideoLibrary from './videoLibrary/index'
import Messages from './messages/index'
import Settings from './settings/index'
import InviteStudents from './student/invite/index'

import Support from './support/index'




// Layout

import AppHeader from './Layout/AppHeader/Header';
import AppSidebar from './Layout/AppSidebar';
import AppFooter from './Layout/AppFooter';

// Theme Options

import ThemeOptions from './Layout/ThemeOptions';

const Home = ({ match }) => (
    <Fragment>
        <div className="app-main">
            <AppSidebar />
            <div className="app-main__outer">
                <div className="app-main__inner">
                    <AppHeader />

                    {/* Charts */}
                    <Switch>
                        <Route exact path={`${match.url}/`} component={Overview} />

                        <Route path={`${match.url}/law-school-list`} component={LawSchoolList} />
                        <Route path={`${match.url}/law-school-add`} component={LawSchoolAdd} />
                        <Route path={`${match.url}/student-add`} component={StudentAdd} />
                        <Route path={`${match.url}/student-list`} component={StudentList} />
                        <Route path={`${match.url}/student-upload`} component={StudentUpload} />
                        <Route path={`${match.url}/student-inivite`} component={StudentInvite} />
                        <Route path={`${match.url}/item-tag-list`} component={ItemTagList} />
                        <Route path={`${match.url}/item-tag-add`} component={ItemTagAdd} />
                        <Route path={`${match.url}/item-bank-list`} component={ItemBankList} />
                        <Route path={`${match.url}/item-bank-add`} component={ItemBankAdd} />
                        <Route path={`${match.url}/item-error`} component={ItemError} />
                        <Route path={`${match.url}/practice-list`} component={PracticeExamList} />
                        <Route path={`${match.url}/practice-add`} component={PracticeExamAdd} />
                        <Route path={`${match.url}/user-list`} component={UserList} />
                        <Route path={`${match.url}/user-add`} component={UserAdd} />
                        <Route path={`${match.url}/notification`} component={Notification} />
                        <Route path={`${match.url}/video-library`} component={VideoLibrary} />
                        <Route path={`${match.url}/settings`} component={Settings} />
                        <Route path={`${match.url}/messages`} component={Messages} />
                        <Route path={`${match.url}/student-invite`} component={InviteStudents} />
                        <Route exact path={`${match.url}/get-help`} component={Support} />



                    </Switch>

                </div>
                <AppFooter />
            </div>
        </div>
    </Fragment>
);

export default Home;