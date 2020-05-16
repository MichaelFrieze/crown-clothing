import { createStore, applyMiddleware, combineReducers } from "redux";
import * as reducers from "./modules";
import logger from "redux-logger";

const middlewares = [logger];

export default function configureStore(initialState) {
  const rootReducer = combineReducers(reducers);

  return createStore(
    rootReducer,

    applyMiddleware(...middlewares)
  );
}
