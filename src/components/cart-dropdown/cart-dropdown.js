import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom";

import CustomButton from "../custom-button/custom-button";
import CartItem from "../cart-item/cart-item";
import { selectCartItems } from "../../redux/modules/cart/selectors";
import { toggleCartHidden } from "../../redux/modules/cart/actions";

import "./cart-dropdown.scss";

const CartDropdown = ({ cartItems, history, dispatch }) => (
  <div className="cart-dropdown">
    <div className="cart-items">
      {cartItems.length ? (
        cartItems.map((cartItem) => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))
      ) : (
        <span className="empty-message">Your cart is emppty</span>
      )}
    </div>
    <CustomButton
      onClick={() => {
        history.push("/checkout");
        dispatch(toggleCartHidden());
      }}
    >
      GO TO CHECKOUT
    </CustomButton>
  </div>
);

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
});

/* 
The goal here is to toggle our cart hidden 
after clicking "go to checkout"

So we do that by the action "toggleCartHidden"

Even though there is no map dispatch parameter, 
connect still passes the dispatch to CartDropdown

Just to see this, we can spread all props into CartDropdown:
const CartDropdown = ({ cartItems, history, ...otherProps }) => ()

Then we can console log to see we have access to dispatch
console log by implementing a return statement or do this:
const CartDropdown = ({ cartItems, history, ...otherProps }) =>
  console.log(otherProps) || ()

Get rid of the console and otherProps. All we need is dispatch


*/
export default withRouter(connect(mapStateToProps)(CartDropdown));
