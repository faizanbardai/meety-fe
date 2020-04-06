import React, { useState } from "react";
import { connect } from "react-redux";
import { api_login } from "../apis/users";
import { withRouter } from "react-router-dom";
import { saveUser, saveAccessToken } from "../action";
import BurgerMenu from "../components/BurgerMenu";
import Header from "../components/Header";
//import Header from "../components/Header";

const mapDispatchToProps = (dispatch) => ({
  saveUser: (user) => dispatch(saveUser(user)),
  saveAccessToken: (accessToken) => dispatch(saveAccessToken(accessToken)),
});

const Login = (props) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await api_login({ username, password });
    const userData = await response.json();
    localStorage.setItem("accessToken", userData.access_token);
    props.saveUser(userData.user);
    props.saveAccessToken(userData.access_token);
    props.history.push("/profile");
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <BurgerMenu />
      <div id="main">
        <div className="main-section heading-size">
          <Header />
        </div>
        <h1>Login Page</h1>
      </div>
      <div className="second-section">
        <form id="create-event" onSubmit={handleSubmit}>
          <label htmlFor="username">User Name</label>
          <div>
            <input
              type="email"
              placeholder="abc@def.com"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
            ></input>
          </div>
          <label htmlFor="password">Password</label>
          <div>
            <input
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <a
              href={`${process.env.REACT_APP_BASE_SERVER_URL}auth/facebook`}
              class="fb connect"
            >
              Sign in with Facebook
            </a>
            <br />
            <br />
            {/* <a href={`${process.env.REACT_APP_BASE_SERVER_URL}auth/facebook`}>
              Login with Facebook
            </a> */}
          </div>

          <div className="preview-publish">
            <button className="button" type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default connect(null, mapDispatchToProps)(withRouter(Login));
