import React, { Component } from 'react'

export class Loader extends Component {
    render() {
        return (
                <div className="customize-loader-container">
                    <div className="customize-loader-container-inner">
                        <div className="text-left">
                            <div class="lds-ring">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                        <h6 className="mt-5">
                            Loading...<br/>Please Wait.
                        </h6>
                    </div>
                </div>
        )
    }
}

export default Loader
