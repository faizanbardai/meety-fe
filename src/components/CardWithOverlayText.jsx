import React from "react";
import Moment from "react-moment";
import { withRouter, Link } from "react-router-dom";
import "./CardWithOverlayText.css";

function CardWithOverlayText(props) {
  const { picture, name, schedule, participantsLength, _id } = props.event;
  return (
    <div className="col-12 col-sm-6 col-md-4 mb-3">
      <div
        className="card deep-shadow"
        style={{
          backgroundImage: `url(${picture})`,
          backgroundSize: "cover",
          borderRadius: "10px",
          border: "none",
        }}
      >
        <Link to={"/event/" + _id}>
          <div
            style={{ height: "300px" }}
            className="text-white px-3 d-flex flex-column"
          >
            <div className="mb-auto"></div>
            <h6 className="py-2">{name}</h6>
            <div>
              <Moment fromNow>{schedule}</Moment>&nbsp;&nbsp; / &nbsp;&nbsp;
              {participantsLength ? participantsLength : "0"} Participants
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default withRouter(CardWithOverlayText);
