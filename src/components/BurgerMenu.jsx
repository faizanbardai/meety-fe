import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { saveUser } from "../action";

const mapStateToProps = state => ({ ...state });
const mapDispatchToProps = dispatch => ({
  saveUser: user => dispatch(saveUser(user))
});

class BurgerMenu extends Component {
  render() {
    return (
      <>
        <div id="burguer-menu" className="d-none">
          {this.props.user ? (
            <ul>
              <li>
                <h2>
                  <Link to="/profile">Profile</Link>
                </h2>
              </li>
              <li>
                <h2>
                  <Link to="/events">My Meetys</Link>
                </h2>
              </li>
              <li>
                <h2>
                  <button
                    onClick={() => {
                      localStorage.removeItem("accessToken");
                      this.props.saveUser(null);
                      this.props.history.push("/home");
                    }}
                  >
                    Logout
                  </button>
                </h2>
              </li>
            </ul>
          ) : (
            <ul>
              <li>
                <h2>
                  <Link to="/create-account">Create Account</Link>
                </h2>
              </li>
              <li>
                <h2>
                  <Link to="/login">Login</Link>
                </h2>
              </li>
            </ul>
          )}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(BurgerMenu));
