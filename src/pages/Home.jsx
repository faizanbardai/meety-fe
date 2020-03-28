import React, { Component } from "react";
import CardWithOverlayText from "../components/CardWithOverlayText";
import Header from "../components/Header";
import GoLive from "../components/GoLive";
import arrowDown from "../img/arrow-down.png";
import Hottest from "../components/Hottest";
import BurgerMenu from "../components/BurgerMenu";

<<<<<<< HEAD


export default function Home() {
  const [hottest] = useState([
    {
      _id: 1,
      title: "The fight against viruses",
      dateAndTime: "Tomorrow",
      participants: 205,
      image:
        "https://dp9bxf2pat5uz.cloudfront.net/wp-content/uploads/shutterstock_1626897328.jpg"
    },
    {
      _id: 2,
      title: "Future is here!",
      dateAndTime: "Wed 18",
      participants: 133,
      image: "https://cd3n.com/ts/690x388/40/21971"
    },
    {
      _id: 3,
      title: "Future is here!",
      dateAndTime: "Wed 18",
      participants: 133,
      image: "https://cd3n.com/ts/690x388/40/21971"
    }
  ]);
  return (
    <div id="main">
      <div class="main-section">
        <Header />
        <h1>
          Hottest{" "}
          <span id="hottest" class="underline">
            of the week
          </span>{" "}
          <img alt="down arrow" src={arrowDown}></img>
        </h1>
        <div class="cards">
          {hottest.map(hotItem => (
            <CardWithOverlayText key={hotItem._id} hotItem={hotItem} />
          ))}
        </div>
      </div>
      <div class="second-section">
        <h1>Only for you</h1>
        <div class="cards">
          {hottest.map(hotItem => (
            <CardWithOverlayText key={hotItem._id} hotItem={hotItem} />
          ))}
          {hottest.map(hotItem => (
            <CardWithOverlayText key={hotItem._id} hotItem={hotItem} />
          ))}
          {hottest.map(hotItem => (
            <CardWithOverlayText key={hotItem._id} hotItem={hotItem} />
          ))}
=======
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
            <div className="cards">
              {this.state.hottestEvents &&
                this.state.hottestEvents.map(event => (
                  <CardWithOverlayText key={event._id} event={event} />
                ))}
            </div>
          </div>
          <div className="second-section">
            <h1>Only for you</h1>
            <div className="cards">
              {this.state.hottestEvents &&
                this.state.hottestEvents.map(event => (
                  <CardWithOverlayText key={event._id} event={event} />
                ))}
            </div>
            <div className="pre-footer"></div>
          </div>
          <GoLive />
>>>>>>> master
        </div>
      </>
    );
  }
  componentDidMount = () => {};
}
