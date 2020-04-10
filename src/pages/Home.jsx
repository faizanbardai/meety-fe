import React, { Component } from "react";
import CardWithOverlayText from "../components/CardWithOverlayText";
// import GoLive from "../components/GoLive";
import Hottest from "../components/Hottest";
// import Share from "../components/Share";

export default class Home extends Component {
  state = {};
  setHottestEvents = (hottest) => {
    this.setState(hottest);
  };

  render() {
    return (
      <div className="container">
        <Hottest setHottestEvents={this.setHottestEvents} />
        <div class="dropdown text-white row my-2">
          <h1 className="mr-2">Hottest</h1>
          <button
            class="btn btn-primary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {this.state.hottestPeriod}
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <button class="dropdown-item">of next week</button>
            <button class="dropdown-item">of the month</button>
            <button class="dropdown-item">upcoming (all)</button>
          </div>
        </div>
        <div className="row">
          {this.state.hottestEvents &&
            this.state.hottestEvents.map((event) => (
              <div className="col-12 col-sm-6 col-md-4 mb-3">
                <CardWithOverlayText key={event._id} event={event} />
              </div>
            ))}
        </div>
        {/* <GoLive /> */}
      </div>
    );
  }
}
