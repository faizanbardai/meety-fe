import React, { Component } from "react";
import Header from "../components/Header";
//import addhost from "../img/addhost.png";
//import arrowDown from "../img/arrow-down.png";

export default class Profile extends Component {
  render() {
    return (
      <div>
        <Header />
        <div id="hottest-menu" class="d-none">
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
        <div id="burguer-menu" class="d-none">
          <ul>
            <li>
              <h2>
                <a href="">Profile/log-in</a>
              </h2>
            </li>
            <li>
              <h2>
                <a href="">My Meetys</a>
              </h2>
            </li>
            <li>
              <h2>
                <a href="">Log-out</a>
              </h2>
            </li>
          </ul>
        </div>
        <div id="overlaymenu" class="d-none"></div>
        <div id="main">
          <div class="main-section">
            <div class="head">
              <div id="menu">
                <img
                  id="burguer"
                  src="assets/img/burger.png"
                  alt=""
                  width="35"
                  height="35px"
                />
              </div>
              <div class="logo">Meety</div>
            </div>
            <div class="section-info">
              <div class="card-profile">
                <div
                  class="avatar"
                  style="background-image: url(assets/img/me.png)"
                ></div>
                <h1 class="profile-name">Antonio Serrano Martin</h1>
                <h1 class="followers-number">144 followers</h1>
              </div>
              <div class="follow">
                <button class="button">Follow</button>
              </div>
            </div>
          </div>
          <div class="about-section" style="justify-content: center">
            <div class="about-me">
              <h1>About me:</h1>
              <p>
                <span>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Temporibus atque dicta inventore, ducimus rem cumque quas
                  aliquam eveniet odio placeat totam, officiis saepe delectus
                  sit voluptatibus non. Consequatur, eveniet, voluptatum.
                </span>
                <span>
                  Quasi cum, quaerat amet, eaque vero accusantium, laboriosam
                  iure sunt labore dolor totam ipsum nobis. Itaque quis tenetur
                  excepturi! Voluptates repellendus, atque incidunt perferendis
                  consectetur ab, exercitationem minima expedita recusandae!
                </span>
              </p>
            </div>
          </div>
          <div class="profile-events-section">
            <h1>His next events:</h1>
            <div class="next-events">
              <div
                class="card-big"
                style="background-image: url('assets/img/promo.png');background-size: cover;"
              >
                <div class="card-title">
                  <h2>The fight against viruses</h2>
                  <h3>Tomorrow/205 Participants</h3>
                </div>
              </div>
              <div
                class="card-big"
                style="background-image: url('assets/img/promo.png');background-size: cover;"
              >
                <div class="card-title">
                  <h2>The fight against viruses</h2>
                  <h3>Tomorrow/205 Participants</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
