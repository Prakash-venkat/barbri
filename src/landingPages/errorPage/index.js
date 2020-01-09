import React, { Component } from 'react'
import { HASH_HISTORY } from '../../actions/constants'
import axios from 'axios'
import moment from "moment";
import {BASE} from '../../actions/constants'


const getSession=(moduleName)=>{ //Get user session
    return localStorage.getItem(moduleName) ? JSON.parse(localStorage.getItem(moduleName)) : JSON.parse(sessionStorage.getItem(moduleName));
  }

class ErrorPage extends Component {
    constructor(props){
        super(props);
        this.state={
            userEmail: '',
            todayDate: new Date(),
        }
    }

    pusToMain = () =>{ //Move to the home page
       const check =  this.props.match.url.split("/")
       HASH_HISTORY.push(`/${check[1]}`)
       location.reload()
    }


    componentWillReceiveProps(nextProps, nextState){

        let mainPath = this.props.location.pathname;
        let moduleName = mainPath.split('/')[1]
        var sessionDetails;
        switch(moduleName){
            case 'admin':
               sessionDetails = getSession("AdminSession").userPrimaryEmail
                break;
            case 'law-school':
                sessionDetails = getSession("LawSchoolSession").userPrimaryEmail
                break;
            case 'students':
                sessionDetails = getSession("StudentSession").userPrimaryEmail
                break;
            case 'proof-reader':
                sessionDetails = getSession("ProofReaderSession").userPrimaryEmail
        }
        let errorDetails = {
            "errorLogDescription": nextProps.errorDetails.message,            
            "errorLogScreen": nextProps.location.pathname,
            "errorLogUser": sessionDetails ? sessionDetails : null,
            "errorLogModuleName":moduleName
        }

        axios.post(`${BASE}/logs/error`, errorDetails)
    }
    
    render() {
        return (
            <div class="message">
	<h1>Oops..!</h1>
	<h6>Something went wrong. Kindly contact our administrator</h6>
	<button onClick={this.pusToMain}>Home</button>
</div>
        )
    }
}

export default ErrorPage
