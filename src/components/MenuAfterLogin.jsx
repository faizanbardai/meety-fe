import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { saveUser, saveAccessToken } from "../action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const mapStateToProps = (state) => ({ ...state });
const mapDispatchToProps = (dispatch) => ({
  saveUser: (user) => dispatch(saveUser(user)),
  saveAccessToken: (accessToken) => dispatch(saveAccessToken(accessToken)),
});

const MenuAfterLogin = (props) => {
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
              type="button"
              className="my-2 btn btn-outline-light"
              onClick={() => {
                localStorage.removeItem("accessToken");
                props.saveUser(null);
                props.saveAccessToken(null);
                props.history.push("/home");
              }}
            >
              Logout
            </button>
          </div>
        </div>
        <div>
          <div className="row">
            <img
              src={props.user.picture}
              alt={props.user.name}
              className="rounded-circle col-6 col-sm-4 col-md-3"
            />

            <div className="col-12 col-sm-8 col-md-9">
              <h1 className="display-4 text-white">{props.user.name}</h1>
            </div>
          </div>
          <div className="row d-flex justify-content-center">
            <button type="button" className="mx-2 my-2 btn btn-outline-light">
              My Events
            </button>
            <button type="button" className="mx-2 my-2 btn btn-outline-light">
              Create Event{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(MenuAfterLogin));
