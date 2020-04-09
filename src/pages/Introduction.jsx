import React from "react";
import homeImg from "../img/mockups/home.png";
import hottestImg from "../img/mockups/hottest.png";
import eventImg from "../img/mockups/event.png";
import joinEventImg from "../img/mockups/join-event.png";
import profileImg from "../img/mockups/profile.png";
import newEventImg from "../img/mockups/new-event.png";
import shareEventImg from "../img/mockups/share-event.png";
import { Link } from "react-router-dom";

export default function Introduction() {
  return (
    <div>
      <Link to="/">View App</Link>
      <img alt="home" src={homeImg} width={"200px"}></img>
      <img alt="hottest" src={hottestImg} width={"200px"}></img>
      <img alt="event" src={eventImg} width={"200px"}></img>
      <img alt="join-event" src={joinEventImg} width={"200px"}></img>
      <img alt="profile" src={profileImg} width={"200px"}></img>
      <img alt="new-event" src={newEventImg} width={"200px"}></img>
      <img alt="share-event" src={shareEventImg} width={"200px"}></img>
    </div>
  );
}
