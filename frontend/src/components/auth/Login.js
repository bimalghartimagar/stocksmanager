import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";

export class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  static propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    // const { username, password } = this.state;
    // const user = { username, password };
    this.props.login(this.state.username, this.state.password);
  };

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    const { username, password } = this.state;

    return (
      <div className="col-md-8 m-auto">
        <div className="card mt-5">
          <h3 className="card-header">Login Form</h3>
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

              <button className="btn btn-success">Login</button>
            </form>
            <div className="mt-4">
              Don't have an account? <Link to="/signup">Sign Up</Link>
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
  { login }
)(Login);
