import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
/* 
connect lets us modify our component to give us access to thing related to redux. 
It's a higher order component. 
HOC are just functions that take components as arguments
then, they return modified components. 

With connect, we are going to pass it two functions
The second will be optional

In return, we will get back another HOC that gets passed the header component. 
export default connect()(Header);
*/

import { auth } from "../../firebase/firebase";

import { ReactComponent as Logo } from "../../assets/crown.svg";

import "./header.scss";

const Header = ({ currentUser }) => (
  <div className="header">
    <Link className="logo-container" to="/">
      <Logo className="logo" />
    </Link>
    <div className="options">
      <Link className="option" to="/shop">
        SHOP
      </Link>
      <Link className="option" to="/shop">
        CONTACT
      </Link>
      {currentUser ? (
        <div className="option" onClick={() => auth.signOut()}>
          SIGN OUT
        </div>
      ) : (
        <Link className="option" to="/signin">
          SIGN IN
        </Link>
      )}
    </div>
  </div>
);

/* 
The first thing we will pass to connect 
is a func that allows us to access the state (root ruducer)

state is the root reducer
*/
const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(Header);
