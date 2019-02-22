import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class Alerts extends Component {
  static propTypes = {
    error: PropTypes.object.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error, message, alert } = this.props;
    if (error !== prevProps.error) {
      if (error.msg.name) alert.error(`Name: ${error.msg.name.join()}`);
      if (error.msg.price) alert.error(`Price: ${error.msg.name.join()}`);
      if (error.msg.price_date)
        alert.error(`Closing Date: ${error.msg.price_date.join()}`);
      if (error.msg.symbol) alert.error(`Symbol: ${error.msg.symbol.join()}`);
      if (error.msg.username)
        alert.error(`Username: ${error.msg.username.join()}`);
      if (error.msg.password)
        alert.error(`Password: ${error.msg.password.join()}`);
      if (error.msg.non_field_errors)
        alert.error(`Error: ${error.msg.non_field_errors.join()}`);
    }
    if (message != prevProps.message) {
      if (message.msg.deleteStock) alert.success(message.msg.deleteStock);
      if (message.msg.addStock) alert.success(message.msg.addStock);
      if (message.msg.passwordsNotMatch)
        alert.error(message.msg.passwordsNotMatch);
    }
  }

  render() {
    return <Fragment />;
  }
}

const mapStateToProps = state => ({
  error: state.errors,
  message: state.messages
});

export default connect(mapStateToProps)(withAlert()(Alerts));
