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
              {/* Showing the Follow button only for guest profiles */}
              {this.state.user._id !== this.props.loggedInUser._id ? (
                <div className="follow">
                  <button className="button">Follow</button>
                </div>
              ) : null}
            </div>
          </div>
          <div className="about-section" style={{ justifyContent: "center" }}>
            <div className="about-me">
              {/* About Me ===> Logged in user */}
              {/* About Guest's name ===> Guest user */}
              {this.state.user._id !== this.props.loggedInUser._id ? (
                <h1>About {this.state.user.name}:</h1>
              ) : (
                <h1>About me:</h1>
              )}
              <p>
                <span>{this.state.user.aboutMe}</span>
              </p>
            </div>
          </div>
          <div className="profile-events-section">
            <h1>Next events:</h1>
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
    // "/me": Setting user as logged in user
    if (userIDParam === "me") {
      this.setState({ user: this.props.loggedInUser });
    } else {
      try {
        const response = await api_getUserByID(
          localStorage.getItem("accessToken"),
          userIDParam
        );
        const user = await response.json();
        // "/:_id": Setting user as guest user
        this.setState({ user });
      } catch (error) {
        alert(error);
      }
    }
  };
}

export default withRouter(Profile);
