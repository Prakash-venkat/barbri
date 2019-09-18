import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import React, {Suspense, lazy, Fragment} from 'react';
import Loader from 'react-loaders'

import {
    ToastContainer,
} from 'react-toastify';


const Home = lazy(() => import('../../index'));



const AppMain = () => {

    return (
        <Fragment>
            {/* Practice  */}
            <Suspense fallback={
                <div className="customize-loader-container">
                    <div className="customize-loader-container-inner">
                        <div className="text-left">
                            {/* <Loader type="ball-pulse-rise"/> */}
                            <div class="lds-ring">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                        <h6 className="mt-5">
                            Loading...<br/>Please Wait.
                            {/* <small>Because this is a demonstration we load at once all the Components examples. This wouldn't happen in a real live app!</small> */}
                        </h6>
                    </div>
                </div>
            }>
                <Route path="/students" component={Home}/>
            </Suspense>

           

            <Route exact path="/" render={() => (
                <Redirect to="/students"/>
            )}/>
            <ToastContainer/>
        </Fragment>
    )
};

export default AppMain;