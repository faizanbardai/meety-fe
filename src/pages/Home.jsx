import React, { Component } from "react";
import CardWithOverlayText from "../components/CardWithOverlayText";
import Header from "../components/Header";
import GoLive from "../components/GoLive";
import arrowDown from "../img/arrow-down.png";
import Hottest from "../components/Hottest";
import BurgerMenu from "../components/BurgerMenu";

export default class Home extends Component {
  state = {
    hottest: [
      {
        _id: 1,
        name: "The fight against viruses",
        schedule: "23 Mar 2020",
        participants: [1, 2, 3],
        picture:
          "https://dp9bxf2pat5uz.cloudfront.net/wp-content/uploads/shutterstock_1626897328.jpg"
      },
      {
        _id: 2,
        name: "Future is here!",
        schedule: "24 Mar 2020",
        participants: [1, 2, 3, 4],
        picture: "https://cd3n.com/ts/690x388/40/21971"
      },
      {
        _id: 3,
        name: "Future is here!",
        schedule: "9 Nov 2020",
        participants: [],
        picture: "https://cd3n.com/ts/690x388/40/21971"
      }
    ]
  };
  render() {
    const { hottest } = this.state;
    return (
      <>
        <Hottest />
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
              {hottest.map(hotItem => (
                <CardWithOverlayText key={hotItem._id} hotItem={hotItem} />
              ))}
            </div>
          </div>
          <div className="second-section">
            <h1>Only for you</h1>
            <div className="cards">
              {hottest.map(hotItem => (
                <CardWithOverlayText key={hotItem._id} hotItem={hotItem} />
              ))}
              {hottest.map(hotItem => (
                <CardWithOverlayText key={hotItem._id} hotItem={hotItem} />
              ))}
              {hottest.map(hotItem => (
                <CardWithOverlayText key={hotItem._id} hotItem={hotItem} />
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
