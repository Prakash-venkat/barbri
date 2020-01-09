import React, { Component,Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

//Headers
import AdminHeader from "../layout/header/adminHeader";
import LawSchoolHeader from "../layout/header/lawSchoolHeader"
import StudentHeader from "../layout/header/studentsHeader";
import ProofReaderHeader from "../layout/header/proofHeader"

//Sidebar
import Sidebar from "../layout/sidebar/sidebar"

//Footer
import AppFooter from "../layout/footer/index";

//NotFound
import NotFound from "../../landingPages/notFound/index";

//All Modules Routes
import {adminRoutePaths} from './routesList'
import {lawSchoolRoutePaths} from './routesList'
import {studentRoutePaths} from './routesList'
import {proofReaderRoutePaths} from './routesList'

//Routes JSON
const moduleRoutes = {
  "/admin" : adminRoutePaths,
  "/law-school" : lawSchoolRoutePaths,
  "/students": studentRoutePaths,
  "/proof-reader": proofReaderRoutePaths 
}

export const getSession=(moduleName)=>{ //Get user session
  return localStorage.getItem(moduleName) ? JSON.parse(localStorage.getItem(moduleName)) : JSON.parse(sessionStorage.getItem(moduleName));
}
class Student extends Component{
    constructor(props){
        super(props);
    }

  render(){
    return(
  <Fragment>
    <div className="msedge-main">
      <div role="navigation">
          <Sidebar path={this.props.match.url} />   
      </div>

      <main className="msedge-main-outer" style={{paddingLeft : this.props.enableClosedSidebar ? '0px' : '280px'}} role="main">
        <div className="msedge-main-inner">
          <header>
              {this.props.match.url == '/admin' ?
              <AdminHeader/> :
              this.props.match.url == '/law-school' ?
              <LawSchoolHeader/> :
              this.props.match.url == '/students' ? 
              <StudentHeader /> :
              this.props.match.url == '/proof-reader' ?
              <ProofReaderHeader/> : '' }
          </header>
          <Switch>

          {moduleRoutes[this.props.match.url].map((routes,index)=>{
                 return <Route
                  path={`${this.props.match.url}/${routes.target}`}
                  component={routes.component}
                  exact={true}
                />
              })}

           <Route component={NotFound} />
          </Switch>
        </div>
        <footer>
          <AppFooter />
        </footer>
      </main>
    </div>
  </Fragment>
);
}
}

const mapStateToProps = state => ({
 
  enableClosedSidebar: state.options.enableClosedSidebar
});

export default connect(mapStateToProps, null)(Student);