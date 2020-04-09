import React, { Component } from "react";
import {
  api_getHottestOfTheWeek,
  api_getHottestOfNextWeek,
  api_getHottestOfTheMonth,
  api_getHottestAllUpcoming,
} from "../apis/events";

export default class Hottest extends Component {
  handleClick = async (hottestPeriod) => {
    let response, hottestEvents;
    switch (hottestPeriod) {
      case "of the week":
        response = await api_getHottestOfTheWeek();
        hottestEvents = await response.json();
        this.props.setHottestEvents({ hottestEvents, hottestPeriod });
        break;
      case "of next week":
        response = await api_getHottestOfNextWeek();
        hottestEvents = await response.json();
        this.props.setHottestEvents({ hottestEvents, hottestPeriod });
        break;
      case "of the month":
        response = await api_getHottestOfTheMonth();
        hottestEvents = await response.json();
        this.props.setHottestEvents({ hottestEvents, hottestPeriod });
        break;
      case "All upcoming":
        response = await api_getHottestAllUpcoming();
        hottestEvents = await response.json();
        this.props.setHottestEvents({ hottestEvents, hottestPeriod });
        break;
      default:
        break;
    }
  };
  render() {
    return (
      <div id="hottest-menu" className="d-none">
        <ul>
          <li>
            <h1
              className="sortMenu"
              onClick={() => this.handleClick("of the week")}
            >
              of the Week
            </h1>
          </li>
          <li>
            <h1
              className="sortMenu"
              onClick={() => this.handleClick("of next week")}
            >
              Next Week
            </h1>
          </li>
          <li>
            <h1
              className="sortMenu"
              onClick={() => this.handleClick("of the month")}
            >
              of the Month
            </h1>
          </li>
          <li>
            <h1
              className="sortMenu"
              onClick={() => this.handleClick("All upcoming")}
            >
              All upcoming
            </h1>
          </li>
        </ul>
      </div>
    );
  }
  componentDidMount = async () => {
    // const $ = e => document.querySelector(e);
    // $("#hottest").addEventListener("click", function() {
    //   toggleHottest();
    // });
    // $("#hottest-menu").addEventListener("click", function() {
    //   toggleHottest();
    // });
    // function toggleHottest() {
    //   if ($("#hottest-menu").classList.contains("d-none")) {
    //     $("#hottest-menu").classList.remove("d-none");
    //   } else {
    //     $("#hottest-menu").classList.add("d-none");
    //   }
    // }
    this.handleClick("of the week");
    // const response = await api_getHottestOfTheWeek();
    // const hottestEvents = await response.json();
    // const hottestPeriod = "of the Week";
    // this.props.setHottestEvents({ hottestEvents, hottestPeriod });
  };
}
