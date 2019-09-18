import React, {Component, Fragment} from 'react'
import Loader from 'react-loaders'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
    Row, Col,
    Card, CardBody,
    CardTitle, Container
} from 'reactstrap';

export class ComingSoon extends Component {
    render() {
        return (
            <Fragment>
                <ReactCSSTransitionGroup
                    component="div"
                    transitionName="TabsAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <Container fluid>
                        <Row>
                            <Col md="12">
                                <div className="coming-soon">
                                 <div>
                                 <h6>Coming Soon ....</h6>
                                 </div>
                                    <div className="coming-soon-design">
                                            <div
                                                className="loader-wrapper d-flex justify-content-center align-items-center">
                                                <Loader type="square-spin"/>
                                            </div>
                                           
                                        </div>
                                        
                                    
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </ReactCSSTransitionGroup>
            </Fragment>
        )
    }
}

export default ComingSoon
