import React, { useState } from "react";
import { connect } from "react-redux";
import { api_login } from "../apis/users";
import { withRouter, Link } from "react-router-dom";
import { saveUser, saveAccessToken, addEventID } from "../action";
//import Header from "../components/Header";

const mapStateToProps = (state) => ({ ...state });
const mapDispatchToProps = (dispatch) => ({
  saveUser: (user) => dispatch(saveUser(user)),
  saveAccessToken: (accessToken) => dispatch(saveAccessToken(accessToken)),
  addEventID: (_id) => dispatch(addEventID(_id)),
});

const Login = (props) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await api_login({ username, password });
    const userData = await response.json();
    localStorage.setItem("accessToken", userData.access_token);
    props.saveUser(userData.user);
    props.saveAccessToken(userData.access_token);
    if (props.eventID) {
      const eventID = props.eventID;
      props.addEventID(null);
      props.history.push("/event/" + eventID);
    } else {
      props.history.push("/profile/" + userData.user._id);
    }
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="container bg-light rounded py-5">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
          />
        </div>
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <div className="ml-2">
            <Link className="text-white" to="/create-account">
              Don't have an account? Sign Up
            </Link>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <a
            href={`${process.env.REACT_APP_BASE_SERVER_URL}auth/facebook`}
            className="text-white fb connect mt-2"
          >
            Continue with Facebook
          </a>
        </div>
      </form>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
