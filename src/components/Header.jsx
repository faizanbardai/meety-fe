import React from "react";
import burgerMenu from "../../src/img/burger.png";

export default function Header() {
  return (
    <div className="head">
      <div id="menu">
        <img
          id="burguer"
          src={burgerMenu}
          alt="menu"
          width="35px"
          height="35px"
        />
      </div>
      <div className="logo">Meety</div>
    </div>
  );
}
