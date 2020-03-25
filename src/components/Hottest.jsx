import React, { Component } from "react";
import { api_getHottestOfTheWeek } from "../apis/events";

export default class Hottest extends Component {
  render() {
    return (
      <div id="hottest-menu" className="d-none">
        <ul>
          <li>
            <h1>
              <a href="google.com">Next week</a>
            </h1>
          </li>
          <li>
            <h1>
              <a href="google.com">Of the month</a>
            </h1>
          </li>
          <li>
            <h1>
              <a href="google.com">All upcoming</a>
            </h1>
          </li>
        </ul>
      </div>
    );
  }
  componentDidMount = async () => {
    const $ = e => document.querySelector(e);
    $("#hottest").addEventListener("click", function() {
      toggleHottest();
    });
    $("#hottest-menu").addEventListener("click", function() {
      toggleHottest();
    });
    function toggleHottest() {
      if ($("#hottest-menu").classList.contains("d-none")) {
        $("#hottest-menu").classList.remove("d-none");
      } else {
        $("#hottest-menu").classList.add("d-none");
      }
    }
    const response = await api_getHottestOfTheWeek();
    const hottestEvents = await response.json();
    this.props.setHottestEvents(hottestEvents);
  };
}
