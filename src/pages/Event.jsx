import React, { Component } from "react";
import { connect } from "react-redux";
import {
  api_getEventByID,
  api_joinEvent,
  api_leaveEvent,
} from "../apis/events";
import { api_followers, api_unfollow } from "../apis/users";
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
        <div className="container" style={{ paddingBottom: "200px" }}>
          <CardWithOverlayText event={this.state.event} />
          <div className="d-flex justify-content-between my-4">
            <div class="d-flex align-items-center">
              <img
                src={this.state.event.hosts[0].picture}
                alt=""
                width="70px"
                className="rounded-circle mr-3"
              />
              <div>
                Hosted by:<h6>{this.state.event.hosts[0].name}</h6>
              </div>
            </div>
            <div>
              {this.props.user &&
                this.props.user.events.includes(this.state.event._id) && (
                  <Link to={"/update-event/" + this.state.event._id}>
                    <button className="btn btn-outline-primary">Edit</button>
                  </Link>
                )}
              {this.props.user &&
                this.props.user._id !== this.state.event.hosts[0]._id && (
                  <>
                    {this.props.user.following.includes(
                      this.state.event.hosts[0]._id
                    ) ? (
                      <button
                        className="btn btn-outline-primary"
                        onClick={this.handleUnFollowButton}
                      >
                        Unfollow
                      </button>
                    ) : (
                      <button
                        className="btn btn-outline-primary"
                        onClick={this.handleFollowButton}
                      >
                        Follow
                      </button>
                    )}
                  </>
                )}
            </div>
          </div>
          <h2>Detail</h2>
          <p>{this.state.event.description}</p>
          <Share />
          <h1>Participants ({this.state.event.participantsLength})</h1>
          <div className="row">
            {this.state.event.hosts.map((host) => (
              <MiniProfileCard key={host._id} item={host}></MiniProfileCard>
            ))}
            {this.state.event.participants.map((participant) => (
              <MiniProfileCard key={participant._id} item={participant} />
            ))}
          </div>
        </div>
        <div style={{ backgroundColor: "#ffffff" }} className="fixed-bottom ">
          <div className="container">
            <div className="row">
              <div className="d-none d-lg-block col-md-6">
                <b>
                  <Moment
                    format="dddd DD MMMM"
                    date={this.state.event.schedule}
                  />
                </b>
                <h2>{this.state.event.name}</h2>
              </div>
              <h5 className="col-12 col-sm-3 col-md-3 text-center">
                FREE ADMISION
              </h5>
              <div className="col-12 col-sm-3 col-md-3 text-center">
                {this.props.user &&
                this.state.event.participants
                  .map((x) => x._id)
                  .includes(this.props.user._id) ? (
                  <button
                    style={{ width: "200px" }}
                    className="btn btn-primary"
                    onClick={this.handleLeaveButton}
                  >
                    Leave Event
                  </button>
                ) : (
                  <button
                    className="btn btn-primary"
                    onClick={this.handleJoinButton}
                  >
                    Join Event
                  </button>
                )}
              </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Event));
