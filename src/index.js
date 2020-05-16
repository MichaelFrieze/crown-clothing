import React from "react";

import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import App from "./App";
import configureStore from "./redux/store";

import "./index.css";

const reduxStore = configureStore(window.REDUX_INITIAL_DATA);

ReactDOM.render(
  <Provider store={reduxStore}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
