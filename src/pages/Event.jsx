import React from "react";
import Header from "../components/Header";
// import uploadImg from "../img/upload.png";

export default function Event() {
  return (
    <div id="main">
      <div class="main-section heading-size">
        <Header />
        <h1>Create an event</h1>
      </div>
      <div class="second-section">
        <form id="create-event" onSubmit={e => e.preventDefault()}>
          <label for="event-name">Event Name (required)</label>
          <div>
            <input id="event-name" type="text" name="event-name" />
          </div>
          <label for="date">Date/Time</label>
          <div>
            <input id="date" type="text" name="date" placeholder="DD/MM/YYYY" />
            <input id="time" type="text" name="time" placeholder="XX:XX" />
          </div>
          <label for="duration">Duration (in minutes)</label>
          <div>
            <input type="text" name="duration" placeholder="Example: 30" />
          </div>
          <label for="pic">Featured picture</label>
          <div id="upload">
            {/* <img id="input-file" alt="upload-button" src={uploadImg}></img> */}
            <input id="input-file" type="file" name="pic"></input>
          </div>
          <label for="description">Description</label>
          <div>
            <textarea
              name="description"
              id=""
              cols="50"
              rows="10"
              placeholder="Let your attendees know what to expect.including the agenda, what they need to bring and how to find the group."
            ></textarea>
          </div>
          <label for="Hosts">Hosts (they can edit event details)</label>
          <div class="hosts">
            <div class="host-minicard">
              <div
                class="img"
                style={{ "background-image": `url(assets/img/me.png)` }}
              ></div>
              <div class="name">Antonio Serrano Martin</div>
              <div class="username"></div>
            </div>
            <div id="add-host" class="host-minicard">
              <div class="img"></div>
              <div class="name">Add new host</div>
              <div class="username"></div>
            </div>
          </div>

          <div class="foot">
            <div class="cancel">
              <button class="button-empty">Cancel event</button>
            </div>
            <div class="preview-publish">
              <button class="button-empty">Preview</button>
              <button class="button" type="submit">
                Publish
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
