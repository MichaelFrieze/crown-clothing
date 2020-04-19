// we must set a default value so that it gets instantiated
// null is a valid default value
const INITIAL_STATE = {
  currentUser: null,
};

/* 
a reducer gets every single action that ever gets fired
even if those actions are not related to this reducer

so we need a default case so that if none of the action types
match case then we just want to return the state
*/
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return {
        ...state,
        currentUser: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
