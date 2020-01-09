import React,{Component,Fragment} from 'react'
import { Row, Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

class Forbidden extends Component{
    render(){
        const style={
            textAlign: "center",
            textTransform: "uppercase",
            letterSpacing: "1px",
            marginTop:"10px"
        }
        return(
            <div className="msedge-admin-forbidden">
              <Fragment>

                <Row>
                  <div className="container-fluid bg-grey ptb-30" style={{padding:"200px 0"}}>
                    <Col md="12">
                      <div className="text-center">
                            <FontAwesomeIcon icon={faExclamationTriangle} size="4x"/>
                      </div>
                    </Col>

                    <Col md="12">
                        <h6 style={style}>Sorry! You are not allowed to access this page.</h6>
                    </Col>
                  </div>
                </Row>
              </Fragment>
            </div>
        )
    }
}

export default Forbidden