export const setCurrentUser = (user) => ({
  type: "SET_CURRENT_USER",
  payload: user,
  log: console.log(user),
  logEx: console.log("This is testing user params in actions"),
});
