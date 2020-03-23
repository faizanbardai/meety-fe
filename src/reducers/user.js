export default (state = {}, action) => {
  switch (action.type) {
    case "SAVE_USER":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};
