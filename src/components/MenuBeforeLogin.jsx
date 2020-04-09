import React from "react";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function MenuBeforeLogin(props) {
  return (
    <div
      style={{ zIndex: 1031 }}
      className="w-100 h-100 position-fixed bg-dark text-white"
    >
      <div className="container">
        <div className="d-flex">
          <FontAwesomeIcon
            icon={faTimes}
            size="2x"
            className="mx-2 my-3 "
            onClick={() => {
              props.setShowMenu(false);
            }}
          />
          <div className="ml-auto">
            <button
              onClick={() => {
                props.setShowMenu(false);
                props.history.push("/login");
              }}
              type="button"
              className="mt-3 mr-2 btn btn-primary"
            >
              Log In
            </button>
            <button
              onClick={() => {
                props.setShowMenu(false);
                props.history.push("/create-account");
              }}
              type="button"
              className="mt-3 btn btn-primary"
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(MenuBeforeLogin);
