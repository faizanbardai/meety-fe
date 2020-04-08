import React from "react";
import burgerMenu from "../../src/img/burger.png";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <div className="head">
      <div className="container">
        <img
          className="mx-2 my-3 position-fixed"
          src={burgerMenu}
          alt="menu"
          width="35px"
          height="35px"
        />
        <div className="w-100 text-center">
          <Link to="/home" className="logo">
            Meety
          </Link>
        </div>
      </div>
    </div>
  );
}
