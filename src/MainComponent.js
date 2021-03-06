import React, { Component } from "react";
import "./index.css";

import { connect } from "react-redux";
import { saveUser, saveAccessToken } from "./action";
import { api_refreshToken } from "../src/apis/users";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import Introduction from "./pages/Introduction";
import GuestProfile from "./pages/GuestProfile";
import CreateAccount from "./pages/CreateAccount";
import Login from "./pages/Login";
import CBRetrun from "./components/CBRetrun";
import AddEvent from "./pages/AddEvent";
import Event from "./pages/Event";
import UpdateEvent from "./pages/UpdateEvent";
import Header from "./components/Header";
import UpdateProfile from "./pages/UpdateProfile";

const mapStateToProps = (state) => ({ ...state });
const mapDispatchToProps = (dispatch) => ({
  saveUser: (user) => dispatch(saveUser(user)),
  saveAccessToken: (accessToken) => dispatch(saveAccessToken(accessToken)),
});

class MainComponent extends Component {
  state = {
    loading: true,
  };

  render() {
    return this.state.loading ? (
      <>Loading</>
    ) : (
      <div className="container-fluid px-0">
        <Router basename={process.env.PUBLIC_URL}>
          <Header />
          <Switch>
            <Route path="/intro" exact component={Introduction} />
            <Route path="/" exact component={Home} />
            <Route path="/event/:_id" exact component={Event} />
            <Route path="/add-event" exact component={AddEvent} />
            <Route path="/update-event/:_id" component={UpdateEvent} />
            <Route path="/profile/:_id">
              {this.props.user ? <GuestProfile /> : <Redirect to="/" />}
            </Route>
            <Route path="/update-profile" component={UpdateProfile} />
            <Route path="/create-account" exact component={CreateAccount} />
            <Route path="/login" exact component={Login} />
            <Route
              path="/auth/facebook/callback/:accessToken"
              exact
              component={CBRetrun}
            />
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
            this.props.saveAccessToken(response.access_token);
            this.setState({
              loading: false,
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
