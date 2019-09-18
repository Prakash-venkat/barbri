import React from "react";
import {Route, Switch} from 'react-router-dom';


import Admin from './components/admin/DemoPages/Main'
import Students from "./components/student/DemoPages/Main";
import LawSchool from "./components/lawSchool/DemoPages/Main";

import Login from "./login/login"



function App() {
  return (
    <div className="App">
          <Route exact path={`/`} component={Login}/>
          <Route  path={`/admin`} component={Admin}/>
          <Route  path={`/students`} component={Students}/>
          <Route  path={`/law-school`} component={LawSchool}/>

    


    </div>
  );
}

export default App;
