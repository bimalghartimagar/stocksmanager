import React, { Component } from "react";
import Chart from "react-apexcharts";
import { getStocks } from "../../actions/stocks";
import PropTypes from "prop-types";
import { connect } from "react-redux";
export class LineGraph extends Component {
  state = {
    options: {
      chart: {
        stacked: false,
        zoom: {
          type: "x",
          enabled: true
        },
        toolbar: {
          autoSelected: "zoom"
        }
      },
      plotOptions: {
        line: {
          curve: "smooth"
        }
      },
      dataLabels: {
        enabled: false
      },

      markers: {
        size: 0,
        style: "full"
      },
      //colors: ['#0165fc'],
      title: {
        text: "Stock Price Movement",
        align: "left"
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 90, 100]
        }
      },
      yaxis: {
        min: 510,
        max: 830,
        labels: {
          formatter: function(val) {
            return (val / 1).toFixed(0);
          }
        },
        title: {
          text: "Price"
        }
      },
      xaxis: {
        type: "datetime"
      },

      tooltip: {
        shared: false,
        y: {
          formatter: function(val) {
            return (val / 1).toFixed(0);
          }
        }
      }
    }
  };
  static propTypes = {
    series: PropTypes.array.isRequired,
    getStocks: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getStocks();
  }

  render() {
    return (
      <div>
        <Chart
          options={this.state.options}
          series={this.props.series}
          type="area"
          height="350"
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  series: [
    {
      name: "AKJCL",
      data: state.stocksReducer.stocks.map(m => {
        return [
          (m["ts"] = Date.UTC(
            m["price_date"].split("-")[0],
            m["price_date"].split("-")[1],
            m["price_date"].split("-")[2]
          )),
          m["price"]
        ];
      })
    }
  ]
});

export default connect(
  mapStateToProps,
  { getStocks }
)(LineGraph);
