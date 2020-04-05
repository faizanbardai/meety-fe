import React from "react";
import Moment from "react-moment";
import { withRouter, Link } from "react-router-dom";
import { Col } from "reactstrap"

function CardWithOverlayText(props) {
  const { picture, name, schedule, participantsLength } = props.event;
  return (
    <Col sm={{ size: 12, offset: 1, limit: 1 }} md={{ size: 6, offset: 3 }}>
    <Link
      to={{
        pathname: "/event",
        state: {
          event: props.event
        }
      }}
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
          {participantsLength ? participantsLength : "0"} Participants
        </h3>
         
      </div>
    </Link>
    </Col>
  );
}

export default withRouter(CardWithOverlayText);
