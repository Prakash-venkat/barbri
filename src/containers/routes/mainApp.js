import React, {Component,Fragment,Suspense} from 'react'
import { connect } from "react-redux";
import cx from "classnames";
import { withRouter } from "react-router-dom";

import ResizeDetector from "react-resize-detector";
import Loading from '../../components/admin/loading';

import AppMain from './routePaths';

class MainApp extends Component{
    constructor(props) {
        super(props);
        this.state = {
          closedSmallerSidebar: false,
          fontSize: null
        };
      }
      
    
      static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.studentStyles.fontSize !== prevState.fontSize) {
          document.querySelector(
            "html"
          ).style.fontSize = `${nextProps.studentStyles.fontSize}%`;
          return { fontSize: nextProps.studentStyles.fontSize };
        }
      }
    render(){
        let {
            colorScheme,
            enableFixedHeader,
            enableFixedSidebar,
            enableFixedFooter,
            enableClosedSidebar,
            closedSmallerSidebar,
            enableMobileMenu,
            enablePageTabsAlt
          } = this.props;
        return(
           

            <ResizeDetector
              handleWidth
              render={({ width }) => (
                <Fragment>
                  <div
                    className={cx(
                      "msedge-container msedge-bg-" + colorScheme,
                      { "msedge-fixed-header": enableFixedHeader },
                      { "msedge-fixed-sidebar": enableFixedSidebar || width < 1250 },
                      { "msedge-fixed-footer": enableFixedFooter },
                      // { "closed-sidebar": enableClosedSidebar || width < 1250 },
                      {
                        "closed-sidebar-mobile": closedSmallerSidebar || width < 1250
                      },
                      { "sidebar-mobile-open": enableMobileMenu },
                      { "msedge-tab-shadow": enablePageTabsAlt }
                    )}
                  >
                    <AppMain {...this.props}/>
      
                  </div>
                </Fragment>
      
              )}
            />
          
        )
    }
}
const mapStateToProp = state => ({
    colorScheme: state.options.colorScheme,
    enableFixedHeader: state.options.enableFixedHeader,
    enableMobileMenu: state.options.enableMobileMenu,
    enableFixedFooter: state.options.enableFixedFooter,
    enableFixedSidebar: state.options.enableFixedSidebar,
    enableClosedSidebar: state.options.enableClosedSidebar,
    enablePageTabsAlt: state.options.enablePageTabsAlt,
    studentStyles: state.main
  });
  
  export default withRouter(connect(mapStateToProp)(MainApp));