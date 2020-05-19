import { createStore, applyMiddleware, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";

import * as reducers from "./modules";

const middlewares = [logger];

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const rootReducer = combineReducers(reducers);

export const store = createStore(
  persistReducer(persistConfig, rootReducer),
  applyMiddleware(...middlewares)
);

export const persistor = persistStore(store);
