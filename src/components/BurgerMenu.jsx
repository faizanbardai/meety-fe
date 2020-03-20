import React from "react";

export default function BurgerMenu() {
  return (
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
  );
}
