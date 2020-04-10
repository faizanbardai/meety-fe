import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import MiniProfileCard from "./MiniProfileCard";
import { api_searchUser } from "../apis/users";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({ ...state });

function AddHost2(props) {
  const searchHost = async (text) => {
    if (text.length > 2) {
      const response = await api_searchUser(props.accessToken, text);
      const hostFoundViaSearch = await response.json();
      let newPotentialHosts = [];
      hostFoundViaSearch.forEach((hostFound) => {
        if (!props.hosts.map((x) => x._id).includes(hostFound._id)) {
          newPotentialHosts = [...newPotentialHosts, hostFound];
        }
      });
      setSearchedHost(newPotentialHosts);
    } else {
      setSearchedHost([]);
    }
  };
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchedHost, setSearchedHost] = useState([]);
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target="#addHostModal"
      >
        <FontAwesomeIcon icon={faSearch} /> New host
      </button>
      <div
        className="modal fade"
        id="addHostModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Search Host by Name
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                placeholder="John Doe"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                onKeyUp={(e) => {
                  searchHost(e.target.value);
                }}
              />
              <div className="row text-center">
                {props.hosts.map((host) => (
                  <div key={host._id}>
                    <MiniProfileCard key={host._id} item={host} />
                    {props.user._id !== host._id && (
                      <button
                        className="btn btn-secondary"
                        onClick={(e) => {
                          e.preventDefault();
                          props.removeHost(host);
                          setSearchedHost([...searchedHost, host]);
                        }}
                      >
                        Remove Host
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <div className="row text-center">
                {searchedHost.map((host) => (
                  <div key={host._id}>
                    <MiniProfileCard key={host._id} item={host} />
                    <button
                      className="btn btn-primary"
                      onClick={(e) => {
                        e.preventDefault();
                        props.addHost(host);
                        const filteredHosts = searchedHost.filter(
                          (x) => x !== host
                        );
                        setSearchedHost(filteredHosts);
                      }}
                    >
                      Add Host
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, null)(AddHost2);
