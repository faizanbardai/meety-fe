import React, { Component } from "react";
import { connect } from "react-redux";
import { saveUser, saveAccessToken } from "../action";
import { api_updateProfile, api_updateUserImage } from "../apis/users";

const mapStateToProps = (state) => ({ ...state });
const mapDispatchToProps = (dispatch) => ({
  saveUser: (user) => dispatch(saveUser(user)),
  saveAccessToken: (accessToken) => dispatch(saveAccessToken(accessToken)),
});

class UpdateProfile extends Component {
  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    let userData = await api_updateProfile(this.props.accessToken, {
      name: this.state.name,
      aboutMe: this.state.aboutMe,
    });
    switch (userData.status) {
      case 200:
        // OK
        if (this.state.newPicture) {
          userData = await userData.json();
          const data = new FormData();
          data.append("picture", this.state.newPicture);
          let userWithPicture = await api_updateUserImage(
            this.props.accessToken,
            data
          );
          switch (userWithPicture.status) {
            case 200:
              // OK
              userWithPicture = await userWithPicture.json();
              this.props.saveUser(userWithPicture);
              this.props.history.push("/profile/" + userWithPicture._id);
              break;
            default:
              alert("Some error when saving user picture");
          }
        } else {
          userData = await userData.json();
          this.props.saveUser(userData);
          this.props.history.push("/profile/" + userData._id);
        }
        break;
      default:
        alert("Some error");
    }
  };
  render() {
    return this.state ? (
      <div className="container bg-light rounded py-5">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label for="exampleInputEmail1">Name</label>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleInputChange}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter name"
            />
          </div>
          <div className="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              type="email"
              disabled
              value={this.state.username}
              onChange={this.handleInputChange}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
          </div>

          <div className="form-group">
            <label for="exampleFormControlFile1">Avatar</label>
            <input
              type="file"
              onChange={(e) => this.setState({ newPicture: e.target.files[0] })}
              className="form-control-file"
              id="exampleFormControlFile1"
            />
          </div>
          <div className="form-group">
            <label for="exampleFormControlTextarea1">About you</label>
            <textarea
              className="form-control"
              name="aboutMe"
              value={this.state.aboutMe}
              placeholder="Tell us a little about yourself."
              onChange={this.handleInputChange}
              id="exampleFormControlTextarea1"
              rows="3"
            ></textarea>
          </div>
          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    ) : (
      <div>loading...</div>
    );
  }
  componentDidMount = async () => {
    this.setState(this.props.user);
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile);
