import React, { Component } from 'react'
class QuestionHead extends Component {
    constructor(props) {
        super(props);

        this.state = { messages: "", showAll: false }
    }
    componentWillReceiveProps(props) {
        this.setState({
            messages: props.data
        })
    }

    showMore = () => this.setState({ showAll: true });
    showLess = () => this.setState({ showAll: false });

    render() {
       
        const limit = 250;
        const { showAll } = this.state;
        if (this.state.messages != ' ') {
            if (this.state.messages.length <= limit) {
                return <p>{this.state.messages}</p>
            }
            if (showAll) {
                return <p onMouseUp={this.highlightSelection}>
                    {this.state.messages}
                    <a style={{ color: "#006EBD", paddingLeft: "5px" }} onClick={this.showLess}>Read less</a>
                </p>
            }
            const toShow = this.state.messages.substring(0, limit) + "...";
            return <p>
                {toShow}
                <a style={{ color: "#006EBD", paddingLeft: "5px" }} onClick={this.showMore}>Read more</a>
            </p>
        } else {
            return <p>{this.props.data}</p>
        }
    }
}

export default QuestionHead