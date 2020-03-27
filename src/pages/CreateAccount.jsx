import React, { useState } from "react";
import { connect } from "react-redux";
import { api_createAccount } from "../apis/users";
import { withRouter } from "react-router-dom";
import { saveUser, saveAccessToken } from "../action";
import Header from "../components/Header";
import BurgerMenu from "../components/BurgerMenu";

const mapDispatchToProps = dispatch => ({
  saveUser: user => dispatch(saveUser(user)),
  saveAccessToken: accessToken => dispatch(saveAccessToken(accessToken))
});

const CreateAccount = props => {
  const handleSubmit = async e => {
    e.preventDefault();
    const response = await api_createAccount({
      name,
      username,
      password,
      picture,
      aboutMe
    });
    const userData = await response.json();
    localStorage.setItem("accessToken", userData.access_token);
    props.saveAccessToken(userData.access_token);
    props.saveUser(userData.user);
    props.history.push("/profile");
  };

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [picture, setPicture] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  return (
    <>
      <BurgerMenu />
      <div id="main">
        <div className="main-section heading-size">
          <Header />
        </div>
        <h1>Register Here</h1>
      </div>
      <div class="second-section">
        <form id="create-event" action="" onSubmit={handleSubmit}>
          <label for="Name">Name</label>
          <div>
            <input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <label for="Email">User Email</label>
          <div>
            <input
              type="email"
              placeholder="abc@def.com"
              value={username}
              onChange={e => setUsername(e.target.value)}
            ></input>
          </div>
          <label for="password">Password</label>
          <div>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          {/* <input type="submit" /> */}

          <label for="pic">Avatar</label>
          <div id="upload">
            <input
              id="input-file"
              type="file"
              name="profile-pic"
              onChange={e => setPicture(e.target.value)}
            />
          </div>
          <label for="about-you">About you</label>
          <div>
            <textarea
              name="about-you"
              id=""
              cols="50"
              rows="10"
              placeholder="Let your attendees know what to expect.including the agenda, what they need to bring and how to find the group."
              onChange={e => setAboutMe(e.target.value)}
            ></textarea>
          </div>
          <br />
          <br />
          <div>
            <a
              href={`${process.env.REACT_APP_BASE_SERVER_URL}auth/facebook`}
              class="fb connect"
            >
              Sign in with Facebook
            </a>
            <br />
            <br />
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <div class="foot">
            <div class="cancel">
              <button class="button-empty">Go back</button>
            </div>
            <div class="preview-publish">
              <button class="button" type="submit">
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default connect(null, mapDispatchToProps)(withRouter(CreateAccount));
