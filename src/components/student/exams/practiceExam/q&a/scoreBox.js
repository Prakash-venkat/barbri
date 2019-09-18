import React, { Component } from 'react'

export class ScoreBox extends Component {
    render() {
        return (
            <div className="score">
            <p>Score: {this.props.score} right answers out of {this.props.quizlength} possible.</p>
        </div>
        )
    }
}

export default ScoreBox
