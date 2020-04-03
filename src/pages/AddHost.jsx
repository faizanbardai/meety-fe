import React, { Component } from "react";
import Modal from "react-awesome-modal";
import { api_searchUser } from "../apis/users";
import { api_addHost } from "../apis/events";

export default class Examples extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      searchResult: []
    };
  }
  onSearch = async event => {
    const response = await api_searchUser(
      localStorage.getItem("accessToken"),
      event.target.value
    );
    const searchResult = await response.json();
    this.setState({ searchResult });
  };
  addHost = async event => {
    if (this.props.event._id) {
      console.log(this.props.event._id, this.props.user._id);
      const response = await api_addHost(
        localStorage.getItem("accessToken"),
        this.props.event._id,
        this.props.user._id
      );
      const adduser = await response.json();
      this.setState({ adduser });
    } else {
      this.props.addHost(this.props.user._id);
    }
    // const accessToken = this.props.accessToken;
  };

  openModal() {
    this.setState({
      visible: true
    });
  }

  closeModal() {
    this.setState({
      visible: false
    });
  }

  render() {
    return (
      <section>
        <input type="button" value="Open" onClick={() => this.openModal()} />
        <Modal
          visible={this.state.visible}
          width="400"
          height="300"
          effect="fadeInUp"
          onClickAway={() => this.closeModal()}
        >
          <div>
            <br />
            <br />
            <label for="search">Search</label>
            <div>
              <input
                onChange={e => this.onSearch(e)}
                type="text"
                placeholder="Search.."
                name="search"
              />
              {this.state.searchResult.map((value, index) => (
                <div className="flex">
                  <div>{value.name} </div>
                  <div>
                    <button onClick={() => this.addHost()}>Add User</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="foot">
              <div className="preview-publish">
                {/* <button className="button">Add User</button> */}
                <button
                  className="button"
                  type="button"
                  onClick={() => this.closeModal()}
                >
                  Close{" "}
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </section>
    );
  }
}
