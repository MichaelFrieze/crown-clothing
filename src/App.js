import React from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import "./App.css";

import HomePage from "./pages/homepage/homepage";
import ShopPage from "./pages/shop/shop";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up";

import Header from "./components/header/header";
import { auth, createUserProfileDocument } from "./firebase/firebase";
import { setCurrentUser } from "./actions/user";

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    // if we remove this destructored setCurrentUser then it would come from the import instead of the props

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        console.log(userAuth);
        console.log("This is testing userAuth IF TRUE");
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      }

      setCurrentUser(userAuth);
      /* 
      Here we are sending userAuth to the action.
      If it's not true, then userAuth is null and CurrentUser will be null
      If True, then userAuth will setCurrentUser with this login info

      You might think that we don't even need to call setCurrentUser() if userAuth is not true
      But then the page won't update because you didn't update the action with null user. 

      Also, with these console.log, you might notice that even when true it might show a null value inside of actions
      Then you will see it popup again and give it actual user data. 
      This is because of async/await. It's sending null value into setCurrentUser at the bottom
      because it runs no matter what to update the page. Then, eventually 
      the async-await will add the user data and we will get a new update from actions with user info
      */
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/signin" component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

/* 
since our app doesn't need current user anymore
we won't use mapStateToProps

because outside of passing it into our header
it only sets it, but it doesn't do anything
with the current user value in the comp itself. 

so we can pass in null as first argument. 
*/
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});
/* 
just to make it clear
we imported the destructured setCurrentUser from actions at the top
then we mapped the props from this action
dispatch(setCurrentUser(user)) is coming from the import statement
and dispatch is just part of connect
we are setting this dispatch to setCurrentUser which is not the same as the import statement
we basically created a new prop that is now accessible in the class

This is because below here we are mapping these props to the app class since it is HOC. 
It's also important to note that when we call setCurrentUser in the App class above,
we are not calling the import statement. We are accessing this.props setCurrentUser
*/

export default connect(null, mapDispatchToProps)(App);
