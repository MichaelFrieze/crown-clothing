import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
  // stripe wants value in cents
  const priceForStripe = price * 100;
  const publishableKey = "pk_test_zpoMLqCgt3yzZrMbbrPWY0al0015GrrJUb";

  const onToken = (token) => {
    // this will go to the back end
    // but we are just going to say payment successful
    console.log(token);
    alert("Payment Successful");
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="CRWN Clothing Ltd."
      billingAddress
      shippingAddress
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
