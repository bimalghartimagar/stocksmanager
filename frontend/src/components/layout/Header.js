import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
export class Header extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
  };
  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <ul className="navbar-nav px-3">
        <span className="navbar-text mr-3">
          <strong>{user ? `Namaste ${user.username}` : ""}</strong>
        </span>
        <li className="nav-item">
          <button
            type="button"
            className="btn btn-link text-light"
            onClick={this.props.logout}
          >
            Logout
          </button>
        </li>
      </ul>
    );
    const guestLinks = (
      <ul className="navbar-nav px-3">
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/signup">
            Sign Up
          </Link>
        </li>
      </ul>
    );
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <a className="navbar-brand" href="#">
              Stocks Manager
            </a>
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0" />

            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.authReducer
});

export default connect(
  mapStateToProps,
  { logout }
)(Header);
