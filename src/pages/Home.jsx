import React, { Component } from "react";
import CardWithOverlayText from "../components/CardWithOverlayText";
// import GoLive from "../components/GoLive";
// import arrowDown from "../img/arrow-down.png";
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
        {/* <h1>
          Hottest{" "}
          <span id="hottest" className="underline">
            {this.state.hottestPeriod}{" "}
            <img alt="down arrow" src={arrowDown}></img>
          </span>
        </h1> */}
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
  componentDidMount = () => {};
}
