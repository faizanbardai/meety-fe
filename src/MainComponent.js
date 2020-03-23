import React, { Component } from "react";
import "./index.css";
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
import { api_refreshToken } from "../src/apis/users";

export default class MainComponent extends Component {
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
            <Route path="/profile/:_id">
              {this.state.isAuthenticated ? (
                <Profile
                  isAuthenticated={this.state.isAuthenticated}
                  loggedInUser={this.state.user}
                />
              ) : (
                <Redirect to="/home" />
              )}
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
            this.setState({
              loading: false,
              isAuthenticated: true,
              user: response.user
            });
            break;
          case 401:
            // unauthorized
            localStorage.removeItem("accessToken");
            alert("You are unauthorized or your token has expired");
            this.setState({ loading: false, isAuthenticated: false });
            break;
          default:
            alert("Some error");
            this.setState({ loading: false, isAuthenticated: false });
            break;
        }
      } catch (error) {
        alert(error);
      }
    } else this.setState({ loading: false, isAuthenticated: false });
  };
}
