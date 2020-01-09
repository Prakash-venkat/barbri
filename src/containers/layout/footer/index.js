import React, { Fragment } from "react";

class AppFooter extends React.Component {
  render() {
    return (
      <Fragment>
        <div className="msedge-footer">
          <div className="msedge-footer-inner">
            <div className="msedge-footer-left">
             
              <p></p>
            </div>
            <div className="msedge-footer-right">
            <p className="msedge-footer-content">
                &copy; 2020 barbri inc. All Rights Reserved.
              </p>
              </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default AppFooter;
