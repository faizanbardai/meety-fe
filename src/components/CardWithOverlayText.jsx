import React from "react";
import Moment from "react-moment";
import { withRouter } from "react-router-dom";

function CardWithOverlayText(props) {
  const { _id, picture, name, schedule, participants } = props.event;
  return (
    <div
      onClick={() => props.history.push("/event/" + _id)}
      className="card-big shadow"
      style={{
        backgroundImage: `url(${picture})`,
        backgroundSize: "cover"
      }}
    >
      <div className="card-title">
        <h2>{name}</h2>
        <h3>
          <Moment fromNow>{schedule}</Moment>&nbsp;&nbsp; / &nbsp;&nbsp;
          {participants.length} Participants
        </h3>
      </div>
    </div>
  );
}

export default withRouter(CardWithOverlayText);
