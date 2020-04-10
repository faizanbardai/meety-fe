import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { api_getUserByID, api_followers, api_unfollow } from "../apis/users";
import CardWithOverlayText from "../components/CardWithOverlayText";
import { followHost, unFollowHost } from "../action";

const mapStateToProps = (state) => ({ ...state });
const mapDispatchToProps = (dispatch) => ({
  followHost: (_id) => dispatch(followHost(_id)),
  unFollowHost: (_id) => dispatch(unFollowHost(_id)),
});
class GuestProfile extends Component {
  handleFollowButton = async () => {
    try {
      const accessToken = this.props.accessToken;
      const res = await api_followers(accessToken, this.state.user._id);
      if (res.ok) {
        this.props.followHost(this.state.user._id);
      }
    } catch (error) {
      console.log(error);
    }
  };
  handleUnFollowButton = async () => {
    try {
      const accessToken = this.props.accessToken;
      const res = await api_unfollow(accessToken, this.state.user._id);
      if (res.ok) {
        this.props.unFollowHost(this.state.user._id);
      }
    } catch (error) {
      console.log(error);
    }
  };
  state = {};
  render() {
    return this.state.user ? (
      <div className="container">
        <div className="row">
          <img
            className="col-4 rounded-circle"
            src={this.state.user.picture}
            alt={this.state.user.name}
          ></img>
        </div>
        <div className="bg-light mt-2 p-3 rounded">
          <div className="d-flex justify-content-between align-content-center">
            <div>
              <h1>{this.state.user.name}</h1>
              {this.state.user.followers.length > 0 && (
                <p>{this.state.user.followers.length} followers</p>
              )}
            </div>
            <div>
              {/* Showing the Follow button only for guest profiles */}
              {this.state.user._id !== this.props.user._id ? (
                <>
                  {this.props.user.following.includes(this.state.user._id) ? (
                    <button
                      className="btn btn-outline-primary"
                      onClick={this.handleUnFollowButton}
                    >
                      Unfollow
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary"
                      onClick={this.handleFollowButton}
                    >
                      Follow
                    </button>
                  )}
                </>
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    this.props.history.push("/update-profile");
                  }}
                >
                  Edit
                </button>
              )}
            </div>
          </div>
          <h1>About</h1>
          <p>{this.state.user.aboutMe}</p>
        </div>
        <h1>Next events:</h1>
        <div className="row">
          {this.state.user.events.map((event) => (
            <div key={event._id} className="col-12 col-sm-6 col-md-4 mb-3">
              <CardWithOverlayText key={event._id} event={event} />
            </div>
          ))}
        </div>
      </div>
    ) : (
      <div>Loading...</div>
    );
  }
  componentDidMount = async () => {
    const userIDParam = this.props.match.params._id;
    try {
      const response = await api_getUserByID(
        this.props.accessToken,
        userIDParam
      );
      const user = await response.json();
      this.setState({ user });
    } catch (error) {
      alert(error);
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(GuestProfile));
