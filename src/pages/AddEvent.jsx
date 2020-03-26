import React, { Component } from "react";
import Header from "../components/Header";
import { api_createEvent, api_updateEventImage } from "../apis/events";
import BurgerMenu from "../components/BurgerMenu";
import { withRouter } from "react-router-dom";
import MiniProfileCard from "../components/MiniProfileCard";
import { connect } from "react-redux";
// import uploadImg from "../img/upload.png";
import addHost from "../img/addhost.png";

const mapStateToProps = state => ({ ...state });

const initialState = {
  name: "",
  date: "",
  time: "",
  duration: "",
  description: ""
};

class AddEvent extends Component {
  state = initialState;
  handleSubmit = async event => {
    event.preventDefault();
    const accessToken = localStorage.getItem("accessToken");
    const { name, date, time, duration, description } = this.state;
    const schedule = date + " " + time;
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
              console.log(newEventWithPicture);
              this.props.history.push("/event/" + newEvent._id);
              break;
            default:
              alert("Some error when saving event picture");
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
                  id="date"
                  type="date"
                  name="date"
                  placeholder="DD/MM/YYYY"
                  value={this.state.date}
                  onChange={this.handleInputChange}
                />
                <input
                  id="time"
                  type="time"
                  name="time"
                  placeholder="XX:XX"
                  value={this.state.time}
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

export default connect(mapStateToProps, null)(withRouter(AddEvent));
