import React from "react";
import { withRouter } from "react-router-dom";

function MiniProfileCard(props) {
  const { picture, name, _id } = props.item;
  return (
    <div
      className="card m-2"
      style={{ width: "150px", border: "none" }}
      onClick={() => {
        props.history.push("/profile/" + _id);
      }}
    >
      <div className="px-4">
        <img className="card-img-top rounded-circle" src={picture} alt={name} />
      </div>
      <div className="card-body text-center">
        <h5 className="card-title">{name}</h5>
      </div>
    </div>
  );
}

export default withRouter(MiniProfileCard);
