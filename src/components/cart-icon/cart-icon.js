import React from "react";
import { connect } from "react-redux";

import { toggleCartHidden } from "../../actions/cart";

import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";

import "./cart-icon.scss";

const CartIcon = ({ toggleCartHidden, itemCount }) => (
  <div className="cart-icon" onClick={toggleCartHidden}>
    <ShoppingIcon className="shopping-icon" />
    <span className="item-count">{itemCount}</span>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  toggleCartHidden: () => dispatch(toggleCartHidden()),
});

/* 
Now, lets figure out how to prevent this rerender of 
our component if the state doesn't change. 

This is called memoization
or the caching of the selectors value

we can achieve this by using a library called 
RESELECT

caching is just a way to speed up programs
and hold some piece of data in an easily accessible box

momoization is a specific form of caching. 

This is an example of caching:

let cache = {};

function memoizedAddTo80(n) {
  if (n in cache) {
    return cache[n];
  } else {
    cache[n] = n + 80;
    return cache[n];
  }
}

console.log("1: ", memoizedAddTo80(5));
console.log("2: ", memoizedAddTo80(5));
*/
const mapStateToProps = ({ cart: { cartItems } }) => ({
  itemCount: cartItems.reduce(
    (accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity,
    0
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
