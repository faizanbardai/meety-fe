import React, { Component } from "react";
import "./index.css";

import { connect } from "react-redux";
import { saveUser } from "./action";
import { api_refreshToken } from "../src/apis/users";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import Introduction from "./pages/Introduction";
import Event from "./pages/Event";
import Profile from "./pages/Profile";
import GuestProfile from "./pages/GuestProfile";

const mapStateToProps = state => ({ ...state });
const mapDispatchToProps = dispatch => ({
  saveUser: user => dispatch(saveUser(user))
});

class MainComponent extends Component {
  state = {
    loading: true
  };

  render() {
    return this.state.loading ? (
      <>Loading</>
    ) : (
      <div>
        <Router basename={process.env.PUBLIC_URL}>
          <Switch>
            <Route path="/" exact>
              <Introduction />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/event">
              <Event />
            </Route>
            <Route path="/profile" exact>
              {this.props.user ? <Profile /> : <Redirect to="/home" />}
            </Route>
            <Route path="/profile/:_id">
              {this.props.user ? <GuestProfile /> : <Redirect to="/home" />}
            </Route>
            <Route component={PageNotFound} />
          </Switch>
        </Router>
      </div>
    );
  }
  componentDidMount = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      try {
        let response = await api_refreshToken(accessToken);
        switch (response.status) {
          case 200:
            // OK
            response = await response.json();
            localStorage.setItem("accessToken", response.access_token);
            this.props.saveUser(response.user);
            this.setState({
              loading: false
            });
            break;
          case 401:
            // unauthorized
            localStorage.removeItem("accessToken");
            alert("You are unauthorized or your token has expired");
            this.setState({ loading: false });
            break;
          default:
            alert("Some error");
            this.setState({ loading: false });
            break;
        }
      } catch (error) {
        alert(error);
      }
    } else this.setState({ loading: false });
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);
