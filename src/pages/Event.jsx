import React, { Component } from "react";
import { connect } from "react-redux";
import {
  api_getEventByID,
  api_joinEvent,
  api_leaveEvent,
} from "../apis/events";
import { api_followers, api_unfollow } from "../apis/users";
import BurgerMenu from "../components/BurgerMenu";
import Header from "../components/Header";
import CardWithOverlayText from "../components/CardWithOverlayText";
import { withRouter, Link } from "react-router-dom";
import MiniProfileCard from "../components/MiniProfileCard";
import Share from "../components/Share";
import Moment from "react-moment";
import { followHost, unFollowHost, addEventID } from "../action";

const mapStateToProps = (state) => ({ ...state });
const mapDispatchToProps = (dispatch) => ({
  followHost: (_id) => dispatch(followHost(_id)),
  unFollowHost: (_id) => dispatch(unFollowHost(_id)),
  addEventID: (_id) => dispatch(addEventID(_id)),
});

class Event extends Component {
  state = {
    participants: "",
    followers: "",
  };
  handleJoinButton = async () => {
    if (!this.props.user) {
      const eventID = this.props.match.params._id;
      this.props.addEventID(eventID);
      this.props.history.push("/login");
    } else {
      try {
        const accessToken = this.props.accessToken;
        const response = await api_joinEvent(accessToken, this.state.event._id);
        if (response.ok) {
          const event = await response.json();
          this.setState({ event });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  handleLeaveButton = async () => {
    try {
      const accessToken = this.props.accessToken;
      const response = await api_leaveEvent(accessToken, this.state.event._id);
      if (response.ok) {
        const event = await response.json();
        this.setState({ event });
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleFollowButton = async () => {
    try {
      const accessToken = this.props.accessToken;
      const res = await api_followers(
        accessToken,
        this.state.event.hosts[0]._id
      );
      if (res.ok) {
        this.props.followHost(this.state.event.hosts[0]._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleUnFollowButton = async () => {
    try {
      const accessToken = this.props.accessToken;
      const res = await api_unfollow(
        accessToken,
        this.state.event.hosts[0]._id
      );
      if (res.ok) {
        this.props.unFollowHost(this.state.event.hosts[0]._id);
      }
    } catch (error) {
      console.log(error);
    }
  };
  state = {};
  render() {
    return this.state.event ? (
      <>
        <BurgerMenu />
        <div id="main">
          <div className="main-section">
            <Header />
            <div className="cards">
              <CardWithOverlayText event={this.state.event} />
            </div>
          </div>
          <div className="event-section">
            <div className="hosted-follow">
              <div className="hostedby">
                <img
                  src={this.state.event.hosts[0].picture}
                  alt=""
                  className="hosted-avatar"
                />
                <span className="hostedname">
                  {this.state.event.hosts[0].name}
                </span>
              </div>
              <div className="follow">
                {this.props.user &&
                  this.props.user.events.includes(this.state.event._id) && (
                    <Link to={"/update-event/" + this.state.event._id}>
                      <button className="button">Edit</button>
                    </Link>
                  )}
                {this.props.user &&
                  this.props.user._id !== this.state.event.hosts[0]._id && (
                    <>
                      {this.props.user.following.includes(
                        this.state.event.hosts[0]._id
                      ) ? (
                        <button
                          className="button"
                          onClick={this.handleUnFollowButton}
                        >
                          Unfollow
                        </button>
                      ) : (
                        <button
                          className="button"
                          onClick={this.handleFollowButton}
                        >
                          Follow
                        </button>
                      )}
                    </>
                  )}
              </div>
            </div>
            <div className="about-event">
              <h1>Details</h1>
              <br />
              <p>{this.state.event.description}</p>
              <Share />
              <br />
            </div>
            <h1>Hosts</h1>
            <div className="hosts">
              {this.state.event.hosts.map((host) => (
                <MiniProfileCard key={host._id} item={host}></MiniProfileCard>
              ))}
            </div>
            <h1>Participants</h1>
            <div className="hosts">
              {this.state.event.participants.map((participant) => (
                <MiniProfileCard
                  key={participant._id}
                  item={participant}
                ></MiniProfileCard>
              ))}
            </div>
          </div>
          <div class="event-foot">
            <div class="cancel">
              <h1>
                <Moment
                  format="dddd DD MMMM"
                  date={this.state.event.schedule}
                />
              </h1>
              <h2>{this.state.event.name}</h2>
            </div>
            <h1 class="green">FREE ADMISION</h1>
            {this.props.user &&
            this.state.event.participants
              .map((x) => x._id)
              .includes(this.props.user._id) ? (
              <button className="button" onClick={this.handleLeaveButton}>
                Leave
              </button>
            ) : (
              <button className="button" onClick={this.handleJoinButton}>
                Join
              </button>
            )}
          </div>
        </div>
      </>
    ) : (
      <div>Loading...</div>
    );
  }
  componentDidMount = async () => {
    const response = await api_getEventByID(this.props.match.params._id);
    const event = await response.json();
    this.setState({ event });
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Event));
