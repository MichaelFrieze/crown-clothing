import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";

import store from "./redux/store";

import "./index.css";
import App from "./App";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

/* 
Remember, the provider is a component class that we get from redux. 
Once it is passed the store object, it can give the redux store context 
to the rest of the app. We can dispatch actions to that store. 
Or we can pull values off of the store and into our components. 

Notice we have to add the store to our Provider component. 

we had to build out our store
we had to configure out root reducer so we had some value to display
now we can implement the actions so redux can start storing
the value of our user into our new user reducer 



action -> middleware -> root reducer -> store -> React -> DOM changes
*/
