const baseURL = process.env.REACT_APP_BASE_SERVER_URL;

export const api_createEvent = async (token, body) => {
  return await fetch(baseURL + "event", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify(body)
  });
};
export const api_updateEventImage = async (token, _id, body) => {
  return await fetch(baseURL + "event/" + _id + "/picture", {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + token
    },
    body: body
  });
};

export const api_getEventByID = async _id => {
  return await fetch(baseURL + "event/id/" + _id, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};
