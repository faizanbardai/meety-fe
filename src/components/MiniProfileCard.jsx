import React from "react";
import { withRouter, Link } from "react-router-dom";

function MiniProfileCard(props) {
  const { picture, name, _id } = props.item;
  return (
    <Link
      to={"/profile/" + _id}
      className="card m-2 text-dark"
      style={{ width: "150px", border: "none", textDecoration: "none" }}
    >
      <div className="px-4">
        <img className="card-img-top rounded-circle" src={picture} alt={name} />
      </div>
      <h5 className="card-title text-center">{name}</h5>
    </Link>
  );
}

export default withRouter(MiniProfileCard);
