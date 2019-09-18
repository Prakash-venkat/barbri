import React, { Component } from 'react';
import Chart from 'react-apexcharts'

class RadialBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      options: {
        labels: ['160 answered out of 200'],
        plotOptions: {
          radialBar: {
              hollow: {
                  size: '50%',
              }
          },
        },
       
        colors: ["#0e6aae"]
      },
      series: [68],
    }
  }

  render() {

    return (
      <div className="radialbar border">
        <Chart options={this.state.options} series={this.state.series} type="radialBar"  height="300" />
      </div>
      
    );
  }
}

export default RadialBar;
