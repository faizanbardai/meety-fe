import React from "react";

export default function MiniProfileCard(props) {
  const { picture, name } = props.item;
  return (
    <div class="host-minicard">
      <div class="img" style={{ backgroundImage: `url(${picture})` }}></div>
      <div class="name">{name}</div>
    </div>
  );
}
