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
This is called a selector.
We are writing code that gets a state object
pulls off a small portion of that state
Using destructoring:
{ cart: { cartItems } }

Whenever any reducer updates we are always returning a new object
whenever we return a new object and redux recomposes and
rebuilds the entire state object, mapStateToProps is getting
called every single time. 

Which is always passing in new props into our component. 
So this is always re rendering our component. 

I am using console log here to show this. 

Even though our cart icon component only cares about cart items
what ends up happening is whenever we change our state
like modifying our current user by logging in
We will see that console log statement here in our cart icon component

This is because our mapStateToProps inside our component 
is still being called. 

Also, this is another way to console.log but we must use return syntax
*/
const mapStateToProps = ({ cart: { cartItems } }) => {
  console.log("I am being called!");

  return {
    itemCount: cartItems.reduce(
      (accumulatedQuantity, cartItem) =>
        accumulatedQuantity + cartItem.quantity,
      0
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
