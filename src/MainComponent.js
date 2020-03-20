import React from "react";
import "./index.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import Introduction from "./pages/Introduction";
import Event from "./pages/Event";
import Profile from "./pages/Profile";

export default function MainComponent() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Introduction />
          </Route>
          <Route path="/home" exact>
            <Home />
          </Route>
          <Route path="/event" exact>
            <Event />
          </Route>
          <Route path="/profile" exact>
            <Profile />
          </Route>
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    </div>
  );
}
