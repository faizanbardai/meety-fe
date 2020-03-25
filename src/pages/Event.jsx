import React, { Component } from "react";
import BurgerMenu from "../components/BurgerMenu";
import Header from "../components/Header";
import CardWithOverlayText from "../components/CardWithOverlayText";
import { api_getEventByID } from "../apis/events";
import { withRouter } from "react-router-dom";

class Event extends Component {
  state = {};
  render() {
    return this.state.event ? (
      <>
        <BurgerMenu />
        <div id="main">
          <div className="main-section">
            <Header />
            <div className="cards">
              <CardWithOverlayText event={this.state.event} />
            </div>
          </div>
        </div>
      </>
    ) : (
      <div>Loading...</div>
    );
  }
  componentDidMount = async () => {
    const response = await api_getEventByID(this.props.match.params._id);
    const event = await response.json();
    this.setState({ event });
  };
}

export default withRouter(Event);
