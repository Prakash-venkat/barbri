import React, { Component, Suspense } from "react";
import { Route, Switch } from 'react-router-dom';
import swal from "sweetalert";
import RecoverPassword from "./landingPages/recoverPassword/recoverPassword"
import Signup from "./landingPages/signup/signup"
import SetPassword from './landingPages/setPassword/setPassword'
import Loading from './components/admin/loading';
import { ProtectedRoute } from './landingPages/protectedRoutes/index';
import Test from './test';
import { LOGOUT_TIME, WARNING_TIME, HASH_HISTORY } from './actions/constants';
import {language} from './utils/locale/locale'


import Login from './landingPages/login/login';
import Admin from './containers/routes/mainApp';
import Students from './containers/routes/mainApp';
import LawSchool from './containers/routes/mainApp';
import ProofReader from './containers/routes/mainApp';
import NotFound from './landingPages/notFound/index';
import ErrorPage from './landingPages/errorPage/index';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorDetails: '' };
    this.events = [
      "load",
      "mousemove",
      "mousedown",
      "click",
      "scroll",
      "keypress"
    ];
    for (var i in this.events) {
      window.addEventListener(this.events[i], this.resetTimeout);
    }

    this.setTimeout();
  }
  

  clearTimeout = () => {
    if (this.warnTimeout) clearTimeout(this.warnTimeout);

    if (this.logoutTimeout) clearTimeout(this.logoutTimeout);
  }

  setTimeout = () => {
    this.warnTimeout = setTimeout(this.warn, WARNING_TIME);

    this.logoutTimeout = setTimeout(this.logout, LOGOUT_TIME);
  }

  resetTimeout = () => {
    this.clearTimeout();
    this.setTimeout();
  }
 
  

  warn = () => {
    alert(language.sessionWarning);
  }
  logout = () => {
    localStorage.clear()
    sessionStorage.clear()
    HASH_HISTORY.push('/')
    swal("", language.sessionTimedout, "warning")
  }

  destroy = () => {
    this.clearTimeout();

    for (var i in this.events) {
      window.removeEventListener(this.events[i], this.resetTimeout);
    }
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error,errorInfo){
    this.setState({errorDetails: error})
  }
  
  render() {

    if (this.state.hasError) {

      return (
        <div>
          
            <Switch>
              {/* <Route path="*" component={ErrorPage} isAuthed={true}/> */}
              <Route
              path='*'
              render={(props) => <ErrorPage {...props} errorDetails={this.state.errorDetails} />}
            />
            </Switch>
        

        </div>
      )
    }
    return (
      <div className="App">
      
          <Switch>
            <Route exact path={'/'} component={Login} />
            <Route path={`/need-account`} component={Signup} />
            <Route path={`/recover-password`} component={RecoverPassword} />
            <Route path={`/set-password`} component={SetPassword} />
            <ProtectedRoute path={`/admin`} component={Admin} />
            <ProtectedRoute path={`/students`} component={Students} />
            <ProtectedRoute path={`/law-school`} component={LawSchool} />
            <ProtectedRoute path={`/proof-reader`} component={ProofReader} />
            <Route path="/test" component={Test} />
            <Route path="*" component={NotFound} />
          </Switch>
       
      </div>
    );
  }
}

export default App;
