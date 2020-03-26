import React from "react";
import { withRouter } from "react-router-dom";

function MiniProfileCard(props) {
  const { picture, name, _id } = props.item;
  return (
    <div
      class="host-minicard"
      onClick={() => {
        props.history.push("/profile/" + _id);
      }}
    >
      <div class="img" style={{ backgroundImage: `url(${picture})` }}></div>
      <div class="name">{name}</div>
    </div>
  );
}

export default withRouter(MiniProfileCard);
