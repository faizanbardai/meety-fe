import React from "react";
import Moment from "react-moment";
import { withRouter, Link } from "react-router-dom";

<<<<<<< HEAD
import {FacebookShareButton, TwitterShareButton, WhatsappShareButton} from "react-share";

import {FacebookIcon, TwitterIcon, WhatsappIcon} from "react-share";


export default function CardWithOverlayText({ hotItem }) {
  const { image, title, dateAndTime, participants } = hotItem;
=======
function CardWithOverlayText(props) {
  const { picture, name, schedule, participantsLength } = props.event;
>>>>>>> master
  return (
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
        <FacebookShareButton url={shareUrl}> <FacebookIcon size={32} round={true} /> </FacebookShareButton>  <TwitterShareButton url={shareUrl}><TwitterIcon size={32} round={true} /></TwitterShareButton>  <WhatsappShareButton url={shareUrl}><WhatsappIcon size={32} round={true} /></WhatsappShareButton> 
      </div>
    </Link>
  );
}

<<<<<<< HEAD
const shareUrl = String(window.location);

=======
export default withRouter(CardWithOverlayText);
>>>>>>> master
