import React from "react";
import { withRouter } from "react-router-dom";

/* 
Since only the first (top) component gets access to information like history and match,
getting this information down to other components can be difficult. 
You have to keep sending the props down even if the components don't need them. 

But, react-router-dom has a solution to prevent PROP DRILLING
It's called "withRouter". 

It is a higher order component which is essentially a function
that takes a component as an argument. 
Then returns a modified component. 
*/

import "./menu-item.scss";

// we now have access to history
const MenuItem = ({ title, imageUrl, size, history, linkUrl, match }) => (
  <div
    className={`${size} menu-item`}
    onClick={() => history.push(`${match.url}${linkUrl}`)}
  >
    <div
      className="background-image"
      style={{
        backgroundImage: `url(${imageUrl})`
      }}
    />
    <div className="content">
      <h1 className="title">{title.toUpperCase()}</h1>
      <span className="subtitle">SHOP NOW</span>
    </div>
  </div>
);

export default withRouter(MenuItem);

/* 
This will return us a modified MenuItem component
That will give us access to things like history and match
*/
