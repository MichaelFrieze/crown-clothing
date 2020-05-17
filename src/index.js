import React from "react";

import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";

import App from "./App";
import configureStore from "./redux/store";

import "./index.css";

const reduxStore = configureStore(window.REDUX_INITIAL_DATA);

const RootHtml = () => (
  <ReduxProvider store={reduxStore}>
    <Router>
      <App />
    </Router>
  </ReduxProvider>
);

render(<RootHtml />, document.getElementById("root"));

/* 

now we need persistence for our cart data. 
Our username is already persisted because it is handled by firebase

so we can use something called local storage and session storage
for example, in chrome console:
window.sessionStorage
window.localStorage

sessionStorage: 
data persist if session
basically, as long as your tab is open
you can refresh the page and data will be there

localStorage:
data persist even if you close the tab

So using localStorage,
there are getters and setters:
window.localStorage.setItem || .getItem

example:
const myObjectToStore = { name: "Mike" }

window.localStorage.setItem(
  "myItem",
  JSON.stringify(myObjectToStore)
)

window.localStorage.getItem("myItem")

This will get stored as a string
so it will return a string

To convert back:
const myRetrievedObject = window.localStorage.getItem(
  "myItem"
)

JSON.part(myRetrievedObject)



*/
