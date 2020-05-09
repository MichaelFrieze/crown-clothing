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
      } else {
        setCurrentUser(null);
      }

      // setCurrentUser(userAuth);
      /* 
      As you can cancel, I commented out this line because I think all this does is
      make sure an update happens on each action change. If this doesn't get called in the selection statement
      then you never see the sign in/out button change. So you have to call this whether or not
      userAuth is true. 

      However, it didn't make sense to use userAuth as a param in setCurrentUser. 
      It just shows the massive google auth payload or null. 
      So, we put it in the else statement and just passed null anyway if userAuth is false. 
      If true, then setCurrentUser gets the nice snapshot data. 

      I can't think of a good reason to keep it the other way. 
      Maybe this can reduce performance? 
      Since we are async/await I guess it could take longer for button change?
      */

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

Also, in chrome dev tools/console, we can see 2 or 3 actions. In the first one you will see
that current user is null. But, if you look at the payload you will see that huge 
user auth object from firebase with loads of information. 

So it goes:
prev state
action
next state

Once we get to next state we can see that currentUser: P
Which is equal to that massive payload

Now, look at the next action which is after we have gotten the snapshot
prev state current user is still that same big firebase auth object
Then it fires again because of async/await in our snapshot code. 

In action you will see that the payload is the object we defined:
createdAt
displayName
email
id

Now currentUser should be assigned that payload instead of the huge auth object. 
We should see this in next state
*/

export default connect(null, mapDispatchToProps)(App);
