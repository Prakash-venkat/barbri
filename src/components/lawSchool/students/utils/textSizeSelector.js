import React, { Component } from "react";
export default class TextSizeSelector extends Component {
state = {
  selectedRange: 0
}
handleChange = (e) => {
  this.setState(
    { selectedRange: e.target.value },
    () => this.props.getTextSizeValue(this.state.selectedRange)
  );
}
render() {
  return (<div>
    <input
      type="range"
      min="0"
      max="20"
      step="1"
      value={this.state.selectedRange}
      onChange={this.handleChange}
    />
  </div>);
}
}