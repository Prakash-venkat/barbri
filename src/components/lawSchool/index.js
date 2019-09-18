import React, {Fragment} from 'react';
import {Route, Switch} from 'react-router-dom';

// Componets

import Overview from './overview/index'

import ExamReports from './examReports/index'

import Messages from './messages/index'
import Download from './students/download/index'
import Students from './students/index'
import Support from './support/index'
import Settings from './settings/index'

// Layout

import AppHeader from './Layout/AppHeader/Header';
import AppSidebar from './Layout/AppSidebar';
import AppFooter from './Layout/AppFooter';

// Theme Options

import ThemeOptions from './Layout/ThemeOptions';

const Home = ({match}) => (
    <Fragment>
        <div className="app-main">
            <AppSidebar/>
            <div className="app-main__outer">
                <div className="app-main__inner">
                <AppHeader />

                    {/* Charts */}
                    <Switch>
                    <Route exact path={`${match.url}/`} component={Overview}/>
                    <Route exact path={`${match.url}/exam-reports`} component={ExamReports}/>

                    <Route exact path={`${match.url}/messages`} component={Messages}/>

                    <Route exact path={`${match.url}/students`} component={Students}/>
                    <Route exact path={`${match.url}/download`} component={Download}/>
                    <Route exact path={`${match.url}/get-help`} component={Support}/>
                    <Route exact path={`${match.url}/settings`} component={Settings}/>
                    </Switch>

                </div>
                <AppFooter/>
            </div>
        </div>
    </Fragment>
);

export default Home;