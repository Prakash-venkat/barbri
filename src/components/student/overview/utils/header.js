import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHome

} from '@fortawesome/free-solid-svg-icons';

export class Header extends Component {
    render() {

        return (
            <div className="row header-wrapp">
                <div className="col-md-6 col-xs-12 left-section">
                    <h3 className="head-text">{this.props.header}</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                </div>
                <div className="col-md-6 col-xs-12 right-section">
                    <p>{this.props.subheader}</p>
                    <span>/</span>
                    <a><FontAwesomeIcon icon={faHome} /></a>
                </div>
            </div>
        )
    }
}

export default Header
