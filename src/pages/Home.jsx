import React, { Component } from "react";
import CardWithOverlayText from "../components/CardWithOverlayText";
import Header from "../components/Header";
import GoLive from "../components/GoLive";
import arrowDown from "../img/arrow-down.png";
import Hottest from "../components/Hottest";
import BurgerMenu from "../components/BurgerMenu";

export default class Home extends Component {
  state = {};
  setHottestEvents = events => {
    this.setState({ hottest: events });
  };
  render() {
    return (
      <>
        <Hottest setHottestEvents={this.setHottestEvents} />
        <BurgerMenu />
        <div id="main">
          <div className="main-section">
            <Header />
            <h1>
              Hottest{" "}
              <span id="hottest" className="underline">
                of the week <img alt="down arrow" src={arrowDown}></img>
              </span>
            </h1>
            <div className="cards">
              {this.state.hottest &&
                this.state.hottest.map(event => (
                  <CardWithOverlayText key={event._id} event={event} />
                ))}
            </div>
          </div>
          <div className="second-section">
            <h1>Only for you</h1>
            <div className="cards">
              {this.state.hottest &&
                this.state.hottest.map(event => (
                  <CardWithOverlayText key={event._id} event={event} />
                ))}
            </div>
            <div className="pre-footer"></div>
          </div>
          <GoLive />
        </div>
      </>
    );
  }
  componentDidMount = () => {};
}
