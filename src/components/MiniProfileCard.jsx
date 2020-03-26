import React from "react";
import { withRouter } from "react-router-dom";

function MiniProfileCard(props) {
  const { picture, name, _id } = props.item;
  return (
    <div
      className="host-minicard"
      onClick={() => {
        props.history.push("/profile/" + _id);
      }}
    >
      <div className="img" style={{ backgroundImage: `url(${picture})` }}></div>
      <div className="name">{name}</div>
    </div>
  );
}

export default withRouter(MiniProfileCard);
