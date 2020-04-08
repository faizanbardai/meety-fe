import React, { Component } from "react";
import conference from "../img/mockups/conference.jpg";

export default class Conference extends Component {
  render() {
    return (
      <div className="mainImg">
        <img src={conference} alt="conference" />
      </div>
    );
  }
}
