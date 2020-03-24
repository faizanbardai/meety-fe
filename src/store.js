import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import userReducer from "./reducers/user";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {
  user: null,
  accessToken: null
};

export default createStore(
  userReducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);
