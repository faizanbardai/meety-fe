export const saveUser = user => ({ type: "SAVE_USER", payload: user });
export const saveAccessToken = accessToken => ({
  type: "SAVE_ACCESS_TOKEN",
  payload: accessToken
});
