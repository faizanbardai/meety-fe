import React, { Component } from "react";
import { Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { saveUser, saveAccessToken } from "../action";
import { api_refreshToken } from "../apis/users";

const mapDispatchToProps = (dispatch) => ({
  saveUser: (user) => dispatch(saveUser(user)),
  saveAccessToken: (accessToken) => dispatch(saveAccessToken(accessToken)),
});

class CBRetrun extends Component {
  render() {
    return localStorage.getItem("accessToken") ? (
      <Redirect to="/" />
    ) : (
      <div>Loading...</div>
    );
  }
  componentDidMount = async () => {
    const accessToken = this.props.match.params.accessToken;
    localStorage.setItem("accessToken", accessToken);
    const response = await api_refreshToken(accessToken);
    const userData = await response.json();
    this.props.saveAccessToken(userData.access_token);
    this.props.saveUser(userData.user);
  };
}
export default connect(null, mapDispatchToProps)(withRouter(CBRetrun));
