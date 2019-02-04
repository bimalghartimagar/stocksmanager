import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { addStock } from "../../actions/stocks";

export class Form extends Component {
  state = {
    name: "",
    symbol: "",
    price: "",
    price_date: ""
  };

  static propTypes = {
    addStock: PropTypes.func.isRequired
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    const { name, symbol, price, price_date } = this.state;
    const stock = { name, symbol, price, price_date };
    this.props.addStock(stock);
    this.setState({ name: "", symbol: "", price: "", price_date: "" });
  };

  render() {
    const { name, symbol, price, price_date } = this.state;

    return (
      <div className="card mb-3">
        <h3 className="card-header">Add Stocks Form</h3>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label col-form-label-sm">
                Name
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={this.onChange}
                  className="form-control form-control-sm"
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label col-form-label-sm">
                Symbol
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  name="symbol"
                  value={symbol}
                  onChange={this.onChange}
                  className="form-control form-control-sm"
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label col-form-label-sm">
                Price
              </label>
              <div className="col-sm-10">
                <input
                  type="number"
                  name="price"
                  value={price}
                  onChange={this.onChange}
                  className="form-control form-control-sm"
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label col-form-label-sm">
                Closing Date
              </label>
              <div className="col-sm-10">
                <input
                  type="date"
                  name="price_date"
                  value={price_date}
                  onChange={this.onChange}
                  className="form-control form-control-sm"
                />
              </div>
            </div>
            <button className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { addStock }
)(Form);
