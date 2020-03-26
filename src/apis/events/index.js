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
export const api_getHottestOfTheWeek = async () => {
  return await fetch(baseURL + "event/hottest-of-the-week/", {
    headers: {
      "Content-Type": "application/json"
    }
  });
};
export const api_getHottestOfNextWeek = async () => {
  return await fetch(baseURL + "event/hottest-of-next-week/", {
    headers: {
      "Content-Type": "application/json"
    }
  });
};
export const api_getHottestOfTheMonth = async () => {
  return await fetch(baseURL + "event/hottest-of-the-month/", {
    headers: {
      "Content-Type": "application/json"
    }
  });
};
export const api_getHottestAllUpcoming = async () => {
  return await fetch(baseURL + "event/all-upcoming/", {
    headers: {
      "Content-Type": "application/json"
    }
  });
};
