import React, { Component } from "react";
import { connect } from "react-redux";
import { api_getUserByID } from "../apis/users";
import CardWithOverlayText from "../components/CardWithOverlayText";

const mapStateToProps = (state) => ({ ...state });

class Profile extends Component {
  state = {};
  render() {
    return this.state.user ? (
      <div className="container">
        <div className="main-section">
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
        <h1>Your next events:</h1>
        <div className="row">
          {this.state.user.events.map((event) => (
            <div className="col-12 col-sm-6 col-md-4 mb-3">
              <CardWithOverlayText key={event._id} event={event} />
            </div>
          ))}
        </div>
      </div>
    ) : (
      <div>Loading...</div>
    );
  }
  componentDidMount = async () => {
    try {
      const response = await api_getUserByID(
        localStorage.getItem("accessToken"),
        this.props.user._id
      );
      const user = await response.json();
      this.setState({ user });
    } catch (error) {
      alert(error);
    }
  };
}

export default connect(mapStateToProps, null)(Profile);
