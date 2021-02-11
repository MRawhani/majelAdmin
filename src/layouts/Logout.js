import React, { Component } from "react";
import { connect } from "react-redux";
import { logout } from "../actions";

class Logout extends Component {
  componentDidMount() {
    this.props.logout();
    this.props.history.push("/home");
  }
  render() {
    return null;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  logout
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
