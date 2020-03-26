import React, { Component } from "react";
import { connect } from "react-redux";
import BurgerMenu from "../components/BurgerMenu";
import Header from "../components/Header";
import CardWithOverlayText from "../components/CardWithOverlayText";
import { api_getEventByID } from "../apis/events";
import { withRouter, Link } from "react-router-dom";
import MiniProfileCard from "../components/MiniProfileCard";

const mapStateToProps = state => ({ ...state });

class Event extends Component {
  handleFollowButton = () => {
    console.log("I'm follow button");
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
                  src={this.state.event.host[0].picture}
                  alt=""
                  className="hosted-avatar"
                />
                <span className="hostedname">
                  {this.state.event.host[0].name}
                </span>
              </div>

              <div className="follow">
                {/* If you are the host of the event then you will see the edit button
                    otherwise you can use the follow button to follow the host of the event.
                */}
                {this.props.user.events.includes(this.state.event._id) ? (
                  <Link
                    to={{
                      pathname: "/update-event/" + this.state.event._id,
                      state: {
                        event: this.state.event
                      }
                    }}
                  >
                    <button className="button">Edit</button>
                  </Link>
                ) : (
                  <button className="button" onClick={this.handleFollowButton}>
                    Follow
                  </button>
                )}
              </div>
            </div>
            <div className="about-event">
              <h1>Details</h1>
              <br />
              <p>{this.state.event.description}</p>
              <br />
              <h1>Participants</h1>
            </div>
            <div className="hosts">
              {this.state.event.participants.map(participant => (
                <MiniProfileCard key={participant._id} item={participant} />
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
