import React from "react";

import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { store as reduxStore, persistor } from "./redux/store";

import App from "./App";

import "./index.css";

const RootHtml = () => (
  <ReduxProvider store={reduxStore}>
    <Router>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Router>
  </ReduxProvider>
);

render(<RootHtml />, document.getElementById("root"));
