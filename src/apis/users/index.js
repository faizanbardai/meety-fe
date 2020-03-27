const baseURL = process.env.REACT_APP_BASE_SERVER_URL;

export const api_createAccount = async body => {
  return await fetch(baseURL + "user/createAccount", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });
};

export const api_updateUserImage = async (token, body) => {
  return await fetch(baseURL + "user/picture", {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + token
    },
    body: body
  });
};

export const api_login = async body => {
  return await fetch(baseURL + "user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });
};

export const api_refreshToken = async token => {
  return await fetch(baseURL + "user/refresh", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  });
};
export const api_getUserByID = async (token, _id) => {
  return await fetch(baseURL + "user/id/" + _id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  });
};
