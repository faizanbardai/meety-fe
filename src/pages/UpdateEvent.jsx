import React, { Component } from "react";
import {
  api_getEventByID,
  api_updateEvent,
  api_updateEventImage,
} from "../apis/events";
import { withRouter } from "react-router-dom";
import MiniProfileCard from "../components/MiniProfileCard";
import { connect } from "react-redux";
import moment from "moment";
import AddHost2 from "../components/AddHost2";

const mapStateToProps = (state) => ({ ...state });

class UpdateEvent extends Component {
  handleSubmit = async (event) => {
    event.preventDefault();
    const accessToken = this.props.accessToken;
    const {
      name,
      schedule,
      duration,
      description,
      _id,
      hosts,
      participants,
      participantsLength,
    } = this.state;
    try {
      let updatedEvent = await api_updateEvent(accessToken, _id, {
        name,
        schedule,
        duration,
        description,
        hosts: hosts.map((x) => x._id),
        participants: participants.map((x) => x._id),
        participantsLength,
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
      <div className="container rounded bg-light py-5">
        <form>
          <div className="form-group">
            <label htmlFor="name">Event Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              id="name"
              placeholder="Event Name"
              value={this.state.name}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="schedule">Date/Time</label>
            <input
              type="datetime-local"
              name="schedule"
              className="form-control"
              id="schedule"
              value={moment(this.state.schedule).format("YYYY-MM-DDTHH:mm:ss")}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="duration">Duration (in minutes)</label>
            <input
              type="text"
              className="form-control"
              id="duration"
              name="duration"
              placeholder="Example: 30"
              value={this.state.duration}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="picture">Example file input</label>
            <input
              type="file"
              className="form-control-file"
              id="picture"
              name="picture"
              onChange={(e) => this.setState({ newPicture: e.target.files[0] })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">About you</label>
            <textarea
              className="form-control"
              value={this.state.description}
              placeholder="Let your attendees know what to expect, including the agenda, what they need to bring and how to find the group."
              onChange={this.handleInputChange}
              id="description"
              name="description"
              rows="3"
            ></textarea>
          </div>
          <label htmlFor="Hosts">Hosts (they can edit event details)</label>
          <AddHost2
            user={this.props.user}
            hosts={this.state.hosts}
            addHost={(newHost) =>
              this.setState({
                hosts: [...this.state.hosts, newHost],
                participantsLength: this.state.participantsLength + 1,
                participants: [...this.state.participants, newHost],
              })
            }
            removeHost={(hostToRemove) =>
              this.setState({
                hosts: this.state.hosts.filter(
                  (host) => host._id !== hostToRemove._id
                ),
                participantsLength: this.state.participantsLength - 1,
                participants: this.state.participants.filter(
                  (participant) => participant._id !== hostToRemove._id
                ),
              })
            }
          />
          <div className="row">
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
    ) : (
      <div>loading...</div>
    );
  }
  componentDidMount = async () => {
    const response = await api_getEventByID(this.props.match.params._id);
    const event = await response.json();
    this.setState(event);
  };
}

export default connect(mapStateToProps, null)(withRouter(UpdateEvent));
