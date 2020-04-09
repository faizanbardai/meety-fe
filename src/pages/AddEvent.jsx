import React, { Component } from "react";
import { api_createEvent, api_updateEventImage } from "../apis/events";
import { withRouter } from "react-router-dom";
import MiniProfileCard from "../components/MiniProfileCard";
import { connect } from "react-redux";
import { addEventIDToUserEventsArray } from "../action";
import AddHost from "../components/AddHost";
import moment from "moment";

const mapStateToProps = (state) => ({ ...state });
const mapDispatchToProps = (dispatch) => ({
  addEventIDToUserEventsArray: (_id) =>
    dispatch(addEventIDToUserEventsArray(_id)),
});

class AddEvent extends Component {
  state = {
    name: "Test " + new Date(),
    schedule: moment(new Date()).format("YYYY-MM-DDTHH:mm:ss"),
    duration: "30",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    hosts: [this.props.user],
  };
  handleSubmit = async (event) => {
    event.preventDefault();
    const accessToken = this.props.accessToken;
    const { name, schedule, duration, description, hosts } = this.state;
    try {
      let newEvent = await api_createEvent(accessToken, {
        name,
        schedule,
        duration,
        description,
        hosts,
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
                this.props.history.push("/event/" + newEventWithPicture._id);
                break;
              default:
                alert("Some error when saving event picture");
            }
          } else {
            newEvent = await newEvent.json();
            this.props.addEventIDToUserEventsArray(newEvent._id);
            this.props.history.push("/event/" + newEvent._id);
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
    return (
      <div className="container rounded bg-light py-5">
        <form>
          <div class="form-group">
            <label htmlFor="name">Event Name</label>
            <input
              type="text"
              name="name"
              class="form-control"
              id="name"
              placeholder="Event Name"
              value={this.state.name}
              onChange={this.handleInputChange}
            />
          </div>
          <div class="form-group">
            <label htmlFor="schedule">Date/Time</label>
            <input
              type="datetime-local"
              name="schedule"
              class="form-control"
              id="schedule"
              value={this.state.schedule}
              onChange={this.handleInputChange}
            />
          </div>
          <div class="form-group">
            <label htmlFor="duration">Duration (in minutes)</label>
            <input
              type="text"
              class="form-control"
              id="duration"
              name="duration"
              placeholder="Example: 30"
              value={this.state.duration}
              onChange={this.handleInputChange}
            />
          </div>
          <div class="form-group">
            <label htmlFor="picture">Example file input</label>
            <input
              type="file"
              class="form-control-file"
              id="picture"
              name="picture"
              onChange={(e) => this.setState({ picture: e.target.files[0] })}
            />
          </div>
          <div class="form-group">
            <label htmlFor="description">About you</label>
            <textarea
              class="form-control"
              value={this.state.description}
              placeholder="Let your attendees know what to expect, including the agenda, what they need to bring and how to find the group."
              onChange={this.handleInputChange}
              id="description"
              name="description"
              rows="3"
            ></textarea>
          </div>
          <label htmlFor="Hosts">Hosts (they can edit event details)</label>
          <AddHost
            addHost={(newHost) =>
              this.setState({
                hosts: [...this.state.hosts, newHost],
              })
            }
          />
          <div>
            {this.state.hosts.map((host, i) => (
              <MiniProfileCard item={host} key={i} />
            ))}
          </div>
          <div className="d-flex justify-content-between">
            <button
              className="btn btn-primary"
              onClick={() => {
                this.props.history.push("/");
              }}
            >
              Cancel event
            </button>
            <button className="btn btn-primary" onClick={this.handleSubmit}>
              Publish
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AddEvent));
