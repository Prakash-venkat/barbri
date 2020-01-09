import React, { Component } from "react";
import { Link } from "react-router-dom";

class NotFound extends Component {
  render() {
    return (
      <div className="not-found-segment">
        <div className="error">
          <div className="msedge-flex-center">
            <div className="container-fluid">
              <div className="col-xs-12 ground-color text-center">
                <div className="container-error-404">
                  <div className="clip">
                    <div className="shadow">
                      <span className="digit thirdDigit">4</span>
                    </div>
                  </div>
                  <div className="clip">
                    <div className="shadow">
                      <span className="digit secondDigit">0</span>
                    </div>
                  </div>
                  <div className="clip">
                    <div className="shadow">
                      <span className="digit firstDigit">4</span>
                    </div>
                  </div>
                  <div className="msg">
                    OH!<span className="triangle"></span>
                  </div>
                </div>
                <h2 className="h1">Sorry! Page not found</h2>
              </div>
              <div className="col-md-12 text-center mb-4 msedge-not-found-btn">
                <Link to={`/`}>
                  <button
                    type="button"
                    className="btn btn-outline-primary px-5"
                  >
                    Home
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NotFound;
