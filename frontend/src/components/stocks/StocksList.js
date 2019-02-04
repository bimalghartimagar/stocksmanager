import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getStocks, deleteStock } from "../../actions/stocks";

export class StocksList extends Component {
  static propTypes = {
    stocks: PropTypes.array.isRequired,
    getStocks: PropTypes.func.isRequired,
    deleteStock: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getStocks();
  }

  render() {
    return (
      <Fragment>
        <h2>Stocks List</h2>
        <table className="table table-striped table-sm table-responsive">
          <thead>
            <tr className="table-active">
              <th>ID</th>
              <th>Name</th>
              <th>Symbol</th>
              <th>Price</th>
              <th>Closing Date</th>
              <th>Created At</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.props.stocks.map(stock => (
              <tr key={stock.id}>
                <td>{stock.id}</td>
                <td>{stock.name}</td>
                <td>{stock.symbol}</td>
                <td>{stock.price}</td>
                <td>{stock.price_date}</td>
                <td>{stock.created_at}</td>
                <td>
                  <button
                    onClick={this.props.deleteStock.bind(this, stock.id)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  stocks: state.stocksReducer.stocks
});

export default connect(
  mapStateToProps,
  { getStocks, deleteStock }
)(StocksList);
