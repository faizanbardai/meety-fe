import React, { Component } from "react";
import Header from "../components/Header";
import { api_createEvent, api_updateEventImage } from "../apis/events";
import BurgerMenu from "../components/BurgerMenu";
import { withRouter } from "react-router-dom";
import MiniProfileCard from "../components/MiniProfileCard";
import { connect } from "react-redux";
// import uploadImg from "../img/upload.png";
import addHost from "../img/addhost.png";
import { addEventIDToUserEventsArray } from "../action";

const mapStateToProps = state => ({ ...state });
const mapDispatchToProps = dispatch => ({
  addEventIDToUserEventsArray: _id => dispatch(addEventIDToUserEventsArray(_id))
});

class AddEvent extends Component {
  state = {
    name: "",
    schedule: "",
    duration: "",
    description: ""
  };
  handleSubmit = async event => {
    event.preventDefault();
    const accessToken = this.props.accessToken;
    const { name, schedule, duration, description } = this.state;
    try {
      let newEvent = await api_createEvent(accessToken, {
        name,
        schedule,
        duration,
        description
      });
      switch (newEvent.status) {
        case 200:
          // OK
          if (this.state.picture) {
            newEvent = await newEvent.json();
            const data = new FormData();
            data.append("picture", this.state.picture);
            let newEventWithPicture = await api_updateEventImage(
              accessToken,
              newEvent._id,
              data
            );
            switch (newEventWithPicture.status) {
              case 200:
                // OK
                newEventWithPicture = await newEventWithPicture.json();
                this.props.addEventIDToUserEventsArray(newEventWithPicture._id);
                this.props.history.push({
                  pathname: "/event",
                  state: { event: newEventWithPicture }
                });
                break;
              default:
                alert("Some error when saving event picture");
            }
          } else {
            newEvent = await newEvent.json();
            this.props.addEventIDToUserEventsArray(newEvent._id);
            this.props.history.push({
              pathname: "/event",
              state: { event: newEvent }
            });
            break;
          }
          break;
        case 401:
          // unauthorized
          alert("You are unauthorized");
          break;
        default:
          alert("Some error");
      }
    } catch (error) {
      alert(error);
    }
  };
  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };
  render() {
    return (
      <>
        <BurgerMenu />
        <div id="main">
          <div className="main-section heading-size">
            <Header />
            <h1>Create an event</h1>
          </div>
          <div className="second-section">
            <form id="create-event" onSubmit={this.handleSubmit}>
              <label htmlFor="event-name">Event Name (required)</label>
              <div>
                <input
                  id="event-name"
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleInputChange}
                />
              </div>
              <label htmlFor="date">Date/Time</label>
              <div>
                <input
                  id="schedule"
                  type="datetime-local"
                  name="schedule"
                  value={this.state.schedule}
                  onChange={this.handleInputChange}
                />
              </div>
              <label htmlFor="duration">Duration (in minutes)</label>
              <div>
                <input
                  type="text"
                  name="duration"
                  placeholder="Example: 30"
                  value={this.state.duration}
                  onChange={this.handleInputChange}
                />
              </div>
              <label htmlFor="picture">Featured picture</label>
              <div id="upload">
                {/* <img id="input-file" alt="upload-button" src={uploadImg}></img> */}
                <input
                  id="input-file"
                  type="file"
                  name="picture"
                  onChange={e => this.setState({ picture: e.target.files[0] })}
                ></input>
              </div>
              <label htmlFor="description">Description</label>
              <div>
                <textarea
                  name="description"
                  id=""
                  cols="50"
                  rows="10"
                  placeholder="Let your attendees know what to expect; including the agenda, what they need to bring and how to find the group."
                  value={this.state.description}
                  onChange={this.handleInputChange}
                ></textarea>
              </div>
              <label htmlFor="Hosts">Hosts (they can edit event details)</label>
              <div className="hosts">
                <MiniProfileCard item={this.props.user} />
                <MiniProfileCard
                  item={{ name: "Add new host", picture: `${addHost}` }}
                />
              </div>

              <div className="foot">
                <div className="cancel">
                  <button className="button-empty">Cancel event</button>
                </div>
                <div className="preview-publish">
                  <button className="button-empty">Preview</button>
                  <button className="button" type="submit">
                    Publish
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AddEvent));
