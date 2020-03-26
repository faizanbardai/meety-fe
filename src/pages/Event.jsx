import React, { Component } from "react";
import BurgerMenu from "../components/BurgerMenu";
import Header from "../components/Header";
import CardWithOverlayText from "../components/CardWithOverlayText";
import { api_getEventByID } from "../apis/events";
import { withRouter } from "react-router-dom";
import MiniProfileCard from "../components/MiniProfileCard";

class Event extends Component {
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
          <div class="event-section">
            <div class="hosted-follow">
              <div class="hostedby">
                <img
                  src={this.state.event.host[0].picture}
                  alt=""
                  class="hosted-avatar"
                />
                <span class="hostedname">{this.state.event.host[0].name}</span>
              </div>
              <div class="follow">
                <button class="button">Follow</button>
              </div>
            </div>
            <div class="about-event">
              <h1>Details</h1>
              <br />
              <p>{this.state.event.description}</p>
              <br />
              <h1>Participants</h1>
            </div>
            <div class="hosts">
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

export default withRouter(Event);
