import React from "react";
import { connect } from "react-redux";

import CustomButton from "../custom-button/custom-button";
import CartItem from "../cart-item/cart-item";

import "./cart-dropdown.scss";

const CartDropdown = ({ cartItems }) => (
  <div className="cart-dropdown">
    <div className="cart-items">
      {cartItems.map((cartItem) => (
        <CartItem key={cartItem.id} item={cartItem} />
      ))}
    </div>
    <CustomButton>GO TO CHECKOUT</CustomButton>
  </div>
);

// This is how I can check what is in the state
const mapStateToProps = ({ cart: { cartItems } }) =>
  console.log(cartItems) || {
    cartItems,
  };

export default connect(mapStateToProps)(CartDropdown);
