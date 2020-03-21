import React from "react";

export default function CardWithOverlayText({ hotItem }) {
  const { picture, name, schedule, participants } = hotItem;
  return (
    <div
      className="card-big shadow"
      style={{
        backgroundImage: `url(${picture})`,
        backgroundSize: "cover"
      }}
    >
      <div className="card-title">
        <h2>{name}</h2>
        <h3>
          {schedule}&nbsp;&nbsp; / &nbsp;&nbsp;{participants.length}{" "}
          Participants
        </h3>
      </div>
    </div>
  );
}
