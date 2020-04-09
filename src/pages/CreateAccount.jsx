import React, { useState } from "react";
import { connect } from "react-redux";
import { api_createAccount, api_updateUserImage } from "../apis/users";
import { withRouter, Link } from "react-router-dom";
import { saveUser, saveAccessToken } from "../action";

const mapDispatchToProps = (dispatch) => ({
  saveUser: (user) => dispatch(saveUser(user)),
  saveAccessToken: (accessToken) => dispatch(saveAccessToken(accessToken)),
});

const CreateAccount = (props) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    let userData = await api_createAccount({
      name,
      username,
      password,
      aboutMe,
    });
    switch (userData.status) {
      case 200:
        // OK
        if (picture) {
          userData = await userData.json();
          const data = new FormData();
          data.append("picture", picture);
          let userWithPicture = await api_updateUserImage(
            userData.access_token,
            data
          );
          switch (userWithPicture.status) {
            case 200:
              // OK
              userWithPicture = await userWithPicture.json();
              localStorage.setItem("accessToken", userData.access_token);
              props.saveAccessToken(userData.access_token);
              props.saveUser(userWithPicture);
              props.history.push("/profile");
              break;
            default:
              alert("Some error when saving user picture");
          }
        } else {
          userData = await userData.json();
          localStorage.setItem("accessToken", userData.access_token);
          props.saveAccessToken(userData.access_token);
          props.saveUser(userData.user);
          props.history.push("/profile");
        }
        break;
      case 401:
        // unauthorized
        alert("You are unauthorized");
        break;
      default:
        alert("Some error");
    }
  };

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [picture, setPicture] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  return (
    <div className="container bg-dark rounded text-white py-5">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label for="exampleInputEmail1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter name"
          />
        </div>
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
        <div class="form-group">
          <label for="exampleFormControlFile1">Avatar</label>
          <input
            type="file"
            onChange={(e) => setPicture(e.target.files[0])}
            class="form-control-file"
            id="exampleFormControlFile1"
          />
        </div>
        <div class="form-group">
          <label for="exampleFormControlTextarea1">About you</label>
          <textarea
            class="form-control"
            value={aboutMe}
            placeholder="Tell us a little about yourself."
            onChange={(e) => setAboutMe(e.target.value)}
            id="exampleFormControlTextarea1"
            rows="3"
          ></textarea>
        </div>
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <div className="ml-2">
            <Link className="text-white" to="/login">
              Already have an account? Sign In
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

export default connect(null, mapDispatchToProps)(withRouter(CreateAccount));
