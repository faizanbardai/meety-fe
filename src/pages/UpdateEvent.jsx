import React, { Component } from "react";
import Header from "../components/Header";
import { api_updateEvent, api_updateEventImage } from "../apis/events";
import BurgerMenu from "../components/BurgerMenu";
import { withRouter } from "react-router-dom";
import MiniProfileCard from "../components/MiniProfileCard";
import { connect } from "react-redux";
// import uploadImg from "../img/upload.png";
import addHost from "../img/addhost.png";
import moment from "moment";

const mapStateToProps = (state) => ({ ...state });

class UpdateEvent extends Component {
  handleSubmit = async (event) => {
    event.preventDefault();
    const accessToken = this.props.accessToken;
    const { name, schedule, duration, description, _id } = this.state;
    try {
      let updatedEvent = await api_updateEvent(accessToken, _id, {
        name,
        schedule,
        duration,
        description,
      });
      switch (updatedEvent.status) {
        case 200:
          // OK
          if (this.state.newPicture) {
            updatedEvent = await updatedEvent.json();
            const data = new FormData();
            data.append("picture", this.state.newPicture);
            let newEventWithPicture = await api_updateEventImage(
              accessToken,
              updatedEvent._id,
              data
            );
            switch (newEventWithPicture.status) {
              case 200:
                // OK
                newEventWithPicture = await newEventWithPicture.json();
                this.props.history.push("/event/" + newEventWithPicture._id);
                break;
              default:
                alert("Some error when saving event picture");
            }
          } else {
            updatedEvent = await updatedEvent.json();
            this.props.history.push("/event/" + updatedEvent._id);
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
  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  };
  render() {
    return this.state ? (
      <>
        <BurgerMenu />
        <div id="main">
          <div className="main-section heading-size">
            <Header />
            <h1>Update event</h1>
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
              <label htmlFor="schedule">Date/Time</label>
              <div>
                <input
                  id="schedule"
                  type="datetime-local"
                  name="schedule"
                  value={moment(this.state.schedule).format(
                    "YYYY-MM-DDTHH:mm:ss"
                  )}
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
                  onChange={(e) =>
                    this.setState({ newPicture: e.target.files[0] })
                  }
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
                {this.state.host.map((host) => (
                  <MiniProfileCard key={host._id} item={host} />
                ))}
                <MiniProfileCard
                  item={{ name: "Add new host", picture: `${addHost}` }}
                />
              </div>

              <div className="foot">
                <div className="cancel">
                  <button className="button-empty">Cancel</button>
                </div>
                <div className="preview-publish">
                  <button className="button" type="submit">
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </>
    ) : (
      <div>loading...</div>
    );
  }
  componentDidMount = async () => {
    this.setState(this.props.location.state.event);
  };
}

export default connect(mapStateToProps, null)(withRouter(UpdateEvent));
