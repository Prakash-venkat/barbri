import React from 'react';

export default class FilterInputComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        filterValue: ""
      };
    }
  
    changeFilterValue(event) {
      const filterValue = event.target.value;
      const newState = {
        ...this.state,
        filterValue
      };
      
      this.setState(newState);
      this.props.onChange(newState.filterValue);
    }
  
    render() {
      return (
          <input
            onChange={e => this.changeFilterValue(e)}
            value={this.state.filterValue}
            aria-label={this.props.aria_label}
          />
      );
    }
  }