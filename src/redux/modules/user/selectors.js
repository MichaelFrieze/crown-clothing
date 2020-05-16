import { createSelector } from "reselect";

const selectUser = (state) => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
);

/* 
We can do it this way too (instead of using brackets)

const selectUser = (state) => state.user;
const selectCart = (state) => state.cart;

export const selectCurrentUser = createSelector(
  selectUser,
  selectCart,
  (user) => user.currentUser
);
 */
