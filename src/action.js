export const saveUser = user => ({ type: "SAVE_USER", payload: user });
export const saveAccessToken = accessToken => ({
  type: "SAVE_ACCESS_TOKEN",
  payload: accessToken
});
export const addEventIDToUserEventsArray = _id => ({
  type: "ADD_EVENT_ID_TO_USER_EVENT_ARRAY",
  payload: _id
});
