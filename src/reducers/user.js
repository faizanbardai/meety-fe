export default (state = {}, action) => {
  switch (action.type) {
    case "SAVE_USER":
      return { ...state, user: action.payload };
    case "SAVE_ACCESS_TOKEN":
      return { ...state, accessToken: action.payload };
    default:
      return state;
  }
};
