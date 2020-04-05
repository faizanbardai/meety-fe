import React, { Component } from "react";
import CardWithOverlayText from "../components/CardWithOverlayText";
import Header from "../components/Header";
import GoLive from "../components/GoLive";
import arrowDown from "../img/arrow-down.png";
import Hottest from "../components/Hottest";
import BurgerMenu from "../components/BurgerMenu";
import Share from "../components/Share";
import { Row, Col } from "reactstrap"

export default class Home extends Component {
  state = {};
  setHottestEvents = hottest => {
    this.setState(hottest);
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
                {this.state.hottestPeriod}{" "}
                <img alt="down arrow" src={arrowDown}></img>
              </span>
            </h1>
            <Row>
            <div className="cards">
              {this.state.hottestEvents &&
                this.state.hottestEvents.map(event => (
                  <Col sm="12" md="6">
                  <CardWithOverlayText key={event._id} event={event} />
                  </Col>
                ))}
            </div>
            </Row>
          </div>
          <div className="second-section pt-auto">
            <h1>Only for you</h1>
            <Share /> 
            <Row>
            <div className="cards">
              {this.state.hottestEvents &&
                this.state.hottestEvents.map(event => (
                  <Col sm="12" md="4">
                  <CardWithOverlayText key={event._id} event={event} />
                  </Col>
                ))}
            </div>
            </Row>
            <div className="pre-footer"></div>
          </div>
          <GoLive />
        </div>
      </>
    );
  }
  componentDidMount = () => {};
}
