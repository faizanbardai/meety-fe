import React, { Component } from "react";
import Header from "../components/Header";
import BurgerMenu from "../components/BurgerMenu";
import { withRouter } from "react-router-dom";
import { api_getUserByID } from "../apis/users";
import CardWithOverlayText from "../components/CardWithOverlayText";
//import addhost from "../img/addhost.png";
//import arrowDown from "../img/arrow-down.png";

class Profile extends Component {
  state = {};
  render() {
    return this.state.user ? (
      <div>
        <BurgerMenu />
        <div id="main">
          <div className="main-section">
            <Header />
            <div className="section-info">
              <div className="card-profile">
                <div
                  className="avatar"
                  style={{ backgroundImage: `url(${this.state.user.picture})` }}
                ></div>
                <h1 className="profile-name">{this.state.user.name}</h1>
                <h1 className="followers-number">
                  {this.state.user.followers.length} followers
                </h1>
              </div>
              <div className="follow">
                <button className="button">Follow</button>
              </div>
            </div>
          </div>
          <div className="about-section" style={{ justifyContent: "center" }}>
            <div className="about-me">
              <h1>About me:</h1>
              <p>
                <span>{this.state.user.aboutMe}</span>
              </p>
            </div>
          </div>
          <div className="profile-events-section">
            <h1>Your next events:</h1>
            <div className="next-events">
              {this.state.user.events.map(event => (
                <CardWithOverlayText key={event._id} hotItem={event} />
              ))}
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div>Loading...</div>
    );
  }
  componentDidMount = async () => {
    const userIDParam = this.props.match.params._id;
    const userID =
      userIDParam === "me" ? "5e74cf7b4cd7f80af0e4476b" : userIDParam;
    try {
      const response = await api_getUserByID(
        localStorage.getItem("accessToken"),
        userID
      );
      const user = await response.json();
      this.setState({ user });
    } catch (error) {
      alert(error);
    }
  };
}

export default withRouter(Profile);
