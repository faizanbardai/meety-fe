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

const mapStateToProps = (state) => ({ ...state });

class Event extends Component {
  state = {
    participants: "",
    followers: "",
  };
  //here i go
  handleJoinButton = async () => {
    console.log("I'm join button");
    try {
      const accessToken = this.props.accessToken;
      const res = await api_joinEvent(accessToken, this.state.event._id);
      if (res.ok) {
        this.setState({
          event: {
            ...this.state.event,
            participants: [...this.state.event.participants, this.props.user],
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleCancelButton = async () => {
    console.log("I'm cancel button");
    try {
      const accessToken = this.props.accessToken;
      const res = await api_leaveEvent(accessToken, this.state.event._id);
      if (res.ok) {
        this.setState({
          event: {
            ...this.state.event,
            participants: this.state.event.participants.filter(
              (x) => x._id !== this.props.user._id
            ),
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleFollowButton = async () => {
    console.log("I'm follow button");
    try {
      const accessToken = this.props.accessToken;
      const res = await api_followers(
        accessToken,
        this.state.event.hosts[0]._id
      );
      console.log(res);
      if (res.ok) {
        this.setState({
          followers: [...this.state.followers, this.user._id],
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleUnFollowButton = async () => {
    console.log("I'm follow button");
    try {
      const accessToken = this.props.accessToken;
      const res = await api_unfollow(
        accessToken,
        this.state.event.hosts[0]._id
      );
      console.log(res);
      if (res.ok) {
        this.setState({
          followers: [...this.state.followers, this.user._id],
        });
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
                {this.props.user &&
                this.state.event.hosts.includes(this.props.user._id) ? (
                  <>
                    <img
                      src={this.props.user.picture}
                      alt=""
                      className="hosted-avatar"
                    />
                    <span className="hostedname">{this.props.user.name}</span>
                  </>
                ) : (
                  <>
                    <img
                      src={this.state.event.hosts[0].picture}
                      alt=""
                      className="hosted-avatar"
                    />
                    <span className="hostedname">
                      {this.state.event.hosts[0].name}
                    </span>
                  </>
                )}
              </div>

              <div className="follow">
                {/* If you are the host of the event then you will see the edit button
                    otherwise you can use the follow button to follow the host of the event.
                */}
                {this.props.user &&
                this.props.user.events.includes(this.state.event._id) ? (
                  <Link to={"/update-event/" + this.state.event._id}>
                    <button className="button">Edit</button>
                  </Link>
                ) : (
                  <button className="button" onClick={this.handleFollowButton}>
                    Follow
                  </button>
                )}
                {/* //here i go */}
                {/* {!this.state.followers.includes(this.props.user._id)?
  <button className="button" onClick={this.handleFollowButton}>
  Follow
</button>:<button className="button" onClick={this.handleUnFollowButton}>
                   Unfollow
                  </button>}
                 */}

                {!this.state.event.participants
                  .map((x) => x._id)
                  .includes(this.props.user._id) ? (
                  <button className="button" onClick={this.handleJoinButton}>
                    Join
                  </button>
                ) : (
                  <button className="button" onClick={this.handleCancelButton}>
                    Cancel
                  </button>
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
export default connect(mapStateToProps, null)(withRouter(Event));
