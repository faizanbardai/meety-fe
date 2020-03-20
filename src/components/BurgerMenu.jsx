import React, { Component } from "react";

export default class BurgerMenu extends Component {
  render() {
    return (
      <>
        <div id="burguer-menu" className="d-none">
          <ul>
            <li>
              <h2>
                <a href="/profile">Profile/log-in</a>
              </h2>
            </li>
            <li>
              <h2>
                <a href="/events">My Meetys</a>
              </h2>
            </li>
            <li>
              <h2>
                <a href="/logout">Log-out</a>
              </h2>
            </li>
          </ul>
        </div>
        <div id="overlaymenu" className="d-none"></div>
      </>
    );
  }
  componentDidMount = () => {
    const $ = e => document.querySelector(e);

    $("#burguer").addEventListener("click", function() {
      toggleMenu();
    });
    $("#overlaymenu").addEventListener("click", function() {
      toggleMenu();
    });

    function toggleMenu() {
      if ($("#burguer-menu").classList.contains("d-none")) {
        $("#burguer-menu").classList.remove("d-none");
        $("#overlaymenu").classList.remove("d-none");
      } else if (!$("#overlaymenu").classList.remove("d-none")) {
        $("#burguer-menu").classList.add("d-none");
        $("#overlaymenu").classList.add("d-none");
      }
    }
  };
}
