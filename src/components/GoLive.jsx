import React from "react";

export default function GoLive() {
  return (
    <div id="footer">
      <button className="button" onClick={() => alert("I'm a button")}>
        Go live!
      </button>
    </div>
  );
}
