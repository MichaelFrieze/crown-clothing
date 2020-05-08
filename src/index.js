import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";

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
We use react in production and I still find this to be a bit barebones. I've analyzed code from a few major players in the space and landed on this current structure (we use React, Apollo/GraphQL instead of Redux):

src

-- apps/

--- appA/

---- containers/

----- indexPage.tsx

----- indexPage.test.tsx

----- form.tsx

----- form.test.tsx

---- operations/

----- sharedQuery.js

----- sharedMutation.js

----- sharedSubscription.js

---- utils/

----- polyfills.js

----- regex.js

--components/

--- appA/

---- componentA/

----- componentA.jsx

----- componentA.test.jsx

----- sections/

------ componentATitle.jsx

------ componentASubtitle.jsx

What I like about this structure is it subdivides between presentational components (components) and logical/informational components (routes/containers). It also includes ways of handling operations in GraphQL which is simpler than the nesting that is required for Redux. So far this separation has worked out really well for us.


*/
