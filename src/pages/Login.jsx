import React, { useState } from "react";
import { connect } from "react-redux";
import { api_login } from "../apis/users";
import { withRouter } from "react-router-dom";
import { saveUser, saveAccessToken, addEventID } from "../action";
import BurgerMenu from "../components/BurgerMenu";
import Header from "../components/Header";
import { Container, Row, Col, Image } from "react-bootstrap";
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
      props.history.push("/profile");
    }
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <Container>
      <BurgerMenu />
      <div id="main">
        <div className="main-section heading-size">
          <Header />
          <h1>Login Page</h1>
        </div>
      </div>
      <div className="second-section">
        <Row>
          <Col className="d-none d-md-block" md={6}>
            <Image
              src="https://images.unsplash.com/photo-1554415707-c1426270e0da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
              fluid
            />
          </Col>
          <Col md={6}>
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
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
