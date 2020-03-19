import React from "react";

import {FacebookShareButton, TwitterShareButton, WhatsappShareButton} from "react-share";

import {FacebookIcon, TwitterIcon, WhatsappIcon} from "react-share";


export default function CardWithOverlayText({ hotItem }) {
  const { image, title, dateAndTime, participants } = hotItem;
  return (
    <div
      class="card-big shadow"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover"
      }}
    >
      <div class="card-title">
        <h2>{title}</h2>
        <h3>
          {dateAndTime}&nbsp;&nbsp; / &nbsp;&nbsp;{participants} Participants
        </h3>
        <FacebookShareButton url={shareUrl}> <FacebookIcon size={32} round={true} /> </FacebookShareButton>  <TwitterShareButton url={shareUrl}><TwitterIcon size={32} round={true} /></TwitterShareButton>  <WhatsappShareButton url={shareUrl}><WhatsappIcon size={32} round={true} /></WhatsappShareButton> 
      </div>
    </div>
  );
}

const shareUrl = String(window.location);

