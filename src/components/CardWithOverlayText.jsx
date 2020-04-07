import React from "react";
import Moment from "react-moment";
import { withRouter, Link } from "react-router-dom";
import {} from "reactstrap"

function CardWithOverlayText(props) {
  const { picture, name, schedule, participantsLength, _id } = props.event;
  return (
    
    <Link
      to={"/event/" + _id}
      className="card-big shadow"
      style={{
        backgroundImage: `url(${picture})`,
        backgroundSize: "cover",
      }}
    >
      <div className="card-title">
        <h2>{name}</h2>
        <h3>
          <Moment fromNow>{schedule}</Moment>&nbsp;&nbsp; / &nbsp;&nbsp;
          {participantsLength ? participantsLength : "0"} Participants
        </h3>
      </div>
    </Link>
    
  );
}

export default withRouter(CardWithOverlayText);
