import React, { useState } from "react";

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "./Header.css";
import BurgerMenu from "./BurgerMenu";

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);
  return showMenu ? (
    <BurgerMenu setShowMenu={setShowMenu} />
  ) : (
    <div className="head">
      <div className="container">
        <FontAwesomeIcon
          style={{ zIndex: 0 }}
          icon={faBars}
          size="2x"
          className="mx-2 my-3 text-white position-fixed"
          onClick={() => {
            setShowMenu(true);
          }}
        />
        <div className="w-100 text-center">
          <Link to="/" className="logo">
            Meety
          </Link>
        </div>
      </div>
    </div>
  );
}
