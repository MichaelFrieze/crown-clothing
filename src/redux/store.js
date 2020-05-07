import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

// action -> middleware -> root reducer -> store -> React -> DOM changes
// also we can use logger to use when debugging our redux code.

import rootReducer from "./root-reducer";

const middlewares = [logger];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
