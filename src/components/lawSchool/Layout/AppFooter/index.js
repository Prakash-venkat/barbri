import React, {Fragment} from 'react';
import MegaMenuFooter from './Components/FooterMegaMenu';
import FooterDots from './Components/FooterDots';

class AppFooter extends React.Component {
    render() {


        return (
            <Fragment>
                <div className="app-footer">
                    <div className="app-footer__inner">
                        <div className="app-footer-left">
                            {/* <FooterDots/> */}
                            <p className="footer-style">&copy; 2019 barbriinc.All Rights Reserved.</p>
                        </div>
                        <div className="app-footer-right">
                            {/* <MegaMenuFooter/> */}
                        </div>
                    </div>
                </div>
            </Fragment>
        )}
}

export default AppFooter;