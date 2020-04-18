import React, { Component } from 'react';
import Chart from 'react-apexcharts';
import { connect } from 'react-redux';

class BandWidth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [
        {
          name: 'series 1',
          data: [],
        },
        {
          name: 'series 1',
          data: [],
        },
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
          min: new Date('12 Apr 2020').getTime(),
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

  convertData = (input) => {
    let convertedData = [];
    if (Array.isArray(input)) {
      for (let data of input) {
        data[1] = (data[1] / 1000000000).toFixed(2);
        convertedData.push(data);
      }
      return convertedData;
    }
    return (input/1000000000).toFixed(2)
    
  };

  componentDidUpdate(prevProps) {
    if (this.props.cdn !== prevProps.cdn || this.props.p2p !== prevProps.p2p) {
      this.setState({
        series: [
          {
            name: 'CDN',
            data: this.convertData(this.props.cdn),
          },
          {
            name: 'P2P',
            data: this.convertData(this.props.p2p),
          },
        ],
      });
    }
    if (
      this.props.maxSum !== prevProps.maxSum ||
      this.props.maxCdn !== prevProps.maxCdn
    ) {
      var options = { ...this.state.options };
      console.log(this.convertData(this.props.maxSum));
      options.annotations = {
        yaxis: [
          {
            y: this.convertData(this.props.maxSum),
            borderColor: '#00E396',
            label: {
              borderColor: '#00E396',
              style: {
                color: '#fff',
                background: '#00E396',
              },
              text: `Maximum throughput : ${this.convertData(this.props.maxSum)}`,
            },
          },
          {
            y: this.convertData(this.props.maxCdn),
            borderColor: '#26a0fc',
            label: {
              borderColor: '#26a0fc',
              style: {
                color: '#fff',
                background: '#26a0fc',
              },
              text: `Maximum CDN contribution : ${this.convertData(this.props.maxCdn)}`,
            },
          }
        ],
      };
      this.setState({options});
    }
  }

  render() {
    return <Chart options={this.state.options} series={this.state.series} type={'area'} height={'450'} width={'100%'}/>;
  }
}

const mapStateToProps = (state) => ({
  chart: state.chart,
});

export default connect(mapStateToProps)(BandWidth);
