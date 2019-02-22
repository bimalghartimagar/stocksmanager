import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { signup } from "../../actions/auth";
import { createMessage } from "../../actions/messages";
export class Signup extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    password2: ""
  };

  static propTypes = {
    signup: PropTypes.func.isRequired,
    createMessage: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    const { username, email, password, password2 } = this.state;
    if (password !== password2) {
      this.props.createMessage({
        passwordsNotMatch: "Passwords do not match."
      });
    } else {
      const newUser = { username, password, email };
      this.props.signup(newUser);
    }
    // this.props.login(this.state.username, this.state.password);
    this.setState({ username: "", email: "", password: "", password2: "" });
  };

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }

    const { username, email, password, password2 } = this.state;

    return (
      <div className="col-md-8 m-auto">
        <div className="card mt-5">
          <h3 className="card-header">Signup Form</h3>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label col-form-label-sm">
                  Username
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={this.onChange}
                    className="form-control form-control-sm"
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label col-form-label-sm">
                  Email
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    className="form-control form-control-sm"
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label col-form-label-sm">
                  Password
                </label>
                <div className="col-sm-10">
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={this.onChange}
                    className="form-control form-control-sm"
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label col-form-label-sm">
                  Confirm Password
                </label>
                <div className="col-sm-10">
                  <input
                    type="password"
                    name="password2"
                    value={password2}
                    onChange={this.onChange}
                    className="form-control form-control-sm"
                  />
                </div>
              </div>
              <button className="btn btn-success">Signup</button>
            </form>
            <div className="mt-4">
              Already have an account? <Link to="/login">Login</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  isAuthenticated: state.authReducer.isAuthenticated
});
export default connect(
  mapStateToProps,
  { signup, createMessage }
)(Signup);
