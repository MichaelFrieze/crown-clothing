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

// Doing more cool stuff with console log
const mapStateToProps = (state) =>
  console.log("The redux state contains:", state) ||
  console.log("The state is type of:", typeof state) ||
  console.log("The first cart item name is:", state.cart.cartItems[0].name) ||
  console.log(
    "The first cart item is type of:",
    typeof state.cart.cartItems[0].name
  ) || {
    cartItems: state.cart.cartItems,
  };

export default connect(mapStateToProps)(CartDropdown);
