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
    ]
  };
  render() {
    const { hottest } = this.state;
    return (
      <>
        <Hottest />
        <BurgerMenu />
        <div id="overlaymenu" className="d-none"></div>
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
  componentDidMount = () => {
    const $ = e => document.querySelector(e);

    function toggleMenu() {
      if ($("#burguer-menu").classList.contains("d-none")) {
        $("#burguer-menu").classList.remove("d-none");
        $("#overlaymenu").classList.remove("d-none");
      } else if (!$("#overlaymenu").classList.remove("d-none")) {
        $("#burguer-menu").classList.add("d-none");
        $("#overlaymenu").classList.add("d-none");
      }
    }

    function toggleHottest() {
      if ($("#hottest-menu").classList.contains("d-none")) {
        $("#hottest-menu").classList.remove("d-none");
      } else {
        $("#hottest-menu").classList.add("d-none");
      }
    }

    $("#burguer").addEventListener("click", function() {
      toggleMenu();
    });

    $("#overlaymenu").addEventListener("click", function() {
      toggleMenu();
    });

    $("#hottest").addEventListener("click", function() {
      toggleHottest();
    });

    $("#hottest-menu").addEventListener("click", function() {
      toggleHottest();
    });
  };
}
