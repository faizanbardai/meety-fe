export default (state = {}, action) => {
  switch (action.type) {
    case "SAVE_USER":
      return { ...state, user: action.payload };
    case "SAVE_ACCESS_TOKEN":
      return { ...state, accessToken: action.payload };
    case "ADD_EVENT_ID_TO_USER_EVENT_ARRAY":
      return {
        ...state,
        user: {
          ...state.user,
          events: [...state.user.events.concat(action.payload)]
        }
      };
    default:
      return state;
  }
};
