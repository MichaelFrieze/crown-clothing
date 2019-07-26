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

const MenuItem = ({ title, imageUrl, size }) => (
  <div className={`${size} menu-item`}>
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

export default MenuItem;
