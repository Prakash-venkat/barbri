import React, { Component } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {

    faSortAlphaDownAlt,
    faSortAlphaUp,
    faSortNumericDownAlt,
    faSortNumericUp


} from "@fortawesome/free-solid-svg-icons";

export class isSortingIcon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSorting: false
        }
    }
    changeIcon = () => {
        const { isSorting } = this.state;
        if (isSorting === true) {
            this.setState({ isSorting: false })
        } else if (isSorting === false) {
            this.setState({ isSorting: true })
        }
    }
    render() {
        return (

            // <a href="#0" class="button">Button</a>
            <button onClick={this.changeIcon} tabIndex="0" className="header-button-style"><span className="text-capitalizes admin-list-word-wrap">{this.props.dataList} </span>{this.props.sort === true ? this.props.number === true ? this.state.isSorting === false ? <FontAwesomeIcon icon={faSortNumericDownAlt} /> : <FontAwesomeIcon icon={faSortNumericUp} /> : this.state.isSorting === false ? <FontAwesomeIcon icon={faSortAlphaDownAlt} /> : <FontAwesomeIcon icon={faSortAlphaUp} /> : ''}</button>


        )
    }
}
<div>

</div>
export default isSortingIcon


