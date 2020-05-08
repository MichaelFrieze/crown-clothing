/* 
Here we are going to make action creator functions. 
These are just functions that return objects
Each object is in the correct format that the action is expected to be
*/

/* 
setCurrentUser takes on parameter; the user object
it is either the user auth or it's null

So instead of firing off this.setState in our App.js file 
(which is a user snapshot object in our firebase utils)
we are going to fire off an action that holds the value
that would have been held in this.setState (the user)

So we are removing the state being stored in the component (this.setState)
and using Redux instead which is a single source of truth.

This function is going to return an object with a type 
is set current user. This is the exact same string that
our reducer is expecting. 

We should always align the action creators type with
the reducers type expectation in order to create
the appropriate effects in our reducer

We are then going to set the payload with that user

This shape of an object is all an action is. 
It has a type = to a string
It has a paylaod

These strings should never change
This is why we use CAPITAL_AND_SNAKECASE
*/
export const setCurrentUser = (user) => ({
  type: "SET_CURRENT_USER",
  payload: user,
});
