import React, { Component } from 'react';
import Chart from 'react-apexcharts';
import { connect } from 'react-redux';

class Concurrent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [
        {
          name: 'series 1',
          data: [],
        }
      ],
      options: {
        chart: {
          height: 350,
          type: 'area',
        },
        annotations: {},
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'smooth',
        },
        xaxis: {
          type: 'datetime',
          min: new Date('6 Apr 2020').getTime(),
          tickAmount: 8,
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy HH:mm',
          },
        },
      },
    };
  }


  componentDidUpdate(prevProps) {
    console.log(this.props.concurrence);
    if (this.props.concurrence !== prevProps.concurrence) {
      this.setState({
        series: [
          {
            name: 'Concurrent Viewers',
            data: this.props.concurrence
          }
        ],
      });
    }
  }

  render() {
    return <Chart options={this.state.options} series={this.state.series} type={'area'} height={'450'} width={'100%'}/>;
  }
}

const mapStateToProps = (state) => ({
  viewers: state.viewers,
});

export default connect(mapStateToProps)(Concurrent);
