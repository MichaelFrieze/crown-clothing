import React from "react";
import { connect } from "react-redux";

import CustomButton from "../custom-button/custom-button";
import CartItem from "../cart-item/cart-item";

import "./cart-dropdown.scss";

// how to console log in a react component
const CartDropdown = ({ cartItems }) => (
  <div className="cart-dropdown">
    <div className="cart-items">
      {cartItems.map((cartItem) => (
        <CartItem key={cartItem.id} item={cartItem} />
      ))}
      {console.log(cartItems)}
    </div>
    <CustomButton>GO TO CHECKOUT</CustomButton>
  </div>
);

const mapStateToProps = ({ cart: { cartItems } }) => ({
  cartItems,
});

export default connect(mapStateToProps)(CartDropdown);
