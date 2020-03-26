import React, { useState } from "react";
import { connect } from "react-redux";
import { api_login } from "../apis/users";
import { withRouter } from "react-router-dom";
import { saveUser, saveAccessToken } from "../action";
import Header from "../components/Header";

const mapDispatchToProps = dispatch => ({
  saveUser: user => dispatch(saveUser(user)),
  saveAccessToken: accessToken => dispatch(saveAccessToken(accessToken))
});

const Login = props => {
  const handleSubmit = async e => {
    e.preventDefault();
    const response = await api_login({ username, password });
    const userData = await response.json();
    localStorage.setItem("accessToken", userData.access_token);
    console.log("Hi");
    props.saveUser(userData.user);
    props.saveAccessToken(userData.access_token);
    props.history.push("/profile");
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      <Header />
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="abc@def.com"
          value={username}
          onChange={e => setUsername(e.target.value)}
        ></input>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <input type="submit" />
      </form>

      <a href={`${process.env.REACT_APP_BASE_SERVER_URL}auth/facebook`}>
        Login with Facebook
      </a>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(withRouter(Login));
